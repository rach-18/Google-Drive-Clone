import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Modal, Box } from '@mui/material';
import { auth } from '../firebase'; // Import the auth object from firebase

function Header({ photoURL, setSearchQuery, setSortOption, theme, help, setHelp, setThemeMenu, themeMenu, setSortMenu, sortMenu, setTheme }) {
    const [accountMenu, setAccountMenu] = useState(false);
    const [index, setIndex] = useState(0);
    
    const images = [
        {
          label: 'Upload File using this button',
          imgPath:
            'Upload.jpeg',
        },
        {
          label: 'Search your Files using this input',
          imgPath:
            'Search.jpeg',
        },
        {
          label: 'Sort your Files using this button',
          imgPath:
            'Sort.jpeg',
        },
        {
          label: 'Change your app theme using this button',
          imgPath:
            'Theme.jpeg',
        },
        {
            label: 'Open the context menu by right clicking on this button',
            imgPath:
                'Context-Menu.jpeg',
        },
        {
            label: 'Change app layout using this toggle',
            imgPath:
                'View.jpeg',
        },
        {
            label: 'See the App Guide using this button',
            imgPath:
                'App-Guide.jpeg',
        },
        {
            label: 'Logout by clicking on the profile picture',
            imgPath:
                'Logout.jpeg',
        },
        {
            label: 'See the Preview tab using this button',
            imgPath:
                'Preview.jpeg',
        },
        {
            label: 'You can upload a file, open the app guide, change the theme, preview a file, sort the files and change the layout using the voice command.',
            imgPath:
                'Voice-Command.jpeg',
        }
    ];

    const logout = () => {
        auth.signOut().catch((error) => console.error('Error logging out: ', error));
    };

    const handleSortOption = (option) => {
        setSortOption(option);
        setSortMenu(false);
    };

    const prevBtn = () => {
        if(index > 0) {
            setIndex((prev) => prev - 1);
        }
    }

    const nextBtn = () => {
        if(index < images.length - 1) {
            setIndex((prev) => prev + 1);
        }
    }

    return (
        <>
            <Modal
                open={help}
                onClose={() => setHelp(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    outline: 'none',
                }}
            >
                <Box 
                    sx={{
                        backgroundColor: theme === 'dark' ? '#030712' : 'white', 
                        maxWidth: 500, 
                        flexGrow: 1, 
                        outline: 'none', 
                        borderRadius: 2,
                        color: theme === 'dark' ? '#94a3b8' : 'black'
                    }}
                >
                    <div className='flex justify-between items-center px-5 py-5'>
                        <p className='font-semibold'>App Guide</p>
                        <CloseIcon className='cursor-pointer' onClick={() => setHelp(false)} />
                    </div>
                    <div className='flex items-center gap-3 px-5 py-8 rounded-lg'>
                        <ArrowBackIosNewOutlinedIcon
                            onClick={prevBtn}
                            className='cursor-pointer'
                            style={{
                                color: theme === 'dark' ? (index === 0 ? '#5c5b5b' : 'white') : (index === 0 ? 'gray' : 'black') 
                            }}
                        />
                        <div className='flex flex-col items-center gap-2'>
                            <img src={images[index].imgPath} alt="" />
                            <p>{images[index].label}</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon
                            onClick={nextBtn}
                            className='cursor-pointer'
                            style={{
                                color: theme === 'dark' ? (index === images.length - 1 ? '#5c5b5b' : 'white') : (index === images.length - 1 ? 'gray' : 'black')
                            }}
                        />
                    </div>
                </Box>
            </Modal>
            <div 
                style={{color: theme === 'dark' ? '#95a5bd' : '#52525b'}}
                className='flex md:justify-between justify-around items-center mx-auto py-2 pl-5 2xl:pr-8 xl:pr-12 lg:pr-20 pr-24'
            >
                <div className='flex items-center gap-2 w-[10%]'>
                    <img
                        className='lg:w-[25%] sm:w-[50%]'
                        src="https://gdisk.vercel.app/logo.png"
                        alt="Disk logo"
                    />
                    <p className='text-2xl font-medium'>
                        Disk
                    </p>
                </div>
                <div className='w-full md:block hidden'>
                    <div 
                        style={{backgroundColor: theme === 'dark' ? '#0D2136' : '#E9EEF6'}}
                        className='flex items-center justify-between px-5 py-3 rounded-full gap-2 w-1/2 mx-auto'
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
                <div className='flex items-center gap-3 justify-between w-[8%] relative'>
                    <HelpOutlineOutlinedIcon onClick={() => setHelp(true)} className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer' style={{ fontSize: 35 }} />
                    <SettingsOutlinedIcon onClick={() => setThemeMenu((prev) => !prev)} className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer' style={{ fontSize: 35 }} />
                    {
                        themeMenu ? (
                            <div 
                                style={{
                                    backgroundColor: theme === 'dark' ? '#030712' : 'white',
                                    color: theme === 'dark' ? 'white' : 'black'
                                }}
                                className='absolute z-10 right-[2rem] top-[100%] w-[8rem] bg-white rounded-lg shadow-md'
                            >
                                {
                                    theme === 'dark' ? (
                                        <>
                                            <p className='px-5 py-2 font-semibold'>Theme</p>
                                            <p onClick={() => {
                                                setTheme("light");
                                                setThemeMenu(false);
                                            }} 
                                                className='hover-transition px-5 py-2 hover:bg-[#1f2937] cursor-pointer'>Light</p>
                                            <p onClick={() => {
                                                setTheme("dark");
                                                setThemeMenu(false);
                                            }} 
                                            className='hover-transition px-5 py-2 hover:bg-[#1f2937] cursor-pointer'>Dark</p>
                                            <p onClick={() => {
                                                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                                                setThemeMenu(false);
                                            }} 
                                            className='hover-transition px-5 py-2 hover:bg-[#1f2937] cursor-pointer'>System</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className='px-5 py-2 font-semibold'>Theme</p>
                                            <p onClick={() => {
                                                setTheme("light");
                                                setThemeMenu(false);
                                            }} 
                                            className='hover-transition px-5 py-2 hover:bg-slate-200 cursor-pointer'>Light</p>
                                            <p onClick={() => {
                                                setTheme("dark");
                                                setThemeMenu(false);
                                            }} 
                                            className='hover-transition px-5 py-2 hover:bg-slate-200 cursor-pointer'>Dark</p>
                                            <p onClick={() => {
                                                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                                                setThemeMenu(false);
                                            }} 
                                            className='hover-transition px-5 py-2 hover:bg-slate-200 cursor-pointer'>System</p>       
                                        </>
                                    )
                                }
                            </div>
                        ) : (
                            <></>
                        )
                    }
                    <Avatar
                        onClick={() => setAccountMenu((prev) => !prev)}
                        className='cursor-pointer'
                        src={photoURL}
                    />
                    {
                        accountMenu ? (
                            <div className='absolute right-0 bottom-[-210%] w-[12rem] bg-white rounded-lg shadow-md z-10'>
                                <p className='px-5 py-2 font-semibold text-black'>My Account</p>
                                <hr />
                                <p
                                    className='hover-transition px-5 py-2 text-red-500 hover:bg-slate-200 cursor-pointer'
                                    onClick={logout}
                                >
                                    Log out
                                </p>
                            </div>
                        ) : (<></>)
                    }
                </div>
            </div>
        </>
    )
}

export default Header;
