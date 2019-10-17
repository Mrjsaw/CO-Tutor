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

let tempAvg = [];
let vochtAvg = [];
let drukAvg = [];

$(document).ready(function () { 
    let jsonURL = "https://jsonplaceholder.typicode.com/todos/1"; //put an api link here to get json
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
  
      let cnt = 0;
      setInterval(function(){
        $.getJSON(jsonURL, async function(data){
        console.log('loading new JSON data!')
        //Rng has been used for demo purposes:
        let rngT = Math.floor(Math.random() * 20) + 10;
        let rngV = Math.floor(Math.random() * 100) + 1;
        let rngD = Math.floor(Math.random() * 10000) + 1000;
        console.log(rngT);
        console.log(rngD);
        console.log(rngV);
         // Plotly.extendTraces('chart1',{ y:[[getValue(data[0],0)]]}, [0]);
          //Plotly.extendTraces('chart2',{ y:[[getValue(data[0],1)]]}, [0]);
          //Plotly.extendTraces('chart3',{ y:[[getValue(data[0],2)/1000]]}, [0]);
          Plotly.extendTraces('chart1',{ y:[[rngT]]}, [0]);
          Plotly.extendTraces('chart2',{ y:[[rngV]]}, [0]);
          Plotly.extendTraces('chart3',{ y:[[rngD]]}, [0]);
          cnt++;
          //tempAvg.push(parseInt(getValue(data[0],0),10)); 
          tempAvg.push(rngT);
          vochtAvg.push(rngV);
          drukAvg.push(rngD);
          //vochtAvg.push(parseInt(getValue(data[0],1),10));
          //drukAvg.push(parseInt(getValue(data[0],2),10));
          $('#val1').text(average((tempAvg)));
          $('#val2').text(average(vochtAvg));
          $('#val3').text(average(drukAvg));  

          //var d = new Date();
          //var t = d.toLocaleTimeString();
          //var s = t.substring(0, t.length-3);
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
