import "./_App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/public/Homepage";
import Login from "./page/public/Login";
import Signin from "./page/public/Signin";

function App() {
    return (
        <Router>
            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Homepage />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<Signin />} />
                {/* ADMIN */}
                {/* USER */}
            </Routes>
        </Router>
    );
}

export default App;
