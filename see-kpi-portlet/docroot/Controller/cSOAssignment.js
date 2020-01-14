var username = "";
var password = "";
var globalDataUnassign=[];
var globalData;
var globalDropdownData = [];
var countActionPlan = 0;

//ของ SO
var getDataSOFn = function(page,rpp){
	var status = $('#dropdownAssign').val();

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_assignment",
		type:"get",
		datatype:"json",
		data:{
			"page":page,
			"rpp":rpp,
			"status":status,
		},
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(status==1){
				getUnassignSOFn(data['unassign']);
				getAssignSOFn(data['assign']);
				$('#unassign').show();
				$('#assign').show();
			}else if(status==2){
				getAssignSOFn(data['assign']);
				$('#unassign').hide();
				$('#assign').show();
			}else if(status==3){
				getUnassignSOFn(data['unassign']);
				$('#unassign').show();
				$('#assign').hide();
			}
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	});
}

var getUnassignSOFn = function(data){
	
	let head_html =`
					<tr>
						<th style="text-align: left;">${Liferay.Language.get('strategic-objective')}</th>
						<th style="text-align: left;">${Liferay.Language.get('smart-kpi')}</th>
						<th style="text-align: left;">${Liferay.Language.get('manage')}</th>
					</tr>
					`;
	$('#DetailHeadUnAssignList').html(head_html);
	
	let html = "";
	$.each(data,function(items,itemsEntry){
		globalDataUnassign.push(itemsEntry);
		html += `
				<tr>
				<td>${itemsEntry['so_name']}</td>
				<td>${itemsEntry['item_name']}</td>
				<td><button id="unassign${itemsEntry['so_item_id']}" data-toggle="modal"  data-backdrop="static" data-target="#modalUnAssign" class="btn btn-warning">${Liferay.Language.get('assign')}</button>
				`;
	});
	
	
	$('#DetailUnAssignList').html(html);
	
	globalDataUnassign.map(item =>{
		$('#unassign'+item.so_item_id).click(function(){
			getDetailModalUnAssignSOTop(item);
			getDetailModalUnAssignSO(item);
		});
    });
	
}

var getDetailModalUnAssignSOTop = function(data){
	let head_html = `
		<tr id="detailHeadModalUnAssign">
			<th style="text-align: left;width: 10%;">${Liferay.Language.get('select')}</th>
			<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
			<th style="text-align: left;width: 10%;">${Liferay.Language.get('uom')}</th>
			<th style="text-align: left;width: 15%;">${Liferay.Language.get('target')}</th>
			<th style="text-align: left;width: 15%;">% ${Liferay.Language.get('weight')}</th>
		</tr>				
		`;
	$('#detailHeadModalUnAssign').html(head_html);
	
	let html = `
				<tr>
				<th> ${Liferay.Language.get('strategic-objective')}: </th>
				<td> straight objective 1</td>
				</tr>
				<tr>
				<th> ${Liferay.Language.get('smart-kpi')}: </th>
				<td> Smart KPI 1</td>
				</tr>
				<tr>
				<th> ${Liferay.Language.get('period')}: </th>
				<td> รอบวัดผล</td>
				</tr>
				`;
	
	$('#detailModalUnAssignTop').html(html);
}

var getDetailModalUnAssignSO = function(data){
	let html = `
			<tr>
			<td> <input type="checkbox" class="form-check-input" id="ckbox-" checked> </td>
			<td> SOKPI1</td>
			<td> %</td>
			<td> <input type="text" style="width: 50%;" id="txtTarget"/></td>
			<td> <input type="text" style="width: 50%;" id="txtWeight"/></td>;
			</tr>
			<tr>
			<td> <input type="checkbox" class="form-check-input" id="ckbox-" checked > </td>
			<td> SOKPI1</td>
			<td> %</td>
			<td> <input type="text" style="width: 50%;" id="txtTarget"/></td>
			<td> <input type="text" style="width: 50%;" id="txtWeight"/></td>;
			</tr>
			`;

	
	$('#detailModalUnAssign').html(html);
}

