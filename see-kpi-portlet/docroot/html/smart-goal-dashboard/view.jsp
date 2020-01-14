<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ page import="com.liferay.portal.util.PortalUtil" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
/*
PortletSession portletSession1 = renderRequest.getPortletSession();
portletSession1.setAttribute("password", "authenticated", PortletSession.APPLICATION_SCOPE);
String pwd = (String) portletSession1.getAttribute("password", PortletSession.APPLICATION_SCOPE);
out.print(pwd);
String password=PortalUtil.getUser(request).getPassword();
*/

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
//out.print(username);

String param_link = PortalUtil.getOriginalServletRequest(request).getParameter("param_link");
String param_item_result_id = PortalUtil.getOriginalServletRequest(request).getParameter("param_item_result_id");
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(param);
//out.print("password2="+password);
%>
<input type="hidden" id="param_link" name="param_link" value="<%=param_link%>">
<input type="hidden" id="param_item_result_id" name="param_item_result_id" value="<%=param_item_result_id%>">

<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<style>
 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	
	#smartArea{
	display:show;
	}
	
	.breadcrumbs2 .row-fluid .span4{
			width: 32.624%;
		}
	
	#actionPlanModal{
		margin-top:0px;

	}
	.moblieArea{
		display:none;
	}
	.desktopArea{
		display:block;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}	
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}
	
	.aui .row-fluid#advanceSearchAppraisal .span3{
		width: 24.5%;
	}


	 
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	#smartArea{
	display:none;
	}
	
	.breadcrumbs2 .row-fluid .span4{
			width: 32.624%;
		}
		
	#actionPlanModal{
		margin-top:0px;
	}
		
	#actionPlanModal{
		margin-top:0px;
	}
	
	
	.moblieArea{
		display:none;
	}
	.desktopArea{
		display:block;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}	
	
	.aui #advanceSearchAppraisal.row-fluid .span3 {
    	width: 32.5%;
	}
		
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	.aui .modal{
		left:1%;
	}
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.pagingText{
		display:block;
	}
	.aui .p-t-xxs {
    	text-align: right;
	}
	.pagianation_area{
		position:'';
	}
	
	.aui .modal-body{
		/*max-height: 400px;*/	
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}

	
	
	.moblieArea{
		display:block;
		font-size:0.8em;
	}
	.desktopArea{
		display:none;
	}
	
	.saveAndCancelArea{
		text-align:right;
	}
	
	
	
	#actualvsTargetBar{
		display:none;
	}
	#actualvsForecastBar{
		display:none;
	}
	
	.aui #advanceSearchAppraisal.row-fluid .span3 {
	    width: 24.2%;
	}
	
	.aui .table-responsive {
	 white-space: nowrap;
	 /*overflow: hidden;*/
	 text-overflow: ellipsis;
	}
 
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 	
 	.modal.large {
 	
	    width: '';
	    top:0px;    
	}
	#grandTototalWeightArea{
		position: relative;
    	top: -300px;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	
	
		.pagianation_area{
		/*position:absolute;*/
	}
	
	.aui .modal-body{
		/*max-height: 300px;*/	
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	.moblieArea{
		display:block;
		font-size:0.7em;
	}
	.desktopArea{
		display:none;
	}
	.saveAndCancelArea{
		text-align:left;
	}
	.aui .table-responsive {
	 white-space: nowrap;
	 /*overflow: hidden;*/
	 text-overflow: ellipsis;
	}
	
	#actualvsTargetBar{
		display:'';
	}
	#actualvsForecastBar{
		display:'';
	}
	
	/*btn area start*/
	#btnSaveActionPlan{
		width:100%;
	}
	#btnCancelActionPlan{
		width:100%;
	}
	
	#btnAddActionPlan{
		width:100%;
	}
	#btnEditActionPlan{
		width:100%;
	}
	#btnDelActionPlan{
		width:100%;
	}
	#btnDownloadAttachFile{
		width:100%;
	}
	/*btn area end*/
 
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	.pagingText{
		display:none;
	}
	.aui .p-t-xxs {
    	text-align: left;
	}
	.pagianation_area{
		/*position:absolute;*/
	}
	.aui .modal-body{
		/*max-height: 300px;*/
	}
	#smartArea{
	display:none;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	#actionPlanModal{
		margin-top:0px;
	}
	
	.moblieArea{
		display:block;
		font-size:0.6em;
	}
	.desktopArea{
		display:none;
	}
	.saveAndCancelArea{
		text-align:left;
	}
	.aui .table-responsive {
	 white-space: nowrap;
	 /*overflow: hidden;*/
	 text-overflow: ellipsis;
	}
	
	#actualvsTargetBar{
		display:none;
	}
	#actualvsForecastBar{
		display:none;
	}
	
	
	/*btn area start*/
	#btnSaveActionPlan{
		width:100%;
	}
	#btnCancelActionPlan{
		width:100%;
	}
	
	#btnAddActionPlan{
		width:100%;
	}
	#btnEditActionPlan{
		width:100%;
	}
	#btnDelActionPlan{
		width:100%;
	}
	#btnDownloadAttachFile{
		width:100%;
	}
	/*btn area end*/
 

  }
  /* Landscape phones and down End##########################*/
  
  

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}

