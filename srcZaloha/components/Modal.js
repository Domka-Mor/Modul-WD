import React from 'react';
import './Items.css';

const modal = (props) => (
  <div className="card-modal">
    <div className='container-modal'>
      <div className="modal__content">{props.children}</div>
      <div className="modal__actions">
        {props.canCancel && (
          <div className='modal-btn text-center'>
            <button className='cancel-btn' onClick={props.onCancel}>Close</button>
          </div> 
        )}       
      </div>
    </div>
  </div>
);

export default modal;