var getAssignSOFn = function(data){
	head_html = `
				<tr>
					<th style="text-align: left;">${Liferay.Language.get('strategic-objective')}</th>
					<th style="text-align: left;">${Liferay.Language.get('smart-kpi')}</th>
					<th style="text-align: left;width: 8%;">% ${Liferay.Language.get('total')}</th>
					<th style="text-align: left;padding-left: 50px;">${Liferay.Language.get('manage')}</th>
				</tr>
				`;
	$('#DetailHeadAssignList').html(head_html);
	
	let html = `
			<tr>
			<td> SO2 </td>
			<td> สินเชื่อปล่อยใหม่ </td>
			<td style="border-radius: 50px;background:#5db95d;width: 35px;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;text-align: center;color:white;"> 40 </td>
			<td style="padding-left: 30px;">
			<button id=assign1 data-toggle="modal"  data-backdrop="static" data-target="#modalAssign" class="btn btn-warning">${Liferay.Language.get('edit')}</button>
			<button data-toggle="modal"  data-backdrop="static" data-target="#confrimModal"id="btnunAssignCancle" class="btn btn-danger" type="button">&nbsp;${Liferay.Language.get('delete')}</button>
			</td>
			</tr>`;
	
	$('#DetailAssignList').html(html);
	$('#assign1').click(function(){
		getDetailModalAssignSOTop();
		getDetailModalAssignSO();
	});
	//paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
}

var getDetailModalAssignSOTop = function(){
	let head_html =`
					<tr>
						<th style="text-align: left;">${Liferay.Language.get('select')}</th>
						<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
						<th style="text-align: left;">${Liferay.Language.get('uom')}</th>
						<th style="text-align: left;width: 6%;">${Liferay.Language.get('target')}</th>
						<th style="text-align: left;">${Liferay.Language.get('Actual')}</th>
						<th style="text-align: left;">% ${Liferay.Language.get('achievment')}</th>
						<th style="text-align: left;">${Liferay.Language.get('forecast')}</th>
						<th style="text-align: left;">% ${Liferay.Language.get('forecast')}</th>
						<th style="text-align: left;width: 6%;">% ${Liferay.Language.get('weight')}</th>
						<th style="text-align: left;">${Liferay.Language.get('weight-score')}</th>
						<th style="text-align: left;">${Liferay.Language.get('manage')}</th>
					</tr>
	`;
	$('#detailHeadModalAssign').html(head_html);
	let html = `
				<tr>
				<th> ${Liferay.Language.get('strategic-objective')}: </th>
				<td> straight objective 1</td>
				</tr>
				<tr>
				<th> ${Liferay.Language.get('smart-kpi')}: </th>
				<td> Smart KPI 1</td>
				</tr>
				<tr>
				<th> ${Liferay.Language.get('period')}: </th>
				<td> รอบวัดผล</td>
				</tr>
				`;
	
	$('#detailModalAssignTop').html(html);
}

var getDetailModalAssignSO = function(){
	
	let html = `
			<tr>
			<td> <input type="checkbox"  class="form-check-input" id="ckbox-" checked> </td>
			<td> SOKPI1</td>
			<td> %</td>
			<td "> <input type="text" style="width: 70%;" id="txtTarget"/></td>
			<td> 50 </td>
			<td style="padding-right: 3px;">
			<div class="progress progress-success">
			<div class="bar" style="width: 40%">40%</div>
			</div>
			</td>
			<td> 50</td>
			<td style="padding-right: 3px;>
			<div class="progress progress-warning">
			<div class="bar" style="width: 60%">60%</div>
			</div>
			</td>
			<td> <input type="text" style="width: 70%;" id="txtWeight"/></td>
			<td> 50</td>
			<td> <button data-toggle="modal"  data-backdrop="static" data-target="#Result" type="button" class="btn btn-warning">${Liferay.Language.get('result')}</button></td>
			</tr>
			`;

	
	$('#detailModalAssign').html(html);
}


