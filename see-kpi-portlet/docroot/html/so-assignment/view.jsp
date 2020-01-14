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
.select2-container .select2-selection--single{
display: grid;
}
.ui-multiselect-menu{
	z-index: 5555;
}
.select2-search--dropdown {

    display: flex;
    padding: 4px;

}

.ui-multiselect{
	padding: 5px;
}
.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr{
	border-top-right-radius: 0;
}

.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl{
	border-top-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl{
	border-bottom-left-radius: 0;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br{
	border-bottom-right-radius: 0;
}
.ui-multiselect-header span.ui-icon{
	top: 5px;
}
.aui ul, .aui ol{
	margin: 0px 0px 0px 0px;
}
.ui-icon{
	 margin-top: 0;
}
.aui input[type="radio"], .aui input[type="checkbox"]{
	margin: -5px 0 0;
}
.aui label{
	margin-bottom: 0px;
}
.ui-multiselect-checkboxes li{
	padding-right: 0px;
}
.aui form{
	margin: 0 0 5px;
}
.aui .filter{
	margin-bottom: 5px;
    margin-top: 5px;
}
.aui .form-group > .control-label-search{
	padding-top: 5px;
}

 /* Large desktop Start#####################################*/
 @media (min-width: 1200px) { 

	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
	
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: right;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
	 	.aui .row-fluid .span4{
			width: 32.624%;
		}
		
		#positionBox{
			width:49.718%
		}
		#organizationBox{
			width:49.718%
		}
		#formulaDescriptionAreaQuantity{
		width:72.5%;
		}
		/*Quantity End*/
		
	 	.ibox-content .row-fluid .span4{
			width: 32.831%;
		}
			
  }
  /* Large desktop End######################################*/
  
  /*  desktop Start#########################################*/
 @media (min-width: 980px) and (max-width: 1199px) {
 
 	body{
 	 background:red;
 	}
 	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
		
		.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		/*All Start*/
		.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
		}
		.aui #btnCoppy{
			width:100%;
		}
		/*All End*/
		
		/*Qauntity Start*/
		.form-label-quantity{
		text-align: left;
		}
		.form-input-customs-title{
			width: 250px;
		}
		.aui .redFont{
 		
	 		  float: right;
	 	}
	 	.form-label-customs{
	 		text-align: right;
	 	}
	 	.aui .row-fluid .span4{
			width: 32.624%;
		}
		#positionBox{
			width:100%
		}
		#organizationBox{
			width:100%
		}
		/*
		#formulaDescriptionLabelAreaQuantity{
			width:100%;
		}
		*/
		#formulaDescriptionAreaQuantity{
			width:75%;
		}
		/*Quantity End*/
		
		 .ibox-content .row-fluid .span4{
		width: 32.69%;
	}
 	
  }
 /*  desktop End############################################*/
 
 /* Portrait tablet to landscape and desktop Start##########*/
 @media (min-width: 768px) and (max-width: 979px) {
 
	.modal.large {
		    width: 90%;
		    margin-left:-45%;  
		    top:0px;
		}
	.modal.medium {
		    width: 50%;
		    margin-left:-25%;  
		    top:0px;
		}
		
	.aui .ibox-title2{
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
   		top: 0px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 400px;
	}
	.aui #btnSearchAdvance{
		margin-bottom:5px;
		width:100%;
	}
	.aui #btnCoppy{
		width:100%;
	}
	
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 45px;
 	}
 	.aui .form-label-customs{
 		text-align: right;
 	}
 	
 	.aui .redFont{
 		
 		  float: right;
 	}
 	/*Deduct Score Start*/
 	
 	/*Qauntity Start*/
 	.form-label-quantity{
		text-align: left;
		}
	.form-input-customs-title{
		width: 250px;
	}
	.aui .redFont{
 		
 		  float: left;
 	}
 	.aui .pagianation_area{
		/*position:relative;*/
	}
	.aui #textarea_cds{
		height: 150px;
	}
	
	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
	/*Qauntity End*/
	.ibox-content .row-fluid .span4{
		width: 32.4917%
	}
	
  }
 /* Portrait tablet to landscape and desktop End############*/ 
 
 /* Landscape phone to portrait tablet Start################*/
 @media (max-width: 767px) { 
 
 
 .modal.large {
 	
	    width: '';
	    top:0px;    
	}
	
	.modal.medium {
		   width: '';
	   	   top:0px;  
		}
	
 	.pagingText{
 		display:none;
 	}
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search {
    	text-align: left;
	}
	
	.aui .ibox-title2{
	/*
		height:63px;
		*/
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
		/*
   		top: -22px;
   		*/
   		top: 0px;
	}
	/*All Form Start*/
	.aui .modal-body{
		max-height: 350px;
	}
	/*All Form End*/
	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 	}
 	.aui .redFont{
 		 
 		  float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:25px;
 	}
 	
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:25px;
 	}
 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:25px;
 	}

 	.form-label-quantity{
		text-align: left;
	}
	
	.form-input-customs-title{
		width: 250px;
	}
	#cdsNameLabel{
		display:none;
	}
	.aui .pagianation_area{
		/*position:absolute;*/
	}
	.aui #textarea_cds{
		height: 77px;
	}
	.titleQuantityForm{
 		display:none;
 	}
	
	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
 	/*Quantity End*/
 	
 	 .ibox-content .row-fluid .span4{
		width: 100%
	}
	
  }
 /* Landscape phone to portrait tablet End##################*/ 
 
 /* Landscape phones and down Start#########################*/
 @media (max-width: 480px) { 
 	
 	
 
 	#btnPaginationTop{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationTop{
		width:100px;
 		float:right;
	}
	#btnPaginationBottom{
 		width:300px;
 		float:left;
 	}
	#dropdownPaginationBottom{
		width:100px;
 		float:right;
	}
	.aui .form-group > .control-label-search{
    	text-align: left;
	}
	
	.aui .ibox-title2{
	/*
		height:63px;
	*/
		height:32px;
	}
	
	.aui .btnAdd{
		position: relative;
		/*
   		top: -22px;
   		*/
   		top: 0px;
	}
	/*All Form Start*/
	/*
	.aui .modal-body{
		max-height: 300px;
	}
	*/
	/*All Form End*/
 	
 	/*Deduct Score Start*/
 	.aui .form-file-mangement{
 		height: 50px;
 	}
 	.aui .form-label-customs{
 		 text-align: left;
 		 
 	}
 	.aui .redFont{
 		
 		 float: left;
 	}
 	#modalDeductScoreDescription{
 		font-size:20px;
 	}
 	/*Deduct Score Start*/
 	/*Quality Start*/
 	#modalQualityDescription{
 		font-size:20px;
 	}

 	/*Quality End*/
 	
 	/*Quantity Start*/
 	#modalTitleQuantity{
 		font-size:20px;
 	}
 	.form-label-quantity{
		text-align: left;
	}
	.form-input-customs{
		width: 100%;
	}
	#cdsNameLabel{
		display:none;
	}
	.paging-text2{
		display:none;
	}
	.form-input-customs-title{
		width: 100%;
	}
	.aui .pagianation_area{
		/*position:static;*/
	}
	.aui .pagingDropdown{
		float: left;
	}
	.aui #textarea_cds{
		height: 77px;
	}
	#formulaDescriptionAreaQuantity{
		width:100%;
	}
	#formulaDescriptionLabelAreaQuantity{
		width:100%;
	}
 	/*Quantity End*/
 	
 	.aui .ibox-title2 .btn{
 		font-size:12px;
 	}
 	.titleQuantityForm{
 		display:none;
 	}
 	
 	#positionBox{
		width:100%
	}
	#organizationBox{
		width:100%
	}
	
	.ibox-content .row-fluid .span4{
		width: 100%
	}

  }
  /* Landscape phones and down End##########################*/
  
  
  
  /* main start*/
        table {
            width: 100%;
        }
        .aui #breadcrumbs {
		    margin-bottom: 0px;
		}
       .aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    border-color: #eaeaea;
	    border-image: none;
	    border-style: solid;
	    border-width: 0 1px 1px;
	    padding: 10px 10px 10px;
	}
	/*
	.aui #modal-quantity{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 34%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 0%;
    width: 1000px;
    z-index: 1050;
    */
}
.aui .modal-footer {
    background-color: #f5f5f5;
    border-radius: 0;
    border-top: 1px solid #ddd;
    box-shadow: 0 1px 0 white inset;
    margin-bottom: 0;
    padding: 14px 15px 15px;
    text-align: right;
}
.aui select {
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
}
.aui input{
	width: 100%;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding: 5px;
}
.aui .table th, .aui .table td {
    border-top: 1px solid #ddd;
    line-height: 20px;
    padding-bottom: 0px;
    padding-right: 0;
    padding-left: 0;
    padding-top: 0px;
    text-align: left;
    vertical-align: top;
}
.aui .pagination {
    margin: 0;
}
.display-none{
	display:none;
}
.pagingText {
    float: right;
    margin-right: 5px;
    padding-top: 5px;
}
.gray-bg {
    background-color: #f3f3f4;
}

