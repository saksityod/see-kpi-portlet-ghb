//Global variable
var galbalDataCDSResult=[];
var golbalDataError=[];
var galbalDataTemp = [];
var galbalDataItemDesc = [];
var pageNumberDefault=1;
var is_edit_cds_value = 0;
var is_edit_forecast = 0;
var is_edit_forecast_bu = 0;
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
		$("#tableCdsResult thead tr").find("th:first").html(Liferay.Language.get('emp-name'));
		$("#tableCdsResult thead tr").find("th:first").next().html(Liferay.Language.get('cds-name'));
	}else if(app_type == "1"){
		$("#tableCdsResult thead tr").find("th:first").html(Liferay.Language.get('org-name'));
		$("#tableCdsResult thead tr").find("th:first").next().html(Liferay.Language.get('cds-name'));
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
			showCdsResultFn();
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

var suneditorFn = function() {
	var htmlOption = '<textarea id="datail_name" style="width: 95%" class=""></textarea>';
	$("#sunEdit").html(htmlOption);
	editorDetailName = SUNEDITOR.create('datail_name', {
	   height: 250,
	   width: '100%',

	   // new CSS font properties
	   addFont: null,

	   // width/heigh of the video
	   videoX: 560,
	   videoY: 315,

	   // image file input
	   imageFileInput: undefined,

	   // image url input
	   imageUrlInput: undefined,

	   // image size
	   imageSize: '350px',
	   
	   // image upload url
	   imageUploadUrl: null,

	   // font list
	   fontList: null,
	   
	   // font size list
	   fontSizeList: null,

	   // show/hide toolbar icons
	   buttonList: [
	     ['undo', 'redo'],
	     ['fontSize', 'formats'],
	     ['bold', 'underline', 'italic', 'strike', 'removeFormat'],
	     ['fontColor', 'hiliteColor'],
	     ['indent', 'outdent'],
	     ['align', 'line', 'list'],
	     //['align', 'line', 'list', 'table'],
	   //['link', 'image', 'video'],
	     ['fullScreen'] //,['fullScreen', 'codeView'],
	    // ['preview', 'print']
	   ]
	   
	 });
}

var clearFormDetailFn = function(){
	suneditorFn();
    $("#detail_id_edit").val("");
    $("#detail_action").val("add");
    //$("#detail_cds_result_id").val("");
}

var deleteDetailFn = function (id) {
    $.ajax({
        url: restfulURL+restfulPathCdsResult+"/detail/"+id,
        type: "DELETE",
        dataType: "json",
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
            if (data['status'] == 200) {

                callFlashSlide(Liferay.Language.get('delete-successfully'));
                getDetailFn($("#detail_cds_result_id").val());
                $("#confrimModal").modal('hide');

            } else if (data['status'] == "400") {

                callFlashSlide("<font color=''>" + data['data'] + "</font>", "error");
            }
        }
    });
}

var findOneDetailFn = function (id) {
    $.ajax({
        url: restfulURL+restfulPathCdsResult+"/detail/"+ $("#detail_cds_result_id").val() +"/"+id,
        type: "get",
        dataType: "json",
        async: false,
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function (data) {
        	editorDetailName.setContent(data['reason_cds_result_name']);
            $("#detail_action").val("edit");
            $("#detail_id_edit").val(id);
        }
    });
}

