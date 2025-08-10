import { useState } from "react";
import EditJournalModal from "./EditJournalModal";
function JournalButton(props) {
  const [display, setDisplay] = useState(false);
  const [buttonText, setButtonText] = useState("");

  function handleClick(event) {
    setDisplay(true);
    setButtonText(event.target.innerHTML);
  }

  return (
    <>
      <button key={props.id} onClick={handleClick}>
        {props.value}
      </button>

      {/* <div
        className="edit-journal-modal"
        style={{ display: display ? "block" : "none" }}
      >
        <button>Save</button>
        <button onClick={() => setDisplay(false)}>Cancel</button>
      </div> */}

      <EditJournalModal
        displayValue={display}
        setterFunction={setDisplay}
        journalName={buttonText}
      />
    </>
  );
}

export default JournalButton;
