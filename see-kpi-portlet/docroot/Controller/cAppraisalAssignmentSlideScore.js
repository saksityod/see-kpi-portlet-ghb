/*#########################  Main Function Data #######################*/
//var tokenID= eval("("+localStorage.getItem("tokenID")+")");
//Global variable
var globalData=[];
var empldoyees_code = [];
var empldoyees_id = [];
var item_id_array=[];
var org_id_to_assign;
var emp_result_id_action = [];
var stage_id_action = [];


//var is_hr = 0;
var clearFn = function(){
	$(':input')
	  .not(':button, :submit, :reset, :hidden')
	  .val('')
	  .removeAttr('checked')
	  .removeAttr('selected');
	  $(".checkWeigthOver").html("");
	  $(".grandTotalWeight").html("");
	  $("#information").html("");
}
var stripJsonToString= function(json){
    return JSON.stringify(json).replace(',', ', ').replace('[', '').replace(']', '');
}

var validationAssignmentFn = function(data){

	var errorData="";
	var count=0;
	errorData=stripJsonToString(data['data']);
	
	
	return errorData;
	
}


//Click à¹�à¸¥à¹‰à¸§ à¸�à¸±à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥
var removeEmbedParamCheckboxAppraisalItem = function(id){
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
}
var embedParamCheckboxAppraisalItem = function(id){
	
	//id-1-1-checkbox
	var id = id.split("-"); 
	var appraisal_id=id[1];
	var structure_id=id[2];
	var count = 0;
	$.each($(".embed_appraisal_id-"+structure_id).get(),function(index,indexEnry){
	//à¸–à¹‰à¸² id à¸—à¸µà¹ˆà¸§à¸™ == id à¸—à¸µà¹ˆà¸¡à¸µ	
		
		if($(indexEnry).val()==appraisal_id){
			count+=1;
		}
	});
	
	if(count>0){
		
		$("#embed_appraisal_id-"+appraisal_id+"-"+structure_id).remove();
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}else{
		
		$("body").append("<input type='hidden' class='embed_appraisal_id-"+structure_id+" embed_appraisal_id' id='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' name='embed_appraisal_id-"+appraisal_id+"-"+structure_id+"' value='"+appraisal_id+"'>");
	}
}
var setDataToTemplateFn = function(data,actionType){
	var stage = data['stage'];
	var head = data['head'][0]
	var data = data['data'];
	
	/*information start*/
	
	if($("#embed_appraisal_type_id").val()==2){
		$("#titlePanelInformation").html("Employee Information");
		
		$("#employee_code").html(head['emp_code']);
		$("#section").html(head['section_name']);
		$("#appraisal_type").html(head['appraisal_type_name']);
		$("#employee_name").html(head['emp_name']);
		$("#organizationLabel").html(head['org_name']);
		$("#period_label").html(head['appraisal_period_desc']);
		$("#start_working_date").html(head['working_start_date']);
		$("#chief_employee_code").html(head['chief_emp_code']);
		$("#position").html(head['position_name']);
		$("#chief_employee_name").html(head['chief_emp_name']);
		$("#start_working_date").html(head['working_start_date']);
		
		
		$("#empInformation").show();
		$("#orgInformation").hide();
	}else{
		$("#empInformation").hide();
		$("#orgInformation").show();
		$("#titlePanelInformation").html(Liferay.Language.get('organization-information'));
		
		$("#organizationCodeLabelOrg").html(head['org_code']);
		$("#organizationNameLabelOrg").html(head['org_name']);
		$("#parentOrganizationOrg").html(head['parent_org_name']);
		$("#periodOrg").html(head['appraisal_period_desc']);
	}
	
	//Stage History List Data..

	var htmlStage="";
	$.each(stage,function(index,indexEntry){
	
		htmlStage+="<tr >";
			htmlStage+="<td>"+indexEntry['created_by']+"</td>";
			htmlStage+="<td>"+indexEntry['created_dttm']+"</td>";
			htmlStage+="<td>"+indexEntry['from_action']+"</td>";
			htmlStage+="<td>"+indexEntry['to_action']+"</td>";
			htmlStage+="<td>"+indexEntry['remark']+"</td>";
		htmlStage+="</tr>";

	});
	$("#listDataStageHistory").html(htmlStage);
	$("#slideUpDownStageHistory").show();
	

	
	//Stage History List Data..
	
	dropDrowActionEditFn(head['stage_id']);
	
	
	
	//set premission button management start
	
	if(   head['status']=='Accepted' || actionType=='view'){

		$("#ModalAssignment").find('input[type="text"]').attr('disabled', 'disabled'); 
		$("#ModalAssignment").find('input[type="checkbox"]').attr('disabled', 'disabled'); 
	}else{
		
		//Check TEXT Disabled Start
		if($("#ModalAssignment").find('input[class="disabledInputText"]')){
		}else{
			$("#ModalAssignment").find('input[type="text"]').removeAttr('disabled'); 
		}
		//Check TEXT Disabled End

		$("#ModalAssignment").find('input[type="checkbox"]').removeAttr('disabled'); 
	
	}
	
	//set premission button management end		
	
	$(".cus_information_area").show();
	$(".embed_appraisal_id").remove();
	$.each(data,function(index,indexEntry){
		
		//console.log(indexEntry['item_id']);
		//mapping data start
		//form1
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox").prop("checked",true);
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target").val(addCommas(indexEntry['target_value']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id").val(indexEntry['item_result_id']);
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast").val(addCommas(indexEntry['forecast_value']));

		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0").val(addCommas(indexEntry['score0']));	
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1").val(addCommas(indexEntry['score1']));	
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2").val(addCommas(indexEntry['score2']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3").val(addCommas(indexEntry['score3']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4").val(addCommas(indexEntry['score4']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5").val(addCommas(indexEntry['score5']));

		
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight").val(addCommas(indexEntry['weight_percent']));
		
		//form2
		
		//form3
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-maxValue").val(addCommas(indexEntry['max_value']));
		$("#id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit").val(indexEntry['deduct_score_unit']);
		
		
		//embedParamAppraisal for get updated.
		
		embedParamCheckboxAppraisalItem("id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox");
		//mapping data end
		
		calculationGrandTotalDefaultFn();
		
	});
	
	
}

var findOneFn = function(id,actionType){
	
	//get structure
	getTemplateFn(id);
	
	
	//get data for structureี
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data['head'].length);
			
			if(data['head'].length>0){
				setDataToTemplateFn(data,actionType);
				$("#ModalAssignment").modal({
					"backdrop" : setModalPopup[0],
					"keyboard" : setModalPopup[1]
				});
				$("#action").val("edit");
				$("#id").val(id);
				$("#btnAddAnother").hide();
				
				if(data['head'][0]['edit_flag']==0){
					
					$("#btnSubmit").attr("disabled","disabled");	
					$("#btnAddAnother").attr("disabled","disabled");

				}
				
			}else{
				callFlashSlide(Liferay.Language.get('data-is-empty'));
				return false;
			}
			
		}
	});
	
	
}

//Get Data
var getDataFn = function(page,rpp) {
	

	
	var appraisal_level_id = $("#embed_appraisal_level_id").val();
	var appraisal_type_id= $("#embed_appraisal_type_id").val();
	var period_id= $("#embed_period_id").val();
	var position_id= $("#embed_position_id").val();
	var emp_id= $("#embed_emp_id").val();
	var embed_year_list =$("#embed_year_list").val();
	var embed_period_frequency =$("#embed_period_frequency").val();
	var embed_organization =$("#embed_organization").val().split("-");
	embed_organization=embed_organization[0];
	var status = $("#embed_status").val();
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,
//			"appraisal_year":"",
//			"frequency_id":"",
			"appraisal_level_id":appraisal_level_id,
			"appraisal_type_id":appraisal_type_id,
			"period_id":period_id,
			"position_id":position_id,
			"appraisal_year":embed_year_list,
			"frequency_id":embed_period_frequency,
			"org_id":embed_organization,
			"emp_id":emp_id,
			"status":status
			
		},
		success:function(data){
			
			//console.log(data);
			
			listDataFn(data);
			setThemeColorFn(tokenID.theme_color);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	})
};
//Delete
var deleteFn = function(id) {
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+id,
		type:"DELETE",
		dataType:"json",
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){ 
		if(data['status']==200){
			
			   callFlashSlide(Liferay.Language.get('delete-successfully'));
			   getDataFn($("#pageNumber").val(),$("#rpp").val());
			   $("#confrimModal").modal('hide');
			   
		}else if(data['status']=="400"){
			
			callFlashSlide(validationFn(data),"error");
			
		}
		}
});
};
//Embed Parameter 
var embedParam = function(id){
	
}

