import { Layout } from './components/Layout';
import { UsersPage } from './pages/Users';
import { UserDetailPage } from './pages/UserDetail.tsx';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/dashboard" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
