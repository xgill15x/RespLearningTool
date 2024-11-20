import React, { useState, useRef } from "react";

const App = () => {
  const sounds = [
    "/sounds/Bronchial_1_1.mp3",
    "/sounds/Broncho Vesicular_1_1.mp3",
    "/sounds/Cavernous_1_1.mp3",
    "/sounds/Coarse Crackles_1_1.mp3",
    "/sounds/Egophony_1_1.mp3",
    "/sounds/Medium To Fine Crackles_1_1.mp3",
    "/sounds/Monophonic Wheeze_1_1.mp3",
    "/sounds/Pectoriloquy_1_1.mp3",
    "/sounds/Plural Friction Rub_1_1.mp3",
    "/sounds/Pulmonary Edema_1_1.mp3",
    "/sounds/Rhonci Crackles_1_1.mp3",
    "/sounds/Stridor_1_1.mp3",
    "/sounds/Tracheal_1_1.mp3",
    "/sounds/Vesicular_1_1.mp3",
    "/sounds/Wheeze_1_1.mp3",
  ];

  const [currentSound, setCurrentSound] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const audioRef = useRef(null);

  const playRandomSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const randomIndex = Math.floor(Math.random() * sounds.length);
    const randomSound = sounds[randomIndex];
    setCurrentSound(randomSound);

    const audio = new Audio(randomSound);
    audioRef.current = audio;
    console.log(audio);
    audio.play();

    setUserGuess("");
    setFeedback("");
  };

  const repeatSound = () => {
    if (currentSound) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(currentSound);
      audioRef.current = audio;
      audio.play();
    }
  };

  const checkGuess = () => {
    const correctAnswer = currentSound
      .split("/")
      .pop()
      .replace("_1_1", "")
      .replace(".mp3", "");

    const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

    if (normalize(userGuess) === normalize(correctAnswer)) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! The correct answer is: ${correctAnswer}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Random Lung Sounds Player</h1>
      <button
        onClick={playRandomSound}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      >
        Play Random Sound
      </button>

      {currentSound && (
        <button
          onClick={repeatSound}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Repeat Sound
        </button>
      )}

      {currentSound && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess here"
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={checkGuess}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </div>
      )}

      {feedback && (
        <div
          style={{
            marginTop: "20px",
            color: feedback.startsWith("Correct") ? "green" : "red",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default App;
