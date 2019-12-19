var username = "";
var password = "";
var projects_name = [];
var projects_id = [];
var flagEdit = 0;
var respons = [];
var id = 0;
var pushDataToProjects = function(result){
	projects_name = [];
	projects_id = [];
	let html = "";
	html += '<option value="'+"null"+'">'+"Select List Item"+'</option>';
	result.map(index => {
		html += '<option value="'+index.project_id+'">'+index.project_name+'</option>';
//		projects_name.push(index.project_name);
//		projects_id.push(index.project_id);
	});
	
	$('#dropdownAuto').select2();
	$('#dropdownAuto').html(html);
//	$("#txtSearch").autocomplete({
//	      source: projects_name
//	});
}

var initData = function (){
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/search",
		 type : "POST",
		 dataType:"json",
		 data:{"project_id" : ""},
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 pushDataToProjects(result);
		 }
	}); 
}

var dropdownSoKpi = function(){
	let html = "";
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/soitem",
		 type : "GET",
		 dataType:"json",
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 result.map(index => {
				html += '<option value="'+index.so_item_id+'">'+index.so_item_name+'</option>';
			 });
		 }
	});
	
	
	$('#dropdownSoKpi').select2({ 
		width : "100%"
	});
	$('#dropdownSoKpi').html(html);
}




var dropdownResponsible = function(){
	let html = "";
	respons = [];
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/responsible",
		 type : "GET",
		 dataType:"json",
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 result.map(index => {
//				 respons.push(index.emp_name);
				html += '<option value="'+index.emp_id+'">'+index.emp_name+'</option>';
			 });
		 }
	});
	
	$('#dropdownResponsible').select2({
		  width : "100%"
		 });
	$('#dropdownResponsible').html(html);

}
var dropdownOwner = function(){
	let html = "";
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/owner",
		 type : "GET",
		 dataType:"json",
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 result.map(index => {
				html += '<option value="'+index.org_id+'">'+index.org_name+'</option>';
			 });
		 }
	});
	
	$('#dropdownOwner').select2({
		  width : "100%"
		 });
	$('#dropdownOwner').html(html);
}
var editProject = function(){
	let project_name = $('#projectName').val();
	let so_kpi = null;
	let objective = $('textarea#projectObjective').val();
	let owner = null;
	let start_date = $('#startdatepicker').val();
	let end_date = $('#enddatepicker').val();
	let value = $('#projectValue').val();
	let risk = $('textarea#projectRisk').val();
	let responsible = null;
	let is_active = 0;
	if($('#ckbox').prop("checked") == true) is_active = 1;
	
	so_kpi = $('#dropdownSoKpi').val();
	owner = $('#dropdownOwner').val();
	responsible = $('#dropdownResponsible').val();
	// responsible = $('#projectResponsible').val();
	
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/"+id,
		 type : "PATCH",
		 dataType:"json",
		 data:{"project_name":project_name, "objective":objective, "org_id":owner, "emp_id":responsible, "project_start_date":start_date, "project_end_date":end_date, "project_value":value, "project_risk":risk, "is_active":is_active, "so_item_id": so_kpi},
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			if(result['status']==200){
				callFlashSlide("Update is Successfully.");   	  
		     }else if (result['status'] == "400"){
		    	 callFlashSlide("Update is Unsuccessfully");
		    }
	    }
	});
	$('#modalAddProject').hide();
	getDataFn("null");
}
var saveProject = function(option){
	let project_name = $('#projectName').val();
	let so_kpi = null;
	let objective = $('textarea#projectObjective').val();
	let owner = null;
	let start_date = $('#startdatepicker').val();
	let end_date = $('#enddatepicker').val();
	let value = $('#projectValue').val();
	let risk = $('textarea#projectRisk').val();
	let responsible = null;
	let is_active = 0;
	if($('#ckbox').prop("checked") == true) is_active = 1;
	
	so_kpi = $('#dropdownSoKpi').val();
	owner = $('#dropdownOwner').val();
	responsible = $('#dropdownResponsible').val();
	
		$.ajax({
				 url: restfulURL+"/"+serviceName+"/public/project",
				 type : "POST",
				 dataType:"json",
				 data:{"project_name":project_name, "objective":objective, "org_id":owner, "emp_id":responsible, "project_start_date":start_date, "project_end_date":end_date, "project_value":value, "project_risk":risk, "is_active":is_active, "so_item_id":so_kpi},
				 async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
				 success:function(result){
					 if(result['status']==200){
						 if(option == 1) $('#modalAddProject').hide();
			    		 callFlashSlide("Save Successfully."); 
			    		 getDataFn("null");
			    		 renderModal();
			    		 
				     }else if (result['status'] == "400"){
				    	 callFlashSlide("Save Unsuccessfully.");
				     }
			    }
		});
}