//dropdown
var dropdownYearAndApprasalPeriod = function(){
	var temp_year=$('#dropdownYear').val();
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_assignment/year_and_desc_list",
		type:"get",
		async : false,
		datatype:"json",
		data:{
			"year":temp_year
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data']['data_appraisal_period_desc'],function(items,itemsEntry){
				html += '<option id='+"Period"+itemsEntry['period_id']+' value='+ itemsEntry['period_id'] +'>'+ itemsEntry['appraisal_period_desc']+'</option>';
			});
			$('#dropdownPeriodAssign').html(html);
			
			html ="";
			$.each(data['data']['data_year'],function(items,itemsEntry){
				if(temp_year==itemsEntry['year']){
					html += '<option id="'+"Year"+itemsEntry['year']+'" value="'+ itemsEntry['year'] +'"selected>'+ itemsEntry['year']+'</option>';
				}else{
				html += '<option id="'+"Year"+itemsEntry['year']+'" value="'+ itemsEntry['year'] +'">'+ itemsEntry['year']+'</option>';
				}
			});
			$('#dropdownYear').html(html);
			
		}
	});
}

var dropdownFrequencOfDateAssign = function(){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_assignment/frequency_list",
		type:"get",
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var html = "";
			$.each(data['data'],function(items,itemsEntry){
				html += '<option id='+"Frequency"+itemsEntry['frequency_id']+' value='+ itemsEntry['frequency_month_value'] +'>'+ itemsEntry['frequency_name']+'</option>';
			});
			$('#dropdownFrequencOfDateAssign').html(html);
		}
	});
}

var dropdownAmountOfAssign = function(){
	html = '';
	html += '<option value="1" >ทีละงวด</option>';
	html += '<option value="2" >ทีเดียวทุกงวด</option>';
	
	$('#dropdownAmountOfAssign').html(html);
}

var dropdownAssign = function(){
	html = '';
	html += '<option value="1" >'+Liferay.Language.get('all-assign-unassign')+'</option>';
	html += '<option value="2" >'+Liferay.Language.get('all-assign')+'</option>';
	html += '<option value="3" >'+Liferay.Language.get('all-unassigned')+'</option>';
	
	$('#dropdownAssign').html(html);
}

//ของ Project
var getDataProjectFn = function(page,rpp){
	var status = $('#dropdownAssign').val();

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/so_assignment",
		type:"get",
		datatype:"json",
		data:{
			"page":page,
			"rpp":rpp,
			"status":status,
		},
		async : false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(status==1){
				getUnassignProjectFn(data['unassign']);
				getAssignProjectFn(data['assign']);
				$('#unassign').show();
				$('#assign').show();
			}else if(status==2){
				getAssignProjectFn(data['assign']);
				$('#unassign').hide();
				$('#assign').show();
			}else if(status==3){
				getUnassignProjectFn(data['unassign']);
				$('#unassign').show();
				$('#assign').hide();
			}
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
		}
	});
}

var getUnassignProjectFn = function(data){
	let head_html =`
		<tr>
			<th style="text-align: left;">${Liferay.Language.get('project')}</th>
			<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
			<th style="text-align: left;">${Liferay.Language.get('manage')}</th>
		</tr>
		`;
	$('#DetailHeadUnAssignList').html(head_html);
	
	let html = "";
	$.each(data,function(items,itemsEntry){
	globalDataUnassign.push(itemsEntry);
	html += `
		<tr>
		<td>${itemsEntry['so_name']}</td>
		<td>${itemsEntry['item_name']}</td>
		<td><button id="unassign${itemsEntry['so_item_id']}" data-toggle="modal"  data-backdrop="static" data-target="#modalUnAssign" class="btn btn-warning">${Liferay.Language.get('assign')}</button>
		`;
	});
	
	
	$('#DetailUnAssignList').html(html);
	
	globalDataUnassign.map(item =>{
		$('#unassign'+item.so_item_id).click(function(){
			getDetailModalUnAssignProjectTop(item);
			getDetailModalUnAssignProject(item);
		});
	});
	
}