.ibox-content {
    background-color: #fff;
    border: 1px solid #ffe57f;
    color: inherit;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
}
/*
.aui .portlet-content, .aui .portlet-minimized .portlet-content-container {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: #f3f3f4 none repeat scroll 0 0;
    border-color: #eaeaea;
    border-image: none;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 1px 10px 10px;
}
*/
.form-file-mangement {
    height: 37px;
}
.form-label-customs{
	font-weight: bold;
}

.aui hr{
	margin: 10px 0;
}
/* main end*/

/*local start*/
/*
.aui #modal-quality{
    background-clip: padding-box;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    left: 50%;
    margin-left: -280px;
    outline: 0 none;
    position: fixed;
    top: 10%;
    width: 500px;
    z-index: 1050;
}
*/
.form-label-customs {
    float: left;
    padding-top: 1px;
    width: 170px;
    /*text-align:right;*/
}

.form-label-quantity {
    float: left;
    padding-top: 1px;
    width: 170px;
    font-weight:bold;
    /*text-align:right;*/
}

.form-group > .control-label-search{
	/*font-weight:bold;*/
	text-align:right;
}

.breadcrumbs2{

	background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
    border-radius: 0;
    margin-bottom: 0;
  	padding-bottom: 5px

}
.wrapper-content{
	padding: 10px;
}
.aui .table thead th{
	font-weight:bold;
}
.aui .form-group > .control-label-search{
   	/*font-weight:bold;*/
}
.aui .pagination{
 /*display:absolute;*/
}
.aui .popover-content{
padding:5px;
}

