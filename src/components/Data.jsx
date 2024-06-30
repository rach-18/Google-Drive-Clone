import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

function Data() {
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
                <div className='hover-transition flex justify-between bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-[#DBEAFE]'>
                    <p>React Interview Questions.pdf</p>
                    <div className='flex w-[30%] justify-between'>
                        <p>460.92 KB</p>
                        <p>Modified . 30-06-2024</p>
                    </div>
                </div>
                <div className='hover-transition flex justify-between bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-[#DBEAFE]'>
                    <p>React Interview Questions.pdf</p>
                    <div className='flex w-[30%] justify-between'>
                        <p>460.92 KB</p>
                        <p>Modified . 30-06-2024</p>
                    </div>
                </div>
                <div className='hover-transition flex justify-between bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-[#DBEAFE]'>
                    <p>React Interview Questions.pdf</p>
                    <div className='flex w-[30%] justify-between'>
                        <p>460.92 KB</p>
                        <p>Modified . 30-06-2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data;
