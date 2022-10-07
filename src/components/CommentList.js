import React, {Component} from 'react';
import axios from "axios";

function CommentList(props) {
    const {noteId, commentList, fetch} = props



    return (
        <div className="block p-4">
        { commentList?.length !== 0 && commentList.map((cmmt) => {
            return(
                <div key={cmmt.id} className="media">
                    <div className="media-content">
                        <div className="content">
                            <div>
                                <strong>{cmmt.writerName}</strong>
                                <div>{cmmt.text}</div>
                            </div>
                        </div>
                        <nav className="level is-mobile">
                            <div className="level-left">
                                <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-reply"></i></span>
                                </a>
                                <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                                </a>
                                <a className="level-item">
                                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div className="media-right">
                        <button className="delete" onClick={() =>fetch(noteId, cmmt.id)}></button>
                    </div>
                </div>
            )


            })}
        </div>
    )
}

export default CommentList;