import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import RefreshHandler from './RefreshHandler'

const App = () => {
const [useAuthenticated, setUthenticated] = useState(false)

const PrivateRoute = ({element}) =>{
 return useAuthenticated ? element : <Navigate to ="/login"/>
}
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setUthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  )
}

export default App
