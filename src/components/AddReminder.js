import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { addReminder } from "../store/reminderReducer";
import { store } from "../store/store";
import "../styles/AddReminder.css";
import { useSelector } from "react-redux";
import PopupModal from "./PopupModal";
import { Button } from "@material-ui/core";

const AddReminder = () => {
  const [reminderText, setReminderText] = useState("");
  const [name, setName] = useState("math");
  const [date, setdate] = useState("");
  const [recur, setRecur] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const loggedIndex = useSelector((state) => state.indexReducer[0]);
  const users = store.getState().userReducer;
  const handleChange = (e) => {
    setReminderText(e.target.value);
  };
  const handleChange1 = (event) => {
    const selectedSubject = event.target.value;
    setName(selectedSubject);
  };
  const handleChange2 = (e) => {
    setEmail(e.target.value);
  };

  const handleChange3 = (e) => {
    setContact(e.target.value);
  };

  const handleChangeDate = (e) => {
    setdate(e.target.value);
  };

  const handleRecur = (e) => {
    setRecur(e.target.value);
  };

  const handleSubmit = () => {
    const id = Date.now();
    const reminder = {
      username: users[loggedIndex].username,
      date: date,
      id: id,
      subject: name,
      text: reminderText,
      email: email,
      contact: contact,
      recur: recur,
    };
    console.log(reminder);

    store.dispatch(addReminder(reminder));
    setReminderText("");
    handleButtonClick();
  };

  // --------
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(true);
    setTimeout(() => {
      setPopupOpen(false);
    }, 5000);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  /////////////////////

  return (
    <div className="add-reminder">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Select a Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleChangeDate}
          required
        />

        <label htmlFor="subject">Select a Subject:</label>
        <select
          id="subject"
          name="subject"
          value={name}
          onChange={handleChange1}
          required
        >
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="description">Add a Description:</label>
        <TextField
          className="Textfield"
          id="outlined-multiline-static"
          label=""
          multiline
          rows={5}
          variant="outlined"
          placeholder="What's on your mind?"
          value={reminderText}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        {/* <textarea id="description" name="description" rows="4" required></textarea> */}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange2}
          required
        />

        <label htmlFor="contact">Contact No:</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          value={contact}
          onChange={handleChange3}
          required
        />

        <label htmlFor="recur">Recur for Next</label>
        <div className="radio-group" onChange={handleRecur}>
          <label htmlFor="daily">
            <input
              type="radio"
              id="daily"
              name="recur"
              value="7 Days"
              checked={recur === "7 Days"}
            />{" "}
            7 Days
          </label>
          <label htmlFor="weekly">
            <input
              type="radio"
              id="weekly"
              name="recur"
              value="5 Days"
              checked={recur === "5 Days"}
            />{" "}
            5 Days
          </label>
          <label htmlFor="monthly">
            <input
              type="radio"
              id="monthly"
              name="recur"
              value="3 Days"
              checked={recur === "3 Days"}
            />{" "}
            3 Days
          </label>
          <label htmlFor="yearly">
            <input
              type="radio"
              id="yearly"
              name="recur"
              value="2 Days"
              checked={recur === "2 Days"}
            />{" "}
            2 Days
          </label>
        </div>

        
        <div className="add-button">
      
        <button className="button" type="submit">
  Add Reminder
</button>
          
        </div>
          
      </form>
      <PopupModal isOpen={isPopupOpen} onClose={handleClosePopup} message="Reminder is set!" />
    </div>
  );
};

export default AddReminder;