//List Data
var listDataFn = function(data) {



	htmlHTML="";
	$.each(data['group'],function(index,indexEntry){
		
		var statusAction;
		if(indexEntry['items'][0]['is_group_action']==0) {
			statusAction ="style=\"margin-bottom: 5px; display: none;\"";
		} else {
			statusAction ="style=\"margin-bottom: 5px;\"";
		}
	
	htmlHTML+="<div class=\"row-fluid\">";
	htmlHTML+="<div class=\"span12\">";
	htmlHTML+="<div class=\"ibox-title2\">";
	if(index!='p0'){
		if($("#appraisalStatus").val()=='All') {
			htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" </div> ";
		} else {
			htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" ";
			htmlHTML+="<button "+statusAction+" type=\"button\" class=\"btn btn-primary input-sm\" name=\"btnAction"+index+"\" id=\"btnAction"+index+"\"><i class=\"fa fa-sign-in\"></i>&nbsp;"+Liferay.Language.get('action')+"</button>";
			htmlHTML+="</div>";
		}
	} else {
		htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" </div> ";
	}
            
	htmlHTML+="</div>";
			
		htmlHTML+="<div class=\"ibox-content\">";
					
					
		htmlHTML+="<div class=\"table-responsive\" style='overflow:auto;'>";
		htmlHTML+="<table id=\"tableListAppraisalUser\" class=\"table table-striped\" style=\"max-width: none;\">";
           		
		htmlHTML+=" <thead>";
			htmlHTML+=" <tr>";
			if(index!='p0'){
				if($("#appraisalStatus").val()=='All') {
					htmlHTML+=" <th style=\"width:5%; text-align:center; \" class=\"object-center\"></th>";
				} else {
					htmlHTML+="<th style=\"width:5%; text-align:center; \" class=\"object-center\">";
					htmlHTML+="<input type=\"checkbox\" name=\"statusSelectAll"+index+"\" id=\"statusSelectAll"+index+"\" style=\"margin-top:-3px;\">";
					htmlHTML+="</th>";
				}
			}else{
				htmlHTML+="<th style=\"width:5%; text-align:center;\" class=\"object-center\">";
				htmlHTML+="<input type=\"checkbox\" name=\"unassignSelectAll\" id=\"unassignSelectAll\" style=\"margin-top:-3px;\">";
				htmlHTML+="</th>";
			}
			
			if($("#embed_appraisal_type_id").val()==2){
				
				htmlHTML+=" <th style=\"width:8%\">"+Liferay.Language.get('status')+"</th>";
				htmlHTML+=" <th style=\"width:10%\">"+Liferay.Language.get('emp-code')+"</th>";
				htmlHTML+=" <th style=\"width:10%\">"+Liferay.Language.get('emp-name')+"</th>";
				htmlHTML+=" <th style=\"width:15%\">"+Liferay.Language.get('organization')+"</th>";
				htmlHTML+=" <th style=\"width:15%\">"+Liferay.Language.get('position')+"</th>";
							
			}else if($("#embed_appraisal_type_id").val()==1){
				
				htmlHTML+=" <th style=\"width:8%\">"+Liferay.Language.get('status')+"</th>";
				htmlHTML+=" <th style=\"width:10%\">"+Liferay.Language.get('organization-code')+"</th>";
				htmlHTML+=" <th style=\"width:15%\">"+Liferay.Language.get('organization')+"</th>";

				
			}

			if(index!='p0'){
				htmlHTML+=" <th style=\"width:7%; text-align:center;\">"+Liferay.Language.get('manage')+"</th>";
			}else{
				htmlHTML+=" <th style=\"width:7%; text-align:center;\"></th>";
			}
	htmlHTML+=" </tr>";
		htmlHTML+=" </thead>";
			htmlHTML+=" <tbody>";
			$.each(indexEntry['items'],function(index2,itemEntry){	
				
		

				htmlHTML+="<tr>";
				if(index!='p0'){
					
					if($("#appraisalStatus").val()=='All') {
						htmlHTML+="	<td class='object-center'></td>";
					} else {
						if($("#embed_appraisal_type_id").val()==2){
							htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='action_emp"+index+"' id='id-"+itemEntry['emp_id']+"' type='checkbox' value="+itemEntry['emp_id']+"-"+itemEntry['emp_code']+" data-id='"+itemEntry['emp_result_id']+"-"+itemEntry['stage_id']+"'></td>";
						}else if($("#embed_appraisal_type_id").val()==1){
							htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='action_emp"+index+"' id='id-"+itemEntry['org_id']+"' type='checkbox' value="+itemEntry['org_id']+"-"+itemEntry['org_code']+" data-id='"+itemEntry['emp_result_id']+"-"+itemEntry['stage_id']+"'></td>";
						}
					}
						
				}else{
					
					if($("#embed_appraisal_type_id").val()==2){
						htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='asign_emp' id='id-"+itemEntry['emp_id']+"' type='checkbox' value="+itemEntry['emp_id']+"-"+itemEntry['emp_code']+"></td>";
					}else if($("#embed_appraisal_type_id").val()==1){
						htmlHTML+="	<td class='object-center' style='text-align:center;'><input class='asign_emp' id='id-"+itemEntry['org_id']+"' type='checkbox' value="+itemEntry['org_id']+"-"+itemEntry['org_code']+"></td>";
					}
				}
				
				
				if($("#embed_appraisal_type_id").val()==2){
					htmlHTML+="  <td id='status-"+itemEntry['emp_id']+"'>"+itemEntry['status']+"";
					htmlHTML+="  <input type='hidden' id='emp_result_id-"+itemEntry['emp_id']+"' name='emp_result_id-"+itemEntry['emp_id']+"' value='"+itemEntry['emp_result_id']+"'>";
					htmlHTML+="  <input type='hidden' id='is_coporate_kpi-"+itemEntry['emp_id']+"' name='is_coporate_kpi-"+itemEntry['emp_id']+"' value='"+itemEntry['is_coporate_kpi']+"'>";
					htmlHTML+="  </td>";
					htmlHTML+="  <td>"+itemEntry['emp_code']+"";
					htmlHTML+="  <input type='hidden' id='period_id-"+itemEntry['emp_id']+"' name='period_id-"+itemEntry['emp_id']+"' value='"+itemEntry['period_id']+"'>";
					htmlHTML+=" </td>";
					htmlHTML+="  <td>"+itemEntry['emp_name']+"</td>";
					htmlHTML+="  <td>"+itemEntry['org_name']+"</td>";
					htmlHTML+="	<td>"+itemEntry['position_name']+"</td>";
				}else{
					
					htmlHTML+="  <td id='status-"+itemEntry['emp_id']+"'>"+itemEntry['status']+"";
					htmlHTML+="  <input type='hidden' id='emp_result_id-"+itemEntry['emp_id']+"' name='emp_result_id-"+itemEntry['emp_id']+"' value='"+itemEntry['emp_result_id']+"'>";
					htmlHTML+="  <input type='hidden' id='is_coporate_kpi-"+itemEntry['emp_id']+"' name='is_coporate_kpi-"+itemEntry['emp_id']+"' value='"+itemEntry['is_coporate_kpi']+"'>";
					htmlHTML+="  </td>";
					htmlHTML+="  <td>"+itemEntry['org_code']+"";
					htmlHTML+="  <input type='hidden' id='period_id-"+itemEntry['emp_id']+"' name='period_id-"+itemEntry['emp_id']+"' value='"+itemEntry['period_id']+"'>";
					htmlHTML+=" </td>";
					
					htmlHTML+="  <td>"+itemEntry['org_name']+"</td>";
					
					
				}
				
				
				
				htmlHTML+="  <td style=\"text-align:center\">";
				
				if(index!='p0'){
					//itemEntry['status']
					if(is_hr==1 &&  itemEntry['status']=='Accepted'){
						//htmlHTML+="  <i title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;View&lt;/button&gt;   &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"' data-target=#addModalRule data-toggle='modal'&gt;Edit&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;Delete&lt;/button&gt;\"></i>";
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\"  data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-target=#addModalRule data-toggle='modal'&gt;"+Liferay.Language.get('view')+"\"></i>";
					}else if(is_hr==1 &&  itemEntry['status']!='Accepted'){
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-warning btn-small btn-gear edit' id='edit-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('edit')+"&lt;/button&gt;&nbsp;&lt;button id='del-"+itemEntry['emp_id']+"' class='btn btn-danger btn-small btn-gear del'&gt;"+Liferay.Language.get('delete')+"&lt;/button&gt;\"></i>";
						
						
					}else if(is_hr==0){
						htmlHTML+="  <i data-trigger=\"focus\" tabindex=\""+index2+"\" title=\"\" data-original-title=\"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\" &lt;button class='btn btn-info btn-small btn-gear view' id='view-"+itemEntry['emp_id']+"-"+itemEntry['org_id']+"' data-target=#addModalRule data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('view')+"\"></i>";
						
					}
				}
				
				htmlHTML+="  </td>";
				htmlHTML+="</tr>";
					
			
			});
			htmlHTML+=" </tbody>";
			htmlHTML+="  </table>";
			
			htmlHTML+=" </div>";
			htmlHTML+="</div>";
		htmlHTML+="</div>";
	htmlHTML+="</div>";
		
	});
	
	$("#listDatas").html(htmlHTML);
	
	
	$("#unassignSelectAll").click
	
	$('#unassignSelectAll').click(function() {
	   if($('#unassignSelectAll').prop('checked')){
		   $(".asign_emp").prop('checked',true);
	   }else{
		   $(".asign_emp").prop('checked',false);
	   }
	   
	});
	
	if($("#appraisalStatus").val()!='All' && $("#appraisalStatus").val()!='Unassigned') {
		$.each(data['group'],function(index,indexEntry){
			$("#statusSelectAll"+index).click
			$('#statusSelectAll'+index).click(function() {
			   if($('#statusSelectAll'+index).prop('checked')){
				   $(".action_emp"+index).prop('checked',true);
			   }else{
				   $(".action_emp"+index).prop('checked',false);
			   }
			   
			});
			
			$("#btnAction"+index).click(function(){
		//		empldoyees_code=[];
		//		empldoyees_id=[];
		//		default_stage_id=[];
		//		organization_code = [];
				emp_result_id_action = [];
				stage_id_action = [];
				$("#remark_footer_action").val("");
				$(".information").hide();
				$("#btnAddAnother").show();
					$.each($(".action_emp"+index).get(),function(index,indexEntry){
						if($(indexEntry).is(":checked")){
		//					var emp_id=$(indexEntry).val().split("-");
		//					var org_id=$(indexEntry).val().split("-/");
							var data_id=$(indexEntry).attr("data-id").split("-");
		//					empldoyees_id.push(emp_id[0]);
		//					empldoyees_code.push(emp_id[1]);
		//					org_id_to_assign = emp_id[2];
		//					position_id.push(emp_id[3]);
		//					organization_code.push(org_id[1]);
							emp_result_id_action.push(data_id[0]);
							stage_id_action.push(data_id[1]);
						}
					});
				if(emp_result_id_action.length==0){
					callFlashSlide(Liferay.Language.get('please-choose-employees-or-organization-for-action'));
					return false;
				}else{					
		
					$(".cus_information_area").hide();
					//Default start
					$("#btnSubmitAction").removeAttr("disabled");
					$("#btnAddAnother").removeAttr("disabled");
					//Default end
					
					dropDrowActionEditFn2(stage_id_action[0]);
					if($("#actionAction").val()==null){
						$("#btnSubmitAction").attr("disabled","disabled");
					} else {
						$("#btnSubmitAction").removeAttr("disabled");
					}
										
					$("#ModalAction").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					});
					
					//check assignment if reject  remark is require.
					$("#actionAction").off("change");
					$("#actionAction").on("change",function(){
						//alert("hello jquery");
						
					});
					
					$(window).scrollTop(0);
					setTimeout(function(){
						$(".modal-body").scrollTop(0);
						$(".fht-tbody").scrollTop(0);
					
					});
				}
				
			});
		
		});
	}
	
	$(".popover-edit-del").popover({
		delay : {
			hide : 100
		}
	});
	$("#listDatas").off("click",".popover-edit-del");
	$("#listDatas").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".del").on("click",function() {
			
			var id=this.id.split("-");
			id=id[1];
			
			var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
			
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				
				deleteFn(emp_result_id);
				
			});
			
		});
		//findOne Start
		$(".edit").on("click",function() {
			
			
			
			var edit=this.id.split("-");
			var id=edit[1];
			org_id_to_assign=[];
			org_id_to_assign.push(edit[2]);
			sessionStorage.setItem('is_coporate_kpi',$("#is_coporate_kpi-"+id).val());
			
			$(".information").hide();
			var status= $(this).parent().parent().parent().parent().children().eq(1).text();
			if(status.trim()=="Unassigned"){
				callFlashSlide(Liferay.Language.get('can-not-edit-because-unassigned-status')+".","error");
				$(this).parent().parent().parent().children().click();
			}else{
				//var emp_result_id = $("#emp_result_id-"+id).val();
				var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
				var period_id = $(this).parent().parent().parent().parent().children().eq(2).children().val();
				$("#period_id_edit").val(period_id);
				findOneFn(emp_result_id);
				$(this).parent().parent().parent().children().click();
				$(window).scrollTop(0);
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);

			}
		});
		$(".view").on("click",function() {

				var view=this.id.split("-");
				org_id_to_assign=[];
				org_id_to_assign.push(view[2]);
				var emp_result_id= $(this).parent().parent().parent().parent().children().eq(1).children().val();
				var period_id = $(this).parent().parent().parent().parent().children().eq(2).children().val();
				$("#period_id_edit").val(period_id);
				findOneFn(emp_result_id,"view");
				$(this).parent().parent().parent().children().click();
				$(window).scrollTop(0);
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);
			//}
		});
		
	});	
	
};

