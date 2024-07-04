import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Preview from './Preview';
import Speech from './Speech';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

function Data({ searchQuery, sortOption, setSize, setBytes, theme }) {
    const [files, setFiles] = useState([]);
    const [view, setView] = useState("list");
    const [contextMenu, setContextMenu] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "myFiles"), snapshot => {
            const filesData = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));

            setFiles(filesData);

            // Calculate the total size
            const totalSize = filesData.reduce((acc, file) => acc + file.data.size, 0);
            setBytes(totalSize);
            setSize(changeBytes(totalSize));
        });

        return () => unsubscribe();
    }, [setSize]);

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

    const handleContextMenu = (event, file) => {
        event.preventDefault();
        console.log("clicked");
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            file,
        });
        console.log(contextMenu);
        console.log(file);
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = async (file) => {
        await deleteDoc(doc(db, "myFiles", file.id));
    };

    const handleCopyLink = (fileURL) => {
        navigator.clipboard.writeText(fileURL).then(() => {
            alert("Link copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy link: ", err);
        });
    };

    const handleRename = (file) => {
        const newFileName = prompt("Enter new file name:", file.data.filename);
        if (newFileName) {
            // Logic to rename the file
            // ...
        }
    };

    const handleDownload = (fileURL) => {
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = (file) => {
        setPreviewFile(file);
    };

    const filteredFiles = files.filter(file =>
        file.data.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFiles = filteredFiles.sort((a, b) => {
        switch (sortOption) {
            case 'name_asc':
                return a.data.filename.localeCompare(b.data.filename);
            case 'name_desc':
                return b.data.filename.localeCompare(a.data.filename);
            case 'date_asc':
                return a.data.timestamp.toDate() - b.data.timestamp.toDate();
            case 'date_desc':
                return b.data.timestamp.toDate() - a.data.timestamp.toDate();
            default:
                return 0;
        }
    });

    return (
        <div className='flex w-full'>
            <div 
                style={{
                    backgroundColor: theme === 'dark' ? '#031525' : 'white',
                    color: theme === 'dark' ? '#95a5bd' : 'black'
                }}
                className="w-full mr-5 rounded-xl p-5"
            >
                <div className='flex justify-between'>
                    <p className="text-2xl font-medium">Home</p>
                    <div className='flex items-center gap-5'>
                        <div className='flex justify-end w-[10rem]'>
                            <MenuOutlinedIcon
                                style={{
                                    width: "4rem",
                                    height: "100%",
                                    backgroundColor: view === "list" ? "#4E657C" : "transparent",
                                    borderColor: theme === 'dark' ? '#71717A' : 'black'
                                }}
                                className='border-[0.1rem] rounded-l-full px-5 cursor-pointer'
                                onClick={() => setView("list")}
                            />
                            <GridViewOutlinedIcon
                                style={{
                                    width: "4rem",
                                    height: "100%",
                                    backgroundColor: view === "grid" ? "#4E657C" : "transparent",
                                    borderColor: theme === 'dark' ? '#71717A' : 'black'
                                }}
                                className='border-[0.1rem] rounded-r-full px-5 cursor-pointer'
                                onClick={() => setView("grid")}
                            />
                        </div>
                        <ErrorOutlineOutlinedIcon className='p-1 hover:bg-slate-400 rounded-full cursor-pointer' style={{fontSize: 32}} onClick={() => setPreview(true)} />
                    </div>
                </div>
                <div className='w-[98%] mx-auto my-5 flex flex-col gap-3'>
                    {contextMenu && (
                        <div className='flex justify-between bg-slate-300 px-5 py-1 rounded-full'>
                            <div className='flex gap-5'>
                                <LinkOutlinedIcon onClick={() => handleCopyLink(contextMenu.file.data.fileURL)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                                <DriveFileRenameOutlineOutlinedIcon onClick={() => handleRename(contextMenu.file)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                                <FileDownloadOutlinedIcon onClick={() => handleDownload(contextMenu.file.data.fileURL)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                                <DeleteOutlineOutlinedIcon onClick={() => handleDelete(contextMenu.file)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                            </div>
                            <CloseIcon onClick={handleClose} className='p-1 cursor-pointer' style={{fontSize: 30}} />
                        </div>
                    )}
                    {
                        sortedFiles.length === 0 ? (
                            <div className='flex flex-col gap-2 items-center justify-center h-full'>
                                <img className='w-[30%]' src="https://gdisk.vercel.app/no-files.svg" alt="" />
                                <p className='text-xl'>Welcome to Drive, the home for all your files</p>
                                <p>Use the “New” button to upload</p>
                            </div>
                        ) : (
                            <>
                                {
                                    view === "list" ? (
                                        <>
                                            <div className='flex justify-between px-4'>
                                                <p>File Name</p>
                                            </div>
                                            <div className='flex flex-col gap-2 overflow-y-scroll pr-2 h-[68vh]'>
                                                {sortedFiles.map(({ id, data }) => (
                                                    <div
                                                        key={id}
                                                        className={`hover-transition flex items-center justify-between p-4 rounded-xl cursor-pointer ${
                                                            theme === 'dark' ? 'bg-[#0D2136] hover:bg-[#172554]' : 'bg-slate-100 hover:bg-[#DBEAFE]'
                                                        }`}
                                                        onClick={() => handlePreview({ id, data })}
                                                    >
                                                        <p>{data.filename}</p>
                                                        <MoreHorizOutlinedIcon
                                                            style={{ fontSize: 35 }}
                                                            className='p-2 rounded-full hover:bg-slate-400 cursor-pointer'
                                                            onClick={(e) => handleContextMenu(e, { id, data })}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex flex-wrap gap-3 overflow-y-scroll pr-2 h-[68vh]'>
                                            {sortedFiles.map(({ id, data }) => (
                                                <div
                                                    key={id}
                                                    onClick={() => handlePreview({ id, data })}
                                                    className={`hover-transition flex flex-col items-start p-4 rounded-lg gap-2 cursor-pointer h-1/2 ${
                                                        theme === 'dark' ? 'bg-[#0D2136] hover:bg-[#172554]' : 'bg-slate-100 hover:bg-[#DBEAFE]'
                                                    } ${preview === true ? 'w-[48%]' : 'w-[24%]'}`}
                                                >
                                                    <div className='flex justify-between items-center w-full'>
                                                        <p>{data.filename}</p>
                                                        <MoreVertOutlinedIcon
                                                            style={{ fontSize: 35 }}
                                                            className='p-2 rounded-full hover:bg-slate-400 cursor-pointer'
                                                            onClick={(e) => handleContextMenu(e, { id, data })}
                                                        />
                                                    </div>
                                                    <div 
                                                        style={{ backgroundColor: theme === 'dark' ? '#334155' : 'white' }}
                                                        className='w-full h-[8rem] rounded-lg flex justify-center items-center'
                                                    >
                                                        <p 
                                                            style={{ color: theme === 'dark' ? '#94A3B8' : '#71717A' }}
                                                            className='text-3xl font-bold'
                                                        >
                                                            {(data.filename.slice(data.filename.lastIndexOf(".") + 1)).toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            {
                preview ? <Preview previewFile={previewFile} changeBytes={changeBytes} preview={preview} setPreview={setPreview} /> : <></>
            }
            <Speech />
        </div>
    );
}

export default Data;
