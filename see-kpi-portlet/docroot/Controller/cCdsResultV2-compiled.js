"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

$(document).ready(function () {
  var cdsResultAPIPath = "".concat(serviceName, "/public/cds_result");
  var cdsResultAPIPathV2 = "".concat(serviceName, "/public/cds_result_v2");
  var username = $('#user_portlet').val();
  var password = $('#pass_portlet').val();
  var plid = $('#plid_portlet').val();
  var documentBody = $('body');
  var methods = {
    pageInit: function pageInit() {
      if (username != '' && username != null & username != [] && username != undefined) {
        if (connectionServiceFn(username, password, plid) == false) {
          return false;
        }
      }

      $.ajaxSetup({
        headers: {
          Authorization: "Bearer ".concat(tokenID.token)
        }
      });
      $('[data-toggle="tooltip"]').css({
        cursor: 'pointer'
      });
      $('[data-toggle="tooltip"]').tooltip({
        html: true
      });
      $('.dropify').dropify();
      $('.app_url_hidden').show();
      $('.sr-only').hide();
    },
    applySearchListeners: function applySearchListeners() {
      var yearDropdown = $('#year');
      var appraisalTypeDropdown = $('#app_type');
      var employeeNameInput = $('#emp_name');
      var positionInput = $('#position');
      var appraisalLevelDropdown = $('#app_lv');
      var organizationDropdown = $('#org_id');

      if (yearDropdown) {
        methods.renderSearchDropdownList('public/cds_result/year_list', {}, yearDropdown, 'current_appraisal_year', 'current_appraisal_year', 'filterYear');
        yearDropdown.on('change', function (e) {
          state.filterYear = e.target.value;
        });
      }

      if (appraisalLevelDropdown) {
        methods.renderSearchDropdownList('public/cds_result/al_list_v2', {}, appraisalLevelDropdown, 'level_id', 'appraisal_level_name', 'filterAppraisalLevel', !!tokenID.is_hr, 'All Level', true);
        appraisalLevelDropdown.on('change', function (e) {
          state.filterAppraisalLevel = e.target.value;
          methods.renderSearchDropdownList('public/cds_result/org_list_v2', {
            level_id: e.target.value
          }, organizationDropdown, 'org_id', 'org_name', 'filterOrganization', !!tokenID.is_hr, 'All Organization');
        });
      }

      if (organizationDropdown) {
        organizationDropdown.on('change', function (e) {
          state.filterOrganization = e.target.value;
        });
      }

      if (appraisalTypeDropdown) {
        methods.renderSearchDropdownList('public/appraisal_assignment/appraisal_type_list', {}, appraisalTypeDropdown, 'appraisal_type_id', 'appraisal_type_name', 'filterAppraisalType');
        appraisalTypeDropdown.on('change', function (e) {
          state.filterAppraisalType = e.target.value;

          if (e.target.value == 2) {
            $('#orgOrEmp').text('Emp Name');
            employeeNameInput.attr('disabled', false);
            positionInput.attr('disabled', false);
          } else {
            $('#orgOrEmp').text('Org Name');
            employeeNameInput.attr('disabled', true);
            positionInput.attr('disabled', true);
          }
        });
      }

      if (employeeNameInput) {
        employeeNameInput.autocomplete({
          source: function source(req, res) {
            $.ajax({
              url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/auto_emp_name"),
              type: 'POST',
              dataType: 'json',
              data: {
                emp_name: req.term
              },
              error: function error(xhr, textStatus, errorThrown) {
                console.log('Error: ' + xhr.responseText);
              },
              success: function success(data) {
                res(data.map(function (item) {
                  return {
                    label: item.emp_name,
                    value: item.emp_name,
                    emp_id: item.emp_id
                  };
                }));
              },
              beforeSend: function beforeSend() {
                return documentBody.mLoading('hide');
              }
            });
          },
          select: function select(e, ui) {
            state.filterEmp = {
              id: ui.item.emp_id,
              name: ui.item.value
            };
            employeeNameInput.val(state.filterEmp.name);
            return false;
          },
          change: function change(e, ui) {
            if (employeeNameInput.val() == state.filterEmp.name) {
              console.log(state.filterEmp);
            } else if (ui.item != null) {
              console.log(ui.item);
              state.filterEmp = {
                id: ui.item.emp_id,
                name: ui.item.emp_name
              };
            } else {
              state.filterEmp = {
                id: '',
                name: ''
              };
            }
          }
        });
      }

      if (positionInput) {
        positionInput.autocomplete({
          source: function source(req, res) {
            $.ajax({
              url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/auto_position_name"),
              type: 'POST',
              dataType: 'json',
              data: {
                position_name: req.term
              },
              error: function error(xhr, textStatus, errorThrown) {
                console.log('Error: ' + xhr.responseText);
              },
              success: function success(data) {
                res(data.map(function (item) {
                  return {
                    label: item.position_name,
                    value: item.position_name,
                    position_id: item.position_id
                  };
                }));
              },
              beforeSend: function beforeSend() {
                return documentBody.mLoading('hide');
              }
            });
          },
          select: function select(e, ui) {
            console.log(e, ui);
            state.filterPosition = {
              id: ui.item.position_id,
              name: ui.item.position_value
            };
            return false;
          },
          change: function change(e, ui) {
            console.log(e, ui);

            if (positionInput.val() == state.filterPosition.name) {
              console.log('test');
            } else if (ui.item != null) {
              state.filterPosition = {
                id: ui.item.position_id,
                name: ui.item.position_name
              };
            } else {
              state.filterEmp = {
                id: '',
                name: ''
              };
            }
          }
        });
      }
    },
    applyImportModalListeners: function applyImportModalListeners() {
      var importCdsButton = $('#cdsImportButton');
      var importModal = $('#ModalImport');
      var importFileForm = $('form#fileImportCdsResult');
      var importFileInput = $('#file');
      importModal.on('hidden.bs.modal', function () {
        state.importFormData = null;
        importFileInput.val('');
        documentBody.mLoading('hide');
      });
      importFileInput.on('change', function (e) {
        var importFormData = new FormData();
        var stagingFile = e.target.files[0];
        importFormData.append('file', stagingFile);
        state.importFormData = importFormData;
      });
      importFileForm.on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        documentBody.mLoading();

        if (!state.importFormData || !state.importFormData.getAll('file').length) {
          importModal.modal('hide');
          return false;
        }

        $.ajax({
          url: "".concat(restfulURL, "/").concat(cdsResultAPIPath),
          type: 'POST',
          data: state.importFormData,
          processData: false,
          contentType: false,
          success: function success(data, textStatus, jqXHR) {
            if (data.status == 200 && data.errors.length == 0) {
              callFlashSlide(Liferay.Language.get('import-cds-result-successfully'));
              methods.refreshData(1, state.pagination.perPage);
            } else {
              var validateFile = '';
              data.errors.map(function (err, index) {
                if (err[Object.keys(err)[0]] !== undefined || err[Object.keys(err)[0]] === null) {
                  if (err[Object.keys(err)[0]] === null) {
                    validateFile += "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " + Object.keys(err)[0] + " : null <i class='fa fa-level-down'></i><br>";
                  } else {
                    validateFile += "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " + Object.keys(err)[0] + ': ' + data.errors[index][Object.keys(err)[0]] + " <i class='fa fa-level-down'></i><br>";
                  }
                }

                data.errors.map(function (data, index) {
                  validateFile += "<font color='red'>&emsp;*</font> " + indexEntry2 + '<br>';
                });
              });
              callFlashSlideInModal(validateFile, '#information', 'error');
            }

            methods.refreshData(1, state.pagination.perPage); // TODO --- Test Case 1: Without error, Case 2: With errors
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            callFlashSlide('Format Error : ' + textStatus);
          },
          complete: function complete() {
            importModal.modal('hide');
          }
        });
        return false;
      });
      importCdsButton.click(function () {
        $('.btnModalClose').click();
        $('.dropify-clear').click();
        importCdsButton.attr({
          'data-backdrop': setModalPopup[0],
          'data-keyboard': setModalPopup[1]
        });
      });
    },
    applyExportButtonListeners: function applyExportButtonListeners() {
      var exportCdsButton = $('#cdsExportButton');
      var confirmExportButton = $('#btnConfirmExport');
      var exportMonthSelector = $('#exportMonthSelector');

      if (exportMonthSelector) {
        MONTHS_ARRAY.map(function (month) {
          exportMonthSelector.append("<option value='".concat(month.id, "'>").concat(month.label_en_short, "</option>"));
        });
        exportMonthSelector.on('change', function (e) {
          state.exportMonth = e.target.value;
        });
      }

      if (confirmExportButton) {
        confirmExportButton.on('click', function (e) {
          var requestData = {
            current_appraisal_year: state.filterYear,
            month_id: state.exportMonth,
            level_id: state.filterAppraisalLevel,
            appraisal_type_id: state.filterAppraisalType,
            org_id: state.filterOrgLevel,
            position_id: state.filterPosition.id,
            emp_id: state.filterEmp.id
          };
          var xhr;

          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          }

          xhr.open('POST', "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/export"), true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + tokenID.token);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.responseType = 'blob';

          xhr.onload = function () {
            var blob = xhr.response;
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'CDS_Result.xls';
            a.click();
            callFlashSlide('Saved');
          };

          xhr.onerror = function (err) {
            console.log(err);
          };

          xhr.send(JSON.stringify(requestData));
        });
      }

      exportCdsButton.click(function () {
        $('.btnModalClose').click();
        $('.dropify-clear').click();
        exportCdsButton.attr({
          'data-backdrop': setModalPopup[0],
          'data-keyboard': setModalPopup[1]
        });
      });
    },
    applySearchButtonListeners: function applySearchButtonListeners() {
      var searchButton = $('#btnSearchAdvance');

      if (searchButton) {
        searchButton.on('click', function () {
          methods.refreshData();

          if ($('#app_type').val() == 2) {
            $('#orgOrEmp').text('Emp Name');
          } else {
            $('#orgOrEmp').text('Org Name');
          }
        });
      }
    },
    applyEditListeners: function applyEditListeners() {
      var toggleEditButton = $('#btnEditCdsResult');
      var cancelButton = $('#btnCancelCdsResult');
      var saveButton = $('#btnSaveCdsResult');
      toggleEditButton.off('click');
      cancelButton.off('click');
      saveButton.off('click');
      toggleEditButton.on('click', function () {
        var cdsValueInputs = $('.cdsValueInput');
        var forecastValueInputs = $('.cdsForecastValueInput');
        var forecastBUInputs = $('.cdsForecastBUInput');
        state.cdsEditing = true;
        toggleEditButton.prop('disabled', state.cdsEditing);
        saveButton.prop('disabled', !state.cdsEditing);
        cancelButton.prop('disabled', !state.cdsEditing);

        if (tokenID.is_hr === 1) {
          cdsValueInputs.attr('disabled', false);
          forecastValueInputs.attr('disabled', false);
          forecastBUInputs.attr('disabled', false);
        } else if (tokenID.is_show_corporate === 1 && state.filterAppraisalLevel == 2) {
          cdsValueInputs.attr('disabled', true);
          forecastValueInputs.attr('disabled', true);
          forecastBUInputs.attr('disabled', true);
        } else {
          var currentMonth = new Date().getMonth() + 1;
          cdsValueInputs.map(function (index, item) {
            item = $(item);

            if (item.data('monthid') == currentMonth || item.data('monthid') == currentMonth - 1) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });
          forecastValueInputs.map(function (index, item) {
            item = $(item);

            if (item.data('monthid') >= currentMonth) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });
          forecastBUInputs.map(function (index, item) {
            item = $(item);

            if (item.data('monthid') >= currentMonth) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });
        }
      });
      cancelButton.on('click', function () {
        state.cdsEditing = false;
        $('#btnEditCdsResult').prop('disabled', state.cdsEditing);
        $('#btnSaveCdsResult').prop('disabled', !state.cdsEditing);
        $('#btnCancelCdsResult').prop('disabled', !state.cdsEditing);
        methods.renderData(state.originalData);
      });
      saveButton.on('click', function () {
        $.ajax({
          url: "".concat(restfulURL, "/").concat(cdsResultAPIPathV2),
          type: 'PUT',
          data: {
            cdsResult: state.modifiedData.reduce(function (cdsArray, cdsItem) {
              return cdsArray.concat(cdsItem.months);
            }, [])
          },
          success: function success(data, status, xhr) {
            if (xhr.status === 200) {
              methods.refreshData(1, state.pagination.perPage);
            } else if (data.status == '400') {
              callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
            }
          }
        });
      });
    },
    renderSearchDropdownList: function renderSearchDropdownList(apiPath) {
      var apiData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var targetNode = arguments.length > 2 ? arguments[2] : undefined;
      var dataValueKey = arguments.length > 3 ? arguments[3] : undefined;
      var dataLabelKey = arguments.length > 4 ? arguments[4] : undefined;
      var stateFilterName = arguments.length > 5 ? arguments[5] : undefined;
      var all = arguments.length > 6 ? arguments[6] : undefined;
      var allLabel = arguments.length > 7 ? arguments[7] : undefined;
      var triggerChange = arguments.length > 8 ? arguments[8] : undefined;
      $.ajax({
        type: 'GET',
        url: "".concat(restfulURL, "/").concat(serviceName, "/").concat(apiPath),
        dataType: 'json',
        data: apiData,
        success: function success(data, status, xhr) {
          if (xhr.status === 200) {
            var optionTemplate = "<option value=$objectValue>$objectLabel</option>";
            var optionsString = '';
            targetNode.empty();
            data.map(function (item) {
              optionsString += optionTemplate.replace('$objectValue', item[dataValueKey]).replace('$objectLabel', item[dataLabelKey]);
            });

            if (all) {
              targetNode.append(optionTemplate.replace('$objectValue', '').replace('$objectLabel', allLabel));
              state[stateFilterName] = '';
            } else {
              state[stateFilterName] = data[0][dataValueKey];
            }

            if (triggerChange) {
              methods.renderSearchDropdownList('public/cds_result/org_list_v2', {
                level_id: all ? '' : data[0][dataValueKey]
              }, $('#org_id'), 'org_id', 'org_name', 'filterOrganization', !!tokenID.is_hr, 'All Organization');
            }

            targetNode.append(optionsString);
          }
        },
        error: function error(xhr) {
          targetNode.append('<option>-</option>');
        }
      });
    },
    refreshData: function refreshData() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      $.ajax({
        url: "".concat(restfulURL, "/").concat(cdsResultAPIPathV2),
        type: 'GET',
        data: {
          page: page,
          size: size,
          current_appraisal_year: state.filterYear,
          month_id: state.filterMonth,
          appraisal_type_id: state.filterAppraisalType,
          level_id: state.filterAppraisalLevel,
          org_id: state.filterOrganization,
          position_id: state.filterPosition.id,
          emp_id: state.filterEmp.id
        },
        success: function success(data, status, xhr) {
          if (xhr.status === 200) {
            if (data.data) {
              state.originalData = _toConsumableArray(data.data);
              state.modifiedData = _toConsumableArray(data.data);
            }

            state.pagination = {
              perPage: data.per_page,
              currentPage: data.current_page,
              total: data.total
            };
            state.cdsEditing = false;

            if (tokenID.is_show_corporate === 1 && state.filterAppraisalLevel == 2 && tokenID.is_hr !== 1) {
              $('#btnEditCdsResult').prop('disabled', true);
            } else {
              $('#btnEditCdsResult').prop('disabled', state.cdsEditing);
            }

            $('#btnSaveCdsResult').prop('disabled', !state.cdsEditing);
            $('#btnCancelCdsResult').prop('disabled', !state.cdsEditing);
            methods.renderData(state.originalData);
            methods.setupPagination(state.pagination);
            $('#cds_result_list_content').show();
          }
        }
      });
    },
    renderData: function renderData(records) {
      var htmlTable = "";
      var dataRowString = "\n      <tr class=\"rowSearch\" data-recordid=\"$cdsId\" data-toggle=\"collapse\" data-target=\"#collapse-$cdsId$orgId$levelId\">\n        <td class=\"expandButton text-center\" style=\"cursor: pointer;\">\n          <i class=\"fa fa-plus\" style=\"vertical-align: middle;\"></i>\n        </td>\n        <td class=\"Search\">$orgOrEmpName</td>\n        <td class=\"Search\">$cdsName</td>\n        <td class=\"Search\">$UOMName</td>\n        <td class=\"Search\">$year</td>\n      </tr>\n      <tr class=\"collapse\" id=\"collapse-$cdsId$orgId$levelId\">\n        <td colspan='6' class=\"cds-item-collapse\">\n          <div class=\"collapse-hide table-responsive\">\n            <table>\n              <thead>\n                <tr>\n                  <th style='width: 12.5%;min-width: 90px;'>\u0E40\u0E14\u0E37\u0E2D\u0E19</th>\n                  $monthsTableHead\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td style='width: 12.5%;min-width: 90px;'>\u0E04\u0E48\u0E32\u0E02\u0E2D\u0E07\u0E0A\u0E38\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</td>\n                  $cdsValueInputsString\n                </tr>\n                <tr>\n                  <td style='width: 12.5%;min-width: 90px;'>\u0E04\u0E48\u0E32\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C</td>\n                  $cdsForecastValueInputsString\n                </tr>\n                <tr>\n                  <td style='width: 12.5%;min-width: 90px;'>\u0E04\u0E48\u0E32\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19</td>\n                  $cdsForecastBUInputsString\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </td>\n      </tr>\n      ";
      records.map(function (item) {
        var monthsTableHead = '';
        var cdsValueInputsString = '';
        var cdsForecastValueInputsString = '';
        var cdsForecastBUInputsString = '';

        var months = _toConsumableArray(MONTHS_ARRAY);

        months.map(function (month) {
          var monthItem = item.months.find(function (i) {
            return i.appraisal_month_no == month.id;
          });
          monthsTableHead += "\n            <th class=\"colHead\">\n              <span class='".concat(monthItem ? 'text-success' : 'text-primary', "'>\n                ").concat(month.label_th_short, "\n              </span>\n              <span class='colHeadOptions'>\n                <i data-trigger=\"focus\" \n                  tabindex=\"0\" \n                  data-content=\"\n                    <button style='width:100%;' \n                      class='btn btn-success btn-small btn-gear cdsDetailButton' \n                      data-target='' data-backdrop='static' \n                      data-keyboard='false' data-toggle='modal'\n                      data-cdsid='").concat(item.cds_id, "'\n                      data-orgid='").concat(item.org_id, "'\n                      data-levelid='").concat(item.level_id, "'\n                      data-empid='").concat(item.emp_id, "'\n                      data-monthno='").concat(month.id, "'>\n                      Detail\n                    </button>  \n                    <button style='width:100%;'\n                      class='btn btn-danger btn-small btn-gear cdsDeleteButton'\n                      data-cdsid='").concat(item.cds_id, "'\n                      data-orgid='").concat(item.org_id, "'\n                      data-levelid='").concat(item.level_id, "'\n                      data-empid='").concat(item.emp_id, "'\n                      data-monthno='").concat(month.id, "'>\n                      Delete\n                    </button>\"\n                  data-placement=\"top\" \n                  data-toggle=\"popover\" \n                  data-html=\"true\" \n                  class=\"fa fa-ellipsis-v options popover-detail-del\" \n                  data-original-title=\"\" \n                  title=\"\">\n                </i>\n              </span>\n            </th>");
          cdsValueInputsString += "\n          <td>\n            <input type='text' \n              id=\"cdsValueInput-".concat(item.cds_result_id, "-").concat(month.id, "\" \n              data-cds_id=").concat(item.cds_id, "\n              data-cds_result_id=").concat(item.cds_result_id, "\n              data-level_id=").concat(item.level_id, "\n              data-org_id=").concat(item.org_id, "\n              data-emp_id=").concat(item.emp_id, "\n              data-monthid=").concat(month.id, "\n              class=\"cdsValueInput colCdsData\" \n              value=\"").concat(monthItem ? monthItem.cds_value || '' : '', "\" \n              ").concat(state.cdsEditing ? '' : 'disabled', " />\n          </td>");
          cdsForecastValueInputsString += "\n          <td>\n            <input type='text' \n              id=\"cdsForecastValueInput-".concat(item.cds_result_id, "-").concat(month.id, "\" \n              data-cds_id=").concat(item.cds_id, "\n              data-cds_result_id=").concat(item.cds_result_id, "\n              data-level_id=").concat(item.level_id, "\n              data-org_id=").concat(item.org_id, "\n              data-emp_id=").concat(item.emp_id, "\n              data-monthid=").concat(month.id, "\n              class=\"cdsForecastValueInput colCdsData\" \n              value=\"").concat(monthItem ? monthItem.corporate_forecast_value || '' : '', "\"\n              ").concat(state.cdsEditing ? '' : 'disabled', " />\n          </td>");
          cdsForecastBUInputsString += "\n            <td>\n              <input type='text' \n                id=\"cdsForecastBUInput-".concat(item.cds_result_id, "-").concat(month.id, "\" \n                data-cds_id=").concat(item.cds_id, "\n                data-cds_result_id=").concat(item.cds_result_id, "\n                data-level_id=").concat(item.level_id, "\n                data-org_id=").concat(item.org_id, "\n                data-emp_id=").concat(item.emp_id, "\n                data-monthid=").concat(month.id, "\n                class=\"cdsForecastBUInput colCdsData\" \n                value=\"").concat(monthItem ? monthItem.bu_forecast_value || '' : '', "\" \n                ").concat(state.cdsEditing ? '' : 'disabled', " />\n            </td>");
        });
        htmlTable += dataRowString.replace('$orgOrEmpName', state.filterAppraisalType == '2' ? item.emp_name : item.org_name).replace('$cdsName', item.cds_name).replace('$UOMName', item.uom_name).replace('$year', item.year).replace(/\$cdsId/g, item.cds_id).replace(/\$orgId/g, item.org_id).replace(/\$levelId/g, item.level_id).replace(/\$empId/g, item.emp_id).replace('$monthsTableHead', monthsTableHead).replace('$cdsValueInputsString', cdsValueInputsString).replace('$cdsForecastValueInputsString', cdsForecastValueInputsString).replace('$cdsForecastBUInputsString', cdsForecastBUInputsString);
      });
      var tableBody = $('#listCdsResult');
      tableBody.empty();
      tableBody.append(htmlTable);
      var expendableColumns = $('.expandButton');

      if (expendableColumns) {
        expendableColumns.children().on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var expandIcon = $(e.target);
          var subCdsRowSelector = expandIcon.parent().parent().data('target');
          var subCdsRow = $(subCdsRowSelector).children().children();

          if (expandIcon.hasClass('fa-plus')) {
            expandIcon.removeClass('fa-plus').addClass('fa-minus');
            subCdsRow.removeClass('collapse-hide').addClass('collapse-show');
          } else {
            expandIcon.removeClass('fa-minus').addClass('fa-plus');
            subCdsRow.removeClass('collapse-show').addClass('collapse-hide');
          }
        });
        expendableColumns.on('click', function (e) {
          e.preventDefault();
          var expandIcon = $(e.target).children();
          var subCdsRowSelector = expandIcon.parent().parent().data('target');
          var subCdsRow = $(subCdsRowSelector).children().children();

          if (expandIcon.hasClass('fa-plus')) {
            expandIcon.removeClass('fa-plus').addClass('fa-minus');
            subCdsRow.removeClass('collapse-hide').addClass('collapse-show');
          } else {
            expandIcon.removeClass('fa-minus').addClass('fa-plus');
            subCdsRow.removeClass('collapse-show').addClass('collapse-hide');
          }
        });
      }

      var cdsValueInputs = $('.cdsValueInput');
      var forecastValueInputs = $('.cdsForecastValueInput');
      var forecastBUInputs = $('.cdsForecastBUInput');
      cdsValueInputs.off('change');
      forecastValueInputs.off('change');
      forecastBUInputs.off('change');
      cdsValueInputs.on('change', function (e) {
        var cdsId = e.target.dataset.cds_id;
        var orgId = e.target.dataset.org_id;
        var levelId = e.target.dataset.level_id;
        var empId = e.target.dataset.emp_id;
        var monthId = e.target.dataset.monthid;
        var newValue = e.target.value;
        state.modifiedData = state.modifiedData.map(function (item) {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              var monthIndex = item.months.findIndex(function (month) {
                return month.appraisal_month_no == monthId;
              });

              if (monthIndex >= 0 && item.months[monthIndex]) {
                var oldData = item.months[monthIndex];
                item.months[monthIndex] = _objectSpread({}, oldData, {
                  cds_value: newValue
                });
              } else {
                var cds_id = item.cds_id,
                    year = item.year,
                    level_id = item.level_id,
                    org_id = item.org_id,
                    appraisal_type_id = item.appraisal_type_id,
                    position_id = item.position_id,
                    emp_id = item.emp_id;
                var targetMonth = MONTHS_ARRAY.find(function (month) {
                  return month.id == monthId;
                });
                var updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  cds_value: newValue,
                  cds_id: cds_id,
                  year: year,
                  org_id: org_id,
                  level_id: level_id,
                  position_id: position_id,
                  appraisal_type_id: appraisal_type_id,
                  emp_id: emp_id
                };
                item.months = [].concat(_toConsumableArray(item.months), [updatedMonth]);
              }
            }
          } else {
            if (item.cds_id == cdsId && item.emp_id == empId) {
              var _monthIndex = item.months.findIndex(function (month) {
                return month.appraisal_month_no == monthId;
              });

              if (_monthIndex >= 0 && item.months[_monthIndex]) {
                var _oldData = item.months[_monthIndex];
                item.months[_monthIndex] = _objectSpread({}, _oldData, {
                  cds_value: newValue
                });
              } else {
                var _cds_id = item.cds_id,
                    _year = item.year,
                    _level_id = item.level_id,
                    _org_id = item.org_id,
                    _appraisal_type_id = item.appraisal_type_id,
                    _position_id = item.position_id,
                    _emp_id = item.emp_id;

                var _targetMonth = MONTHS_ARRAY.find(function (month) {
                  return month.id == monthId;
                });

                var _updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: _targetMonth ? _targetMonth.label_en_short : 'Unknown',
                  cds_value: newValue,
                  cds_id: _cds_id,
                  year: _year,
                  org_id: _org_id,
                  level_id: _level_id,
                  position_id: _position_id,
                  appraisal_type_id: _appraisal_type_id,
                  emp_id: _emp_id
                };
                item.months = [].concat(_toConsumableArray(item.months), [_updatedMonth]);
              }
            }
          }

          return item;
        });
      });
      forecastValueInputs.on('change', function (e) {
        var cdsId = e.target.dataset.cds_id;
        var orgId = e.target.dataset.org_id;
        var levelId = e.target.dataset.level_id;
        var empId = e.target.dataset.emp_id;
        var monthId = e.target.dataset.monthid;
        var newValue = e.target.value;
        state.modifiedData = state.modifiedData.map(function (item) {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              var monthIndex = item.months.findIndex(function (month) {
                return month.appraisal_month_no == monthId;
              });

              if (monthIndex >= 0 && item.months[monthIndex]) {
                var oldData = item.months[monthIndex];
                item.months[monthIndex] = _objectSpread({}, oldData, {
                  corporate_forecast_value: newValue
                });
              } else {
                var cds_id = item.cds_id,
                    year = item.year,
                    level_id = item.level_id,
                    org_id = item.org_id,
                    appraisal_type_id = item.appraisal_type_id,
                    position_id = item.position_id,
                    emp_id = item.emp_id;
                var targetMonth = MONTHS_ARRAY.find(function (month) {
                  return month.id == monthId;
                });
                var updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  corporate_forecast_value: newValue,
                  cds_id: cds_id,
                  year: year,
                  org_id: org_id,
                  level_id: level_id,
                  position_id: position_id,
                  appraisal_type_id: appraisal_type_id,
                  emp_id: emp_id
                };
                item.months = [].concat(_toConsumableArray(item.months), [updatedMonth]);
              }
            }
          } else {
            if (item.cds_id == cdsId && item.emp_id == empId) {
              var _monthIndex2 = item.months.findIndex(function (month) {
                return month.appraisal_month_no == monthId;
              });

              if (_monthIndex2 >= 0 && item.months[_monthIndex2]) {
                var _oldData2 = item.months[_monthIndex2];
                item.months[_monthIndex2] = _objectSpread({}, _oldData2, {
                  corporate_forecast_value: newValue
                });
              } else {
                var _cds_id2 = item.cds_id,
                    _year2 = item.year,
                    _level_id2 = item.level_id,
                    _org_id2 = item.org_id,
                    _appraisal_type_id2 = item.appraisal_type_id,
                    _position_id2 = item.position_id,
                    _emp_id2 = item.emp_id;

                var _targetMonth2 = MONTHS_ARRAY.find(function (month) {
                  return month.id == monthId;
                });

                var _updatedMonth2 = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: _targetMonth2 ? _targetMonth2.label_en_short : 'Unknown',
                  corporate_forecast_value: newValue,
                  cds_id: _cds_id2,
                  year: _year2,
                  org_id: _org_id2,
                  level_id: _level_id2,
                  position_id: _position_id2,
                  appraisal_type_id: _appraisal_type_id2,
                  emp_id: _emp_id2
                };
                item.months = [].concat(_toConsumableArray(item.months), [_updatedMonth2]);
              }
            }
          }

          return item;
        });
      });
      forecastBUInputs.on('change', function (e) {
        var cdsId = e.target.dataset.cds_id;
        var orgId = e.target.dataset.org_id;
        var levelId = e.target.dataset.level_id;
        var empId = e.target.dataset.emp_id;
        var monthId = e.target.dataset.monthid;
        var newValue = e.target.value;
        state.modifiedData = state.modifiedData.map(function (item) {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              var monthIndex = item.months.findIndex(function (month) {
                return month.appraisal_month_no == monthId;
              });

              if (monthIndex >= 0 && item.months[monthIndex]) {
                var oldData = item.months[monthIndex];
                item.months[monthIndex] = _objectSpread({}, oldData, {
                  bu_forecast_value: newValue
                });
              } else {
                var cds_id = item.cds_id,
                    year = item.year,
                    level_id = item.level_id,
                    org_id = item.org_id,
                    appraisal_type_id = item.appraisal_type_id,
                    position_id = item.position_id,
                    emp_id = item.emp_id;
                var targetMonth = MONTHS_ARRAY.find(function (month) {
                  return month.id == monthId;
                });
                var updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  bu_forecast_value: newValue,
                  cds_id: cds_id,
                  year: year,
                  org_id: org_id,
                  level_id: level_id,
                  position_id: position_id,
                  appraisal_type_id: appraisal_type_id,
                  emp_id: emp_id
                };
                item.months = [].concat(_toConsumableArray(item.months), [updatedMonth]);
              }
            } else {
              if (item.cds_id == cdsId && item.emp_id == empId) {
                var _monthIndex3 = item.months.findIndex(function (month) {
                  return month.appraisal_month_no == monthId;
                });

                if (_monthIndex3 >= 0 && item.months[_monthIndex3]) {
                  var _oldData3 = item.months[_monthIndex3];
                  item.months[_monthIndex3] = _objectSpread({}, _oldData3, {
                    bu_forecast_value: newValue
                  });
                } else {
                  var _cds_id3 = item.cds_id,
                      _year3 = item.year,
                      _level_id3 = item.level_id,
                      _org_id3 = item.org_id,
                      _appraisal_type_id3 = item.appraisal_type_id,
                      _position_id3 = item.position_id,
                      _emp_id3 = item.emp_id;

                  var _targetMonth3 = MONTHS_ARRAY.find(function (month) {
                    return month.id == monthId;
                  });

                  var _updatedMonth3 = {
                    cds_result_id: null,
                    appraisal_month_no: monthId,
                    appraisal_month_name: _targetMonth3 ? _targetMonth3.label_en_short : 'Unknown',
                    bu_forecast_value: newValue,
                    cds_id: _cds_id3,
                    year: _year3,
                    org_id: _org_id3,
                    level_id: _level_id3,
                    position_id: _position_id3,
                    appraisal_type_id: _appraisal_type_id3,
                    emp_id: _emp_id3
                  };
                  item.months = [].concat(_toConsumableArray(item.months), [_updatedMonth3]);
                }
              }
            }
          }

          return item;
        });
      });

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $('.popover-detail-del').popover({
          delay: {
            hide: 100
          },
          container: '.ibox-content'
        });
      } else {
        $('.popover-detail-del').popover({
          delay: {
            hide: 100
          }
        });
      }

      var cdsItem = $('.CdsResult');
      cdsItem.off('click', '.popover-detail-del');
      cdsItem.on('click', '.popover-detail-del', function () {
        var cdsDetailButtons = $('.cdsDetailButton');
        var cdsDeleteButtons = $('.cdsDeleteButton');
        cdsDetailButtons.off('click');
        cdsDetailButtons.on('click', function (e) {
          var targetCdsId = e.target.dataset.cdsid;
          var targetOrgId = e.target.dataset.orgid;
          var targetLevelId = e.target.dataset.levelid;
          var targetEmpId = e.target.dataset.empid;
          var targetMonth = e.target.dataset.monthno;
          var cdsRecord = state.originalData.find(function (record) {
            return record.cds_id == targetCdsId && (record.appraisal_type_id == 1 ? record.org_id == targetOrgId : record.emp_id == targetEmpId) && record.level_id == targetLevelId;
          });

          if (cdsRecord) {
            var cdsResultRecord = cdsRecord.months.find(function (cdsResult) {
              return cdsResult.appraisal_month_no == targetMonth && cdsResult.cds_id == targetCdsId && (cdsResult.appraisal_type_id == 1 ? cdsResult.org_id == targetOrgId : cdsResult.emp_id == targetEmpId) && cdsResult.level_id == cdsRecord.level_id;
            });

            if (cdsResultRecord && cdsResultRecord.cds_result_id) {
              methods.openEditDetailModal(cdsResultRecord.cds_result_id);
            }
          }
        });
        cdsDeleteButtons.off('click');
        cdsDeleteButtons.on('click', function (e) {
          var targetCdsId = e.target.dataset.cdsid;
          var targetOrgId = e.target.dataset.orgid;
          var targetLevelId = e.target.dataset.levelid;
          var targetMonth = e.target.dataset.monthno;
          var cdsRecord = state.originalData.find(function (record) {
            return record.cds_id == targetCdsId && (record.appraisal_type_id == 1 ? record.org_id == targetOrgId : record.emp_id == targetEmpId) && record.level_id == targetLevelId;
          });

          if (cdsRecord) {
            var cdsResultRecord = cdsRecord.months.find(function (cdsResult) {
              return cdsResult.appraisal_month_no == targetMonth && cdsResult.cds_id == targetCdsId && (cdsResult.appraisal_type_id == 1 ? cdsResult.org_id == targetOrgId : cdsResult.emp_id == targetEmpId) && cdsResult.level_id == cdsRecord.level_id;
            });

            if (cdsResultRecord && cdsResultRecord.cds_result_id) {
              methods.openDeleteModal(cdsResultRecord.cds_result_id);
            }
          }
        });
      });
    },
    setupPagination: function setupPagination(pagination) {
      if (pagination.total == 0) {
        pagination.total = 1;
      }

      $('.pagination_top,.pagination_bottom').off('page');
      $('.pagination_top,.pagination_bottom').bootpag({
        total: pagination.total,
        page: pagination.currentPage,
        maxVisible: 5,
        leaps: true,
        firstLastUse: true,
        first: '←',
        last: '→',
        wrapClass: 'pagination',
        activeClass: 'active',
        disabledClass: 'disabled',
        nextClass: 'next',
        prevClass: 'prev',
        next: 'next',
        prev: 'prev',
        lastClass: 'last',
        firstClass: 'first'
      });
      $('.pagination_top,.pagination_bottom').on('page', function (event, pageNo) {
        methods.refreshData(pageNo, pagination.perPage);
      });
      $('.countPagination').off('change');
      $('.countPagination').on('change', function (e) {
        var currentPerPage = e.target.value;
        state.pagination = _objectSpread({}, pagination, {
          perPage: currentPerPage
        });
        $('#countPaginationTop').val(currentPerPage);
        $('#countPaginationBottom').val(currentPerPage);
        methods.refreshData(1, currentPerPage);
      });
    },
    openEditDetailModal: function openEditDetailModal(cdsResultId) {
      var detailModal = $('#detailModal');
      state.sunEditorInstance = null;
      detailModal.modal({
        backdrop: setModalPopup[0],
        keyboard: setModalPopup[1]
      }).css({
        'margin-top': '0px'
      });
      var htmlOption = "<textarea id=\"datail_name\" style=\"width: 95%\" class=\"\"></textarea>";
      $('#sunEdit').html(htmlOption);
      var editorDetailName = SUNEDITOR.create('datail_name', {
        height: 250,
        width: '100%',
        buttonList: [['undo', 'redo'], ['fontSize', 'formats'], ['bold', 'underline', 'italic', 'strike', 'removeFormat'], ['fontColor', 'hiliteColor'], ['indent', 'outdent'], ['align', 'line', 'list']]
      });
      state.sunEditorInstance = editorDetailName;
      methods.renderCdsResultDetails(cdsResultId);
      $('#btnSaveDetail').on('click', function () {
        if (state.saveDetailAction === 'add') {
          $.ajax({
            url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/detail/").concat(cdsResultId),
            type: 'POST',
            dataType: 'json',
            data: {
              detail_name: editorDetailName.getContent()
            },
            success: function success(data, status) {
              if (data.status == 200) {
                methods.renderCdsResultDetails(cdsResultId);
                editorDetailName.setContent('');
                state.saveDetailAction = 'add';
              } else if (data.status == '400') {
                callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
              }
            }
          });
        } else if (state.saveDetailAction === 'edit') {
          $.ajax({
            url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/detail/").concat(cdsResultId),
            type: 'PATCH',
            dataType: 'json',
            data: {
              detail_name: editorDetailName.getContent(),
              reason_cds_result_id: state.selectingReasonCdsResultId
            },
            success: function success(data, status) {
              if (data.status == 200) {
                methods.renderCdsResultDetails(cdsResultId);
                editorDetailName.setContent('');
                state.saveDetailAction = 'add';
                state.selectingReasonCdsResultId = null;
              } else if (data.status == '400') {
                callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
              }
            }
          });
        }
      });
      $('#btnCancelDetail').on('click', function () {
        state.sunEditorInstance.setContent('');
        state.saveDetailAction = 'add';
        state.selectingReasonCdsResultId = null;
      });
    },
    openDeleteModal: function openDeleteModal(cdsResultId) {
      $('#informConfirm').empty();
      $('#confrimModal').modal({
        backdrop: setModalPopup[0],
        keyboard: setModalPopup[1]
      }).css({
        'margin-top': '0px'
      });
      $(document).off('click', '#btnConfirmOK');
      $(document).on('click', '#btnConfirmOK', function () {
        $.ajax({
          url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/").concat(cdsResultId),
          type: 'DELETE',
          dataType: 'json',
          success: function success(data) {
            if (data.status == 200) {
              callFlashSlide(Liferay.Language.get('delete-successfully'));
              methods.refreshData(1, state.pagination.perPage);
              $('#confrimModal').modal('hide');
            } else if (data.status == '400') {
              callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
            }
          }
        });
      });
    },
    renderCdsResultDetails: function renderCdsResultDetails(cdsResultId) {
      $.ajax({
        url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/detail/").concat(cdsResultId),
        type: 'get',
        dataType: 'json',
        success: function success(data) {
          var detailContainer = $('#listDataDetail');
          var detailRows = '';
          var rowTemplate = "\n          <tr>\n            <td>$index</td>\n            <td>$cds_detail_name</td>\n            <td style=\"text-align: center;\">\n              <i \n                data-trigger=\"focus\" \n                tabindex=\"$index\" \n                data-content=\"\n                  <button \n                    style='width:100%;' \n                    class='btn btn-warning btn-small btn-gear detailEdit' \n                    id='edit_detail-$cds_detail_id' \n                    data-recordid='$cds_detail_id'\n                    data-target='' \n                    data-backdrop='$setModalPopupFunction0' \n                    data-keyboard='$setModalPopupFunction1' \n                    data-toggle='modal'>\n                      $liferayEditText\n                  </button>\n                  <button \n                    id='delete_detail-$cds_detail_id' \n                    style='width:100%;' \n                    data-recordid='$cds_detail_id'\n                    class='btn btn-danger btn-small btn-gear detailDel'\n                    >\n                      $liferayDeleteText\n                  </button>\" \n                data-placement=\"top\" \n                data-toggle=\"popover\" \n                data-html=\"true\" \n                class=\"fa fa-cog font-gear popover-edit-del\" \n                data-original-title=\"\" title=\"\">\n              </i>\n            </td>\n          </tr> ";

          if (data) {
            data.map(function (item, index) {
              detailRows += rowTemplate.replace(/\$index/g, index + 1).replace(/\$cds_detail_name/g, item.reason_cds_result_name).replace(/\$cds_detail_id/g, item.reason_cds_result_id).replace(/\$setModalPopupFunction0/g, setModalPopup[0]).replace(/\$setModalPopupFunction1/g, setModalPopup[1]).replace(/\$liferayEditText/g, Liferay.Language.get('edit')).replace(/\$liferayDeleteText/g, Liferay.Language.get('delete'));
            });
          }

          detailContainer.html(detailRows);

          if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            $('.popover-edit-del').popover({
              delay: {
                hide: 100
              },
              container: '.ibox-content'
            });
          } else {
            $('.popover-edit-del').popover({
              delay: {
                hide: 100
              }
            });
          }

          detailContainer.off('click', '.popover-edit-del');
          detailContainer.on('click', '.popover-edit-del', function () {
            $('.detailDel').off('click');
            $('.detailDel').on('click', function (e) {
              $('#informConfirm').empty();
              var id = e.target.dataset.recordid;
              $('#confrimModal').modal({
                backdrop: setModalPopup[0],
                keyboard: setModalPopup[1]
              }).css({
                'margin-top': '0px'
              });
              $(document).off('click', '#btnConfirmOK');
              $(document).on('click', '#btnConfirmOK', function () {
                $.ajax({
                  url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/detail/").concat(id),
                  type: 'DELETE',
                  dataType: 'json',
                  success: function success(data) {
                    if (data.status == 200) {
                      callFlashSlide(Liferay.Language.get('delete-successfully'));
                      methods.renderCdsResultDetails(cdsResultId);
                      $('#confrimModal').modal('hide');
                    } else if (data.status == '400') {
                      callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
                    }
                  }
                });
              });
            });
            $('.detailEdit').off('click');
            $('.detailEdit').on('click', function (e) {
              var id = e.target.dataset.recordid;
              $.ajax({
                url: "".concat(restfulURL, "/").concat(cdsResultAPIPath, "/detail/").concat(cdsResultId, "/").concat(id),
                type: 'get',
                dataType: 'json',
                success: function success(data) {
                  state.sunEditorInstance.setContent(data.reason_cds_result_name);
                  state.saveDetailAction = 'edit';
                  state.selectingReasonCdsResultId = id;
                }
              });
            });
          });
        }
      });
    }
  };
  var state = {
    filterYear: '',
    filterAppraisalType: '2',
    filterEmp: {
      id: '',
      name: ''
    },
    filterPosition: {
      id: '',
      name: ''
    },
    filterAppraisalLevel: '',
    filterOrganization: '',
    exportMonth: '1',
    cdsEditing: false,
    pagination: {
      perPage: 10,
      currentPage: 1,
      total: 0
    },
    originalData: [],
    modifiedData: [],
    importFormData: null,
    saveDetailAction: 'add',
    sunEditorInstance: null,
    selectingReasonCdsResultId: null
  };
  methods.pageInit();
  methods.applySearchListeners();
  methods.applyImportModalListeners();
  methods.applyExportButtonListeners();
  methods.applySearchButtonListeners();
  methods.applyEditListeners();
});
