<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet"%>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme"%>
<%@ page import="com.liferay.portal.kernel.util.WebKeys"%>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
	//out.print(plid);
%>
<style>

/* Large desktop Start#####################################*/
@media ( min-width : 1200px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.aui .modal-body {
		/*max-height: 400px;*/
		
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui .row-fluid#usageLogAdvanceSearchArea .span3 {
		width: 24.5%;
	}
	.aui #btnUsageLogSearchArea {
		width: 99.3%;
	}
}
/* Large desktop End######################################*/

/*  desktop Start#########################################*/
@media ( min-width : 980px) and (max-width: 1199px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.aui .modal-body {
		/*max-height: 400px;*/
		
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
		width: 24%;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
		width: 98.621%;
	}
	.aui #btnUsageLogSearchArea {
		width: 98.621%;
	}
}


/*  desktop End############################################*/

/* Portrait tablet to landscape and desktop Start##########*/
@media ( min-width : 768px) and (max-width: 979px) {
	.modal.large {
		width: 90%;
		margin-left: -45%;
		top: 0px;
	}
	.pagingText {
		display: block;
	}
	.aui .p-t-xxs {
		text-align: right;
	}
	.pagianation_area {
		position: '';
	}
	.aui .modal-body {
		/*max-height: 400px;	*/
		
	}
	.checkWeigthOver {
		display: 'block';
	}
	.aui .btnManagement {
		width: '';
	}
	.aui .displayWeightOnMobile {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: right;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span3 {
		width: 24.2%;
	}
	.aui #usageLogAdvanceSearchArea.row-fluid .span9 {
		width: 73.909%;
	}
	.aui #btnUsageLogSearchArea {
		width: 98.731%
	}
}
/* Portrait tablet to landscape and desktop End############*/

/* Landscape phone to portrait tablet Start################*/
@media ( max-width : 767px) {
	.modal.large {
		width: '';
		top: 0px;
	}
	#grandTototalWeightArea {
		position: relative;
		top: -385px;
	}
	.aui .ibox-content .control-label {
		text-align: left;
	}
	.pagianation_area {
		/*position:absolute;*/
		
	}
	.aui .modal-body {
		/*max-height: 300px;	*/
		
	}
	.checkWeigthOver {
		display: none;
	}
	.aui .displayWeightOnMobile {
		display: inline;
	}
	.aui .btnAssignment {
		float: right;
	}
	.aui .btnManagement {
		width: 100%;
	}
	.aui .p-t-xxs {
		text-align: right;
	}
	.aui #btnUsageLogSearchArea {
		width: 100%;
	}
}
/* Landscape phone to portrait tablet End##################*/

/* Landscape phones and down Start#########################*/
@media ( max-width : 480px) {
	.pagingText {
		display: none;
	}
	.aui .ibox-content .control-label {
		text-align: left;
	}
	.pagianation_area {
		/*position:absolute;*/
		
	}
	.aui .modal-body {
		/*max-height: 300px;	*/
		
	}
	.checkWeigthOver {
		display: none;
	}
	.total_weigth_all {
		display: block
	}
	.aui .btnAssignment {
		float: '';
	}
	.aui .displayWeightOnMobile {
		display: inline;
	}
	.aui .p-t-xxs {
		text-align: left;
	}
	.aui #btnUsageLogSearchArea {
		width: 100%;
	}
}
/* Landscape phones and down End##########################*/
.breadcrumbs2 {
	background: rgba(0, 0, 0, 0)
		linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat
		scroll 0 0;
	border-radius: 0;
	margin-bottom: 0;
	padding-bottom: 5px;
}

.aui #usageLogAdvanceSearchArea input[type="color"], .aui input[type="date"],
	.aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"],
	.aui input[type="month"], .aui input[type="number"], .aui input[type="password"],
	.aui input[type="search"], .aui input[type="tel"], .aui input[type="text"],
	.aui input[type="time"], .aui input[type="url"], .aui input[type="week"],
	.aui select, .aui textarea, .aui .uneditable-input {
	margin-bottom: 0;
}
.aui .ui-accordion-content .table td {
    font-size: 15px !important;
    font-weight:bold;
    background-color: #F9F9F7 !important;
}

.ibox-title {
	min-height: 30px;
}

.aui #breadcrumbs {
	margin-bottom: 0;
}

.aui .table {
	margin-bottom: 0;
}

.aui .pagination {
	margin: 0;
}

.branchText {
	float: left;
}

