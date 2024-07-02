import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

function Data({ searchQuery, sortOption, setSize, setBytes }) {
    const [files, setFiles] = useState([]);
    const [view, setView] = useState("list");
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "myFiles"), snapshot => {
            const filesData = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));

            setFiles(filesData);

            // Calculate the total size
            const totalSize = filesData.reduce((acc, file) => acc + file.data.size, 0);
            console.log(changeBytes(totalSize));
            setBytes(totalSize);
            setSize(changeBytes(totalSize));
        });

        return () => unsubscribe();
    }, [setSize]);

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu) {
                setContextMenu(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu]);

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
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            file,
        });
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = async (file) => {
        await deleteDoc(doc(db, "myFiles", file.id));
        handleClose();
    };

    const handleCopyLink = (fileURL) => {
        navigator.clipboard.writeText(fileURL).then(() => {
            alert("Link copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy link: ", err);
        });
        handleClose();
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
        <div className="bg-white w-full mr-5 rounded-xl p-5">
            <div className='flex justify-between'>
                <p className="text-2xl font-medium">Home</p>
                <div className='flex justify-end w-[10rem]'>
                    <MenuOutlinedIcon
                        style={{
                            width: "4rem",
                            height: "100%",
                            backgroundColor: view === "list" ? "#E5F1FF" : "transparent"
                        }}
                        className='border-[0.1rem] border-black rounded-l-full px-5 cursor-pointer'
                        onClick={() => setView("list")}
                    />
                    <GridViewOutlinedIcon
                        style={{
                            width: "4rem",
                            height: "100%",
                            backgroundColor: view === "grid" ? "#E5F1FF" : "transparent"
                        }}
                        className='border-[0.1rem] border-black rounded-r-full px-5 cursor-pointer'
                        onClick={() => setView("grid")}
                    />
                </div>
            </div>
            <div className='w-[98%] mx-auto my-5 flex flex-col gap-3'>
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
                                            <div className='flex w-[30%] justify-between'>
                                                <p>Size</p>
                                                <p>Last Modified</p>
                                            </div>
                                        </div>
                                        {sortedFiles.map(({ id, data }) => (
                                            <a 
                                                href={data.fileURL} 
                                                target='_blank' 
                                                key={id} 
                                                className='hover-transition flex justify-between bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-[#DBEAFE]'
                                                onContextMenu={(e) => handleContextMenu(e, { id, data })}
                                            >
                                                <p>{data.filename}</p>
                                                <div className='flex w-[30%] justify-between'>
                                                    <p>{changeBytes(data.size)}</p>
                                                    <p>Modified . {new Date(data.timestamp?.toDate()).toLocaleDateString()}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </>
                                ) : (
                                    <div className='flex flex-wrap gap-3 py-5'>
                                        {sortedFiles.map(({ id, data }) => (
                                            <a 
                                                href={data.fileURL} 
                                                target='_blank' 
                                                key={id} 
                                                className='hover-transition flex flex-col items-start bg-slate-100 w-[24%] p-4 rounded-lg gap-2 cursor-pointer hover:bg-[#DBEAFE]'
                                                onContextMenu={(e) => handleContextMenu(e, { id, data })}
                                            >
                                                <p>{data.filename}</p>
                                                <div className='w-full h-[8rem] bg-white rounded-lg flex justify-center items-center'>
                                                    <p 
                                                        className='text-3xl text-[#71717A] font-bold'
                                                    >
                                                        {(data.filename.slice(data.filename.lastIndexOf(".") + 1)).toUpperCase()}
                                                    </p>
                                                </div>
                                                <p>{changeBytes(data.size)}</p>
                                                <p>Modified . {new Date(data.timestamp?.toDate()).toLocaleDateString()}</p>
                                            </a>
                                        ))}
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
            {contextMenu && (
                <ul
                    className='fixed bg-white shadow-lg rounded-lg p-2 z-50'
                    style={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
                    onContextMenu={e => e.preventDefault()}
                >
                    <li 
                        className='hover:bg-gray-200 px-4 py-2 cursor-pointer' 
                        onClick={() => handleCopyLink(contextMenu.file.data.fileURL)}
                    >
                        Copy Link
                    </li>
                    <li 
                        className='hover:bg-gray-200 px-4 py-2 cursor-pointer text-red-500' 
                        onClick={() => handleDelete(contextMenu.file)}
                    >
                        Delete File
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Data;
