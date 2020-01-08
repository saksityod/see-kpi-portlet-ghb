 var restfulPathDashboard="/"+serviceName+"/public/cds_result";
 var galbalDashboard=[];
 var galbalDataTemp = [];
 var changeAutocomplete=true;
 galbalDataTemp['galbalOrg'] = [];
    
//# Generate Drop Down List
 var generateDropDownList = function(url,type,request,initValue){
 	var html="";
 	
 	if(initValue!=undefined){
 		html+="<option value='All'>"+initValue+"</option>";
	}

 	$.ajax ({
 		url:url,
 		type:type ,
 		dataType:"json" ,
 		data:request,
 		headers:{Authorization:"Bearer "+tokenID.token},
 		async:false,
 		success:function(data){
 			try {
 			    if(Object.keys(data[0])[0] != undefined && Object.keys(data[0])[0] == "item_id"){
 			    	galbalDataTemp["item_id"] = [];
 			    	$.each(data,function(index,indexEntry){
 			    		galbalDataTemp["item_id"].push(indexEntry[Object.keys(indexEntry)[0]]);
 		 			});	
 			    }
 			}
 			catch(err) {
 			    console.log(err.message);
 			}

 			
 			$.each(data,function(index,indexEntry){
 				html+="<option value="+indexEntry[Object.keys(indexEntry)[0]]+">"+indexEntry[Object.keys(indexEntry)[1] == undefined  ?  Object.keys(indexEntry)[0]:Object.keys(indexEntry)[1]]+"</option>";	
 			});	

 		}
 	});	
 	return html;
 };
 
 
 var getDataFn = function() {
		var year= $("#param_year").val();
		var period= $("#param_period").val();
		var app_type= $("#param_app_type").val();
		var emp= $("#param_emp").val();
		var app_lv= $("#param_app_lv").val();
		var org= $("#param_org_id").val();
		var kpi= $("#param_kpi_id").val();
		var kpi_type= $("#param_kpi_type_id").val();
		var output_type = $("#output_type").val();
		var path_jasper = "report-appraisal/";
		
		//-- set report lacale name --//
		var currentLocale = $("#user_locale").val();
		var template_name = "Appraisal_Report";
		if (typeof currentLocale !== 'undefined') {
		  template_name = template_name + "_" + currentLocale;
		  path_jasper = path_jasper + currentLocale + "/";
		}

		
		var parameter = {
				//logo: "/imake/Jasper/jasper_service_api/resources/jasper/1588_6832_th.jpg",
				logo: "C:\\jasper\\1588_6832_th.jpg",
				param_year: year,
				param_period: period,
				param_level: app_lv,
				param_org: org,
				param_kpi_type: kpi_type,
				param_kpi: kpi
		}
		var data = JSON.stringify(parameter);
		//var url_report_jasper = "http://35.198.242.63:9000/generate?template_name=Appraisal_Report&template_format="+output_type+"&used_connection=1&inline=1&data="+data;
		var url_report_jasper = restfulURL+"/"+serviceName+"/public/generate?path_jasper="+path_jasper+"&template_name="+template_name+"&template_format="+output_type+"&used_connection=1&inline=1&data="+data;
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			window.open(url_report_jasper,"_blank");
		 } else {
			 $('#iFrame_report').attr('src',url_report_jasper);
		 }

};

 
 var searchAdvanceFn = function (year,period,app_lv,org,kpi,output_type,kpi_type) {
	//embed parameter start
		
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' 	name='param_year' 		value='"+year+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_period' 	name='param_period' 	value='"+period+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' 	value='1'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' 	name='param_app_lv' 	value='"+app_lv+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' 	name='param_org_id' 	value='"+org+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_kpi_id' 	name='param_kpi_id' 	value='"+kpi+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_output_type' name='param_output_type' 	value='"+output_type+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_kpi_type_id' 	name='param_kpi_type_id' 	value='"+kpi_type+"'>";
		$(".paramEmbed").remove();
		$("form#linkParam").append(htmlParam);
		//embed parameter end
		getDataFn();
};
 


