import {useRef, useEffect} from 'react';

function getSelectedLocatoinId(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default getSelectedLocatoinId;