var listDetailFn = function (data) {
    var htmlTR = "";

    var i = 0 ;
    $.each(data, function (index, indexEntry) {
    	i = i+1;
        htmlTR += "<tr>";
        htmlTR += "<td>" + i + "</td>";
        htmlTR += "<td>" + indexEntry['reason_cds_result_name'] + "</td>";
        htmlTR += "<td style='text-align:center;'>";
        htmlTR += "<span>&nbsp;&nbsp;</span><i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button style='width:100%;' class='btn btn-warning btn-small btn-gear detailEdit' id='edit_detail-"+indexEntry['reason_cds_result_id']+"' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('edit')+"&lt;/button&gt;  &lt;button id='delete_detail-"+indexEntry['reason_cds_result_id']+"' style='width:100%;' class='btn btn-danger btn-small btn-gear detailDel'&gt;"+Liferay.Language.get('delete')+"&lt;/button&gt; \" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
//        htmlTR += " <i data-trigger=\"focus\" tabindex=\"" + index + "\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear detailEdit' style=\"width:100%;\" id=edit_detail-" + indexEntry['reason_cds_result_id'] + " data-target='' data-toggle='modal'&gt;" + Liferay.Language.get('detail') + "&lt;/button&gt;&nbsp;&lt;button id=del_detail-" + indexEntry['reason_cds_result_id'] + " class='btn btn-danger btn-small btn-gear detailDel'&gt;" + Liferay.Language.get('delete') + "&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
        htmlTR += "</td>";
        htmlTR += "</tr>";
    });

    $("#listDataDetail").html(htmlTR);

    /*bindding popover start*/
    if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
		$(".popover-edit-del").popover({
			delay : {
				hide : 100
			},
			container: '.ibox-content'
		});
		
	} else {
		$(".popover-edit-del").popover({
			delay : {
				hide : 100
			}
		});
	}
    
    $("#listDataDetail").off("click", ".popover-edit-del");
    $("#listDataDetail").on("click", ".popover-edit-del", function () {
        //Delete Start
        $(".detailDel").on("click", function () {
            $("#informConfirm").empty();
            var id = this.id.split("-");
            id = id[1];
            $("#confrimModal").modal({
                "backdrop": setModalPopup[0],
                "keyboard": setModalPopup[1]
            }).css({ "margin-top": "0px" });
            $(document).off("click", "#btnConfirmOK");
            $(document).on("click", "#btnConfirmOK", function () {
                deleteDetailFn(id);
            });
        });

        //findOne Start
        $(".detailEdit").on("click", function () {

//            $(window).scrollTop(0);
            var edit = this.id.split("-");
            var id = edit[1];
            findOneDetailFn(id);
//            $(".modal-body").scrollTop(0);
        });
    });
    /*bindding popover end*/
}

var getDetailFn = function(id){
	$.ajax({
		url:restfulURL+restfulPathCdsResult+"/detail/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			listDetailFn(data);
		}
	});
}

var getItemDescFn = function(id){
    $.ajax({
        url:restfulURL+restfulPathCdsResult+"/item_desc/"+id,
        type:"get",
        dataType:"json",
        async:false,
        data:{
            "current_appraisal_year" : $("#param_year").val(),
            "month_id" : $("#param_month").val(),
            "appraisal_type_id" : $("#param_app_type").val()
        },
        headers:{Authorization:"Bearer "+tokenID.token},
        success:function(data){
            listPeriodItemDescFn(data);
        }
    });
}

var listPeriodItemDescFn = function(data){

    galbalDataItemDesc = data;
    var htmlPeriod = "";

    //htmlPeriod += "<select id=\"period_item\" data-toggle=\"tooltip\" title=\""+Liferay.Language.get('period')+"\" name=\"period\">";
    $.each(data,function(index,indexEntry){
        $("#htmlInfoItemName").html(indexEntry["item_name"]);
        htmlPeriod += "<option  value="+indexEntry["period_id"]+">"+indexEntry["appraisal_period_desc"]+"</option>";         
    });
    //htmlPeriod += "</select>";
    $("#period_item").html(htmlPeriod);

    changeItemDescFn($("#period_item").val());
}

var changeItemDescFn = function(period_id){
	$("#htmlInfoItem").empty();
    $.each(galbalDataItemDesc,function(index,indexEntry){
        if (period_id == indexEntry["period_id"]){
            $("#htmlInfoItem").html(indexEntry["item_desc"]);
        }           
    });
}

