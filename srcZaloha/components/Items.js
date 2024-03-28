import React,{useEffect, useState,Suspense,lazy} from 'react';
import './Items.css';
import Loader from './Loader';
const Item = lazy(() => import('./Item'));

export default function Items() {

	const[tasks,setTasks] = useState([])

	const reorderArr = (arr) => {
		const reOrderedArr = arr.reverse();
		setTasks(reOrderedArr);

		// let newArr = []

		// for(let i=arr.length-1; i >= 0; i--){			
		// 	newArr.push(arr[i])			
		// }

		// setTasks(newArr);
	}

	useEffect(() => {

		const fetchProducts = () => {
	    fetch('http://localhost:3001/task/', {
	      method: 'get',
	      headers: {'Content-Type': 'application/json'}
	    })
	    .then(res => {
	        if (res.status !== 200 && res.status !== 201) {
	          throw new Error('Failed!');
	        }
	        return res.json();
	    })
	    .then(resData => {
	        reorderArr(resData.tasks) 
	        console.log(resData.tasks)  
	    })
	    .catch(err => {
	        console.log(err);
	    });
  	}

  	fetchProducts()	
	}, [])

	return (
		<div className='body-items'>
			<Suspense fallback={
              <div className='loader-suspense'>
                <Loader/>
              </div>
              }
            >
				<div className='items-wrap'>
					{tasks.map((task,index)=>{
				 		return <Item key={index} task={task}/>;
				 	})}				
				</div>	
			</Suspense>
		</div>	
	)
}