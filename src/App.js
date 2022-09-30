import React, {useState} from 'react';
import LoginForm from "./components/LoginForm";
import LoginSucccessContainer from "./components/LoginSuccessContainer";

function App() { // 함수형 Component 이름.. 클래스형도 있지만 요즘엔 함수형을 많이 쓴다,,
    const [isLogin, setIsLogin] = useState(false)
    const [userInfo, setUserInfo] = useState(null)


    const handleLoginSuccess = (userInfo) => {
        console.log("handleLoginSuccess", userInfo)
        setIsLogin(true)
        setUserInfo(userInfo)
    }

    const handleLogout = () => {
        console.log("handleLogout")
        setIsLogin(false)
        setUserInfo(null)
    }

    return (
        <div className="App">
            {/*<button className={'button'} onClick={() => setIsLogin(true)}>Login Success</button>*/}
            {/*<button className={'button'} onClick={() => setIsLogin(false)}>Logout</button>*/}

            {/*로그인에 성공하면 다음 핸들러를 호출해라*/}
            {/*LoginForm.js에서는 onLoginSuccess라는 이름으로 handleLoginSuccess라는 함수를 사용할 수 있다. */}
            {isLogin === false && <LoginForm onLoginSuccess={handleLoginSuccess}></LoginForm>}
            {isLogin === true && <LoginSucccessContainer userInfo={userInfo} onLogout={handleLogout} ></LoginSucccessContainer>}
        </div>
    );
}

export default App;