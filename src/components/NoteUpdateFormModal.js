import React, {useState} from "react";
import axios from "axios";

function NoteUpdateFormModal(props) {
    const {show, onClose, userId, oldNote, onSaved, onSelectNote} = props
    const [newNote, setNewNote] = useState({
        title: oldNote.title,
        meetingDate: oldNote.meetingDate,
        meetingTime: oldNote.meetingTime,
        place: oldNote.place,
        attendee: oldNote.attendee,
        text: oldNote.text,
        writer: userId
    })

    const handleChangeInput = (event) => {
        const key = event.target.name
        const value = event.target.value

        // mdn에 전개구문 검색.. 이거 많이 사용되는 거라서 꼭 알아놔야함
        setNewNote(old => {
            // 새로운 객체가 생성됐다고 알려주기 위해서 새로운 객체(새 주소값을 가진)를 생성한다.
            return {...old, [key]: value}
            // ... 은 풀어서 나열해주는 것
            // old에서 key를 찾고 그에 맞게 새로운 값인 value를 저장한다.
        })
    }


    const handleClickSave = (id) => {
        if(!newNote.title | !newNote.text){
            return
        }
        // API
        const payload = {...newNote, writer: userId}
        // writerId 에 userId를 넣는다.
        if (window.confirm("수정하시겠습니까?")){
            axios.put("/api/v1/notes/"+id, payload).then(response => {
                onSaved()
                onClose()
                onSelectNote(id)
            })
        }

    }



    return(

        <div className={`modal ${show ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                    <div className="block">
                        <div className="field">
                            <div className="label">Title</div>
                            <div className="control">
                                <input type="text" className="input" name="title" onChange={handleChangeInput} value={newNote.title}/>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <div className="label">Date</div>
                                    <div className="control">
                                        <input type="text" className="input" name="meetingDate"
                                               onChange={handleChangeInput}
                                               value={newNote.meetingDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <div className="label">Time</div>
                                    <div className="control">
                                        <input type="text" className="input" name="meetingTime"
                                               onChange={handleChangeInput}
                                               value={newNote.meetingTime}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="columns">
                            <div className="column">
                                {/*  Place  */}
                                <div className="field">
                                    <div className="label">Place</div>
                                    <div className="control">
                                        <input type="text" className="input" name="place"
                                               onChange={handleChangeInput}
                                               value={newNote.place}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="column">
                                {/*  Attendees  */}
                                <div className="field">
                                    <div className="label">Attendees</div>
                                    <div className="control">
                                        <input type="text" className="input" name="attendee"
                                               onChange={handleChangeInput}
                                               value={newNote.attendee}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="label">Text</div>
                        <div className="control">
                                <textarea className="textarea" name="text"
                                          onChange={handleChangeInput}
                                          value={newNote.text}
                                />
                        </div>
                    </div>
                    <div className="is-flex is-justify-content-flex-end buttons">
                        <button className="button is-small is-primary" onClick={() =>handleClickSave(oldNote.id)}>SAVE</button>
                        <button className="button is-small is-light" onClick={onClose}>CLOSE</button>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
        )

}

export default NoteUpdateFormModal;