/*
.aui .modal-body{
overflow-y: visible;
}
*/
/*
.modal{
    max-height: calc(100vh - 0px);
    overflow-y: auto;
}*/

.aui .table th, .aui .table td{
	font-size: 13px;
}
.aui .countPagination2{
	height:30px;
}

/*local end*/
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
    padding: 0px 0px;
    font-size: 14px;
}

.aui .ibox-content input[type="color"], .aui input[type="date"], .aui input[type="datetime"], .aui input[type="datetime-local"], .aui input[type="email"], .aui input[type="month"], .aui input[type="number"], .aui input[type="password"], .aui input[type="search"], .aui input[type="tel"], .aui input[type="text"], .aui input[type="time"], .aui input[type="url"], .aui input[type="week"], .aui select, .aui textarea, .aui .uneditable-input{
	margin-bottom: 5px;
}
#formulaDescriptionAreaQuantity{
	float:left;
}


/* .portlet-borderless-container{ */
/*  position: unset; */
/* } */
.ui-state-default{
	width: 100% !important;
}

#orgQuantityForm .box1 [disabled=disabled] {
    background-color: red;
    display: none;
}

#positionQuantityForm .box1 [disabled=disabled] {
    background-color: red;
    display: none;
}

.bg-tr-disabled{
	background:#eee !important;
}

.bg-input-disabled{
	background:white !important;
}

.actionplan-padding{
	padding-right: 0px !important;
	border-right-width: 0px !important;
	border-left-width: 0px !important;
	padding-left: 0px !important;
}

.th-nomal-actionplan{
	text-align: right;
	padding-right: 10px;
}

.th-project-kpi-acctionplan{
	vertical-align: top;
	text-align: right;
	padding-right: 10px;
	padding-top: 10px;
}

.textarea-resize {
    resize: vertical;
    width: auto !important;
	box-sizing: border-box;
	border-width: medium !important;
}
.td-set-color{
	background-color: #eee !important;
}

.th-middle-text{
	white-space: nowrap;
	vertical-align: middle !important;
	border-color:white;
	border-top-width: 0px !important;
}

.set-border{
	padding-right: 2px !important;
	border-right-width: 2px;
	border-right-style: solid;
}

#detailModalActionPlan input{
	text-align: left;
}

.aui table{
	height:100%;
}

.input-height-100{
	height:96% !important;
	vertical-align: top !important;
}

.border-actionplan{
	border-top-width: 0px !important;
}

