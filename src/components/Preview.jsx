import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Preview({ previewFile, changeBytes, theme, preview, setPreview }) {
    const isImage = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
        const ext = filename.split('.').pop().toLowerCase();
        return imageExtensions.includes(ext);
    };

    const isPDF = (filename) => {
        const pdfExtensions = ['pdf'];
        const ext = filename.split('.').pop().toLowerCase();
        return pdfExtensions.includes(ext);
    };

    const isText = (filename) => {
        const textExtensions = ['txt', 'md', 'json', 'xml', 'csv'];
        const ext = filename.split('.').pop().toLowerCase();
        return textExtensions.includes(ext);
    };

    const isVideo = (filename) => {
        const videoExtensions = ['mp4', 'webm', 'ogg'];
        const ext = filename.split('.').pop().toLowerCase();
        return videoExtensions.includes(ext);
    };

    return (
        <div className={`w-[35%] ${theme === 'light' ? 'bg-white text-black' : 'bg-[#031525] text-[#95a5bd]'} mr-5 rounded-xl`}>
            <div className='flex w-full justify-end px-3 pt-3 pb-5'>
                <CloseOutlinedIcon className='cursor-pointer' onClick={() => setPreview(false)} />
            </div>
            {previewFile ? (
                <div className="p-5">
                    <p className="text-2xl font-medium">{previewFile.data.filename}</p>
                    <p>Size: {changeBytes(previewFile.data.size)}</p>
                    <p>Last Modified: {new Date(previewFile.data.timestamp?.toDate()).toLocaleDateString()}</p>
                    <a href={previewFile.data.fileURL} target="_blank" className="text-blue-500 hover:underline">Open File</a>

                    <div className="mt-5">
                        {isImage(previewFile.data.filename) && (
                            <img src={previewFile.data.fileURL} alt={previewFile.data.filename} className="w-full h-auto rounded-lg" />
                        )}
                        {isPDF(previewFile.data.filename) && (
                            <embed src={previewFile.data.fileURL} width="100%" height="200px" />
                        )}
                        {isText(previewFile.data.filename) && (
                            <iframe src={previewFile.data.fileURL} width="100%" height="200px" title="Text File Preview"></iframe>
                        )}
                        {isVideo(previewFile.data.filename) && (
                            <video controls src={previewFile.data.fileURL} className="w-full h-auto rounded-lg" />
                        )}
                        {!isImage(previewFile.data.filename) && !isPDF(previewFile.data.filename) && !isText(previewFile.data.filename) && !isVideo(previewFile.data.filename) && (
                            <p>File preview is not available. Click "Open File" to view it.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="p-5">
                    <p>No file selected for preview</p>
                </div>
            )}
        </div>
    );
}

export default Preview;