//Update Action start
var actionActionAssignmentFn = function() {
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/update_action",
		type:"PATCH",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"emp_result_id": emp_result_id_action,
			"action_to": $("#actionAction").val(),
			"remark": $("#remark_footer_action").val()
			}
		},
		success:function(data){
			if(data['status']==200){
				   //callFlashSlideInModal("Updated","#information2");
			       getDataFn($("#pageNumber").val(),$("#rpp").val());
			       callFlashSlide(Liferay.Language.get('update-successfully'));
				   $("#ModalAction").modal('hide');
				   $("#action").val("add");
				   appraisalStatusFn();
			}
			
		}
		
	});
	
};
//Update Action end

//Update Assignment start
var actionUpdateAssignmentFn = function(){

	var countAppraisalItem=0;
	var appraisal_items=[];
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	


	//loop structure
	
	$.each($(".structure_id").get(),function(index,structureEntry){
		

		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){

				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				
			
					
					appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
					appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
					appraisal_items+="\"kpi_type_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-kpi_type_id").val()+"\",";
					appraisal_items+="\"form_id\":\"1\",";
					appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
					appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
					appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
					appraisal_items+="\"forecast_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-forecast").val())+"\",";
					appraisal_items+="\"score0\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score0").val())+"\",";
					appraisal_items+="\"score1\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score1").val())+"\",";
					appraisal_items+="\"score2\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score2").val())+"\",";
					appraisal_items+="\"score3\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score3").val())+"\",";
					appraisal_items+="\"score4\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score4").val())+"\",";
					appraisal_items+="\"score5\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score5").val())+"\",";

					appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";

					appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
					
					
					
					if($(this).prop("checked")==true){
						appraisal_items+="\"select_flag\":\"1\"";	
					}else{
						appraisal_items+="\"select_flag\":\"0\"";	
					}
					
					
				
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
				appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
				appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
				
				
				if($(this).prop("checked")==true){
					appraisal_items+="\"select_flag\":\"1\"";	
				}else{
					appraisal_items+="\"select_flag\":\"0\"";	
				}
				
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			//$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			$.each($(".appraisalItem-checkbox-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_result_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_result_id").val()+"\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"total_weight\":\""+$("#total_weight-"+$(structureEntry).val()).val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\",";
				
//				console.log("-----------------");
//				console.log(appraisalItemEntry);
//				console.log("Appraisal item = "+$(appraisalItemEntry).val());
//				console.log("Structure = "+$(structureEntry).val());
//				console.log($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val());
//				console.log("-----------------");
				
				
				if($(this).prop("checked")==true){
					appraisal_items+="\"select_flag\":\"1\"";	
				}else{
					appraisal_items+="\"select_flag\":\"0\"";	
				}
				
				
				appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	console.log(appraisal_itemsObj);

	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/"+$("#id").val(),
		type:"PATCH",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"period_id":$("#period_id_edit").val(),
			"action_to":$("#actionAssign").val(),
			"remark":$("#remark_footer").val()
			},
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			if(data['status']==200){
				   //callFlashSlide("Updated.");Â 
				   callFlashSlideInModal("Updated","#information");
			       getDataFn($("#pageNumber").val(),$("#rpp").val());
				   $("#ModalAssignment").modal('hide');
				   $("#action").val("add");
				   appraisalStatusFn();

			}else if(data['status']=="400"){
				
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");
			}
			
		}
		
	});
	
};
//Update Assignment end