var getDetailModalUnAssignProjectTop = function(data){
	let head_html = `
		<tr id="detailHeadModalUnAssign">
			<th style="text-align: left;width: 10%;">${Liferay.Language.get('select')}</th>
			<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
			<th style="text-align: left;width: 10%;">${Liferay.Language.get('uom')}</th>
			<th style="text-align: left;width: 15%;">${Liferay.Language.get('target')}</th>
			<th style="text-align: left;width: 15%;">% ${Liferay.Language.get('weight')}</th>		
		</tr>				
		`;
	$('#detailHeadModalUnAssign').html(head_html);
	
	let html = `<tr>
				<th> Straight Objective: </th>
				<td> straight objective 1</td>
				</tr>
				<tr>
				<th> Smart KPI: </th>
				<td> Smart KPI 1</td>
				</tr>
				<tr>
				<th> period: </th>
				<td> รอบวัดผล</td>
				</tr>
				`;
	
	$('#detailModalUnAssignTop').html(html);
}

var getDetailModalUnAssignProject = function(data){
	
	
	let html = `
			<tr>
			<td> <input type="checkbox" class="form-check-input" id="ckbox-" checked > </td>
			<td> SOKPI1</td>
			<td> %</td>
			<td> <input type="text" style="width: 50%;" id="txtTarget"/></td>
			<td> <input type="text" style="width: 50%;" id="txtWeight"/></td>;
			</tr>
			<tr>
			<td> <input type="checkbox" class="form-check-input" id="ckbox-" checked > </td>
			<td> SOKPI2</td>
			<td> %</td>
			<td> <input type="text" style="width: 50%;" id="txtTarget"/></td>
			<td> <input type="text" style="width: 50%;" id="txtWeight"/></td>;
			</tr>
			`;

	
	$('#detailModalUnAssign').html(html);
}

var getAssignProjectFn = function(data){
	head_html = `
				<tr>
					<th style="text-align: left;">${Liferay.Language.get('strategic-objective')}</th>
					<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
					<th style="text-align: left;width: 5%;">% ${Liferay.Language.get('total')}</th>
					<th style="text-align: left;padding-left: 50px;">${Liferay.Language.get('manage')}</th>
				</tr>
				`;
	$('#DetailHeadAssignList').html(head_html);
	
	let html = `
			<tr>
			<td style="width: 20%;"> SO2 </td>
			<td style="width: auto;max-width:45%;"> สินเชื่อปล่อยใหม่ </td>
			<td style="border-radius: 50px;background:#5db95d;width: 35px;padding-top: 5px;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;text-align: center;color:white;"> 40 </td>
			<td style="padding-left: 30px;">
			<button id=assign1 data-toggle="modal"  data-backdrop="static" data-target="#modalAssign" class="btn btn-warning">${Liferay.Language.get('edit')}</button>
			<button data-toggle="modal"  data-backdrop="static" data-target="#confrimModal"id="btnunAssignCancle" class="btn btn-danger" type="button">&nbsp;${Liferay.Language.get('delete')}</button>
			</td>
			</tr>`;
	
	$('#DetailAssignList').html(html);
	$('#assign1').click(function(){
		getDetailModalAssignProjectTop();
		getDetailModalAssignProject();
	});
}

var getDetailModalAssignProjectTop = function(){
	let head_html =`
					<tr>
						<th style="text-align: left;">${Liferay.Language.get('select')}</th>
						<th style="text-align: left;">${Liferay.Language.get('so-kpi')}</th>
						<th style="text-align: left;">${Liferay.Language.get('uom')}</th>
						<th style="text-align: left;width: 6%;">${Liferay.Language.get('target')}</th>
						<th style="text-align: left;">${Liferay.Language.get('Actual')}</th>
						<th style="text-align: left;">% ${Liferay.Language.get('achievment')}</th>
						<th style="text-align: left;">${Liferay.Language.get('forecast')}</th>
						<th style="text-align: left;">% ${Liferay.Language.get('forecast')}</th>
						<th style="text-align: left;width: 6%;">% ${Liferay.Language.get('weight')}</th>
						<th style="text-align: left;">${Liferay.Language.get('weight-score')}</th>
						<th style="text-align: left;">${Liferay.Language.get('manage')}</th>
					</tr>
	`;
	$('#detailHeadModalAssign').html(head_html);
	let html = `
				<tr>
					<th> Straight Objective: </th>
					<td> straight objective 1</td>
				</tr>
				<tr>
					<th> SO KPI: </th>
					<td> SO kpi</td>
				</tr>
				<tr>
					<th> period: </th>
					<td> รอบวัดผล</td>
				</tr>
				<tr>
					<th> Action plan: </th>
				<td>
					<button data-toggle="modal"  data-backdrop="static" data-target="#modalActionPlan"id="btnActionPlan" class="btn btn-info" type="button">${Liferay.Language.get('action-plan')}</button>
				</td>
				</tr>
				`;
	
	$('#detailModalAssignTop').html(html);
}

