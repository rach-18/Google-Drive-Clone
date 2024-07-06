import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Data from './components/Data';
import { auth, provider, signInWithPopup } from './firebase';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [size, setSize] = useState("");
  const [bytes, setBytes] = useState(0);
  const [memory, setMemory] = useState(0);
  const [open, setOpen] = useState(false);
  const [help, setHelp] = useState(false);
  const [themeMenu, setThemeMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [theme, setTheme] = useState('light');

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
    setMemory(mem);
  }, [bytes]);

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(user);

  return (
    <>
      {user ? (
        <div
          style={{backgroundColor: theme === 'dark' ? '#071A2B' : '#F8FAFD'}} 
          className="h-screen overflow-x-hidden"
        >
          <Header photoURL={user.photoURL} setSearchQuery={setSearchQuery} setSortOption={setSortOption} theme={theme} help={help} setHelp={setHelp} setThemeMenu={setThemeMenu} themeMenu={themeMenu} setSortMenu={setSortMenu} sortMenu={sortMenu} setTheme={setTheme} />
          <div className="flex gap-2">
            <Sidebar size={size} memory={memory} theme={theme} open={open} setOpen={setOpen} />
            <div className='w-full'>
              <div className='md:hidden block w-full'>
                <div className='flex w-full sm:gap-5 gap-2 px-5 py-2 flex-wrap'>
                  <button
                    onClick={() => setOpen(true)}
                    className={`hover-transition menu-icon flex gap-4 items-center lg:p-4 p-4 rounded-xl shadow-lg ${theme === 'light' ? 'bg-white hover:bg-slate-100' : 'bg-[#0D2136] hover:bg-[#0F172A] text-[#95a5bd]'} mb-2`}
                  >
                    <AddIcon /><p>New</p>
                  </button>
                  <div 
                    style={{backgroundColor: theme === 'dark' ? '#0D2136' : '#E9EEF6'}}
                    className='flex items-center justify-between px-5 py-3 rounded-full gap-2 w-full mx-auto'
                  >
                    <div className='flex items-center'>
                        <SearchIcon
                            style={{ fontSize: 35 }}
                            className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer'
                        />
                        <input 
                            style={{backgroundColor: theme === 'dark' ? '#0D2136' : '#E9EEF6'}}
                            className='outline-none' 
                            placeholder='Search in Disk' 
                            type="text" 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='relative'>
                        <TuneOutlinedIcon
                            style={{ fontSize: 35 }}
                            className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer'
                            onClick={() => setSortMenu((prev) => !prev)}
                        />
                        {sortMenu && (
                            <div 
                                style={{
                                    backgroundColor: theme === 'dark' ? '#030712' : 'white',
                                    color: theme === 'dark' ? 'white' : 'black'
                                }}
                                className='absolute right-0 top-10 w-[15rem] bg-white rounded-lg shadow-md z-10'
                            >
                                <p className='font-semibold px-5 py-2'>Sort By</p>
                                {
                                    theme === 'dark' ? (
                                        <>
                                            <p 
                                                className='hover-transition hover:bg-[#1f2937] px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('name_asc')}
                                            >
                                                Name Ascending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-[#1f2937] px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('name_desc')}
                                            >
                                                Name Descending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-[#1f2937] px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('date_asc')}
                                            >
                                                Date Modified Ascending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-[#1f2937] px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('date_desc')}
                                            >
                                                Date Modified Descending
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p 
                                                className='hover-transition hover:bg-slate-200 px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('name_asc')}
                                            >
                                                Name Ascending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-slate-200 px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('name_desc')}
                                            >
                                                Name Descending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-slate-200 px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('date_asc')}
                                            >
                                                Date Modified Ascending
                                            </p>
                                            <p 
                                                className='hover-transition hover:bg-slate-200 px-5 py-2 cursor-pointer' 
                                                onClick={() => handleSortOption('date_desc')}
                                            >
                                                Date Modified Descending
                                            </p>
                                        </>
                                    )
                                }

                            </div>
                        )}
                    </div>
                </div>
              </div>
              </div>
              <Data searchQuery={searchQuery} sortOption={sortOption} setSize={setSize} setBytes={setBytes} theme={theme} setOpen={setOpen} setHelp={setHelp} setThemeMenu={setThemeMenu} setSortMenu={setSortMenu} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-10 py-4 text-[#52525b]">
            <div className="flex items-center gap-2 w-[10%]">
              <img
                className="lg:w-[25%] md:w-[60%] w-full"
                src="https://gdisk.vercel.app/logo.png"
                alt="Disk logo"
              />
              <p className="lg:text-2xl text-4xl font-medium">Disk</p>
            </div>
            <button
              className="hover-transition bg-blue-500 hover:bg-[#2563EB] px-10 py-3 font-semibold rounded-lg text-white"
              onClick={signIn}
            >
              Log In
            </button>
          </div>
          <div className="flex gap-5 my-8">
            <div className="lg:w-1/2 md:w-5/6 w-full lg:mx-0 mx-auto lg:my-0 my-10 flex flex-col items-start justify-center gap-10 px-12">
              <p className="md:text-6xl text-5xl">Easy and secure access to your content</p>
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
            <img className="w-1/2 lg:block hidden" src="https://gdisk.vercel.app/landing-splash.jpg" alt="" />
          </div>
        </>
      )}
    </>
  );
}

export default App;