//Assignment Start
var actionAssignmentFn = function(param){
	
	
	var countAppraisalItem=0;
	var appraisal_items=[];

	var employees=[];
	
	var appraisal_item1=[];
	var appraisal_item2=[];
	var appraisal_item3=[];
	
	//get employees
	employees+="[";
	$.each(empldoyees_id,function(index,indexEntry){
		if(index==0){
			employees+="{";
		}else{
			employees+=",{";
		}
			if($("#embed_appraisal_type_id").val()==2){
				employees+="\"emp_id\":\""+indexEntry+"\",\"emp_code\":\""+empldoyees_code[index]+"\",";
				employees+="\"org_id\":\"\",\"org_code\":\"\"";
			}else if($("#embed_appraisal_type_id").val()==1){
				employees+="\"emp_id\":\"\",\"emp_code\":\"\",";
				employees+="\"org_id\":\""+indexEntry+"\",\"org_code\":\""+empldoyees_code[index]+"\"";
			}
			
		employees+="}";

	});
	employees+="]";

	//loop structure
	$.each($(".structure_id").get(),function(index,structureEntry){

		
		
		if($("#form-"+$(structureEntry).val()).val()=="form1"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}

					appraisal_items+="\"nof_target_score\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-nof_target_score").val()+"\",";
					appraisal_items+="\"kpi_type_id\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-kpi_type_id").val()+"\",";
					appraisal_items+="\"form_id\":\"1\",";
					appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
					appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
					appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
					appraisal_items+="\"forecast_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-forecast").val())+"\",";
					appraisal_items+="\"score0\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score0").val())+"\",";
					appraisal_items+="\"score1\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score1").val())+"\",";
					appraisal_items+="\"score2\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score2").val())+"\",";
					appraisal_items+="\"score3\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score3").val())+"\",";
					appraisal_items+="\"score4\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score4").val())+"\",";
					appraisal_items+="\"score5\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-score5").val())+"\",";
					appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
					appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
					appraisal_items+="\"select_flag\":\"1\"";
				
				
				appraisal_items+="}";
				countAppraisalItem++;
			
			});

			
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form2"){

			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"2\",";
				appraisal_items+="\"target_value\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-target").val())+"\",";
				appraisal_items+="\"weight_percent\":\""+removeComma($("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-weight").val())+"\",";
				appraisal_items+="\"total_weight\":\""+removeComma($("#total_weight-"+$(structureEntry).val()).val())+"\",";
				appraisal_items+="\"select_flag\":\"1\"";
				appraisal_items+="}";
				countAppraisalItem++;
			});
			
		}else if($("#form-"+$(structureEntry).val()).val()=="form3"){
			
			$.each($(".embed_appraisal_id-"+$(structureEntry).val()).get(),function(index2,appraisalItemEntry){
				
			
				if(countAppraisalItem==0){
					appraisal_items+="{";	
				}else{
					appraisal_items+=",{";	
				}
				//appraisal_items+="\"item_result_id\":\"11\",";
				appraisal_items+="\"item_id\":\""+$(appraisalItemEntry).val()+"\",";
				appraisal_items+="\"item_name\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-item_name").text()+"\",";
				appraisal_items+="\"form_id\":\"3\",";
				appraisal_items+="\"max_value\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-maxValue").val()+"\",";
				appraisal_items+="\"deduct_score_unit\":\""+$("#id-"+$(appraisalItemEntry).val()+"-"+$(structureEntry).val()+"-deductScoreUnit").val()+"\",";
				appraisal_items+="\"total_weight\":\""+$("#total_weight-"+$(structureEntry).val()).val()+"\",";
				appraisal_items+="\"select_flag\":\"1\"";
				appraisal_items+="}";
				
			    countAppraisalItem++;
				});
		}
	});
	




	var employeesObj=eval("("+employees+")");
	var appraisal_itemsObj=eval("(["+appraisal_items+"])");
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment",
		type:"post",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		
		data:{"head_params":
			{
			"appraisal_type_id":$("#embed_appraisal_type_id").val(),
			"frequency_id":$("#embed_period_frequency").val() ,
			"appraisal_year":$("#embed_year_list").val(),
			"period_id":$("#embed_period_id").val(),
			"action_to":$("#actionAssign").val(),
			"remark":$("#remark_footer").val(),
			 
			},
			"employees": employeesObj,
			"appraisal_items":appraisal_itemsObj
		},
		success:function(data){
			
			//console.log(data);
			if(data['status']==200){
				
				   
				   
				   if(param !="saveAndAnother"){
					   callFlashSlide(Liferay.Language.get('insert-successfully'));
					   getDataFn($("#pageNumber").val(),$("#rpp").val());
					   $("#ModalAssignment").modal('hide');
					   $("#action").val("add");		 	    
					}else{
						
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						callFlashSlideInModal(Liferay.Language.get('insert-successfully'),"#information");
						$("#action").val("add");
						clearFn();
						
					}
				   
				   appraisalStatusFn();
			}else if(data['status']=="400"){
				callFlashSlideInModal(validationAssignmentFn(data),"#information","error");
				return false;
				
			}
			
		}
		
	});
	
	
	
}

//SearchAdvance
var searchAdvanceFn = function() {
	/*
	appraisal_level_id,
	appraisal_type_id,
	period_id,
	position_code,
	emp_id,


	*/
	var Position= $("#Position").val().split("-");
	Position=Position[0];
	

	
	var empNameCode= $("#empName").val().split("-");
	empNameCode=empNameCode[0];
	
	
	
	$(".embed_param_search").remove();
	

	
	
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_level_id' name='embed_appraisal_level_id' value='"+$("#appraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisal_type_id' name='embed_appraisal_type_id' value='"+$("#appraisalType").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_id' name='embed_period_id' value='"+$("#period_id").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_position_id' name='embed_position_id' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_emp_id' name='embed_emp_id' value='"+empNameCode+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_period_frequency' name='embed_period_frequency' value='"+$("#periodFrequency").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_year_list' name='embed_year_list' value='"+$("#YearList").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_organization' name='embed_organization' value='"+$("#organization").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_status' name='embed_status' value='"+$("#appraisalStatus").val()+"'>";
	
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
	
};
/*#########################  Main Function Data #######################*/
/*#########################  Custom Function Data #######################*/

var appraisalLevelListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
					
				}
			});
			$("#appraisalLevel"+nameArea).html(htmlOption);
		}
	});
}

var yearListFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/year_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_year_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year_id']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year_id']+">"+indexEntry['appraisal_year']+"</option>";
					
				}
			});
			$("#YearList"+nameArea).html(htmlOption);
		}
	});
}


var appraisalTypeFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/appraisal_type_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['appraisal_type_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
					
				}
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}

var appraisalStatusFn = function(nameArea,id){
	
	if(nameArea==undefined){
		nameArea="";
	}
	
	var htmlOption="";
//	htmlOption+="<option value='Unassigned'>Unassigned</option>";
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/status_list",
		type:"get",
		dataType:"json",
		async:false,
		data:{
			"org_level":$("#appraisalLevel").val(),
			"org_id":$("#organization").val(),
			"period_id":$("#period_id").val(),
			"appraisal_frequency_id":$("#periodFrequency").val(),
			"appraisal_year":$("#YearList").val(),
			"appraisal_type_id":$("#appraisalType").val(),
//			"emp_code":($("#empName_id").val()==""?"":$("#empName_id").val()),
//			"position_id":($("#Position_id").val()==""?"":$("#Position_id").val())
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['status']){
					htmlOption+="<option selected='selected' value='"+indexEntry['to_action']+"'>"+indexEntry['status']+"</option>";
				}else{
					htmlOption+="<option value='"+indexEntry['to_action']+"'>"+indexEntry['status']+"</option>";
					
				}
			});
			$("#appraisalStatus"+nameArea).html(htmlOption);
		}
	});
}

var periodFrequencyFn = function(nameArea){

	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/frequency_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
			
					htmlOption+="<option value="+indexEntry['frequency_id']+">"+indexEntry['frequency_name']+"</option>";
					
			
			});
			$("#periodFrequency"+nameArea).html(htmlOption);
		}
	});
	
	
}
var dropDrowDepartmentFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/dep_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
		
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['department_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['department_code']+">"+indexEntry['department_name']+"</option>";
				}
			});
			$("#Department").html(htmlOption);
		}
	});
}
var dropDrowOrgFn = function(appraisalLevelId){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/org",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"level_id":appraisalLevelId},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>"+Liferay.Language.get('all-organization')+"</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['org_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['org_id']+">"+indexEntry['org_name']+"</option>";
				}
			});
			$("#organization").html(htmlOption);
		}
	});
}

var dropDrowPeriodFn = function(paramPeriod,paramAssignFrequency){
	
	var htmlOption="";
	
	
	if(paramAssignFrequency==1){
		htmlOption+="<option value=''></option>";
	}else{
		$("#period").removeAttr("disabled");
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":$("#YearList").val(),"frequency_id":$("#periodFrequency").val()},
		success:function(data){
			
			
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}
			});
			$("#period_id").html(htmlOption);
			
			if(paramAssignFrequency==1){
				$("#period_id").attr("disabled","disabled");
			}else{
				$("#period_id").removeAttr("disabled");
			}
			
				
		}
	});
	
}


var dropDrowAsignToFn = function(nameArea){


	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/new_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_level_id":$("#embed_appraisal_level_id").val()},
		success:function(data){
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo"+nameArea).html(htmlOption);
		}
	});
}
var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			if(data=="" || data==null || data==[]){
				
				$("#btnSubmit").attr("disabled","disabled");	
				$("#btnAddAnother").attr("disabled","disabled");

				//return false;
			}else{
				$("#btnSubmit").removeAttr("disabled");
				$("#btnAddAnother").removeAttr("disabled");
			}
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['to_appraisal_level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['to_appraisal_level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#assignTo").html(htmlOption);
		}
	});
}

var dropDrowActionFn = function(paramStageID,nameArea){



	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/new_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID,"appraisal_type_id":$("#embed_appraisal_type_id").val()},
		success:function(data){
			
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionAssign"+nameArea).html(htmlOption);
		}
	});
}

var dropDrowActionEditFn = function(paramStageID,paramToAppraisalLevel){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID,"to_appraisal_level_id":paramToAppraisalLevel},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionAssign").html(htmlOption);
		}
	});
}

var dropDrowActionEditFn2 = function(paramStageID){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionAction").html(htmlOption);
		}
	});
}





