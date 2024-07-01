import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';

function Header({photoURL}) {
    const [accountMenu, setAccountMenu] = useState(false);

    return (
        <div className='flex justify-between items-center px-8 py-2 text-[#52525b]'>
            <div className='flex items-center gap-2 w-[10%]'>
                <img 
                    className='w-[25%]'
                    src="https://gdisk.vercel.app/logo.png"/>
                <p className='text-2xl font-medium'>Disk</p>
            </div>
            <div className='flex items-center bg-[#E9EEF6] justify-between px-5 py-3 rounded-full gap-2 w-1/2'>
                <div className='flex items-center'>
                    <SearchIcon 
                        style={{fontSize : 35}} 
                        className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer' 
                    />
                    <input className='bg-[#E9EEF6]' placeholder='Search in Disk' type="text" />
                </div>
                <TuneOutlinedIcon 
                    style={{fontSize : 35}} 
                    className='hover-transition hover:bg-[#D1D6DD] p-1 rounded-full cursor-pointer' 
                />
            </div>
            <div className='flex items-center gap-3 justify-between w-[8%] relative'>
                <HelpOutlineOutlinedIcon style={{fontSize : 28}} />
                <SettingsOutlinedIcon style={{fontSize : 28}} />
                <Avatar 
                    onClick={() => setAccountMenu((prev) => !prev)}
                    className='cursor-pointer' 
                    src={photoURL} 
                />
                {
                    accountMenu ? (
                        <div className='absolute right-0 bottom-[-210%] w-[12rem] bg-white rounded-lg shadow-md'>
                            <p className='px-5 py-2 font-semibold text-black'>My Account</p>
                            <hr />
                            <p className='hover-transition px-5 py-2 text-red-500 hover:bg-slate-200 cursor-pointer'>Log out</p>
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    )
}

export default Header;