var listCdsResultFn = function (data) {
	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		
		is_edit_forecast = indexEntry["is_edit_forecast"];
		is_edit_forecast_bu = indexEntry["is_edit_forecast_bu"];
		is_edit_cds_value = indexEntry["is_edit_cds_value"];
	
		htmlTable += "<tr class='rowSearch'>";
		if($("#param_app_type").val() == "2"){
			htmlTable += "<td class='Search'>"+ indexEntry["emp_name"]+ "</td>";
			
			htmlTable += "<input type='hidden' class='cdsResult' id='emp_id' value='"+indexEntry['emp_id']+"'>";
		}else if($("#param_app_type").val() == "1"){
			htmlTable += "<td class='Search'>"+ indexEntry["org_name"]+ "</td>";
			
			htmlTable += "<input type='hidden' class='cdsResult' id='org_id' value='"+indexEntry['org_id']+"'>";
		};
		
		if (indexEntry["is_item_desc"] == "1"){
			htmlTable += "<td class='Search'>"+ indexEntry["cds_name"]+ " <span style='position: relative;' data-info='' class='icon-info-circled iconItemDesc' id='item_desc-"+indexEntry['cds_result_id']+"'></span> </td> ";
		}else {
			htmlTable += "<td class='Search'>"+ indexEntry["cds_name"]+ "</td>";
		}
		
		htmlTable += "<td class='Search'>"+ indexEntry["uom_name"]+ "</td>";
		htmlTable += "<td class='Search'>"+ indexEntry["year"]+ "</td>";
		htmlTable += "<td class='Search'>"+ galbalDataTemp["month_name"] + "</td>";
		
		htmlTable += "<input type='hidden' class='cdsResult' id='year' value='"+indexEntry['year']+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='appraisal_month_no' value='"+indexEntry['month']+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='appraisal_month_name' value='"+galbalDataTemp["month_name"]+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='position_id' value='"+indexEntry['position_id']+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='level_id' value='"+indexEntry['level_id']+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='cds_id' value='"+indexEntry['cds_id']+"'>";
		htmlTable += "<input type='hidden' class='cdsResult' id='appraisal_type_id' value='"+$("#param_app_type").val()+"'>";
		
		// field forecast
		htmlTable += "<td class='columnSearch_forecast' style='text-align: right;padding-right: 10px;'>"+ notNullTextFn(addCommas(parseFloat(indexEntry["forecast"]).toFixed(2))) + "</td>";
		if (indexEntry['cds_result_id'] == null){
			htmlTable += "<td class='columnEdit_forecast'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='forecast-"+indexEntry['cds_id']+"' name='forecast-new' value='"+indexEntry['forecast']+"'></td>";
		}else {
			htmlTable += "<td class='columnEdit_forecast'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='forecast-"+indexEntry['cds_result_id']+"' name='forecast-"+indexEntry['cds_result_id']+"' value='"+indexEntry['forecast']+"'></td>";
		}
		
		// field forecast_bu
		htmlTable += "<td class='columnSearch_forecast_bu' style='text-align: right;padding-right: 10px;'>"+ notNullTextFn(addCommas(parseFloat(indexEntry["forecast_bu"]).toFixed(2))) + "</td>";
		if (indexEntry['cds_result_id'] == null){
			htmlTable += "<td class='columnEdit_forecast_bu'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='forecast_bu-"+indexEntry['cds_id']+"' name='forecast_bu-new' value='"+indexEntry['forecast_bu']+"'></td>";
		}else {
			htmlTable += "<td class='columnEdit_forecast_bu'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='forecast_bu-"+indexEntry['cds_result_id']+"' name='forecast_bu-"+indexEntry['cds_result_id']+"' value='"+indexEntry['forecast_bu']+"'></td>";
		}
		
		// field cds_value
		htmlTable += "<td class='columnSearch_cds_value' style='text-align: right;padding-right: 10px;'>"+ notNullTextFn(addCommas(parseFloat(indexEntry["cds_value"]).toFixed(2)))+ "</td>";
		if (indexEntry['cds_result_id'] == null){
			htmlTable += "<td class='columnEdit_cds_value'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='cds_value-"+indexEntry['cds_id']+"' name='cds_value-new' value='"+indexEntry['cds_value']+"'></td>";
		}else {
			htmlTable += "<td class='columnEdit_cds_value'><input style=\"height:20px; width:80px; float:right; text-align:right;\" type='text' class='cdsResult' id='cds_value-"+indexEntry['cds_result_id']+"' name='cds_value-"+indexEntry['cds_result_id']+"' value='"+indexEntry['cds_value']+"'></td>";
		}
		
		if (indexEntry['cds_result_id'] == null){
			htmlTable += "<td></td>";
		}else {
			htmlTable += "<td style=\"vertical-align: middle; text-align:center; display: flex; justify-content: space-between;\">";
			htmlTable += "<span>&nbsp;&nbsp;</span><i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button style='width:100%;' class='btn btn-success btn-small btn-gear detail' id='detail-"+indexEntry['cds_result_id']+"' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('detail')+"&lt;/button&gt;  &lt;button id='delete-"+indexEntry['cds_result_id']+"' style='width:100%;' class='btn btn-danger btn-small btn-gear delete'&gt;"+Liferay.Language.get('delete')+"&lt;/button&gt; \" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-detail-del\" data-original-title=\"\" title=\"\"></i>";		
			htmlTable += "</td>";	
		}
		//htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;text-align: center;\"><i id='"+ indexEntry["cds_result_id"]+ "' class='fa fa-trash del' style='color: red; cursor: pointer;'></i></td>";
		htmlTable += "</tr>";////parseFloat().toLocaleString()
	});
	$("#listCdsResult").html(htmlTable);
	
	// start item desc
	$(".iconItemDesc").off("click");
	$(".iconItemDesc").on("click",function() {
		
		$("#htmlInfoItemName").empty();
        $("#htmlInfoItem").empty();
        
	    $("#infoItemModal").modal({
	        "backdrop": setModalPopup[0],
	        "keyboard": setModalPopup[1]
	    });

	    var id=this.id.split("-");
	    id=id[1];

	    getItemDescFn(id);
	    
	});
	
	$("#period_item").click(function() {
	    changeItemDescFn($("#period_item").val());
	});
	// end item desc
	
	/*bindding popover start*/
	//Using
	if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
		$(".popover-detail-del").popover({
			delay : {
				hide : 100
			},
			container: '.ibox-content'
		});
		
	} else {
		$(".popover-detail-del").popover({
			delay : {
				hide : 100
			}
		});
	}
	
	$(".CdsResult").off("click",".popover-detail-del");
	$(".CdsResult").on("click",".popover-detail-del",function(){
		
		if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
			$(".popover").css({"text-align":"center","width": "120px","margin-left":"78px"});
		} else {
			$(".popover").css({"text-align":"center"});
		}

		//detail Start
		$(".detail").on("click",function() {
			
			var id=this.id.split("-");
			id=id[1];	
			
			$("#detailModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			clearFormDetailFn();
			$("#detail").off("fucus");
			$("#detail_cds_result_id").val(id);
			getDetailFn(id);
		});

		// delete start
		$(".delete").on("click",function(){
			var id=this.id.split("-");
			id=id[1];
			 
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
					     
					     $("#btnEditCdsResult").prop("disabled",false);
					     $("#btnSaveCdsResult").prop("disabled",true);
					     $("#btnCancelCdsResult").prop("disabled",true);
							
					     showCdsResultFn();
//							
//					     $(".columnEdit_forecast").hide();
//					     $(".columnEdit_forecast_bu").hide();
//					     $(".columnEdit_cds_value").hide();
					 }
				});
				
			});
			
		});	
		
		
		
	});
	/*bindding popover end*/

}