var getDetailModalAssignProject = function(){
	
	let html = `
			<tr>
			<td> <input type="checkbox"  class="form-check-input" id="ckbox-" checked> </td>
			<td> SOKPI1</td>
			<td> %</td>
			<td "> <input type="text" style="width: 70%;" id="txtTarget"/></td>
			<td> 50 </td>
			<td style="padding-right: 3px;">
			<div class="progress progress-success">
			<div class="bar" style="width: 40%">40%</div>
			</div>
			</td>
			<td> 50</td>
			<td style="padding-right: 3px;>
			<div class="progress progress-warning">
			<div class="bar" style="width: 60%">60%</div>
			</div>
			</td>
			<td> <input type="text" style="width: 70%;" id="txtWeight"/></td>
			<td> 50</td>
			<td> <button data-toggle="modal"  data-backdrop="static" data-target="#Result" type="button" class="btn btn-warning">${Liferay.Language.get('result')}</button></td>
			</tr>
			`;

	
	$('#detailModalAssign').html(html);
	$('#btnActionPlan').click(function(){
		detailModalActionPlanTop();
		projectInfo();
		detailModalActionPlan();
		setLanguageValueOfHtml();
	});
}

var projectInfo = function(){
	let html =`
				<tr style="width: 20%;">
					<th class="th-nomal-actionplan">${Liferay.Language.get('project')}:</th>
					<td colspan="3" ><input type="text" class="actionplan-padding" disabled value="โครงการGHB"/></td>
				</tr>
				<tr>
					<th class="th-nomal-actionplan">${Liferay.Language.get('owner')}:</th>
					<td><input type="text" class="actionplan-padding" disabled value="ผู้ช่วยผู้จัดการ"/></td>
					<th class="th-nomal-actionplan">${Liferay.Language.get('responsible')}:</th>
					<td><input type="text" class="actionplan-padding" disabled value="นายA"/></td>
				</tr>
				<tr>
					<th class="th-nomal-actionplan">${Liferay.Language.get('objective')}:</th>
					<td><input type="text" class="actionplan-padding" disabled value="1.เพื่อตอบสนองความสะดวก"/></td>
					<th class="th-nomal-actionplan">${Liferay.Language.get('so-kpi')}:</th>
					<td><input type="text" class="actionplan-padding" disabled value="SO KPI 1"/></td>
				</tr>
				<tr class="bg-tr-disabled">
					<th class="th-nomal-actionplan">${Liferay.Language.get('project-kpi')}:</th>
					<td>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="Project1"/><br/>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="Project2"/><br/>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="Project3"/><br/>
					</td>
					<th class="th-project-kpi-acctionplan">${Liferay.Language.get('target')}:</th>
					<td>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="60"/><br/>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="70"/><br/>
						<input class="bg-input-disabled actionplan-padding" type="text" disabled value="80"/><br/>
					</td>
				</tr>
				<tr>
					<th class="th-nomal-actionplan">${Liferay.Language.get('project-start-end-date')}:</th>
					<td class="td-disabled "><input type="text" class="actionplan-padding" disabled value="1/2/2019-2/3/2019"/></td>
					<th class="th-nomal-actionplan">${Liferay.Language.get('project-value')}:</th>
					<td><input type="text" class="actionplan-padding" disabled value="1.25ล้านบาท"/></td>
				</tr>
				<tr>
					<th class="th-nomal-actionplan">${Liferay.Language.get('project-risk')}:</th>
					<td colspan="3" ><input type="text" class="actionplan-padding" disabled value="ความล่าช้าของโครงการ"/></td>
				</tr>
			`;
	$('#projectInfo').html(html);
}

