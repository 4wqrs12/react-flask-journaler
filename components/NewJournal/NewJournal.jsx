import { useState } from "react";
import NewJournalSection from "./NewJournalSection";

function NewJournal() {
  const [displayValue, setDisplayValue] = useState(false);

  function handleDisplay() {
    setDisplayValue(!displayValue);
  }

  return (
    <div className="new-journal-container">
      <button onClick={handleDisplay}>New Journal</button>
      <NewJournalSection display={displayValue} />
    </div>
  );
}

export default NewJournal;
