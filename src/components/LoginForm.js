import React,{useState} from 'react';
import axios from "axios";

function LoginForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({message: "", showError: false})

    const onLoginSuccess = props.onLoginSuccess

    const handleClickLogin = (evt) => {

        // evt.preventDefault()
        // form을 사용했을 때 페이지가 새로고침 되는 것을 막는다. 굳이 써야하지 않을 땐 form을 쓰지 말자.

        const loginRequest = {
            username: username,
            password: password
        }
        axios.post("/api/v1/login", loginRequest)
            .then(response => {
                console.log("RESPONSE", response)
                return response.data
            })
            .then(payload => {
                console.log("PAYLOAD", payload)
                if (payload.success) {
                    // 로그인 성공
                    console.log("로그인 성공", payload.data)

                    // App Component 의 isLogin 상태 true 번경, 사용자 정보 전달
                    onLoginSuccess(payload.data)

                } else {
                    // 로그인 실패
                    console.log("로그인 실패", payload.errorInfo)

                    // clear form
                    setUsername("")
                    setPassword("")

                    // 에러 메시지 출력
                    setError({message: payload.errorInfo.message, showError: true})

                }
            })


    }


    return (
        <div>
            <div className="container has-text-centered box" style={{maxWidth: '300px'}}>
                    <div className="field">
                        <label className="label" htmlFor="text">ID</label>
                        <div className="control">
                            <input className="input" name="username" type="text" placeholder="ID"
                                   value={username}
                                   onChange={(evt) => setUsername(evt.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">
                            <input className="input" name="password" type="password" placeholder="Password"
                                   value={password}
                                   onChange={(evt) => setPassword(evt.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control buttons is-centered">
                            <button className="button is-medium is-dark is-fullwidth" onClick={handleClickLogin}>Sign in</button>
                        </div>
                    </div>
                {error.showError &&
                    <div className="message is-danger is-small mt-3">
                        <div className="message-body">
                            {error.message}
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}

export default LoginForm;