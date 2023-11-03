import { useEffect, useState } from "react";
import { FETCH_FROM, NOTE_FILLER, PIANO_ROLL_LENGTH } from "../data/predefined";
import { PRollList } from "../components/PRollList/PRollList";
import { LoadPRollsBtn } from "../components/LoadPRollsBtn/LoadPRollsBtn";
import { Loader } from "../components/Loader/Loader";

async function loadPianoRollData() {
  try {
    const response = await fetch(FETCH_FROM);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading data:", error);
  }
  return [];
}

const separatePRolls = (data) => {
  if (!data || data.length < 1) return [];

  const rolls = [];
  for (let it = 0; it < data.length / PIANO_ROLL_LENGTH; it++) {
    const start = it * PIANO_ROLL_LENGTH;
    const end = start + PIANO_ROLL_LENGTH;
    const partData = data.slice(start, end);
    while (partData.length < PIANO_ROLL_LENGTH) {
      partData.push(NOTE_FILLER);
    }
    // const { cardDiv, svg } = this.preparePianoRollCard(it);
    //   pianoRollContainer.appendChild(cardDiv);
    // const roll = new PianoRoll({ svgElement: svg, sequence: [...partData] });
    // console.log(`pushing roll id[${it}]`);
    rolls.push({ sequence: [...partData], id: it });
  }
  return rolls;
};

export const PRollsPage = () => {
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [pRolls, setPRolls] = useState([]);

  useEffect(() => {
    if (reload) {
      const getPRolls = async () => {
        try {
          setError(false);
          setIsLoading(true);
          const data = await loadPianoRollData();
          //   console.log(separatePRolls(data));
          setPRolls(separatePRolls(data));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getPRolls();
    }
    // else {
    //   //   setPRolls([]);
    //   setIsLoading(false);
    // }
  }, [reload]);

  return (
    <div>
      {isLoading ? (
        // <Loader />
        ""
      ) : error ? (
        `Error: ${error}`
      ) : (
        <>
          <h1>Welcome to PianoRoll frontend coding challenge!</h1>
          <div id="buttonContainer">
            <LoadPRollsBtn />
          </div>
          <PRollList pRolls={pRolls} />
        </>
      )}
    </div>
  );
};

{
  /* <div className="App">
<nav className="navbar">
  <div className="logo-container">
    <img src={logo} className="logo" alt="Logo" />
  </div>
</nav>
<h1>Welcome to PianoRoll frontend coding challenge!</h1>
<div id="buttonContainer">
  <LoadPRollsBtn />
</div>
<PRollsPage />
</div> */
}
