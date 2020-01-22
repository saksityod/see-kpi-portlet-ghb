var username = "";
var password = "";
var count_Circle_Data = 0;
var GlobalData = [];

// get SO circle Data (SO)
var getDataFn = (smart) => {
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/so_data",
		type:"get",
		async : false,
		datatype : "json",
		data :{
			"smart":smart
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			GlobalData = data['data'];
			$('#SO-circles').html('');
			clearData();
			$.each(data['data'],function(items,itemsEntry){
				addCircleSOData(itemsEntry.color_code);
			});
			
		}
	});
	
	GlobalData.map(item=>{
		$('#circle-'+item.so_id).click(function(){
    	$('#SmartGoalDashboardDetail').show();
    	getDataSOFn(item['so_id']);
		});
	});
	
}

//get Data to crate graph (SO)
var getDataSOFn = (so_id) => {
	let dataCircleGraph;
	let dataHistogramGraph;
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/graph_circle/"+so_id,
		type:"get",
		async : false,
		datatype : "json",
		data :{
			"so_or_project":1 // 1 is SO
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			dataCircleGraph = data['data'];	
		}
	});
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/graph_histogram/"+so_id,
		type:"get",
		async : false,
		datatype : "json",
		data :{
			"so_or_project":1 // 1 is SO
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			dataHistogramGraph = data['data'];	
		}
	});
	
	let html =``;
	dataCircleGraph.map(item=>{
		html +=	`
			<div class='span12 row-fluid' >
				<div class="span4"  style="padding-left: 10px;">
					<div id = "graph-1-${item['id']}-${item['kpi_id']}" ></div>
					<center>
						<button id="view-project-${item['id']}-${item['kpi_id']}" style="width:100%">View Project</button>
					</center>
				</div>
				<div id = "graph-2-${item['id']}-${item['kpi_id']}" class="span8"></div>
			</div>
		`;
	});
	$('#ChartList').html(html);
	
	dataCircleGraph.map(item=>{
		createChartGaugeWithTarget(`graph-1-${item['id']}-${item['kpi_id']}`,`SO`,item);
		//click view project
		$(`#view-project-${item['id']}-${item['kpi_id']}`).click(function(){
			$('#titlePanel').html("Project");
			$('#SO-circles').html('');
			$('#SmartGoalDashboardList').hide();
			getDataProjectFn(item['kpi_id']);
		});
	});
	
	dataHistogramGraph.map(item=>{
		createChartHistogram(`graph-2-${item['id']}-${item['kpi_id']}`,`SO`,item);
	});
}

// get Data to crate graph (Project)
var getDataProjectFn = (so_kpi_id) => {
	let dataCircleGraph;
	let dataHistogramGraph;
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/graph_circle/"+so_kpi_id,
		type:"get",
		async : false,
		datatype : "json",
		data :{
			"so_or_project":2 // 2 is Project
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			dataCircleGraph = data['data'];	
		}
	});
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/graph_histogram/"+so_kpi_id,
		type:"get",
		async : false,
		datatype : "json",
		data :{
			"so_or_project":2 // 2 is Project
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			dataHistogramGraph = data['data'];	
		}
	});
	
	let html =``;
	dataCircleGraph.map(item=>{
		html +=	`
			<div class='span12 row-fluid' >
				<div class="span4"  style="padding-left: 10px;">
					<div id = "graph-1-${item['id']}-${item['kpi_id']}" ></div>
					<center>
						<button id="view-actionplan-${item['id']}-${item['kpi_id']}" style="width:100%">View Action Plan</button>
					</center>
				</div>
				<div id = "graph-2-${item['id']}-${item['kpi_id']}" class="span8"></div>
			</div>
		`;
	});
	$('#ChartList').html(html);
	
	dataCircleGraph.map(item=>{
		createChartGaugeWithTarget(`graph-1-${item['id']}-${item['kpi_id']}`,`Project`,item);
		//click view project
		$(`#view-project-${item['id']}-${item['kpi_id']}`).click(function(){
			$('#titlePanel').html("Project");
			$('#SO-circles').html('');
			$('#SmartGoalDashboardList').hide();
			getDataProjectFn(item);
		});
	});
	
	dataHistogramGraph.map(item=>{
		createChartHistogram(`graph-2-${item['id']}-${item['kpi_id']}`,`Project`,item);
	});
}

