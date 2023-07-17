/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const App = () => {

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const initState: string[] = [];

  const [state, setState] = useState(initState);

  useEffect(() => {
    if (transcript.length === 0) {
      return;
    };
    const newString = transcript.split(' ').at(-1) + `-${(randomNumber(1, 100))}`;
    setState([...state, newString]);
  }, [transcript]);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Браузер не поддерживает voic");
    };
  }, []);

  if (!isMicrophoneAvailable) {
    alert("Разрешите доступ  к микрофону");
  };

  return (
    <>
      <div className='main' >
        <div className='info' >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10}} >
            <p>Microphone</p>
            <div className={listening ? 'voic_on' : 'voic_off'} ></div>
          </div>
          <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
          <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
          <button onClick={() => {
            resetTranscript()
            setState([])
          }}>Reset</button>
        </div>
      </div>
      <p>{state.join(' ')}</p>
    </>
  );
};
export default App;
