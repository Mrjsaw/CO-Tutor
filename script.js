'use strict';
 

/*
  var d = new Date();
  var t = d.toLocaleTimeString();
  var s = t.substring(0, t.length-3);
  let x = $('#val1').html();

*/
function getValue(str, i) {
  let m = str.substring(1, str.length-1);
  let valArr = m.split(',');
  return valArr[i];
}
function realTimeGraph() {

     $(document).ready(function () { 
    let jsonURL = "http://blynk-cloud.com/APIKEY/get/v7";
    $.getJSON(jsonURL, function(data){
      console.log(data[0])
    })
    function getData() {
     
      
    }

    Plotly.plot('chart',[{
      y:[getData()],  
      type:'line',
    }]);
    ;

    var cnt = 0;
    setInterval(function(){
        Plotly.extendTraces('chart',{ y:[[getData()]]}, [0]);
        cnt++;
        if(cnt > 500) {
            Plotly.relayout('chart',{
                xaxis: {
                    range: [cnt-500,cnt]
                }
            });
        } 
    },3000000);
})

/*
function pageSetup(arr, i) {
    let name = "Klas" + i;
    $('#klasnaam').text("klas " + i)  
    $('#val1').text(arr[name][0])
    $('#val2').text(arr[name][1])
    $('#val3').text(arr[name][2])
    $('#val4').text(arr[name][3])

}

function fillDrop(arr) {
    let i = 1;
    for (let x in arr)
    {
        let options = $('<option/>');
        let s = "Klas " + i;
        options.attr({ 'value': s }).text(s);
        $('#lijst').append(options);
        i++;
    }
}



function getData() {
  let sensor1 = "http://blynk-cloud.com/APIKEY/get/v7"
  $.getJSON(sensor1, function (data) {
    let cd = data[0];
    console.log(cd[2]);
    //fillDrop(data);
    //pageSetup(data, 1);
    $(document).on('change','#lijst',function () {
        let val = $(this).find(":checked").val();
        let r = val.substring(4);
        //pageSetup(data,parseInt(r, 10));      
    });
      setTimeout(getData, 300000);
  });
}
*/