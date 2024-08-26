import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css'
import './assets/fonts/fonts.css';

const App = () => (
  <div>
    <Header />
    <Outlet />
    {/* <Footer /> */}
  </div>
);

export default App;
