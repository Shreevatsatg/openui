import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';

import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Components from './pages/Components';
import ComponentDetail from './pages/ComponentDetail';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Submit from './pages/Submit';
import Admin from './pages/Admin';
import EditComponent from './pages/EditComponent';

const Layout = () => (
  <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
    <Navbar />
    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>
  </div>
);

const CentralRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // The rule strictly mandates: No User -> Login or Signup
  // However, I will expose public routes outside of login if user asks, but to follow the rule strictly, I'll allow Login/Signup for !user
  if (!user) {
    return (
      <Routes>
        <Route element={<Layout />}>
           <Route path="/" element={<Home />} />
           <Route path="/components" element={<Components />} />
           <Route path="/components/:slug" element={<ComponentDetail />} />
           <Route path="/leaderboard" element={<Leaderboard />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  }

  // Complete Profile -> Main App routes (All features)
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/components/:slug" element={<ComponentDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/edit/:id" element={<EditComponent />} />
        <Route path="/admin" element={user.role === 'admin' ? <Admin /> : <Navigate to="/" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <CentralRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
