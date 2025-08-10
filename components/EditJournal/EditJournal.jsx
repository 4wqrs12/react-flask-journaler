import { useEffect, useState } from "react";
import JournalButton from "./JournalButton";

function EditJournal() {
  const [journalData, setJournalData] = useState({});
  const [displayValue, setDisplayValue] = useState({
    displayContainer: false, // For edit journal button
    displayButtons: false, // For journals buttons to moodify journals, important
    displayDiv: false, // For the div that contains the above (journal buttons)
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/get-journals")
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "Request successful") {
          setJournalData(result);
          setDisplayValue({
            ...displayValue,
            displayContainer: true,
            displayButtons: true,
          });
        }
      });
  }, []);

  function handleClick() {
    setDisplayValue({
      ...displayValue,
      displayDiv: !displayValue.displayDiv,
    });
  }

  return (
    <div
      className="edit-journal-container"
      style={{ display: displayValue.displayContainer ? "block" : "none" }}
    >
      <button onClick={handleClick}>Edit Journal</button>
      <div
        className="journal-buttons"
        style={{ display: displayValue.displayDiv ? "block" : "none" }}
      >
        {displayValue.displayButtons &&
          Object.keys(journalData.data.journals).map((value, index) => (
            <JournalButton key={index} value={value} />
          ))}
      </div>
    </div>
  );
}

export default EditJournal;
