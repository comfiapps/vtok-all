import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import strings from "./res/strings";
import Main from "./layouts/Main";
import * as React from "react";
import {useState} from "react";

function App() {

    const [account, setAccount] = useState(null);

    return (
        <Main account={account} setAccount={setAccount} />
    );
}

export default App;
