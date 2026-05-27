import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import Registration from './pages/Registration';
import Login from "./pages/Login";
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

const App = () => {
  return (
    <Routes>
      <Route 
      path='/' 
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
      />
      <Route
        path="/profile/:profileId/"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
       <Route
        path="/profile/:profileId/edit/"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/register/" element={<Registration/>} />
      <Route path="/login/" element={<Login />} />
      <Route path="/post/:postId/" element={
        <ProtectedRoute>
          <SinglePost />
        </ProtectedRoute>
      }
      />
    </Routes>
  );
}

export default App
