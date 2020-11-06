import React from "react"
// slider functionality for changing the time of heatmap datapoints

function HeatSlider(props){

  const slider = (
      <div>
        <h3>Time of Heatmap:</h3>
        <p>(In increments of 6 hours)</p>

        <input
          type="range"
          id= "timeSlider"
          min="0"
          max="140"
          step="6"
          value= {props.dateIndex}
          name= "timeSlider"
          onChange={(event)=> {props.setDateIndex(event.target.value)}}
        />
        <label htmlFor="timeSlider">Today</label>
        <p>^</p>
        <p>7 days ago</p>
      </div>
    )

    return slider
}

export default HeatSlider;
