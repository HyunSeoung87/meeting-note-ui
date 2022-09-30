import React from 'react';

function NoteDetail(props) {
// 삭제 시 confirm 창으로 취소 확인 받기

    const {note} = props

    return (
        <div className="block p-4">
            <hr/>
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
        </div>
    );
}

export default NoteDetail;