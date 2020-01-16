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
	html += `<option value="null">${Liferay.Language.get('select-list-item')}</option>`;
	
	result.map(item =>{
		html += `<option value="${item.id}">${item.name}</option>`;
	});
	
	$('#dropdownAuto').select2();
	$('#dropdownAuto').html(html);

}

var initData = function (){
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/project/search",
		 type : "get",
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
				html += `<option value="${index.id}">${index.name}</option>`;
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
				html += `<option value="${index.emp_id}">${index.emp_name}</option>`;
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
				html += `<option value="${index.org_id}">${index.org_name}</option>`;
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
		 data:{
			 "name":project_name,
			 "objective":objective,
			 "org_id":owner, "emp_id":responsible,
			 "date_start":start_date,
			 "date_end":end_date,
			 "value":value,
			 "risk":risk,
			 "is_active":is_active,
			 "so_item_id": so_kpi
		 	},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(result){
			if(result['status']==200){
				callFlashSlide(Liferay.Language.get('update-successfully'));   	  
			}else if (result['status'] == "400"){
		    	callFlashSlide(Liferay.Language.get('update-unsuccessfully'));
		    }
	    }
	});
	$('#modalAddProject').modal('hide');
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
				 data:{
					 "name":project_name,
					 "objective":objective,
					 "org_id":owner,
					 "emp_id":responsible,
					 "date_start":start_date,
					 "date_end":end_date,
					 "value":value,
					 "risk":risk,
					 "is_active":is_active,
					 "so_kpi_id":so_kpi
					 },
				 async:false,
				 headers:{Authorization:"Bearer "+tokenID.token},
				 success:function(result){
					 if(result['status']==200){
						if(option == 1) $('#modalAddProject').modal('hide');
				    		callFlashSlide(Liferay.Language.get('save-success')); 
				    		getDataFn("null");
				    		renderModal();	 
				     }else if (result['status'] == "400"){
				    	callFlashSlide(Liferay.Language.get('save-unsuccess'));
				     }
			    }
		});
}