var periodFn = function(nameArea){

	
	if(nameArea==undefined){
		nameArea="";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"assignment_frequency":$("#assignFrequency").val(),
			"frequency_id":$("#periodFrequency").val()
		},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
					
				}
			});
			$("#period"+nameArea).html(htmlOption);
		}
	});
}
//form2
var assignTemplateQualityFn = function(structureName,data){
	
	var htmlTemplateQuality="";
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row-fluid\">";
	htmlTemplateQuality+="<div class=\"span12\">";
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuality+="<div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quality_moblie_percentage-"+data['structure_id']+"'></span><span  class='checkWeigthOver' id='weigth_total_quality_percentage-"+data['structure_id']+"'></span>"+Liferay.Language.get('total-weight')+" <span id='weigth_total_quality_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%<span></div>";
		
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\">";
	htmlTemplateQuality+="<table id=\"tableQuality\" style='top: -37px; max-width: none;'  class=\"table table-striped tableQuality fixedHeader\">";
	htmlTemplateQuality+="<thead>";
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:3%\"><b>"+Liferay.Language.get('select')+"</b></th>";
			htmlTemplateQuality+="<th style=\"width:67%\"><b>"+Liferay.Language.get('ppraisal-item-name')+"</b></th>";
			htmlTemplateQuality+="<th style=\"width:15%; text-align:center;\"><b>"+Liferay.Language.get('target')+"</b></th>";
			htmlTemplateQuality+="<th style=\"width:15%; text-align:center;\"><b>"+Liferay.Language.get('percent-weight')+"</b></th>  ";      
			htmlTemplateQuality+="</tr>";
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"listthreshould\">";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateQuality+="<tr>";
						htmlTemplateQuality+="<td style=\"width:3%;text-align:center;\" class='object-center'  ><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
						htmlTemplateQuality+="<td style=\"width:67%\" style='padding-top:7px;' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' class='id-"+indexEntry['structure_id']+"-item_name'>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuality+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly addComma' type='text'></td>";
						htmlTemplateQuality+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quality input form-control input-sm-small numberOnly addComma' type='text'></td>";
						htmlTemplateQuality+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
						
					htmlTemplateQuality+="</tr>";
					});
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					
					htmlTemplateQuality+="</div>";
					htmlTemplateQuality+="<br style=\"clear:both\">";				
		htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="</div>";
htmlTemplateQuality+="</div>";
return htmlTemplateQuality;
//$("#appraisal_template_area").append(htmlTemplateQuality);

};

var assignTemplateDeductFn = function(structureName,data){
	
	var htmlTemplateDeduct="";
	htmlTemplateDeduct+="<div class=\"row-fluid\">";
	htmlTemplateDeduct+="<div class=\"span12\">";
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	htmlTemplateDeduct+="<div class='totalWeight'><span class='sum_d' style='display:none;' id='weigth_total_deduct_percentage-"+data['structure_id']+"'>"+data['total_weight']+"</span>"+Liferay.Language.get('total-weight')+" <span class='weigth_total_deduct_percentage_target' id='weigth_total_deduct_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
	
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\">";
		htmlTemplateDeduct+="<table id=\"tableDeduct\" style='top: -37px; max-width: none;' class=\"table table-striped tableDeduct fixedHeader\">";
              		
		htmlTemplateDeduct+="<thead>";
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:3%\"><b>"+Liferay.Language.get('select')+"</b></th>";
				htmlTemplateDeduct+="<th style=\"width:67%\"><b>Appraisal checkWeigthOverItem Name</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%; text-align:center;\"><b>"+Liferay.Language.get('max-value')+"</b></th>";
				htmlTemplateDeduct+="<th style=\"width:15%; text-align:center;\"><b>"+Liferay.Language.get('deduct-score')+"</b></th>";
				htmlTemplateDeduct+="</tr>";
					htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\">";
					
					$.each(data['items'],function(index,indexEntry){
					htmlTemplateDeduct+="<tr>";
							htmlTemplateDeduct+="<td style=\"width:3%;text-align:center;\" class='object-center' ><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox notCal appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
							htmlTemplateDeduct+="<td style=\"width:67%\" style='padding-top:7px;' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' class='id-"+indexEntry['structure_id']+"-item_name'>"+indexEntry['item_name']+"</td>";
							htmlTemplateDeduct+="<td style=\"width:15%;text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-maxValue' class='id-"+indexEntry['structure_id']+"-maxValue  input form-control input-sm-small numberOnly' type='text' value='"+indexEntry['max_value']+"'></td>";
							htmlTemplateDeduct+="<td style=\"width:15%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-deductScoreUnit' class='id-"+indexEntry['structure_id']+"-deductScoreUnit    input form-control input-sm-small numberOnly' type='text' value='"+indexEntry['unit_deduct_score']+"'>     </td>";
							htmlTemplateDeduct+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
					htmlTemplateDeduct+="</tr>";
					});
						
						
					htmlTemplateDeduct+="</tbody>";
					htmlTemplateDeduct+="</table>";
					htmlTemplateDeduct+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateDeduct+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
					htmlTemplateDeduct+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form3\">";
					
				htmlTemplateDeduct+="</div>";
			htmlTemplateDeduct+="<br style=\"clear:both\">"			
		htmlTemplateDeduct+="</div>";
		htmlTemplateDeduct+="</div>";
	htmlTemplateDeduct+="</div>";
	return htmlTemplateDeduct;
	//$("#appraisal_template_area").append(htmlTemplateDeduct);
};




