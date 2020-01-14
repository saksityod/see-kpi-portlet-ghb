var username = "";
var password = "";
var count_Circle_Data = 0;
var GlobalData = [];

var getDataFn = function(){
	GlobalData[0]=0;
	GlobalData[1]=1;
	addCircleSOData('ff0000');
	addCircleSOData('00ff00');
	
	GlobalData.map(item=>{
		$('#circle-'+item).click(function(){
    	console.log(item);
    	$('#SmartGoalDashboardDetail').show();
    	getDataSOFn(1);
		});
	});
	
}

var getDataSOFn = function(){
	html =	`
			<div class='span12 row-fluid' >
				<div class="span4"  style="padding-left: 10px;">
					<div id = "G1" ></div>
					<center>
						<button id="view-project-1" style="width:100%">View Project</button>
					</center>
				</div>
				<div id = "G2" class="span8"></div>
			</div>
		`;
	$('#ChartList').html(html);
	createChartHistogram(1,"SO","data");
	createChartGaugeWithTarget(1,"SO","data");
	
	//click view project
	$('#view-project-1').click(function(){
		$('#titlePanel').html("Project");
		$('#SO-circles').html('');
		$('#SmartGoalDashboardList').hide();
		getDataProjectFn();
	});
}

var getDataProjectFn = function(){
	html =	`
			<div class='span12 row-fluid' >
				<div class="span4"  style="padding-left: 10px;">
					<div id = "G1" ></div>
					<center>
						<button id="view-project-1" style="width:100%">View Project</button>
					</center>
				</div>
				<div id = "G2" class="span8"></div>
			</div>
		`;
	$('#ChartList').html(html);
	createChartHistogram(1,"Project","data");
	createChartGaugeWithTarget(1,"Project","data");
	
	//click view project
	$('#view-project-1').click(function(){
		$('#titlePanel').html("Project");
		$('#SO-circles').html('');
		$('#SmartGoalDashboardList').hide();
		getDataProjectFn();
	});
}

var createChartHistogram = function(renderAt,SOorProject,dataSource){
	console.log(SOorProject);
	FusionCharts.ready(function() {
		  var salesAnlysisChart = new FusionCharts({
		    type: 'mscombi2d',
		    renderAt: 'G2',
		    width: '100%',
		    height: '300',
		    dataFormat: 'json',
		    dataSource: {
		      "chart": {
		    	"caption": "SO1",
		    	"subcaption": "Total: 2000",
		    	"captionAlignment":"left",
		        "numberPrefix": "$",
		        "toolTipColor": "#ffffff",
		        "toolTipBorderThickness": "0",
		        "toolTipBgColor": "#000000",
		        "toolTipBgAlpha": "80",
		        "toolTipBorderRadius": "2",
		        "toolTipPadding": "5",
		        "theme": "fusion",
		        "showValues": "0",
		        "showBorder": "0",
				"bgColor": "#ffffff",
				"canvasBorderAlpha": "0",
				"plotBorderAlpha": "0",
				"placevaluesInside": "0",
				"usePlotGradientColor": "0",
		        "theme" : "fint",
		      },
		      "categories": [{
		        "category": [{
		            "label": "Jan"
		          },
		          {
		            "label": "Feb"
		          },
		          {
		            "label": "Mar"
		          },
		          {
		            "label": "Apr"
		          },
		          {
		            "label": "May"
		          },
		          {
		            "label": "Jun"
		          },
		          {
		            "label": "Jul"
		          },
		          {
		            "label": "Aug"
		          },
		          {
		            "label": "Sep"
		          },
		          {
		            "label": "Oct"
		          },
		          {
		            "label": "Nov"
		          },
		          {
		            "label": "Dec"
		          }
		        ]
		      }],
		      "dataset": [{
		          "seriesName": "Actual Revenue",
		          "showValues": "0",
		          "data": [{
		              "value": "16000"
		            },
		            {
		              "value": "20000"
		            },
		            {
		              "value": "18000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "15000"
		            },
		            {
		              "value": "21000"
		            },
		            {
		              "value": "16000"
		            },
		            {
		              "value": "20000"
		            },
		            {
		              "value": "17000"
		            },
		            {
		              "value": "25000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "23000"
		            }
		          ]
		        },
		        {
		          "seriesName": "Projected Revenue",
		          "renderAs": "line",
		          "data": [{
		              "value": "15000"
		            },
		            {
		              "value": "16000"
		            },
		            {
		              "value": "17000"
		            },
		            {
		              "value": "18000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "19000"
		            },
		            {
		              "value": "20000"
		            },
		            {
		              "value": "21000"
		            },
		            {
		              "value": "22000"
		            },
		            {
		              "value": "23000"
		            }
		          ]
		        },
	
		      ]
		    }
		  }).render();
		});
}

var createChartGaugeWithTarget = function(renderAt,SOorProject,dataSource){
	console.log(SOorProject);
	FusionCharts.ready(function() {
		  var revenueChart = new FusionCharts({
		    type: 'doughnut2d',
		    renderAt: 'G1',
		    width: '100%',
		    height: '280',
		    dataFormat: 'json',
		    dataSource: {
		      "chart": {
		    	"caption": "SO1",
		    	"subcaption": "Smart KPI: สินเชื่อ",
		    	"captionAlignment":"left",
		        "numberPrefix": "$",
		        "bgColor": "#ffffff",
		        "startingAngle": "310",
		        "showLegend": "1",
		        "defaultCenterLabel": "67%",
		        "showTooltip": "1",
		        "labelFontColor": "#ffffff",
		        "decimals": "0",
		        "theme": "fusion",
		        "enablesmartLabel": "0",
		        "slicingDistance": "0",
		        "enableRotation": "0",
		        "use3DLighting" : "0"
		        
		      },
		      "data": [{
		          "label": "Food",
		          "value": "50",
		        	"color": "#ffffff"
		        },
		        {
		          "label": "Apparels",
		          "value": "100",
		          "color": "#0000ff"
		        }
		      ]
		    }
		  }).render();
		});

}

var addCircleSOData = function(color){
	html = `
		<div id="circle-${count_Circle_Data}" value="${count_Circle_Data}" class="span circle2" style="background-color:#${color};color: white;margin-left:20px;margin-bottom: 2px;">
			<div style="height: 50%;display: flex;justify-content: center;position: relative;top: -33px;">SO</div>
			<div style="height: 50%;display: flex;justify-content: center;bottom: 85px;position: relative;">50%</div>
		</div>
		`;

	$('#SO-circles').append(html);
	count_Circle_Data++;
}

var getAllCharts = function(){
	
}

var clearData = function(){
	count_Circle_Data = 0;
}

$(document).ready(function() {
	
	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			
			$("#AdvanceSearch").show();
			
			$('#btnSearch').click(function(){
				$('#titlePanel').html("SO");
				$('#SmartGoalDashboardList').show();
				$('#SO-circles').html('');
				$('#SmartGoalDashboardDetail').hide();
				clearData();
				getDataFn();
			});
			
			$('#AllSoKPIGraph').click(function(){
				$('#SmartGoalDashboardList').hide();
				getAllCharts();
			});
			
		}
	};
});