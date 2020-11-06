import React from "react"
// texts for header and info about application in sidebar

function HeaderText(){

    return (
      <div>
        <h1> Weather Map</h1>
        <p> This is a weather map that uses data from </p>
        <p> Finnish Meteorological Institute API</p>
        <p> from the past seven days.</p>
        <p> Click on the markers to see temperature </p>
        <p> and precipitation graphs.</p>
        <p>Drag the slider to choose </p>
        <p> the time for the temperature heatmap.</p>
      </div>
    )
}

export default HeaderText;
