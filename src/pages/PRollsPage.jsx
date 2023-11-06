import { useEffect, useState } from "react";
import { FETCH_FROM, NOTE_FILLER, PIANO_ROLL_LENGTH } from "../data/predefined";
import { PRollList } from "../components/PRollList/PRollList";
import { LoadPRollsBtn } from "../components/LoadPRollsBtn/LoadPRollsBtn";

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
    rolls.push({ sequence: [...partData], id: it });
  }
  return rolls;
};

export const PRollsPage = () => {
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pRolls, setPRolls] = useState([]);

  useEffect(() => {
    if (reload == true) {
      setPRolls([]);
      const getPRolls = async () => {
        try {
          setError(false);
          setIsLoading(true);
          const data = await loadPianoRollData();
          setPRolls(separatePRolls(data));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
          setReload(false);
        }
      };
      getPRolls();
    }
  }, [reload]);

  return (
    <>
      <h1>PianoRoll frontend coding challenge by Joanna Jasińska</h1>
      {isLoading ? (
        "Loading piano rolls.."
      ) : error ? (
        `Error: ${error}`
      ) : (
        <>
          <div id="buttonContainer">
            <LoadPRollsBtn
              onClick={() => {
                setReload(true);
              }}
            />
          </div>
          <PRollList pRolls={pRolls} />
        </>
      )}
    </>
  );
};
