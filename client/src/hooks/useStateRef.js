import { useState, useRef } from "react";

export function useStateRef(initialValue) {

    const [state, setState] = useState(initialValue);
    const ref = useRef(initialValue);
    const func = (newState) => {
        setState(newState);
        ref.current = newState;
    }
    return [state, func, ref];
}