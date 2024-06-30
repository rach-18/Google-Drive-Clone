import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';
import { Modal, Box } from '@mui/material';
import { useState } from 'react';

function Sidebar() {
    const [open, setOpen] = useState(true);
    const [uploading, setUploading] = useState(false);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: 'none',
                    outline: 'none'
                }}
            >
                <Box 
                    component="form" 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'start',
                        backgroundColor: 'white',
                        width: '40%',
                        padding: 5,
                        borderRadius: 2,
                        boxShadow: 24,
                        outline: 'none',
                        border: 'none'
                    }}
                >
                    <p className='font-semibold mb-3'>Upload File</p>
                    <input className='bg-white border-0' type="file" />
                    {
                        uploading ? 
                        <input className='px-5 py-2 rounded-lg bg-[#4b5563] text-[#111827] font-semibold' value='Uploading...' disabled type="submit" />
                        : <input className='hover-transition px-5 py-2 rounded-lg cursor-pointer bg-[#111827] hover:bg-[#282f3c] text-white font-semibold' value='Upload' type="submit" /> 
                    }
                </Box>
            </Modal>
            <div className='flex flex-col gap-5 items-start text-[09090b] px-5 w-[25%]'>
                <div className='flex gap-4 items-center p-4 rounded-xl shadow-lg bg-white'>
                    <AddIcon />
                    <p>New</p>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex gap-5 items-center bg-[#DBEAFE] py-2 px-4 rounded-full'>
                        <HomeOutlinedIcon />
                        <p>Home</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <FolderOutlinedIcon />
                        <p>My Drive</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <ComputerOutlinedIcon />
                        <p>Computers</p>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <PeopleAltOutlinedIcon />
                        <p>Shared with me</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <ScheduleOutlinedIcon />
                        <p>Recent</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <StarBorderOutlinedIcon />
                        <p>Starred</p>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <ReportGmailerrorredOutlinedIcon />
                        <p>Spam</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <DeleteOutlineOutlinedIcon />
                        <p>Trash</p>
                    </div>
                    <div className='flex gap-5 items-center py-2 px-4 rounded-full hover:bg-[#E2E8F0] cursor-pointer'>
                        <WbCloudyOutlinedIcon />
                        <p>Storage</p>
                    </div>
                </div>
                <div className='w-full flex flex-col items-center gap-1'>
                    <div className='w-full h-[0.5rem] rounded-full bg-[#C9CDD2]'></div>
                    <p>460.92 KB of 100MB</p>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