var detailModalActionPlanTop = function(){
	let html = `
				<tr>
					<th>${Liferay.Language.get('result-description')}:</th>
					<td class="td-set-color"><textarea class="textarea-resize">1.ไม่เป็นที่กำหนดไว้</textarea></td>
					<th style="padding-left: 5px;">${Liferay.Language.get('forecast-desciption')}:</th>
					<td class="td-set-color"><textarea class="textarea-resize">ยอดขาย</textarea></td>
				</tr>
				<tr>
					<th>${Liferay.Language.get('summary-desciption')}:</th>
					<td class="td-set-color" colspan="3"><textarea class="textarea-resize">ปัจจุบันอยุ่ระหว่าง</textarea></td>
				</tr>
				<tr>
					<th>${Liferay.Language.get('problem')}:</th>
					<td class="td-set-color" colspan="3"><textarea class="textarea-resize">การใช้พรบ.</textarea></td>
				</tr>
				<tr>
					<th>${Liferay.Language.get('solution')}:</th>
					<td class="td-set-color" colspan="3"><textarea class="textarea-resize">เร่งดำเนินการ</textarea></td>
				</tr>
				`;
	$('#detailModalActionPlanTop').html(html);
	$('.textarea-resize').attr("disabled",true);
	
}

var detailModalActionPlan = function(){
	addActionPlan();
}

var addActionPlan = function(){
	let html =`		<tr>
						<td colspan="7">
							<div style="margin-top: 5px;"></div>
						<td>
					</tr>
					<tr>
						<td class="th-middle-text set-border">
							<input type="checkbox" class="ckb" id="del-ckb-${countActionPlan}" style="display:none;">
							<textarea class="input-height-100 resize-none" id="TaskName-${countActionPlan}"></textarea>
						</td>
						<td class="th-middle-text set-border">
							<textarea class="input-height-100 resize-none" id="TaskResult-${countActionPlan}"></textarea>
						</td>
						<td class="th-middle-text set-border">
							<table>
								<tr>
									<td class="border-actionplan">
										<input type="text" id="TS-Plan-${countActionPlan}" disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" id="TS-Actual-${countActionPlan}"  disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" id="BS-Plan-${countActionPlan}" disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" id="BS-Actual-${countActionPlan}" disabled>
									</td>
								</tr>	
							</table>
						</td>
						<td class="th-middle-text set-border">
							<table>
								<tr>
									<td class="border-actionplan">
										<input type="text" value="${Liferay.Language.get('plan')}" disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" value="${Liferay.Language.get('actual')}" disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" value="${Liferay.Language.get('plan')}" disabled>
									</td>
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" value="${Liferay.Language.get('actual')}" disabled>
									</td>
								</tr>	
							</table>
						</td>
						<td class="th-middle-text set-border">
							<table>
								<tr>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-1"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-2"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-3"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-4"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-5"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-6"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-7"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-8"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-9"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-10"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-11"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumPlan-${countActionPlan}-12"></input>
									</td>								
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-1"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-2"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-3"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-4"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-5"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-6"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-7"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-8"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-9"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-10"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-11"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="TaskSumActual-${countActionPlan}-12"></input>
									</td>								
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-1"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-2"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-3"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-4"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-5"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-6"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-7"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-8"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-9"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-10"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-11"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumPlan-${countActionPlan}-12"></input>
									</td>								
								</tr>
								<tr>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-1"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-2"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-3"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-4"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-5"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-6"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-7"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-8"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-9"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-10"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-11"></input>
									</td>
									<td class="border-actionplan">
										<input type="text" class="allownumericwithoutdecimal" id="BudgetSumActual-${countActionPlan}-12"></input>
									</td>								
								</tr>
							</table>
						</td>
						<td class="th-middle-text set-border">
							<textarea class="input-height-100 resize-none" id="response-${countActionPlan}"></textarea>
						</td>
						<td class="th-middle-text set-border">
							<textarea class="input-height-100 resize-none" id="TaskDes-${countActionPlan}"></textarea>
						</td class="th-middle-text set-border">
					</tr>
			  `;
	$('#detailModalActionPlan').append(html);
	
	$(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[^\d].+/, ""));
         if ((event.which < 48 || event.which > 57)) {
             event.preventDefault();
             var str_id_of_click = $(document.activeElement).attr('id');
             str_id_of_click = str_id_of_click.substring(0,str_id_of_click.search('-'));
             
             if(str_id_of_click == "TaskSumPlan")
            	 sumTaskPlan();
             else if(str_id_of_click == "TaskSumActual")
            	 sumTaskActual();
             else if(str_id_of_click== "BudgetSumPlan")
            	 sumBudgetPlan();
             else if(str_id_of_click== "BudgetSumActual")
            	 sumBudgetActual();
             
             sumTotalTaskPlan();
             sumTotalTaskActual();
             sumTotalBudgetPlan();
             sumTotalBudgetActual();
         }
     });

	
	if($('.ckb').is(":visible")){
		$('.ckb').show();
	}
	countActionPlan++;
}

