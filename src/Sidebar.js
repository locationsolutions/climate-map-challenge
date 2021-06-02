import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import getSelectedLocatoinId from './locationGetter';
import {XYPlot, LineSeries, XAxis, YAxis} from 'react-vis';
import HorizontalGridLines from 'react-vis-styles'




function Sidebar({selectedLocationId, observationLocations}) {

    
    
    const id = getSelectedLocatoinId(selectedLocationId);
    
    const loc = observationLocations.find(loc => loc.info.id === id);

    
    
    useEffect(() => {

        if(loc){
            const a = document.getElementById(id)
            a.scrollIntoView()
            

            
                
        }
        
        
    },[id])





    
    
    

    /*Clickable box for containing a single location info */
    const LocationBox = (props) => {

        const [open, setOpen] = useState(false)
        
        const click = () => {
            setOpen(open ? false : true)
            
        }


        /*begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,*/

        const mont_dict = { "January":1, "February":2, "March":3, "April":4, "May":5, "Jun":6,
                    "July":7, "August":8, "September":9, "October":10, "November":11, "December":12}
        
        const day_dict = {"Mon":'Ma', 'Tue':'Ti', 'Wed':'Ke', 'Thu':'To', 'Fri':'Pe', 'Sat':'La', 'Sun':'Su'}
        
                    var data = [
          ];
        
 
  

        
        for(var i=0; i<props.l.data.t.timeValuePairs.length; i++){

            
            data.push({x:i , y: props.l.data.t.timeValuePairs[i].value})

        }

        const But = (props) => {
            
            if(open){
                return(
                    <div>
                        <p  id={props.l.info.id} onClick={() => setOpen(open ? false : true)} className={props.className} key={props.l.info.name}>{props.l.info.name}
                        
                            <abbr className='DropDownMenu'>{"Alue: " + props.l.info.region}</abbr>
                            <abbr className='DropDownMenu'> {"Koordinaatit: \n" + props.l.info.position}</abbr>

                        </p>
                            <h3>Lämpötilaennuste - 7 päivää</h3>
                            <XYPlot height={200} width = {250}>
                                <HorizontalGridLines/>
                                <XAxis tickValues={[1,30,60,90,120]} tickFormat={function tickFormat(d){
                                    
                                    var date = new Date(props.l.data.t.timeValuePairs[d].time)
                                    date = date.toString().split(' ')
                                    
                                    return day_dict[date[0]] + ' ' + date[2] + ':' + mont_dict[date[1]]
                                    }}  style={{ 
                                    text: {stroke: 'none', fontWeight: 100, fontSize:7}}}/>
                                <YAxis title={'°​C'} style={{ 
                                    text: {stroke: 'none', fontWeight: 100, fontSize:8}}}/>
                                <LineSeries data={data} color='red'
                                    opacity="0.8"
                                    sizeRange={[5, 15]}

                                    style={{ fill: 'none', color:'red' }}
                                />
                                
                        
                            </XYPlot>

                           




                    </div>
                    
                )
            }
            else{
                const [hover, setHover] = useState(null)
                return(
                    <p id={props.l.info.id} onClick={() => click()} onMouseOver={() => setHover(1)} onMouseLeave={() => setHover(null)} className={props.className} key={props.l.info.name}>{props.l.info.name} {hover ? '+' : ''} </p>
                )
            }
            
        }
        const StyledBut = styled(But)`
        owerflow:auto;
        display: inline-block;
        color: palevioletred;
        font-size: 1.1em;
        margin: 1em;
        padding: 0.25em 1em;
        border: 2px solid palevioletred;
        border-radius: 3px;
        display: block;
        animation-duration: 1s;
        animation-iteration-count: 1;

        `;
        


        return <StyledBut l = {props.l}/>

        
    }

    
    const MapNames = (props) => {
        if(observationLocations){
            return( 
            <div className={props.className}>
                {observationLocations.map(l => 
                    <LocationBox key={l.info.id}  l = {l}
                    
                    /> 
                    
                    )
                } 
            </div>
            )
        }
        else{
            return <div></div>
        }
    }
        
    
        
     
    /*const StyledBar = styled(MapNames)`
      width:300px
      height:100vh
      background-color:green
      color:black
      text-align:left
      overflow: auto;
      font-family:Arial

    `;*/
    const window_height = window.innerHeight
    const StyledBox = styled(MapNames)`
        display: inline-block;
        color: palevioletred;
        font-size: 1em;

        display: block;
        width 250px;
        height:${window_height-20}px;
        
        
    `;
    

    return (<div className='SideBar'>

        
                <StyledBox/>
                
            </div>)



   
        
    
}


  
/*A little change. Now the export statement is not called with "styled", but the SideBar component is returning styled html.
Also, the styled component has to pass "className" to a possible child (divs inside Mapname), otherwise the "styled" function doesn't work! */
export default Sidebar
  