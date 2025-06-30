import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Sign/Login/Login';
import Register from './components/Sign/Register/Register';

import { ROUTES } from './constants';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={`/${ROUTES.LOGIN}`} element={<Login />} />
        <Route path={`/${ROUTES.REGISTER}`} element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
