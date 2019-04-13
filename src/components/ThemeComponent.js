import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
   float: left;
   width: 300px;
   background-color: red;
   display: inline;
   text-align: center;
   padding-top: 10%;
`
const StyledLabel = styled.label`
  display: block;
  position: relative;
  padding-left:35px;
  margin-bottom: 12px;
  margin-left: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
   &:hover input ~ .checkmark {
      background-color: #ccc;
   }
   & .checkmark:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;
   }
`
const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ .checkmark {
     background-color: green;
  }
`

const StyledSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`
const THEME_OPTIONS = ['Dark All', 'Light All', 'Base Antique', 'Base Eco']

export default function ThemeComponent ({setTheme}) {
    const handleThemeSelection = e => {
        console.log('e.target.value: ',e.target.value)
        setTheme(e.target.value)
    }
    return (
        <StyledDiv>
            {
                THEME_OPTIONS.map( (theme, index) => (
                    <StyledLabel key={theme}>{theme}
                        <StyledInput
                            type="radio"
                            name="radio"
                            value={index}
                            onClick={handleThemeSelection}
                            >
                        </StyledInput>
                            <StyledSpan className="checkmark">
                            </StyledSpan>
                    </StyledLabel>
                ))
            }
        </StyledDiv>
    )
}
