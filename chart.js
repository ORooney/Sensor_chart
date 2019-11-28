var dps = [];   //dataPoints. 
var chart;
var startTime;

var SensorData;
var xAc;
var yAc;
var zAc;


$(document).on("pagecreate", "#chartPage", function () {
	
	//store start time in unixtime 
	startTime = Date.now();
	
	getData();


	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "Accelerometer Data"
      	},
      	axisX: {						
      		title: "Random Values"
      	},
      	axisY: {						
      		title: "Time (seconds)"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dps
      	}]
   	});
	
	  
});

//Getting acceleromtere data
function getData(){


	SensorData = navigator.accelerometer.watchAcceleration(dataSuccess, dataFailure, dataOptions);


}


//On Successful access to sensor data
function dataSuccess(data){
	//Setting vairables to phone data
	xAc = data.x;

	yAc = data.y;

	zAc = data.z;


	//add them to the data points to draw
	dps.push({x: xAc,y: yAc, z: zAc});
      	
	//don't let the chart get too big 
	//if there are more than 100 data points then start removing older data points
	  if (dps.length >  100 )
	  {
		  dps.shift();				
	  }

	//redraw the chart
	  chart.render();		


}


//On failure to access sensor data
function dataFailure(){



}


//Opitions for accessing data
function dataOptions(){





}


function updateChart(random) {
      	
      	//set new random y values
      	yVal = random;
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
      	
		//add them to the data points to draw
		dps.push({x: xVal,y: yVal});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }
