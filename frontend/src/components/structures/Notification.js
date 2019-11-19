import React from 'react';

function Notification(props) {
    return (
        props.text.length !== 0 && (
            <div style={{border: '1px solid red'}}>
                {props.text}
                <button onClick={() => props.hideNotification()}>Hide</button>
            </div>
        )
    );
}

export default Notification;
