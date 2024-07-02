import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Data from './components/Data';
import { auth, provider, signInWithPopup } from './firebase';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [size, setSize] = useState("");
  const [bytes, setBytes] = useState(0);
  const [memory, setMemory] = useState(0);
  // const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [theme, setTheme] = useState('dark');

  console.log(theme);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const mem = (bytes / 100000000) * 100;
    console.log(mem);
    setMemory(mem);
  }, [bytes]);

  console.log(memory);

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  }

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading component
  }

  return (
    <>
      {user ? (
        <div
          style={{backgroundColor: theme === 'dark' ? '#071A2B' : '#F8FAFD'}} 
          // className="bg-[#F8FAFD]"
        >
          <Header photoURL={user.photoURL} setSearchQuery={setSearchQuery} setSortOption={setSortOption} />
          <div className="app flex">
            <Sidebar size={size} memory={memory} />
            <Data searchQuery={searchQuery} sortOption={sortOption} setSize={setSize} setBytes={setBytes} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center px-10 py-4 text-[#52525b]">
            <div className="flex items-center gap-2 w-[10%]">
              <img
                className="w-[25%]"
                src="https://gdisk.vercel.app/logo.png"
                alt="Disk logo"
              />
              <p className="text-2xl font-medium">Disk</p>
            </div>
            <button
              className="hover-transition bg-blue-500 hover:bg-[#2563EB] px-10 py-3 font-semibold rounded-lg text-white"
              onClick={signIn}
            >
              Log In
            </button>
          </div>
          <div className="flex gap-5 my-8">
            <div className="w-1/2 flex flex-col items-start justify-center gap-10 px-12">
              <p className="text-6xl">Easy and secure access to your content</p>
              <p className="text-2xl text-[#71717a]">
                Store, share, and collaborate on files and folders from your mobile device, tablet, or computer
              </p>
              <button
                className="hover-transition bg-blue-500 hover:bg-[#2563EB] px-10 py-3 font-semibold rounded-lg text-white"
                onClick={signIn}
              >
                Log In
              </button>
            </div>
            <img className="w-1/2" src="https://gdisk.vercel.app/landing-splash.jpg" alt="" />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
