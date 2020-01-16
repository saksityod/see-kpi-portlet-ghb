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
	String username = themeDisplay.getUser().getScreenName();
	String password = (String) request.getSession().getAttribute(WebKeys.USER_PASSWORD);
	layout = themeDisplay.getLayout();
	plid = layout.getPlid();
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">
<input type="hidden" id="get_year_id" name="get_year_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_year")%>">
<input type="hidden" id="get_period_id" name="get_period_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_period")%>">
<input type="hidden" id="get_appraisal_type_id" name="get_appraisal_type_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_app_type")%>">
<input type="hidden" id="get_emp_id" name="get_emp_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_emp")%>">
<input type="hidden" id="get_emp_name" name="get_emp_name" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_emp_name")%>">
<input type="hidden" id="get_position_id" name="get_position_id" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_position")%>">
<input type="hidden" id="get_level_id" name="get_level_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_app_lv")%>">
<input type="hidden" id="get_org_id" name="get_org_id" value="<%= PortalUtil.getOriginalServletRequest(request).getParameter("param_org_id")%>">
<input type="hidden" id="get_item_id" name="get_item_id" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("param_item")%>">
<input type="hidden" id="get_sending_status" name="get_sending_status" value="<%=PortalUtil.getOriginalServletRequest(request).getParameter("sending_status")%>">

<style>

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
    padding-bottom: 3px;
    padding-right: 0;
    padding-top: 3px;
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
    padding: none;
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
.select2-container{
	z-index :1
}


.select2-container--open {
    z-index: 1500;
}

.mktd{
	text-align:center;
}

.mkleft{
	padding: 0 10%;
}

.ui-state-default{
	text-align: center !important;
}

#ui-datepicker-div{
	z-index: 1500;
}

</style>


<div class='row-fluid '>
	<div class='col-xs-12'>
		<div id="slide_status" class="span12" style="z-index: 9000;">
			<div id="btnCloseSlide"><i class='fa fa-times'></i></div>
			<div id="slide_status_area"></div>
		</div>
	</div>
</div>

<div class="app_url_hidden" style="display: block;">
	<div class="row-fluid app_url_hidden">
		<!-- start--row-fluid -->

		<div class="span12">
			<div class="ibox float-e-margins" style="margin-bottom: 0px;">
				<div class="ibox-title"
					style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height: 0px; margin:bottom: 0px;">
					<div class="titlePanelSearch"><div class='titlePanel'><liferay-ui:message key="Advanced Search"/></div></div>
				</div>
				<div class="ibox-content breadcrumbs2 advance-search"
					style="border-color: rgb(83, 120, 253);">

					<div class="row-fluid ">
							<div class="form-group pull-left span3" style="margin-left: 5px">
									<select id="dropdownAuto" data-toggle="tooltip" title=""
											 class="input form-control input-sm span12" id="projectAuto"
											 name="projectAuto">
									</select>
									<!--
									<input data-toggle="tooltip" title="" data-original-title="<liferay-ui:message key="Project"/>"
									class="form-control input-sm searchAdvanceText span12"
									placeholder="<liferay-ui:message key="Search"/>" type="text" id="txtSearch" name=""txtSearch"">
									-->
							</div>
							<div class="form-group pull-right span1" style="padding-right:7%;">
									<button type="button" class="btn btn-primary" id="btnSearch"><i class="fa fa-search" style="display: inline !important;"></i>&nbsp;Search</button>
							</div>		
					</div>
			</div>
		</div>
		<!-- ibox2 -->
		<div class="ibox float-e-margins" id="projectList" style="display:none;">
				<div class="ibox-title"
					style="background-color: rgb(83, 120, 253); border-color: rgb(83, 120, 253); min-height: 0px;">
					<div class="titlePanelSearch"><div class='titlePanel'><liferay-ui:message key="Project List"/></div></div>
				</div>
				<div class="ibox-content breadcrumbs2 advance-search"
					style="border-color: rgb(83, 120, 253);">

					<div class="row-fluid ">
					 <button data-toggle="modal"  data-backdrop="static" data-target="#modalAddProject" class="btn btn-success" id="addProject" style="margin-bottom:10px;"><i class="fa fa-plus-square"></i>&nbsp;Add Projcet</button>
						<table class='table table-striped'>
												<thead>
													<tr>
														<th style="text-align: left;"><liferay-ui:message key="project-name"/></th>
														<th style="text-align: left;"><liferay-ui:message key="owner"/></th>
														<th style="text-align: right;"><liferay-ui:message key="project-value"/></th>
														<th style="text-align: center;"><liferay-ui:message key="project-date"/></th>
														<th style="text-align: center;"><liferay-ui:message key="manage"/></th>
													</tr>
												</thead>
												<tbody id="DetailProjectList"></tbody>
										 	</table>
									
					</div>
			</div>
		</div>
		<!-- end ibox2 -->
		

	</div>
	
	<!-- content accordion start -->
	<div class="panel-group" id="accordion" role="tablist"
		aria-multiselectable="true">
	
	</div>
	<!-- content accordion end -->