.resize-none{
	resize:none;
	width: 100% !important;
}

.allownumericwithoutdecimal{
	width:90% !important;
	text-align: right !important;
}

.txtinput{
	height: 25px !important;
	border-radius: 4px !important;
	width: 90% !important;
	padding-right: 0px !important;
	padding-left: 0px !important;
	margin-right: 5px !important;
	box-sizing: border-box;\
}

</style>

<body class=" gray-bg ">
<div class='row-fluid'>
	<div id="slide_status" class='span12'>
		<div id="btnCloseSlide">×</div>
		<div id="slide_status_area"></div>
	</div>
</div>


	<div class="app_url_hidden" id="AdvanceSearch" style="border-color:rgb(255, 119, 40);padding-bottom: 5px;border-bottom-width: 2px;border-style: solid;border-left-width: 1px;border-top-width: 0px;border-right-width: 1px;">
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
						<!-- body of advance search  -->
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownSO"
							name="dropdownSO">
							<option id="SO1" value="1">Strategic Objective</option>
							<option id="SO2" value="2">Project</option>
							</select>
						</div>
						
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownYear"
							name="dropdownYear">
							</select>
						</div>
						
						
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownFrequencOfDateAssign"
							name="dropdownFrequencOfDateAssign">
							</select>
						</div>
						
						
						
						<div class="form-group pull-left span4" style="margin-left: 5px;">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownAmountOfAssign"
							name="dropdownAmountOfAssign">
							</select>
						</div>
						
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownPeriodAssign"
							name="dropdownPeriodAssign">
							</select>
						</div>
						
						<div class="form-group pull-left span4" style="margin-left: 5px">
							<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
							class="input form-control input-sm span12" id="dropdownAssign"
							name="dropdownAssign">
							</select>
						</div>
						<br style="clear:both">
						<div style="float:right ;padding-right: 10px;">
								<button type="button" class="btn btn-primary" id="btnSearch"><i class="fa fa-search" style="display: inline !important;"></i>&nbsp;<liferay-ui:message key="search"/></button>
						</div>
						
						
					
     
        <!-- content end -->
					</div>
				</div>
			</div>
				<!-- end--row-fluid -->
		</div>
		
	</div>
	
	
	<div class="app_url_hidden" id="AssignList" style="padding: 2px;border-style: solid;border-color:rgb(255, 119, 40);border-width: 0px 1px 2px;padding-left: 0px;border-right-width: 1px;padding-right: 0px;border-top-width: 2px;padding-top: 0px;">
		<div class="container1">
			<div id="includePage" class="ng-view ng-scope">
				<div class="row-fluid search_result" >
					<div class="span12">
						<div class="ibox-title">
							<div class='titlePanel'><liferay-ui:message key="kpi-result-list"/></div>
						</div>


						<div class="ibox-content">

							<!-- start table -->
							<!-- pagination start -->
                                    	<div class="row-fluid">
	                                    	<div class="span6 pagianation_area" >
												<div class="pagination_top pagination"></div>
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
		                                    
		                                    	<div class='pagingDropdown'>
		                                 			<select  id='countPaginationTop'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select>
		                                 		
		                                 		</div>
												<div class='pagingText'><liferay-ui:message key="results-per-page"/></div>
		                                    
		                                    </div>
		                                    
                                    	</div> 
                                    	 <!-- pagination end -->
						
					<!-- 	start unassign -->
                            <div id="unassign" style="border-color:rgb(255, 119, 40);padding: 10px;display:none;" >
								<div class="container1">
									<div id="includePage" class="ng-view ng-scope">
										<div class="row-fluid" style="border-color: red;">
											<!-- start--row-fluid -->
											<div class="span12" >
												<div class="ibox float-e-margins">
													<div class="ibox-title">
														<div class='titlePanel'><liferay-ui:message key="unassigned"/></div>
														
													</div>
						
												</div>
												
												<table class='table table-striped'>
													<thead id="DetailHeadUnAssignList">
														
													</thead>
													<tbody id="DetailUnAssignList">
														
													</tbody>
												</table>
												
											
						     
						        <!-- content end -->
						        
											</div>
										</div>
									</div>
										<!-- end--row-fluid -->
								</div>
								
							</div>
							<!-- End unassgin  -->
							<!-- Start assign  -->
							<div id="assign" style="border-color:rgb(255, 119, 40);padding: 10px;display:none;">
								<div class="container1">
									<div id="includePage" class="ng-view ng-scope">
										<div class="row-fluid" style="border-color: red;">
											<!-- start--row-fluid -->
											<div class="span12" >
												<div class="ibox float-e-margins">
													<div class="ibox-title">
														<div class='titlePanel'><liferay-ui:message key="assign"/></div>
														
													</div>
						
												</div>
												
												<table class='table table-striped'>
													<thead id="DetailHeadAssignList">
														
													</thead>
													<tbody id="DetailAssignList">
														
													</tbody>
												</table>
												
											
						     
						        <!-- content end -->
											</div>
										</div>
									</div>
										<!-- end--row-fluid -->
								</div>
								
							</div>

							<!-- pagination start -->
							<div class="row-fluid">
	                                    	<div class="span6 pagianation_area">
	
												  <p class="pagination_bottom pagination"></p>
												
	                                    	</div>
	                                    
		                                    <div class="span6 object-right paging-text">
		                                    	<div class='pagingDropdown'>
		                                 			<select  id='countPaginationBottom'  class="form-control input-sm countPagination">
					                                     <option>10</option>
					                                     <option>20</option>
					                                     <option>50</option>
					                                     <option>100</option>
					                                 </select> 
			                                 	</div>
												<div class='pagingText'><liferay-ui:message key="results-per-page"/></div>
		                                    </div>
		                                   
                                    	</div> 
							<!-- pagination end -->
							<!-- end table -->
						</div>
						<!-- content end -->
					</div>
				</div>
				
			</div>
				<!-- end--row-fluid -->
		</div>
	</div>
	
	
	
	<!-- modal unassign  -->
	<div aria-hidden="false" role="dialog" tabindex="-1" id="modalUnAssign" class="modal inmodal in medium" style=" z-index: 1310; display: none;">
	    <div class="modal-dialog" id="yui_patched_v3_11_0_1_1576640583291_853">
	    <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
	            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
	                <button data-dismiss="modal" class="close" type="button" id="yui_patched_v3_11_0_1_1576640583291_877"><span aria-hidden="true" id="yui_patched_v3_11_0_1_1576640583291_876"><i class="fa fa-times" id="yui_patched_v3_11_0_1_1576640583291_875"></i></span><span class="sr-only" style="display: none;">Close</span></button>
	                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850"><liferay-ui:message key="assign"/></h5>
	            </div>
	            <div class="modal-body">
	                <!-- modal body top -->
	                <div>
	                	<table>
	                		<tbody id="detailModalUnAssignTop">
	                		</tbody>
	                	</table>
	                </div>
	                <!-- modal body bottom -->
	                <div style="overflow-y:hidden;">
	                	<table class='table table-striped'>
							<thead id="detailHeadModalUnAssign">
								
							</thead>
							<tbody id="detailModalUnAssign">
							</tbody>
						</table>
	                </div>
	            </div>
	            <div class="modal-footer">
	             <div align="right">
	                 <button class="btn btn-info" id="btnunAssignSubmit" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="submit"/>&nbsp;&nbsp;</button>&nbsp;&nbsp;
	                 <button data-dismiss="modal" id="btnunAssignCancle" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/></button>
	             </div>
	            </div>
	        </div>
	    </div>
