import React from 'react';
import './Error.css';
import {NavLink} from 'react-router-dom';

export default function Error() {
	return (
		<div className='body-error'>
			<div>
				<div className='text-center text-uppercase'>
					<h1 className='display-3'>404</h1>
					<h1>error</h1>
					<h4>stránka sa nenašla :(</h4>
					<button type="button" className="btn btn-outline-light mt-2">
						<NavLink to='/' className='home-btn'>
							späť domov
						</NavLink> 
					</button>
				</div>
			</div>
		</div>
	)
}