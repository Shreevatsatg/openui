import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Components from "./pages/Components";
import ComponentDetail from "./pages/ComponentDetail";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import ComponentEditor from "./pages/ComponentEditor";
import Admin from "./pages/Admin";
import ContributeLayout from "./pages/contribute/ContributeLayout";
import ContributeIndex from "./pages/contribute/ContributeIndex";
import ContributeWorkflow from "./pages/contribute/ContributeWorkflow";
import ContributeThemes from "./pages/contribute/ContributeThemes";
import ContributeSnippets from "./pages/contribute/ContributeSnippets";
import InstallationReact from "./pages/contribute/InstallationReact";
import InstallationNext from "./pages/contribute/InstallationNext";
import ComponentsShell from "./pages/ComponentsShell";

const Layout = () => (
  <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
    <Navbar />
    <main className="flex-1 flex">
      <Outlet />
    </main>
  </div>
);

const CentralRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<ComponentsShell />}>
            <Route index element={<Components />} />
            <Route path=":slug" element={<ComponentDetail />} />
          </Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="contribute" element={<ContributeLayout />}>
            <Route index element={<ContributeIndex />} />
            <Route path="workflow" element={<ContributeWorkflow />} />
            <Route path="themes" element={<ContributeThemes />} />
            <Route path="snippets" element={<ContributeSnippets />} />
            <Route path="installation/react" element={<InstallationReact />} />
            <Route path="installation/nextjs" element={<InstallationNext />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsShell />}>
          <Route index element={<Components />} />
          <Route path=":slug" element={<ComponentDetail />} />
        </Route>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="contribute" element={<ContributeLayout />}>
          <Route index element={<ContributeIndex />} />
          <Route path="workflow" element={<ContributeWorkflow />} />
          <Route path="themes" element={<ContributeThemes />} />
          <Route path="snippets" element={<ContributeSnippets />} />
          <Route path="installation/react" element={<InstallationReact />} />
          <Route path="installation/nextjs" element={<InstallationNext />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/submit" element={<ComponentEditor />} />
        <Route path="/edit/:id" element={<ComponentEditor />} />
        <Route path="/admin" element={user.role === "admin" ? <Admin /> : <Navigate to="/" replace />} />

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
