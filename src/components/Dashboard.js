import AddReminder from "./AddReminder";
import Reminders from "./Reminders";
import '../styles/Dashboard.css'

const Dashboard = () => {
    return(
        <>
            <div className="card1"><AddReminder /></div>         
            <div className="card1"><Reminders /></div>
            <div className="card1"><Reminders /></div>          
            
       </>
       
    )
}

export default Dashboard;
