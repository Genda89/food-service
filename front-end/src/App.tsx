import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Sign/Login/Login';
import Register from './components/Sign/Register/Register';

import { PATHS } from './constants';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/${PATHS.LOGIN}`} element={<Login />} />
        <Route path={`/${PATHS.REGISTER}`} element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
