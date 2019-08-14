var gobalDataGroup=[];
var getDataGroupFn = function(){
	$.ajax({
		url:restfulURL + "/"+serviceName+"/public/result_threshold/group",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			var tgn_New = data.map(function(obj) { return obj.result_threshold_group_name; });
			tgn_New = tgn_New.filter(function(v,i) { return tgn_New.indexOf(v) == i; });
			gobalDataGroup['data_new'] = tgn_New;
			console.log(gobalDataGroup['first']);
			if(gobalDataGroup['first'] == true){
				var tgn_old = data.map(function(obj) { return obj.result_threshold_group_name; });
				tgn_old = tgn_old.filter(function(v,i) { return tgn_old.indexOf(v) == i; });
			   gobalDataGroup['data_old'] = tgn_old;
			   gobalDataGroup['first'] = false;
			}
			listGroupFn(data);
		}
	});
};
var clearGroupFn = function(){
	$("#createThreshold_name").val("");
	$("#form_threshold_name").val("");
	$('#form_is_active').prop('checked', false);
	$("#group_id").val("");
	$("#group_action").val("add");
};
var findOneGroupFn = function(id) {
	$.ajax({
		url:restfulURL+ "/"+serviceName+"/public/result_threshold/group/"+id,
		type : "get",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
	
			$("#EditValueType").val(data['value_type_id']);
			$("#form_threshold_name").val(data['result_threshold_group_name']);

			//IsAction
			if(data['is_active']==1){
				$('#form_is_active').prop('checked', true);
			}else{
				$('#form_is_active').prop('checked', false);
			}
		}
	});
};

var listGroupFn = function (data){
	var count=0;
	//alert("listCommonDataSetFn");
	var htmlTable = "";
	var IsActive ="";
	$.each(data,function(index,indexEntry) {
		count++;
		if (indexEntry["is_active"]=="1"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"1\" checked>";
		}else if (indexEntry["is_active"]=="0"){
			IsActive ="<input disabled type=\"checkbox\"  value=\"0\" >";
		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ count + "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["value_type_name"]+ "</td>";
		htmlTable += "<td class='columnSearch' style=\"vertical-align: middle;\">"+ indexEntry["result_threshold_group_name"]+ "</td>";
		htmlTable += "<td id=\"objectCenter\" >"+IsActive+"</td>";
		
		htmlTable += "<td id=\"objectCenter\" style=\"vertical-align: middle;\"><i class=\"fa fa-cog font-gear popover-edit-del2\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"<button class='btn btn-warning btn-xs edit2' id="+ indexEntry["result_threshold_group_id"]+ " data-target=#ModalEditGroup data-toggle='modal'>Edit</button>&nbsp;" ;
		htmlTable += "<button id="+indexEntry["result_threshold_group_id"]+" class='btn btn-danger btn-xs del2'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});

	$("#formListThresholdGroup").html(htmlTable);

	//function popover
	$(".popover-edit-del2").popover({
		delay : {
			hide : 100
		}
	});
	
	$("#formTableThresholdGroup").off("click",".popover-edit-del2");
	$("#formTableThresholdGroup").on("click",".popover-edit-del2",function(){
			$("#formTableThresholdGroup").off("click",".edit2");
			$(".edit2").on("click",function() {
				$(".btnModalClose").click();
				gobalDataGroup['Modal'] = "on";
				$("#ModalCreateGroup").modal('hide');
			 	$('#ModalEditGroup').on('hidden', function () {
			 		$("#ModalCreateGroup").modal('show');
			 		gobalDataGroup['Modal'] = "off";
			 		});
			clearGroupFn();
			$(this).parent().parent().parent().children().click();	
			findOneGroupFn(this.id);
			//$('#form_is_active').prop('checked', true);
			$('#form_is_active').off("change");
			$('#form_is_active').on("change",function(){
				if($('#form_is_active').is(':checked')){
					var validate = "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> Would you like to set this group as the active threshold group?";
					callFlashSlideInModal(validate,"#information3","error");
				}else{
					if($("#information3").text() == "× Would you like to set this group as the active threshold group?"){ $(".btnModalClose").click();}
				}
			});
			
			$("#group_id").val(this.id);
			$("#group_action").val("edit");		
			$(".edit2").off("click");
			
		});
		
		$("#formTableThresholdGroup").off("click",".del2");
		$(".del2").on("click",function(){
			gobalDataGroup['Modal'] = "on";
			$("#ModalCreateGroup").modal('hide');
		 	
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			 
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
			$('#confrimModal').on('hidden', function () {
		 		$("#ModalCreateGroup").modal('show');
		 		gobalDataGroup['Modal'] = "off";
		 		$('#confrimModal').off('hidden');
		 		});
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
			console.log(id);
				$.ajax({
					 url:restfulURL+"/"+serviceName+"/public/result_threshold/group/"+id,
					 type : "delete",
					 dataType:"json",
					 async:false,
					 headers:{Authorization:"Bearer "+tokenID.token},
					success:function(data){    
				    	 
					     if(data['status']==200){
					    	getDataGroupFn();
					       callFlashSlide("Delete Successfully.");
					       clearGroupFn();
					       $("#confrimModal").modal('hide');
					       
					     }else if (data['status'] == "400"){
					    	 callFlashSlideInModal(data['data'],"#inform_on_confirm","error");
					    	}
					 }
				});
				
			});
			
		});	
		
	});
	

};
var updateGroupFn = function () {

	var IsAction="";
	
	if($("#form_is_active:checked").is(":checked")){
		IsAction="1";
	}else{
		IsAction="0";
	}
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/result_threshold/group/"+$("#group_id").val(),
		type : "PATCH",
		dataType : "json",
		data : {
			"result_threshold_group_name":$("#form_threshold_name").val(),
			"is_active":IsAction,
			"value_type_id":$("#EditValueType").val()
		},	
		async:false,
		//headers:{Authorization:"Bearer "+tokenID.token},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if (data['status'] == "200") {
				getDataGroupFn();
				clearGroupFn();
				$('#ModalEditGroup').modal('hide');
				callFlashSlide("Update Successfully.");
				
			}else if (data['status'] == "400") {
				//alert("Error ?");information3
				callFlashSlideInModal(validationFn(data),"#information3","error");
			}
		}
	});
	return false;
}

