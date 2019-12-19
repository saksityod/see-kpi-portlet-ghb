<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://alloy.liferay.com/tld/aui" prefix="aui"%>
<%@ page import="javax.portlet.*"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ page import="com.liferay.portal.kernel.util.WebKeys" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<liferay-theme:defineObjects />
<portlet:defineObjects />
<%

String username = themeDisplay.getUser().getScreenName();
String password = (String)request.getSession().getAttribute(WebKeys.USER_PASSWORD);
layout = themeDisplay.getLayout();
plid = layout.getPlid();
//out.print(username);
//out.print("password2="+password);
%>
<input type="hidden" id="user_portlet" name="user_portlet" value="<%=username%>">
<input type="hidden" id="pass_portlet" name="pass_portlet" value="<%=password%>">
<input type="hidden" id="url_portlet" name="url_portlet" value="<%= renderRequest.getContextPath() %>">
<input type="hidden" id="plid_portlet" name="plid_portlet" value="<%= plid %>">

<div class="container1">
    <div class='row-fluid'>
        <div class='col-xs-12'>
            <div id="slide_status" class="span12" style="z-index: 9000;">
                <div id="btnCloseSlide"><i class='fa fa-times'></i></div>
                <div id="slide_status_area"></div>
            </div>
        </div>
    </div>

    <div class="row-fluid app_url_hidden" class="p-t-xxs">
        <!-- start--row-fluid -->
        <div class="">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>
                        <liferay-ui:message key="advanced-search" />
                    </h5>
                </div>
                <div class="ibox-content breadcrumbs2">
                    <div class="row-fluid p-t-xxs cSearchAdvance">
                        <div class="form-group">
                            <div id="drop_down_list_year" class="form-group pull-left parameters">
                                <select id="year" class="input span12 m-b-n"></select>
                            </div>
                            <div id="drop_down_list_appraisal_type" class="form-group pull-left parameters">
                                <select id="app_type" class="input span12 m-b-n"></select>
                            </div>
                            <div id="auto_complete_emp_name" class="form-group pull-left parameters">
                                <input id="emp_name" name="emp_name" type="text" data-toggle="tooltip" data-placement="top" title="<liferay-ui:message key=' employee-name '/>" class="span12 m-b-n ui-autocomplete-input" placeholder="<liferay-ui:message key='employee-name' />" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <div id="auto_complete_position" class="form-group pull-left parameters">
                                <input id="position" name="position" type="text" data-toggle="tooltip" data-placement="top" title="<liferay-ui:message key=' position '/>" class="span12 m-b-n ui-autocomplete-input" placeholder="<liferay-ui:message key='position'/>" disabled>
                            </div>
                            <div id="drop_down_list_appraisal_level" class="form-group pull-left parameters">
                                <select id="app_lv" class="input span12 m-b-n"></select>
                            </div>
                            <div id="drop_down_list_organization" class="form-group pull-left parameters">
                                <select id="org_id" class="input span12 m-b-n"></select>
                            </div>
                        </div>
                        <div class="form-group pull-right m-b-none">
                            <div class="form-group pull-right m-b-none ">
                                <button type="button" name="btnSearchAdvance" id="btnSearchAdvance" class="btn btn-info input-sm " style="margin-left: 0px">
								<i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
							</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content end -->
        </div>
    </div>

    <!-- end--row-fluid -->
    <div class="row-fluid" id="cds_result_list_content">
        <div class="">
            <div class="ibox-title">
                <h5>
                    <liferay-ui:message key="cds-result-list" />
                </h5>
            </div>
            <div class="ibox-content" style="position: relative;">
                <div class="row-fluid">
                    <div class="height-32-px"></div>
                </div>
                <!-- start table -->

                <!-- start button -->
                <div class="row-fluid">
                    <div class='span6'>
                        <button type="button" class="btn btn-warning input-sm" name="btn-" id="btnEditCdsResult">
                            <liferay-ui:message key="edit"/>
                        </button>
                        <button type="button" class="btn btn-info  input-sm" name="btn-" id="btnSaveCdsResult">
                            <liferay-ui:message key="save"/>
                        </button>
                        <button type="button" class="btn btn-danger input-sm" name="btn-" id="btnCancelCdsResult">
                            <liferay-ui:message key="cancel"/>
                        </button>
                    </div>
                </div>
                <!-- end button -->

                <!-- pagination start -->
                <div class="row-fluid">
                    <div id="width-100-persen" class="span9 m-b-xs">
                        <span class="pagination_top m-b-none pagination"></span>
                    </div>
                    <div class="span3 object-right ResultsPerPageTop">
                        <div class='pagingDropdown'>
                            <select id='countPaginationTop' class="form-control input-sm countPagination">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div class='pagingText'>
                            <liferay-ui:message key="results-per-page" />
                        </div>
                    </div>
                </div>
                <!-- pagination end -->
                <div class="table-responsive p-b-xxs" style="overflow:auto">
                    <table class="table table-striped " id="tableCdsResult" style="max-width: 100%;">
                        <thead>
                            <tr style="white-space: nowrap;">
                                <th></th>
                                <th id='orgOrEmp' style='width: auto;min-width: 200px;'>
                                    <liferay-ui:message key="emp-name" />
                                </th>
                                <th style='width: auto;min-width: 320px;'>
                                    <liferay-ui:message key="cds-name" />
                                </th>
                                <th style='width: auto'>
                                    <liferay-ui:message key="uom" />
                                </th>
                                <th style='width: auto'>
                                    <liferay-ui:message key="year" />
                                </th>
                            </tr>
                        </thead>
                        <tbody id="listCdsResult" class="CdsResult">
                        </tbody>
                    </table>
                </div>
                <!-- end table -->

                <!-- pagination start -->
                <div class="row-fluid">
                    <div id="width-100-persen" class="span9 m-b-xs ">
                        <span class="pagination_bottom m-b-none pagination"></span>
                    </div>
                    <div class="span3 object-right ResultsPerPageBottom">
                        <div class='pagingDropdown'>
                            <select id='countPaginationBottom' class="form-control input-sm countPagination">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <div class='pagingText'>
                            <liferay-ui:message key="results-per-page" />
                        </div>
                    </div>
                </div>
                <!-- pagination end -->
                <!-- end table -->
            </div>
            <!-- content end -->
        </div>
    </div>
