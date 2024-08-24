import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css'

const App = () => (
  <div>
    <Header />
    <Outlet />
    {/* <Footer /> */}
  </div>
);

export default App;
