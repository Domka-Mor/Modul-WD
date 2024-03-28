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
					<h3>page not found</h3>
					<button type="button" className="btn btn-outline-dark mt-2">
						<NavLink to='/' className='home-btn'>
							return home
						</NavLink> 
					</button>
				</div>
			</div>
		</div>
	)
}