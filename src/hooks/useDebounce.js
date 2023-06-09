import {useEffect, useState} from "react";

export const useDebounce = (path) => {

    const [debounceValue, setDebounceValue] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(path)
        }, 600);
        return () => clearTimeout(timeout)
    }, [path])

    return debounceValue
}