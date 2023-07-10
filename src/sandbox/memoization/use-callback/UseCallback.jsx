import React, { useState, useCallback, useEffect } from "react";
import ButtonComp from "./ButtonComp";

const UseCallback = () => {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    const getItems = useCallback(() => {
        // super long computation or fetching data from an API
        return [number, number + 1, number + 2];
    }, []);

    const theme = {
        backgroundColor: dark ? "#333" : "#fff",
        color: dark ? "#fff" : "#333",
    }

    return (
        <div style={theme}>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Toggle theme
            </button>
            <List getItems={getItems} />
        </div>
    )
};

const List = ({ getItems }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getItems());
        console.log("updating items");
    }, [getItems]);

    return items.map((item) => <div key={item}>{item}</div>);
}
export default UseCallback;