#countPaginationTop{
	width:60px;
}
#countPaginationBottom{
	width:60px;
}
#btnPaginationTop{
	width:300px;
	float:left;
}
#dropdownPaginationTop{
	/*width:100px;*/
	float:right;
}
#btnPaginationBottom{
	width:300px;
	float:left;
}
#dropdownPaginationBottom{
	/*width:100px;*/
	float:right;
}
.aui .pagination {
   margin: 0;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.aui .popover-content {
    padding: 5px;
}
.aui .modal-footer {
  
    border-radius: 0;
   
}

/*
.aui .modal {
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 23%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 90%;
    z-index: 1050;
}
*/
.aui input, .aui textarea, .aui .uneditable-input {
   /* width: 47px;*/
}

 .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 16px;
    padding: 5px;
    text-align: left;
    vertical-align: top;
}
.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input {
    border: 1px solid #ddd;
    color: #8d8d8d;
    font-weight: 200;
    margin-bottom: 0;
    
}
.aui #breadcrumbs {
    margin-bottom: 0;
}
.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	/*padding-bottom: 0px*/

}
.aui .searchAdvanceText{
	/*width:94%;*/
}
.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	padding:5px;
	padding-top:0px;
	height: 30px;
}
.aui .p-t-xxs{
 padding-top: 5px;
 /*text-align: right;
 font-weight: bold;*/
}
.aui .p-t-xxsg{
 padding-top: 5px;
 text-align: right;
 font-weight: bold;
}

.aui .pagination ul > li:last-child > a, .aui .pagination ul > li:last-child > span{
   border-bottom-right-radius: 0;
   border-top-right-radius: 0;
}
.aui .pagination ul > li:first-child > a, .aui .pagination ul > li:first-child > span{
	border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.aui .table td{
	font-size: 13px;
}
/*
.modal.large {
    width: 90%;
    margin-left:-45%;  
    top:0px;
}
*/
.aui #assignTo{
	width:100%;
}
.aui #actionToAssign{
	width:100%;
}

.aui .row-fluid [class*="span"]{
min-height: auto;
margin-bottom:1px;
}

.textInfo{
	font-wieght:bold;
	/*text-align:right;*/
}
/*
.aui label {
    color: #555;
    font-size: 16px;
}
*/
.aui #btnSearchAdvance{
	left:4px; position:relative;
}
.aui .textData{
	  font-weight: bold;
}

/* Important part */
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
.aui .table td{
	text-align: '';
}
/* Update by au */

.aui .btn {
	font-size: 14px;
 	padding: 4px 12px; 
	width: auto;
	margin-top: 0px;
	display: inline;
}


.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input {
    height: 30px;
    padding: 0 0 0 5px;
    font-size: 14px;
}


/* Modal action plan START */

