import React, {useState} from "react";
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Main} from "./Components/Main/Main";

function App() {

    const [search, setSearch] = useState(undefined)

    return (
        <div className="App">
            <Header setSearch={setSearch}/>
            <Main search={search}/>
            <Footer/>
        </div>
    );
}

export default App;