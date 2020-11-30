import React from 'react';
import ReactDOM from 'react-dom';

// first argument of creating the portal is a blob of JSX, second argument is a refernce to the element we want to render this portal into. We need to create a new div in our html file. dont forget the "," after first argument (e.g. </div>,)
// onClick={e => e.stopPropagation()} to prevent the event bubbling up to the parent, so that only if we click on the background behind the modlto close the modal
const Modal = props => {
    return ReactDOM.createPortal(
        <div
            onClick={props.onDismiss}
            className="ui dimmer modals visible active"
        >
            <div
                onClick={e => e.stopPropagation()}
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;
