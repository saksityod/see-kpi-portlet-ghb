var username = "";
var password = "";
var GlobalData = [];
var tempDaleteID = undefined;
var tempEditID = undefined;
var AddOrUpdate = true;
var project_id=$('#dropdownProject').val();
var project_item_id=$('#dropdownProjectKpi').val();

// ดึงข้อมูล เพื่อ แสดง ข้อมูล หน้า เริ่มต้น (id DetailProjectKpiList )
var getDataFn= function(){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item",
		type:"get",
		datatype:"json",
		async : false,
		data:{
			"project_id":project_id,
			"project_item_id":project_item_id
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var TBhtml = "";
			var count =0;
			$.each(data['data'],function(items,itemsEntry){
				GlobalData.push(itemsEntry);
				let item_id= itemsEntry['project_item_id'];
				TBhtml += `
					<tr>
						<td style="text-align: left;">${itemsEntry['project_item_name']}</td>
						<td style="text-align: left;">${itemsEntry['project_name']}</td>
						${itemsEntry['is_active']==1?
						 	'<td style="text-align: left;padding-left: 2%;"><input type="checkbox" class="form-check-input" id="ckbox"+${item_id} checked disabled></td>'
						 	:'<td style="text-align: left;padding-left: 2%;"><input type="checkbox" class="form-check-input" id="ckbox"+${item_id} disabled></td>'
						 }
						<td style="text-align: left;">
						<button data-toggle="modal"  data-backdrop="static" data-target="#modalAddProjectKpi" class="btn btn-warning" id="edit-projectkpi-${itemsEntry['project_item_id']}">${Liferay.Language.get('edit')}</button>
						<button data-toggle="modal"  data-backdrop="static" data-target="#confrimModal" class="btn btn-danger" id="delete-projectkpi-${itemsEntry['project_item_id']}">${Liferay.Language.get('delete')}</button>
						</td>
					</tr>
				`;
				count++;
			});
			
			$('#DetailProjectKpiList').html(TBhtml);
		}
	});
	// map เพื่อ set onclick ของ edit และ delete
	GlobalData.map(item =>{
		$('#edit-projectkpi-'+item.project_item_id).click(function(){
			AddOrUpdate = false;
			tempEditID=item.project_item_id;
			$('#txtAddProject').val(item.project_item_name);
			$('#dropdownAddUOM').val(item.uom_id).trigger('change');
			$('#dropdownAddValueType').val(item.value_type_id).trigger('change');
			$('#dropdownAddFuncType').val(item.function_type).trigger('change');
		    $("#ckboxadd").prop("checked",item.is_active==1?true:false);
		    var setSelect = item.project_id;
		    var select = [];
		    setSelect.map(selected =>{
		    	select.push(selected);
		    });
		    $('#dropdownAddProject').val(select).trigger('change');
		});
		
		$('#delete-projectkpi-'+item.project_item_id).click(function(){
			tempDaleteID = item.project_item_id;
		});
	});
	
}

//drop-down search (Dropdown project_kpi name *ซ้ายสุด)
var dropdownProjectKpi = function(){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item/dropdown_project_kpi_name",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(datas){
			var html = "";
			html += '<option  value="">'+Liferay.Language.get('select-project-kpi-name')+'</option>';
			$.each(datas['data'],function(items,itemsEntry){
				html += `
					<option id="projectkpi-${itemsEntry['id']}" value="${itemsEntry['id']}">
						${itemsEntry['name']}
					</option>
				`;
			});

			$('#dropdownProjectKpi').html(html);
			
		}
	});
	$('#dropdownProjectKpi').select2({
		width : "100%",
	});
}

//drop-down search (Dropdown project name *อันดับที่2จากซ้าย)
var dropdownProject = function(){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item/dropdown_project_name",
		type:"get",
		datatype:"json",
		async : false,
		data:{
			"project_item_id":$('#dropdownProjectKpi').val()
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(datas){
			var html = "";
			html += '<option  value="">'+Liferay.Language.get('select-project-name')+'</option>';
			$.each(datas['data'],function(items,itemsEntry){
				html +=`
					<option id="project-${itemsEntry['id']}" value="${itemsEntry['id']}">
					${itemsEntry['name']}
					</option>
				`;
			});

			$('#dropdownProject').html(html);
			
		}
	});
	$('#dropdownProject').select2({
		width : "100%",
	});
}

// Drop down Project ใน modal modalAddProjectKpi
var dropdownAddProject = function(){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item/dropdown_project_name",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(datas){
			var html = "";
			
			$.each(datas['data'],function(items,itemsEntry){
				html += `
					<option id="select-${itemsEntry['id']}" value="${itemsEntry['id']}">
					${itemsEntry['name']}
					</option>
				`;
			});

			$('#dropdownAddProject').html(html);
			
		}
	});
	$('#dropdownAddProject').select2({
		width : "100%",
		dropdownAutoWidth : false,
	});
}

