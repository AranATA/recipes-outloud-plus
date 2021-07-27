import React from "react";
import useSpeech from "../utils/useSpeech";


function SpeakButton(props) {
    const { wordsToSpeak } = props;
    const { speak }= useSpeech();

    return (

        <button
            className='bg-blue-800 rounded text-white w-40 clear-both justify-center'
            onClick={() => speak(wordsToSpeak)}>
            OutLoud <svg className="align-middle inline h-5 w-5 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polygon points="10 8 16 12 10 16 10 8" /></svg>
        </button>

    )
}
export default SpeakButton;