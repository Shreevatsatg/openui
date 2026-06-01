# Core Project Source Code

This document contains the primary source code files for both the frontend and backend of the application, formatted and prepared for documentation printouts.

---

# Frontend Source Code

## File: `frontend/src/App.tsx`
* **Role:** Application Entrypoint & Central Router. Establishes context wrappers and controls the routing paths based on authorization states.

```tsx
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
import LivePreviewPage from "./pages/LivePreviewPage";
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
        <Route path="/live-preview/:slug" element={<LivePreviewPage />} />
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
      <Route path="/live-preview/:slug" element={<LivePreviewPage />} />
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
```

---

## File: `frontend/src/context/AuthContext.tsx`
* **Role:** State provider for managing logged-in user profiles, session validation, tokens, and active sessions.

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  hasProfile: boolean;
  onboarded: boolean;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get<User>('/api/auth/me')
      .then(res => {
        const u = res.data;
        setUser({
          ...u,
          hasProfile: u.hasProfile ?? false,
          onboarded: u.onboarded ?? false,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser({
      ...userData,
      hasProfile: userData.hasProfile ?? false,
      onboarded: userData.onboarded ?? false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

## File: `frontend/src/pages/Login.tsx`
* **Role:** Interactive sign-in page, validating credentials via Express and updating React's AuthContext state.

```tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, type User } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post<{
        token: string;
        _id: string;
        name: string;
        email: string;
        role: "admin" | "user";
        hasProfile?: boolean;
        onboarded?: boolean;
      }>("/api/auth/login", { email, password });
      const { token, ...userRest } = data;
      login(token, userRest as User);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20 text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full text-background" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="ml-1 text-primary hover:underline font-medium">Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## File: `frontend/src/pages/Signup.tsx`
* **Role:** Interactive user registration page routing requests to register API hooks.

```tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, type User } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/api";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post<{
        token: string;
        _id: string;
        name: string;
        email: string;
        role: "admin" | "user";
        hasProfile?: boolean;
        onboarded?: boolean;
      }>("/api/auth/register", { name, email, password });
      const { token, ...userRest } = data;
      login(token, userRest as User);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Join OpenUI to submit and review components</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20 text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Name</label>
              <Input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <Input type="email" placeholder="developer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full text-background" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="ml-1 text-primary hover:underline font-medium">Sign in</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
```

---

## File: `frontend/src/pages/CreateProfile.tsx`
* **Role:** Profile creation page collecting developer bios and social media linkages.

```tsx
import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';

const CreateProfile = () => {
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [error, setError] = useState('');
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/auth/profile', { bio, github });
      updateUser(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 p-4 font-sans text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl bg-zinc-900 mx-auto p-8 border border-zinc-800 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-500">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Set up your profile</h2>
          <p className="text-zinc-400 mt-2">Tell the community a bit about yourself.</p>
        </div>
        
        {error && <div className="mb-4 rounded bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">{error}</div>}
        
        <form onSubmit={handleCreateProfile} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">Bio <span className="text-zinc-500">(Optional)</span></label>
            <textarea 
              value={bio} onChange={e => setBio(e.target.value)} rows={3}
              className="w-full rounded-lg bg-zinc-800/50 p-3 text-white border border-zinc-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="I am a builder..."
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">GitHub Username <span className="text-zinc-500">(Optional)</span></label>
            <input 
              type="text" 
              value={github} onChange={e => setGithub(e.target.value)}
              className="w-full rounded-lg bg-zinc-800/50 p-3 text-white border border-zinc-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="e.g. torvalds"
            />
          </div>
          <div className="pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              {loading ? 'Saving...' : 'Continue to Dashboard'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
export default CreateProfile;
```

---

## File: `frontend/src/pages/Onboarding.tsx`
* **Role:** Interactive onboarding workflow, introducing platform features step-by-step.

```tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const completeOnboarding = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/auth/onboard', {});
      updateUser(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 p-4 font-sans text-white">
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-2xl rounded-2xl bg-zinc-900 mx-auto p-12 border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
           <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {error && <div className="mb-4 rounded bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">{error}</div>}

        {step === 1 && (
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">Welcome, {user?.name}!</h2>
            <p className="mb-8 text-lg text-zinc-400 max-w-md mx-auto">OpenUI is a platform for developers to share beautifully crafted UI components. Ready to dive in?</p>
            <button onClick={() => setStep(2)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors text-lg">Let's Go</button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
             <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
             </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Copy, Paste, Ship.</h2>
            <p className="mb-8 text-zinc-400">Find a component you like. Copy the code into your project. Tweak as needed.</p>
            <button onClick={() => setStep(3)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full font-medium transition-colors">Next</button>
          </div>
        )}
        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
             </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Contribute back</h2>
            <p className="mb-8 text-zinc-400">Built something cool? Submit it for the community to use and rise up the leaderboard.</p>
            <button 
              onClick={completeOnboarding} 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              {loading ? 'Finishing...' : 'Enter OpenUI'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default Onboarding;
```

---

# Backend Source Code

## File: `backend/src/server.ts`
* **Role:** Express Application Server configuration, CORS setup, pipeline middleware, routes activation, and network port initialization.

```typescript
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";

import authRoutes from "./routes/auth.routes";
import componentsRoutes from "./routes/components.routes";
import adminRoutes from "./routes/admin.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/components", componentsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("OpenUI API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## File: `backend/src/config/db.ts`
* **Role:** Database configuration module connecting Mongoose to MongoDB using environment credentials.

```typescript
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn("MONGODB_URI is undefined. Not connecting to MongoDB.");
      return;
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};
```

---

## File: `backend/src/middleware/auth.middleware.ts`
* **Role:** Security interceptor validating incoming JSON Web Tokens (JWT) for secure REST endpoints.

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
         res.status(401).json({ message: "Not authorized, user not found" });
         return;
      }
      next();
      return;
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
```

---

## File: `backend/src/models/User.ts`
* **Role:** Data structure definition and model declarations for User schemas.

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  hasProfile: boolean;
  onboarded: boolean;
  profileData?: {
    bio?: string;
    avatar?: string;
    website?: string;
    github?: string;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  hasProfile: { type: Boolean, default: false },
  onboarded: { type: Boolean, default: false },
  profileData: {
    bio: { type: String },
    avatar: { type: String },
    website: { type: String },
    github: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
```

---

## File: `backend/src/models/Component.ts`
* **Role:** Mongoose collection model enforcing variables and relational hooks for UI contributions.

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IComponent extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  code: string;
  previewImage?: string;
  authorId: mongoose.Types.ObjectId;
  tags: string[];
  dependencies?: string[];
  usage?: string;
  themeSupport: "both" | "light" | "dark";
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const ComponentSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  previewImage: { type: String },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tags: { type: [String], default: [] },
  dependencies: { type: [String], default: [] },
  usage: { type: String, default: "" },
  themeSupport: { type: String, enum: ["both", "light", "dark"], default: "both" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Component = mongoose.models.Component || mongoose.model<IComponent>("Component", ComponentSchema);
```

---

## File: `backend/src/routes/auth.routes.ts`
* **Role:** Registration, authentication, profile-creation, and onboarding REST endpoints.

```typescript
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { protect, AuthRequest } from "../middleware/auth.middleware";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  });
};

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: email.toLowerCase() === "admin@openui.com" ? "admin" : "user",
      hasProfile: false,
      onboarded: false,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasProfile: user.hasProfile,
        onboarded: user.onboarded,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password || "")) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasProfile: user.hasProfile,
        onboarded: user.onboarded,
        token: generateToken(user._id as string),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/me", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  res.json(req.user);
});

router.post("/profile", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    req.user.hasProfile = true;
    req.user.profileData = req.body;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/onboard", protect, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    req.user.onboarded = true;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;