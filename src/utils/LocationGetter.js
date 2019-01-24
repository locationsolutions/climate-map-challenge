import {useRef, useEffect} from 'react';

// not used anywhere atm (see note in assignment.txt)
function getSelectedLocationId(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default getSelectedLocationId;