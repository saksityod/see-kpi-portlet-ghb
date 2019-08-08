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
/*
PortletSession portletSession1 = renderRequest.getPortletSession();
portletSession1.setAttribute("password", "authenticated", PortletSession.APPLICATION_SCOPE);
String pwd = (String) portletSession1.getAttribute("password", PortletSession.APPLICATION_SCOPE);
out.print(pwd);
String password=PortalUtil.getUser(request).getPassword();
*/

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
<style>
    .aui .breadcrumbs2 {
        background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0px, #f6f6f6 47%, #ededed 100%) repeat scroll 0 0;
        border-radius: 0;
        margin-bottom: 0;
        padding-bottom: 0px
    }

    .aui #breadcrumbs {
        margin-bottom: 0px;
    }

    .portlet-content,
    .portlet-minimized .portlet-content-container {
        background-color: #fafafa;
    }

    .aui .countPagination {
        width: 70px;
        margin-bottom: 0px;
    }

    .popover {
        width: 150px;
    }

    .aui .pagination {
        margin: 5px 0;
    }

    .pagingDropdown {
        float: right;
        padding-top: 5px;
    }

    .aui .btn {
        font-size: 14px;
        padding: 5px 12px;
        width: auto;
        margin-top: 0px;
        display: inline;
    }

    .aui input[type="color"],
    .aui input[type="date"],
    .aui input[type="datetime"],
    .aui input[type="datetime-local"],
    .aui input[type="email"],
    .aui input[type="month"],
    .aui input[type="number"],
    .aui input[type="password"],
    .aui input[type="search"],
    .aui input[type="tel"],
    .aui input[type="text"],
    .aui input[type="time"],
    .aui input[type="url"],
    .aui input[type="week"],
    .aui select,
    .aui textarea,
    .aui .input-prepend .add-on,
    .aui .navbar-search .search-query,
    .aui .uneditable-input {
        font-size: 14px;
        height: auto;
        line-height: normal;
    }

    .p-t-xxs {
        padding-top: 5px;
    }

    .p-t-xs {
        padding-top: 10px;
    }

    .p-b-xxs {
        padding-bottom: 5px;
    }

    .p-b-xs {
        padding-bottom: 10px;
    }

    .aui .form-horizontal .form-group {
        margin-left: 0px;
        margin-right: 0px;
    }

    .aui .form-horizontal .checkbox,
    .aui .form-horizontal .checkbox-inline,
    .aui .form-horizontal .radio,
    .aui .form-horizontal .radio-inline {
        margin-bottom: 0;
        margin-top: 0;
        padding-top: 0px;
    }

    .aui #ui-datepicker-div,
    .aui .ui-datepicker {
        z-index: 99999 !important;
    }

    .aui .from_data_role,
    .aui .selectEmpCheckbox {
        cursor: pointer;
        height: 17px;
        width: 17px;
    }

    .aui .checkbox label,
    .aui .radio label {
        cursor: default;
    }
    /* new */

    .aui .modal-header .close {
        font-size: 1.4em !important;
        margin-top: 4px !important;
        padding-top: 5px !important;
    }

    .aui .ui-autocomplete {
        z-index: 1300;
    }

    .aui #from_emp_type {
        width: 170px;
    }

    .aui #employee_list_content {
        display: none;
    }

    .aui .form-group {
        margin-bottom: 5px;
    }

    .aui .control-label {
        cursor: default;
    }

    .aui input[type="radio"],
    .aui input[type="checkbox"] {
        margin: 1px 0 0;
    }

    .ibox-title {
        padding: 1px 10px;
    }

    .ibox-content {
        background-color: #fff;
        border: 1px solid #ffe57f;
        color: inherit;
        margin-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .aui h5 {
        margin: 7px 0;
    }

    .gray-bg {
        background-color: #f3f3f4;
    }

    #objectCenter {
        text-align: center;
        vertical-align: middle;
    }

    .aui .checkbox input[type="checkbox"] {
        opacity: 1;
        z-index: 1;
    }

    #table_Sql {
        border-left-width: 1px;
    }

    .aui .modal {
        top: 2%;
    }

    #container {
        width: 93.5%;
    }

    .aui #file {
        width: 100%;
        height: 100%;
    }
    /* Large desktop */

    @media ( max-width: 1310px) {
        .aui [class*="span"],
        .aui .uneditable-input[class*="span"],
        .aui .row-fluid [class*="span"] {
            display: block;
            float: none;
            width: 100%;
            margin-left: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
    }

    @media ( min-width: 1200px) {
        .aui #confrimModal {
            left: 55%;
        }
    }
    /* Portrait tablet to landscape and desktop */

    @media ( min-width: 980px) and (max-width: 1199px) {
        .aui #confrimModal {
            left: 57%;
        }
    }

    @media ( min-width: 768px) and (max-width: 979px) {
        .aui #confrimModal {
            left: 58.5%;
        }
        #ModalLevel {
            left: 15%;
            right: 15%;
        }
        #ModalImport {
            left: 15%;
            right: 15%;
        }
        .aui .ResultsPerPageTop {
            position: absolute;
            left: -20px;
            top: 46px;
        }
        .aui .ResultsPerPageBottom {
            position: relative;
            top: -40px;
        }
        .aui [class*="span"],
        .aui .uneditable-input[class*="span"],
        .aui .row-fluid [class*="span"] {
            display: block;
            float: none;
            width: 100%;
            margin-left: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .aui #widthPersenTop {
            width: 10.1%;
        }
        .aui #widthPersenBottom {
            width: 11%;
        }
        .aui .txtCountPaginationTop {
            position: absolute;
            left: -14.9%;
            top: 51px;
            width: 41.66666667%;
        }
        .aui .selectCountPaginationTop {
            position: absolute;
            left: 86.5%;
            top: 51px;
            width: 24%;
        }
        .aui .txtCountPaginationBottom {
            left: -11.5%;
            top: -45px;
            width: 43.96666667%;
            position: relative;
        }
        .aui .selectCountPaginationBottom {
            left: 90.1%;
            top: -75px;
            width: 25%;
            position: relative;
        }
    }
    /* Landscape phone to portrait tablet */

    @media ( max-width: 767px) {
        .aui #confrimModal {
            left: 23.5%;
        }
        .aui .ResultsPerPageTop {
            position: absolute;
            left: -20px;
            top: 46px;
        }
        .aui .ResultsPerPageBottom {
            position: relative;
            top: -40px;
        }
        @media ( min-width: 481px) and (max-width: 615px) {
            .aui .height-32-px {
                height: 42px
            }
            .aui #confrimModal {
                left: 16.5%;
            }
            .aui .ResultsPerPageTop {
                position: absolute;
                left: -20px;
                top: 46px;
            }
            .aui .ResultsPerPageBottom {
                position: static;
            }
        }
        .aui #width-100-persen {}
        .aui #widthPersenTop {
            width: 10.3%;
        }
        #widthPersenBottom {
            width: 11.2%;
        }
        .aui .txtCountPaginationTop {
            position: absolute;
            left: -14.9%;
            top: 51px;
            width: 41.66666667%;
        }
        .aui .selectCountPaginationTop {
            position: absolute;
            left: 86.5%;
            top: 51px;
            width: 24%;
        }
        .aui .txtCountPaginationBottom {
            left: -11.5%;
            top: -45px;
            width: 43.96666667%;
            position: relative;
        }
        .aui .selectCountPaginationBottom {
            left: 90.1%;
            top: -75px;
            width: 25%;
            position: relative;
        }
    }
    /* Landscape phones and down */

    @media ( max-width: 480px) {
        .aui #from_emp_type {
            width: 100%;
        }
        .aui #confrimModal {
            left: 1%;
        }
        .aui .ResultsPerPageBottom {
            position: static;
        }
        .aui #width-100-persen {
            width: 110%;
        }
        .aui #widthPersenTop {
            width: 17%;
        }
        .aui #widthPersenBottom {
            width: 19.1%;
        }
        .aui .height-32-px {
            height: 42px
        }
        .aui .txtCountPaginationTop {
            position: absolute;
            left: -25%;
            top: 40px;
            width: 41.66666667%;
        }
        .aui .selectCountPaginationTop {
            position: absolute;
            left: 78.5%;
            top: 42px;
            width: 24%;
        }
        .aui .txtCountPaginationBottom {
            left: -21.2%;
            top: -5px;
            width: 43.96666667%;
            position: relative;
        }
        .aui .selectCountPaginationBottom {
            left: 82.9%;
            top: -34px;
            width: 25%;
            position: relative;
        }
    }