var createChartHistogram = function(renderAt,SOorProject,dataSource){
	console.log(dataSource);
	FusionCharts.ready(function() {
		  var salesAnlysisChart = new FusionCharts({
		    type: 'mscombi2d',
		    renderAt: renderAt,
		    width: '100%',
		    height: '300',
		    dataFormat: 'json',
		    dataSource: {
		      "chart": {
		    	"caption": dataSource['kpi_name'],
		    	"subcaption": `Total : ${dataSource['total']}`,
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
		      "categories": dataSource['category'],
		      "dataset": [{
		          "seriesName": "Actual",
		          "showValues": "0",
		          "data": dataSource['dataSource_actual']
		        },
		        {
		          "seriesName": "Forecast",
		          "renderAs": "line",
		          "data": dataSource['dataSource_forecast']
		        },
		      ]
		    }
		  }).render();
		});
}

var createChartGaugeWithTarget = function(renderAt,SOorProject,dataSource){
	console.log(dataSource);
	FusionCharts.ready(function() {
		  var revenueChart = new FusionCharts({
		    type: 'doughnut2d',
		    renderAt: renderAt,
		    width: '100%',
		    height: '280',
		    dataFormat: 'json',
		    dataSource: {
		      "chart": {
		    	"caption": dataSource['kpi_name'],
		    	"subcaption": "Smart KPI"+ dataSource['item_name']!=null?dataSource['item_name']:"",
		    	"captionAlignment":"left",
		        "numberPrefix": "$",
		        "bgColor": "#ffffff",
		        "startingAngle": "310",
		        "showLegend": "1",
		        "defaultCenterLabel": ""+ dataSource['percen_actual_target']+"%",
		        "showTooltip": "1",
		        "labelFontColor": "#ffffff",
		        "decimals": "0",
		        "theme": "fusion",
		        "enablesmartLabel": "0",
		        "slicingDistance": "0",
		        "enableRotation": "0",
		        "use3DLighting" : "0",
		        "palettecolors": "afd8f8,aff8cc"
		        
		      },
		      "data": dataSource['dataSource']
		    }
		  }).render();
		});

}

var addCircleSOData = function(color){
	html = `
		<div id="circle-${GlobalData[count_Circle_Data]['so_id']}" value="${count_Circle_Data}" class="span circle2" style="background-color:${color};color: white;margin-left:20px;margin-bottom: 2px;">
			<div style="height: 50%;display: flex;justify-content: center;position: relative;top: -33px;">SO</div>
			<div style="height: 50%;display: flex;justify-content: center;bottom: 85px;position: relative;">50%</div>
		</div>
		`;

	$('#SO-circles').append(html);
	count_Circle_Data++;
}

var getProjectCharts = () => {
	
}

var clearData = () => {
	count_Circle_Data = 0;
}

// set circle S M A R T
var setSMART = () => {
	let tdata;
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/smart_color",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			let html=``;
			tdata = data['data'];
			data['data'].map(item=>{
				html += `
						<div class="circle" id="smart-circle-${item['perspective_id']}" style="background-color:#${item['color_code']};color: white;margin:3px;padding: 3px;">${item['perspective_abbr']}</div>
					`;
			});
			$('#smart-circles').html(html);
		}
	});
	tdata.map(item=>{
		$(`#smart-circle-${item['perspective_id']}`).click(function(){
			getDataFn(item['perspective_abbr']);
		});
	});
}

//set Drop-down Year
var setDropdownYear = () => {
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/smart_goal_dashboard/dropdown_year",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			let html = ``;
			
			data['data'].map(item=>{
				html += `
						<option value="${item['year']}">${item['year']}</option>
				`;
			});
			$('#dropdownYear').html(html);
		}
	});
}

$(document).ready(function() {
	
	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			
			$("#AdvanceSearch").show();
			setDropdownYear();
			setSMART();
			
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
				getProjectCharts();
			});
			
		}
	};
});