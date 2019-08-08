//Global variable
var galbalDataCDSResult=[];
var golbalDataError=[];
var galbalDataTemp = [];
var pageNumberDefault=1;
var restfulPathCdsResult="/"+serviceName+"/public/cds_result";
var restfulPathAppraisal="/"+serviceName+"/public/appraisal";

var restfulPathDropDownYear=restfulPathCdsResult+"/year_list";
var restfulPathDropDownMonth=restfulPathCdsResult+"/month_list";
var restfulPathDropDownAppraisalLevel=restfulPathAppraisal+"/al_list";
var restfulPathDropDownAppraisalType="/"+serviceName+"/public/appraisal_assignment/appraisal_type_list";
var restfulPathPositionAutocomplete=restfulPathCdsResult+"/auto_position_name";
var restfulPathEmployeeAutocomplete=restfulPathCdsResult+"/auto_emp_name";



//------------------- GetData FN Start ---------------------
var getDataFn = function(page,rpp){
	var year= $("#param_year").val();
	var month= $("#param_month").val();
	var app_lv= $("#param_app_lv").val();
	var app_type= $("#param_app_type").val();
	var org= $("#param_org_id").val();
	var position= $("#param_position_id").val();
	var emp_name= $("#param_emp_id").val();
	
	if(app_type == "2"){
		$("#tableCdsResult thead tr").find("th:first").html(Liferay.Language.get('emp-code'));
		$("#tableCdsResult thead tr").find("th:first").next().html(Liferay.Language.get('emp-name'));
	}else if(app_type == "1"){
		$("#tableCdsResult thead tr").find("th:first").html(Liferay.Language.get('org-code'));
		$("#tableCdsResult thead tr").find("th:first").next().html(Liferay.Language.get('org-name'));
	}
	$.ajax({
		url : restfulURL+restfulPathCdsResult,
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"current_appraisal_year":year,
			"month_id":month,
			"appraisal_type_id":app_type,
			"level_id":app_lv,
			"org_id":org,
			"position_id":position,
			"emp_id":emp_name		
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,// w8 data 
		success : function(data) {
			
			listCdsResultFn(data['data']);
			galbalDataCDSResult=data;
			paginationSetUpFn(galbalDataCDSResult['current_page'],galbalDataCDSResult['last_page'],galbalDataCDSResult['last_page']);
		}
	});
	
	
};

//------------------- GetData FN END ---------------------

//-------------------  Appraisal Data FN ---------------------
var searchAdvanceFn = function (year,month,app_lv,app_type,org_id,position,emp_name) {
//embed parameter start
	
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_year' name='param_year' value='"+year+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_month' name='param_month' value='"+month+"'>";
	galbalDataTemp["month_name"] = $("#month>option:selected").text();
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_lv' name='param_app_lv' value='"+app_lv+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_app_type' name='param_app_type' value='"+app_type+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_org_id' name='param_org_id' value='"+org_id+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_position_id' name='param_position_id' value='"+position+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='param_emp_id' name='param_emp_id' value='"+emp_name+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	getDataFn(pageNumberDefault,$("#rpp").val());
}

var listCdsResultFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
	
		htmlTable += "<tr class='rowSearch'>";
		if($("#param_app_type").val() == "2"){
			htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_code"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["emp_name"]+ "</td>";
		}else if($("#param_app_type").val() == "1"){
			htmlTable += "<td class='columnSearch'>"+ indexEntry["org_code"]+ "</td>";
			htmlTable += "<td class='columnSearch'>"+ indexEntry["org_name"]+ "</td>";
		};
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cds_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["uom_name"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["year"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ galbalDataTemp["month_name"] + "</td>";
		htmlTable += "<td class='columnSearch' style='text-align: right;padding-right: 10px;'>"+ notNullTextFn(addCommas(parseFloat(indexEntry["cds_value"]).toFixed(2)))+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;text-align: center;\"><i id='"+ indexEntry["cds_result_id"]+ "' class='fa fa-trash del' style='color: red; cursor: pointer;'></i></td>";
		htmlTable += "</tr>";////parseFloat().toLocaleString()
	});
	$("#listCdsResult").html(htmlTable);
	$(".del").on("click",function(){
		var id = this.id;
		 
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
		
			$.ajax({
				 url:restfulURL+restfulPathCdsResult+"/"+id,
				 type : "delete",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				success:function(data){    
			    	 
				     if(data['status']==200){
				    	 
				       callFlashSlide(Liferay.Language.get('delete-successfully')+".");
				       getDataFn($("#pageNumber").val(),$("#rpp").val()); 
				       $("#confrimModal").modal('hide');
				       
				     }else if (data['status'] == "400"){
				    	 $("#confrimModal").modal('hide');
				    	 callFlashSlide(data['data'],"error");
				    	}
				 }
			});
			
		});
		
	});	
}

