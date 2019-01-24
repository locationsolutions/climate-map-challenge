import React from 'react';
import styled from "styled-components";

// for me, VSCode claims that the value of bgColor is never read, 
// although it is in fact being used; it's an issue with the 
// styled-componets library, I guess.
function Temperature({timeStamp, temp, bgColor, className}) {

  const date = new Date(timeStamp).toISOString().slice(0, 13);

  return (<div className={className}>
    <p>{date}</p>
    <p>{temp}</p>
  </div>);
}

export default styled(Temperature)`
  width: 280px;
  height: 70px;
  background: ${props => props.bgColor};
  text-align: center;
  border-radius: 5px;
  margin: 10px;
  color: white;
`;