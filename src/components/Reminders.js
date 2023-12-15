import "../styles/Reminders.css";
import "../styles/Card.css";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import cancel from "./delete.png"
import edit from "./edit.png"
import { deleteReminder } from "../store/reminderReducer";
import { useState } from "react";

const Reminders = () => {
    const reminders = useSelector((state) => state.reminderReducer); 
    const loggedIndex = useSelector((state => state.indexReducer[0]));
    const users = store.getState().userReducer;
    const [toggle,settoggle] = useState(false);

    const togglebutton = () =>{
        settoggle(!toggle);
    }

    const handleDelete = (reminder) => {
        store.dispatch(deleteReminder(reminder));
    }

    const handleUpdate=()=>{
           
    }

    return(
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
                                <img src={cancel} className="delete" onClick={() => handleDelete(reminder)} />
                                <img src={edit} className="update" onClick={() => handleUpdate(reminder)} />
                                {/* <img src={cancel} className="toggle" onClick={() => handleDelete(reminder)} /> */}
                                <button onClick={togglebutton} className="toggle" >{toggle?'Enable': 'Disable'}</button>
                                <div className="card-content">
                                        <div className="field">
                                        <strong>Username:</strong> {reminder.username}
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
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Reminders;
