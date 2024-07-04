import { useState, useEffect } from "react";
import useSpeechToText from "../hooks/useSpeechToText";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

function Speech({comman, setCommand, theme}) {
    const [textInput, setTextInput] = useState("");
    const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechToText({ continuous: true });

    useEffect(() => {
        if (!isListening && transcript) {
            setTextInput(prevVal => prevVal + (prevVal.length ? ' ' : '') + transcript);
            setCommand(transcript); // Update command when transcript changes
            console.log(transcript); // Log the current transcript
            setTranscript(""); // Clear transcript after setting command
        }
    }, [isListening, transcript, setTranscript]);

    function startStopListening() {
        if (isListening) {
            stopListening();
        } else {
            setTextInput(""); // Clear textarea when starting to listen
            startListening();
        }
    }

    return (
        <div>
            {isListening ? (
                <div className="flex flex-col gap-2">
                    <textarea
                        value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                        disabled={isListening}
                        onChange={(e) => {setTextInput(e.target.value)}}
                        type="text"
                        className={`${theme === 'dark' ? 'bg-[#0D2136]' : 'bg-white'} rounded-lg border-[0.1rem] border-slate-300 w-[15rem] h-[8rem] shadow-lg`}
                    ></textarea>
                    <button onClick={startStopListening} className="bg-red-400 text-white p-4 rounded-full">
                        <MicOffIcon /> Stop Listening
                    </button>
                </div>
            ) : (
                <button onClick={startStopListening} className="bg-green-400 text-white p-4 rounded-full">
                    <MicIcon /> Speak
                </button>
            )}
        </div>
    );
}

export default Speech;
