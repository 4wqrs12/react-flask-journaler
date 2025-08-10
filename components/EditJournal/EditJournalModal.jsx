import { useEffect, useState } from "react";

function EditJournalModal({ displayValue, setterFunction, journalName }) {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/get-journals")
      .then((res) => res.json())
      .then((data) => {
        setText(data["data"]["journals"][journalName]);
      });
  }, [journalName]);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function saveText() {
    fetch("http://localhost:5000/api/modify-journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: journalName, text: text }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        window.location.reload();
      });
  }

  return (
    <div
      className="edit-journal-modal"
      style={{ display: displayValue ? "block" : "none" }}
    >
      <div className="modal-content">
        <div className="modal-title">
          <h1>{journalName}</h1>
        </div>
        <textarea
          name="journal-text"
          id="journal-text"
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <div className="modal-control">
          <button className="save" onClick={saveText}>
            Save
          </button>
          <button className="cancel" onClick={() => setterFunction(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditJournalModal;
