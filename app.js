/*
This is a website displaying graphs using a basic backend that makes API requests to a Arduino that's hooked with sensors detecting certain
particles in the air.  
It was used for the Hackathon 'De Warmste Week' on 12 october 2019.

Website developed by: Imanuel Vancauteren
Team: All you need is the air that you breath

Current display is configured to show temperature, Water vapor & air pressure.

Json structure used:
[
  25.4,63.4,105.4
]

*/
'use strict';

console.log('loaded')

const tempAvg = [];
const vochtAvg = [];
const drukAvg = [];

$(document).ready(function () { 
    let jsonURL = "http://blynk-cloud.com/FILLinAPIKeyHere/get/v7"; //
    Plotly.plot('chart1',[{
        y:[],  
        type:'line',
      }]);
      ;
      Plotly.plot('chart2',[{
        y:[],  
        type:'line',
      }]);
      ;
      Plotly.plot('chart3',[{
        y:[],  
        type:'line',
      }]);
      ;
  
      var cnt = 0;
      setInterval(function(){
        $.getJSON(jsonURL, async function(data){
        console.log('loading new JSON data!')
        
          Plotly.extendTraces('chart1',{ y:[[getValue(data[0],0)]]}, [0]);
          Plotly.extendTraces('chart2',{ y:[[getValue(data[0],1)]]}, [0]);
          Plotly.extendTraces('chart3',{ y:[[getValue(data[0],2)/1000]]}, [0]);
          cnt++;
          tempAvg.push(parseInt(getValue(data[0],0),10));          
          vochtAvg.push(parseInt(getValue(data[0],1),10));
          drukAvg.push(parseInt(getValue(data[0],2),10));
          $('#val1').text(average((tempAvg)));
          $('#val2').text(average(vochtAvg));
          $('#val3').text(average(drukAvg));  

          var d = new Date();
          var t = d.toLocaleTimeString();
          var s = t.substring(0, t.length-3);
          if(cnt > 20) {
            Plotly.relayout('chart1',{
                xaxis: {
                    range: [cnt-20,cnt]
                }
            });
            Plotly.relayout('chart2',{
                xaxis: {
                    range: [cnt-20,cnt]
                }
            });
            Plotly.relayout('chart3',{
                xaxis: {
                    range: [cnt-20,cnt]
                }
            });
          } 
      })},1000);
    })


function getValue(str, i) {
    let m = str.substring(1, str.length-1);
    let valArr = m.split(',');
    return valArr[i];
}

function average(arr) {
      let ctr = 0;
      for(let x = 0; x < arr.length; x++) {
          ctr+=arr[x];
      }
      return (ctr/arr.length).toFixed(2);
}