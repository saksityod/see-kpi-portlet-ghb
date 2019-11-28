var globalData="";
var phaseArray=[];
var globalCount=0;
var username = "";
var password = "";
//Variable to store your files
var files;
// funciton global start
//form2

//List Error Function Start
var listErrorActionPlanFn =function(data){
	var errorData="";
	
	
		
			if(data[0]['action_plan_name']!=undefined){
				errorData+="Error Task Name <b>"+data[0]['action_plan_name']+"</b><br>";
			}
			
			if(data[0]['error']!=undefined){
				$.each(data[0]['error'],function(index,indexEntry){
					
						errorData+="<b>"+index+"</b>:"+indexEntry+"<br>";
					
				});
			}
			
			
	
	return errorData;
}
//List Error Function End
var dropdownDeductScoreFn = function(score,nof_target_score,hint){
	htmlTemplateQuality = "";
	
	console.log(score);
	console.log(nof_target_score);
	console.log(hint);
	
	for(var i=0;i<=nof_target_score;i++){
		var hintValue="";
		
		
		
		try {
			hintValue=hint[i]['hint'];
		}
		catch(err) {
			//hintValue=i;
		   console.log(err.message);
		}
		
		if(score==i){
			htmlTemplateQuality+="<option value='"+i+"'  selected='selected'>"+hintValue+"</option>";
		}else{
			htmlTemplateQuality+="<option value='"+i+"'>"+hintValue+"</option>";
		}
		
		
		
	}
	
	return htmlTemplateQuality;
}
var assignTemplateQualityFn = function(structureName,data){
	var item_result_id_array=[];
	var htmlTemplateQuality="";

	var hintCount = 0;
	var hintHtml="";
	$.each(data['hint'],function(index,indexEntry){
		hintHtml+="<div style='text-align: left;\'>"+indexEntry['hint']+"</div>";
		hintCount++;
	});
	
	
	htmlTemplateQuality+="";
	htmlTemplateQuality+="<div class=\"row-fluid\">";
	htmlTemplateQuality+="<div class=\"span12\">";
	htmlTemplateQuality+="<div class=\"ibox-title2\">";

	//Appraisal Item Name,Target,Actual,Score,%Weight,Weight Score
	htmlTemplateQuality+="<div class='titlePanel'>"+structureName+"</div>";
		if(data['no_weight']==0){ // has weight;
			if(data['result_type']==1){
				htmlTemplateQuality+="<div class='totalWeight'>"+Liferay.Language.get('total-weight')+" "+data['total_weight_percent']+"%</div>";
			}else{
				htmlTemplateQuality+="<div class='totalWeight'>"+Liferay.Language.get('total-score')+" "+data['total_weight']+"</div>";
			}
		
		}
	htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="<div class=\"ibox-content\">";
	htmlTemplateQuality+="<div class=\"table-responsive scrollbar-inner\">";
	htmlTemplateQuality+="<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width :none;\">";
	htmlTemplateQuality+="<thead>";
	//has weight
	if(data['no_weight']==0){
			htmlTemplateQuality+="<tr>";
				htmlTemplateQuality+="<th style=\"width:40%\"><b>"+Liferay.Language.get('kpi-name')+"</b></th>";
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('target')+"</b></th>";
				htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>"+Liferay.Language.get('score')+"</b></th>  ";      
				htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('percent-weight')+"</b></th>  ";  
				if(data['result_type']==1){
					htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('weight-score')+"</b></th>  ";
				}else{
					htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('result-score')+"</b></th>  ";
				}
				   
			htmlTemplateQuality+="</tr>";
	}else{
		
		htmlTemplateQuality+="<tr>";
			htmlTemplateQuality+="<th style=\"width:40%\"><b>"+Liferay.Language.get('kpi-name')+"</b></th>";
			htmlTemplateQuality+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('target')+"</b></th>";
			htmlTemplateQuality+="<th style='width:10%;text-align: center;'><b>"+Liferay.Language.get('score')+"</b></th>  ";      
		 
		htmlTemplateQuality+="</tr>";
	}
				htmlTemplateQuality+="</thead>";
					htmlTemplateQuality+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						
					item_result_id_array.push(indexEntry['item_result_id']);
					//has weight
						if(data['no_weight']==0){
							htmlTemplateQuality+="<tr>";
							
								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select style='width:180px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:left;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore itemScore   input form-control input-sm-small numberOnly'>";
									htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
								
							htmlTemplateQuality+="</tr>";	
						}else{
							htmlTemplateQuality+="<tr>";
							
								htmlTemplateQuality+="<td class=''>"+indexEntry['item_name']+"</td>";
								htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;'><div data-toggle=\"tooltip\" data-placement=\"right\" title=\""+hintHtml+"\">"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
								
								htmlTemplateQuality+="<td class='' style='text-align: center;'>";
								htmlTemplateQuality+="<select style='width:180px; height: 25px;padding: 0 0 0 5px;font-size:13px; text-align:left;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore itemScore input form-control input-sm-small numberOnly'>";
									htmlTemplateQuality+=dropdownDeductScoreFn(notNullFn(indexEntry['score']),indexEntry['nof_target_score'],data['hint']);
								htmlTemplateQuality+="<select>";
								//htmlTemplateQuality+="<input style='width:80px;' id='competencyScore-"+indexEntry['item_result_id']+"' class='competencyScore input form-control input-sm-small numberOnly' type='text' value="+notNullFn(indexEntry['score'])+">";
								htmlTemplateQuality+="</td>";
							
								
							htmlTemplateQuality+="</tr>";
						}
					});
					
					//has weight
					if(data['no_weight']==0){
						htmlTemplateQuality+="<tr>";
						
							htmlTemplateQuality+="<td class=''></td>";
							htmlTemplateQuality+="<td class='' ></td>";
							htmlTemplateQuality+="<td class=''></td>";
							htmlTemplateQuality+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>"+Liferay.Language.get('total')+"</b></td>";
							htmlTemplateQuality+="<td class='' style='text-align: right;padding-right: 10px;font-weight: bold;font-size:16px'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
							
						htmlTemplateQuality+="</tr>";
					}
				
					htmlTemplateQuality+="</tbody>";
					htmlTemplateQuality+="</table>";
					
					//htmlTemplateQuality+="<div class='formName hidden'>form2</div>";
					htmlTemplateQuality+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateQuality+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form2\">";
					htmlTemplateQuality+="<input type='hidden' id='item_result_id_array-"+data['structure_id']+"' class='item_result_id_array' value=\""+item_result_id_array+"\">";
					
					htmlTemplateQuality+="</div>";
					htmlTemplateQuality+="<br style=\"clear:both\">";				
		htmlTemplateQuality+="</div>";
	htmlTemplateQuality+="</div>";
htmlTemplateQuality+="</div>";
return htmlTemplateQuality;

};

var assignTemplateDeductFn = function(structureName,data){
	
	var htmlTemplateDeduct="";
	htmlTemplateDeduct+="<div class=\"row-fluid\">";
	htmlTemplateDeduct+="<div class=\"span12\">";
	htmlTemplateDeduct+="<div class=\"ibox-title2\">";
	htmlTemplateDeduct+="<div class='titlePanel'>"+structureName+"</div>";
	if(data['no_weight']==0){ // has weight;
		
		if(data['result_type']==1){
			htmlTemplateDeduct+="<div class='totalWeight'>"+Liferay.Language.get('total-weight')+" "+data['total_weight_percent']+"%</div>";
		}else{
			htmlTemplateDeduct+="<div class='totalWeight'>"+Liferay.Language.get('total-score')+" "+data['total_weight']+"</div>";
		}
	}
	htmlTemplateDeduct+="</div>";
		
		htmlTemplateDeduct+="<div class=\"ibox-content\">";
		htmlTemplateDeduct+="<div class=\"table-responsive scrollbar-inner\">";
		htmlTemplateDeduct+="<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width :none;\">";
              		
		htmlTemplateDeduct+="<thead>";
		//has weight
		if(data['no_weight']==0){
			
		
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:30%\"><b>"+Liferay.Language.get('kpi-name')+" </b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('max-value')+" </b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('actual-value')+" </b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('over-value')+" </b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('deduct-score-per-unit')+"</b> </th>";
				if(data['result_type']==1){
					htmlTemplateDeduct+="<th style='width:20%;text-align: right;'><b>"+Liferay.Language.get('weight-score')+" </b></th>";
				}else{
					htmlTemplateDeduct+="<th style='width:20%;text-align: right;'><b>"+Liferay.Language.get('result-score')+" </b></th>";
				}
			htmlTemplateDeduct+="</tr>";
		}else{
			htmlTemplateDeduct+="<tr>";
				htmlTemplateDeduct+="<th style=\"width:35%\"><b>"+Liferay.Language.get('kpi-name')+"</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('max-value')+"</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('actual-value')+"</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('over-value')+"</b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('deduct-score-per-unit')+" </b></th>";
				htmlTemplateDeduct+="<th style='width:15%;text-align: right;'><b>"+Liferay.Language.get('score')+" </b></th>";
			htmlTemplateDeduct+="</tr>";
		}
			htmlTemplateDeduct+="</thead>";
					htmlTemplateDeduct+="<tbody id=\"\" class='appraisal_result'>";
					
					$.each(data['items'],function(index,indexEntry){
						//has weight
						if(data['no_weight']==0){
							htmlTemplateDeduct+="<tr>";
									htmlTemplateDeduct+="<td class=''> "+indexEntry['item_name']+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['max_value'])).toFixed(2))+"</td>";
									//htmlTemplateDeduct+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore\" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
									
							htmlTemplateDeduct+="</tr>";
						}else{
							htmlTemplateDeduct+="<tr>";
									htmlTemplateDeduct+="<td class=''> "+indexEntry['item_name']+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['max_value'])).toFixed(2))+"</td>";
									//htmlTemplateDeduct+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore\" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['over_value'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['deduct_score_unit'])).toFixed(2))+"</td>";
									htmlTemplateDeduct+="<td class='' style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])).toFixed(2))+"</td>";
									
							htmlTemplateDeduct+="</tr>";
						}
					});
					if(data['no_weight']==0){
						htmlTemplateDeduct+="<tr>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class=''></td>";
								htmlTemplateDeduct+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>"+Liferay.Language.get('total')+"</b></td>";
								htmlTemplateDeduct+="<td class=''  style='text-align: right;padding-right: 10px;font-weight: bold; font-size:16px'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
						htmlTemplateDeduct+="</tr>";
					}
			
						
					htmlTemplateDeduct+="</tbody>";
					htmlTemplateDeduct+="</table>";
					htmlTemplateDeduct+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
					htmlTemplateDeduct+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form3\">";
					
				htmlTemplateDeduct+="</div>";
			htmlTemplateDeduct+="<br style=\"clear:both\">"			
		htmlTemplateDeduct+="</div>";
		htmlTemplateDeduct+="</div>";
	htmlTemplateDeduct+="</div>";
	return htmlTemplateDeduct;
};