var sumTaskPlan = function(){
	let sum = 0;
	//find position to update
	let id = $(document.activeElement).attr('id');
	id = id.charAt(id.search('-')+1);
	
	for(let i=1;i<=12;i++){
		if($('#TaskSumPlan-'+ id +'-'+i).val()==""){
			sum+=0;
		}else{
			sum+=parseInt($('#TaskSumPlan-'+ id +'-'+i).val());
		}
	}
	
	$('#TS-Plan-'+id).val(sum);
}

var sumTaskActual = function(){
	let sum = 0;
	//find position to update
	let id = $(document.activeElement).attr('id');
	id = id.charAt(id.search('-')+1);
	
	for(let i=1;i<=12;i++){
		if($('#TaskSumActual-'+ id +'-'+i).val()==""){
			sum+=0;
		}else{
			sum+=parseInt($('#TaskSumActual-'+ id +'-'+i).val());
		}
	}
	
	$('#TS-Actual-'+id).val(sum);
}

var sumBudgetPlan = function(){
	let sum = 0;
	//find position to update
	let id = $(document.activeElement).attr('id');
	id = id.charAt(id.search('-')+1);
	
	for(let i=1;i<=12;i++){
		if($('#BudgetSumPlan-'+ id +'-'+i).val()==""){
			sum+=0;
		}else{
			sum+=parseInt($('#BudgetSumPlan-'+ id +'-'+i).val());
		}
	}
	
	$('#BS-Plan-'+id).val(sum);
}

var sumBudgetActual = function(){
	let sum = 0;
	//find position to update
	let id = $(document.activeElement).attr('id');
	id = id.charAt(id.search('-')+1);
	
	for(let i=1;i<=12;i++){
		if($('#BudgetSumActual-'+ id +'-'+i).val()==""){
			sum+=0;
		}else{
			sum+=parseInt($('#BudgetSumActual-'+ id +'-'+i).val());
		}
	}
	
	$('#BS-Actual-'+id).val(sum);
}

var sumTotalTaskPlan = function(){
	let totalSum = 0;
	let sum;
	
	for(let j=1;j<=12;j++){
		sum = 0;
		for(let i=0;i<countActionPlan;i++){
			if($('#TaskSumPlan-'+ i +'-'+j).val()==""){
				sum+=0;
			}else{
				sum += parseInt($("#TaskSumPlan-"+i+"-"+j).val());
			}
		}
		$('#totalTaskPlan-'+j).val(sum);
		totalSum += sum;
	}
	$('#totalTaskSumPlan').val(totalSum);
	
}

var sumTotalTaskActual = function(){
	let totalSum = 0;
	let sum;
	
	for(let j=1;j<=12;j++){
		sum = 0;
		for(let i=0;i<countActionPlan;i++){
			if($('#TaskSumActual-'+ i +'-'+j).val()==""){
				sum+=0;
			}else{
				sum += parseInt($("#TaskSumActual-"+i+"-"+j).val());
			}
		}
		$('#totalTaskActual-'+j).val(sum);
		totalSum += sum;
	}
	$('#totalTaskSumActual').val(totalSum);
}

