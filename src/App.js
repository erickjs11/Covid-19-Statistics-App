import './App.css';
import Current from './Components/Current/Current';
import Navbar from './Components/Navbar/Navbar';
import Historic from './Components/Historic/Historic';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {

  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes> 
          <Route
            exact
            path="/"
            element={
              <Current/>
            }
          />
          <Route
            exact
            path="/historic"
            element={
              <Historic/>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