</div>

<!-- modal assign  -->
	<div aria-hidden="false" role="dialog" tabindex="-1" id="modalAssign" class="modal inmodal in large" style=" z-index: 1310; display: none;">
	    <div class="modal-dialog" id="yui_patched_v3_11_0_1_1576640583291_853">
	    <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
	            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
	                <button data-dismiss="modal" class="close" type="button" id="yui_patched_v3_11_0_1_1576640583291_877"><span aria-hidden="true" id="yui_patched_v3_11_0_1_1576640583291_876"><i class="fa fa-times" id="yui_patched_v3_11_0_1_1576640583291_875"></i></span><span class="sr-only" style="display: none;">Close</span></button>
	                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850"><liferay-ui:message key="assign"/></h5>
	            </div>
	            <div class="modal-body">
	                <!-- modal body top -->
	                <div>
	                	<table>
	                		<tbody id="detailModalAssignTop">
	                		</tbody>
	                	</table>
	                </div>
	                <!-- modal body bottom -->
	                <div style="overflow-y:hidden;">
	                	<table class='table table-striped'>
							<thead id="detailHeadModalAssign">
								
							</thead>
							<tbody id="detailModalAssign">
							</tbody>
						</table>
	                </div>
	            </div>
	            <div class="modal-footer">
	             <div align="right">
	                 <button class="btn btn-primary" id="btnunAssignSubmit" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="submit"/>&nbsp;&nbsp;</button>&nbsp;&nbsp;
	                 <button data-dismiss="modal" id="btnunAssignCancle" class="btn btn-danger" type="button"><i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/></button>
	             </div>
	            </div>
	        </div>
	    </div>
