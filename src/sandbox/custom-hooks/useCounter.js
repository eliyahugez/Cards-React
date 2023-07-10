import { number } from "prop-types";
import { useState } from "react";

const useCounter = (initialState = 0) => {
    const [count, setCount] = useState(initialState);
    
    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    const reset = () => setCount(initialState);
    
    return [count, increment, decrement, reset];
};

useCounter.propTypes = {
    initialState: number,
};

export default useCounter;