//Drop down UOM ใน modal modalAddProjectKpi
var dropdownAddUOM =function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_uom",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html +=`
					<option id="UOM${itemsEntry['uom_id']}" value="${itemsEntry['uom_id']}">
					${itemsEntry['uom_name']}
					</option>
				`; 
			});
			
			$('#dropdownAddUOM').html(html);
		}
	});
	$('#dropdownAddUOM').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

//Drop down Value Type ใน modal modalAddProjectKpi
var dropdownAddValueType = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_value_type",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html +=`
					<option id="VT${itemsEntry['value_type_id']}" value="${itemsEntry['value_type_id']}">
					${itemsEntry['value_type_name']}
					</option>
				`; 
				});

			$('#dropdownAddValueType').html(html);
		}
	});
	$('#dropdownAddValueType').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

//Drop down Function Type ใน modal modalAddProjectKpi
var dropdownAddFuncType = function(){
	var html = "";
	html += `<option value="1" id="FT1">Sum</option>`;
	html += `<option value="2" id="FT2">Last</option>`;
	html += `<option value="3" id="FT3">AVG</option>`; 
	
	$('#dropdownAddFuncType').html(html);
	$('#dropdownAddFuncType').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

//Delete ข้อมูล
var deleteProjectKPI = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item/"+tempDaleteID,
		type:"DELETE",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				callFlashSlide(Liferay.Language.get('delete-successfully'));
				clearData();
				getDataFn();
				$('#confrimModal').modal('hide');
			}else if(data['status']=="400"){
				callFlashSlide(Liferay.Language.get('delete-failed'));
			}
		}
	});
}

//เพิ่ม ข้อมูล
var addProjectKPI = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item",
		type:"POST",
		datatype:"json",
		async : false,
		data:{
			"name": $('#txtAddProject').val(),
			"uom_id": $('#dropdownAddUOM').val(),
		    "value_type_id" :$('#dropdownAddValueType').val(),
		    "function_type" :$('#dropdownAddFuncType').val(),
		    "is_active" : $("#ckboxadd").prop("checked")?1:0,
		    "project_id":$('#dropdownAddProject').val()
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				callFlashSlide(Liferay.Language.get('add-data-successfully'));
				clearData();
				dropdownProject();
				getDataFn();
			}else if(data['status']==400){
				$('#txtAddProject').val('');
				callFlashSlide(Liferay.Language.get('project-kpi-name-use-to-be-use'));
			}else{
				callFlashSlide(Liferay.Language.get('something-wrong'));
			}
		}
	});
}

//Update ข้อมูล
var editProjectKPI = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/project_kpi_item/"+tempEditID,
		type:"PATCH",
		datatype:"json",
		async : false,
		data:{
			"name": $('#txtAddProject').val(),
			"uom_id": $('#dropdownAddUOM').val(),
		    "value_type_id" :$('#dropdownAddValueType').val(),
		    "function_type" :$('#dropdownAddFuncType').val(),
		    "is_active" : $("#ckboxadd").prop("checked")?1:0,
		    "project_id":$('#dropdownAddProject').val()
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				callFlashSlide("Update data Successfully.");
				clearData();
				dropdownProject();
				getDataFn();
			}else if(data['status']==400){
				$('#txtAddProject').val('');
				callFlashSlide(Liferay.Language.get('project-kpi-name-use-to-be-use'));
			}else{
				callFlashSlide(Liferay.Language.get('something-wrong'));
			}
		}
	});
}

// Clear ข้อมูลเป็น ค่าเริ่มต้น
var clearData = function(){
	GlobalData = [];
	tempDaleteID = undefined;
	tempEditID = undefined;
	AddOrUpdate = true;
	$('#txtAddProject').val('');
	$('#dropdownAddProject').val('').trigger('change');
	$("#ckboxadd").prop("checked",true);
}

$(document).ready(function() {
	
	
	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	$('#txtSearch').val('');
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			
			dropdownProjectKpi();
			dropdownProject();
			dropdownAddUOM();
			dropdownAddValueType();
			dropdownAddFuncType();
			dropdownAddProject();
			$("#AdvanceSearch").show();
			
			//Click button Search
			$('#btnSearch').click(function(){
				project_id=$('#dropdownProject').val();
				project_item_id=$('#dropdownProjectKpi').val();
				getDataFn();
				$('#ProjectKpilist').show();
			});
			
			//Click button Add Project KPI
			$('#btnSubmitAddProjectKPI').click(function(){
				if(AddOrUpdate==true){
					addProjectKPI();
					$('#modalAddProjectKpi').modal('hide');
					
				}else{
					editProjectKPI();
					$('#modalAddProjectKpi').modal('hide');
				}
				dropdownProjectKpi();
				dropdownProject();
			});
			
			//Click button Add Another Add Project KPI
			$('#btnAddAnotherAddProjectKPI').click(function(){
				if(AddOrUpdate==true){
					addProjectKPI();
				}else{
					editProjectKPI();
				}
				dropdownProjectKpi();
				dropdownProject();
			});
			
			//Click button cancel ใน Modal
			$('#btnCancleAddProjectKPI').click(function(){
				$("#ckboxadd").prop("checked",true);
				$('#txtAddProject').val('');
				$('#dropdownAddProject').val('').trigger('change');
			});
			
			//Drop Down ProjectKpi ตอน เปลื่ยน ข้อมูล
			$('#dropdownProjectKpi').change(function(){
				dropdownProject();
			});
			
			//กดยืนยันลบ
			$('#btnConfirmOK').click(function(){
				deleteProjectKPI();
			})
			
		};
	};
});


