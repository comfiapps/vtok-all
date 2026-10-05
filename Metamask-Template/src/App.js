import React from "react";
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Change from "./Page/Change";
import Connect from "./Page/Connect";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Change/>}/>
                <Route path="/connect" element={<Connect/>}/>
            </Routes>
        </Router>
    );
}

export default App;
