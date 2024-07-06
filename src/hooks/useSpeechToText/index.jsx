import { useEffect, useRef, useState } from "react";

function useSpeechToText(options) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Web speech API is not supported");
            return;
        }

        recognitionRef.current = new webkitSpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.interimResults = options.interimResults || true;
        recognition.lang = options.lang || "en-US";
        recognition.continuous = options.continuous || false;

        recognition.onresult = (event) => {
            let finalTranscript = "";
            console.log(event);

            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }

            setTranscript(finalTranscript);
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
        }

        recognition.onend = () => {
            setIsListening(false);
            // Do not clear the transcript here
        }

        return () => {
            recognition.stop();
        }

        // console.log(recognitionRef, recognition);
    }, [options.interimResults, options.lang, options.continuous]);

    console.log(recognitionRef);

    function startListening() {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    }

    function stopListening() {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        setTranscript
    }
}

export default useSpeechToText;
