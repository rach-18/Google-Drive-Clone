import { useState, useEffect } from "react";
import useSpeechToText from "../hooks/useSpeechToText";

function Speech() {
    const [textInput, setTextInput] = useState("");
    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true });

    useEffect(() => {
        if (!isListening && transcript) {
            setTextInput(prevVal => prevVal + (prevVal.length ? ' ' : '') + transcript);
        }
    }, [isListening, transcript]);

    function startStopListening() {
        isListening ? stopListening() : startListening();
    }

    return (
        <div>
            <button onClick={() => startStopListening()}>
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
            <input
                value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                disabled={isListening}
                onChange={(e) => setTextInput(e.target.value)}
                type="text"
                className="w-[10rem] h-[10rem]"
            />
        </div>
    );
}

export default Speech;
