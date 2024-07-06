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
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box } from '@mui/material';
import { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Sidebar({ size, memory, theme, open, setOpen }) {
    // const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    function handleFile(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    async function handleUpload() {
        if (!file) return;

        setUploading(true);

        try {
            const fileRef = ref(storage, `files/${file.name}`);
            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            await addDoc(collection(db, "myFiles"), {
                timestamp: serverTimestamp(),
                filename: file.name,
                fileURL: url,
                size: file.size,
            });

            setUploading(false);
            setFile(null);
            setOpen(false);
        } catch (error) {
            console.error("Error uploading file: ", error);
            setUploading(false);
        }
    }

    // Format the memory to a proper percentage string
    const memoryPercentage = `${memory}%`;

    console.log(file);
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
                        backgroundColor: theme === 'dark' ? '#030712' : 'white',
                        width: '40%',
                        padding: 5,
                        borderRadius: 2,
                        boxShadow: 24,
                        outline: 'none',
                        border: 'none',
                        color: theme === 'dark' ? '#95a5bd' : 'black'
                    }}
                >
                    <div className='relative w-full'>
                        <p className='font-semibold mb-3'>Upload File</p>
                        <button
                            className='absolute top-0 right-0'
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <input
                        onChange={handleFile}
                        style={{backgroundColor: theme === 'dark' ? '#030712' : 'white'}}
                        className='border-0'
                        type="file"
                    />
                    {
                        theme === 'dark' ? (uploading ? 
                            <input className='px-5 py-2 rounded-lg bg-[#4b5563] text-[#111827] font-semibold' value='Uploading...' disabled type="submit" /> :
                            <input
                                onClick={handleUpload}
                                className='hover-transition px-5 py-2 rounded-lg cursor-pointer bg-white hover:bg-[#e1e2e4] text-[#030712] font-semibold'
                                value='Upload'
                                type="submit"
                            />
                        ) : (
                            uploading ? 
                            <input className='px-5 py-2 rounded-lg bg-[#4b5563] text-[#111827] font-semibold' value='Uploading...' disabled type="submit" />
                            : <input
                                onClick={handleUpload}
                                className='hover-transition px-5 py-2 rounded-lg cursor-pointer bg-[#111827] hover:bg-[#282f3c] text-white font-semibold'
                                value='Upload'
                                type="submit"
                            />
                        )
                    }
                </Box>
            </Modal>
            <div className='2xl:w-[15%] xl:w-[20%] lg:w-[25%] w-[8%] md:block hidden'>
                <div
                    style={{color: theme === 'dark' ? '#95a5bd' : '#09090b'}} 
                    className='flex flex-col gap-5 lg:items-start items-center lg:px-5'
                >
                    <button
                        onClick={() => setOpen(true)}
                        className={`hover-transition menu-icon flex gap-4 items-center lg:p-4 p-4 lg:rounded-xl rounded-full shadow-lg ${theme === 'light' ? 'bg-white hover:bg-slate-100' : 'bg-[#0D2136] hover:bg-[#0F172A]'}`}
                    >
                        <AddIcon /><p className='lg:block hidden'>New</p>
                    </button>
                    <div className='flex flex-col w-full'>
                        <div className={`flex gap-5 items-center ${theme === 'light' ? 'bg-blue-100' : 'bg-[#172554]'} lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full`}>
                            <HomeOutlinedIcon />
                            <p className='lg:block hidden'>Home</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <FolderOutlinedIcon />
                            <p className='lg:block hidden'>My Drive</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <ComputerOutlinedIcon />
                            <p className='lg:block hidden'>Computers</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <PeopleAltOutlinedIcon />
                            <p className='lg:block hidden'>Shared with me</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <ScheduleOutlinedIcon />
                            <p className='lg:block hidden'>Recent</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <StarBorderOutlinedIcon />
                            <p className='lg:block hidden'>Starred</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <ReportGmailerrorredOutlinedIcon />
                            <p className='lg:block hidden'>Spam</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <DeleteOutlineOutlinedIcon />
                            <p className='lg:block hidden'>Trash</p>
                        </div>
                        <div className={`flex gap-5 items-center lg:py-2 py-4 px-4 lg:justify-start justify-center rounded-full ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-[#1E293B]'} cursor-pointer`}>
                            <WbCloudyOutlinedIcon />
                            <p className='lg:block hidden'>Storage</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center gap-1 lg:block hidden'>
                        <div className={`w-full h-[0.5rem] rounded-full ${theme === 'light' ? 'bg-slate-300' : 'bg-[#384754]'} `}>
                            <div 
                                style={{width : memoryPercentage}}
                                className={`h-full rounded-full ${theme === 'light' ? 'bg-blue-400' : 'bg-[#BFDBFE]'}`}
                            ></div>
                        </div>
                        <p>{size} of 100MB</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
