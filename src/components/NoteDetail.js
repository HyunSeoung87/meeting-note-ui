import React, {useState, useEffect} from 'react';
import axios from "axios";
import NoteUpdateFormModal from "./NoteUpdateFormModal";
import CommentList from "./CommentList";

function NoteDetail(props) {
// 삭제 시 confirm 창으로 취소 확인 받기

    const {note, userId, onSaved, onSelectNote} = props
    const [showModal, setShowModal] = useState(false)
    const [newComment, setNewComment]= useState({
        "noteId": 0,
        "writerId": 0,
        "text": ""
    })
    const [commentList, setCommentList] = useState([])
    const [showComment, setShowComment] = useState(false)

    const deleteNote = (id) => {
        if (window.confirm("삭제하시겠습니까?")) {
            alert("삭제되었습니다.")
            axios.delete("/api/v1/notes/"+id).then(res => res.data)
        }
        else {
            alert("취소되었습니다.")
        }
    }
    // TODO
    // 여기서 fetchData를 이용해 데이터를 detail이 바뀔 때 마다 불러오기
    useEffect(() => {
        fetchData()
    }, note.id)

    const handleChangeInput = (event) => {
        const key = event.target.name
        const value = event.target.value
        setNewComment(old => {
            return {...old, [key]: value}
        })
    }

    const fetchData = () => {
        axios.get("/api/v1/notes/"+note.id+"/comments/list").then(res => res.data)
            .then(payload => {
                console.log(payload.data)
                setCommentList(payload.data)
                if (!!commentList){
                    setShowComment(true)
                }
            })
    }
    const handleClickSave = () => {
        if(!newComment.text){
            return
        }
        // API
        const payload = {...newComment, writerId: userId, noteId : note.id}
        // writerId 에 userId를 넣는다.
        console.log(userId)

        axios.post("/api/v1/notes/"+note.id+"/comments", payload).then(response => {
            console.log(response.status)
            onSaved()
            fetchData()
        })


    }

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="block p-4">
            <hr/>
            <div className="is-flex is-justify-content-flex-end px-4 pt-4 pb-0 mb-0">
                <button className="button is-primary is-small " onClick={() =>deleteNote(note.id)}>DELETE</button>
                <button className="button is-primary is-small" onClick={openModal}>UPDATE</button>
            </div>
            <div className="title">{note.title}</div>
            <table className="table is-fullwidth">
                <tbody>
                <tr>
                    <th>Date / Time</th>
                    <td>{note.meetingDate ?? "-"} / {note.meetingTime ?? "-"}</td>
                {/* 값이 있으면 앞 데이터, 없으면 뒤 데이터  */}
                </tr>
                <tr>
                    <th>Place</th>
                    <td>{note.place ?? "-"}</td>
                </tr>
                <tr>
                    <th>Attendees</th>
                    <td>{note.attendee ?? "-"}</td>
                </tr>
                <tr>
                    <th>Writer</th>
                    <td>{note.writerName ?? "-"}</td>
                </tr>

                </tbody>
            </table>
            <pre className="box has-background-white-ter">{note.text}</pre>
            <hr/>
            {showComment && <CommentList commentList={commentList}/>}
            <article className="media">
                <div className="media-content">
                    <div className="field control">
                        <p className="control">
                            <input type="text" className="input" name="text" placeholder="Add Comment..." onChange={handleChangeInput} value={newComment.text} />
                        </p>
                    </div>
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <a className="button is-info" onClick={handleClickSave}>Submit</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </article>

        </div>
    );
}

export default NoteDetail;