</div>
</div>
<!-- makram -->

<!-- makram -->

<div aria-hidden="true" role="dialog" tabindex="-1" id="modalAddProject" class="modal inmodal " style="display: none;z-index:1200;">
    	<div class="modal-dialog  ">
   			<div class="modal-content animated bounceInRight">
            	<div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" id="closeProject" style="padding-top:5px"><span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only"></span></button>
                <h4 class="modal-title" id="modalTitleRole"><liferay-ui:message key="add-project"/></h4>
               
            </div>
            	<div class="row-fluid">
            		<table>
            			<tbody style="text-align: right;">
	            			<tr>
	            				<td style="min-width: 30%;"><h5><liferay-ui:message key="project-name"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            					<div id="modalbody-projectname"></div>
	            					<!--  
	            					<input data-toggle="tooltip" title=""
										class="form-control input-sm searchAdvanceText span12"
										placeholder="<liferay-ui:message key="Project Name"/>" type="text" id="projectName">-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="so-kpi"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-dropdownSoKpi"></div>
	            					<!--
	            					<select id="dropdownSoKpi" data-toggle="tooltip" title=""
										class="input form-control input-sm span12" id="soKpi"
										name="soKpi">
									</select>-->
	            				</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="objective"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-projectObjective"></div>
	            					<!--  
	            					<input data-toggle="tooltip" title="" 
										class="form-control input-sm searchAdvanceText span12"
										placeholder="<liferay-ui:message key="Objective"/>" type="text" id="projectObjective">
										-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="owner"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-dropdownOwner"></div>
	            					<!--
	            					<select id="dropdownOwner" data-toggle="tooltip" title="" 
										class="input form-control input-sm span12" id="projectOwner"
										name="projectOwner">
									</select>
									-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="project-start-date"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-startdatepicker"></div>
	            					<!-- 
	            					<input type="text" class="form-control input-sm searchAdvanceText span12" id="startdatepicker">
	            					-->
	            				</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="project-start-end-date"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-enddatepicker"></div>
	            					<!--
	            					<input type="text" class="form-control input-sm searchAdvanceText span12" id="enddatepicker">
	            					-->
	            				</td>
	            			</tr>
	            			
	            			<tr>
	            				<td style="min-width: 30%;"><h5><liferay-ui:message key="project-value"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-projectValue"></div>
	            					<!--
	            					<input data-toggle="tooltip" title=""
										class="form-control input-sm searchAdvanceText span12"
										placeholder="<liferay-ui:message key="Project Value"/>" type="text" id="projectValue">
									-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td style="min-width: 30%;"><h5><liferay-ui:message key="project-risk"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-projectRisk"></div>
	            					<!--
	            					<input data-toggle="tooltip" title="" 
										class="form-control input-sm searchAdvanceText span12"
										placeholder="<liferay-ui:message key="Project Risk"/>" type="text" id="projectRisk">
										-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="responsible"/> :</h5></td>
	            				<td style="padding-left: 5px;">
	            				<div id="modalbody-dropdownResponsible"></div>
	            					<!--
	            					<select id="dropdownResponsible" data-toggle="tooltip" title="" 
										class="input form-control input-sm span12" id="projectResponsible"
										name="projectResponsible">
									</select>
									-->
								</td>
	            			</tr>
	            			
	            			<tr>
	            				<td><h5><liferay-ui:message key="is-active"/> :</h5></td>
	            				<td style="text-align: left;padding: 5px;">
	            				<div id="modalbody-checkbox"></div>
	            					<!--
	            					<input type="checkbox" class="form-check-input" id="ckbox" checked>
	            					-->
	            				</td>
	            			</tr>
            			</tbody>
            		</table>
            	</div>
            	<div class="modal-footer">
            		<div id="createBtn"></div>
            	</div>
        	</div>
    	</div>
	</div>

<!-- end -->
<!-- model confirm -->
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
 
 <script src="/see-kpi-portlet/js/jquery3.1.1.js"></script>
<script type="text/javascript">
 var jQuery_1_1_3 = $.noConflict(true);
</script>
