import React,{useEffect, useState} from 'react';
import './Items.css';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import Loader from '../Loader/Loader';

export default function Item({task}) {

	const [open,setOpen] = useState(false)
	const [cardRef,setCardRef] = useState()
  	const[visible,setVisible] = useState(false)

	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	useEffect(()=>{
	    let observer;
	    if(cardRef && visible !== true){
	      observer= new IntersectionObserver((entries)=>{
	        entries.forEach((entry)=>{
	           if (entry.isIntersecting) {
	              setVisible(entry.isIntersecting);
	              observer.unobserve(cardRef);
	            }
	        })
	      },
	      { threshold: 0.2 }
	      )
	      observer.observe(cardRef);
	    }

	    return () => {
	      if (observer && observer.unobserve) {
	        observer.unobserve(cardRef);
	      }
	    };
	}, [cardRef, visible])

	return (
		<>
			<div className='card' onClick={()=>openModal()} ref={setCardRef}>
			{visible?
				<>
					<div className='img-card'>
						{task.taskImage ?
		                    <img src={`http://localhost:3001/${task.taskImage[0]}`} alt='img'/>
							:
		                    <div className='loader-fit'>
		                      <Loader/>
		                    </div>                    	
	                  	}
					</div>
					<div className='img-content text-center'>																							
						<div className='img-person'>
							<p>{task.name + ' ' + task.surname}</p>
						</div>
						<div className='img-adress'>
							<p>{task.adress}</p>
							<p>{task.zip + ' ' + task.city}</p>
						</div>											
					</div>	
				</>			
				:			
				<div className='loader-fit'>
                	<Loader/>
              	</div>
			}	
			</div>

			<div>

				{open && <Backdrop />}

				{open && (
			        <Modal
			          canCancel
			          onCancel={closeModal}
			        >            			          
				      	<div>
					        <div className='img-modal'>
					          	{task.taskImage ?
				                    <img src={`http://localhost:3001/${task.taskImage[0]}`} alt='img'/>
									:
				                    <div className='loader-fit'>
				                      <Loader/>
				                    </div>                    	
			                  	}
					        </div>
					        <div className='img-content text-center'>                                             
					          	<div className='img-person'>
					            	<p>{task.name + ' ' + task.surname}</p>
					          	</div>
					          	<div className='img-date'>
					            	<p>{task.date}</p>
					          	</div>
					          	<div className='img-adress'>
					            	<p>{task.adress}</p>
									<p>{task.zip + ' ' + task.city}</p>
					          	</div>  
					           	<div className='img-task'>
					            	<p>{task.task}</p>          
					            </div>                      
					        </div>    
				      	</div>
			        </Modal>
		      	)}		
			</div>
		</>
	)
}