import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import TopBar from "./Component/TopBar";
import TrustWallet from "./TrustWallet";
import Metamask from "./Metamask";

function App() {

    return (
        <div>
            <TopBar />
            <Router>
                <Routes>
                    <Route path="/metamask" exact element={<Metamask />}/>
                    <Route path="/trust-wallet" exact element={<TrustWallet />}/>
                    <Route path="*" element={<Navigate to={"/metamask"} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;