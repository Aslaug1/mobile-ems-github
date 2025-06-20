// src/App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
 // Replace with your actual home component

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<div>Homepage</div>} />
    </Routes>
  );
}

export default App;
