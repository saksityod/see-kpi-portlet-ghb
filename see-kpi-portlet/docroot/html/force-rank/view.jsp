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

<div class="container-fluid no-margin no-padding">
  <div class="row">
    <div class="span12 col-padding">
      <div class="card">
        <form class="container-fluid no-margin no-padding">
          <div class="row">
            <div class="form-group span6">
              <label for="yearSelect" class="control-label span3 label-padding">Year:</label>
              <div class="span9">
                <select name="yearSelect" id="yearSelect" class="form-control">
                  <option>Option</option>
                </select>
              </div>
            </div>
            <div class="form-group span6">
              <label for="periodSelect" class="control-label span3 label-padding">Period:</label>
              <div class="span9">
                <select name="periodSelect" id="periodSelect" class="form-control">
                  <option>Option</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group span6">
              <label for="orgLevelSelect" class="control-label span3 label-padding">Org Level:</label>
              <div class="span9 dropdown-control">
                <button class="form-control multiple-select" id="orgLevelSelect">
                  <div class="dropdown-content">
                    <span class="dropdown-text" id="orgDropdownText">None Selected</span>
                    <span class="dropdown-arrow">&#x2023;</span>
                  </div>
                </button>
                <ul tabindex="0" id="orgLevelSelectItems" class="select-options hide">
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 1</span>
                  </li>
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 2</span>
                  </li>
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 3</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="form-group span6">
              <label for="empLevelSelect" class="control-label span3 label-padding">Emp Level:</label>
              <div class="span9 dropdown-control">
                <button class="form-control multiple-select" id="empLevelSelect">
                  <div class="dropdown-content">
                    <span class="dropdown-text" id="orgDropdownText">None Selected</span>
                    <span class="dropdown-arrow">&#x2023;</span>
                  </div>
                </button>
                <ul tabindex="0" class="select-options hide">
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 1</span>
                  </li>
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 2</span>
                  </li>
                  <li class="option">
                    <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
                    <span class="option-text">Option 3</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="span12">
              <button id="searchButton" class="btn btn-primary" style="float: right;">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="span12 col-padding">
      <div class="card table-responsive">
        <table class="table table-bordered cell-middle table-head-nowrap">
          <thead>
            <tr>
              <th></th>
              <th>A+</th>
              <th>A</th>
              <th>B+</th>
              <th>B</th>
              <th>C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-row-header">Budget</td>
              <td class="inline-input"><input name="periodSelect" id="periodSelect" class="form-control input-sm"></tdc>
                <td class="inline-input"><input name="periodSelect" id="periodSelect" class="form-control input-sm"></td>
                <td class="inline-input"><input name="periodSelect" id="periodSelect" class="form-control input-sm"></td>
                <td class="inline-input"><input name="periodSelect" id="periodSelect" class="form-control input-sm"></td>
                <td class="inline-input"><input name="periodSelect" id="periodSelect" class="form-control input-sm"></td>
            </tr>
          </tbody>
        </table>
        <div class="row" style="text-align: right;">
          <button class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
  <div class="row freezed">
    <div class="graphSpan col-padding">
      <div class="card">
        <canvas id="graphBudget"></canvas>
      </div>
    </div>
    <div class="graphSpan col-padding">
      <div class="card">
        <canvas id="graphActual"></canvas>
      </div>
    </div>
    <div class="graphSpan col-padding">
      <div class="card">
        <canvas id="graphAdjust"></canvas>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="span12 col-padding">
      <div class="card table-responsive">
        <table class="table table-bordered cell-middle table-head-nowrap">
          <thead>
            <tr>
              <th>No.</th>
              <th>Emp Code</th>
              <th>Emp Name</th>
              <th>Level</th>
              <th>Position</th>
              <th>Org</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Adjust Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>E77752</td>
              <td>นายสวัส หนึ่ง</td>
              <td>สถาบันเทคโนโลยีพระจอมเกล้า</td>
              <td>พระจอมเกล้าลาดกระบัง</td>
              <td>เทคโนโลยีสารสนเทศ</td>
              <td>99</td>
              <td>A</td>
              <td class="inline-input">
                <select name="periodSelect" id="periodSelect" class="form-control">
                                    <option>A+</option>
                                    <option>A</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>E77752</td>
              <td>นายสวัส สอง</td>
              <td>สถาบันเทคโนโลยีพระจอมเกล้า</td>
              <td>พระจอมเกล้าลาดกระบัง</td>
              <td>เทคโนโลยีสารสนเทศ</td>
              <td>99</td>
              <td>A</td>
              <td class="inline-input">
                <select name="periodSelect" id="periodSelect" class="form-control">
                                    <option>A+</option>
                                    <option>A</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>E77752</td>
              <td>นายสวัส สาม</td>
              <td>สถาบันเทคโนโลยีพระจอมเกล้า</td>
              <td>พระจอมเกล้าลาดกระบัง</td>
              <td>เทคโนโลยีสารสนเทศ</td>
              <td>99</td>
              <td>A</td>
              <td class="inline-input">
                <select name="periodSelect" id="periodSelect" class="form-control">
                                    <option>A+</option>
                                    <option>A</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>E77752</td>
              <td>นายสวัส สี่</td>
              <td>สถาบันเทคโนโลยีพระจอมเกล้า</td>
              <td>พระจอมเกล้าลาดกระบัง</td>
              <td>เทคโนโลยีสารสนเทศ</td>
              <td>99</td>
              <td>A</td>
              <td class="inline-input">
                <select name="periodSelect" id="periodSelect" class="form-control">
                                    <option>A+</option>
                                    <option>A</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>E77752</td>
              <td>นายสวัส ห้า</td>
              <td>สถาบันเทคโนโลยีพระจอมเกล้า</td>
              <td>พระจอมเกล้าลาดกระบัง</td>
              <td>เทคโนโลยีสารสนเทศ</td>
              <td>99</td>
              <td>A</td>
              <td class="inline-input">
                <select name="periodSelect" id="periodSelect" class="form-control">
                                    <option>A+</option>
                                    <option>A</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>