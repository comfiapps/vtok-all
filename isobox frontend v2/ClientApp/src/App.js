import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "./layouts/Main";
import * as React from "react";
import {useState} from "react";

function App() {

    const defaultAccount = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get("wallet") === "0" ? null : "0x71Ae83fB88a4B5D3a28C74d0eC6036E1045F482D";
    const [account, setAccount] = useState(defaultAccount);

    return (
        <Main account={account} setAccount={setAccount} />
/*        <BrowserRouter>
            <Switch>
                <Route path={"/:lang"} exact component={Main} account={account} setAccount={setAccount}/>

                <Redirect to={"/"} />
            </Switch>
        </BrowserRouter>*/
    );
}

export default App;
