var username = "";
var password = "";
var GlobalData = [];
var AddOrUpdate = true;
var tempUpdateID =undefined ;
var tempDaleteID = undefined;



// auto complete  search
var autocomplteSearch = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/autocomplete",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(datas){
			var data = [];
			$.each(datas['data'],function(items,itemsEntry){
				data.push(itemsEntry['item_name']);
			})
			$( "#txtSearch" ).autocomplete({
			      source: data
			 });
			jQuery.ui.autocomplete.prototype._resizeMenu = function () {
				  var ul = this.menu.element;
				  ul.outerWidth(this.element.outerWidth());
			}
		}
	});
}

// ADD SO KPI 
var dropdownAddSO= function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_so",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html += `<option id="SO${itemsEntry['id']}" value=${itemsEntry['id']} > ${itemsEntry['name']} </option>`;
			});
			$('#dropdownAddSO').html(html);
		}
	});
	$('#dropdownAddSO').select2({
		minimumResultsForSearch: -1,
		width:"100%",
	});
	
	
}

// ADD SO KPI 
var dropdownAddSmartKpi = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_smart_kpi",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			html += `<option id="SK0" value=0>  </option>`;
			$.each(data['data'],function(items,itemsEntry){
				html += `<option id="SK${itemsEntry['item_id']}" value=${itemsEntry['item_id']} > ${itemsEntry['item_name']} </option>`;
			});
			$('#dropdownAddSmartKpi').html(html);
		}
	});
	$('#dropdownAddSmartKpi').select2({
		width : "100%",
		dropdownAutoWidth : false,
		
			
	});
}

// ADD SO KPI 
var dropdownAddUOM =function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_uom",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html += `<option id="UOM${itemsEntry['uom_id']}" value=${itemsEntry['uom_id']} > ${itemsEntry['uom_name']} </option>`;
			});
			
			$('#dropdownAddUOM').html(html);
		}
	});
	$('#dropdownAddUOM').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

// ADD SO KPI 
var dropdownAddValueType = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_value_type",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html += `<option id="VT${itemsEntry['value_type_id']}" value=${itemsEntry['value_type_id']} > ${itemsEntry['value_type_name']}</option>`;
			});

			$('#dropdownAddValueType').html(html);
		}
	});
	$('#dropdownAddValueType').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

// ADD SO KPI 
var dropdownAddFuncType = function(){
	var html = "";
	html += `<option value='1' id='FT1'>Sum</option>`;
	html += `<option value='2' id='FT2'>Last</option>`;
	html += `<option value='3' id='FT3'>AVG</option>`; 
	
	$('#dropdownAddFuncType').html(html);
	$('#dropdownAddFuncType').select2({
		minimumResultsForSearch: -1,
  		width : "100%",
	});
}

// advance search
var dropdownSO = function(){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/dropdown_so_item_name",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			html += `<option value=''>-- All SO Item --</option>`;
			$.each(data['data'],function(items,itemsEntry){
				html += `<option value="itemsEntry['id']" >${itemsEntry['name']}</option>`;
			});
			$('#dropdownSO').html(html);
		}
	})
	
}

var EditFn = function(id){
	SetPositionModal();
	
	AddOrUpdate = false;
	tempupdateID = GlobalData[id]['so_item_id'];
	
	$('#soName').val(GlobalData[id]['so_item_name']);
	$('#dropdownAddUOM').val(GlobalData[id]['uom_id']).trigger('change');
	$('#dropdownAddSmartKpi').val(GlobalData[id]['item_id']).trigger('change');
	$('#dropdownAddValueType').val(GlobalData[id]['value_type_id']).trigger('change');
	$('#dropdownAddFuncType').val(GlobalData[id]['function_type']).trigger('change');
	$('#dropdownAddSO').val(GlobalData[id]['so_id']).trigger('change');

	$('#modalAddSOKPI').show();
}

var DeleteFn = function(id){
	SetPositionModal();
	tempDaleteID = id;
	$('#confrimModal').show();
}
var DeleteConfirm = function(id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/"+GlobalData[id]['so_item_id'],
		type:"DELETE",
		dataType:"json",
	 	async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){ 
			if(data['status']==200){
				callFlashSlide("Delete Successfully.");
				clearData();
				getDataFn();
					   
			}else if(data['status']=="400"){
				callFlashSlide("Delete Successfully.");
					
			}
		}
	});
}

var getDataFn = function(){
	
	var TBhtml = ""
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/get_so_item_list",
		type:"get",
		datatype:"json",
		async : false,
		data:{
			"so_id":$('#dropdownSO').val(),
			"item_name":$('#txtSearch').val()
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var TBhtml = "";
			var count =0;
			$.each(data['data'],function(items,itemsEntry){
				GlobalData.push(itemsEntry);
				TBhtml += `<tr>
								<td style="text-align: left;">${itemsEntry['so_item_name']}</td>
								<td style="text-align: left;">${itemsEntry['so_name']}</td>
								<td style="text-align: left;">${itemsEntry['item_name']}</td>
								<td style="text-align: center;padding-right: 2%;"><input type="checkbox" class="form-check-input" id="ckbox" checked disabled></td>
								<td style="text-align: left;">
								<button data-toggle="modal"  data-backdrop="static" data-target="#modalAddSOKPI" class="btn btn-warning" id="edit-${count}" onclick=EditFn(${count})>${Liferay.Language.get('edit')}</button>
								<button data-toggle="modal"  data-backdrop="static" data-target="#confrimModal" class="btn btn-danger" id="delete-${count}" onclick=DeleteFn(${count})>${Liferay.Language.get('delete')}</button>
								</td>
							</tr>
							`;
				count++;
			});
			
			$('#DetailSOKpiList').html(TBhtml);
		}
	})

}

