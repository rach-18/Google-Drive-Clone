import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Header() {
    return (
        <div className='flex justify-between items-center px-5 py-2 text-[#52525b]'>
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
            <div className='flex items-center gap-3 justify-between w-[8%]'>
                <HelpOutlineOutlinedIcon style={{fontSize : 28}} />
                <SettingsOutlinedIcon style={{fontSize : 28}} />
                <img
                    className='w-1/3 rounded-full' 
                    src="https://lh3.googleusercontent.com/a/ACg8ocLygmTiCbSJfTHqsdP-G7sDkD1GbzP9iVaM1nO-9Yky6z1rIg=s96-c" alt="" />
            </div>
        </div>
    )
}

export default Header;