var clearCdsResultFn = function (data){
	$.each($(".rowSearch").get(),function(index,indexEntry){

		var forecast_id = $(this).find("td.columnEdit_forecast").find("input").attr("id");
		var forecast_bu_id = $(this).find("td.columnEdit_forecast_bu").find("input").attr("id");
		var cds_value_id = $(this).find("td.columnEdit_cds_value").find("input").attr("id");

		$("#"+forecast_id).val("");
		$("#"+forecast_bu_id).val("");
		$("#"+cds_value_id).val("");

	});
}

function isEmptyObject(obj){
	var i = 0;
	$.each(obj, function( index, value ) {
		if (jQuery.isEmptyObject(obj[index])){
			i = i+1;
		}
	});
	return ((i > 0) ? true : false );
}

var showCdsResultFn = function () {
	$(".columnSearch_forecast").show();
	$(".columnSearch_forecast_bu").show();
	$(".columnSearch_cds_value").show();
	
	$(".columnEdit_forecast").hide();
	$(".columnEdit_forecast_bu").hide();
	$(".columnEdit_cds_value").hide();
}

var inputEditCdsResultFn = function () {	
	// manage tag forecast
	if (is_edit_forecast == '1'){
		$(".columnEdit_forecast").show();
		$(".columnSearch_forecast").hide();
	}else if (is_edit_forecast == '0'){
		$(".columnEdit_forecast").hide();
		$(".columnSearch_forecast").show();
	}

	// manage tag forecast_bu  
	if (is_edit_forecast_bu == '1'){
		$(".columnEdit_forecast_bu").show();
		$(".columnSearch_forecast_bu").hide();
	}else if (is_edit_forecast_bu == '0'){
		$(".columnEdit_forecast_bu").hide();
		$(".columnSearch_forecast_bu").show();
	}

	// manage tag cds_value
	if (is_edit_cds_value == '1'){
		$(".columnEdit_cds_value").show();
		$(".columnSearch_cds_value").hide();
	}else if (is_edit_cds_value == '0'){
		$(".columnEdit_cds_value").hide();
		$(".columnSearch_cds_value").show();
	}
}