//-------------------  Appraisal Data FN END ---------------------
var addCommas =  function(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//-------------------  Drop Down List Month FN Strart ---------------------

var dropDownListMonth = function(){
	var html="";
	
	
	html+="<select id=\"month\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('month')+"\" name=\"month\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownMonth ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["month_id"]+">"+indexEntry["month_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Month FN END ---------------------

//-------------------  Drop Down List Year FN Strart ---------------------

var dropDownListYear = function(){
	var html="";
	
	
	html+="<select id=\"year\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('year')+"\" name=\"year\">";
	//html+="<option  selected value=''>All</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownYear ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["current_appraisal_year"]+">"+indexEntry["current_appraisal_year"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
//-------------------  Drop Down List Year FN END ---------------------

//-------------------  Drop Down List Appraisal Level FN Strart ---------------------

var dropDownListAppraisalLevel = function(){
	var html="";
	
	
	html+="<select data-placement='top' id=\"app_lv\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('level')+"\" name=\"app_lv\">";
	html+="<option  selected value=''>"+Liferay.Language.get('all-level')+"</option>";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalLevel,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["level_id"]+">"+indexEntry["appraisal_level_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};

//-------------------  Drop Down List Appraisal Type FN Strart ---------------------

var dropDownListAppraisalType = function(){
	var html="";
	
	
	html+="<select data-placement='top' id=\"app_type\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('entity-type')+"\" name=\"app_type\">";
	$.ajax ({
		url:restfulURL+restfulPathDropDownAppraisalType,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["appraisal_type_id"]+">"+indexEntry["appraisal_type_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
var dropDownListOrganization = function(){
	var html="";
	
	
	html+="<select data-placement='top' id=\"org_id\" class=\"input span12 m-b-n\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('organization')+"\" name=\"org_id\">";
	html+="<option  selected value=''>"+Liferay.Language.get('all-organization')+"</option>";
	$.ajax ({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get" ,
		dataType:"json" ,
		data:{"level_id":$("#app_lv").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				//galbalDqsRoleObj=data;
			$.each(data,function(index,indexEntry){

					html+="<option  value="+indexEntry["org_id"]+">"+indexEntry["org_name"]+"</option>";	
		
			});	

		}
	});	
	html+="</select>";
	return html;
};
var listErrorFn =function(data){
	var errorData="";
	
	golbalDataError=data;
	
	var validateFile="";

	$.each(data,function(index,indexEntry){
		if(indexEntry[Object.keys(indexEntry)[0]]!= undefined || indexEntry[Object.keys(indexEntry)[0]]==null){
			if(indexEntry[Object.keys(indexEntry)[0]]== null){//The employee code field is null
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+" : null <i class='fa fa-level-down'></i><br>";
			}else{
				validateFile+="<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> "+Object.keys(indexEntry)[0]+": "+data[index][Object.keys(indexEntry)[0]]+" <i class='fa fa-level-down'></i><br>";}
			}
	     $.each(indexEntry['errors'],function(index2,indexEntry2){
	    	 validateFile+="<font color='red'>&emsp;*</font> "+indexEntry2+"<br>";
	     });
	 
	});
	  
	callFlashSlideInModal(validateFile,"#information","error");
	
}
//-------------------  Drop Down List Appraisal Level FN END ---------------------
var getBrowserWidth = function(){
    var wSearchAdvance = $('.cSearchAdvance').width()-4;
    var wTarget = $('#drop_down_list_appraisal_type').width();
    var wCalTarget = $('#drop_down_list_appraisal_type').width()*4+20;
    var height = $('#drop_down_list_appraisal_type').height()+0.25;
    
		if(window.innerWidth < 980){
			$("#txtEmpInput").css({"width":""});
			$("#txtEmpInput").css({"height":""});
		} else if(window.innerWidth < 1366){
			// Small Device
    
			$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
			$("#txtEmpInput").css({"height":height});
		} else {
			// Large Device
			$("#txtEmpInput").width(wSearchAdvance-wCalTarget+wTarget);
			$("#txtEmpInput").css({"height":height});
	
		}
		//console.log(wSearchAdvance-wCalTarget+wTarget);
};

$(document).ready(function() {
	
	var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==false){
	 		return false;
	 	}
	 }
	$("#org_name").val("");
	$("#position").val("");
	$("#emp_name").val("");
	$("#org_id").val("");
	$("#position_id").val("");
	$("#emp_name_id").val("");
	
	$(".sr-only").hide();
	$("#drop_down_list_year").html(dropDownListYear());
	$("#drop_down_list_month").html(dropDownListMonth());
	$("#drop_down_list_appraisal_level").html(dropDownListAppraisalLevel());
	$("#drop_down_list_organization").html(dropDownListOrganization());
	$("#drop_down_list_appraisal_type").html(dropDownListAppraisalType());
	$("#countPaginationTop").val( $("#countPaginationTop option:first-child").val());
	$("#countPaginationBottom").val( $("#countPaginationBottom option:first-child").val());
	
	$("#app_lv").change(function(){
		$("#drop_down_list_organization").html(dropDownListOrganization());
	});
	$(".app_url_hidden").show();
	getBrowserWidth();
	$("#btnSearchAdvance").click(function(){

	
		searchAdvanceFn(
				$("#year").val(),
				$("#month").val(),
				$("#app_lv").val(),
				$("#app_type").val(),
				$("#org_id").val(),
				$("#position_id").val(),
				$("#emp_name_id").val());
		$("#cds_result_list_content").show();
		getBrowserWidth();
		return false;
	});
	
	
	//Autocomplete Search Position Start
	$("#position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathPositionAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "position_name":request.term
				 },
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.position_name,
                                value: item.position_name,
                                position_id : item.position_id
                                
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#position").val(ui.item.value);
            $("#position_id").val(ui.item.position_id);
            galbalDataTemp['position_name'] = ui.item.label;
            galbalDataTemp['position_id']=ui.item.position_id;
            return false;
        },change: function(e, ui) {  

 
			if ($("#position").val() == galbalDataTemp['position_name']) {
				$("#position_id").val(galbalDataTemp['position_id']);
			}  else if (ui.item != null){
				$("#position_id").val(ui.item.position_id);
			}else {
				$("#position_id").val("");
			}
         }
    });
	

   
	//Autocomplete Search Position End
	

  //Auto Complete Employee Name end
	
	$("#emp_name").autocomplete({
		
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+restfulPathEmployeeAutocomplete,
				 type:"post",
				 dataType:"json",
				 data:{
					 "emp_name":request.term},
				//async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					  
						response($.map(data, function (item) {
                            return {
                                label: item.emp_name,
                                value: item.emp_name,
                                emp_id: item.emp_id
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
			$("#emp_name").val(ui.item.value);
            $("#emp_name_id").val(ui.item.emp_id);
            galbalDataTemp['emp_name'] = ui.item.value;
            galbalDataTemp['emp_id']=ui.item.emp_id;
            return false;
        },change: function(e, ui) {  
			if ($("#emp_name").val() == galbalDataTemp['emp_name']) {
				$("#emp_name_id").val(galbalDataTemp['emp_id']);
			} else if (ui.item != null){
				$("#emp_name_id").val(ui.item.emp_id);
			} else {
				$("#emp_name_id").val("");
				
			}
        	
         }
    });
    
  //Auto Complete Employee Name end
	
	$("#app_type").change(function(){
		if($("#app_type").val() == "2"){

			$("#position").removeAttr('disabled');
			$("#emp_name").removeAttr('disabled');
		}else if($("#app_type").val() == "1"){
			$("#position").attr("disabled", 'disabled');
			$("#emp_name").attr("disabled", 'disabled');
			$("#position").val("");
			$("#position_id").val("");
			$("#emp_name").val("");
			$("#emp_name_id").val("");
			
		}
	});
	$("#app_type").change();
	
	
	
	//#### Call Export User Function Start ####
	$("#exportToExcel").click(function(){
		var paramYear=$("#year").val();
		var paramMonth=$("#month").val();
		var paramAppLv=$("#app_lv").val();
		var paramAppType= $("#app_type").val();
		var paramQrg= $("#org_id").val();
		var paramPositionCode=$("#position_id").val();
		var paramEmpCode=$("#emp_name_id").val();

		
		var param="";
		param+="&current_appraisal_year="+paramYear;
		param+="&month_id="+paramMonth;
		param+="&level_id="+paramAppLv;
		param+="&appraisal_type_id="+paramAppType;
		param+="&org_id="+paramQrg;
		param+="&position_id="+paramPositionCode;
		param+="&emp_id="+paramEmpCode;
		//alert(restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").attr("action",restfulURL+restfulPathCdsResult+"/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
    //#### Call Export User Function End ####
	
	//FILE IMPORT MOBILE START
	$("#btn_import").click(function () {
		$('#file').val("");
		$(".btnModalClose").click();
		$(".dropify-clear").click();
		$("#btn_import").attr({
			"data-backdrop" : setModalPopup[0],
			"data-keyboard" : setModalPopup[1]
		});	
	});
	
	// Variable to store your files
	var files;
	// Add events
	$('#file').on('change', prepareUpload2);

	// Grab the files and set them to our variable
	function prepareUpload2(event)
	{
	  files = event.target.files;
	}
	$('form#fileImportCdsResult').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
		
		event.stopPropagation(); // Stop stuff happening
		event.preventDefault(); // Totally stop stuff happening

		// START A LOADING SPINNER HERE

		// Create a formdata object and add the files
		var data = new FormData();
		$.each(files, function(key, value)
		{
			data.append(key, value);
		});
		$("body").mLoading();
		$.ajax({
			url:restfulURL+restfulPathCdsResult,
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			success: function(data, textStatus, jqXHR)
			{
				
				
				if(data['status']==200 && data['errors'].length==0){
					
					callFlashSlide(Liferay.Language.get('import-cds-result-successfully'));
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
					$('#file').val("");
					$('#ModalImport').modal('hide');
					
				}else{
					listErrorFn(data['errors']);
					getDataFn($(".pagination .active").attr( "data-lp" ),$("#rpp").val());
					$("body").mLoading('hide');
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				callFlashSlide('Format Error : ' + textStatus);
				// STOP LOADING SPINNER
			}
		});
		return false;
	}
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	 
     // Basic
     $('.dropify').dropify();

     // Translated
      $('.dropify-fr').dropify({
         messages: {
         	 default: 'Glissez-d�posez un fichier ici ou cliquez',
             replace: 'Glissez-d�posez un fichier ou cliquez pour remplacer',
             remove:  'Supprimer',
             error:   'D�sol�, le fichier trop volumineux'
         }
     });
	// Used events
     var drEvent = $('#input-file-events').dropify();

     drEvent.on('dropify.beforeClear', function(event, element){
         return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
     });

     drEvent.on('dropify.afterClear', function(event, element){
         alert('File deleted');
     });

     drEvent.on('dropify.errors', function(event, element){
         console.log('Has Errors');
     });

     var drDestroy = $('#input-file-to-destroy').dropify();
     drDestroy = drDestroy.data('dropify');
     $('#toggleDropify').on('click', function(e){
         e.preventDefault();
         if (drDestroy.isDropified()) {
             drDestroy.destroy();
         } else {
             drDestroy.init();
         }
     });
 	
 	$(window).on('resize',function(){
 		getBrowserWidth();
 	});
 	
});

