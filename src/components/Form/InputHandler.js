import { useState, useRef} from "react";
import {checkInputValue,checkLetter,checkNumber,checkSpecChar,debounce} from './InputFunc';
import DragAndDrop from './DragAndDrop';
import './Form.css';

export default function InputHandler(props) {

	const [message, setMessage] = useState('');
	const [image, setImage] = useState(null);

	const refInput = useRef()

	const prepareMessage = () => {
		checkInputValue(refInput.current.id,refInput.current.value,setMessage,checkNumber,checkSpecChar, checkLetter);		
	}; 
	
	const dropHandler = (file) => {
		inputHandler(file[0]);
	}

	const fileChangedHandler = (event) => {
	  	inputHandler(event.target.files[0]);
	}

	const inputHandler = (file) => {	
    	const maxFileSize = 5000000;

    	if (file.type.split("/")[0] === "image" && file.size <= maxFileSize) {
    		setImage(file)
    		setMessage(''); 
		} else if (file.type.split("/")[0] === "image" && file.size >= maxFileSize){
			setMessage(`${file.name} prekročil povolenú veľkosť súboru 5MB`);
			setImage(null)
		} else{
		   setMessage(`${file.name} nie je podporovaný typ súboru`); 
		   setImage(null)
		}	      
	}

	const deleteFile = () => {
		setImage(null)
	}

	return (
		<>
			{props.input && (
				<div>
					<input type={props.type} id={props.messageType} placeholder={props.placeholder} name={props.value} ref={refInput} onChange={debounce(prepareMessage)}/>
				  	<small id={props.value}>{message}</small>	
			  	</div>
			)}

			{props.textarea && (
				<div>			  	
				  	<textarea id={props.value} name={props.value} rows="4" cols="40" maxLength="160" placeholder={props.placeholder} style={{resize: 'none'}} ref={refInput}/>
					<small id={props.value}>{message}</small>	
			  	</div>
			)}

			{props.image && (
				<>
	            	<div className='dragdrop'>
	                	<DragAndDrop handleDrop={dropHandler} addPhotoText='Vyber alebo presuň obrázok'/>
	                	<div className='add-photo'>
		                	<label htmlFor="inputField"></label>
							<input type={props.type} id="inputField" name={props.value} accept="image/*" onChange={(e) => {fileChangedHandler(e)}} style={{display:'none'}}/>
							{!image && <small id={props.value}>{message}</small>}
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
		        </>
            )}

			{props.button && (
            	<button className='auth-btn' onClick={props.onClick}>{props.action}</button>
            )}
	   </>
	)
}