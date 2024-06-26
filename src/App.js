import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import Items from './components/Items/Items';
import Error from './components/Error/Error';

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
