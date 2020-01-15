
var list = [];
var flagEdit = 0;
var id = 0;
var getStrategicList = function () {
	list = [];
	let runnumber = 1;
		$.ajax({
			 url: restfulURL+"/"+serviceName+"/public/so",
			 type : "GET",
			 dataType:"json",
			 async:false,
			 headers:{Authorization:"Bearer "+tokenID.token},
			 success:function(result){
					data = result;
					var html = "";	 
			        result.map(index => {
			       	 	html += '<tr>';
			       	 	html += '<td style="text-align: left; padding: 0 10px;">'+runnumber+'</td>';
			       	 	html += '<td style="text-align: left; padding: 0 10px;" >'+index.name+'</td>';
			       	 	html += '<td style="text-align: left; padding: 0 10px;">'+index.abbr+'</td>';
			    	    html += '<td style="text-align: center;"><input type"text" disabled  style=" width: 30%; background-color:#'+index.color_code+'";></h4></td>';
			    	    
			    	    if(index.is_active == 1) html += '<td class="mktd" style="text-align: center;"><input type="checkbox" class="form-check-input" checked disabled></td>';
			    	    else html += '<td class="mktd" style="text-align: center;"><input type="checkbox" class="form-check-input" disabled></td>';
			    	    
			    	    html += '<td  style="text-align: center;">'+
			    			'<div class="btn-group">'+
			    			'<button type="button" class="btn btn-warning" id="editBtn'+index.id+'">Edit</button>'+
			    			'<button type="button"  class="btn btn-danger" id="deleteBtn'+index.id+'">Delete</button>'+
			    			'</div>'+
			    			'</td>'+
			    			'</tr>';
			    	     runnumber++;
			    	     list.push(index.id);
					 });
			        	$('#tableStrategic').html(html);
			        	
			        	
			        	result.map(index => {
			        		$("#deleteBtn"+index.id).click(function(){
			        			confirmModal(index.id);
			        		});
			      		
			        		
			        		$("#editBtn"+index.id).click(function(){
			        			flagEdit = 1;
			        			id = index.id;
			        			let num = list.indexOf(index.id);
			        			$('#seq').html('<input type="text" name="form_threshold_name" id="form_threshold_name"'+
			    						'placeholder="'+(num+1)+'" class="span12 m-b-n" style="width: 200px" disabled>');
			        			$('#strategic_objective_name').val(index.name);
			        			$('#abbreviation').val(index.abbr);
			        			getColor(index.color_code);
			        			getIsActive(index.is_active);
			        			$('#createBtn').html('<button class="btn btn-primary" type="button" id="btnSaveStrategic1">Save</button>'+
			        					 '<button data-dismiss="modal" class="btn btn-danger  btnCancleStrategic type="button">Cancel</button>"');
			        			 $("#btnSaveStrategic1").click(function(){
			        				 if(flagEdit != 1) saveStrategic(1);
			        				 else updateStrategic(1);
			        			 });
			        			 
			        			 $("#btnSaveStartegic2").click(function(){
			        				 if(flagEdit != 1) saveStrategic(2);
			        				 else updateStrategic(2);
			        			 });
			        			$('#ModalAddStrategic').modal('toggle');
			        		});
			        	});
		    }
		});
}

var getColor = function (option) {
	 $.getScript($("#url_portlet").val()+"/js/jscolor-2.0.4/jscolor.js", function(){

			jscolor.installByClassName("jscolor");

	});
	 
	 let html = "";
	 if(option.localeCompare("null") == 0) html +="<button id=\"btnColor-"+"button"+"\" name=\"btnColor-"+"button"+"\" class=\"btn jscolor {valueElement:null,value:'FFFFFF', onFineChange:'update(this)'} \" style='width:80px; height:30px; margin-right: 5px;'></button>";
	 else html +="<button id=\"btnColor-"+"button"+"\" name=\"btnColor-"+"button"+"\" class=\"btn jscolor {valueElement:null,value:'"+option+"', onFineChange:'update(this)'} \" style='width:80px;  height:30px; margin-right: 5px;'></button>";
	 html +="<div class='input-prepend input-append' >";
	 html +="	<span class='add-on'>#</span>";
	 html +="	<input "+""+" type=\"text\"  maxlength='6'  id='button' name=\""+"button"+"\" style='width: 80px;' class='m-b-n span4'>";
	 html +="</div>";
	 $('#color').html(html);
	 if(option.localeCompare("null") != 0) $('#button').val(option);
}