</div>

<div aria-hidden="false" role="dialog" tabindex="-1" id="modalActionPlan" class="modal inmodal in large" style=" z-index: 1310; display: none;">
	    <div class="modal-dialog" id="yui_patched_v3_11_0_1_1576640583291_853">
	    <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
	            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
	                <button data-dismiss="modal" class="close" type="button" id="yui_patched_v3_11_0_1_1576640583291_877"><span aria-hidden="true" id="yui_patched_v3_11_0_1_1576640583291_876"><i class="fa fa-times" id="yui_patched_v3_11_0_1_1576640583291_875"></i></span><span class="sr-only" style="display: none;">Close</span></button>
	                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850">Project Information</h5>
	            </div>
	            
	            <div class="modal-body">
	                <!-- modal body top -->
	                <div style="overflow-y:hidden;">
	                	<table>
	                		<tbody id="projectInfo">
	                		</tbody>
	                	</table>
	                </div>
	             
	            </div>
	         
	        </div>
	        <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
	            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
	                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850">Action Plan By Project</h5>
	            </div>
	            <div class="modal-body" >
	                
	                <!-- modal body bottom -->
	                <div>
	                	<div style="padding-top: 0px;padding-bottom: 1%;padding-left: 0px;margin-bottom: 5px;">
							<button class="btn btn-success" style="margin-top: 2px;" id="btnAddActionplan" ><liferay-ui:message key="add"/></button>
							<button class="btn btn-warning" style="margin-top: 2px;" id="btnEditActionplan"><liferay-ui:message key="edit"/></button>
							<button class="btn btn-danger" style="margin-top: 2px;" id="btnDeleteActionplan"><liferay-ui:message key="delete"/></button>		
							<button class="btn btn-danger" style="margin-top: 2px;display:none;" id="btnCancelDeleteActionplan" ><liferay-ui:message key="cancel" /> <liferay-ui:message key="delete"/></button>
							<div class="span" style="float: right;width: auto;margin-left: 0px;margin-top: 2px;">
								<button class="btn btn-danger" style="margin-right: 0px;padding-right: 12px;" id="btnCancleActionplan"><liferay-ui:message key="cancel"/></button>
								<button class="btn btn-info" style="margin-right: 4px;" id="btnSaveActionplan"><liferay-ui:message key="save"/></button>
								<button class="btn btn-success" style="margin-right: 4px;" id="btnExportActionplan"><liferay-ui:message key="export"/></button>
							</div>
						</div>
						<!-- top of action plan -->
						<div>
		                	<table class='table' style="background-color: #eee;margin-bottom: 5px;">
								<tbody id="detailModalActionPlanTop">
								</tbody>
							</table>
						</div>
						<!-- Body(header) of action plan -->
						<div style="overflow-y:hidden;" class="row-fluid" >
							<table class='table' style="background-color: #eee;" >
								<thead>
									<tr>
										<th rowspan="2" class="th-middle-text set-border" ><liferay-ui:message key="task-name"/></th>
										<th rowspan="2" class="th-middle-text set-border"><liferay-ui:message key="task-result"/></th>
										<th rowspan="2" class="th-middle-text set-border" style="width:1%;"><p><liferay-ui:message key="total-weight"/>/</p><liferay-ui:message key="total-budget"/></th>
										<th rowspan="2" class="th-middle-text set-border" style="width:1%;"><liferay-ui:message key="plan-actual"/></th>
										<td style="padding: 0px;border-color:white;border-right-width: 2px;border-right-style: solid;width: 35%;">
											<table style="background-color: #eee;">
					                    		<tr><th colspan="12" style="border-top-width: 0px;text-align: center;"><liferay-ui:message key="year"/>:2019</th></tr>
					                            <tr>
													<th style="text-align: left;"><liferay-ui:message key="january"/></th>
													<th style="text-align: left;"><liferay-ui:message key="february"/></th>
													<th style="text-align: left;"><liferay-ui:message key="march"/></th>
													<th style="text-align: left;"><liferay-ui:message key="april"/></th>
													<th style="text-align: left;"><liferay-ui:message key="may"/></th>
													<th style="text-align: left;"><liferay-ui:message key="june"/></th>
													<th style="text-align: left;"><liferay-ui:message key="july"/></th>
													<th style="text-align: left;"><liferay-ui:message key="august"/></th>
													<th style="text-align: left;"><liferay-ui:message key="september"/></th>
													<th style="text-align: left;"><liferay-ui:message key="october"/></th>
													<th style="text-align: left;"><liferay-ui:message key="november"/></th>
													<th style="text-align: left;"><liferay-ui:message key="december"/></th>
					                            </tr>
					                    	</table>
										</td>
										<th class="th-middle-text set-border"><liferay-ui:message key="responsible"/></th>
										<th class="th-middle-text"><liferay-ui:message key="task-description"/></th>
									</tr>
								</thead>
								<tbody id="detailModalActionPlan"></tbody>
								
								<!-- Body(foot) of action plan  -->
								<tfoot>
									<tr>
										<td colspan="2" class="th-middle-text set-border"><liferay-ui:message key="task-summary"/></td>
										<td class="th-middle-text set-border">
											<table>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="totalTaskSumPlan" class="allownumericwithoutdecimal" style="width:100% !important;cursor: context-menu;" readonly>
													</td>
												</tr>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="totalTaskSumActual"class="allownumericwithoutdecimal" style="width:100% !important;cursor: context-menu;" readonly>
													</td>
												</tr>
											</table>
										</td>
										<td class="th-middle-text set-border">
											<table>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="TS-Plan" name="TS-Plan" value="Plan" disabled>
													</td>
												</tr>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="TS-Actual" name="TS-Actual" value="Actual" disabled>
													</td>
												</tr>
											</table>
										</td>
										<td class="th-middle-text set-border">
											<table>
													<tr>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-1">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-2">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-3">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-4">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-5">
														</td >
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-6">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-7">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-8">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-9">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-10">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-11">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskPlan-12">
														</td>
													</tr>
													<tr>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-1">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-2">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-3">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-4">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-5">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-6">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-7">
														</td>
														<td class="border-actionplan"> 
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-8">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-9">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-10">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-11">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalTaskActual-12">
														</td>
													</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td colspan="2" class="th-middle-text set-border" style="border-top-width: 1px !important;"><liferay-ui:message key="budget-sammary"/></td>
										<td class="th-middle-text set-border">
											<table>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="totalBudgetPlan" class="allownumericwithoutdecimal" style="width:100% !important;cursor: context-menu;" readonly>
													</td>
												</tr>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="totalBudgetActual" class="allownumericwithoutdecimal" style="width:100% !important;cursor: context-menu;" readonly>
													</td>
												</tr>
											</table>
										</td>
										<td class="th-middle-text set-border">
											<table>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="BS-Plan" name="BS-Plan" value="Plan" disabled/>
													</td>
												</tr>
												<tr>
													<td class="border-actionplan">
														<input type="text" id="BS-Actual" name="BS-Actual" value="Actual" disabled/>
													</td>
												</tr>
											</table>
										</td>
										<td class="th-middle-text set-border">
											<table>
													<tr>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-1">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-2">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-3">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-4">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-5">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-6">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-7">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-8">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-9">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-10">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-11">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetPlan-12">
														</td>
													</tr>
													<tr>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-1">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-2">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-3">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-4">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-5">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-6">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-7">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-8">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-9">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-10">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-11">
														</td>
														<td class="border-actionplan">
															<input type="text" class="allownumericwithoutdecimal" id="totalBudgetActual-12">
														</td>
													</tr>
											</table>
										</td>
									</tr>
									
								</tfoot>
							</table>
						</div>
						 
	                </div>
	            </div>
	            
	        </div>
	    </div>
