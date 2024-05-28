import React, { useRef, useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { toast, Bounce } from 'react-toastify';
import PreviewModel from './PreviewModel';

const makeProper = (text) => {
    let txt = text.replace("_", " ");
    return txt[0].toUpperCase() + txt.slice(1);
};

const Index = () => {
    const [recordingType, setRecordingType] = useState({
        video: false,
        audio: false,
        screen: false,
    });
    const [isScreenCaptureSupported, setIsScreenCaptureSupported] = useState(true);
    const videoRef = useRef(null);
    const mediaRecorder = useReactMediaRecorder(recordingType);
    const { status, startRecording, pauseRecording, resumeRecording, stopRecording, clearBlobUrl, mediaBlobUrl, previewStream, error } = mediaRecorder;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if the browser supports the necessary APIs for screen capture
        const checkScreenCaptureSupport = () => {
            const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
            setIsScreenCaptureSupported(isSupported);
            if (!isSupported) {
                toast.error("This browser doesn't support screen capturing", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        };

        checkScreenCaptureSupport();
    }, []);

    if (error !== "") {
        toast.error(makeProper(error), {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const handleOpenModel = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearBlobUrl();
    };

    const recordingTypeHandler = (e) => {
        switch (e.target.id) {
            case "video":
                setRecordingType({ video: true, audio: false, screen: false });
                break;
            case "audio":
                setRecordingType({ video: false, audio: true, screen: false });
                break;
            case "screen":
                setRecordingType({ video: false, audio: false, screen: true });
                break;
            case "video-audio":
                setRecordingType({ video: true, audio: true, screen: false });
                break;
            case "screen-audio":
                setRecordingType({ video: false, audio: true, screen: true });
                break;
            default:
                break;
        }
    };

    const startRecordingHandler = () => {
        if (status === "idle") {
            startRecording();
        } else if (status === "recording") {
            pauseRecording();
        } else if (status === "paused") {
            resumeRecording();
        }
    };

    const stopRecordingHandler = () => {
        stopRecording();
        handleOpenModel();
    };

    const downloadHandler = () => {
        const link = document.createElement("a");
        link.href = mediaBlobUrl;
        link.download = "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleCloseModal();
        clearBlobUrl();
    };

    useEffect(() => {
        if (previewStream && videoRef.current) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    return (
        <>
            <div className='flex justify-center items-center flex-col'>
                <h2 className="font-bold text-lg my-4">Recording Status : {makeProper(status)}</h2>
                <h4 className='my-4'>Preview👇</h4>
                <div className={status === "idle" || status === "paused" ? "preview-container h-96 border-[2px] w-[90%] md:w-[50%]" : "preview-container h-96 border-[2px] w-auto"}>
                    {status === 'recording' && <video ref={videoRef} autoPlay loop className='w-auto h-96' />}
                </div>
                {!isScreenCaptureSupported && (
                    <div className="text-red-500 my-4">
                        Screen capturing is not supported in this browser.
                    </div>
                )}
                <div className='flex gap-4 my-4 text-lg flex-wrap items-center justify-center' onChange={recordingTypeHandler}>
                    <div>
                        <input type='radio' name='recording-type' id="video" />
                        <label htmlFor="video" className='ml-2'>Video</label>
                        <span className='mx-2'>|</span>
                    </div>
                    <div>
                        <input type='radio' name='recording-type' id="audio" />
                        <label htmlFor="audio" className='ml-2'>Audio</label>
                        <span className='mx-2'>|</span>
                    </div>
                    {isScreenCaptureSupported && <div>
                        <input type='radio' name='recording-type' id="screen" />
                        <label htmlFor="screen" className='ml-2'>Screen</label>
                        <span className='mx-2'>|</span>
                    </div>}
                    <div>
                        <input type='radio' name='recording-type' id="video-audio" />
                        <label htmlFor="video-audio" className='ml-2'>Video + Audio</label>
                        <span className='mx-2'>|</span>
                    </div>
                    {isScreenCaptureSupported && <div>
                        <input type='radio' name='recording-type' id="screen-audio" />
                        <label htmlFor="screen-audio" className='ml-2'>Screen + Audio</label>
                    </div>}
                </div>
                {!mediaBlobUrl && (
                    <div className='flex gap-6 my-4'>
                        <button className='w-auto h-12 p-2 px-6 bg-green-600 rounded-xl text-white hover:bg-green-900 hover:shadow-lg font-bold' onClick={startRecordingHandler}>
                            {status === "idle" || status === "stopped" ? "Start" : status === "acquiring_media" ? "Acquiring Media" : status === "recording" ? "Pause" : "Resume"} Recording
                        </button>
                        <button className='w-auto h-12 p-2 px-6 bg-red-600 rounded-xl text-white hover:bg-red-900 hover:shadow-lg font-bold' onClick={stopRecordingHandler}>
                            Stop Recording
                        </button>
                    </div>
                )}
            </div>
            <PreviewModel mediaUrl={mediaBlobUrl} handleCloseModal={handleCloseModal} isModalOpen={isModalOpen} downloadHandler={downloadHandler} />
        </>
    );
};

export default Index;
