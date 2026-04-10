import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const MyContext = createContext();

const MyProvider = (props) => {
  const [stage, setStage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");

  const addPlayerHandler = (name) => {
    setPlayers((prev) => [...prev, name]);
  };

  const removePlayerHandler = (idx) => {
    let newArray = [...players];
    newArray.splice(idx, 1);
    setPlayers(newArray);
  };

  const nextHandler = () => {
    if (players.length < 2) {
      toast.error("You need more than one player", {
        position: "top-left",
        autoClose: 2000,
      });
    } else {
      setStage(2);
      setTimeout(() => {
        generateLoser();
      }, 2000);
    }
  };

  const generateLoser = () => {
    let res = players[Math.floor(Math.random() * players.length)];
    setResult(res);
  };

  const resetGameHandler = () => {
    setStage(1);
    setPlayers([]);
    setResult("");
  };

  return (
    <>
      <MyContext.Provider
        value={{
          stage,
          players,
          result,
          addPlayer: addPlayerHandler,
          removePlayer: removePlayerHandler,
          next: nextHandler,
          generateNewLoser: generateLoser,
          resetGame: resetGameHandler,
        }}
      >
        {props.children}
      </MyContext.Provider>

      <ToastContainer />
    </>
  );
};

export { MyContext, MyProvider };