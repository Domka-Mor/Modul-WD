import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Items from './components/Items';
import Error from './components/Error';

function App() {

  return(
    <>           
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Form/>} />
          <Route path="/podnety"  element={<Items/>}/> 
          <Route path='*' element={<Error/>}/>  
        </Routes>
        </div>
    </>
  )
}

export default App;
