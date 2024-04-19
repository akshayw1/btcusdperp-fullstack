import React, { useState, useEffect } from "react";
import styles from "../styles.module.css";
import { strict as assert } from "assert";
import { stripHtml } from "string-strip-html";

import OpenAI from "openai";


const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [synth, setSynth] = useState(null);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };


const result = stripHtml(text).result;




 const openai = new OpenAI({apiKey: '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',dangerouslyAllowBrowser: true });



  useEffect(() => {
    if (synth) {
      const u = new SpeechSynthesisUtterance(result);
      console.log(text);

      u.voice = voice;
      u.pitch = pitch;
      u.rate = rate;
      u.volume = volume;
      u.onend = handleEnd;

      setUtterance(u);

      const voices = synth.getVoices();
      setVoice(voices[1]);

      return () => {
        setVoice(null);
      };
    }
  }, [text, synth, voice, pitch, rate, volume]);

  useEffect(() => {
    if (!synth) setSynth(window.speechSynthesis);
    if (synth) {
      synth.cancel();
    }
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  const handlePlay = () => {
    setCurrentTime(0);
    synth.speak(utterance);

    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPaused(true);
    synth.cancel();
  };

  const handleEnd = () => {
    setIsPaused(true);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  return (
    <div
      // onClick={() => {
      //   if (!isPaused) {
      //     handleStop();
      //   } else if (voice) {
      //     handlePlay();
      //   }
      // }}
      onClick={()=>{
        if(!isPaused){

          handleStop();
        }else{
          handlePlay();
        }
      }}
      className={`${styles.audioBox} ${(synth && voice )? "" : styles.disable}`}
    >
      {/* {console.log(isPaused)} */}
      {!isPaused ? (
        <svg
          width="15"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
              fill="#ffffff"
            />
            <path
              d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      ) : (
        <svg
          width="15"
          height="17"
          viewBox="0 0 15 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 8.5L0.75 16.7272V0.272758L15 8.5Z" fill="white" />
        </svg>
      )}
      <p>{formatTime(currentTime)}</p>
    </div>
  );
};

export default TextToSpeech;
