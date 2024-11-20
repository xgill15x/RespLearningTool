import React, { useState, useRef } from "react";

const App = () => {
  const sounds = [
    `${process.env.PUBLIC_URL}/sounds/Bronchial_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Broncho Vesicular_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Cavernous_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Coarse Crackles_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Egophony_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Medium To Fine Crackles_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Monophonic Wheeze_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Pectoriloquy_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Plural Friction Rub_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Pulmonary Edema_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Rhonci Crackles_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Stridor_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Tracheal_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Vesicular_1_1.mp3`,
    `${process.env.PUBLIC_URL}/sounds/Wheeze_1_1.mp3`,
  ];

  const correctImages = [
    `${process.env.PUBLIC_URL}/images/puppy-thumbs-up.gif`,
    `${process.env.PUBLIC_URL}/images/jon-jones.gif`,
    `${process.env.PUBLIC_URL}/images/good-job.gif`,
  ];

  const incorrectImages = [
    `${process.env.PUBLIC_URL}/images/disappointed.jpeg`,
    `${process.env.PUBLIC_URL}/images/smh-kanye-west.gif`,
    `${process.env.PUBLIC_URL}/images/squidward-stressed.gif`,
  ];

  const [currentSound, setCurrentSound] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackImage, setFeedbackImage] = useState("");

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
    audio.play();

    setUserGuess("");
    setFeedback("");
    setFeedbackImage("");
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
      const randomCorrectImage =
        correctImages[Math.floor(Math.random() * correctImages.length)];
      setFeedbackImage(randomCorrectImage);
    } else {
      setFeedback(`Incorrect! The correct answer is: ${correctAnswer}`);
      const randomIncorrectImage =
        incorrectImages[Math.floor(Math.random() * incorrectImages.length)];
      setFeedbackImage(randomIncorrectImage);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Random Bad Lung Sound Player (Difficulty: Expert)</h1>
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
        <div style={{ marginTop: "20px" }}>
          <p
            style={{
              color: feedback.startsWith("Correct") ? "green" : "red",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {feedback}
          </p>
          {feedbackImage && (
            <img
              src={feedbackImage}
              alt={feedback.startsWith("Correct") ? "Correct" : "Incorrect"}
              style={{
                maxWidth: "90%",
                maxHeight: "300px",
                objectFit: "contain",
                marginTop: "10px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