var valuetypeListFn = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/result_threshold/value_type",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['value_type_id']){
					htmlOption+="<option selected value='"+indexEntry['value_type_id']+"'>"+indexEntry['value_type_name']+"</option>";
				}else{
					htmlOption+="<option  value='"+indexEntry['value_type_id']+"'>"+indexEntry['value_type_name']+"</option>";
					
				}
			});
			$("#ValueTypeName,#EditValueType").html(htmlOption);
		}
	});
	
}
$(document).ready(function(){
	 var username = $('#user_portlet').val();
	 var password = $('#pass_portlet').val();
	 var plid = $('#plid_portlet').val();
	 if(username!="" && username!=null & username!=[] && username!=undefined ){
	 	
		 if(connectionServiceFn(username,password,plid)==true){
			 
		
    	//alert(createTableFn());
    	var options={
    			"colunms":[
    						{"colunmsDisplayName":"Result Threshold Group","width":"25%","id":"result_threshold_group_name","colunmsType":"text"},
    			           {"colunmsDisplayName":"Begin Threshold","width":"20%","id":"begin_threshold","colunmsType":"text","colunmsDataType":"decimal"},
    			           {"colunmsDisplayName":"End Threshold","width":"20%","id":"end_threshold","colunmsType":"text","colunmsDataType":"decimal"},
    			           {"colunmsDisplayName":"Color","width":"15%","id":"color_code","colunmsType":"color"},
    			          ],
    			"form":[{
	     					"label":"Begin Threshold","inputType":"text","placeholder":"Begin Threshold",
	     					"id":"begin_threshold","width":"200px","dataTypeInput":"number","required":true
	     					},
	     					{
		     				"label":"End Threshold","inputType":"text","placeholder":"End Threshold",
		     				"id":"end_threshold","width":"200px","dataTypeInput":"number","required":true
		     				},
		     			/*	{
	        	    			"label":"Value Type","initValue":"","inputType":"cascades",
	        	    			"id":"value_type_id","width":"350px",
	        	    			"cascades":{
	        	    							"id"		:	"result_threshold_group_id",
	        	    							"listData"	:	"result_group"
	        	    						}
	        	    		},*/
		     				/*{
			     			"label":"Value Type","inputType":"dropdown",
			     			"id":"value_type_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/result_threshold/value_type","disabled": true,
			     			},*/
//    	    			    {
//    	    				"label":"Group","inputType":"dropdown","initValue":"","updateList":true,
//        	    			"id":"result_threshold_group_id","width":"200px","url":""+restfulURL+"/"+serviceName+"/public/result_threshold/group"
//        	    			},
//        	    			{
//        	    			"label":"Value Type","initValue":"","inputType":"cascades",
//        	    			"id":"value_type_id","width":"350px"/*, 
//        	    			"cascades":{
//        	    							"id"		:	"result_threshold_group_id",
//        	    							"listData"	:	"result_group"
//        	    						}*/
//        	    			},
		     				{
		        				"label":"Group","inputType":"dropdown","updateList":true,
		        				"id":"result_threshold_group_id","width":"250px","url":""+restfulURL+"/"+serviceName+"/public/result_threshold/group"
		        				},
		        				{
		        	    			"label":"Value Type","inputType":"cascades",
		        	    			"id":"value_type_id","width":"250px",
		        	    			"cascades":{
		        	    							"id"		:	"result_threshold_group_id",
		        	    							"listData"	:	"result_group"
		        	    						}
		        	    		},
        	    			{
        	    			"label":"Color","inputType":"color",
        	    			"id":"color_code","width":"70px","height":"27px","dataTypeInput":"color"
        	    			},
    	    					
    	    			],
    	    			
    	    			"advanceSearch":[{
        	 					"label":"Group","inputType":"dropdown",
        	 					"id":"result_threshold_group_id","width":"100%",
        	 					"url":""+restfulURL+"/"+serviceName+"/public/result_threshold/group",
        	 					"initValue":"All Group"
        	 					}],
    	    			
    			 "formDetail":{"formSize":"modal-dialog","formName":"Result Threshold","id":"resultThreshold","pk_id":"result_threshold_id"},       
    			 "serviceName":[restfulURL+"/"+serviceName+"/public/result_threshold"],
    			 "tokenID":tokenID,
    			 "pagignation":false,
    			 "expressSearch":false,
    			 "advanceSearchSet":true,
    			 "btnAdvanceSearchOption":{"id":"btnCreateGroup","name":"<i class=\"fa fa-plus-square\"></i>&nbsp;Add Group"}
    	}
    	//console.log(options['tokenID'].token);
    	createDataTableFn(options);
    	$('#ModalCreateGroup').off('hidden.bs.modal');
		$('#ModalCreateGroup').on('hidden.bs.modal', function (e) {

			
			e.stopPropagation();
			//console.log($(e.target).attr("data-toggle"));
			if($(e.target).attr("data-toggle") != "popover" && $(e.target).attr("data-toggle") == "modal"){
				//console.log("In : "+$(e.target).attr("data-toggle"));
				//console.log(gobalDataGroup['Modal']);
				var change = false;
				if(gobalDataGroup['Modal'] == "off"){
			 		$.each(gobalDataGroup['data_new'],function(index,indexEntry){
			 			
			 			if(indexEntry != gobalDataGroup['data_old'][index]){
			 				change = true;
			 			}
			 		});
			 		if(gobalDataGroup['data_new'].length != gobalDataGroup['data_old'].length){
		 				change = true;
		 			}
					}
				
				if(change == true){createDataTableFn(options);}
			}

	 		return false;
	 	});
 		$("#btnSaveEditGroup").click(function(){
 			updateGroupFn();
 		});
    	$(document).on('click','#btnCreateGroup',function(){
    		clearGroupFn();
    		valuetypeListFn();
    		gobalDataGroup['first'] = true;
    		gobalDataGroup['Modal'] = "off";
    		getDataGroupFn();
     		$("#ModalCreateGroup").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			});
     		
     		$("#btnSaveGroup").click(function(){
     			$(".btnModalClose").click();
     			gobalDataGroup['Modal'] = "on";
     			$("#ModalCreateGroup").modal('hide');
    			$("#confrimModalCreateGroup").modal({
    				"backdrop" : setModalPopup[0],
    				"keyboard" : setModalPopup[1]
    			});
     	    	$('#confrimModalCreateGroup').on('hidden', function () {
     	    		$("#ModalCreateGroup").modal('show');
     	    		gobalDataGroup['Modal'] = "off";
     	    		});
    			$(document).off("click","#btnConfirmGroupOK");
    			$(document).on("click","#btnConfirmGroupOK",function(){
    			
    				$.ajax({
    					 url:restfulURL+"/"+serviceName+"/public/result_threshold/group",
    					 type : "POST",
    					 dataType:"json",
    					 data:{"result_threshold_group_name" : $("#createThreshold_name").val(),"is_active":"1","value_type_id":$("#ValueTypeName").val()},
    					 async:false,
    					 headers:{Authorization:"Bearer "+tokenID.token},
    					success:function(data){    
    				    	 
    					     if(data['status']==200){
    					    	 clearGroupFn();
    					    	 getDataGroupFn();
    					    	 callFlashSlideInModal("Insert Data is Successfully.");
    					      
    					       $("#confrimModalCreateGroup").modal('hide');
    					       
    					     }else if (data['status'] == "400"){
    					    	 
    					    	 callFlashSlideInModal(data['data']['result_threshold_group_name'],"#inform_on_confirm2","error");
    					    	}
    					 }
    				});
    				
    				
    			});
     			
     		});     			 			
    	});

	 	}
	 }
    	
    });