var listDashBoardFn = function(data){
	 $("#txtTopic").html(data['header']);
	 generateChartBubbleFn(data);
	 var html = "";
	 var kpi_id = galbalDataTemp["item_id"];
	 if (kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) - 1] != undefined ) {
		 html += "			<span id='previous' class='arrow' data-previous='"
				+ kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) - 1]
				+ "'></span>";
	 }
	 if (kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) + 1] != undefined) {
		 html += "			<span id='next' class='arrow' data-next='"
				+ kpi_id[kpi_id.indexOf(parseInt($("#param_kpi_id").val())) + 1]
				+ "'></span>";
	 }
	 $("#pager").html(html);
	 $("#next , #previous").off("click");
	 $("#next , #previous").on("click",function() {
		 $("#param_kpi_id").val($(this).attr("data-"+this.id));
		 $("#kpi").val($(this).attr("data-"+this.id));
		 getDataFn();
		 return false;
	});
 };

 $(document).ready(function(){
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 	$(".advance-search input").val("");
	 	
	 	
		
		
		$("#btnSearchAdvance").click(function(){
			searchAdvanceFn(
					$("#year").val(),
					$("#period").val(),
					$("#apprasiaLevel").val(),
					$("#organization").val(),
					$("#kpi").val(),
					$("#output_type").val(),
					$("#kpi_type").val()
					);
			$("#listSubordinate").show();
			return false;
		});
		
		$("#output_type").change(function(){
			$('#iFrame_report').attr('src','');
		});
		
		//Generate DropDown List
		$("#year").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/year_list","GET"));
		$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
		$("#app_type").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list","GET"));
		$("#apprasiaLevel").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/appraisal/al_list","GET"));
//		$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/org","GET",{"level_id":$("#apprasiaLevel").val()}));
		$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/list_organization","GET",{"level_id":$("#apprasiaLevel").val()}));
		$("#kpi_type").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/report/list_kpi_type","GET",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":1,"period":$("#period").val()},Liferay.Language.get('all-kpi-type'))));
		$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":1,"kpi_type_id":$("#kpi_type").val(),"period":$("#period").val(), "year": $("#year").val()},Liferay.Language.get('all-kpi'))));

		//#Change Param Function
		$("#year").change(function(){
			$("#period").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/period_list","POST",{"appraisal_year":$("#year").val()}));
			$("#period").change();
		});
		
		$("#period").change(function() {
			$("#apprasiaLevel").change();
		});
		
		$("#apprasiaLevel").change(function() {
			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/list_organization","GET",{"level_id":$("#apprasiaLevel").val()}));
//			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/org","GET",{"level_id":$("#apprasiaLevel").val()}));
//			$("#organization").html(generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/org_list","POST",{"appraisal_level":$("#apprasiaLevel").val()}));
			$("#organization").change();
		});
		
		$("#organization").change(function() {
			//console.log("organization change");
			$("#kpi_type").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/report/list_kpi_type","GET",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":1,"period":$("#period").val()},Liferay.Language.get('all-kpi-type'))));
			$("#kpi_type").change();
		});
		
		$("#kpi_type").change(function(){
			$("#kpi").html((generateDropDownList(restfulURL+"/"+serviceName+"/public/dashboard/kpi_list","POST",{"appraisal_level":$("#apprasiaLevel").val(),"org_id":$("#organization").val(),"emp_id":$("#emp_name_id").val(),"appraisal_type_id":1,"kpi_type_id":$("#kpi_type").val(),"period":$("#period").val()},Liferay.Language.get('all-kpi'))));
		});
		
		$(".app_url_hidden").show();

		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		 $(".lfr-hudcrumbs").removeClass("lfr-hudcrumbs");
		 
		 
	 }
 });