var addSOItem = function(){
	
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item",
		type:"post",
		headers:{Authorization:"Bearer "+tokenID.token},
		async : false,
		datatype:"json",
		data:{
			"so_id": parseInt($('#dropdownAddSO').val()),
            "name":$('#soName').val(),
            "item_id": parseInt($('#dropdownAddSmartKpi').val()),
            "uom_id": parseInt($('#dropdownAddUOM').val()),
            "value_type_id":  parseInt($('#dropdownAddValueType').val()),
            "function_type": parseInt($('#dropdownAddFuncType').val()),
            "is_active" : $("#ckboxadd").prop("checked")?1:0,
		},
		success:function(data){
			if(data['status']==200){
				callFlashSlide(Liferay.Language.get('add-data-successfully'));
				clearData();
				dropdownSO();
				getDataFn();
				$('#SOKpiList').show();
			}else if(data['status']==400){
				$('#soName').val('');
				callFlashSlide(Liferay.Language.get('so-kpi-name-use-to-be-use'));
			}else{
				callFlashSlide(Liferay.Language.get('something-wrong'));
			}
		}
	})
}

var updateSOItem = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_item/"+tempupdateID,
		type:"PATCH",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		datatype:"json",
		data:{
			"so_id": parseInt($('#dropdownAddSO').val()),
            "name":$('#soName').val(),
            "item_id": parseInt($('#dropdownAddSmartKpi').val()),
            "uom_id": parseInt($('#dropdownAddUOM').val()),
            "value_type_id":  parseInt($('#dropdownAddValueType').val()),
            "function_type": parseInt($('#dropdownAddFuncType').val()),
            "is_active" : $("#ckboxadd").prop("checked")?1:0,
		},
		success:function(data){
			if(data['status']==200){
			callFlashSlide(Liferay.Language.get('update-successfully'));
			clearData();
			getDataFn();
			$('#SOKpiList').show();
			}else if(data['status']==400){
				$('#soName').val('');
				callFlashSlide(Liferay.Language.get('so-kpi-name-use-to-be-use'));
			}else{
				callFlashSlide(Liferay.Language.get('something-wrong'));
			}
		}
	})
}

var clearData = function(){
	GlobalData = [];
	AddOrUpdate = true;
	tempUpdateID = undefined;
	tempDaleteID
	$('#soName').val('');
}

var SetPositionModal = function(){
	$(this).scrollTop(0);
}

var setDefault = function(){
	$('#soName').val('');
	$('#dropdownAddUOM').val(8).trigger('change');
	$('#dropdownAddSmartKpi').val(0).trigger('change');
	$('#dropdownAddValueType').val(1).trigger('change');
	$('#dropdownAddFuncType').val(1).trigger('change');
	$('#dropdownAddSO').val(1).trigger('change');
}

$(document).ready(function() {
	
	
	 username = $('#user_portlet').val();
	 password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	$('#txtSearch').val('');
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			dropdownSO();
			autocomplteSearch();
			dropdownAddFuncType();
			dropdownAddValueType();
			dropdownAddUOM();
			dropdownAddSmartKpi();
			dropdownAddSO();
			$("#AdvanceSearch").show();
			
			$('#btnSearch').click(function(){
				getDataFn();
				$('#SOKpiList').show();
				SetPositionModal();
			});
			
			$('#addSOKpi').click(function(){
				SetPositionModal();
				setDefault();
			});
			
			$('#btnCancleEditSO').click(function(){
				$('#modalAddSOKPI').modal('hide');
				AddOrUpdate = true;
				tempupdateID = undefined;
				setDefault();
			});
			
			$('#btnSubmitAddSO').click(function(){
				if(AddOrUpdate==true){
					addSOItem();
					$('#modalAddSOKPI').modal('hide');
				}else{
					updateSOItem();
					$('#modalAddSOKPI').modal('hide');
				}
			});
			
			$('#btnCancleAddSO').click(function(){
				$('#modalAddSOKPI').modal('hide');
				AddOrUpdate = true;
				tempupdateID = undefined;
				setDefault();
			});
			
			$('#btnAddAnotherAddSO').click(function(){
				if(AddOrUpdate==true){
					addSOItem();
				}else{
					updateSOItem();
				}
			});
			
			$('#btnConfirmOK').click(function(){
				DeleteConfirm(tempDaleteID);
				$("#confrimModal").modal('hide');
			});
			
			$('#btnCancleDelete').click(function(){
				tempupdateID = undefined;
				$("#confrimModal").modal('hide');
			});
		};
	};
});