var assignTemplateQuantityFn = function(structureName,data){
	var item_result_id_array=[];
	var htmlTemplateQuantity = "";
	var hintCount = 0;
	var hintHtml="";
	var paperclip;
	$.each(data['hint'],function(index,indexEntry){
		hintHtml+="<div style='text-align: left;\'>"+indexEntry['hint']+"</div>";
		hintCount++;
	});
	
	htmlTemplateQuantity+="<div class=\"row-fluid\">";
	htmlTemplateQuantity+="	<div class=\"span12\">";
	htmlTemplateQuantity+="  <div class=\"ibox-title2\">";
	
	htmlTemplateQuantity+="      <div class='titlePanel'>"+structureName+"</div>";
	if(data['no_weight']==0){ // has weight;
		if(data['result_type']==1){
			htmlTemplateQuantity+="      <div class='totalWeight'>"+Liferay.Language.get('total-weight')+" "+data['total_weight_percent']+"%</div>";
		}else{
			htmlTemplateQuantity+="      <div class='totalWeight'>"+Liferay.Language.get('total-score')+" "+data['total_weight']+"</div>";
		}
	}
	htmlTemplateQuantity+="  </div>";
	htmlTemplateQuantity+="	<div class=\"ibox-content\">";
	htmlTemplateQuantity+=" <div class=\"table-responsive scrollbar-inner\">";
	htmlTemplateQuantity+="<table id=\"tableAppraisalAssignment\" class=\"table table-striped\" style=\"max-width: none;\">";
	htmlTemplateQuantity+="<thead>";
	
	//has weight
	if(data['no_weight']==0){
		
		htmlTemplateQuantity+="<tr>";
		
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>"+Liferay.Language.get('perspective')+" </b></th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>"+Liferay.Language.get('kpi-name')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('target')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;min-width: 60px !important;text-align: center;' class=''><b>"+Liferay.Language.get('uom')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('forecast')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('actual')+" </b></th>";
			if(data['threshold']==1){
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('score')+" </b></th>";
			}else{
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('percent-achievement')+" </b></th>";
			}
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('percent-weight')+" </b></th>";
			if(data['result_type']==1){
				htmlTemplateQuantity+="<th style='width:10%;text-align: right;' class=''><b>"+Liferay.Language.get('weight-score')+"</b> </th>";
			}else{
				htmlTemplateQuantity+="<th style='width:10%;text-align: right;' class=''><b>"+Liferay.Language.get('result-score')+"</b> </th>";
			}

			htmlTemplateQuantity+="<th style='width:10%;text-align: center;' class=''><b>"+Liferay.Language.get('manage')+"</b> </th>";

			
		htmlTemplateQuantity+="</tr>";
		
	}else{
	//no_weight	
		htmlTemplateQuantity+="<tr>";
			htmlTemplateQuantity+="<th style=\"width:10%\" class=''><b>"+Liferay.Language.get('perspective')+"</b> </th>";
			htmlTemplateQuantity+="<th style=\"width:20%\" class=''><b>"+Liferay.Language.get('kpi-name')+"</b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('target')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;min-width: 60px !important;text-align:center;' class=''><b>"+Liferay.Language.get('uom')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('forecast')+" </b></th>";
			htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('actual')+" </b></th>";
			
			if(data['threshold']==1){
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('score')+" </b></th>";
			}else{
				htmlTemplateQuantity+="<th style='width:5%;text-align: right;' class=''><b>"+Liferay.Language.get('percent-achievement')+" </b></th>";
			}
			

			htmlTemplateQuantity+="<th style='width:15%;text-align: center;' class=''><b>"+Liferay.Language.get('manage')+"</b> </th>";
		htmlTemplateQuantity+="</tr>";
	}
	
		htmlTemplateQuantity+="</thead>";
			htmlTemplateQuantity+="<tbody id=\"\" class='appraisal_result'>";
			$.each(data['items'],function(index,indexEntry){
			
				paperclip = (indexEntry['files_amount'] > 0) ? "<i class='fa fa-paperclip' style='font-weight: bold; font-size: 20px;'></i>" : "<span style='width: 15.72px;'></span>";
				item_result_id_array.push(indexEntry['item_result_id']);
				/*
				item_result_id
				item_name
				structure_id
				structure_name
				nof_target_score
				form_id
				form_name
				app_url
				weight_percent
				*/
				//has weight
				if(data['no_weight']==0){
					htmlTemplateQuantity+="<tr >";
						htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
						htmlTemplateQuantity+="<td id=\"item_name-"+indexEntry['item_result_id']+"\">"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td>"+indexEntry['uom_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly itemScore addComma\" id=\"forecast-"+indexEntry['item_result_id']+"\" name=\"forecast-"+indexEntry['item_result_id']+"\" value="+addCommas(indexEntry['forecast_value'])+" value-actual="+addCommas(indexEntry['actual_value'])+"></td>";
						//htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input style=\"width:70px; height: 25px;padding: 0 0 0 5px; font-size:13px; text-align:right;\" type=\"text\" class=\"span10 input-sm-small numberOnly \" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
						if(data['threshold']==1){
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])))+"</td>";
						}else{
							htmlTemplateQuantity+="<td style=\"text-align: right;padding-right: 10px;background:"+hexToRgb("#"+indexEntry['color'],0.7)+"\">"+addCommas(parseFloat(notNullFn(indexEntry['percent_achievement'])))+"</td>";
						}
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weight_percent'])).toFixed(2))+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['weigh_score'])).toFixed(2))+"</td>";
						
	
						htmlTemplateQuantity+="	<td style=\"text-align:center; display: flex; justify-content: space-between;\">";
						htmlTemplateQuantity+=" <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;\&gt;  &lt;button id='good_practice-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' class='btn btn-success btn-small btn-gear good_practice'&gt;"+Liferay.Language.get('Good Practice')+"&lt;/button&gt;  &lt;button id='lesson_learn-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' class='btn btn-success btn-small btn-gear lesson_learn'&gt;"+Liferay.Language.get('Lesson Learn')+"&lt;/button&gt;&lt;button style='width:100%;' class='btn btn-success btn-small btn-gear reason' id='reason-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('detail')+"&lt;/button&gt;  &lt;button id='attach_file-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' class='btn btn-success btn-small btn-gear attach_file'&gt;"+Liferay.Language.get('attach-files')+"&lt;/button&gt;&lt;button style='width:100%;' id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' class='btn btn-success btn-small btn-gear action_plan'&gt;"+Liferay.Language.get('action-plan')+"&lt;/button&gt; &lt;button style='width:100%;' class='btn btn-success btn-small btn-gear ganttChart' id='ganttChart-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('gantt-chart')+"&lt;/button&gt;  &lt;button style='width:100%;' class='btn btn-success btn-small btn-gear phase' id='phase-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('phase')+"&lt;/button&gt; \" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>"+paperclip;						htmlTemplateQuantity+="	</td>";
					htmlTemplateQuantity+="</tr>";
				}else{
					//no_weight	
					htmlTemplateQuantity+="<tr >";
						htmlTemplateQuantity+="<td>"+indexEntry['perspective_name']+"</td>";
						htmlTemplateQuantity+="<td>"+indexEntry['item_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><div title=\""+hintHtml+"\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" >"+addCommas(parseFloat(notNullFn(indexEntry['target_value'])).toFixed(2))+"</div></td>";
						htmlTemplateQuantity+="<td>"+indexEntry['uom_name']+"</td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input type=\"text\"  class=\"span10 input-sm-small numberOnly addComma itemScore\" id=\"forecast-"+indexEntry['item_result_id']+"\" name=\"forecast-"+indexEntry['item_result_id']+"\" value="+addCommas(indexEntry['forecast_value'])+" value-actual="+addCommas(indexEntry['actual_value'])+"></td>";
						
						//htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'><input type=\"text\"  class=\"span10 input-sm-small numberOnly \" id=\"actual-"+indexEntry['item_result_id']+"\" name=\"actual-"+indexEntry['item_result_id']+"\" value="+indexEntry['actual_value']+"></td>";
						htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['actual_value'])).toFixed(2))+"</td>";
						
						if(data['threshold']==1){
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['score'])).toFixed(2))+"</td>";
						}else{
							htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;'>"+addCommas(parseFloat(notNullFn(indexEntry['percent_achievement'])).toFixed(2))+"</td>";
						}
						
						htmlTemplateQuantity+="	<td style=\"text-align:center; display: flex; justify-content: space-between;\">";
						htmlTemplateQuantity+=" <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button id='attach_file-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' class='btn btn-success btn-small btn-gear attach_file'&gt;"+Liferay.Language.get('attach-files')+"&lt;/button&gt;&lt;button id='action_plan-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' class='btn btn-success btn-small btn-gear action_plan'&gt;"+Liferay.Language.get('action-plan')+"&lt;/button&gt;&lt;button class='btn btn-success btn-small btn-gear ganttChart' id='ganttChart-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('gantt')+"&lt;/button&gt; &lt;button class='btn btn-success btn-small btn-gear phase' id='phase-"+indexEntry['item_result_id']+"-"+indexEntry['emp_id']+"-"+indexEntry['emp_name']+"' style='width:100%;' data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('phase')+"&lt;/button&gt;&nbsp;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" style='text-align:center;' data-original-title=\"\" title=\"\"></i>"+paperclip;
						htmlTemplateQuantity+="	</td>";
							
					htmlTemplateQuantity+="</tr>";
				}
				
			});
			
			if(data['no_weight']==0){
				htmlTemplateQuantity+="<tr >";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td ></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td></td>";
					htmlTemplateQuantity+="<td class='object-right' style='text-align: right;padding-right: 10px;font-weight: bold;'><b>"+Liferay.Language.get('total')+"</b></td>";
					htmlTemplateQuantity+="<td style='text-align: right;padding-right: 10px;font-weight: bold; font-size:16px;'><b>"+addCommas(parseFloat(notNullFn(data['total_weigh_score'])).toFixed(2))+"</b></td>";
				htmlTemplateQuantity+="</tr>";
			}
			
			htmlTemplateQuantity+="</tbody>";
			htmlTemplateQuantity+="</table>";
			htmlTemplateQuantity+="<input type='hidden' id='structure_id-"+data['structure_id']+"' class='structure_id' value="+data['structure_id']+">";
			htmlTemplateQuantity+="<input type='hidden' id='form-"+data['structure_id']+"' class='' value=\"form1\">";
			htmlTemplateQuantity+="<input type='hidden' id='item_result_id_array-"+data['structure_id']+"' class='item_result_id_array' value=\""+item_result_id_array+"\">";
			
			
			htmlTemplateQuantity+="</div>";
			htmlTemplateQuantity+="<br style=\"clear:both\">";	
		htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	htmlTemplateQuantity+="</div>";
	
	return htmlTemplateQuantity;
	
}


//function global start

var dropDrowYearListFn = function(nameArea,id){
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
			//var data=['à¸—à¸”à¸¥à¸­à¸‡à¸‡à¸²à¸™','à¸›à¸£à¸°à¸ˆà¸³à¸›à¸µ','à¸£à¸±à¸�à¸©à¸²à¸�à¸²à¸£'];
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(index==0){
					htmlOption+="<option selected='selected' value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['appraisal_year']+">"+indexEntry['appraisal_year']+"</option>";
				}
			});
			$("#AppraisalYear"+nameArea).html(htmlOption);
		}
	});
}

var HeaderHTML = function(){
	var html = "";
	// แนวทางปฏิบัติ
	html += "<div style='float:left;'>";
	html += "<p>กลุ่มงาน : กลุ่มงานนครหลวง </p>";
	html += "<p>ผ่ายงาน : ฝ่ายงานสาขา กทม และ ปริมณฑล 1 </p>";
	html += "<p>สาขา : สาขา ฟิวเจอร์ปาร์ครังสิต </p>";
	html += "<p>ตัวชี้วัด : จำนวนสินเชื่อที่อยู่อาศัยปล่อยใหม่</p>";
	html += "</div>";
	html += "<div style='float:right;right: 0;'>";
	html += "<table class='table table-bordered' >";
	html += "<tr>";
	html += "<td rowspan='2' style='text-align: center; vertical-align: middle;'><p>ผลงาน</p><h5>0.47</h5></td>";
	html += "<td style='text-align: center; vertical-align: middle;'><p>คาดการณ์</p><p>0.60</p></td>";
	html += "<td style='text-align: center; vertical-align: middle;'><p>%ผลงานเทียบค่าคาดการณ์</p><p>76.67%</p></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td style='text-align: center; vertical-align: middle;'><p>เป้าหมาย</p><p>0.60</p></td>";
	html += "<td style='text-align: center; vertical-align: middle;'><p>%ผลงานเทียบค่าเป้าหมาย</p><p>76.67%</p></td>";
	html += "	</tr>";
	html += "</table>";
	html += "</div>";
	
	return html;
	
	
}
var GP_in = 1;
var arrIn= new Array();
var disable_state_in = new Array();
var id_in = new Array();
var addGP_in = function(){
	var html ="";
	html += "<tr id='d"+GP_in+"'>";
	html += "<td style='width:30%'>";
	html += "<input type='checkbox' class='form-check-input' id='"+GP_in+"' style='pointer-events: all;' >";
	html += "<select id='s"+GP_in+"' class='form-control form-control-sm' style='min-width:96%' disabled>";
	html += "<option>1.ปัจจัยภายใน1</option>";
	html += "<option>2.ปัจจัยภายใน2</option>";
	html += "<option>3.ปัจจัยภายใน3</option>";
	html += "<option>4.ปัจจัยภายใน4</option>";
	html += "</select>";
	html += "</td>";
	html += "<td style='width:80%'><textarea id='t"+GP_in+"' style='width:100%;resize: vertical;' disabled></textarea></td>";
	html += "</tr>";
	
	disable_state_in.push(true);
	id_in.push(GP_in);
	arrIn.push(html);
	GP_in++;
			
			
}

var GP_out = 100;
var arrOut = new Array();
var disable_state_out =new Array();
var id_out = new Array();
var addGP_out = function(){
	var html ="";
	html += "<tr id='d"+GP_out+"'>";
	html += "<td style='width:30%'>";
	html += "<input type='checkbox' class='form-check-input' id='"+GP_out+"' style='pointer-events: all;' >";
	html += "<select id='s"+GP_out+"' class='form-control form-control-sm' style='min-width:96%' disabled>";
	html += "<option>1.ปัจจัยภายนอก1</option>";
	html += "<option>2.ปัจจัยภายนอก2</option>";
	html += "<option>3.ปัจจัยภายนอก3</option>";
	html += "<option>4.ปัจจัยภายนอก4</option>";
	html += "</select>";
	html += "</td>";
	html += "<td style='width:80%'><textarea id='t"+GP_out+"'style='width:100%;resize: vertical; '  disabled></textarea></td>";
	html += "</tr>";
	id_out.push(GP_out);
	disable_state_out.push(true);
	arrOut.push(html);
	GP_out++;
			
}