var assignTemplateQuantityFn = function(structureName,data){
	
	item_id_array=[];
	var htmlTemplateQuantity = "";
	
	
	
	if(data['threshold']==1){
		// threshold == 1
			htmlTemplateQuantity+="<div class=\"row-fluid\">";
			htmlTemplateQuantity+="	<div class=\"span12\">";
			htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
			
			htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
			htmlTemplateQuantity+="      <div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quantity_moblie_percentage-"+data['structure_id']+"'></span><span class='checkWeigthOver weigth_total_quantity_percentage' id='weigth_total_quantity_percentage-"+data['structure_id']+"'></span>"+Liferay.Language.get('total-weight')+" <span id='weigth_total_quantity_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
			htmlTemplateQuantity+="  </div>";
			htmlTemplateQuantity+="	<div class=\"ibox-content\">";
			htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\">";
			htmlTemplateQuantity+="<table style='width:100%; top: -38px; max-width: none;' id=\"tableQauntity\" class=\"table table-striped tableQauntity fixedHeader\">";
			htmlTemplateQuantity+="<thead>";
				htmlTemplateQuantity+="<tr>";
					htmlTemplateQuantity+="<th style=\"width:3%;  text-align:center;\" class=''><b>"+Liferay.Language.get('select')+"</b></th>";
					htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>"+Liferay.Language.get('appraisal-item-name')+"</b></th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>"+Liferay.Language.get('target')+"</b> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;min-width: 60px !important;  text-align:center;\" class=''><b>"+Liferay.Language.get('uom')+"</b> </th>";
					htmlTemplateQuantity+="<th style=\"width:10%;  text-align:center;\" class='thBox'><b>"+Liferay.Language.get('forecast')+"</b> </th>";
					
					
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][0]['color_code']+"' class='redBOxL'>1</div></th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][0]['color_code']+"' class='redBOxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][1]['color_code']+"' class='OrangeBoxL'>2</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][1]['color_code']+"' class='OrangeBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][2]['color_code']+"' class='YellowBoxL'>3</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][2]['color_code']+"' class='YellowBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][3]['color_code']+"' class='greenBoxL'>4</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][3]['color_code']+"' class='greenBoxR'>&nbsp;</div><div style='background:#"+data['threshold_color'][4]['color_code']+"' class='veryGreenBOxL'>5</div> </th>";
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class='thBox'><div style='background:#"+data['threshold_color'][4]['color_code']+"' class='veryGreenBOxR'>&nbsp;</div> </th>";
					
					
					htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>"+Liferay.Language.get('percent-weight')+"</b></th>";
					//htmlTemplateQuantity+="<th style=\"width:3%;  text-align:center;\" class=''></th>";
					htmlTemplateQuantity+="</tr>";
					htmlTemplateQuantity+="</thead>";
					htmlTemplateQuantity+="<tbody id=\"\">";
					$.each(data['items'],function(index,indexEntry){
						
						item_id_array.push(indexEntry['item_id']);
						
		
						htmlTemplateQuantity+="<tr>";
						
							
							htmlTemplateQuantity+="<td style=\"width:3%; text-align:center;\" class='object-center'><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
							htmlTemplateQuantity+="<td style=\"width:20%\" class='id-"+indexEntry['structure_id']+"-item_name' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' style='padding-top:7px;'>"+indexEntry['item_name']+"</td>";
							
							htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' class='id-"+indexEntry['structure_id']+"-target input form-control input-sm-small numberOnly addComma' type='text'>";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-kpi_type_id' class='id-"+indexEntry['structure_id']+"-kpi_type_id input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['kpi_type_id']+">";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-nof_target_score' class='id-"+indexEntry['structure_id']+"-nof_target_score input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['nof_target_score']+">";
							//htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-total_weight' class='id-"+indexEntry['structure_id']+"-total_weight input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['total_weight']+">";
							htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
							htmlTemplateQuantity+="</td>";
							htmlTemplateQuantity+="<td style=\"width:5%\">"+indexEntry['uom_name']+"</td>";
							
						    htmlTemplateQuantity+="<td style=\"width:10%;text-align:center;\"><input  class='input-sm-small scoreText0 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast'></td>";
						   
						    htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText1 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score0'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText2 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score1'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText3 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score2'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText4 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score3'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText5 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score4'></td>";
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center; background:#fcf8e3;\"><input disabled class='input-sm-small scoreText6 addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-score5'></td>";
							
							htmlTemplateQuantity+="<td style=\"width:5%;text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quantity input form-control input-sm-small numberOnly addComma'  type='text'></td>";
							
						 
							
							
						htmlTemplateQuantity+="</tr>";
						
					});
					htmlTemplateQuantity+="</tbody>";
					htmlTemplateQuantity+="</table>";
					htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
					htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";

					htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
					htmlTemplateQuantity+="<input type='hidden' id='item_id_array-"+data['structure_id']+"' class='item_id_array' value=\""+item_id_array+"\">";
					
					
					htmlTemplateQuantity+="</div>";
					htmlTemplateQuantity+="<br style=\"clear:both\">";	
				htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="</div>";
			
	}else{
		
		 
		// threshold == 0
		
		htmlTemplateQuantity+="<div class=\"row-fluid\">";
		htmlTemplateQuantity+="	<div class=\"span12\">";
		htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
		
		
		
		htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
		htmlTemplateQuantity+="      <div class='totalWeight'><span  class='displayWeightOnMobile' id='weigth_total_quantity_moblie_percentage-"+data['structure_id']+"'></span><span class='checkWeigthOver weigth_total_quantity_percentage' id='weigth_total_quantity_percentage-"+data['structure_id']+"'></span>"+Liferay.Language.get('total-weight')+" <span id='weigth_total_quantity_percentage_target-"+data['structure_id']+"'>"+data['total_weight']+"%</span></div>";
		htmlTemplateQuantity+="  </div>";
		htmlTemplateQuantity+="	<div class=\"ibox-content\">";
		htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\"  style='overflow:auto;'>";
		htmlTemplateQuantity+="<table style='width:100%; top: -38px; max-width: none;' id=\"tableQauntity\" class=\"table table-striped tableQauntity fixedHeader\">";
		htmlTemplateQuantity+="<thead>";
			htmlTemplateQuantity+="<tr>";
				htmlTemplateQuantity+="<th style=\"width:3%; text-align:center;\" class=''><b>"+Liferay.Language.get('select')+"</b></th>";
				htmlTemplateQuantity+="<th style=\"width:30%\" class=''><b>"+Liferay.Language.get('appraisal-item-name')+"</b></th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>"+Liferay.Language.get('target')+"</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;min-width: 60px !important;  text-align:center;\" class=''><b>"+Liferay.Language.get('uom')+"</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>"+Liferay.Language.get('forecast')+"</b> </th>";
				htmlTemplateQuantity+="<th style=\"width:5%;  text-align:center;\" class=''><b>"+Liferay.Language.get('percent-weight')+"</b></th>";
				htmlTemplateQuantity+="</tr>";
				htmlTemplateQuantity+="</thead>";
				htmlTemplateQuantity+="<tbody id=\"\">";
				$.each(data['items'],function(index,indexEntry){
					
					item_id_array.push(indexEntry['item_id']);
					 
	 
					htmlTemplateQuantity+="<tr>";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-kpi_type_id' class='id-"+indexEntry['structure_id']+"-kpi_type_id input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['kpi_type_id']+">";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-nof_target_score' class='id-"+indexEntry['structure_id']+"-nof_target_score input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['nof_target_score']+">";
						//htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-total_weight' class='id-"+indexEntry['structure_id']+"-total_weight input form-control input-sm-small numberOnly' type='hidden' value="+indexEntry['total_weight']+">";
						htmlTemplateQuantity+="<input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_result_id' class='id-"+indexEntry['structure_id']+"-item_result_id input form-control input-sm-small numberOnly' type='hidden' value=\"\">";
						htmlTemplateQuantity+="<td style=\"width:3%; text-align:center;\" class='object-center'><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-checkbox' class='appraisalItem-checkbox appraisalItem-checkbox-"+indexEntry['structure_id']+"' type='checkbox' value='"+indexEntry['item_id']+"'></td>";
						htmlTemplateQuantity+="<td style=\"width:30%\" class='id-"+indexEntry['structure_id']+"-item_name' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-item_name' style='padding-top:7px;'>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input class='input-sm-small numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-target'></td>";
						htmlTemplateQuantity+="<td style=\"width:5%\">"+indexEntry['uom_name']+"</td>";
						htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input class='input-sm-small numberOnly addComma' type='text' id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast' name='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-forecast'></td>";
						htmlTemplateQuantity+="<td style=\"width:5%; text-align:center;\"><input id='id-"+indexEntry['item_id']+"-"+indexEntry['structure_id']+"-weight' class='id-"+indexEntry['structure_id']+"-weight weight_sum total_weigth_quantity input form-control input-sm-small numberOnly addComma'  type='text'></td>";
					htmlTemplateQuantity+="</tr>";
					
				});
				htmlTemplateQuantity+="</tbody>";
				htmlTemplateQuantity+="</table>";
				htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
				htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				//htmlTemplateQuantity+="<input type='hidden' id='no_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				//htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='no_weight' value="+data['no_weight']+">";
				htmlTemplateQuantity+="<input type='hidden' id='total_weight-"+data['structure_id']+"' class='total_weight' value="+data['total_weight']+">";
				htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
				htmlTemplateQuantity+="<input type='hidden' id='item_id_array-"+data['structure_id']+"' class='item_id_array' value=\""+item_id_array+"\">";
				
				
				htmlTemplateQuantity+="</div>";
				htmlTemplateQuantity+="<br style=\"clear:both\">";	
			htmlTemplateQuantity+="</div>";
		htmlTemplateQuantity+="</div>";
		htmlTemplateQuantity+="</div>";
		
		
	}
	
	//return htmlTemplateQuantity;
	$("#appraisal_template_area").append(htmlTemplateQuantity);
	
	if(data['threshold']==1){
		if(data['nof_target_score']>0){
			
			for(var i=0;i<=(parseFloat(data['nof_target_score'])+1);i++){
				$(".scoreText"+i).prop("disabled",false);
			}
			
		}
		//if 0 disabled all
		//if 1 enable 0,1
		//if 2 enable 0,1,2
	}

	
}
var calculationGrandTotalDefaultFn = function(id){
	
	var grandTotalWieght=0;
	var deductTotalWieght=0;
	$.each($(".weight_sum").get(),function(index,indexEntry){
		
		
		if($(indexEntry).val().trim()!=""){
			
			grandTotalWieght+=(parseFloat($(indexEntry).val()));
			
		}
		
	});
	
	$.each($(".weigth_total_deduct_percentage_target").get(),function(index,indexEntry){
		deductTotalWieght+=parseFloat($(indexEntry).text());
		
	});
	grandTotalWieghtTotal=(deductTotalWieght+grandTotalWieght);
	$("#grandTotalWeight").html(parseFloat(grandTotalWieghtTotal).toFixed(2));
	
}
function getNum(val) {
	   if (isNaN(val)) {
	     return 0;
	   }
	   return val;
	}
