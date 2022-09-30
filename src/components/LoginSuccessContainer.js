//LoginSuccessContainer.js
import React, {useEffect, useState} from 'react';
import Header from "./Header";
import axios from "axios";
import _ from "lodash";
import NoteList from "./NoteList";
import NoteDetail from "./NoteDetail";
import NoteFormModal from "./NoteFormModal"


function LoginSuccessContainer(props) {
    const {userInfo, onLogout} = props
    const [noteList, setNoteList] = useState([])
    const [selectedNote, setSelectNote] = useState(null)
    const [style, setStyle] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get("/api/v1/notes").then(res => res.data)
            .then(payload => {
                setNoteList(payload.data)
            })
    }
    // 빈 배열이므로 한 번만 실행됨.. 만약에 userInfo면 userInfo가 변경될 때마다 실행됨

    const handleSelectNote = (noteId) => {
        const findNote = _.find(noteList, {id:noteId})
    //    noteList에서 key는 id인것을 찾고 noteId와 같은 value를 찾는다.
        setSelectNote(findNote)
        setStyle(style ? false : true)
        // var noteS =
    //    useRef 사용해보기
    }


    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    const closeAndFetch = () => {
        closeModal()
        fetchData()
        // 닫고 데이터를 다시 받아와라
    }

    return (
        <div>
            <Header userInfo={userInfo} onLogout={onLogout}/>
            <div className="is-flex is-justify-content-flex-end px-4 pt-4 pb-0 mb-0">
                <button className="button is-primary is-small" onClick={openModal}>NEW</button>
            </div>
            <NoteList noteList={noteList} onSelectNote={handleSelectNote} noteStyle = {style}/>
            {!!selectedNote && <NoteDetail note={selectedNote}/>}
            {showModal && <NoteFormModal show={showModal} onClose={closeModal} userId={userInfo.userId} onSaved={closeAndFetch}/>}
        </div>
    );

}

export default LoginSuccessContainer;