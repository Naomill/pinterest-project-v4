import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import { PinProvider } from './context/PinContext';
import AuthPage from './pages/AuthPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session:', session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, 'Session:', session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PinProvider>
      <Router>
        <div className="min-h-screen bg-white">
          {user && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/create"
              element={user ? <CreatePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/auth" state={{ from: location }} />
                )
              }
            />

            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </PinProvider>
  );
}

// function App() {
//   return (
//     <PinProvider>
//       <Router>
//         <div className="min-h-screen bg-white">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/create" element={<CreatePage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//           </Routes>
//         </div>
//       </Router>
//     </PinProvider>
//   );
// }

export default App;