var calculationGrandTotalFn = function(id){
	
	var grandTotalWieght=0;
	var deductTotalWieght=0;
	var grandTotalWieghtTotal=0;
	
	var globalDataId=id.split("-");
	var globalApprailsal_item_id=globalDataId[1];
	var globalStructure_id=globalDataId[2];
	//Start Default weight form quantity is 0%
	$("#weigth_total_quantity_percentage-"+globalStructure_id)
	.html(Liferay.Language.get('cannot-assignment-because-weight-percent-not-equal-to')+" "+parseFloat($("#weigth_total_quantity_percentage_target-"+globalStructure_id).text()).toFixed(2)+"% [0%]")
	.css({"color":"#FF0000"}).
	addClass("weightIsOver");
	//End Default weight form quantity is 0%
	
	
	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		
		var dataId=this.id.split("-");
		var apprailsal_item_id=dataId[1];
		var structure_id=dataId[2];
		grandTotalWieght+=getNum(parseFloat($("#id-"+apprailsal_item_id+"-"+structure_id+"-weight").val().replace(',', '')));
		
	});
			   
	$.each($(".weigth_total_deduct_percentage_target").get(),function(index,indexEntry){
		deductTotalWieght+=parseFloat($(indexEntry).text());
	});
	grandTotalWieghtTotal=(deductTotalWieght+grandTotalWieght);
	
	
	
	$("#grandTotalWeight").html(addCommas(parseFloat(grandTotalWieghtTotal).toFixed(2)));
	//weigth_total_quality_percentage_target
	
	//################ Calculation Quantity Start####################### 

	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		var dataId1=this.id.split("-");;
		var apprailsal_item_id1=dataId1[1];
		var structure_id1=dataId1[2];
		var totalWeigthQuantity=0;

		$.each($(".id-"+structure_id1+"-weight").get(),function(index,indexEntry){
			
			var dataId=this.id.split("-");;
			var apprailsal_item_id=dataId[1];
			var structure_id=dataId[2];
			
						
				if($(indexEntry).val().trim()!="" && $("#id-"+apprailsal_item_id+"-"+structure_id+"-checkbox").prop("checked")==true){
					totalWeigthQuantity+=(parseFloat($(indexEntry).val().replace(',', '')));
					if(totalWeigthQuantity != parseFloat($("#weigth_total_quantity_percentage_target-"+structure_id).text())){
						
						$("#weigth_total_quantity_percentage-"+structure_id)
						.html(Liferay.Language.get('cannot-assignment-because-weight-percent-not-equal-to')+" "+parseFloat($("#weigth_total_quantity_percentage_target-"+structure_id).text()).toFixed(2)+"% ["+addCommas(parseFloat(totalWeigthQuantity).toFixed(2))+"%]")
						.css({"color":"#FF0000"}).
						addClass("weightIsOver");
						
						$("#weigth_total_quantity_moblie_percentage-"+structure_id).html("["+addCommas(totalWeigthQuantity)+"%]")
						.css({"color":"#FF0000"});
						
					}else{
						$("#weigth_total_quantity_percentage-"+structure_id)
						.html("["+addCommas(totalWeigthQuantity)+"%]")
						.css({"color":"#00CC00"})
						.removeClass("weightIsOver");
						
						$("#weigth_total_quantity_moblie_percentage-"+structure_id).html("["+addCommas(parseFloat(totalWeigthQuantity).toFixed(2))+"%]")
						.css({"color":"#00CC00"});
					}
				}
			
			//}
		});
		
	});
	//################ Calculation Quantity End####################### 
	//################ Calculation Quality Start####################### 
	//Start Default weight form Quality is 0%
	$("#weigth_total_quality_percentage-"+globalStructure_id)
	.html(Liferay.Language.get('cannot-assignment-because-weight-percent-not-equal-to')+" "+parseFloat($("#weigth_total_quality_percentage_target-"+globalStructure_id).text())+"% [0%]")
	.css({"color":"#FF0000"}).
	addClass("weightIsOver");
	//End Default weight form Quality is 0%
	$.each($(".embed_appraisal_id").get(),function(index,indexEntry){
		var dataId1=this.id.split("-");
		var apprailsal_item_id1=dataId1[1];
		var structure_id1=dataId1[2];
		var total_weigth_quality=0;
		
			$.each($(".id-"+structure_id1+"-weight").get(),function(index,indexEntry){
				
				var dataId=this.id.split("-");;
				var apprailsal_item_id=dataId[1];
				var structure_id=dataId[2];
					if($(indexEntry).val().trim()!="" && $("#id-"+apprailsal_item_id+"-"+structure_id+"-checkbox").prop("checked")==true){
						total_weigth_quality=(parseFloat(Number(total_weigth_quality).toFixed(2)))+(parseFloat($(indexEntry).val().replace(',', '')));
						 
						if(total_weigth_quality != parseFloat($("#weigth_total_quality_percentage_target-"+structure_id).text())){

							$("#weigth_total_quality_percentage-"+structure_id)
							.html(Liferay.Language.get('cannot-assignment-because-weight-percent-not-equal-to')+" "+parseFloat($("#weigth_total_quality_percentage_target-"+structure_id).text())+"% ["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#FF0000"}).
							addClass("weightIsOver");
							
							$("#weigth_total_quality_moblie_percentage-"+structure_id).html("["+addCommas(total_weigth_quality)+"%]")
							.css({"color":"#FF0000"});
							
						}else{
							
							$("#weigth_total_quality_percentage-"+structure_id)
							.html("["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#00CC00"})
							.removeClass("weightIsOver");
							
							$("#weigth_total_quality_moblie_percentage-"+structure_id).html("["+addCommas(parseFloat(total_weigth_quality).toFixed(2))+"%]")
							.css({"color":"#00CC00"});
						}
					}
				//}
				
			});
		
	});
	//################ Calculation Quality End####################### 
	
}
var bindingSlideScoreBarFn = function(){
	
	//console.log(item_id_array);
	
	$.each(item_id_array,function(index,indexEntry){
		
		if(index<=2){
			
		// bind scoll bar start here...
		var slider = document.getElementById('slideScore-'+indexEntry);
		
		var input0 = document.getElementById('input-with-keypress-0-'+indexEntry);
		var input1 = document.getElementById('input-with-keypress-1-'+indexEntry);
		var input2 = document.getElementById('input-with-keypress-2-'+indexEntry);
		var input3 = document.getElementById('input-with-keypress-3-'+indexEntry);
	
		
		var inputs = [input0, input1, input2, input3];
		
		noUiSlider.create(slider, {
			start: [ 0, 20, 60, 100 ],
			connect: [false, true, true, true, true],
			direction: 'rtl',
			//tooltips: [true, wNumb({ decimals: 1 })],
			tooltips: true,
			range: {
				'min': [  0 ],
				'max': [ 100 ]
			}
		});

		var connect = slider.querySelectorAll('.noUi-connect');
		var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
		
		for ( var i = 0; i < connect.length; i++ ) {
		    connect[i].classList.add(classes[i]);
		}
		
		slider.noUiSlider.on('update', function( values, handle ) {
			inputs[handle].value = values[handle];
		});
		// bind scoll bar end here...
		}
	});
	
}
var createTemplateAssignmentFn = function(data){
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,indexEntry){
		
		if(indexEntry['form_url']=='quantity'){	
			assignTemplateQuantityFn(index,indexEntry);
			
		
			
			
		}else if(indexEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,indexEntry));
			
		}else if(indexEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,indexEntry));
		}
		
		setThemeColorFn(tokenID.theme_color);
	    
		var getSelectionStart = function (o) {
			if (o.createTextRange) {
				var r = document.selection.createRange().duplicate()
				r.moveEnd('character', o.value.length)
				if (r.text == '') return o.value.length
				return o.value.lastIndexOf(r.text)
			} else return o.selectionStart
		};
		jQuery('.numberOnly').keypress(function (evt) { 
			 var charCode = (evt.which) ? evt.which : evt.keyCode;
			 var number = this.value.split('.');
			 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			    return false;
			 }
			    //just one dot
			 if(number.length>1 && charCode == 46){
			    return false;
			 }
			    //get the carat position
			 var caratPos = getSelectionStart(this);
			 var dotPos = this.value.indexOf(".");
			 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
			    return false;
			 }
			 return true;
		});
	    
		
	});
	//sum grand total start
	
	$(".weight_sum").keyup(function(){
		calculationGrandTotalFn(this.id);
	})
	$(".addComma").keyup(function(){
		$(this).val(Comma($(this).val()));
	})
	
	$(".appraisalItem-checkbox").click(function(){
		if($(this).hasClass('notCal')){
			
		}else{
			//alert("11");
			//calculationGrandTotalFn(this.id);
		}
		
	})
	
	//sum grand total end

	if($(".no_weight").val()==1){
		$(".totalWeight").hide();
		$(".grandTotalWeight").hide();

		$("input.total_weigth_quantity").attr('disabled','disabled');
		
		
	}else{
		$("input.total_weigth_quantity").removeAttr('disabled');
		$(".totalWeight").show();
		$(".grandTotalWeight").show();
	}
	 
};
var getTemplateFn = function(emp_result_id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/template",
		type:"get",
		dataType:"json",
		async:false,
		data:{
			'appraisal_level_id':$("#appraisalLevel").val(),
			'emp_result_id':emp_result_id,
			'org_id':org_id_to_assign
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			createTemplateAssignmentFn(data);
		
		}
	});
};
 

//var connectionServiceFn = function(username,password){
//	$.ajax({
//		
//		url:restfulURL+"/"+serviceName+"/public/session",
//		//url:"http://localhost/"+serviceName+"/public/session",
//		type:"POST",
//		dataType:"text",
//		data:{"username":username,"password":password},
//		//data:{"username":"2015019","password":"2015019"},
//		error: function(jqXHR, textStatus, errorThrown) {
//			console.log("error login");
//		},
//		success:function(data){
//			//console.log(data);
//			localStorage.setItem("tokenID",data);
//			console.log("Login is Success");
//			
//		}
//	})			
//}
//function getParamValue(paramName)
//{
//    var url = window.location.search.substring(1); //get rid of "?" in querystring
//    var qArray = url.split('&'); //get key-value pairs
//    for (var i = 0; i < qArray.length; i++) 
//    {
//        var pArr = qArray[i].split('='); //split key and value
//        if (pArr[0] == paramName) 
//            return pArr[1]; //return value
//    }
//}

/*#########################  Custom Function Data #######################*/


