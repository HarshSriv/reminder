import React from 'react';
import "../styles/PopupModal.css";

const PopupModal = ({ isOpen, onClose, message }) => {
  return (
    <div className={`popup-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupModal;
