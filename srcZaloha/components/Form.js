import React,{ useRef, useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';
import DragAndDrop from './DragAndDrop';
import './Form.css';

export default function Form(props) {

	const [nameMessage, setNameMessage] = useState('');
	const [surnameMessage, setSurnameMessage] = useState('')
	const [adressMessage, setAdressMessage] = useState('')
	const [zipMessage, setZipMessage] = useState('')
	const [cityMessage, setCityMessage] = useState('')
	const [taskMessage, setTaskMessage] = useState('')
	const [imageMessage, setImageMessage] = useState('')
	const [responseMessage, setResponseMessage] = useState('')

	const [image, setImage] = useState()
	const refName = useRef();
	const refSurname = useRef();
	const refAdress = useRef();
	const refZip = useRef();
	const refCity = useRef();
	const refTask = useRef();
	const refForm = useRef();

	const [open,setOpen] = useState(false)

	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	const containsNumbers = (str) =>{
	    return /\d/.test(str);
	}

  	const checkNumber = (text) => {
	    if(!containsNumbers(text)){
	      	return false;
	    }
    	return true;
  	}

  	const checkSpecChar = (text) => {
	    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

		if(format.test(text)){
		  	return true;
		} else {
		  	return false;
		}
  	}

	const checkInputValue = (type, value, message, messageState, numberCb, specCharCb) => {

		if (value.trim().length ===0){
			messageState('Empty field')		 	
	      	return false;	   
		} else if(type === 'number'){
			if(numberCb(value) && !specCharCb(value)){	
				messageState('')			 	
		      	return true;
		    }
		} else if (type === 'text'){
			if(!numberCb(value) && !specCharCb(value)){	
				messageState('')		 	
		      	return true;
		    }		   
		} else if (type === 'specChar'){
			if(!specCharCb(value)){	
				messageState('')	 	
		      	return true;
		    }		   
		}
		else if (type === 'image'){			
			messageState(value)	 	
	      	return true;		    	   
		}

		messageState(message)	 
		return false;
	}

  	const resetForm = () => {
	    refForm.current.reset();
	    setNameMessage('')
		setSurnameMessage('')
		setAdressMessage('')
		setZipMessage('')
		setCityMessage('')
		setTaskMessage('')
		setImageMessage('')
  	};


	const createNewTask = (e) => {
		e.preventDefault();

		const nameTest = checkInputValue('text',refName.current.value, 'Field must contain only letters.',setNameMessage,checkNumber,checkSpecChar);
		const surnameTest = checkInputValue('text',refSurname.current.value, 'Field must contain only letters.',setSurnameMessage,checkNumber,checkSpecChar);
		const cityTest = checkInputValue('text',refCity.current.value, 'Field must contain only letters.',setCityMessage,checkNumber,checkSpecChar);
    	const adressTest = checkInputValue('specChar',refAdress.current.value, 'Field can`t contain special characters.',setAdressMessage,checkNumber,checkSpecChar);
    	const zipTest = checkInputValue('number',refZip.current.value, 'Only numbers, please.',setZipMessage,checkNumber,checkSpecChar);
    	const taskTest = checkInputValue('size',refTask.current.value, '',setTaskMessage);
   		const imageTest = checkInputValue('image',image ? image.name : '', '',setImageMessage);

	    if (!nameTest || !surnameTest || !cityTest || !adressTest || !zipTest || !taskTest || !imageTest) {	    
	    	console.log(nameTest,surnameTest,cityTest,adressTest,zipTest ,taskTest ,imageTest)	
	      return;
	    }

		const now = new Date();
		const date = now.toLocaleDateString('en-GB')

		const data = new FormData();
	    data.append("name", refName.current.value);
	    data.append("surname", refSurname.current.value);
	    data.append("date", date);
	    data.append("adress", refAdress.current.value);
	    data.append("zip", refZip.current.value);
	    data.append("city", refCity.current.value);
	    data.append("task", refTask.current.value);
	    data.append("taskImage", image);
	    
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
		    	text = 'Podnet bol vytvoreny, dakujeme.';
		   		setResponseMessage(text);
		   		resetForm();
		   		openModal();
		    break;
		    case 500:
		    	text = 'Nedefinovaná chyba'
			    setResponseMessage(text);
			    resetForm();
		   		openModal();
		    break; 
		    default:
		    	text = 'Skúsil si, nevyšlo...' 
		    	setResponseMessage(text);
		    	resetForm();
		   		openModal();
		  }
		})         
	}; 

	const dropHandler = (file) => {
		inputHandler(file[0]);
	}

	const fileChangedHandler = (event) => {
	  	inputHandler(event.target.files[0]);
	  	console.log('hjee')
	}

	const inputHandler = (file) => {	
    	const maxFileSize = 500000;
    	
    	if (file.type.split("/")[0] === "image" && file.size <= maxFileSize) {
    		setImage(file)
		} else if (file.type.split("/")[0] === "image" && file.size >= maxFileSize){
			setResponseMessage(`${file.name} prekročil povolenú veľkosť súboru 5MB`);
			openModal();
		} else{
		   setResponseMessage(`${file.name} nie je podporovaný typ súboru`); 
		   openModal();
		}	      
	}

	const deleteFile = () => {
		setImage(null)
	}

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
		              <h2 className='text-center'>Sign Up</h2>
			            <form ref={refForm}>
			                <div className='inputBox'>
				                <div>
				                	<input type='text' placeholder='enter name' id='name' ref={refName}/>
			                  		<small id="name">{nameMessage}</small>
				                </div>
			                	<div>
			                		<input type='text' placeholder='enter surname' id='surname' ref={refSurname}/>
			                  		<small id="surname">{surnameMessage}</small>
			                	</div>                 
			                </div>
			                <div className='inputBox'>
			                	<div>
				                  	<input type='text' placeholder='enter address' id='address' ref={refAdress}/>
				                  	<small id="address">{adressMessage}</small>
			                  	</div>
			                </div>
			                <div className='inputBox'>
				                <div>
				                	<input type='text' placeholder='enter zip' id='zip' ref={refZip}/>
			                  		<small id="zip">{zipMessage}</small>
				                </div>
			                	<div>
			                		<input type='text' placeholder='enter city' id='city' ref={refCity}/>
			                  		<small id="city">{cityMessage}</small>
			                	</div>                 
			                </div>

			                <div className='input'>
				                <div>
								  <textarea id="problem" name="problem" rows="4" cols="40" maxLength="160" placeholder='Your problem:' style={{resize: 'none'}} ref={refTask}/>
								  <small id="text">{taskMessage}</small>
				                </div>
			                </div>

			                <div className='input-image'>
			                	<div className='dragdrop'>
				                	<DragAndDrop handleDrop={dropHandler} addPhotoText='Choose or drop image here'/>
				                	<div className='add-photo'>
					                	<label htmlFor="inputField"></label>
										<input type="file" id="inputField" name="file" accept="image/*" onChange={(e) => {fileChangedHandler(e)}} style={{display:'none'}}/>
										{!image && <small id="image" className='text-small'>{imageMessage}</small>}
									</div>
								</div>

								{image && (
						          	<div className='photoArr text-center'>							            
							            <div className='photoPreloader text-center'>	
							            	<p className='deletePhoto' onClick={() => deleteFile()}>x</p> 							              		 
									    	<img src={(URL.createObjectURL(image))} alt={image.name} className='img-preloader'/>	             	
								        </div>							                       
						          	</div>					          
						        )}
								

						        {/*<div>  
						        	<label htmlFor="inputField">Choose file</label>
									<input type="file" id="inputField" name="file" accept="image/*" onChange={(e) => {fileChangedHandler(e)}} style={{display:'none'}}/>          				             
				                  	<small id="image">{imageMessage}</small>
				                </div>*/}
			                </div>

			                <div className='input'>
			                  <button className='auth-btn' onClick={(e)=>{createNewTask(e);}}>Submit</button>
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
			        	<div className='p-4 m-3 text-center'>             			          		                                                   
					        <h3>{responseMessage}</h3>      					        
				        </div>  
			        </Modal>
		      	)}	
        	</div>
        </>
	)
}