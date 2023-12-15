import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PrivateRoute from "./PrivateRoute";
import Reminders from "../components/Reminders";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path = "/" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/viewReminder" component={Reminders} />
                <Route path="/home" component={Dashboard} />
            </Switch>
        </Router>
    )
}

export default Routes;
