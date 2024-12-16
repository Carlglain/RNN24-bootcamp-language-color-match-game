import React, { useState } from "react";
import "./App.css";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
function App() {
  const [gameData, setGameData] = useState({
    progLang: " ",
    color: " ",
  });

const [gameStats, setGameStats] = useState([])
  const [gameMessage,setGameMessage] = useState("") // set success or failure message
  const [isCorrect, setIsCorrect] = useState(true) //checks whethere the language color combination is correct
  const [failureCount, setFailureCount] = useState(0) //count total number of errors
  const [gameCount, setGameCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameData((prevData) => {
      return { ...prevData, [name]: value.trim() };
    });
  };
  // Database of programming languages and their colors
  const db = [
    { lang: "Java", color: "Blue" },
    { lang: "Python", color: "Blue" },
    { lang: "JavaScript", color: "Yellow" },
    { lang: "C++", color: "Red" },
    { lang: "C#", color: "Purple" },
    { lang: "Ruby", color: "Red" },
    { lang: "Swift", color: "Orange" },
    { lang: "PHP", color: "Purple" },
    { lang: "Go", color: "Blue" },
    { lang: "Rust", color: "Orange" },
    { lang: "Kotlin", color: "Green" },
    { lang: "TypeScript", color: "Blue" },
    { lang: "Scala", color: "Red" },
    { lang: "Perl", color: "Blue" },
    { lang: "Haskell", color: "Green" },
    { lang: "MATLAB", color: "Red" },
    { lang: "R", color: "Blue" },
    { lang: "Julia", color: "Green" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setGameCount(count => count + 1)
    if (gameCount == 19 || failureCount == 4){
      alert("Game Over!")
      setGameOver(true)
      if(failureCount == 4){
        alert("You have reached 5 failures!")
      }
      return
    }
    let found = false;

    for (let i = 0; i < db.length; i++) {
      if (
        gameData.color.toLowerCase() === db[i].color.toLowerCase() &&
        gameData.progLang.toLowerCase() === db[i].lang.toLowerCase()
      ) {
        setGameMessage("Huree! Correct language-color combination");
        setIsCorrect(true);
        found = true;
        break;
      }
    }

    if (!found) {
      setGameMessage("Oops! Wrong language-color combination");
      setIsCorrect(false);
      setFailureCount((ct) => ct + 1);
      console.log(failureCount);
    } 
    // Update gameStats state
    setGameStats((prevStats) => [
      ...prevStats,
      { lang: gameData.progLang, color: gameData.color, isRight: isCorrect },
    ]);

    // Clear input fields after submission
    setGameData({ progLang: "", color: "" });
  };
  return (
    <div>
      <h1>Programming Language color match game</h1>
      <h3>Instructions</h3>
      <p>
        To play this game you have to enter a programming language in the first
        field and it's color match in the second field
      </p>
      <div className="all-lang-color"></div> {/* display all languages and color combinations for few seconds */}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="l1">Programming Language: </label>
        <input
          id="l1"
          type="text"
          name="progLang"
          className="br"
          onChange={handleChange}
          value={gameData.progLang}
        />{" "}
        <br />
        <label htmlFor="l2">Language color: </label>{" "}
        <input
          type="text"
          name="color"
          onChange={handleChange}
          value={gameData.color}
        ></input>{" "}
        <br />
        <div className={isCorrect?"success-message":"error-message"}> {gameMessage}</div>
        <button disabled = {gameOver}>Play</button>
      </form>
      <div className="game-stats">
      <p>You have attempted {gameCount} /20</p>
      <p>
          You had {gameCount - failureCount} correct and {failureCount} wrong
        </p>
        <h3>The different attempts </h3>
      <ul>{gameStats.map((stat,index)=>(
        <li key={index}>{stat.lang} - {stat.color}- {stat.isRight ? <DoneIcon style={{color:"green"}}/> : <CloseIcon tyle={{color:"red"}}/>}</li>
      ))}</ul>
      </div>
    </div>
  );
}

export default App;