var sumTotalBudgetPlan = function(){
	let totalSum = 0;
	let sum;
	
	for(let j=1;j<=12;j++){
		sum = 0;
		for(let i=0;i<countActionPlan;i++){
			if($('#BudgetSumPlan-'+ i +'-'+j).val()==""){
				sum+=0;
			}else{
				sum += parseInt($("#BudgetSumPlan-"+i+"-"+j).val());
			}
		}
		$('#totalBudgetPlan-'+j).val(sum);
		totalSum += sum;
	}
	$('#totalBudgetPlan').val(totalSum);
}

var sumTotalBudgetActual = function(){
	let totalSum = 0;
	let sum;
	
	for(let j=1;j<=12;j++){
		sum = 0;
		for(let i=0;i<countActionPlan;i++){
			if($('#BudgetSumActual-'+ i +'-'+j).val()==""){
				sum+=0;
			}else{
				sum += parseInt($("#BudgetSumActual-"+i+"-"+j).val());
			}
		}
		$('#totalBudgetActual-'+j).val(sum);
		totalSum += sum;
	}
	$('#totalBudgetActual').val(totalSum);
}

var setLanguageValueOfHtml  = function(){
	$('#BS-Plan').val(Liferay.Language.get('plan'));
	$('#BS-Actual').val(Liferay.Language.get('actual'));
	$('#TS-Plan').val(Liferay.Language.get('plan'));
	$('#TS-Actual').val(Liferay.Language.get('actual'));
}

$(document).ready(function() {
	
	username = $('#user_portlet').val();
	password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
			
			dropdownAssign();
			dropdownAmountOfAssign();
			dropdownYearAndApprasalPeriod();
			dropdownFrequencOfDateAssign();
			
			$("#AdvanceSearch").show();
			$('#btnSearch').click(function(){
				globalDropdownData['dropdownSO'] = $('#dropdownSO').val();
				globalDropdownData['dropdownYear'] = $('#dropdownYear').val();
				globalDropdownData['dropdownFrequencOfDateAssign'] = $('#dropdownFrequencOfDateAssign').val();
				globalDropdownData['dropdownAmountOfAssign'] = $('#dropdownAmountOfAssign').val();
				globalDropdownData['dropdownPeriodAssign'] = $('#dropdownPeriodAssign').val();
				globalDropdownData['dropdownAssign'] = $('#dropdownAssign').val();
			
				if(globalDropdownData['dropdownSO'] == '1'){
					getDataSOFn();
					$('#AssignList').hide();
					$('#AssignList').show();
				}else{
					getDataProjectFn();
					$('#AssignList').hide();
					$('#AssignList').show();
				}
			});
			
			$('#dropdownYear').change(function(){
				dropdownYearAndApprasalPeriod();
			});
			
			$('#btnEditActionplan').click(function(){
				$('.textarea-resize').attr("disabled",false);
			});
			
			$('#btnSaveActionplan').click(function(){
				
			});
			
			$('#btnDeleteActionplan').click(function(){
				if($('.ckb').is(":visible")){
					console.log("DEL");
				}else{
					$('.ckb').show();
					$('#btnCancelDeleteActionplan').show();
				}
			});
			
			$('#btnCancleActionplan').click(function(){
				$('.textarea-resize').attr("disabled",true);
			});
			
			$('#btnAddActionplan').click(function(){
				addActionPlan();		
			});
			
			$('#btnExportActionplan').click(function(){
				
			});
			
			$('#btnCancelDeleteActionplan').click(function(){
				$('.ckb').hide();
				$('#btnCancelDeleteActionplan').hide();
			});
			
			$('#btnSearchResult').click(function(){
				$('#SOKpi1List').show();
				$('.txtinput').attr("disabled",true);
			});
			
			$('#btnEditResult').click(function(){
				$('.txtinput').attr("disabled",false);
			});
			
			$('#btnCancleResult').click(function(){
				$('.txtinput').attr("disabled",true);
			});
			//$('#del-ckb-1').is(":checked");
		};
	};
});