.branchPerformance {
	float: right;
	position: absolute;
	right: 5px;
	top: 5px;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active,
	a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover
	{
	background: whitesmoke;
}

.aui h1, .aui h2, .aui h3 {
	line-height: 92px;
}

.ui-accordion .ui-accordion-content {
	padding: 5px;
}

.aui .table td {
	padding-top: 4px;
	padding-bottom: 3px;
}

.aui #noData {
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	color: #993300;
	padding: 150px 0px;
}

.aui .fixed {
	position: fixed;
 	top: 36px; 
}
.aui .tableInside{
	width:100%;
}
.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover {
	border-color: #ccc;
}
/* Let's get this party started */
::-webkit-scrollbar {
    width: 12px;
}

.aui #detailArea *{
-webkit-overflow-scrolling: touch; 
overflow:auto;
}
.aui #detailArea h3{
overflow:hidden !important;
}

.aui .ui-accordion-header{
	color: #555 !important;
}
.aui .liquidFillGaugeText{
	font-weight: bold;
}

</style>
<input type="hidden" id="user_portlet" name="user_portlet"
	value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet"
	value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet"
	value="<%=renderRequest.getContextPath()%>">
<input type="hidden" id="plid_portlet" name="plid_portlet"
	value="<%=plid%>">




<div class="row-fluid app_url_hidden"  id='advanceSearchDisplay'>
	<!--  SEARCH ADVANCE START -->

	<div class="span12">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<div class='titlePanel'><liferay-ui:message key="advanced-search"/></div>
			</div>
			<div class="ibox-content breadcrumbs2">


				<div class="row-fluid " id='usageLogAdvanceSearchArea'>

					<div id="appraisalTypeArea" class="form-group span3"
						style="margin-left: 5px; margin-bottom: 3px;">

						<select name="year" id="year"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="year"/>">

							<option value="1">2017</option>


						</select>
					</div>
					<div id='xxxArea' class="form-group span3"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="period" id="period"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="period"/>">

							<option value=""></option>

						</select>
					</div>


					<div id='xxxArea' class="form-group span3"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="region" id="region"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="region"/>">

							<option value="">ทุกฝ่าย</option>
							<option value="1">ฝ่ายสาขาภาคเหนือ</option>

						</select>

					</div>



					<div id='appraisalLevelArea' class="form-group span3"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="district" id="district"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="district"/>">

							<option value="">ทุกเขต</option>
							<option value="10">กรุงเทพมหานคร</option>

						</select>
					</div>
					<div class="form-group span12" id="kpiArea"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="kpi" id="kpi"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="kpi"/>">

							<option value="">KPI1</option>
							<option value="">KPI2</option>
						</select>
						
					</div>
					<div id='' class="form-group span2"
						style="margin-left: 5px; margin-bottom: 3px;">
						<select name="level" id="level"
							class="input form-control input-sm span12" title=""
							data-toggle="tooltip" style="cursor: pointer;"
							data-original-title="<liferay-ui:message key="level"/>">

							<option value="5">ฝ่าย</option>
							<option value="6">เขต</option>
							<option value="7">สาขา</option>

						</select>
					</div>


					<div style="margin-bottom: 5px;" class="form-group pull-right m-b-none ">
						<button id="btnSearchAdvance" name="btnSearchAdvance"
							class="btn btn-info input-sm" type="button">
							<i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
						</button>
					</div>
					
				</div>




			</div>
		</div>
	</div>

	<!-- SEARCH ADVANCE END -->
</div>

<!-- 
	<button id='btnCreateMap'>Create Map</button>		
	<button id='btnCreateGoogleMap'>Create Google Map</button>	
	 -->
<div class="row-fluid ">

	<div class='span6' id='mapArea'>
		<!-- 
   		<div id='mapPerfomanceArea'  style='height:597px;'></div>
   		<div id='mapGooglePerfomanceArea' style='width:500px; height:500px;'></div>
   	    -->
	</div>
	<div class='span6' id='detailArea' style='display: none;min-height: 550px;'>


		<h3 style='text-align: center; color: black;' id='BranchPerTitle'></h3>
		<div id="detailPerfomanceArea" class="detailPerfomanceArea">


		</div>
	</div>

</div>



<div id='embedParamSearch'></div>
<!-- 
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK3RgqSLy1toc4lkh2JVFQ5ipuRB106vU&callback=initMap" async defer></script>
 -->
<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPuP76ST9iq964sAptAX-tZ9KVa-LXgSI"
	async defer></script>