var goodPracticeBodyHTML = function(){
	
	var html = "";
	html += "<table class='table table-bordered'>";
	html += "<tr>";
	html += "<td Colspan = '2' Align = 'Center'>";
	html += "<div style='float:left'>"; 
	html += "<strong>Good Practice</strong>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-warning ' id='btnEditGoodP' onclick='btnEditGoodP()'>แก้ไข</button>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-danger' id='btnDeleteGoodP' onclick='btnDeleteGoodP()'>ลบ</button>";
	html += "</div> ";
	html += "<div style='float:right'> ";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-success' id='btnExportGoodP' onclick='btnExportGoodP()'>Export</button>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-info' id='btnSaveGoodP' onclick='btnSaveGoodP()'>บันทึก</button>";
	html += "&nbsp;&nbsp;<button class='btn btn-danger'type='button' onclick='btnCancleGoodP()'>ยกเลิก</button>";
	html += "</div>";
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td style='width:10%;text-align: center; vertical-align: middle;'>ปัจจัยภายใน</td>";
	html += "<td>";
	html +="<table style='width:100%' >";
	html +="<tbody id='tbodyGoodP'>";
	html +="<tr>";
	html +="<td style='text-align: center; vertical-align: middle;'>ปัจจัยความสำเร็จ<span>&nbsp;&nbsp;<button type='button' class='btn btn-success' style='pointer-events: all;' onclick='btnAddGoodPIn()'>เพิ่ม</button></span></td>";
	html +="<td style='text-align: center; vertical-align: middle;'>รายละเอียด</td>";
	html +="</tr>";
	
	// call add in 
	for(var i=0;i<arrIn.length;i++){
		
		html +=arrIn[i];
		
	}
	
	
	html +="</tbody>";
	html +="</table>";
	html +="</td>";
	html +="</tr>";
	html +="<tr>";
	html +="<td style='width:10%;text-align: center; vertical-align: middle;'>ปัจจัยภายนอก</td>";
	html +="<td>";
	html +="<table style='width:100%' >";
	html +="<tbody  id='tbodyGoodP2'>";
	html +="<tr>";
	html +="<td style='text-align: center; vertical-align: middle;'>ปัจจัยความสำเร็จ<span>&nbsp;&nbsp;<button type='button' class='btn btn-success' style='pointer-events: all;'onclick='btnAddGoodPOut()'>เพิ่ม</button></span></td>";
	html +="<td style='text-align: center; vertical-align: middle;'>รายละเอียด</td>";
	html +="</tr>";
	
	// call add out
	
	for(var i=0;i<arrOut.length;i++){
		html +=arrOut[i];
	}

	html +="</tbody>";
	html +="</table>";
	html +="</td>";
	html +="</tr>";
	html +="</table>";
	//console.log(html);
	
	$("#goodPracticeBody").html(html);
	
	
}

var LL_in = 1;
var arrInLL= new Array();
var disable_state_in_ll = new Array();
var id_in_ll = new Array();
var addLL_in = function(){
	var html ="";
	html += "<tr id='dl"+LL_in+"'>";
	html += "<td style='width:45%'>";
	html += "<input type='checkbox' class='form-check-input' id='"+LL_in+"' style='pointer-events: all;' >";
	html += "<select id='sl"+LL_in+"' class='form-control form-control-sm' style='min-width:97%' disabled>";
	html += "<option>1.ปัจจัยภายใน1</option>";
	html += "<option>2.ปัจจัยภายใน2</option>";
	html += "<option>3.ปัจจัยภายใน3</option>";
	html += "<option>4.ปัจจัยภายใน4</option>";
	html += "</select>";
	html += "</td>";
	html += "<td style='width:45%'><textarea id='tl"+LL_in+"' style='width:100%;resize: vertical;' disabled></textarea></td>";
	html += "</tr>";
	
	disable_state_in_ll.push(true);
	id_in_ll.push(LL_in);
	arrInLL.push(html);
	LL_in++;
			
			
}

var LL_out = 100;
var arrOutLL = new Array();
var disable_state_out_ll =new Array();
var id_out_ll = new Array();
var addLL_out = function(){
	var html ="";
	html += "<tr id='dl"+LL_out+"'>";
	html += "<td style='width:45%'>";
	html += "<input type='checkbox' class='form-check-input' id='"+LL_out+"' style='pointer-events: all;' >";
	html += "<select id='sl"+LL_out+"' class='form-control form-control-sm' style='min-width:97%' disabled>";
	html += "<option>1.ปัจจัยภายนอก1</option>";
	html += "<option>2.ปัจจัยภายนอก2</option>";
	html += "<option>3.ปัจจัยภายนอก3</option>";
	html += "<option>4.ปัจจัยภายนอก4</option>";
	html += "</select>";
	html += "</td>";
	html += "<td style='width:45%'><textarea id='tl"+LL_out+"'style='width:100%;resize: vertical;' disabled></textarea></td>";
	html += "</tr>";
	id_out_ll.push(LL_out);
	disable_state_out_ll.push(true);
	arrOutLL.push(html);
	LL_out++;
			
}

var lessonLearnBodyHTML = function(){
	
	var html = "";
	html += "<table class='table table-bordered'>";
	html += "<tr>";
	html += "<td Colspan = '2' Align = 'Center'>";
	html += "<div style='float:left'>"; 
	html += "<strong>Lesson Learn</strong>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-warning' id='btnEditLessonL' onclick='btnEditLessonL()'>แก้ไข</button>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-danger' id='btnDeleteLessonL' onclick='btnDeleteLessonL()'>ลบ</button>";
	html += "</div> ";
	html += "<div style='float:right'> ";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-success' id='btnExportLessonL' onclick='btnExportLessonL()'>Export</button>";
	html += "&nbsp;&nbsp;<button type='button' class='btn btn-info' id='btnSaveLessonL' onclick='btnSaveLessonL()'>บันทึก</button>";
	html += "&nbsp;&nbsp;<button data-dismiss='modal' class='btn btn-danger'type='button' onclick='btnCancleLessonL()'>ยกเลิก</button>";
	html += "</div>";
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td style='width:10%;text-align: center; vertical-align: middle;'>ปัจจัยภายใน</td>";
	html += "<td>";
	html +="<table style='width:100%' >";
	html +="<tbody id='tbodyGoodl'>";
	html +="<tr>";
	html +="<td style='text-align: center; vertical-align: middle;'>ปัจจัยความสำเร็จ<span>&nbsp;&nbsp;<button type='button' class='btn btn-success' style='pointer-events: all;' onclick='btnAddLessonLIn()'>เพิ่ม</button></span></td>";
	html +="<td style='text-align: center; vertical-align: middle;'>รายละเอียด</td>";
	html +="</tr>";
	
	// call add in 
	for(var i=0;i<arrInLL.length;i++){
		
		html +=arrInLL[i];
		
	}
	
	
	html +="</tbody>";
	html +="</table>";
	html +="</td>";
	html +="</tr>";
	html +="<tr>";
	html +="<td style='width:10%;text-align: center; vertical-align: middle;'>ปัจจัยภายนอก</td>";
	html +="<td>";
	html +="<table style='width:100%' >";
	html +="<tbody  id='tbodyGoodl2'>";
	html +="<tr>";
	html +="<td style='text-align: center; vertical-align: middle;'>ปัจจัยความสำเร็จ<span>&nbsp;&nbsp;<button type='button' class='btn btn-success' style='pointer-events: all;'onclick='btnAddLessonLOut()'>เพิ่ม</button></span></td>";
	html +="<td style='text-align: center; vertical-align: middle;'>รายละเอียด</td>";
	html +="</tr>";
	
	// call add out
	
	for(var i=0;i<arrOutLL.length;i++){
		html +=arrOutLL[i];
	}

	html +="</tbody>";
	html +="</table>";
	html +="</td>";
	html +="</tr>";
	html +="</table>";
	//console.log(html);
	$("#lessonLearnBody").html(html);
	
	
}


var dropDrowPeriodListFn = function(year,id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/period_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"appraisal_year":year},
		success:function(data){
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['period_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['period_id']+">"+indexEntry['appraisal_period_desc']+"</option>";
				}
			});
			$("#AppraisalPeriod").html(htmlOption);
		}
	});
}

var dropDrowAppraisalLevelFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/al_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>"+Liferay.Language.get('all-level')+"</option>";
			$.each(data,function(index,indexEntry){
				
				if(id==indexEntry['level_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['level_id']+">"+indexEntry['appraisal_level_name']+"</option>";
				}
			});
			$("#AppraisalLevel").html(htmlOption);
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
			htmlOption+="<option value=''>All Department</option>";
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
		url:restfulURL+"/"+serviceName+"/public/org/master/org_list_transection",
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

var dropDrowSectionFn = function(department_code,id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/sec_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"department_code":department_code},
		success:function(data){
			var htmlOption="";
			htmlOption+="<option value=''>All Section</option>";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['section_code']){
					htmlOption+="<option selected='selected' value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['section_code']+">"+indexEntry['section_name']+"</option>";
				}
			});
			$("#Section").html(htmlOption);
		}
	});
}

var splitData = function(data){
	if(data.trim()!=""){
		data = data.split("-");
		data=data[0];
	}else{
		data="";
	}
	return data;
}

var listAppraisalDetailFn = function(data){
	
	$("#appraisal_template_area").empty();
	$.each(data['group'],function(index,groupEntry){
		
		console.log(groupEntry);
		if(groupEntry['form_url']=='quantity'){			
			$("#appraisal_template_area").append(assignTemplateQuantityFn(index,groupEntry));
			
			
			/*bindding popover start*/
			//Using
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
			
			$(".appraisal_result").off("click",".popover-edit-del");
			$(".appraisal_result").on("click",".popover-edit-del",function(){
				
				if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
					$(".popover").css({"text-align":"center","width": "120px","margin-left":"78px"});
				} else {
					$(".popover").css({"text-align":"center"});
				}

				//action_plan Start
				$(".action_plan").on("click",function() {
					
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					$("#actionPlanModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#phase_item_result_id").val(id);
					getActionPlanFn(id);
					$("#action_actionplan").val("add");
					
				});
				
				//attach flie start
				$(".attach_file").click(function(){
					
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					
					$("#attachFileModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#attach_file_item_result_id").val(id)
					$('.dropify').dropify();
					
					
				});
				
				//good practice start
				$(".good_practice").click(function(){
					
					$("#informConfirm").empty();
					$("#goodPracticeHead").html(HeaderHTML());
					addGP_in();
					addGP_in();
					addGP_out();
					addGP_out();
					goodPracticeBodyHTML();
					
					
					$("#goodPracticeModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					
					$('.dropify').dropify();
					
					
				});
				
				//lesson learn start
				$(".lesson_learn").click(function(){
					
					$("#informConfirm").empty();
					$("#lessonLearnHead").html(HeaderHTML());
					addLL_in();
					addLL_in();
					addLL_out();
					addLL_out();
					lessonLearnBodyHTML();
					
					
					$("#lessonLearnModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$('.dropify').dropify();
					
					
				});
				
			
				//phase Start
				$(".phase").on("click",function(event) {
					event.preventDefault();
					clearFormPhaseFn();
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
				
					$("#phaseModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#phaseName").off("fucus");
					$("#phase_item_result_id").val(id)
					getPhaseFn(id);
				});
				
				//reason Start
				$(".reason").on("click",function(event) {
					event.preventDefault();
					clearFormReasonFn();
					$(".informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
				
					$("#reasonModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
					$("#reason").off("fucus");
					$("#reason_item_result_id").val(id);
					getReasonFn(id);
				});
				
				
				//ganttChart start
				$(".ganttChart").on("click",function(event) {
					
					$("#informConfirm").empty();
					var id=this.id.split("-");
					id=id[1];
					getDataGanttChartFn(id);
					$("#gantt_item_result_id").val(id);
					$("#ganttChartModal").modal({
						"backdrop" : setModalPopup[0],
						"keyboard" : setModalPopup[1]
					}).css({"margin-top":"0px"});
			
					
				});
				
				
				
			});
			/*bindding popover end*/
			
		}else if(groupEntry['form_url']=='quality'){
			$("#appraisal_template_area").append(assignTemplateQualityFn(index,groupEntry));
		}else if(groupEntry['form_url']=='deduct'){
			$("#appraisal_template_area").append(assignTemplateDeductFn(index,groupEntry));
		}

		//binding tooltip start
		 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
		 $('[data-toggle="tooltip"]').tooltip({
			 html:true
		 });
		//binding tooltip end
		
		 if(data['head'][0]['no_weight']==0){
			 $(".hasWeightGrandTotalArea").show();
			 $(".noWeightGrandTotalArea").hide();
		 }else{
			 $(".hasWeightGrandTotalArea").hide();
			 $(".noWeightGrandTotalArea").show();
		 }
		 
		 
		//set header start
		 if($("#embed_appraisalType").val()==2){
			 
			 $("#orgInformation").hide();
			 $("#empInformation").show();
			 //hasWeight f and f = t
			
					
					
				
			 $("#titlePanelInformation").html(Liferay.Language.get('employee-information'));
		 
			 $(".txtEmpCode").html(data['head'][0]['emp_code']);
			 $(".txtEmpName").html(data['head'][0]['emp_name']);
			 $(".txtPosition").html(data['head'][0]['position_name']);
			 $(".txtOrgName").html(data['head'][0]['org_name']);
			 $(".txtChiefEmpCode").html(data['head'][0]['chief_emp_code']);
			 $(".txtChiefEmpName").html(data['head'][0]['chief_emp_name']);
			 $(".txtAppraisalType").html(data['head'][0]['appraisal_type_name']);
			 $(".txtPeriod").html(data['head'][0]['appraisal_period_desc']);
			 $(".txtGrandTotalWeigh").html(data['head'][0]['result_score']);
		 
		 }else if($("#embed_appraisalType").val()==1){
			 
			 $("#orgInformation").show();
			 $("#empInformation").hide();
			 
			 $("#titlePanelInformation").html(Liferay.Language.get('organization-information'));
			 
			 $(".txtOrgCodeOrg").html(data['head'][0]['org_code']);
			 $(".txtOrgNameOrg").html(data['head'][0]['org_name']);
			 $(".txtParentOrganizationOrg").html(data['head'][0]['parent_org_name']);
			 $(".txtPeriodOrg").html(data['head'][0]['appraisal_period_desc']);
			 $(".txtGrandTotalWeighOrg").html(data['head'][0]['result_score']);
			 
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
				 var charCode = (evt.which) ? evt.which : event.keyCode;
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
			
			$(".addComma").keyup(function(){
				$(this).val(Comma($(this).val()));
			})
		//set header end

	});
	

	dropDrowActionEditFn(data['head'][0]['stage_id']);
	$("#assignTo").change();
	$("#ModalAppraisal").modal({
		"backdrop" : setModalPopup[0],
		"keyboard" : setModalPopup[1]
	}).css({"margin-top":"0px"});
	
	
	//Stage History List Data..
	var htmlStage="";
	$.each(data['stage'],function(index,indexEntry){
	
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
	
	

	
};
var findOneFn = function(id){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['head'].length>0){
				
				listAppraisalDetailFn(data);
				setThemeColorFn(tokenID.theme_color);
				
				
				
				
				if((data['head'][0]['edit_flag']==0)){
					$("#btnSubmit").attr("disabled","disabled");	
					
				}else if($("#actionToAssign").val()==null){
					$("#btnSubmit").attr("disabled","disabled");
					
				}

				
			}else{
				callFlashSlide("Data is empty.");
				return false;
			}

		}
	});
	
	
}


var dropdownListPhaseFn_bk = function(nameArea,id){
	if(nameArea==undefined){
		nameArea="";
	}

	
	/*
	 	"phase_id": 1,
        "phase_name": "Alpha"
	*/
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/phase_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			var htmlOption="";
			htmlOption+="<select id='phase_list' name='phase_list' class='input-small' style=\"height:22px; margin-right:3px;\">";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['phase_id']){
					htmlOption+="<option selected value='"+indexEntry['phase_id']+"'>"+indexEntry['phase_name']+"</option>";
				}else{
					htmlOption+="<option  value='"+indexEntry['phase_id']+"'>"+indexEntry['phase_name']+"</option>";
					
				}
			});
			htmlOption+="</select>";
			return htmlOption;			
		}
	});
	
}

