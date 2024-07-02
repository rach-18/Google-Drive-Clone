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

function Sidebar({ size, memory, theme }) {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    function handleFile(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }

    async function handleUpload() {
        if (!file) return;

        setUploading(true);

        try {
            const fileRef = ref(storage, `files/${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            console.log(snapshot);

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
                        className='bg-white border-0'
                        type="file"
                    />
                    {
                        uploading ?
                            <input className='px-5 py-2 rounded-lg bg-[#4b5563] text-[#111827] font-semibold' value='Uploading...' disabled type="submit" />
                            : <input
                                onClick={handleUpload}
                                className='hover-transition px-5 py-2 rounded-lg cursor-pointer bg-[#111827] hover:bg-[#282f3c] text-white font-semibold'
                                value='Upload'
                                type="submit"
                            />
                    }
                </Box>
            </Modal>
            <div className='flex flex-col gap-5 items-start text-[09090b] px-5 w-[25%]'>
                <button
                    onClick={() => setOpen(true)}
                    className='hover-transition flex gap-4 items-center p-4 rounded-xl shadow-lg bg-white hover:bg-[#EEF5FD]'
                >
                    <AddIcon />New
                </button>
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
                    <div className='w-full h-[0.5rem] rounded-full bg-[#C9CDD2]'>
                        <div 
                            style={{width : memoryPercentage}}
                            className='h-full rounded-full bg-green-500'
                        ></div>
                    </div>
                    <p>{size} of 100MB</p>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
