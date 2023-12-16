import "../styles/Reminders.css";
import "../styles/Card.css";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import cancel from "./delete.png"
import UpdateReminders from "./ReminderDetails"
import edit from "./edit.png"
import PopupModal from "./PopupModal";
import { deleteReminder } from "../store/reminderReducer";
import { useState } from "react";

const Reminders = () => {
    const reminders = useSelector((state) => state.reminderReducer); 
    const loggedIndex = useSelector((state => state.indexReducer[0]));
    const users = store.getState().userReducer;
    const [toggle,settoggle] = useState(false);
    const [remStatus, setRemStatus] = useState(false);
    const [remMsg, setRemMsg] = useState('');
const [reminderToUpdate, setReminderToUpdate] = useState({});

    const togglebutton = () =>{
        settoggle(!toggle);
        setRemStatus(!remStatus)
        if(remStatus){
            setRemMsg("Enabled")
        }
        else{
            setRemMsg("Disabled")
        }
        setPopupOpen1(true);
        setTimeout(() => {
                setPopupOpen1(false);
              }, 3000);

    }

    const handleDelete = (reminder) => {
        // setSuccess("deleted");
        store.dispatch(deleteReminder(reminder));
        // handleButtonClick();
        setPopupOpen(true);

    
        setTimeout(() => {
          setPopupOpen(false);
        }, 3000);
    }

    function setCookie(name, value) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
      
        const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString();
        document.cookie = name + '=' + cookieValue + '; path=/';
      }
     
            

    const handleUpdate=(reminder)=>{
           const id=reminder.id
           console.log(id)
           const updatedReminderElement = document.getElementById(`update`);

            // Scroll to the updated reminder if found
            if (updatedReminderElement) {
                updatedReminderElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
 
            setCookie('remId', id);

            const filteredReminders = reminders
            .filter((reminder) => reminder.username === users[loggedIndex].username && reminder.id==id)
    
                console.log(filteredReminders)

                setReminderToUpdate(filteredReminders)
           
    }

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isPopupOpen1, setPopupOpen1] = useState(false);

    // const handleButtonClick = () => {
    //   setPopupOpen(true);
    //   console.log(true)
    //   setTimeout(() => {
    //     setPopupOpen(false);
    //   }, 5000);
    // };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
    };
  

    return(
        <div className="combine">
       
        <div className="reminders">
            <div className="reminders-header">
                Upcoming Reminders
            </div>
            <div className="row">
            {
                reminders.map((reminder)=>{
                    return(
                        reminder.username === users[loggedIndex].username &&
                        <div className="column">
                            <div className="card">
                               <div>
                               <img src={cancel} className="delete" onClick={() => handleDelete(reminder)}  />
                               {isPopupOpen && (
                                        <div className="popup-modal">
                                        <p>Item deleted successfully!</p>
                                        </div>
                                    )}
                               </div>
                                {/* <PopupModal isOpen={isPopupOpen} onClose={handleClosePopup} message="Reminder is set!" /> */}
                                {/* {success && <span className="success-message">{success}</span>} */}
                               

                                <img src={edit} className="update" onClick={() => handleUpdate(reminder)} />
                                {/* <img src={cancel} className="toggle" onClick={() => handleDelete(reminder)} /> */}
                                <button onClick={togglebutton} className="toggle" >{toggle?'Enable': 'Disable'}</button>
                                <div className="card-content">
                                        <div className="field">
                                        <strong>Date:</strong>{JSON.stringify(reminder.date)}
                                        </div>
                                        <div className="field">
                                        <strong>Subject:</strong> {reminder.subject}
                                        </div>
                                        <div className="field">
                                        <strong>Text:</strong> {reminder.text}
                                        </div>
                                        <div className="field">
                                        <strong>Email:</strong> {reminder.email}
                                        </div>
                                        <div className="field">
                                        <strong>Contact:</strong> {reminder.contact}
                                    </div>
                                    <div className="field">
                                        <strong>Recur for next:</strong> {reminder.recur}
                                        </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <PopupModal isOpen={isPopupOpen} onClose={handleClosePopup} message="Reminder is Deleted!" />
            <PopupModal isOpen={isPopupOpen1} onClose={handleClosePopup} message={`Reminder is ${remMsg}`} />


        
        {/* <div id="update">
        <div className="card1"><UpdateReminders sample={reminderToUpdate} /></div> 
        </div>  */}
        </div>
        </div>
    )
}

export default Reminders;