var dropdownListPhaseFn = function(){
	 phaseArray=[];
	 $.ajax({
	  url:restfulURL+"/"+serviceName+"/public/appraisal/phase_list/"+$("#phase_item_result_id").val(),
	  type:"get",
	  dataType:"json",
	  async:false,
	  headers:{Authorization:"Bearer "+tokenID.token},
	  success:function(data){
	   if(data!="" && data!=[]){
	   
	    $.each(data,function(index,indexEntry){
	     phaseArray.push(indexEntry);
	    });
	    
	   }
	   
	  }
	 });
	 
	}



var listActionPlanFn = function(data){
	
	dropdownListPhaseFn();
	 $("#action_new_actionplan").val("");

	//Map Data ...
	
	$("#actionPlanOrganization").html(data['header']['org_name']);
	$("#actionPlanAppraisalItem").html(data['header']['item_name']);
	$("#actionPlanTarget").html(addCommas(parseFloat(notNullFn(data['header']['target_value'])).toFixed(2)));
	
	$("#actionPlanForecastResult").html(addCommas(parseFloat(notNullFn(data['header']['forecast_value'])).toFixed(2)));
	$("#actionPlanActual").html(addCommas(parseFloat(notNullFn(data['header']['actual_value'])).toFixed(2)));
	$("#actionPlanActualVSforecast").html(addCommas(parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2)));
	$("#actionPlanActualVSTarget").html(addCommas(parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2)));
	
	$("#actionplan_emp_name").val(data['header']['emp_name']);
	$("#actionplan_emp_id").val(data['header']['emp_id']);
	$("#item_result_id").val(data['header']['item_result_id']);
	
	
	var htmlTR="";
	$.each(data['actions'],function(index,indexEntry){
		 
		/*
action_plan_id
action_plan_name
actual_cost
actual_end_date
actual_start_date

created_by
created_dttm
earned_value
emp_id
item_result_id
phase_id
phase_name
plan_end_date
plan_start_date
plan_value

update_by
update_dttm
		 */
		
	
	
		htmlTR+="";
		htmlTR+="<tr>";
			htmlTR+="<td>";
			htmlTR+="<center>";
			htmlTR+="<input type='checkbox' name='action_plan_id-"+indexEntry['action_plan_id']+"' id='action_plan_id-"+indexEntry['action_plan_id']+"' class='action_plan_id' value='"+indexEntry['action_plan_id']+"'>";
			htmlTR+="</center>";
			htmlTR+="</td>";
			htmlTR+="<td><div class='actionplan_label'>"+indexEntry['action_plan_name']+"</div>";
			htmlTR+="<input class='actionplan_input' style=\"height:20px;margin-right:3px; width:200px;\" type='text' id='action_plan_name-"+indexEntry['action_plan_id']+"' name='action_plan_name-"+indexEntry['action_plan_id']+"' value='"+indexEntry['action_plan_name']+"'>";
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['plan_start_date']+"</div>";
			
			htmlTR+="<input type='text' name='plan_start_date-"+indexEntry['action_plan_id']+"' id='plan_start_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['plan_start_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['plan_end_date']+"</div>";
			htmlTR+="<input type='text' name='plan_end_date-"+indexEntry['action_plan_id']+"' id='plan_end_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['plan_end_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['actual_start_date']+"</div>";
			htmlTR+="<input type='text' name='actual_start_date-"+indexEntry['action_plan_id']+"' id='actual_start_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px;margin-right:3px;\" value='"+indexEntry['actual_start_date']+"'>";
			
			htmlTR+="</td>";
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['actual_end_date']+"</div>";
			htmlTR+="<input type='text' name='actual_end_date-"+indexEntry['action_plan_id']+"' id='actual_end_date-"+indexEntry['action_plan_id']+"' class='datepicker input-small actionplan_input' style=\"height:20px; margin-right:3px;\" value='"+indexEntry['actual_end_date']+"'>";
			htmlTR+="</td>";
			htmlTR+="<td id='phast_list_area-"+indexEntry['action_plan_id']+"'>";
			htmlTR+="<div class='actionplan_label'>"+indexEntry['phase_name']+"</div>";
			htmlTR+="<select id='phase_list-"+indexEntry['action_plan_id']+"' name='phase_list-"+indexEntry['action_plan_id']+"' class='input-small actionplan_input' style=\"height:22px; margin-right:3px;\">";
			$.each(phaseArray,function(index2,indexEntry2){
				//console.log(indexEntry['phase_id']+"=="+indexEntry2['phase_id']);
				
				if(indexEntry['phase_id']==indexEntry2['phase_id']){
					htmlTR+="<option selected value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
				}else{
					htmlTR+="<option value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
				}
			});
			htmlTR+="</select>";
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			if(indexEntry['responsible']!="" && indexEntry['responsible']!=null ){
				htmlTR+="<div class='actionplan_label'>"+indexEntry['emp_id']+"-"+indexEntry['responsible']+"</div>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='responsible-"+indexEntry['action_plan_id']+"' class='responsible actionplan_input' name='responsible-"+indexEntry['action_plan_id']+"' value='"+indexEntry['emp_id']+"-"+indexEntry['responsible']+"'>";
			}else{
				htmlTR+="<div class='actionplan_label'></div>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='responsible-"+indexEntry['action_plan_id']+"' class='responsible actionplan_input' name='responsible-"+indexEntry['action_plan_id']+"' value=''>";
			}
			
			htmlTR+="</td>";
			
			htmlTR+="<td>";
			htmlTR+="<div class='actionplan_label' style='text-align:right;'>"+addCommas(parseFloat(notNullFn(indexEntry['completed_percent'])).toFixed(2))+"</div>";//Completed
			htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='completed_percent-"+indexEntry['action_plan_id']+"' class='actionplan_input' name='completed_percent-"+indexEntry['action_plan_id']+"' value='"+indexEntry['completed_percent']+"'>";//Completed
			
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});
	

	$("#listDataActionPlan").html(htmlTR);
	$(".actionplan_input").hide();	   
	
	 //0,0,100,80,80
	//%Actual vs Forecast 
	var actual_value = parseFloat(notNullFn(data['header']['actual_value'])).toFixed(2);
	var target_value = parseFloat(notNullFn(data['header']['target_value'])).toFixed(2);
	var forecast_value = parseFloat(notNullFn(data['header']['forecast_value'])).toFixed(2);
	
	var actual_vs_forecast="";
	var actual_vs_target="";
	
	actual_vs_forecast= (actual_value/forecast_value)*100;
	actual_vs_target= (actual_value/target_value)*100;

	 //target,over_target,center,performance2,performance1
	//target,allArea,green,yellow,red
	console.log(data['header']['result_threshold_color']);
	var rangeColorsThreshold=[];
	var ragneValue1=[100,parseInt( parseFloat(notNullFn(data['header']['actual_vs_forecast'])).toFixed(2))];
	var ragneValue2=[100,parseInt( parseFloat(notNullFn(data['header']['actual_vs_target'])).toFixed(2))];
	var rageGreenColor="";
	$.each(data['header']['result_threshold_color'],function(index,indexEntry){
		

		ragneValue1.push(parseInt(indexEntry['end_threshold']));
		ragneValue2.push(parseInt(indexEntry['end_threshold']));
		rangeColorsThreshold.push("#"+indexEntry['color_code']);
		if(index==0){
		rageGreenColor="#"+indexEntry['color_code'];
		}
	});
	
	
		console.log(ragneValue1);
	    $("#actualvsForecastBar").sparkline(ragneValue1, {
	        type: 'bullet',
	        width:'80',
	        targetColor: '#fefefe',
		    performanceColor: '#282a4b',
	        rangeColors: rangeColorsThreshold});
	    
	    
	    $("#actualvsTargetBar").sparkline(ragneValue2, {
	        type: 'bullet',
	        width:'80',
	        targetColor: '#fefefe',
		    performanceColor: '#282a4b',
	        rangeColors: rangeColorsThreshold});
	    
	    $(".jqstooltip").hide();
	    
	
	    
	    
	 
}

var insertActionPlanInlineFn = function(){	
	
	
	var htmlTR = ""
			
			htmlTR+="<tr>";
				htmlTR+="<td>";
				htmlTR+="<center>";
				htmlTR+="<input type='checkbox' name='new_action_plan_id-"+globalCount+"' id='new_action_plan_id-"+globalCount+"' class='new_action_plan_id' value=''>";
				htmlTR+="</center>";
				htmlTR+="</td>";
				htmlTR+="<td><input style=\"height:20px;margin-right:3px; width:200px;\" type='text' id='new_action_plan_name-"+globalCount+"' name='new_action_plan_name-"+globalCount+"' value=''></td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_plan_start_date-"+globalCount+"' id='new_plan_start_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_plan_end_date-"+globalCount+"' id='new_plan_end_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_actual_start_date-"+globalCount+"' id='new_actual_start_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px;margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input type='text' name='new_actual_end_date-"+globalCount+"' id='new_actual_end_date-"+globalCount+"' class='datepicker input-small' style=\"height:20px; margin-right:3px;\" value=''>";
				htmlTR+="</td>";
				htmlTR+="<td id='new_phast_list_area-"+globalCount+"'>";
				htmlTR+="<select id='new_phase_list-"+globalCount+"' name='new_phase_list-"+globalCount+"' class='input-small' style=\"height:22px; margin-right:3px;\">";
					$.each(phaseArray,function(index2,indexEntry2){
						
						htmlTR+="<option value='"+indexEntry2['phase_id']+"'>"+indexEntry2['phase_name']+"</option>";
					});
				htmlTR+="</select>";
				htmlTR+="</td>";
				htmlTR+="<td>";
				if($("#actionplan_emp_id").val()!=""){
					htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_responsible-"+globalCount+"' class='new_responsible' name='new_responsible-"+globalCount+"' value='"+$("#actionplan_emp_id").val()+"-"+$("#actionplan_emp_name").val()+"'>";
					
				}else{
					htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_responsible-"+globalCount+"' class='new_responsible' name='new_responsible-"+globalCount+"' value=''>";
					
				}
				htmlTR+="</td>";
				htmlTR+="<td>";
				htmlTR+="<input style=\"height:20px;margin-right:3px; width:100px;\" type='text' id='new_completed_percent-"+globalCount+"' name='new_completed_percent-"+globalCount+"' value=''>";//Completed
				htmlTR+="</td>";
			htmlTR+="</tr>";
			

		 $("#listDataActionPlan").append(htmlTR);
		 $(".datepicker").datepicker();
		 $(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );
		 
		
		 
		 $(".datepicker").focus(function(){
			 $("#ui-datepicker-div").css({"z-index": "999999"});
		 });
		 
		 //Autocomplete START.
		 $(".new_responsible").autocomplete({
		        source: function (request, response) {
		        	$.ajax({
						 url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/auto_employee_name",
						 type:"get",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
						 data:{
							 "emp_name":request.term,
							 },
		                 error: function (xhr, textStatus, errorThrown) {
		                        console.log('Error: ' + xhr.responseText);
		                    },
						 success:function(data){
								response($.map(data, function (item) {
		                            return {
		                                label: item.emp_id+"-"+item.emp_name,
		                                value: item.emp_id+"-"+item.emp_name
		                            };
		                        }));
						},
						beforeSend:function(){
							$("body").mLoading('hide');	
						}
						
						});
		        }
		    }); 
		 globalCount++;
}


var getActionPlanFn = function(id){
	globalCount=0;
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			listActionPlanFn(data);
		}
	});
	
}


/* phase function start*/
var deletePhaseFn = function(id){
	
	 $.ajax({
		      url:restfulURL+"/"+serviceName+"/public/phase/"+id,
		      type:"DELETE",
		      dataType:"json",
			  headers:{Authorization:"Bearer "+tokenID.token},
			  success:function(data){ 
				if(data['status']==200){
					
					   callFlashSlide(Liferay.Language.get('delete-successfully'));       
				       getPhaseFn($("#phase_item_result_id").val());
					   $("#confrimModal").modal('hide');
					   
				}else if(data['status']=="400"){				
					callFlashSlide("<font color=''>"+data['data']+"</font>","error");  
					
				}
		     }
		   });
}



