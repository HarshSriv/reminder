import TextField from '@material-ui/core/TextField';
import { useState,useEffect } from 'react';
import { addReminder } from '../store/reminderReducer';
import { store } from '../store/store';
import "../styles/AddReminder.css";
import { deleteReminder } from "../store/reminderReducer";
import { useSelector } from "react-redux";

const ReminderDetails = (props) => {
  const [prevreminderText, setprevReminderText] = useState('');


  useEffect(() => {
    if (props.sample && props.sample.length > 0) {
      console.log(props.sample[0].text);
      setprevReminderText(props.sample[0].text)
      
    }
  }, [props.sample]);

  const [reminderText, setReminderText] = useState('');
  const [name, setName] = useState("math");
  const [date, setdate] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const loggedIndex = useSelector((state => state.indexReducer[0]));
  const users = store.getState().userReducer;
  const [isDivVisible, setDivVisibility] = useState(false);




  const reminders = useSelector((state) => state.reminderReducer);

  function getCookie(name) {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }


  const handleChange = (e) => {
      setReminderText(e.target.value);
  }
  const handleChange1 = (event) => {
      const selectedSubject = event.target.value;
      setName(selectedSubject);
    };
  const handleChange2 = (e) => {
      setEmail(e.target.value);
  }

  const handleChange3 = (e) => {
      setContact(e.target.value);
  }



  const handleUpdateProcess = () => {
    setDivVisibility(true);
    console.log(getCookie('remId'))
    console.log(reminders)
    const filteredReminders = reminders
        .filter((reminder) => reminder.username === users[loggedIndex].username && reminder.id==getCookie('remId'))

            console.log(filteredReminders)
        
        setName(filteredReminders[0].subject)

        setReminderText(filteredReminders[0].text)
        setEmail(filteredReminders[0].email)
        setContact(filteredReminders[0].contact)

        console.log(contact)
        console.log(name)
        console.log(reminderText)
        console.log(email)


  }
  const handleSubmit = () => {
      const reminder = {
          username: users[loggedIndex].username,
          id:getCookie('remId'),
          subject:name,
          text: reminderText,
          email:email,
          contact:contact
      }

      console.log(props.sample[0].text)
      setReminderText(props.sample[0].text)

      setReminderText("");
  }
  

  return(
      <div className="add-reminder">
          <form>
    <label htmlFor="date">Select a Date:</label>
    <input type="date" id="date" name="date" required />

    <label htmlFor="subject">Select a Subject:</label>
    <select id="subject" name="subject"  value={name}
                  onChange={handleChange1} required>
      <option value="math">Math</option>
      <option value="science">Science</option>
      <option value="history">History</option>
      {/* Add more options as needed */}
    </select>

    <label htmlFor="description">Add a Description:</label>
    <TextField    className="Textfield"
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="What's on your mind?"
                  value={reminderText}
                  onChange={handleChange}
              />
      <br/>
      <br />
    {/* <textarea id="description" name="description" rows="4" required></textarea> */}

    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email"  value={email}
                  onChange={handleChange2} required />

    <label htmlFor="contact">Contact No:</label>
    <input type="tel" id="contact" name="contact"  value={contact}
                  onChange={handleChange3} required />
    
    
    <label htmlFor="recur">Recur for Next</label>
    <div className="radio-group">
      <label htmlFor="daily"><input type="radio" id="daily" name="recur" value="daily" /> 7 Days</label>
      <label htmlFor="weekly"><input type="radio" id="weekly" name="recur" value="weekly" /> 5 Days</label>
      <label htmlFor="monthly"><input type="radio" id="monthly" name="recur" value="monthly" /> 3 Days</label>
      <label htmlFor="yearly"><input type="radio" id="yearly" name="recur" value="yearly" /> 2 Days</label>
    </div>
    <div className="add-button">
    
    <input className="button" type="button" value="Update Reminder" onClick={handleSubmit} />
  
      </div>
    
      </form>
   
   
      </div>
  )
}

export default ReminderDetails;