var editCdsResultFn = function () {
	var cdsResult = ""; 
	cdsResult += "[";

	$.each($(".rowSearch").get(),function(index,indexEntry){

		if(index==0){
			cdsResult += "{";
		}else{
			cdsResult += ",{";
		}

		//----------- [start] get id tag input -----------

		var forecast_id = $(this).find("td.columnEdit_forecast").find("input").attr("id");
		var forecast_bu_id = $(this).find("td.columnEdit_forecast_bu").find("input").attr("id");
		var cds_value_id = $(this).find("td.columnEdit_cds_value").find("input").attr("id");

		//----------- [end] get id tag input -----------

		if (($("#"+forecast_id).val() != "") || ($("#"+forecast_bu_id).val() != "") || ($("#"+cds_value_id).val() != "")) {
			var id = $(this).find("td.columnEdit_forecast").find("input").attr("name");
			id = id.split("-");
			id = id[1];

			if (id == "new"){
				cdsResult += "\"cds_result_id\":\"\",";
				cdsResult += "\"create_cds_result\":\"1\",";
			} else if (id != "new"){
				cdsResult += "\"cds_result_id\":\""+id+"\",";
				cdsResult += "\"create_cds_result\":\"0\",";
			}

			//----------- [start] get value show data -----------
			var appraisal_type_id = $(this).find("input#appraisal_type_id").attr("value");

			cdsResult += "\"year\":\""+$(this).find("input#year").attr("value")+"\",";
			cdsResult += "\"appraisal_month_no\":\""+$(this).find("input#appraisal_month_no").attr("value")+"\",";
			cdsResult += "\"appraisal_month_name\":\""+$(this).find("input#appraisal_month_name").attr("value")+"\",";
			cdsResult += "\"position_id\":\""+$(this).find("input#position_id").attr("value")+"\",";
			cdsResult += "\"level_id\":\""+$(this).find("input#level_id").attr("value")+"\",";
			cdsResult += "\"appraisal_type_id\":\""+$(this).find("input#appraisal_type_id").attr("value")+"\",";
			cdsResult += "\"cds_id\":\""+$(this).find("input#cds_id").attr("value")+"\",";

			if (appraisal_type_id == "1"){
				cdsResult += "\"org_id\":\""+$(this).find("input#org_id").attr("value")+"\",";
			}else if (appraisal_type_id == "2"){
				cdsResult += "\"emp_id\":\""+$(this).find("input#emp_id").attr("value")+"\",";
			}
			//----------- [end] get value show data -----------

			//----------- [start] get value tag input -----------
			cdsResult += "\"forecast\":\""+$("#"+forecast_id).val()+"\",";
			cdsResult += "\"forecast_bu\":\""+$("#"+forecast_bu_id).val()+"\",";
			cdsResult += "\"cds_value\":\""+$("#"+cds_value_id).val()+"\"";
			//----------- [end] get value tag input -----------
			
		} // end if emtry

		cdsResult += "}";
	});
	
	cdsResult += "]";
	var cdsResultObject=eval("("+cdsResult+")");
	
	// ---- [start] check value tag input empty ----
	var empty = isEmptyObject(cdsResultObject);
	
	if (empty){
		$("#confrimCdsResultModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		});
	
		$(document).off("click","#btnConfirmCdsResultOK");
		$(document).on("click","#btnConfirmCdsResultCancel",function(){
			$("#confrimCdsResultModal").modal('hide');
			inputEditCdsResultFn();
			
			$("#btnEditCdsResult").prop("disabled",true);
			$("#btnSaveCdsResult").prop("disabled",false);
			$("#btnCancelCdsResult").prop("disabled",false);
		});
		$(document).on("click","#btnConfirmCdsResultOK",function(){	
			editDataCdsResult(cdsResultObject);			
		});
	}
	else {
		editDataCdsResult(cdsResultObject);
	}
	// ---- [end] check value tag input empty ----
}

var editDataCdsResult = function(data){
	var CdsResultObject = data;
	
	$.ajax({
		url:restfulURL+restfulPathCdsResult,
		type:"patch",
		dataType:"json",
		async:false,
		data:{
			"cdsResult":CdsResultObject
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){	
				$("#confrimCdsResultModal").modal('hide');
				clearCdsResultFn();
			    getDataFn($("#pageNumber").val(),$("#rpp").val());	
			    callFlashSlide(Liferay.Language.get('update-successfully')+".");
			}else if(data['status']==400){
				$("#confrimCdsResultModal").modal('hide');
				callFlashSlide(data['data'],"error");
			}
			showCdsResultFn();
		}
	});
}