.boxActionPlainArea{
	
}
.boxActionPlainArea .boxActionL{
	/*float:left;*/
	/*width:55%;*/
	/*border:1px solid #cccccc;*/
	margin-top: 3px;
}

.boxActionPlainArea .boxActionR{
	/*float:right;*/
	/*width:565px;*/
	/*width:45%;*/
	/*border:1px solid #cccccc;*/
}

.boxTargetArea{
	width:27%;
	float:left;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin-top:3px;
  	padding:5px;
  	height: 89px;
  	background:#fff;
	
}
.boxForecastArea{
	width:28.5%;
	float:right;
	
	/*
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin:1px;
  	padding:5px;
  	*/
  	
}
.boxActualPercentageArea{
	width:39%;
	float:right;
	margin-left: 0.5%;
	
	/*
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin:1px;
  	padding:5px;*/
  	
}
.fontBold{
	font-weight:bold;
}
.boxForecastVsActual{
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	padding:3.5px;
  	background:#fff;
  	margin-top:3px;
  	height: 40px;
}
.fontCenter{
	text-align:center;
}
.actionPlanList{

	padding:5px;
	border-width: 1px 1px 1px 1px;
	border-color: #cccccc;
  	border-style: solid;
  	margin-bottom:3px;
  	font-weight: bold;
  	background:#fff;
  	/*height: 37.5px;*/
  	min-height: 37.5px;
}
.boxTargetData{
	padding-top:20px;
}
.aui .alert, .aui .portlet-msg-alert, .aui .portlet-msg-error, .aui .portlet-msg-help, .aui .portlet-msg-info, .aui .portlet-msg-progress, .aui .portlet-msg-success{
	padding: 8px 8px 8px 14px;
	color:#555;
	margin-bottom: 0;
}


.aui select, .aui textarea, .aui input[type="text"], .aui input[type="password"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="date"], .aui input[type="month"], .aui input[type="time"], .aui input[type="week"], .aui input[type="number"], .aui input[type="email"], .aui input[type="url"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="color"], .aui .uneditable-input{
	height:'';
}

.aui input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 0px;
}

.ui-autocomplete{
	z-index: 999999;
}

.actionplan_input{
	display:none;
}
.jqstooltip{
	display:none;
}
#jqstooltip{
	display:none;
}
.ganntChartTititle{
	/*background-color: #fffbdc;*/
    border: 1px solid #f1d875;
   /* padding:10px;
    margin-bottom:5px;
    */
}
/* Modal action plan END */


.aui .ca-menu li{
    line-height: 0px;
}

.aui .appraisal_result .popover{
	width:120px;
}

.aui select, .aui input[type="text"] {
    font-size: 13px;
}

.ca-sub-fixed33 {
top: 33%
}

.ca-sub-fixed25 {
top: 25%
}

.circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 50px;
  line-height: 70px;
  text-align: center;
  background: #000;
  cursor: pointer;
}

.circle2 {
  width: 200px !important;
  height: 200px !important;
  border-radius: 50%;
  font-size: 50px;
  line-height: 200px;
  text-align: center;
  background: #000;
  cursor: pointer;
}


</style>

