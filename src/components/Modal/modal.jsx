import React from 'react';
import "./modal.css"

const Modal = ({isOpen, onClose, children}) => {
    return (
      <div className='Modal-container' style={{display:isOpen ? "grid":"none"}}>
        <div className="Modal-body">
          <button className="buton btn btn-" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
}

export default Modal;