import React from 'react';

function Header(props) {
    const {userInfo, onLogout} = props
    return (
        <div className="navbar is-primary">
            <div className="navbar-brand">
                <div className="navbar-item title is-4">Meeting Note</div>
            </div>
            <div className="navbar-menu ">
                <div className="navbar-end">
                    <div className="navbar-item">
                        {userInfo.displayName}
                    </div>
                    <div className="navbar-item">
                        <button className="button is-small" onClick={onLogout}>LOGOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;