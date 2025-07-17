import { createContext, useState } from "react";

export let CounterContext = createContext(0)

export default function CounterContextProvider(children) {
    const [count, setCount] = useState(0);
    function setCounter() {
        setCount(count + 1);
    }

    return (
        <CounterContext.Provider value={{count, setCount, setCounter}}>
        {children.children}
        </CounterContext.Provider>
    );
}