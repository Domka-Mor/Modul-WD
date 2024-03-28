export const containsNumbers = (str) =>{
    return /\d/.test(str);
}

export const checkNumber = (text) => {
    if(!containsNumbers(text)){
      	return false;
    }
	return true;
}

export const containsLetters = (str) =>{
    return /[a-zA-Z]/g.test(str);
}

export const checkLetter = (text) => {
    if(!containsLetters(text)){
      	return false;
    }
	return true;
}

export const checkSpecChar = (text) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

	if(format.test(text)){
	  	return true;
	} else {
	  	return false;
	}
}

export const checkInputValue = (type, value, messageState, numberCb, specCharCb, letterCb) => {
	if (value.trim().length ===0){
		messageState('Prázdne :(')		 	
      	return false;	   
	} else if(type === 'number'){
		if(!numberCb(value) || specCharCb(value) || letterCb(value)){	
			messageState('LOL, len čísla.')		 	
	      	return false;
	    }
	} else if (type === 'text'){
		if(!letterCb(value) || numberCb(value) || specCharCb(value)){	
			messageState('LOL, len písmená.')		 	
	      	return false;
	    }		   
	} else if (type === 'specChar'){
		if(specCharCb(value)){	
			messageState("Ak nie si 'špeciálny', nepoužívaj také znaky.")		
	      	return false;
	    }		   
	}
	else if (!type === 'default'){			
		messageState('')	 	
      	return false;		    	   
	}

	messageState('')	 
	return true;
}

export const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay);
    };
};

export const checkFormData = (type, value, numberCb, specCharCb, letterCb) => {
	if (value.trim().length ===0){	 	
      	return false;	   
	} else if(type === 'zip'){
		if(!numberCb(value) || specCharCb(value) || letterCb(value)){	 	
	      	return false;
	    }
	} else if (type === 'name' || type === 'surname' || type === 'city'){
		if(!letterCb(value) || numberCb(value) || specCharCb(value)){		 	
	      	return false;
	    }	   
	} else if (type === 'address'){
		if(specCharCb(value)){		
	      	return false;
	    }	 	   
	} 
	return true;
}