</div>

<!-- Modal Import CDS Result -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="ModalImport" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:5px">
                    <span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="">
                    <liferay-ui:message key="import-cds-result" />
                </h4>
            </div>
            <div class="modal-body">
                <!-- form start -->
                <div class="form-group">
                    <form id="fileImportCdsResult">
                        <h4>
                            <liferay-ui:message key="file-import" />
                        </h4>
                        <div class="fileUpload ">
                            <input type="file" id="file" class="dropify" accept=".xls, .xlsx" /><span></span>
                        </div>
                        <h6 class="label-content-import-export">

                            <!-- 							<input class="btn btn-success" type="submit" -->
                            <!-- 								name="importFileMobile" id="importFileMobile" value="Import" -->
                            <!-- 								style="margin-top: 0px; margin-bottom: 0px;"> -->
                            <!-- 								<strong>Note</strong> : Data size should de less 10MB -->

                        </h6>
                    </form>
                    <!-- start table -->
                </div>
                <!-- form End -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="submit" id="importFileMobile" form="fileImportCdsResult"><liferay-ui:message key="import"/></button>
                <button data-dismiss="modal" class="btn btn-danger btnCancle" type="button"><liferay-ui:message key="cancel"/></button>
                <div class="alert alert-warning information" id="information" style="display: none;height:120px; overflow-y: scroll; position:relative;"></div>
            </div>
        </div>
    </div>
</div>
<!-- Modal End  -->