</style>

<div id="container1">
    <!--  nav bar -->
    <div class='row-fluid'>
        <div class='col-xs-12'>
            <div id="slide_status" class="span12" style="z-index: 9000;">
                <div id="btnCloseSlide"><i class='fa fa-times'></i></div>
                <div id="slide_status_area"></div>
            </div>
        </div>
    </div>

    <div class="row-fluid app_url_hidden">
        <!-- start--row-fluid -->
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5><liferay-ui:message key="advanced-search"/></h5>
                </div>
                <div class="ibox-content breadcrumbs2">
                    <div class="row-fluid ">
                        <!-- param year -->
                        <div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span4">
                            <select name="year1" id="s_yr1" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer; width: 100%" data-original-title="<liferay-ui:message key="year"/>">
                                <option value=""><liferay-ui:message key="start-year"/></option>
                            </select>
                        </div>
                        <div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span4">
                            <select name="year2" id="s_yr2" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer; width: 100%" data-original-title="<liferay-ui:message key="year"/>">
                                <option value=""><liferay-ui:message key="end-year"/></option>
                            </select>
                        </div>
                        <div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span4">
                            <select name="type" id="s_type" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer; width: 100%" data-original-title="<liferay-ui:message key="type"/>">
                            </select>
                        </div>
                        <!-- <div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span2">
                            <select name="type" id="s_type_value" class="input form-control input-sm hidden" title="" data-toggle="tooltip" style="cursor: pointer; width: 100%" data-original-title="type_value">
                            </select>
                        </div> -->
                        <!-- param kpi -->
                        <div style="margin-left: 5px; margin-bottom: 3px;" class="form-group pull-left span11" id="kpiArea">
                            <select name="kpi" id="s_kpi" class="input form-control input-sm" title="" data-toggle="tooltip" style="cursor: pointer; width: 100%" data-original-title="<liferay-ui:message key="kpi"/>">
                            </select>
                        </div>
                        <div style="margin-bottom: 5px;" class="form-group pull-right m-b-none ">
                            <button id="btnSearchAdvance" onclick="search_chart()" name="btnSearchAdvance" class="btn btn-info input-sm" type="button">
                                <i class="fa fa-search"></i>&nbsp;<liferay-ui:message key="search"/>
                            </button>
                        </div>
                    </div>
                </div>
            <!-- content end -->
            </div>
        </div>
    </div>
    <!-- end--row-fluid -->
    <div class="row-fluid app_url_hidden">
        <!-- start--row-fluid -->
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5><liferay-ui:message key="benchmark"/></h5>
                </div>
                <div class="ibox-content breadcrumbs2">
                    <div class="row-fluid p-t-xxs">
                        <div class="span6">
                            <div align="left">
                                <i id="previous_chart" class="fa fa-arrow-left fa-2x" aria-hidden="true" style="display:none;"></i>
                            </div>
                        </div>
                        <div class="span6">
                            <div align="right">
                                <i id="next_chart" class="fa fa-arrow-right fa-2x" aria-hidden="true" style="display:none;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid p-t-xxs">
                        <div id="chart-container" style="width: 100%; height: 500px; overflow-x: scroll; overflow-y: hidden; display: flex;">
                        </div>
                    </div>
                </div>
            <!-- content end -->
            </div>
        </div>
    </div>
<!-- end--row-fluid -->
</div>