var editDetailFn = function (){
	if ($("#detail_action").val() == "add") {
        $.ajax({
            url: restfulURL+restfulPathCdsResult+ "/detail/" + $("#detail_cds_result_id").val(),
            type: "POST",
            dataType: "json",
            /*เวลา copy จาก description อื่นมาจะเพิ่มอักขระพิเศษไว้ข้างหน้า พอไปออกรายงานแล้วแสดงเป็นกล่อง สี่เหลี่ยม แต่ที่หน้า description ไม่แสดง จึงจำเป็นต้อง replace อักขระพิเศษ ออก */
            data: { "detail_name": rmSlashDesc(editorDetailName.getContent()) },
            headers: { Authorization: "Bearer " + tokenID.token },
            success: function (data, status) {
                if (data['status'] == 200) {
                    getDetailFn($("#detail_cds_result_id").val());
                    clearFormDetailFn();
                } else if (data['status'] == "400") {
                    callFlashSlide("<font color=''>" + data['data'] + "</font>", "error");
                }
            }
        });

    } else {

        $.ajax({
            url: restfulURL+restfulPathCdsResult+ "/detail/" + $("#detail_cds_result_id").val(),
            type: "PATCH",
            dataType: "json",
            /*เวลา copy จาก description อื่นมาจะเพิ่มอักขระพิเศษไว้ข้างหน้า พอไปออกรายงานแล้วแสดงเป็นกล่อง สี่เหลี่ยม แต่ที่หน้า description ไม่แสดง จึงจำเป็นต้อง replace อักขระพิเศษ ออก */
            data: { "detail_name": rmSlashDesc(editorDetailName.getContent()), "reason_cds_result_id": $("#detail_id_edit").val() },
            headers: { Authorization: "Bearer " + tokenID.token },
            success: function (data, status) {
                if (data['status'] == 200) {
                	getDetailFn($("#detail_cds_result_id").val());
                    clearFormDetailFn();
                } else if (data['status'] == "400") {
                    callFlashSlide("<font color=''>" + data['data'] + "</font>", "error");
                }
            }
        });
    }
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
				$("#emp_name_id").val()
		);
		
		$("#btnEditCdsResult").prop("disabled",false);
		$("#btnSaveCdsResult").prop("disabled",true);
		$("#btnCancelCdsResult").prop("disabled",true);
		
		showCdsResultFn();	
		
		$("#cds_result_list_content").show();
		getBrowserWidth();
		return false;
	});
	
	// start button CDSResult
	$("#btnEditCdsResult").click(function() {
		$("#btnEditCdsResult").prop("disabled",true);
		$("#btnSaveCdsResult").prop("disabled",false);
		$("#btnCancelCdsResult").prop("disabled",false);
		
		inputEditCdsResultFn();
	});
	
	$("#btnCancelCdsResult").click(function() {
		$("#btnEditCdsResult").prop("disabled",false);
		$("#btnSaveCdsResult").prop("disabled",true);
		$("#btnCancelCdsResult").prop("disabled",true);
		
		showCdsResultFn();
	});
	
	$("#btnSaveCdsResult").click(function() {
		
		editCdsResultFn();
		
		$("#btnEditCdsResult").prop("disabled",false);
		$("#btnSaveCdsResult").prop("disabled",true);
		$("#btnCancelCdsResult").prop("disabled",true);

	});
	// end button CDSResult
	
	// start button DetailCDSResult
	$(document).on("click", "#btnSaveDetail", function () {
		editDetailFn();
	});
	
	$(document).on("click", "#btnCancelDetail", function () {
		clearFormDetailFn();
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
				showCdsResultFn();
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