var renderModal = function(){
	$('#modalbody-projectname').html(`<input data-toggle="tooltip" title=""
										class="form-control input-sm searchAdvanceText span12"
										placeholder="Project Name" type="text" id="projectName">`);
	$('#modalbody-dropdownSoKpi').html(`<select id="dropdownSoKpi" data-toggle="tooltip" title=""
										class="input form-control input-sm span12" id="soKpi"
										name="soKpi">
										</select>`);
	
	$('#modalbody-projectObjective').html(`<textarea class="form-control input-sm searchAdvanceText span12" id="projectObjective" style="resize:vertical"></textarea>`);
	$('#modalbody-dropdownOwner').html(`<select id="dropdownOwner" data-toggle="tooltip" title=""
										  class="input form-control input-sm span12" id="projectOwner"
										  name="projectOwner">
										  </select>`);
	$('#modalbody-startdatepicker').html(`<input type="text" class="form-control input-sm searchAdvanceText span12" id="startdatepicker">`);
	
	$('#modalbody-enddatepicker').html(`<input type="text" class="form-control input-sm searchAdvanceText span12" id="enddatepicker">`);
	
	$('#modalbody-projectValue').html(`<input data-toggle="tooltip" title=""
									  class="form-control input-sm searchAdvanceText span12"
									  placeholder="Project Value" type="text" id="projectValue">`);

	$('#modalbody-projectRisk').html(`<textarea class="form-control input-sm searchAdvanceText span12" id="projectObjective" style="resize:vertical"></textarea>`);
	$('#modalbody-dropdownResponsible').html(`<select id="dropdownResponsible" data-toggle="tooltip" title=""
											 class="input form-control input-sm span12" id="projectResponsible"
											 name="projectResponsible">
											 </select>`);
	
	$('#modalbody-checkbox').html(`<input type="checkbox" class="form-check-input" id="ckbox" checked>`);
	dropdownSoKpi();
	dropdownOwner();
	dropdownResponsible();
	$( "#startdatepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
	$( "#enddatepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
	
	$("#createBtn").html(`<button class="btn btn-primary" type="button" id="btnSave">Save</button>
						 <button class="btn btn-primary" type="button" id="btnSaveandAdd">Save & Add Another</button>
						 <button id="btnCancleAdd" data-dismiss="modal" class="btn btn-danger" type="button">Cancel</button>`);
	
	
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
		 type : "GET",
		 dataType:"json",
		 data:{"project_id" : project_id},
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 	pushDataToProjects(result);
				var html = "";	 
		        result.map(index => {
		       	 	html += `<tr>
			       	 			<td style="text-align: left; padding: 0 10px;">${index.name}</td>
			       	 			<td style="text-align: left; padding: 0 10px;">${index.org_name}</td>
			       	 			<td style="text-align: right;">${index.value}</td>
		       	 				<td style="text-align: center; padding: 0 10px;">${formatDate(index.date_start.split("-"))}-${formatDate(index.date_end.split("-"))}</td>
		       	 				<td style="text-align: center;">
		       	 					<div class="btn-group">
		       	 					<button data-toggle="modal"  data-backdrop="static" data-target="#modalAddProject" type="button" class="btn btn-warning" id="editBtn-${index.id}" >Edit</button>
		       	 					<button data-toggle="modal"  data-backdrop="static" data-target="#confrimModal" type="button" class="btn btn-danger" id="deleteBtn-${index.id}" >Delete</button>
		       	 					</div>
		       	 				</td>
		       	 			</tr>
		       	 			`;
				 });
		        
		        $('#DetailProjectList').html(html);
		        
		        result.map(index => {
		        	
		        $("#editBtn-"+index.id).click(function(){
		        	$('#projectName').val(index.name);
		        	$('#dropdownSoKpi').val(index.so_kpi_id);
		        	$('#dropdownSoKpi').trigger('change');
		        	$('textarea#projectObjective').val(index.objective);
		        	$('#dropdownOwner').val(index.org_id);
		        	$('#dropdownOwner').trigger('change');
		        	$('#dropdownResponsible').val(index.emp_id);
		        	$('#dropdownResponsible').trigger('change');
		        	$('#startdatepicker').val(index.start_date);
		        	$('#enddatepicker').val(index.end_date);
		        	$('#projectValue').val(index.value);
		        	$('textarea#projectRisk').val(index.risk);
		        	if(index.is_active == 0) $('#modalbody-checkbox').html(`<input type="checkbox" class="form-check-input" id="ckbox">`);
		        	$("#createBtn").html(`<button class="btn btn-primary" type="button" id="btnSave">Save</button>
							 <button id="btnCancleAdd" data-dismiss="modal" class="btn btn-danger" type="button">Cancel</button>`);
		        	btnListener();
		        	flagEdit = 1;
		        	id = index.id;
		         });//end editBtn	
		        
		         $("#deleteBtn-"+index.id).click(function(){
		        	 confirmModal(index.id);
		          });//end deleteBtn
		       }); //end map
		 
		 }//end success
	});//end ajax
}

var confirmModal = function(index){
	$(this).scrollTop(0)
	
	$('#btnConfirmOK').click(function(){
		$.ajax({
		    url: restfulURL+"/"+serviceName+"/public/project/"+index,
		     type : "DELETE",
			 async:false,
			 headers:{Authorization:"Bearer "+tokenID.token},
		     success: function(result) {
		    	 $('#confrimModal').modal('hide');
		    	 if(result['status']==200){
		    		 callFlashSlide(Liferay.Language.get('delete-successfully'));   	  
			     }else if (result['status'] == "400"){
			    	 callFlashSlide(Liferay.Language.get('delete-unsuccessfully'));
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
			//$('#confrimModal').modal('hide');
			$("#AdvanceSearch").show();
			
			$('#btnSearch').click(function(){

				let index = $('#dropdownAuto').val();

				getDataFn(index);
				$('#projectList').show();
			});
			
			$('#addProject').click(function(){
				flagEdit = 0;
				$(this).scrollTop(0);
				renderModal();
			});
			
			$('#closeConfirm').click(function(){
				$('#confrimModal').modal('hide');
			});
			
			$('#closeProject').click(function(){
				$('#modalAddProject').modal('hide');
			});
			
			$('#btnCancleDelete').click(function(){
				$('#confrimModal').modal('hide');
			});
		};
	};
});