//Ready to call Function.
$(document).ready(function(){
	
	//alert(is_hr);
	
	

	
	
var username = $('#user_portlet').val();
var password = $('#pass_portlet').val();
var plid = $('#plid_portlet').val();

/*Fixed for Test.*/

// username = "hradmin";
// password =	"11";
	
if(username!="" && username!=null & username!=[] && username!=undefined ){
	
	if(connectionServiceFn(username,password,plid)==true){
			
		
	//Default start
	$("#btnSubmit").removeAttr("disabled");
	$("#btnSubmitAction").removeAttr("disabled");
	$("#btnAssignment").removeAttr("disabled");
	$("#btnAddAnother").removeAttr("disabled");
	$("#btnSubmit").removeAttr("disabled");
	//Default end
	if(is_hr==0){
	
		$("#btnAssignment").attr("disabled","disabled");
		$("#btnAddAnother").attr("disabled","disabled");
		//$("#btnSubmit").attr("disabled","disabled");
		
	}else{
		//alert(is_hr);
		$("#btnAssignment").removeAttr("disabled");
		$("#btnAddAnother").removeAttr("disabled");
		//$("#btnSubmit").removeAttr("disabled");
	}
	
		
	var getSelectionStart = function (o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate()
			r.moveEnd('character', o.value.length)
			if (r.text == '') return o.value.length
			return o.value.lastIndexOf(r.text)
		} else return o.selectionStart
	};
	jQuery('.numberOnly').keypress(function (evt) { 
		 var charCode = (evt.which) ? evt.which : evt.keyCode;
		 var number = this.value.split('.');
		 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		    return false;
		 }
		    //just one dot
		 if(number.length>1 && charCode == 46){
		    return false;
		 }
		    //get the carat position
		 var caratPos = getSelectionStart(this);
		 var dotPos = this.value.indexOf(".");
		 if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
		    return false;
		 }
		 return true;
	});
	

		//dropDrowDepartmentFn();
		appraisalLevelListFn();
		appraisalTypeFn('','1');
		periodFrequencyFn();
		yearListFn();
		
		$("#appraisalLevel").change(function(){
			dropDrowOrgFn($(this).val());
			appraisalStatusFn();
		});
		$("#appraisalLevel").change();
		
		//dropDrowOrgFn();
		
		
		$("#appraisalType").change(function(){
			if($("#appraisalType").val()==1){
				
				$("#Position").prop("disabled",true);
				$("#empName").prop("disabled",true);
				
				$("#Position").val("");
				$("#empName").val("");
				appraisalStatusFn();
				
			}else{
				$("#Position").prop("disabled",false);
				$("#empName").prop("disabled",false);
				appraisalStatusFn();
			}
		});
		$("#appraisalType").change();
		
		$(".app_url_hidden").show();
		
	
	
	$("#periodFrequency").change(function(){
		
		dropDrowPeriodFn($(this).val(),$("#assignFrequency").val());
		appraisalStatusFn();
		
	});
	
	$("#YearList").change(function(){
		
		dropDrowPeriodFn($("#periodFrequency").val(),$("#assignFrequency").val());
		appraisalStatusFn();
		
	});
	
	
	$("#assignFrequency").change(function(){
		dropDrowPeriodFn($("#periodFrequency").val(),$(this).val());
		appraisalStatusFn();
	});
	$("#assignFrequency").change();
	
	$("#period_id").change(function(){
		appraisalStatusFn();
	});
	
	
	
	
	//Auto complete Start
	
	$("#Position").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_position_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"position_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.position_id+"-"+item.position_name,
                                value: item.position_id+"-"+item.position_name
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	
	$("#empName").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/"+serviceName+"/public/appraisal_assignment/auto_employee_name",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"emp_name":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
						response($.map(data, function (item) {
                            return {
                                label: item.emp_code+"-"+item.emp_name,
                                value: item.emp_code+"-"+item.emp_name,
                            };
                        }));
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
	
	
	//Auto Complete End
	
	//Search Start
	$("#btnSearchAdvance").click(function(){
		
		searchAdvanceFn();
		$(".countPagination").val(10);
		$("#rpp").remove();
		$(".search_result").show();
		
	});
	
	//btn assignment start
	$("#btnAssignment").click(function(){
		
		
		empldoyees_code=[];
		empldoyees_id=[];
		org_id_to_assign=[];
		$(".information").hide();
		$("#btnAddAnother").show();
		$(".embed_appraisal_id").remove();
		$("#grandTotalWeight").html("0.00");
			$.each($(".asign_emp").get(),function(index,indexEntry){
				if($(indexEntry).is(":checked")){
					var emp_id=$(indexEntry).val().split("-");
					
					empldoyees_id.push(emp_id[0]);
					empldoyees_code.push(emp_id[1]);
					org_id_to_assign.push(emp_id[0]);
				}
			});
		if(empldoyees_id.length==0){
			callFlashSlide(Liferay.Language.get('please-choose-employees-or-organization-for-assignment'));
			return false;
		}else{

			sessionStorage.setItem('is_coporate_kpi',$("#is_coporate_kpi-"+empldoyees_id[0]).val());
			

			$(".cus_information_area").hide();
			$("#action").val("add");
			//Default start
			$("#btnSubmit").removeAttr("disabled");
			$("#btnAddAnother").removeAttr("disabled");
			//Default end
			getTemplateFn();
			
			$("#slideUpDownStageHistory").hide();
			$("#slideStageHistory").hide();
			
			
			/*dropDrowAsignToFn();
			$("#assignTo").off("change");
			$("#assignTo").change(function(){
				dropDrowActionFn($(this).val());
			});
			$("#assignTo").change();
			*/
			dropDrowActionFn($(this).val());
			
			//check assignment if reject  remark is require.
			$("#actionAssign").off("change");
			$("#actionAssign").on("change",function(){
				//alert("hello jquery");
				
			});
			
			$(window).scrollTop(0);
			setTimeout(function(){
				$(".modal-body").scrollTop(0);
				$(".fht-tbody").scrollTop(0);
			
			});
		}
		
		/*
		console.log(empldoyees_id);
		console.log(empldoyees_code);
		*/
		
		$("#btnAssignment").attr({
			"data-backdrop" : setModalPopup[0],
			"data-keyboard" : setModalPopup[1]
		});
		
	});
	//btn assignment end
	//btn action assign start
		$("#btnSubmit").click(function(){
					

					
					if(($("#actionAssign option:selected").text()=="Reject") && ($("#remark_footer").val()=="")){
						callFlashSlideInModal("Please fill Remark for Reject Workflow State.","#information","error");
						return false;
					}
			
					if($(".no_weight").val()==0){	
					
						if($(".checkWeigthOver").hasClass('weightIsOver')==true){
							
							callFlashSlideInModal("<b>"+Liferay.Language.get('cannot-assign-structure-not-equal-to-weight-total')+"<b>","#information","error");
							
						}else if(parseFloat($("#grandTotalWeight").text())!=100){
							callFlashSlideInModal("<b>"+Liferay.Language.get('grand-total-weight-is-not-100-percent')+"<b>","#information","error");
							
						}else{
							
							if($(".embed_appraisal_id").get().length>0){
								if($("#action").val()=="add"){
									actionAssignmentFn("saveOnly");
								}else{
									actionUpdateAssignmentFn();
								}
							}else{
								callFlashSlideInModal(Liferay.Language.get('please-choose-appraisal-item-id'),"#information","error");
							}
						}
					}else{
						
						//no_weight==1
						
						if($(".embed_appraisal_id").get().length>0){
							if($("#action").val()=="add"){
								actionAssignmentFn("saveOnly");
							}else{
								actionUpdateAssignmentFn();
							}
						}else{
							callFlashSlideInModal(Liferay.Language.get('please-choose-appraisal-item-id'),"#information","error");
						}
						
					}
			
		});
		
		$("#btnSubmitAction").click(function(){
			if(($("#actionAction option:selected").text()=="Reject") && ($("#remark_footer_action").val()=="")){
				callFlashSlideInModal(Liferay.Language.get('please-fill-remark-for-reject-workflow-state'),"#information2","error");
				return false;
			}
			actionActionAssignmentFn();
		});
		
		$(document).on("click","#btnAddAnother",function(){
			


			//clearFn();
			
			if($(".checkWeigthOver").hasClass('weightIsOver')==true){
				
				callFlashSlideInModal("<b>"+Liferay.Language.get('cannot-assign-structure-not-equal-to-weight-total')+"<b>","#information","error");
				
			}else if(parseFloat($("#grandTotalWeight").text())!=100){
				callFlashSlideInModal("<b>"+Liferay.Language.get('grand-total-weight-is-not-100-percent')+"</b>","#information","error");
			
			}else{
			
				if($(".embed_appraisal_id").get().length>0){
					actionAssignmentFn("saveAndAnother");	
				}else{
					callFlashSlideInModal(Liferay.Language.get('please-choose-appraisal-item-id'),"#information","error");
				}
			}
		});
	//btn action assign end
		
	//embed emp_id
		

		//check choose appraisal item start
		
		$(document).on("click",".appraisalItem-checkbox",function(){	
			
			if($(this).prop("checked")==true){
				embedParamCheckboxAppraisalItem(this.id);	
			}else{
				removeEmbedParamCheckboxAppraisalItem(this.id);
			}
			
			//if(sessionStorage.getItem("is_coporate_kpi")==0){
				calculationGrandTotalFn(this.id);
			//}
		});
		
		
		//Button Click Stage History Start.
		
		$("#slideUpDownStageHistory").click(function(){

			$("#slideStageHistory").slideToggle();

			return false;
		});
		
		//Button Click Stage History End.
		
		
		
		}
	
		
		
	}

//check Orientation Start
var getBrowserWidth = function(){
	if(window.innerWidth < 768){
		// Extra Small Device
		
		
	} else if(window.innerWidth < 991){
		// Small Device
		
		
	} else if(window.innerWidth < 1199){
		// Medium Device
		
	
	} else {
		// Large Device
		

	}
};

getBrowserWidth();
$(window).on('resize',function(){
	getBrowserWidth();
});
//check Orientation End

//binding tooltip start
$('[data-toggle="tooltip"]').css({"cursor":"pointer"});
$('[data-toggle="tooltip"]').tooltip({
	 html:true
});
//binding tooltip end


});