function update(picker) {
	let temp = picker.toHEXString();
	let text = temp.split("#");	
	$('#button').val(text[1]);
}

var getIsActive = function (option) {
	if(option == 1) $('#is_active').html('<input type="checkbox" class="form-check-input" id="checkbox" checked>');
	else $('#is_active').html('<input type="checkbox" class="form-check-input" id="checkbox" >');
}

var addStrategic = function () {
	flagEdit = 0;
	let count;
		$.ajax({
			 url: restfulURL+"/"+serviceName+"/public/so/objective_length",
			 type : "GET",
			 dataType:"json",
			 data: "",
			 async:false,
			 headers:{Authorization:"Bearer "+tokenID.token},
			 success:function(result){
				count = result;
		    }
		});
		
	
		 
		 $('#seq').html('<input type="text" name="form_threshold_name" id="form_threshold_name"'+
						'placeholder="'+(count+1)+'" class="span12 m-b-n" style="width: 200px;" disabled>');
		
		 $('#so_name').html('<input type="text" name="strategic_objective_name" id="strategic_objective_name" placeholder="Strategic Objective Name" class="span12 m-b-n" style="width: 200px;">');
		 
		 
		 $('#so_abbr').html('<input type="text" name="abbreviation" id="abbreviation" placeholder="Abbreviation" class="span12 m-b-n" style="width: 200px;">');
		 
		 $('#createBtn').html('<button class="btn btn-primary" type="button" id="btnSaveStrategic1">Save</button>'+
				 '<button class="btn btn-primary" type="button" id="btnSaveStartegic2">Save & Add Another</button>'+
		 		 '<button data-dismiss="modal" class="btn btn-danger  btnCancleStrategic type="button">Cancel</button>"');
         
		 
		 	
		 getColor("null");
		 getIsActive(1);
		 $("#btnSaveStrategic1").click(function(){
			 if(flagEdit != 1) saveStrategic(1);
			 else updateStrategic(1);
		 });
		 
		 $("#btnSaveStartegic2").click(function(){
			 if(flagEdit != 1) saveStrategic(2);
			 else updateStrategic(2);
		 });
}


var saveStrategic = function (option) { 
	let so_name = $('#strategic_objective_name').val();
	let so_abbr = $('#abbreviation').val();
	let color_code = $('#button').val();
	let is_active = 0;
	if($('#checkbox').prop("checked") == true) is_active = 1;
    
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/so",
		 type : "POST",
		 dataType:"json",
		 data:{"name" : so_name, "abbr": so_abbr, "color_code": color_code, "is_active": is_active},
		 async:false,
		 headers:{Authorization:"Bearer "+tokenID.token},
		 success:function(result){
			 if(result['status']==200){
	    		 callFlashSlide("Save Successfully.");   	  
		     }else if (result['status'] == "400"){
		    	 callFlashSlide("Save Unsuccessfully.");
		     }
	    }
	});
	getStrategicList();
	addStrategic();
	if(option == 1) $('#ModalAddStrategic').modal('toggle');
 	
}
var updateStrategic = function(option){
	let so_name = $('#strategic_objective_name').val();
	let so_abbr = $('#abbreviation').val();
	let color_code = $('#button').val();
	let is_active = 0;
	if($('#checkbox').prop("checked") == true) is_active = 1;
    
	$.ajax({
		 url: restfulURL+"/"+serviceName+"/public/so/"+id,
		 type : "PATCH",
		 dataType:"json",
		 data:{"name" : so_name, "abbr": so_abbr, "color_code": color_code, "is_active": is_active},
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
	getStrategicList();
	addStrategic();
	if(option == 1) $('#ModalAddStrategic').modal('toggle');
}
var confirmModal = function(index){
	$(this).scrollTop(0)
	$('#confrimModal').show();
	
	$('#btnCancleDelete').click(function(){
		$('#confrimModal').hide();
	});
	
	$('#btnConfirmOK').click(function(){
		$.ajax({
		    url: restfulURL+"/"+serviceName+"/public/so/"+index,
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
		    	getStrategicList();	
		    },
		     error:function(result){
		    	callFlashSlide("Delete Unsuccessfully.", result);
		    }
		});
	})
}

$(document).ready(function(){
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
			 $('#confrimModal').hide();
			 getStrategicList();
			 
			 
			 
			 //Listener
			 $("#addBtn").click(function(){ 
				addStrategic();
			 });
			 
			 $("#closeConfirm").click(function(){ 
					$('#confrimModal').hide();
			 });
 
		 }
	 }
    
});