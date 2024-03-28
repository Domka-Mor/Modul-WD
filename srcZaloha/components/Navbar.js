import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {

	const [open,setOpen] = useState(false)

	const handleToggle = () => {
		setOpen(!open)
	}

	const closeNav = () => {
		setOpen(!open)
	}

	return (
		<>
			<div className="d-none d-lg-flex navbarAb">
			    <li><NavLink to="/" exact='true' activeclassname='active'>Pridaj podnet</NavLink></li>
			    <li><NavLink to="/podnety" activeclassname='active'>Zoznam podnetov</NavLink></li>	
		  	</div>

		  	<div className= 'd-lg-none py-3'>
	      		<nav className="container-fluid nav-min fixed-top">
	                <div className='row'>
						<button type='button' className='nav-btn' onClick={handleToggle}>
							<i className="fas fa-bars"></i>
						</button>
	                </div>
	                <div className='pt-2'>	
	                	<ul className={open?
							'nav-links show-nav':'nav-min nav-links1'}>	         
							<li><NavLink to="/" exact='true' activeclassname='active' onClick={closeNav}>Pridaj podnet</NavLink></li>
			    			<li><NavLink to="/podnety" activeclassname='active' onClick={closeNav}>Zoznam podnetov</NavLink></li>	
						</ul>
	            	</div>
	   	 		</nav>
			</div>
	  	</>
	)
}