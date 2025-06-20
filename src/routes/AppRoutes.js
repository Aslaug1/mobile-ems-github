import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