var renderModal = function(){
	$('#modalbody-projectname').html('<input data-toggle="tooltip" title=""'+
										'class="form-control input-sm searchAdvanceText span12"'+
										'placeholder="Project Name" type="text" id="projectName">');
	$('#modalbody-dropdownSoKpi').html('<select id="dropdownSoKpi" data-toggle="tooltip" title=""'+
										'class="input form-control input-sm span12" id="soKpi"'+
										'name="soKpi">'+
										'</select>');
	
//	$('#modalbody-projectObjective').html('<input data-toggle="tooltip" title=""'+ 
//										'class="form-control input-sm searchAdvanceText span12"'+
//										'placeholder="Objective" type="textarea" id="projectObjective" style="resize:vertical">');
	$('#modalbody-projectObjective').html('<textarea class="form-control input-sm searchAdvanceText span12" id="projectObjective" style="resize:vertical"></textarea>');
	$('#modalbody-dropdownOwner').html('<select id="dropdownOwner" data-toggle="tooltip" title=""'+
										  'class="input form-control input-sm span12" id="projectOwner"'+
										  'name="projectOwner">'+
										  '</select>');
	$('#modalbody-startdatepicker').html('<input type="text" class="form-control input-sm searchAdvanceText span12" id="startdatepicker">');
	
	$('#modalbody-enddatepicker').html('<input type="text" class="form-control input-sm searchAdvanceText span12" id="enddatepicker">');
	
	$('#modalbody-projectValue').html('<input data-toggle="tooltip" title=""'+
									  'class="form-control input-sm searchAdvanceText span12"'+
									  'placeholder="Project Value" type="text" id="projectValue">');
//	$('#modalbody-projectRisk').html('<input data-toggle="tooltip" title=""'+
//									'class="form-control input-sm searchAdvanceText span12"'+
//									'placeholder="Project Risk" type="textarea" id="projectRisk" style="resize:vertical">');
	$('#modalbody-projectRisk').html('<textarea class="form-control input-sm searchAdvanceText span12" id="projectObjective" style="resize:vertical"></textarea>');
	$('#modalbody-dropdownResponsible').html('<select id="dropdownResponsible" data-toggle="tooltip" title=""'+
											 'class="input form-control input-sm span12" id="projectResponsible"'+
											 'name="projectResponsible">'+
											  '</select>');
//	$('#modalbody-dropdownResponsible').html('<input data-toggle="tooltip" title=""'+
//			'class="form-control input-sm searchAdvanceText span12"'+
//			'placeholder="Responsible" type="text" id="projectResponsible" style="z-index: 9999999;">');
	
	$('#modalbody-checkbox').html('<input type="checkbox" class="form-check-input" id="ckbox" checked>');
	dropdownSoKpi();
	dropdownOwner();
	dropdownResponsible();
	$( "#startdatepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#enddatepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
	
	$("#createBtn").html('<button class="btn btn-primary" type="button" id="btnSave">Save</button>'+
						 '<button class="btn btn-primary" type="button" id="btnSaveandAdd">Save & Add Another</button>'+
						 '<button id="btnCancleAdd" data-dismiss="modal" class="btn btn-danger" type="button">Cancel</button>');
	
	
	btnListener();
}
var btnListener = function(){
	$('#btnCancleAdd').click(function(){
		$('#modalAddProject').hide();
	});
	
	$('#btnSave').click(function(){
		if(flagEdit == 0) saveProject(1);
		else editProject();
	});
	
	$('#btnSaveandAdd').click(function(){
		saveProject(0);
	});
}
var formatDate = function(date){
	let str = "";
	str += date[0]+"/"+date[1]+"/"+date[2];
	return str;
}
var getDataFn = function(project_id){
	if(project_id.localeCompare("null") == 0) project_id = null; 
 	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/search",
		 type : "POST",
		 dataType:"json",
		 data:{"project_id" : project_id},
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 	pushDataToProjects(result);
				var html = "";	 
		        result.map(index => {
		       	 	html += '<tr>';
		       	 	html += '<td style="text-align: left; padding: 0 10px;">'+index.project_name+'</td>';
		       	 	html += '<td style="text-align: left; padding: 0 10px;">'+index.org_name+'</td>';
		       	 	
		       	 	html += '<td style="text-align: right;">'+index.project_value+'</td>';
		   
		        	

		       	 	html += '<td style="text-align: center; padding: 0 10px;">'+formatDate(index.project_start_date.split("-"))+' - '+formatDate(index.project_end_date.split("-"))+'</td>';
		    	    html += '<td style="text-align: center;">'+
		    			'<div class="btn-group">'+
		    			'<button type="button" class="btn btn-warning" id="editBtn-'+index.project_id+'" >Edit</button>'+
		    			'<button type="button"  class="btn btn-danger" id="deleteBtn-'+index.project_id+'" >Delete</button>'+
		    			'</div>'+
		    			'</td>'+
		    			'</tr>';
				 });
		        
		        $('#DetailProjectList').html(html);
		        
		        result.map(index => {
		        	
		        $("#editBtn-"+index.project_id).click(function(){
		        	$('#projectName').val(index.project_name);
		        	$('#dropdownSoKpi').val(index.so_item_id);
		        	$('#dropdownSoKpi').trigger('change');
		        	$('textarea#projectObjective').val(index.objective);
		        	$('#dropdownOwner').val(index.org_id);
		        	$('#dropdownOwner').trigger('change');
		        	$('#dropdownResponsible').val(index.emp_id);
		        	$('#dropdownResponsible').trigger('change');
		        	$('#startdatepicker').val(index.project_start_date);
		        	$('#enddatepicker').val(index.project_end_date);
		        	$('#projectValue').val(index.project_value);
		        	$('textarea#projectRisk').val(index.project_risk);
		        	if(index.is_active == 0) $('#modalbody-checkbox').html('<input type="checkbox" class="form-check-input" id="ckbox">');
		        	$("#createBtn").html('<button class="btn btn-primary" type="button" id="btnSave">Save</button>'+
							 '<button id="btnCancleAdd" data-dismiss="modal" class="btn btn-danger" type="button">Cancel</button>');
		        	btnListener();
		        	flagEdit = 1;
		        	id = index.project_id;
		        	$('#modalAddProject').show();
		         });//end editBtn	
		        
		         $("#deleteBtn-"+index.project_id).click(function(){
		        	 confirmModal(index.project_id);
		          });//end deleteBtn
		       }); //end map
		 
		 }//end success
	});//end ajax
}

