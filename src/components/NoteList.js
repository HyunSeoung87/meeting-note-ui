import React, {useRef, useState} from "react";


function NoteList(props) {

    const {noteList, onSelectNote, noteStyle} = props
    const [style, setStyle] = useState(null)
    const tableStyle = useRef()
    const handleClickTable = (id) => {
        onSelectNote(id)

        // event.target.parentNode.className = "has-text-white has-background-dark"
    }


    return (
        <div className="block p-4">
            <table className="table is-fullwidth is-bordered is-hoverable tableTr">

                <thead>
                <tr>
                    <th>Date / Time</th>
                    <th>Title</th>
                    <th>Writer</th>
                </tr>
                </thead>
                <tbody>
                {noteList?.length === 0 && (
                    // ?는 데이터를 null이어도 안전하게 받을 수 있도록 해준다.
                    <tr>
                        <td colSpan={3}>No data</td>
                    </tr>
                )}
                {noteList?.length !== 0 && noteList.map((note) => {
                    return (
                        // key는 map 함수 때문에 설정한 것임
                        <tr ref={tableStyle} key={note.id} className={`${noteStyle ? 'is-clickable' : 'is-clickable has-text-white has-background-dark'}`} onClick={ () => handleClickTable(note.id)}  >

                            {/* onClick이 발생하면 함수를 실행한다는 뜻 */}
                            {/* 만약에 onClick={onSelectNote(note.id)}이면 함수의 리턴값을 onClick에게 전달해준다는 뜻! */}
                            <td>{note.meetingDate} {note.meetingTime}</td>
                            <td>{note.title}</td>
                            <td>{note.writerName}</td>
                        </tr>
                    )
                })}
                </tbody>

            </table>

        </div>
    );
}

export default NoteList;