<body class=" gray-bg ">
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>


	<div class="app_url_hidden" id="AdvanceSearch" style="border-color:rgb(255, 119, 40);border-bottom-width: 2px;border-style: solid;border-left-width: 1px;border-top-width: 0px;border-right-width: 1px;">
		<div class="container1">
			<div id="includePage" class="ng-view ng-scope">
				<div class="row-fluid" style="border-color: red;">
					<!-- start--row-fluid -->
					<div class="span12" >
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<div class='titlePanel'><liferay-ui:message key="advanced-search"/></div>
							</div>

						</div>
						
						<div class="form-group pull-left span3" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownYear"
							name="dropdownYear">
							</select>
						</div>
						<div style="float:right ;padding-right: 10px;">
								<button type="button" class="btn btn-primary" id="btnSearch"><i class="fa fa-search" style="display: inline !important;"></i>&nbsp;<liferay-ui:message key="search"/></button>
						</div>
						
						
						
					
     
        <!-- content end -->
					</div>
				</div>
				<div class="app_url_hidden" id="SmartGoalDashboardList" style="display:none;padding: 0px 0px 2px; border-style: solid; border-color: rgb(255, 119, 40); border-width: 2px 1px;margin: 5px;border-bottom-width: 0.8px;">
					<div class="container1">
						<div id="includePage" class="ng-view ng-scope">
							<div class="row-fluid">
								<!-- start--row-fluid -->
								<div class="ibox float-e-margins">
									<div class="ibox-title">
										<div class='titlePanel'><liferay-ui:message key="smart-goal-dashboard"/></div>
									</div>
								</div>
								<div class="row-fluid" >
									<table class="table table-bordered" style="width: auto;margin-left: 5px;margin-right: 5px;">
										<tr>
											<th style="max-width: 10%;white-space: nowrap;width: 1%;padding-right: 8px;">SMART</th>
											<th style="text-align: center;">Strategic Objective</th>
										</tr>
										<tr>
											<td id="smart-circles" style="padding-right: 8px;">
												<div class="circle" style="background-color:green;color: white;margin:3px;padding: 3px;">S</div>
												<div class="circle" style="background-color:green;color: white;margin:3px;padding: 3px;">M</div>
												<div class="circle" style="background-color:green;color: white;margin:3px;padding: 3px;">A</div>
												<div class="circle" style="background-color:green;color: white;margin:3px;padding: 3px;">R</div>
												<div class="circle" style="background-color:green;color: white;margin:3px;padding: 3px;">T</div>
											</td>
											<td id="SO-circles">
												
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
							<!-- end--row-fluid -->
					</div>
				</div>
				
				<div class="app_url_hidden" id="SmartGoalDashboardDetail" style="display:none;padding: 0px 0px 2px; border-style: solid; border-color: rgb(255, 119, 40); border-width: 2px 1px;margin: 5px;border-bottom-width: 0.8px;">
					<div class="container1">
						<div id="includePage" class="ng-view ng-scope">
							<div class="row-fluid">
								<!-- start--row-fluid -->
								<div class="ibox float-e-margins" id="AllSoKPIGraph" style="cursor: pointer;">
									<div class="ibox-title">
										<div id="titlePanel" class='titlePanel'><liferay-ui:message key="smart-goal-dashboard-detail"/></div>
									</div>
								</div>
								<div class="row-fluid" id="ChartList">
								
								</div>
							</div>
						</div>
							<!-- end--row-fluid -->
					</div>
				</div>
			</div>
				<!-- end--row-fluid -->
		</div>
		
	</div>
	
	<!-- confirm modal -->
<div aria-hidden="false" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal in" style=" z-index: 1310; display: none;">
    <div class="modal-dialog" id="yui_patched_v3_11_0_1_1576640583291_853">
    <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
                <button data-dismiss="modal" class="close" type="button" id="yui_patched_v3_11_0_1_1576640583291_877"><span aria-hidden="true" id="yui_patched_v3_11_0_1_1576640583291_876"><i class="fa fa-times" id="yui_patched_v3_11_0_1_1576640583291_875"></i></span><span class="sr-only" style="display: none;">Close</span></button>
                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850"><liferay-ui:message key="confirm-dialog"/></h5>
            </div>
            <div class="modal-body">
                <!-- content start -->
                <!-- <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                 -->
                <!-- form start -->
                <div class="form-kpi-mangement">
                 <div class="form-kpi-label" align="center">
                 
                    <label><liferay-ui:message key="confirm-to-delete-data"/>?</label>
                    <div id="inform_on_confirm" class="information"></div>
                 </div>
                </div>
                               
                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
             <div align="center">
                 <button class="btn btn-success" id="btnConfirmOK" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="yes"/>&nbsp;&nbsp;</button>&nbsp;&nbsp;
                 <button data-dismiss="modal" id="btnCancleDelete" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/></button>
             </div>
            </div>
        </div>
    </div>
    
    
   
</div>

</body>

<script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
