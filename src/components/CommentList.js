import React, {Component} from 'react';

function CommentList(props) {
    const {commentList} = props
    return (
        <div className="block p-4">
            <p>asdfasdfasdf</p>
            <p>{commentList.text}</p>
        {/*    TODO
            여기 unreachable인데 이거 왜 인지 알아내고 수정하기
        */}
        { commentList?.length !== 0 && commentList.map((cmmt) => {
            return
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{cmmt.writerName}</strong>
                                <p>{cmmt.text}</p>
                            </p>
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
                        <button className="delete"></button>
                    </div>
                </article>

            })}
        </div>
    )
}

export default CommentList;