import { useState } from "react";

function NewJournalSection(props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState();

  function handleInput(event) {
    setName(event.target.value);
  }

  function handleSubmit() {
    fetch("http://localhost:5000/api/create-journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        setName("");
        window.location.reload();
      })
      .catch((e) => console.log(e));
  }

  return (
    <div
      className="new-journal"
      style={{ display: props.display ? "block" : "none" }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleInput}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default NewJournalSection;
