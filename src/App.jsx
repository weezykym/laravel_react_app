
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Create from './Posts/Create';


export default function App(){
  const {user} = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='/register' element={user? <Home /> : <Register />} />
          <Route path='/login' element={user? <Home /> : <Login />} />

          <Route path= '/create' element= {user? <Create /> : <Login />} ></Route>          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

