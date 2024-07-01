import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function Data() {
    const [files, setFiles] = useState([]);

    console.log(files);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "myFiles"), snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });

        return () => unsubscribe();
    }, []);

    function changeBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", 'MB', "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    return (
        <div className="bg-white w-full mr-5 rounded-xl p-5">
            <div className='flex justify-between'>
                <p className="text-2xl font-medium">Home</p>
                <div className='flex justify-between border-[0.12rem] border-black rounded-full py-2 px-3 w-[10%]'>
                    <MenuOutlinedIcon />
                    <GridViewOutlinedIcon />
                </div>
            </div>
            {/* <div className='flex flex-col gap-2 items-center justify-center h-full'>
                <img className='w-[30%]' src="https://gdisk.vercel.app/no-files.svg" alt="" />
                <p className='text-xl'>Welcome to Drive, the home for all your files</p>
                <p>Use the “New” button to upload</p>
            </div> */}
            {/* <div className='flex flex-wrap gap-3 py-5'>
                <div className='hover-transition flex flex-col items-start bg-slate-100 w-[24%] p-4 rounded-lg gap-2 cursor-pointer hover:bg-[#DBEAFE]'>
                    <p>React Interview Questions.pdf</p>
                    <div className='w-full h-[8rem] bg-white rounded-lg'></div>
                    <p>460.92 KB</p>
                    <p>Modified . 30-06-2024</p>
                </div>
            </div> */}
            <div className='w-[98%] mx-auto my-5 flex flex-col gap-3'>
                <div className='flex justify-between px-4'>
                    <p>File Name</p>
                    <div className='flex w-[30%] justify-between'>
                        <p>Size</p>
                        <p>Last Modified</p>
                    </div>
                </div>
                {files.map(({ id, data }) => (
                    <a href={data.fileURL} target='_blank' key={id} className='hover-transition flex justify-between bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-[#DBEAFE]'>
                        <p>{data.filename}</p>
                        <div className='flex w-[30%] justify-between'>
                            <p>{changeBytes(data.size)}</p>
                            <p>Modified . {new Date(data.timestamp?.toDate()).toLocaleDateString()}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Data;
