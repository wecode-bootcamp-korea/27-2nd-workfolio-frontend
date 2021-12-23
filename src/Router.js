import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Nav from './components/Nav/Nav';
import Detail from './pages/Detail/Detail';
import ListPage from './pages/ListPage/ListPage';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/list-page" element={<ListPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
