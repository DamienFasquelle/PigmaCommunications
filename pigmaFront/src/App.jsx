import "./_App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/public/Homepage";
import Login from "./page/public/Login";
import Signin from "./page/public/Signin";
import UserDashboard from "./page/user/UserDashboard";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
                {/* User */}
                <Route path="user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
