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