</div>

<!-- Result Modal -->
<div aria-hidden="false" role="dialog" tabindex="-1" id="Result" class="modal inmodal in large" style=" z-index: 1310; display: none;">
	<div class="modal-dialog" id="yui_patched_v3_11_0_1_1576640583291_853">
	    <div class="modal-content bounceInRight" id="yui_patched_v3_11_0_1_1576640583291_852">
	            <div class="modal-header" style="background: rgb(255, 119, 40) none repeat scroll 0% 0%;" id="yui_patched_v3_11_0_1_1576640583291_851">
	                <button data-dismiss="modal" class="close" type="button" id="yui_patched_v3_11_0_1_1576640583291_877"><span aria-hidden="true" id="yui_patched_v3_11_0_1_1576640583291_876"><i class="fa fa-times" id="yui_patched_v3_11_0_1_1576640583291_875"></i></span><span class="sr-only" style="display: none;">Close</span></button>
	                <h5 class="modal-title" id="yui_patched_v3_11_0_1_1576640583291_850"><liferay-ui:message key="assign"/></h5>
	            </div>
	            <div class="modal-body">
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
									
									<div class="form-group pull-left span3" style="margin-left: 5px">
										<select data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="level"/>"
										class="input form-control input-sm span12" id="dropdownMonth"
										name="dropdownMonth">
										</select>
									</div>
									<div style="float:right ;padding-right: 10px;">
											<button type="button" class="btn btn-primary" id="btnSearchResult"><i class="fa fa-search" style="display: inline !important;"></i>&nbsp;<liferay-ui:message key="advanced-search"/></button>
									</div>
									
									
								
			     
			        <!-- content end -->
								</div>
							</div>
						</div>
							<!-- end--row-fluid -->
					</div>
	            </div>
	            
	            <div class="app_url_hidden" id="SOKpi1List" style="padding: 2px;border-style: solid;border-color:rgb(255, 119, 40);border-width: 0px 1px 2px;padding-left: 0px;border-right-width: 1px;padding-right: 0px;border-top-width: 2px;padding-top: 0px;">
					<div class="container1">
						<div id="includePage" class="ng-view ng-scope">
							<div class="row-fluid">
								<!-- start--row-fluid -->
								<div class="ibox float-e-margins">
									<div class="ibox-title">
										<div class='titlePanel'><liferay-ui:message key="so-kpi"/> 1</div>
									</div>
								</div>
								<div style="padding-top: 1%;padding-bottom: 1%;padding-left: 1%;">
									<button class="btn btn-warning"  id="btnEditResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="edit"/></button>
									<button class="btn btn-info" id="btnSaveResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="save"/></button>
									<button class="btn btn-danger" id="btnCancleResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="cancel"/></button>
									<button class="btn btn-danger" style="float: right;margin-right: 1%;" id="btnDeleteResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="delete"/></button>
									<button class="btn btn-success" style="float: right;margin-right: 4px;" id="btnFileResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="attach-files"/></button>
									<button class="btn btn-warning" style="float: right;margin-right: 4px;" id="btnDownloadResult" data-toggle="modal" data-target="#modalDownload" data-backdrop='static'><liferay-ui:message key="download"/></button>
									<button class="btn btn-success" style="float: right;margin-right: 4px;" id="btnDetailResult" data-toggle="modal" data-target="#modalAddSOKPI" data-backdrop='static'><liferay-ui:message key="detail"/></button>
								</div>
								<table class='table' style="margin: 6px;width: calc(100% - 12px);">
									<thead>
										<tr>
											<th style="text-align: left;width: 20%"><liferay-ui:message key="month"/></th>
											<th style="text-align: left;"><liferay-ui:message key="january"/></th>
											<th style="text-align: left;"><liferay-ui:message key="february"/></th>
											<th style="text-align: left;"><liferay-ui:message key="march"/></th>
											<th style="text-align: left;"><liferay-ui:message key="april"/></th>
											<th style="text-align: left;"><liferay-ui:message key="may"/></th>
											<th style="text-align: left;"><liferay-ui:message key="june"/></th>
											<th style="text-align: left;"><liferay-ui:message key="july"/></th>
											<th style="text-align: left;"><liferay-ui:message key="august"/></th>
											<th style="text-align: left;"><liferay-ui:message key="september"/></th>
											<th style="text-align: left;"><liferay-ui:message key="october"/></th>
											<th style="text-align: left;"><liferay-ui:message key="november"/></th>
											<th style="text-align: left;"><liferay-ui:message key="december"/></th>
										</tr>
									</thead>
									<tbody id="DetailSOKpiList">
										<tr>
											<td style="text-align: left;"><liferay-ui:message key="actual"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput" /></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
										</tr>
										<tr>
											<td style="text-align: left;"><liferay-ui:message key="forecast"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput" /></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
											<td style="text-align: left;"><input type="text" class="txtinput"/></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
							<!-- end--row-fluid -->
					</div>
				</div>
	            
	        </div>
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