var findOnePhaseFn = function(id){
	
	//get structure
	
	//get data for structure
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/phase/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		
/*
				"{

			    ""phase_id"": 4,
			    ""phase_name"": ""Ceta"",
			    ""is_active"": 1

			}"
*/				$("#phaseName").val(data['phase_name']);
				if(data['is_active']==1){
					$("#phaseIsActive").prop('checked',true);
				}else{
					$("#phaseIsActive").prop('checked',false);
				}

				$("#phase_action").val("edit");
				$("#pahse_id_edit").val(id);
		
			
			
		}
	});
	
}


var listPhaseFn = function(data){
	var htmlTR="";
	
	//Exsample Data 
	/*
	phase_id
	phase_name
	is_active
	*/
	$.each(data,function(index,indexEntry){
		htmlTR+="<tr>";
			htmlTR+="<td>"+indexEntry['phase_id']+"</td>";
			htmlTR+="<td>"+indexEntry['phase_name']+"</td>";
			if(indexEntry['is_active']==1){
				htmlTR+="<td style='text-align:center;'><input disabled checked type='checkbox' id='' name=''></td>";
			}else{
				htmlTR+="<td style='text-align:center;'><input disabled type='checkbox' id='' name=''></td>";
			}
			
			htmlTR+="<td style='text-align:center;'>";
	
			htmlTR+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit_phase' id=edit_phase-"+indexEntry['phase_id']+" data-target='' data-toggle='modal'&gt;"+Liferay.Language.get('edit')+"&lt;/button&gt;&nbsp;&lt;button id=del_phase-"+indexEntry['phase_id']+" class='btn btn-danger btn-small btn-gear phaseDel'&gt;"+Liferay.Language.get('delete')+"&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
			
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});
	
	
	
	$("#listDataPhase").html(htmlTR);
	
	/*bindding popover start*/
	$(".popover-edit-del").popover({
		delay : {
			hide : 100
		}
	});
	
	$("#listDataPhase").off("click",".popover-edit-del");
	$("#listDataPhase").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".phaseDel").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			//$(this).parent().parent().parent().children().click();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				//alert(id);
				deletePhaseFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit_phase").on("click",function() {
			
			$(window).scrollTop(0);
			var edit=this.id.split("-");
			var id=edit[1];
			//alert(id+"-----"+form_url);
			findOnePhaseFn(id);
			$(".modal-body").scrollTop(0);
		});
	});	
	/*bindding popover end*/
	
}
var clearFormPhaseFn = function(){
	 $("#phaseName").val("");
	 $("#pahse_id_edit").val("");
	 $("#phase_action").val("add");
	 $("#phaseIsActive").prop('checked',true);
}
var getPhaseFn = function(id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/phase",
		type:"get",
		dataType:"json",
		async:false,
		data:{"item_result_id":id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listPhaseFn(data);
		}
	});
	
}
/* phase function end*/
/* attach function start*/
var getAttachFileFn = function(id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			listAttachFileFn(data);
		}
	});
	
}

var listAttachFileFn = function(data){
	var host = "http://"+window.location.hostname;

	var html="";
	
	$.each(data,function(index,indexEntry){
		html+="<tr>";
			html+="<td  style='text-align:center;'>"+(index+1)+"</td>";
			html+="<td>"+indexEntry['doc_path']+"</td>";
			html+="<td style='text-align:center;'><a target=\"_blank\" href=\""+restfulURL+"/"+serviceName+"/public/"+indexEntry['doc_path']+"\" class='attachDownload' id='attachDownload-"+indexEntry['result_doc_id']+"'><i class='fa fa-download'></i></a>,<a class=\"delAttach\" id=\"delAttach-"+indexEntry['result_doc_id']+"\" href=\"#\"><i style='color:red;' class='icon-trash'></i></a></td>";
		html+="</tr>";
	});

	$("#listDataAttachFile").html(html);
	$(".delAttach").click(function(){
		var id = this.id;
		id = id.split("-");
		id=id[1];
		$("#confrimModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		}).css({"margin-top":"0px"});
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
			deleteAttachFileFn(id);
			
		});
		
	});
	
}
var deleteAttachFileFn = function(id){

	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/delete_file/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				getAttachFileFn($("#item_result_id").val());
				findOneFn($("#emp_result_id").val());
				$("#confrimModal").modal('hide');
			}
		}
	});
}
/* attach function end*/
/* phase function end*/



/* reason function start*/
var deleteReasonFn = function(id){
	
	 $.ajax({
		      url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
		      type:"DELETE",
		      dataType:"json",
			  data:{"reason_id":id},
			  headers:{Authorization:"Bearer "+tokenID.token},
			  success:function(data){
				if(data['status']==200){
					
					   callFlashSlide(Liferay.Language.get('delete-successfully'));       
				       getReasonFn($("#reason_item_result_id").val());
					   $("#confrimModal").modal('hide');
					   
				}else if(data['status']=="400"){
					callFlashSlide("<font color=''>"+data['data']+"</font>","error");  
					
				}
		     }
		   });
}

var findOneReasonFn = function(id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val()+"/"+id,
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		

				$("#reason_name").val(data['reason_name']);
				$("#reason_action").val("edit");
				$("#reason_id_edit").val(id);
		
			
			
		}
	});
	
}

var listReasonFn = function(data){
	var htmlTR="";
	
	//Exsample Data 
	$.each(data,function(index,indexEntry){
		htmlTR+="<tr>";
			htmlTR+="<td>"+indexEntry['rank']+"</td>";
			htmlTR+="<td><div style='word-break: break-all;'>"+indexEntry['reason_name']+"<div>";
			htmlTR+="<td style='text-align:center;'>";
			htmlTR+=" <i data-trigger=\"focus\" tabindex=\""+index+"\" data-content=\"&lt;button class='btn btn-warning btn-small btn-gear edit_reason' id=edit_reason-"+indexEntry['reason_id']+" data-target='' data-backdrop='"+setModalPopup[0]+"' data-keyboard='"+setModalPopup[1]+"' data-toggle='modal'&gt;"+Liferay.Language.get('edit')+"&lt;/button&gt;&nbsp;&lt;button id=del_reason-"+indexEntry['reason_id']+" class='btn btn-danger btn-small btn-gear reasonDel'&gt;"+Liferay.Language.get('delete')+"&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-cog font-gear popover-edit-del\" data-original-title=\"\" title=\"\"></i>";
			htmlTR+="</td>";
		htmlTR+="</tr>";
	});
	
	$("#listDataReason").html(htmlTR);
	
	/*bindding popover start*/
	$(".popover-edit-del").popover({
		delay : {
			hide : 100
		}
	});
	$("#listDataReason").off("click",".popover-edit-del");
	$("#listDataReason").on("click",".popover-edit-del",function(){
		//Delete Start
		$(".reasonDel").on("click",function() {
			$("#informConfirm").empty();
			var id=this.id.split("-");
			id=id[1];
			$("#confrimModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				deleteReasonFn(id);
				
			});
			
		});
		//findOne Start
		$(".edit_reason").on("click",function() {
			
			$(window).scrollTop(0);
			var edit=this.id.split("-");
			var id=edit[1];
			findOneReasonFn(id);
			$(".modal-body").scrollTop(0);
		});
	});	
	/*bindding popover end*/
	
	
	
}
var clearFormReasonFn = function(){
	 $("#reason_name").val("");
	 $("#reason_id_edit").val("");
	 $("#reason_action").val("add");
	
}
var getReasonFn = function(id){
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+id,
		
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			listReasonFn(data);
		}
	});
	
}
/* reason function start*/


var listDataFn = function(data){
	htmlHTML="";	

	htmlHTML="";
	$.each(data['group'],function(index,indexEntry){
	
	htmlHTML+="<div class=\"row-fluid\">";
	htmlHTML+="<div class=\"span12\">";
	htmlHTML+="<div class=\"ibox-title2\">";
	htmlHTML+="<div class=\"titlePanel2\">"+indexEntry['appraisal_period_desc']+" </div> ";
            
	htmlHTML+="</div>";
			
		htmlHTML+="<div class=\"ibox-content\">";
					
					
		htmlHTML+="<div class=\"table-responsive\" style='overflow:auto;'>";
		htmlHTML+="<table id=\"tablethreshould\" class=\"table table-striped\" style=\"max-width: none;\">";
           		
		htmlHTML+=" <thead>";
			htmlHTML+=" <tr>";
				
			if($("#embed_appraisalType").val()=="2"){
				
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('emp-code')+" </b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>"+Liferay.Language.get('emp-name')+" </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('level')+" </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('organization')+" </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('position')+" </b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('action')+" </b></th>";
				
			}else if($("#embed_appraisalType").val()=="1"){
				
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('org-code')+"</b></th>";
				htmlHTML+=" <th style=\"widthauto;\"><b>"+Liferay.Language.get('org-name')+"</b></th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('level')+"</b> </th>";
				htmlHTML+=" <th style=\"width:auto;\"><b>"+Liferay.Language.get('action')+"</b></th>";
				
			}
				
			
				
//				emp_code
//				emp_name
//				appraisal_level_name
//				appraisal_type_name
//				position_name
//				assign
//				to_action
				
	htmlHTML+=" </tr>";
		htmlHTML+=" </thead>";
			htmlHTML+=" <tbody>";
			$.each(indexEntry['items'],function(index2,itemEntry){	
				
		
				if($("#embed_appraisalType").val()=="2"){
					
				
					htmlHTML+="<tr>";
					
						htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+itemEntry['emp_result_id']+"\" >"+itemEntry['emp_code']+"</a>";
						htmlHTML+="<input type='hidden' name='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_type_id' value='"+itemEntry['appraisal_type_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_period_id-"+itemEntry['emp_result_id']+"' id='emp_period_id-"+itemEntry['emp_result_id']+"' class='emp_period_id' value='"+itemEntry['period_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_emp_code-"+itemEntry['emp_result_id']+"' id='emp_emp_code-"+itemEntry['emp_result_id']+"' class='emp_emp_code' value='"+itemEntry['emp_code']+"' >";
						htmlHTML+="<input type='hidden' name='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_item_id' value='"+itemEntry['appraisal_item_id']+"' >";
						htmlHTML+"</td>";
						htmlHTML+=" <td>"+itemEntry['emp_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['appraisal_level_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['org_name']+"</td>";
						htmlHTML+="	<td>"+itemEntry['position_name']+"</td>";
						
						htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
					
					htmlHTML+="</tr>";
					
				}else if($("#embed_appraisalType").val()=="1"){
					
					htmlHTML+="<tr>";
					
						htmlHTML+="	<td class=''><a href=\"#\" class='emp_code' id=\"id-"+itemEntry['emp_result_id']+"\" >"+itemEntry['org_code']+"</a>";
						htmlHTML+="<input type='hidden' name='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_type_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_type_id' value='"+itemEntry['appraisal_type_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_period_id-"+itemEntry['emp_result_id']+"' id='emp_period_id-"+itemEntry['emp_result_id']+"' class='emp_period_id' value='"+itemEntry['period_id']+"' >";
						htmlHTML+="<input type='hidden' name='emp_emp_code-"+itemEntry['emp_result_id']+"' id='emp_emp_code-"+itemEntry['emp_result_id']+"' class='emp_emp_code' value='"+itemEntry['emp_code']+"' >";
						htmlHTML+="<input type='hidden' name='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' id='emp_appraisal_item_id-"+itemEntry['emp_result_id']+"' class='emp_appraisal_item_id' value='"+itemEntry['appraisal_item_id']+"' >";
						htmlHTML+"</td>";
						htmlHTML+=" <td>"+itemEntry['org_name']+"</td>";
						htmlHTML+=" <td>"+itemEntry['appraisal_level_name']+"</td>";
					
						htmlHTML+="	<td>"+itemEntry['to_action']+"</td>";
					
					htmlHTML+="</tr>";
				}
					
			
			});
			htmlHTML+=" </tbody>";
			htmlHTML+="  </table>";
			
			htmlHTML+=" </div>";
			htmlHTML+="</div>";
		htmlHTML+="</div>";
	htmlHTML+="</div>";

	});
	
	$("#listAppraisal").html(htmlHTML);	

}
var getDataFn = function(page,rpp){

	/*
	embed_AppraisalYear
	embed_AppraisalPeriod
	embed_AppraisalLevel
	embed_Department
	embed_Section
	embed_Position
	embed_EmpName
	embed_appraisalType
	*/
	
	var AppraisalYear = $("#embed_AppraisalYear").val();
	var AppraisalPeriod= $("#embed_AppraisalPeriod").val();
	var AppraisalLevel= $("#embed_AppraisalLevel").val();
	var Organization= $("#embed_Org").val();
	var org_id=Organization.split('-');
	org_id=org_id[0];
	var Position= $("#embed_Position").val();
	var EmpName= ($("#embed_EmpName").val());
	var EmpID=EmpName.split('-');
	EmpID=EmpID[0];
	
	var appraisal_type_id= ($("#embed_appraisalType").val());
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{
			"page":page,
			"rpp":rpp,	
			"appraisal_year":AppraisalYear,
			"period_no":AppraisalPeriod,
			"level_id":AppraisalLevel,
			"org_id":org_id,
			"position_id":Position,
			"emp_id":EmpID,
			"appraisal_type_id":appraisal_type_id
		
			
		},
		success:function(data){
			
			listDataFn(data);
			setThemeColorFn(tokenID.theme_color);
			globalData=data;
			paginationSetUpFn(globalData['current_page'],globalData['last_page'],globalData['last_page']);
			$(".search_result").show();
		}
	});
};

//SearchAdvance
var searchAdvanceFn = function() {
	
	/*
	AppraisalYear
	AppraisalPeriod
	AppraisalLevel
	Department
	Section
	Position
	EmpName
	*/
	
	var Position= $("#Position").val().split("-");
	Position=Position[0];
	
	$(".embed_param_search").remove();
	var embedParam="";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalYear' name='embed_AppraisalYear' value='"+$("#AppraisalYear").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalPeriod' name='embed_AppraisalPeriod' value='"+$("#AppraisalPeriod").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_AppraisalLevel' name='embed_AppraisalLevel' value='"+$("#AppraisalLevel").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Org' name='embed_Org' value='"+$("#organization").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_Position' name='embed_Position' value='"+Position+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_EmpName' name='embed_EmpName' value='"+$("#EmpName").val()+"'>";
	embedParam+="<input type='hidden' class='embed_param_search' id='embed_appraisalType' name='embed_appraisalType' value='"+$("#appraisalType").val()+"'>";
	
	$("#embedParamSearch").append(embedParam);
	
	getDataFn();
};
var dropDrowAsignToEditFn = function(paramStageID){

	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/edit_assign_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":paramStageID},
		success:function(data){
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
var dropDrowActionEditFn = function(stage_id,to_appraisal_level_id){
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/edit_action_to",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"stage_id":stage_id,"to_appraisal_level_id":to_appraisal_level_id},
		success:function(data){
			if(data==''){
				$("#btnSubmit").attr("disabled","disabled");
			}else{
				$("#btnSubmit").removeAttr("disabled");
			}
			var htmlOption="";
			$.each(data,function(index,indexEntry){
				if(id==indexEntry['stage_id']){
					htmlOption+="<option selected='selected' value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}else{
					htmlOption+="<option value="+indexEntry['stage_id']+">"+indexEntry['to_action']+"</option>";
				}
			});
			$("#actionToAssign").html(htmlOption);
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
				if(id==undefined){
						if(index==0){	
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}
				}else{
					if(id==indexEntry['appraisal_type_id']){
							htmlOption+="<option selected='selected' value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
						}else{
							htmlOption+="<option value="+indexEntry['appraisal_type_id']+">"+indexEntry['appraisal_type_name']+"</option>";
							
					}
				}
				
			});
			$("#appraisalType"+nameArea).html(htmlOption);
		}
	});
}
var validationAppraisalFn = function(data){

	var errorData="";
	var count=0;
	
	
	errorData=stripJsonToString(data['data']);

	return errorData;
	
}