<!-- Modal Confirm Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimModal" class="modal inmodal in" style="width:400px;left:calc;display: none;">
    <div class="modal-dialog">
        <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button" style="padding-top:3px">
						<span aria-hidden="true"><i class='fa fa-times'></i></span><span class="sr-only">Close</span>
					</button>
                <h5 class="modal-title">
                    <liferay-ui:message key="confirm-dialog" />
                </h5>
            </div>
            <div class="modal-body">
                <div class="form-kpi-mangement">
                    <div class="form-kpi-label" align="center">
                        <label><liferay-ui:message key="confirm-to-delete-data"/>?</label>
                    </div>
                </div>
                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
                <div align="center">
                    <button class="btn btn-success" id="btnConfirmOK" type="button">
                        &nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="yes"/>&nbsp;&nbsp;
                    </button> &nbsp;&nbsp;
                    <button data-dismiss="modal" class="btn btn-danger" type="button">
                        <i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Confirm End -->

<!-- Modal Confirm CdsResult Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="confrimCdsResultModal" class="modal inmodal in" style="width:400px;left:calc;display: none;">
    <div class="modal-dialog">
        <div class="modal-content  bounceInRight">
            <div class="modal-header">
                <h5 class="modal-title">
                    <liferay-ui:message key="confirm-dialog" />
                </h5>
            </div>
            <div class="modal-body">
                <div class="form-kpi-mangement">
                    <div class="form-kpi-label" align="center">
                        <label><liferay-ui:message key="confirm-report-for-kpi-incomplete"/> ?</label>
                    </div>
                </div>
                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
                <div align="center">
                    <button class="btn btn-success" id="btnConfirmCdsResultOK" type="button">
                        &nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="yes"/>&nbsp;&nbsp;
                    </button> &nbsp;&nbsp;
                    <button data-dismiss="modal" id="btnConfirmCdsResultCancel" class="btn btn-danger" type="button">
                        <i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Confirm CdsResult End -->


<!-- Modal Detail Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="detailModal" class="modal inmodal " style="display: none; margin-top: 0px;">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only"></span></button>
                <h5 class="modal-title">
                    <liferay-ui:message key="detail" />
                </h5>
            </div>
            <div class="modal-body">
                <div style='margin-bottom:5px;'>
                    <b><liferay-ui:message key="detail"/></b>
                    <table style='width:100%; margin-bottom: 4px;'>
                        <tr>
                            <td id="sunEdit">
                            </td>
                        </tr>
                    </table>
                    <div align="right">
                        <button class="btn btn-success" id="btnSaveDetail" type="button">&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;&nbsp;<liferay-ui:message key="save"/>&nbsp;&nbsp;</button>&nbsp;&nbsp;
                        <button class="btn btn-danger" id='btnCancelDetail' type="button"><i class="fa fa-times-circle"></i>&nbsp;<liferay-ui:message key="cancel"/></button>
                    </div>
                </div>
                <table class='table'>
                    <thead>
                        <tr>
                            <th style='width:10%;'>
                                <b><liferay-ui:message key="no-dot"/></b>
                            </th>
                            <th style='width:30%;'>
                                <b><liferay-ui:message key="detail"/></b>
                            </th>
                            <th style='text-align:center; width:15%;'>
                                <b><liferay-ui:message key="manage"/></b>
                            </th>
                        </tr>
                    </thead>
                    <tbody id='listDataDetail'>
                    </tbody>
                </table>
                <!-- form start -->
                <!-- content end -->
            </div>

        </div>
    </div>
</div>
<!-- Modal Detail End -->

<!-- Modal infoItem Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="infoItemModal" class="modal inmodal " style="display: none;">
    <div class="modal-dialog ">
        <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button style="padding-top:5px" type="button" class="close" data-dismiss="modal"><span aria-hidden="true"><i class="fa fa-times"></i></span><span class="sr-only"></span></button>
                <h4 class="modal-title">
                    <liferay-ui:message key="description" />
                </h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-info" id="htmlInfoItemName">
                </div>
                <div class="row-fluid">
                    <liferay-ui:message key="period" />:
                    <select id="period_item" data-toggle="tooltip" title="<liferay-ui:message key=" period "/>" name="period_item">
					</select>
                </div>
                
                <div class="form-kpi-mangement" style="margin-top: 20px;">
                    <div id="htmlInfoItem">
                    </div>
                </div>
                <!-- form start -->
                <!-- content end -->
            </div>

        </div>
    </div>
</div>
<!-- Modal infoItem End -->