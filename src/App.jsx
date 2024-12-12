import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Mainpage from './Pages/Mainpage'
import DetailsPage from './Pages/DetailsPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/mainpage' element={<Mainpage/>}/>
            <Route path='/details/:id' element={<DetailsPage />}/>
          </Routes>
        </Router>
       
      </div>
    </>
  )
}

export default App
