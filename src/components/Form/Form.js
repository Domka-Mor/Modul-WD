import React,{ useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import './Form.css';
import InputHandler from './InputHandler';
import {checkFormData,checkLetter,checkNumber,checkSpecChar} from './InputFunc';

export default function Form() {

	const [responseMessage, setResponseMessage] = useState('')
	const [open,setOpen] = useState(false)

	const refForm = useRef();

	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

  	const resetForm = () => {
	    refForm.current.reset();
  	};

	const createNewTask = (e) => {
		e.preventDefault();		

		const now = new Date();
		const date = now.toLocaleDateString('en-GB')

		const data = new FormData(e.currentTarget);
	    data.append("date", date);

	    for (let [key, value] of data.entries()) {
	    	console.log(key,value)
	      	if(typeof(value) === 'string'){
		      	const result = checkFormData(key, value, checkNumber, checkSpecChar, checkLetter)
		      	if(!result){
		      		setResponseMessage('Halóó, niečo ti tam chýba!')
		      		openModal();
		      		return;
		      	}
		    } else if(key === 'taskImage'){
		    	if(typeof value === 'object' && value !== null && value.size === 0){
		    		setResponseMessage('Prilož obrázok, nešaškuj.')
		    		openModal();
		    		return;
		    	}
		    }
	    }

	    fetch('http://localhost:3001/task/new', {
	      method: 'post',	      
	      body:data
	    })
	    .then((response) => {
			  return new Promise((resolve) => response.json()
			    .then((json) => resolve({
			      status: response.status,
			      ok: response.ok,
			      json,
			    })));
		}).then(({ status, ok, json }) => {
		  	let text = '';
		  	switch (status) {
		    case 201 || 200:
		    	text = 'Podnet bol vytvorený, ďakujeme.'
		   		setResponseMessage(text);
		   		resetForm();
		   		openModal();
		    break;
		    case 500:
		    	text = 'OMG, nedefinovaná chyba! :O'
			    setResponseMessage(text);
			    resetForm();
		   		openModal();
		    break; 
		    default:
		    	text = 'Dobre už bolo... :/' 
		    	setResponseMessage(text);
		    	resetForm();
		   		openModal();
		  }
		})         
	}; 

	return (
		<>
			<div className='body-auth'>
		        <div className='box-auth'>
		          <div className='square' style={{"--i":0}}></div>
		          <div className='square' style={{"--i":1}}></div>
		          <div className='square' style={{"--i":2}}></div>
		          <div className='square' style={{"--i":3}}></div>
		          <div className='square' style={{"--i":4}}></div>
		          <div className='container-auth'>
		            <div className='form-auth'>
		              <h2 className='text-center'>Vytvor podnet</h2>
			            <form onSubmit={createNewTask} ref={refForm}>
			                <div className='inputBox'>
				                <div>
			                  		<InputHandler input type='text' value='name' messageType='text' placeholder='Meno'/>  
				                </div>
			                	<div>
			                  		<InputHandler input type='text' value='surname' messageType='text' placeholder='Priezvisko'/> 
			                	</div>                 
			                </div>
			                <div className='inputBox'>
			                	<div>
				                  	<InputHandler input type='text' value='adress' messageType='specChar' placeholder='Adresa'/>
			                  	</div>
			                </div>
			                <div className='inputBox'>
				                <div>
			                  		<InputHandler input type='text' value='zip' messageType='number' placeholder='PSČ'/>
				                </div>
			                	<div>
			                  		<InputHandler input type='text' value='city' messageType='text' placeholder='Mesto'/>
			                	</div>                 
			                </div>
			                <div className='input'>
								<InputHandler textarea value='task' messageType='default' placeholder='Tvoj podnet...'/>
			                </div>		                

			                <div className='input-image'>
			                	<InputHandler image type='file' value='taskImage' messageType='default'/>
			                </div>

			                <div className='input'>
			                  <InputHandler button action='Potvrdiť'/>
			                </div>      
			            </form>
		            </div>
		          </div>
		        </div>	        
	        </div>

        	<div>

		        {open && <Backdrop />}

		        {open && (
			        <Modal
			          canCancel
			          onCancel={closeModal}
			        > 
			        	<div className='text-center'>             			          		                                                   
					        <p className='info-modal'>{responseMessage}</p>      					        
				        </div>  
			        </Modal>
		      	)}	
        	</div>
        </>
	)
}