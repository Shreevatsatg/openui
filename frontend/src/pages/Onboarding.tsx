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
