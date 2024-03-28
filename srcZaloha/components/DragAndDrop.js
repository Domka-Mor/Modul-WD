import React from 'react';

export default class DragAndDrop extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
			drag: false      
	    }
	}

	dropRef = React.createRef();

	handleDrag = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
	}

  	handleDragIn = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
	    this.dragCounter++
	    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
	      this.setState({drag: true})
	    }
  	}

  	handleDragOut = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
	    this.dragCounter--
	    if (this.dragCounter === 0) {
	      	this.setState({drag: false})
	    }
	}

  	handleDrop = (e) => {
	    e.preventDefault()
	    e.stopPropagation()
	    this.setState({drag: false})
	    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
		    this.props.handleDrop(e.dataTransfer.files)
		    e.dataTransfer.clearData()
		    this.dragCounter = 0    
	    }
	}

  	componentDidMount() {
	    let div = this.dropRef.current
	    div.addEventListener('dragenter', this.handleDragIn)
	    div.addEventListener('dragleave', this.handleDragOut)
	    div.addEventListener('dragover', this.handleDrag)
	    div.addEventListener('drop', this.handleDrop)
	}

  	componentWillUnmount() {
	    let div = this.dropRef.current
	    div.removeEventListener('dragenter', this.handleDragIn)
	    div.removeEventListener('dragleave', this.handleDragOut)
	    div.removeEventListener('dragover', this.handleDrag)
	    div.removeEventListener('drop', this.handleDrop)
	}

	render() {
		return (
			<div className="add-photo-body-border" ref={this.dropRef}>
				<div className="text-div2 text-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<path fill="#ffffff" d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
					</svg>
					<p>{this.props.addPhotoText}</p>				
				</div>
			</div>

		)
	}
}