var saveAppraisalFn = function(){
	
	
//	"stage_id,
//	appraisal: [
//	  {
//	     item_result_id: '',
//	     score: ''
//	  },...
//	]"
	var appraisal=""; 
	appraisal+="[";
	$.each($(".itemScore").get(),function(index,indexEntry){
		var typeScore="";
		var item_result_id=$(indexEntry).attr("id");
		item_result_id=item_result_id.split("-");
		typeScore=item_result_id[0];
		item_result_id=item_result_id[1];
		
		var actual_value = $(indexEntry).attr("value-actual");
		
		if(index==0){
			appraisal+="{";
		}else{
			appraisal+=",{";
		}
		appraisal+="\"item_result_id\":\""+item_result_id+"\",";
		if(typeScore=="forecast"){
			appraisal+="\"forecast_value\":\""+removeComma($(indexEntry).val())+"\",";
			appraisal+="\"actual_value\":\""+actual_value+"\",";
			appraisal+="\"score\":\"\"";
			
		}else if(typeScore=="competencyScore"){
			appraisal+="\"forecast_value\":\"\",";
			appraisal+="\"actual_value\":\"\",";
			appraisal+="\"score\":\""+$(indexEntry).val()+"\"";
		}
		
		
		appraisal+="}";
	});
	appraisal+="]";
	var appraisalObject=eval("("+appraisal+")");
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/appraisal/"+$("#emp_result_id").val(),
		type:"patch",
		dataType:"json",
		async:false,
		data:{
			"stage_id":$("#actionToAssign").val(),
			"remark":$("#remark_footer").val(),
			"appraisal":appraisalObject
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			if(data['status']==200){
				
				
				$("#ModalAppraisal").modal('hide');
				callFlashSlide("Saved.");
				
			}else if(data['status']==400){
				
				
				callFlashSlideInModal(validationAppraisalFn(data),"#information","error"); 
			}
		}
	});
}


var calculateBunusFn= function(){
	/*
	appraisal_type_id,
	period_id,
	emp_code,
	appraisal_item_id
	*/

}



var generateGanttChartFn = function(dataSource){
	
    var revgannttChart = new FusionCharts({
    	type: 'gantt',
        renderAt: 'ganttChart',
        width: '100%',
        //height: '600',
        dataFormat: 'json',
        dataSource: dataSource
    })
    .render();
	
 return false;
};
var diffDateFn =function(date1,date2){
	// Here are the two dates to compare
	/*
	var date1 = '2011-12-24';
	var date2 = '2012-02-01';
	*/
	// First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
	date1 = date1.split('-');
	date2 = date2.split('-');

	// Now we convert the array to a Date object, which has several helpful methods
	date1 = new Date(date1[0], date1[1], date1[2]);
	date2 = new Date(date2[0], date2[1], date2[2]);

	// We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
	date1_unixtime = parseInt(date1.getTime() / 1000);
	date2_unixtime = parseInt(date2.getTime() / 1000);

	// This is the calculated difference in seconds
	var timeDifference = date2_unixtime - date1_unixtime;

	// in Hours
	var timeDifferenceInHours = timeDifference / 60 / 60;

	// and finaly, in days :)
	var timeDifferenceInDays = timeDifferenceInHours  / 24;

		if(timeDifferenceInDays>365){
			timeDifferenceInDays=365;
		}
	return timeDifferenceInDays;
}

