import { node } from "prop-types";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";


const NameContext = React.createContext(null);

const NameProvider = ({children}) => {
    const [name, setName] = useState();

    useEffect(() => {
        setName("Victor");
    }, []);

    return (
        <NameContext.Provider value={{name, setName}}>
            {children}
        </NameContext.Provider>
    )
};

export const useName =() => {
    const context = useContext(NameContext)
    if(!context) throw new Error (" userName must be within a NameProvider");
    return context;
}

NameProvider.propTypes = {
    children: node.isRequired
}

export default NameProvider;