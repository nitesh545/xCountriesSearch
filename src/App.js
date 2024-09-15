import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
    let [flags, setFlags] = useState([]);
    let [searchText, setSearchText] = useState("");
    let [filteredFlags, setFilteredFlags] = useState([]);

    let fetchFlags = () => {
        try {
            fetch("https://restcountries.com/v3.1/all")
                .then((response) => response.json())
                .then((data) => setFlags(data));
        } catch (err) {
            console.log(err);
        }
    };

    let searchFlags = () => {
        try {
            fetch(`https://restcountries.com/v3.1/all/${searchText}`)
                .then((response) => response.json())
                .then((data) => setFlags(data));
        } catch (err) {
            console.log(err);
        }
    };

    let showFilteredFlags = () => {
        setFilteredFlags(
            flags.filter((x) => x.name.common.includes(searchText))
        );
    };

    useEffect(() => {
        fetchFlags();
    }, []);

    return (
        <div className="App">
            <input
                type="search"
                onChange={(event) => {
                    setSearchText(event.target.value);
                    // showFilteredFlags();
                }}
            ></input>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {flags &&
                    flags.map((flag) => {
                        return (
                            <div
                                key={crypto.randomUUID()}
                                className="countryCard"
                                style={{ padding: "0.5rem" }}
                            >
                                <img
                                    src={flag.flags.png}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        verticalAlign: "middle",
                                    }}
                                ></img>
                                <h5>{flag.name.common}</h5>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