var confirmModal = function(index){
	$(this).scrollTop(0)
	$('#confrimModal').show();
	
	$('#btnCancleDelete').click(function(){
		$('#confrimModal').hide();
	});
	
	$('#btnConfirmOK').click(function(){
		$.ajax({
		    url: restfulURL+"/"+serviceName+"/public/project/"+index,
		     type : "DELETE",
			 async:false,
			 headers:{Authorization:"Bearer "+tokenID.token},
		     success: function(result) {
		    	 $('#confrimModal').hide();
		    	 if(result['status']==200){
		    		 callFlashSlide("Delete Successfully.");   	  
			     }else if (result['status'] == "400"){
			    	 callFlashSlide("Delete Unsuccessfully.");
			     }
		    	 getDataFn("null");
		    },
		     error:function(result){
		    	callFlashSlide("Delete Unsuccessfully.", result);
		    }
		});
	})
}


$(document).ready(function() {
	
	
	 username = $('#user_portlet').val();
	 password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			initData();
			renderModal();
			$('#confrimModal').hide();
			$("#AdvanceSearch").show();
			
			$('#btnSearch').click(function(){
//				let name = $('#txtSearch').val();
//				let index = projects_name.indexOf(name);
				let index = $('#dropdownAuto').val();
//				getDataFn(projects_id[index]);
				getDataFn(index);
				$('#projectList').show();
			});
			
			
			
			
			$('#addProject').click(function(){
				flagEdit = 0;
				$(this).scrollTop(0);
				renderModal();
				$('#modalAddProject').show();
			});
			
			$('#closeConfirm').click(function(){
				$('#confrimModal').hide();
			});
			
			$('#closeProject').click(function(){
				$('#modalAddProject').hide();
			});
		};
	};
});