var getDataGanttChartFn = function(item_result_id,ganttPaneDuration,ganttPaneDurationUnit){
	var ganttPaneDurationVarible="";
	var ganttPaneDurationUnit="";
	
	
	if(ganttPaneDurationUnit==undefined || ganttPaneDurationUnit==""){
		ganttPaneDurationUnit='d';
	}else{
		ganttPaneDurationUnit=ganttPaneDurationUnit;
	}
	
	
	
	$.ajax({
		url:restfulURL+"/"+serviceName+"/public/dashboard/gantt",
		type:"get",
		dataType:"json",
		data:{"item_result_id":item_result_id},
		async:false,
		success:function(data){
			var tasksLength=0;
			var startDate="";
			var endDate="";
			tasksLength=data['tasks']['task'].length;
			if(tasksLength>0){
				
				startDate=data['tasks']['task'][0]['start'];
				endDate=data['tasks']['task'][(tasksLength-1)]['end'];
				
				console.log("ganttPaneDuration="+ganttPaneDuration);
				if(ganttPaneDuration==undefined || ganttPaneDuration==""){
					ganttPaneDurationVarible=diffDateFn(startDate,endDate);
					console.log(diffDateFn(startDate,endDate));
				}else{
					ganttPaneDurationVarible=ganttPaneDuration;
				}
				$("#selectGanntChartViewDaily").val(365);
			}else{
				$("#selectGanntChartViewDaily").val(1);
			}
		if(data['header']['emp_name']=="" || data['header']['emp_name']==null){
			$(".ganntChartTitleOrg").show();
			$(".ganntChartTitleEmp").hide();
		}else{
			$(".ganntChartTitleOrg").hide();
			$(".ganntChartTitleEmp").show();
		}
		$(".ganttOrgTxt").text(data['header']['org_name']);
		$(".ganttAppraisalItemTxt").text(data['header']['item_name']);
		$(".ganttAppraisalPeriodDescTxt").text(data['header']['appraisal_period_desc']);
		$(".ganttEmpTxt").text(data['header']['emp_name']);
		
			var dataGantt="";
			var objectGantt={};
			objectGantt={
	            "chart": {
	            	"exportenabled": "1",
	                "exportatclient": "1",
	                //"caption": "Action Plan",
	                //"subcaption": "Planned vs Actual",                
	                "dateformat": "dd/mm/yyyy",
	                "outputdateformat": "ddds mns yy",
	                "ganttwidthpercent": "60",
	                "ganttPaneDuration": "365",
	               // "ganttPaneDuration": ganttPaneDurationVarible,
	               // "ganttPaneDurationUnit": "d",
	                "ganttPaneDurationUnit": ganttPaneDurationUnit,
	                "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
	                "legendBorderAlpha": "0",
	                "legendShadow": "0",
	                "usePlotGradientColor": "0",
	                "showCanvasBorder": "0",
	                "flatScrollBars": "1",
	                "gridbordercolor": "#333333",
	                "gridborderalpha": "5",
	                "slackFillColor": "#e44a00",
	                "taskBarFillMix": "light+0"
	            }, 
	             "categories":data['categories'],
	             "processes":data['processes'],
	             "datatable":data['datatable'],
	             "tasks":data['tasks'],
	             "legend": {
	                 "item": [
	                     {
	                         "label": "Planned",
	                         "color": "#008ee4"
	                     },
	                     {
	                         "label": "Actual",
	                         "color": "#6baa01"
	                     },
	                     {
	                         "label": "Slack (Delay)",
	                         "color": "#e44a00"
	                     }
	                 ]
	             }
	            /*
	            "categories":data['categories'],
	            "processes":data['processes'],
	            "datatable":data['datatable'],
	            "tasks":data['tasks']
	            */
	            
	        }
			//console.log(objectGantt);
			generateGanttChartFn(objectGantt);
			 
			/* test here start*/
			$("#ganttChartModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
		}
	});
};

var listViewDailyOrMonthlyFn = function(){
	html="";
	for(var i=1;i<=365;i++){
		if(i==1){
			html+="<option value="+i+">"+i+" day</option>";
		}else{
			html+="<option value="+i+">"+i+" days</option>";
		}
		
	}
	$("#selectGanntChartViewDaily").html(html);
}

var btnEditGoodP = function(){
	//alert(id_in.length);
	
	for(var i=0;i<disable_state_in.length;i++){
		disable_state_in[i]= false;
	}
	for(var i=0;i<id_in.length;i++){
		var num = parseInt(id_in[i]);
		console.log(id_in[i]);
		document.getElementById("s"+num).disabled = disable_state_in[i];
		document.getElementById("t"+num).disabled = disable_state_in[i];
	}
	
	for(var i=0;i<disable_state_out.length;i++){
		disable_state_out[i]= false;
	}
	for(var i=0;i<id_out.length;i++){
		var num = parseInt(id_out[i]);
		console.log(id_out[i]);
		document.getElementById("s"+num).disabled = disable_state_out[i];
		document.getElementById("t"+num).disabled = disable_state_out[i];
	}
	
}
var btnCancleGoodP = function(){
	arrOut=new Array();
	disable_state_out=new Array();
	id_out=new Array();
	arrIn=new Array();
	disable_state_in=new Array();
	id_in=new Array();
	GP_out=100;
	GP_in=1;
	addGP_in();
	addGP_in();
	addGP_out();
	addGP_out();
	goodPracticeBodyHTML();
	
}

var btnDeleteGoodP =function(){
	console.log(id_in);
	//alert('D');
	var checkbox = $('.form-check-input');
	//console.log(checkbox);
	$("input[type='checkbox']").each(function () {
          if($(this).prop("checked")){
        	  var key=$(this).attr('id');	
        	  var id = "#d"+key;
        	  console.log(id);
        	  if(key>=100){ 
        		  
        		  var index = -1;
        		  for(var i=0;i<id_out.length;i++){
        			  if(id_out[i]==key){
        				  index = i;
        				  break;
        			  }
        		  }
        		  console.log(index);
        		  arrOut.splice(index,1);
        		  disable_state_out.splice(index,1);
        		  id_out.splice(index,1);
        		  console.log(id_out);
        	  }else{
        		  var index = -1;
        		  for(var i=0;i<id_in.length;i++){
        			  if(id_in[i]==key){
        				  index = i;
        				  break;
        			  }
        		  }
        		  console.log(index);
        		  arrIn.splice(index,1);
        		  disable_state_in.splice(index,1);
        		  id_in.splice(index,1);
        		  console.log(id_in);
        	  }
        	  $(id).remove();
          }
         });
}

var temp_data_out=[];
var temp_height_out=[];
var temp_data_in=[];
var temp_height_in=[];
var btnAddGoodPIn = function(){
	 //alert( "A IN" );
	for(var i=0;i<id_in.length;i++){
		var num = parseInt(id_in[i]);
		temp_data_in.push($('#t'+num).val());
		temp_height_in.push($('#t'+num).innerHeight());
	}
	for(var i=0;i<id_out.length;i++){
		var num = parseInt(id_out[i]);
		temp_data_out.push($('#t'+num).val());
		temp_height_out.push($('#t'+num).innerHeight());
	}
	addGP_in();
	disable_state_in[disable_state_in.length-1] = false;
	goodPracticeBodyHTML();
	for(var i=0;i<temp_data_in.length;i++){
		var num = parseInt(id_in[i]);
		$('#t'+num).val(temp_data_in[i]);
		$('#t'+num).innerHeight(temp_height_in[i]);
	}
	for(var i=0;i<temp_data_out.length;i++){
		var num = parseInt(id_out[i]);
		$('#t'+num).val(temp_data_out[i]);
		$('#t'+num).innerHeight(temp_height_out[i]);
	}
	for(var i=0;i<id_in.length;i++){
		var num = parseInt(id_in[i]);
		document.getElementById("s"+num).disabled = disable_state_in[i];
		document.getElementById("t"+num).disabled = disable_state_in[i];
	}
	for(var i=0;i<id_out.length;i++){
		var num = parseInt(id_out[i]);
		console.log("In",num);
		document.getElementById("s"+num).disabled = disable_state_out[i];
		document.getElementById("t"+num).disabled = disable_state_out[i];
	}
	console.log("In",disable_state_in);
	console.log("Out",disable_state_out);
	temp_data_out=[];
	temp_height_out=[];
	temp_data_in=[];
	temp_height_in=[];
}

var btnAddGoodPOut = function(){
	// alert( "A Out" );
	for(var i=0;i<id_out.length;i++){
		var num = parseInt(id_out[i]);
		temp_data_out.push($('#t'+num).val());
		temp_height_out.push($('#t'+num).innerHeight());
	}
	for(var i=0;i<id_in.length;i++){
		var num = parseInt(id_in[i]);
		temp_data_in.push($('#t'+num).val());
		temp_height_in.push($('#t'+num).innerHeight());
	}
	addGP_out();
	goodPracticeBodyHTML();
	disable_state_out[disable_state_out.length-1] = false;
	for(var i=0;i<temp_data_in.length;i++){
		var num = parseInt(id_in[i]);
		$('#t'+num).val(temp_data_in[i]);
		$('#t'+num).innerHeight(temp_height_in[i]);
	}
	for(var i=0;i<temp_data_out.length;i++){
		var num = parseInt(id_out[i]);
		$('#t'+num).val(temp_data_out[i]);
		$('#t'+num).innerHeight(temp_height_out[i]);
	}
	for(var i=0;i<id_in.length;i++){
		var num = parseInt(id_in[i]);
		document.getElementById("s"+num).disabled = disable_state_in[i];
		document.getElementById("t"+num).disabled = disable_state_in[i];
	}
	for(var i=0;i<id_out.length;i++){
		var num = parseInt(id_out[i]);
		document.getElementById("s"+num).disabled = disable_state_out[i];
		document.getElementById("t"+num).disabled = disable_state_out[i];
	}
	console.log("In",disable_state_in);
	console.log("Out",disable_state_out);
	temp_data_out=[];
	temp_height_out=[];
	temp_data_in=[];
	temp_height_in=[];
}

var btnExportGoodP = function(){
	//document.getElementById("s1").disabled = true;
	 alert( "Export" );
}

var btnSaveGoodP = function(){
	alert( "Save" );
}


var btnEditLessonL = function(){
	//alert('E');
	for(var i=0;i<disable_state_in_ll.length;i++){
		disable_state_in_ll[i]= false;
	}
	for(var i=0;i<id_in_ll.length;i++){
		var num = parseInt(id_in_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_in_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_in_ll[i];
	}
	
	for(var i=0;i<disable_state_out_ll.length;i++){
		disable_state_out_ll[i]= false;
	}
	for(var i=0;i<id_out_ll.length;i++){
		var num = parseInt(id_out_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_out_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_out_ll[i];
	}
	
}
var btnCancleLessonL = function(){
	arrOutLL=new Array();
	disable_state_out_ll=new Array();
	id_out_ll=new Array();
	arrInLL=new Array();
	disable_state_in_ll=new Array();
	id_in_ll=new Array();
	LL_out=100;
	LL_in=1;
	addLL_in();
	addLL_in();
	addLL_out();
	addLL_out();
	lessonLearnBodyHTML();
}

var btnDeleteLessonL =function(){
	//alert('D');
	var checkbox = $('.form-check-input');
	//console.log(checkbox);
	$("input[type='checkbox']").each(function () {
          if($(this).prop("checked")){
        	  var key=$(this).attr('id');	
        	  var id = "#dl"+key;
        	  console.log(id);
        	  if(key>=100){
        		  var index = -1;
        		  for(var i=0;i<id_out.length;i++){
        			  if(id_out[i]==key){
        				  index = i;
        				  break;
        			  }
        		  }
        		  
        		  arrOutLL.splice(index,1);
        		  disable_state_out_ll.splice(index,1);
        		  id_out_ll.splice(index,1);
        	  }else{
        		  var index = -1;
        		  for(var i=0;i<id_in.length;i++){
        			  if(id_in[i]==key){
        				  index = i;
        				  break;
        			  }
        		  }
        		  arrInLL.splice(index,1);
        		  disable_state_in_ll.splice(index,1);
        		  id_in_ll.splice(index,1);
        	  }
        	  $(id).remove();
          }
         });
}

var btnAddLessonLIn = function(){
	 //alert( "A IN" );
	for(var i=0;i<id_in_ll.length;i++){
		var num = parseInt(id_in_ll[i]);
		temp_data_in.push($('#tl'+num).val());
		temp_height_in.push($('#tl'+num).innerHeight());
	}
	for(var i=0;i<id_out_ll.length;i++){
		var num = parseInt(id_out_ll[i]);
		temp_data_out.push($('#tl'+num).val());
		temp_height_out.push($('#tl'+num).innerHeight());
	}
	addLL_in();
	lessonLearnBodyHTML();
	disable_state_in_ll[disable_state_in_ll.length-1] = false;
	for(var i=0;i<temp_data_in.length;i++){
		var num = parseInt(id_in_ll[i]);
		$('#tl'+num).val(temp_data_in[i]);
		$('#tl'+num).innerHeight(temp_height_in[i]);
	}
	for(var i=0;i<temp_data_out.length;i++){
		var num = parseInt(id_out_ll[i]);
		$('#tl'+num).val(temp_data_out[i]);
		$('#tl'+num).innerHeight(temp_height_out[i]);
	}
	for(var i=0;i<id_in_ll.length;i++){
		var num = parseInt(id_in_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_in_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_in_ll[i];
	}
	for(var i=0;i<id_out_ll.length;i++){
		var num = parseInt(id_out_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_out_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_out_ll[i];
	}
	temp_data_out=[];
	temp_height_out=[];
	temp_data_in=[];
	temp_height_in=[];
}

var btnAddLessonLOut = function(){
	// alert( "A Out" );
	for(var i=0;i<id_in_ll.length;i++){
		var num = parseInt(id_in_ll[i]);
		temp_data_in.push($('#tl'+num).val());
		temp_height_in.push($('#tl'+num).innerHeight());
	}
	for(var i=0;i<id_out_ll.length;i++){
		var num = parseInt(id_out_ll[i]);
		temp_data_out.push($('#tl'+num).val());
		temp_height_out.push($('#tl'+num).innerHeight());
	}
	addLL_out();
	lessonLearnBodyHTML();
	disable_state_out_ll[disable_state_out_ll.length-1] = false;
	for(var i=0;i<temp_data_in.length;i++){
		var num = parseInt(id_in_ll[i]);
		$('#tl'+num).val(temp_data_in[i]);
		$('#tl'+num).innerHeight(temp_height_in[i]);
	}
	for(var i=0;i<temp_data_out.length;i++){
		var num = parseInt(id_out_ll[i]);
		$('#tl'+num).val(temp_data_out[i]);
		$('#tl'+num).innerHeight(temp_height_out[i]);
	}
	for(var i=0;i<id_in_ll.length;i++){
		var num = parseInt(id_in_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_in_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_in_ll[i];
	}
	for(var i=0;i<id_out_ll.length;i++){
		var num = parseInt(id_out_ll[i]);
		document.getElementById("sl"+num).disabled = disable_state_out_ll[i];
		document.getElementById("tl"+num).disabled = disable_state_out_ll[i];
	}
	temp_data_out=[];
	temp_height_out=[];
	temp_data_in=[];
	temp_height_in=[];
}

var btnExportLessonL = function(){
	//document.getElementById("s1").disabled = true;
	 alert( "Export" );
}

var btnSaveLessonL = function(){
	alert( "Save" );
}


$(function() {
	
	
	 username = $('#user_portlet').val();
	 password = $('#pass_portlet').val();
	var plid = $('#plid_portlet').val();
	
	if(username!="" && username!=null & username!=[] && username!=undefined ){
		if(connectionServiceFn(username,password,plid)==true){
	
		
	
	//Start Action plan by email link here..
	setTimeout(function(){
		if($("#param_link").val()=="email"){
			$("#actionPlanModal").modal({
				"backdrop" : setModalPopup[0],
				"keyboard" : setModalPopup[1]
			}).css({"margin-top":"0px"});
			getActionPlanFn($("#param_item_result_id").val());
			$("#action_actionplan").val("add");
		}
	},3000);	
		
	
	
	$("#assignTo").removeAttr("disabled");
	$("#actionToAssign").removeAttr("disabled");
	$("#btnSubmit").removeAttr("disabled");
	
	
	//set parameter start
		dropDrowYearListFn();
		$("#AppraisalYear").change(function(){
			dropDrowPeriodListFn($(this).val());	
		});
		//setTimeout(function(){
			$("#AppraisalYear").change();
		//},1000);

		dropDrowAppraisalLevelFn();
		
		$("#AppraisalLevel").change(function(){
			dropDrowOrgFn($(this).val());	
		});
		$("#AppraisalLevel").change();
		
		//Auto complete Start
		$("#Position").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/"+serviceName+"/public/appraisal/auto_position_name",
					 type:"get",
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
	
		
		/*
		org_id,
		position_id
		emp_name
		*/
		$("#EmpName").autocomplete({
	        source: function (request, response) {
	        	$.ajax({
					 url:restfulURL+"/"+serviceName+"/public/appraisal/auto_employee_name",
					 type:"get",
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
	                                label: item.emp_id+"-"+item.emp_name,
	                                value: item.emp_id+"-"+item.emp_name
	                            };
	                        }));
					},
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
					
					});
	        }
	    });
		appraisalTypeFn();
		
		$("#appraisalType").change(function(){
			
			if($("#appraisalType").val()==1){
				
				$("#Position").prop("disabled",true);
				$("#EmpName").prop("disabled",true);
				
				$("#Position").val("");
				$("#empName").val("");
				
			}else{
				$("#Position").prop("disabled",false);
				$("#EmpName").prop("disabled",false);
			}
		});
		
		$("#appraisalType").change();
		
		
		
	//set parameter end
		
		
		//search
		$("#btnSearchAdvance").click(function(){
			searchAdvanceFn();
			$(".countPagination").val(10);
			$("#rpp").remove();
		});
		
		//get appraisal detail.
		$(document).off("click",".emp_code");
		$(document).on("click",".emp_code",function(){	

		
			var id=this.id.split("-");
			id=id[1];
			findOneFn(id);
			$("#emp_result_id").val(id);
			//sessionStorage.getItem("tokenID");
			
			sessionStorage.setItem('appraisal_type_id',$('#emp_appraisal_type_id-'+id).val());
			sessionStorage.setItem('period_id',$('#emp_period_id-'+id).val());
			sessionStorage.setItem('emp_code',$('#emp_emp_code-'+id).val());
			sessionStorage.setItem('appraisal_item_id',$('#emp_appraisal_item_id-'+id).val());
			
			$(window).scrollTop(0);
			$(".modal-body").scrollTop(0);

			return false;
		});
		
		//submit
		$("#btnSubmit").click(function(){
			
			saveAppraisalFn();
			
			
		});
		
		
		
		
		//Action Plan Action Area...
		
		$("#btnAddActionPlan").click(function(){
			 
			  if($("#action_actionplan").val()=="add"){
				   
				insertActionPlanInlineFn();
				$("#action_new_actionplan").val("add");
				$("input.action_plan_id").prop("disabled",true);
				return false;
			  }else{
				  callFlashSlideInModal(Liferay.Language.get('can-not-add-action-plan-because-your-doing-update-data'),"#information3","error");
			  }
		  });
		 
		 
		  
		  $("#btnEditActionPlan").click(function() {
			
				if($("#action_new_actionplan").val()=="add"){
					callFlashSlideInModal(Liferay.Language.get('can-not-edit-action-plan-because-your-doing-insert-data'),"#information3","error");
					return false;
				  }
				
				$(".actionplan_label").hide();
				$(".actionplan_input").show();
				
				$("#action_actionplan").val("edit");
				
				
				
				$(".datepicker").datepicker();
				$(".datepicker").each(function() {    
					
					var dataDate=$(this).val().split("-");
					var newDataDate="";
					var yy=dataDate[0];
					var mm=dataDate[1];
					var dd=dataDate[2];
					newDataDate=mm+"/"+dd+"/"+yy;
				
					//10/12/2012
					//2017-08-22
				    $(this).datepicker('setDate', newDataDate);
				});
				$(".datepicker").datepicker( "option", "dateFormat", "yy-mm-dd" );
				$(".datepicker").focus(function(){
					 $("#ui-datepicker-div").css({"z-index": "999999"});
				 });
				
				
				
				
				//Autocomplete START.
				 $(".responsible").autocomplete({
				        source: function (request, response) {
				        	$.ajax({
								 url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/auto_employee_name",
								 type:"get",
								 dataType:"json",
								 headers:{Authorization:"Bearer "+tokenID.token},
								 data:{
									 "emp_name":request.term,
									 },
								 //async:false,
				                 error: function (xhr, textStatus, errorThrown) {
				                        console.log('Error: ' + xhr.responseText);
				                    },
								 success:function(data){
										response($.map(data, function (item) {
				                            return {
				                                label: item.emp_id+"-"+item.emp_name,
				                                value: item.emp_id+"-"+item.emp_name
				                            };
				                        }));
								},
								beforeSend:function(){
									$("body").mLoading('hide');	
								}
								
								});
				        }
				    });
				 //Autocomplete END.
				
			});
		  
		  
		  $(".app_url_hidden").show();
		  
		  
		//ปุ่ม add Action Plan
		$("#btnSaveActionPlan").click(function(){ 
			
				
			if($("#action_actionplan").val() == "edit") {	
				
		
				  
			
			  var action_plan_id="";
			  var phase_id = "";
			  var action_plan_name = "";
			  var plan_start_date = "";
			  var plan_end_date = "";
			  var actual_start_date = "";
			  var actual_end_date="";
			  
			  var plan_value="";
			  var actual_cost="";
			  var earned_value="";
			  var completed_percent="";
			  var emp_id="";
			  var new_responsible="";
			  
			  var actions = [];
				  
			
			  
			  $.each($(".action_plan_id"),function(index,indexEntry){
					 
					 var id=this.id.split("-");
					 var i=id[1];
					 
					
					 
					  action_plan_id=i;
					  phase_id=$("#phase_list-"+i).val();
					  action_plan_name = $("#action_plan_name-"+i).val();
					  plan_start_date = $("#plan_start_date-"+i).val();
					  plan_end_date = $("#plan_end_date-"+i).val();
					  actual_start_date = $("#actual_start_date-"+i).val();
					  actual_end_date=$("#actual_end_date-"+i).val();
					  completed_percent=$("#completed_percent-"+i).val();
					  if($("#responsible-"+i).val()==""){
						  emp_id="";
					  }else{
						  emp_id=$("#responsible-"+i).val().split("-");
						  emp_id=emp_id[0];
					  }
					
					

					   
					  actions.push({
						      action_plan_id:""+action_plan_id+"",
						      phase_id: ""+phase_id+"",
							  action_plan_name : ""+action_plan_name+"",
							  plan_start_date : ""+plan_start_date+"",
							  plan_end_date : ""+plan_end_date+"",
							  actual_start_date : ""+actual_start_date+"",
							  actual_end_date: ""+actual_end_date+"",
							  completed_percent: ""+completed_percent+"",
							  emp_id:emp_id
							  
					   });
			  });
				
				
					$.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"actions":actions},
						     headers:{Authorization:"Bearer "+tokenID.token},
						     async:false,
						     success:function(data,status){
							
						     	  if(data['status']==200 ){
									getActionPlanFn($("#item_result_id").val());
								  	$("#action_actionplan").val("add");
									if(data['data']['error'].length==0){
							      	
								  	callFlashSlideInModal(Liferay.Language.get('update-successfully'),"#information3"); 
							
									}else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
									  }
								  	  
								  }
							   }
					    });         
				
				    return false;
			}
				
			if($("#action_actionplan").val()=="add") {
				
				  var phase_id = "";
				  var action_plan_name = "";
				  var plan_start_date = "";
				  var plan_end_date = "";
				  var actual_start_date = "";
				  var actual_end_date="";
				  
				  var plan_value="";
				  var actual_cost="";
				  var earned_value="";
				  var completed_percent="";
				  var emp_id="";
				  var new_responsible="";
				  
				  var actions = [];
				  
				  $.each($(".new_action_plan_id"),function(index,indexEntry){
						 
						 var id=this.id.split("-");
						 var i=id[1];
						 
						
						
						  phase_id=$("#new_phase_list-"+i).val();
						  action_plan_name = $("#new_action_plan_name-"+i).val();
						  plan_start_date = $("#new_plan_start_date-"+i).val();
						  plan_end_date = $("#new_plan_end_date-"+i).val();
						  actual_start_date = $("#new_actual_start_date-"+i).val();
						  actual_end_date=$("#new_actual_end_date-"+i).val();
						  completed_percent=$("#new_completed_percent-"+i).val();
						  if($("#new_responsible-"+i).val()==""){
							  emp_id="";
						  }else{
							  emp_id=$("#new_responsible-"+i).val().split("-");
							  emp_id=emp_id[0];
						  }

						   
						  actions.push({
							   
							      phase_id: ""+phase_id+"",
								  action_plan_name : ""+action_plan_name+"",
								  plan_start_date : ""+plan_start_date+"",
								  plan_end_date : ""+plan_end_date+"",
								  actual_start_date : ""+actual_start_date+"",
								  actual_end_date: ""+actual_end_date+"",
								  completed_percent: ""+completed_percent+"",
								  emp_id:emp_id
								  
						   });
				  });
				
					  $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"POST",
						     dataType:"json",
						     data:{"actions": actions },
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
								if(data['data']['error']==undefined){
									callFlashSlideInModal(data['data'],"#information2","error");
								  }else{
						
								      if(data['data']['error'].length==0){
										getActionPlanFn($("#item_result_id").val());
									    callFlashSlideInModal(Liferay.Language.get('insert-successfully'),"#information3");
								     
								      }else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
										
										}
									  
								  }
							   }
					    });         
				
				    return false;
				}
			
				});

		 $(document).on("click","#btnDelActionPlan",function(){
			 	
				 var action_plan_id=[];
				 var actions=[];
				 
				 $.each($("input.new_action_plan_id:checked"),function(index,indexEntry){
		 			 
			 			$(this).parent().parent().parent().remove();
			 			 
			 	 });
				 
			 	 $.each($(".action_plan_id:checked"),function(index2,indexEntry3){
			 			
			 			 actions.push({
							   
						 		action_plan_id: ""+$(this).val()+"",
								  
						 	 });
			 	});
			 	
			 	  

					  $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/action_plan/"+$("#item_result_id").val(),
						     type:"DELETE",
						     dataType:"json",
						     data:{"actions": actions },
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
								
							
								
								 if(data['data']['error'].length==0){
										getActionPlanFn($("#item_result_id").val());
									    callFlashSlideInModal(Liferay.Language.get('delete-successfully'),"#information3");
								     
								      }else{
										callFlashSlideInModal(listErrorActionPlanFn(data['data']['error']),"#information3","error");
										
								}
								 
						}
					});
			 	 
			 	 
			 	
			 	 
			 	 
			 });
		//delete action plan end...
		 
		 //Cancel action plan start...
		 $("#btnCancelActionPlan").click(function(){
			 
			  
			  
			  //getActionPlanFn(3);
			  $(".actionplan_label").show();
			  $(".actionplan_input").hide();
			  
			  $("input.action_plan_id").prop("disabled",false);
			  $("#action_actionplan").val("add");
			  $("#action_new_actionplan").val("");
			  getActionPlanFn($("#item_result_id").val());
		  });
		 //Cancel action plan end...
		//Action Plan Action Area...
		
		
		
		
		
		}
	}
	
	
	
	//Phase Start...
	 $(document).on("click","#btnSavePhase",function(){
		 	
		 var is_active="";
		 if($("#phaseIsActive").prop('checked')==true){
			 is_active=1;
		 }else{
			 is_active=0
		 }

		 	if($("#phase_action").val()=="add"){
		 		
		 	
			 	  $.ajax({
					     url:restfulURL+"/"+serviceName+"/public/phase",
					     type:"POST",
					     dataType:"json",
					     data:{"phase_name": $("#phaseName").val(),"is_active":is_active,"item_result_id":$("#phase_item_result_id").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){
						
							if(data['status']==200){
								getPhaseFn($("#phase_item_result_id").val());
								clearFormPhaseFn();
								
							}else if(data['status']=="400"){
								
								//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
								callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  
								
							}
						
						
					}
			 	});
		 	
		 	}else{
		 		
		 		 $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/phase/"+$("#pahse_id_edit").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"phase_name": $("#phaseName").val(),"is_active":is_active,"item_result_id":$("#phase_item_result_id").val()},
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
							
								if(data['status']==200){
									getPhaseFn($("#phase_item_result_id").val());
									clearFormPhaseFn();
								}else if(data['status']=="400"){
									
									//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
									callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  
									
								}
							
							
						}
				 	});
		 		
		 	}
		 	
	 });
	 
	 $(document).on("click","#btnCancelPhase",function(){
		 clearFormPhaseFn();
		 getPhaseFn($("#phase_item_result_id").val());
	 });
	//Phase End...
	 
	//Reason Start..
	 $(document).on("click","#btnSaveReason",function(){
		 	
	

		 	if($("#reason_action").val()=="add"){
		 		
		 	
			 	  $.ajax({
					     url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
					     type:"POST",
					     dataType:"json",
					     data:{"reason_name": $("#reason_name").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){
						
							if(data['status']==200){
								getReasonFn($("#reason_item_result_id").val());
								clearFormReasonFn();
								
							}else if(data['status']=="400"){
								
								//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
								callFlashSlide("<font color=''>"+data['data']['reason_name']+"</font>","error");  
								
							}
						
						
					}
			 	});
		 	
		 	}else{
		 		
		 		 $.ajax({
						     url:restfulURL+"/"+serviceName+"/public/appraisal/reason/"+$("#reason_item_result_id").val(),
						     type:"PATCH",
						     dataType:"json",
						     data:{"reason_name": $("#reason_name").val(),"reason_id":$("#reason_id_edit").val()},
							 headers:{Authorization:"Bearer "+tokenID.token},
						     success:function(data,status){
							
								if(data['status']==200){
									getReasonFn($("#reason_item_result_id").val());
									clearFormReasonFn();
								}else if(data['status']=="400"){
									
									//$("#informConfirm").html("<font color='red'>"+data['data']+"</font>");
									callFlashSlide("<font color=''>"+data['data']['phase_name']+"</font>","error");  
									
								}
							
							
						}
				 	});
		 		
		 	}
		 	
	 });
	 
	 $(document).on("click","#btnCancelReason",function(){
		 clearFormReasonFn();
		 getReasonFn($("#reason_item_result_id").val());
	 });
	//Reason End...
	 
	 
	
	//binding tooltip start
	 $('[data-toggle="tooltip"]').css({"cursor":"pointer"});
	 $('[data-toggle="tooltip"]').tooltip({
		 html:true
	 });
	//binding tooltip end
	 
	
	 //gantt chart print start
	 $("#btnPrint").click(function(){
		 
		 
		 var url="../../see-kpi-portlet/print/gantt-chart.jsp?restfulURL="+restfulURL+"&item_result_id="+$("#gantt_item_result_id").val()+"&gantt_unit="+$("#gantt_unit").val()+"&gantt_amount="+$("#gantt_amount").val()+"";
		 url+="&entityType="+$("#embed_appraisalType").val();
		 url+="&period="+$(".ganntChartTitleEmpArea .ganttAppraisalPeriodDescTxt").text();
		 url+="&organization="+$(".ganntChartTitleEmpArea  .ganttOrgTxt").text();
		 url+="&appraisalItem="+$(".ganntChartTitleEmpArea  .ganttAppraisalItemTxt").text();
		 url+="&employee="+$(".ganntChartTitleEmpArea  .ganttEmpTxt").text();
		 
		 window.open(url, '_blank');
	 });
	 
	 //gantt chart print edn
	 
	 //gantt chart  view daily or monthly start.
	 listViewDailyOrMonthlyFn();
	 $("#selectGanntChartType").change(function(){
	
	 	if($(this).val()=="m"){
	 		$("#selectGanntChartViewDaily").hide();
	 		$("#selectGanntChartViewMonthly").show();
	 	}else{
	 		$("#selectGanntChartViewDaily").show();
	 		$("#selectGanntChartViewMonthly").hide();
	 	}
	 	$("#gantt_unit").val($(this).val());
	 });
	 $("#selectGanntChartType").change();
	 $("#btnGanttSubmit").click(function(){
	
		if($("#gantt_unit").val()=="m"){
			$("#gantt_amount").val($("#selectGanntChartViewMonthly").val());
		}else{
			$("#gantt_amount").val($("#selectGanntChartViewDaily").val());
		}
		
		getDataGanttChartFn($("#gantt_item_result_id").val(),$("#gantt_amount").val(),$("#gantt_unit").val());
		
	 });
	 //gantt chart  view daily or monthly end.
	 
	 
	 
	//Button Click Stage History Start.
	
	$("#slideUpDownStageHistory").click(function(){
		$("#slideStageHistory").slideToggle();
		return false;
	});
	
	//Button Click Stage History End.
	
	

	//####  FILE IMPORT  START #### 
	
	// Add events
	$('#attach_files_attachment').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	  files = event.target.files;
	  //start upload file
	  //uploadFiles(event);
		
	}
	
	$('form#attachFileForm').on('submit', uploadFiles);
	function uploadFiles(event)
	{
		var validate_header_id="";
		if(!$("#attach_files_attachment").val()){
			return false;
		
		}
	  event.stopPropagation(); // Stop stuff happening
	  event.preventDefault(); // Totally stop stuff happening

		// Create a formdata object and add the files
		var data = new FormData();
		jQuery_1_1_3.each(files, function(key, value)
		{
			data.append(key, value);
			//data.append("process_type",$("#embedParamSearchProcessType").val());
		});


		jQuery_1_1_3.ajax({
			url:restfulURL+"/"+serviceName+"/public/appraisal/upload_file/"+$("#attach_file_item_result_id").val(),
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success: function(data, textStatus, jqXHR)
			{
				if(data['status']==200 && data['data'].length>0){
					findOneFn($("#emp_result_id").val());
					callFlashSlideInModal(Liferay.Language.get('update-successfully'),".information");
					$('#attach_files_attachment').val("");
					$(".dropify-clear").click();

				}else{
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				//console.log('ERRORS: ' + textStatus);
				callFlashSlideInModal('ERRORS: ' + textStatus,".information");
				// STOP LOADING SPINNER
			}
		});
		

		return false;
	}	
	//### FILE IMPORT END ###
	// download attach file start
	$("#btnDownloadAttachFile").click(function(){
		
		$("#informConfirm").empty();
		var id=$("#item_result_id").val();
		$("#downloadAttachFileModal").modal({
			"backdrop" : setModalPopup[0],
			"keyboard" : setModalPopup[1]
		}).css({"margin-top":"0px"});
		getAttachFileFn(id);
	});
	//download attahc file end
});


