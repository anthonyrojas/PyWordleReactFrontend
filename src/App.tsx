import React from 'react';
import AuthProvider from './Providers/AuthProvider';
import WordsProvider from './Providers/WordsProvider';
import WordGrid from './Components/WordGrid/WordGrid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import AuthenticatedRoute from './HOC/AuthenticatedRoute';
import NavigationBar from './Components/Navigation/NavigationBar';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
        <div className="App bg-gray-900 flex flex-row items-center justify-content-center justify-center">
          <div className="container p-1">
            <WordsProvider>
                <Routes>
                  <Route 
                    path="/login"
                    element={<Login />}
                  />
                  <Route 
                    path="/"
                    element={<AuthenticatedRoute children={<WordGrid />} />}
                  />
                  <Route 
                    path="/profile"
                    element={
                      <AuthenticatedRoute children={<Profile />} />
                    }
                  />
                  <Route 
                    path="/register"
                    element={
                      <Register />
                    }
                  />
                </Routes>
            </WordsProvider>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
