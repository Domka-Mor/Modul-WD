import React from 'react';
import './Modal.css';
import InputHandler from '../Form/InputHandler';

const modal = (props) => (
  <div className="card-modal">
    <div className='container-modal'>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        {props.canCancel && (          
          <InputHandler button onClick={props.onCancel} action='Zavrieť'/>          
        )}       
      </div>
    </div>
  </div>
);

export default modal;