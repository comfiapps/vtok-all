import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CategoryPage from "./page/CategoryPage";
import FilePage from "./page/FilePage";
import MainAppBar from "./component/MainAppBar";
import strings from "./res/strings";
import FileHistoryPage from "./page/FileHistoryPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <MainAppBar/>
                <Switch>
                    <Route path={strings.CATEGORY} exact component={CategoryPage}/>
                    <Route path={strings.FILE} exact component={FilePage} />
                    <Route path={strings.FILE + "/:id"} exact component={FileHistoryPage} />

                    <Redirect to={strings.CATEGORY} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
