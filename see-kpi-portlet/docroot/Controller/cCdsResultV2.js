$(document).ready(() => {
  const cdsResultAPIPath = `${serviceName}/public/cds_result`;
  const cdsResultAPIPathV2 = `${serviceName}/public/cds_result_v2`;

  const username = $('#user_portlet').val();
  const password = $('#pass_portlet').val();
  const plid = $('#plid_portlet').val();
  const documentBody = $('body');

  const methods = {
    pageInit: () => {
      if (username != '' && (username != null) & (username != []) && username != undefined) {
        if (connectionServiceFn(username, password, plid) == false) {
          return false;
        }
      }

      $.ajaxSetup({
        headers: {
          Authorization: `Bearer ${tokenID.token}`
        }
      });

      $('[data-toggle="tooltip"]').css({ cursor: 'pointer' });
      $('[data-toggle="tooltip"]').tooltip({
        html: true
      });
      $('.dropify').dropify();
      $('.app_url_hidden').show();
      $('.sr-only').hide();
    },
    applySearchListeners: () => {
      const yearDropdown = $('#year');
      const appraisalTypeDropdown = $('#app_type');
      const employeeNameInput = $('#emp_name');
      const positionInput = $('#position');
      const appraisalLevelDropdown = $('#app_lv');
      const organizationDropdown = $('#org_id');

      if (yearDropdown) {
        methods.renderSearchDropdownList(
          'public/cds_result/year_list',
          {},
          yearDropdown,
          'current_appraisal_year',
          'current_appraisal_year',
          'filterYear'
        );

        yearDropdown.on('change', e => {
          state.filterYear = e.target.value;
        });
      }

      if (appraisalLevelDropdown) {
        methods.renderSearchDropdownList(
          'public/cds_result/al_list_v2',
          {},
          appraisalLevelDropdown,
          'level_id',
          'appraisal_level_name',
          'filterAppraisalLevel',
          !!tokenID.is_hr,
          'All Level',
          true
        );

        appraisalLevelDropdown.on('change', e => {
          state.filterAppraisalLevel = e.target.value;

          methods.renderSearchDropdownList(
            'public/cds_result/org_list_v2',
            { level_id: e.target.value },
            organizationDropdown,
            'org_id',
            'org_name',
            'filterOrganization',
            !!tokenID.is_hr,
            'All Organization'
          );
        });
      }

      if (organizationDropdown) {
        organizationDropdown.on('change', e => {
          state.filterOrganization = e.target.value;
        });
      }

      if (appraisalTypeDropdown) {
        methods.renderSearchDropdownList(
          'public/appraisal_assignment/appraisal_type_list',
          {},
          appraisalTypeDropdown,
          'appraisal_type_id',
          'appraisal_type_name',
          'filterAppraisalType'
        );

        appraisalTypeDropdown.on('change', e => {
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
          source: (req, res) => {
            $.ajax({
              url: `${restfulURL}/${cdsResultAPIPath}/auto_emp_name`,
              type: 'POST',
              dataType: 'json',
              data: {
                emp_name: req.term
              },
              error: (xhr, textStatus, errorThrown) => {
                console.log('Error: ' + xhr.responseText);
              },
              success: data => {
                res(
                  data.map(item => {
                    return {
                      label: item.emp_name,
                      value: item.emp_name,
                      emp_id: item.emp_id
                    };
                  })
                );
              },
              beforeSend: () => documentBody.mLoading('hide')
            });
          },
          select: (e, ui) => {
            state.filterEmp = {
              id: ui.item.emp_id,
              name: ui.item.value
            };
            employeeNameInput.val(state.filterEmp.name);
            return false;
          },
          change: (e, ui) => {
            if (employeeNameInput.val() == state.filterEmp.name) {
              console.log(state.filterEmp);
            } else if (ui.item != null) {
              console.log(ui.item);
              state.filterEmp = { id: ui.item.emp_id, name: ui.item.emp_name };
            } else {
              state.filterEmp = { id: '', name: '' };
            }
          }
        });
      }

      if (positionInput) {
        positionInput.autocomplete({
          source: (req, res) => {
            $.ajax({
              url: `${restfulURL}/${cdsResultAPIPath}/auto_position_name`,
              type: 'POST',
              dataType: 'json',
              data: {
                position_name: req.term
              },
              error: (xhr, textStatus, errorThrown) => {
                console.log('Error: ' + xhr.responseText);
              },
              success: data => {
                res(
                  data.map(item => {
                    return {
                      label: item.position_name,
                      value: item.position_name,
                      position_id: item.position_id
                    };
                  })
                );
              },
              beforeSend: () => documentBody.mLoading('hide')
            });
          },
          select: (e, ui) => {
            console.log(e, ui);
            state.filterPosition = {
              id: ui.item.position_id,
              name: ui.item.position_value
            };
            return false;
          },
          change: (e, ui) => {
            console.log(e, ui);
            if (positionInput.val() == state.filterPosition.name) {
              console.log('test');
            } else if (ui.item != null) {
              state.filterPosition = { id: ui.item.position_id, name: ui.item.position_name };
            } else {
              state.filterEmp = { id: '', name: '' };
            }
          }
        });
      }
    },
    applyImportModalListeners: () => {
      const importCdsButton = $('#cdsImportButton');
      const importModal = $('#ModalImport');
      const importFileForm = $('form#fileImportCdsResult');
      const importFileInput = $('#file');

      importModal.on('hidden.bs.modal', () => {
        state.importFormData = null;
        importFileInput.val('');
        documentBody.mLoading('hide');
      });

      importFileInput.on('change', e => {
        let importFormData = new FormData();
        let stagingFile = e.target.files[0];
        importFormData.append('file', stagingFile);
        state.importFormData = importFormData;
      });

      importFileForm.on('submit', e => {
        e.preventDefault();
        e.stopPropagation();

        documentBody.mLoading();

        if (!state.importFormData || !state.importFormData.getAll('file').length) {
          importModal.modal('hide');
          return false;
        }

        $.ajax({
          url: `${restfulURL}/${cdsResultAPIPath}`,
          type: 'POST',
          data: state.importFormData,
          processData: false,
          contentType: false,
          success: (data, textStatus, jqXHR) => {
            if (data.status == 200 && data.errors.length == 0) {
              callFlashSlide(Liferay.Language.get('import-cds-result-successfully'));
              methods.refreshData(1, state.pagination.perPage);
            } else {
              let validateFile = '';

              data.errors.map((err, index) => {
                if (err[Object.keys(err)[0]] !== undefined || err[Object.keys(err)[0]] === null) {
                  if (err[Object.keys(err)[0]] === null) {
                    validateFile +=
                      "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " +
                      Object.keys(err)[0] +
                      " : null <i class='fa fa-level-down'></i><br>";
                  } else {
                    validateFile +=
                      "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " +
                      Object.keys(err)[0] +
                      ': ' +
                      data.errors[index][Object.keys(err)[0]] +
                      " <i class='fa fa-level-down'></i><br>";
                  }
                }
                data.errors.map((data, index) => {
                  validateFile += "<font color='red'>&emsp;*</font> " + indexEntry2 + '<br>';
                });
              });

              callFlashSlideInModal(validateFile, '#information', 'error');
            }
            methods.refreshData(1, state.pagination.perPage);
            // TODO --- Test Case 1: Without error, Case 2: With errors
          },
          error: function(jqXHR, textStatus, errorThrown) {
            callFlashSlide('Format Error : ' + textStatus);
          },
          complete: () => {
            importModal.modal('hide');
          }
        });
        return false;
      });

      importCdsButton.click(function() {
        $('.btnModalClose').click();
        $('.dropify-clear').click();
        importCdsButton.attr({
          'data-backdrop': setModalPopup[0],
          'data-keyboard': setModalPopup[1]
        });
      });
    },
    applyExportButtonListeners: () => {
      const exportCdsButton = $('#cdsExportButton');
      const confirmExportButton = $('#btnConfirmExport');
      const exportMonthSelector = $('#exportMonthSelector');

      if (exportMonthSelector) {
        MONTHS_ARRAY.map(month => {
          exportMonthSelector.append(`<option value='${month.id}'>${month.label_en_short}</option>`)
        })

        exportMonthSelector.on('change', e => {
          state.exportMonth = e.target.value
        })
      }

      if (confirmExportButton) {
        confirmExportButton.on('click', e => {
          let requestData = {
            current_appraisal_year: state.filterYear,
            month_id: state.exportMonth,
            level_id: state.filterAppraisalLevel,
            appraisal_type_id: state.filterAppraisalType,
            org_id: state.filterOrgLevel,
            position_id: state.filterPosition.id,
            emp_id: state.filterEmp.id
          };

          let xhr;

          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          }
          xhr.open('POST', `${restfulURL}/${cdsResultAPIPath}/export`, true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + tokenID.token);
          xhr.setRequestHeader('Content-Type', 'application/json');

          xhr.responseType = 'blob';
          xhr.onload = () => {
            let blob = xhr.response;
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'CDS_Result';
            a.click();
            callFlashSlide('Saved');
          };
          xhr.onerror = err => {
            console.log(err);
          };
          xhr.send(JSON.stringify(requestData));
        });
      }

      exportCdsButton.click(function() {
        $('.btnModalClose').click();
        $('.dropify-clear').click();
        exportCdsButton.attr({
          'data-backdrop': setModalPopup[0],
          'data-keyboard': setModalPopup[1]
        });
      });
    },
    applySearchButtonListeners: () => {
      const searchButton = $('#btnSearchAdvance');

      if (searchButton) {
        searchButton.on('click', () => {
          methods.refreshData();

          if ($('#app_type').val() == 2) {
            $('#orgOrEmp').text('Emp Name');
          } else {
            $('#orgOrEmp').text('Org Name');
          }
        });
      }
    },
    applyEditListeners: () => {
      let toggleEditButton = $('#btnEditCdsResult');
      let cancelButton = $('#btnCancelCdsResult');
      let saveButton = $('#btnSaveCdsResult');

      toggleEditButton.off('click');
      cancelButton.off('click');
      saveButton.off('click');

      toggleEditButton.on('click', () => {
        let cdsValueInputs = $('.cdsValueInput');
        let forecastValueInputs = $('.cdsForecastValueInput');
        let forecastBUInputs = $('.cdsForecastBUInput');

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
          let currentMonth = new Date().getMonth() + 1
          cdsValueInputs.map((index, item) => {
            item = $(item);
            if (item.data('monthid') == currentMonth || item.data('monthid') == currentMonth - 1) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });

          forecastValueInputs.map((index, item) => {
            item = $(item);
            if (item.data('monthid') >= currentMonth) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });

          forecastBUInputs.map((index, item) => {
            item = $(item);
            if (item.data('monthid') >= currentMonth) {
              item.attr('disabled', false);
            } else {
              item.attr('disabled', true);
            }
          });
        }
      });
      cancelButton.on('click', () => {
        state.cdsEditing = false;

        $('#btnEditCdsResult').prop('disabled', state.cdsEditing);
        $('#btnSaveCdsResult').prop('disabled', !state.cdsEditing);
        $('#btnCancelCdsResult').prop('disabled', !state.cdsEditing);
        methods.renderData(state.originalData);
      });
      saveButton.on('click', () => {
        $.ajax({
          url: `${restfulURL}/${cdsResultAPIPathV2}`,
          type: 'PUT',
          data: {
            cdsResult: state.modifiedData.reduce((cdsArray, cdsItem) => cdsArray.concat(cdsItem.months), [])
          },
          success: (data, status, xhr) => {
            if (xhr.status === 200) {
              methods.refreshData(1, state.pagination.perPage);
            } else if (data.status == '400') {
              callFlashSlide("<font color=''>" + data.data + '</font>', 'error');
            }
          }
        });
      });
    },
    renderSearchDropdownList: (
      apiPath,
      apiData = {},
      targetNode,
      dataValueKey,
      dataLabelKey,
      stateFilterName,
      all,
      allLabel,
      triggerChange
    ) => {
      $.ajax({
        type: 'GET',
        url: `${restfulURL}/${serviceName}/${apiPath}`,
        dataType: 'json',
        data: apiData,
        success: (data, status, xhr) => {
          if (xhr.status === 200) {
            let optionTemplate = `<option value=$objectValue>$objectLabel</option>`;
            let optionsString = '';
            targetNode.empty();

            data.map(item => {
              optionsString += optionTemplate
                .replace('$objectValue', item[dataValueKey])
                .replace('$objectLabel', item[dataLabelKey]);
            });

            if (all) {
              targetNode.append(optionTemplate.replace('$objectValue', '').replace('$objectLabel', allLabel));
              state[stateFilterName] = '';
            } else {
              state[stateFilterName] = data[0][dataValueKey];
            }

            if (triggerChange) {
              methods.renderSearchDropdownList(
                'public/cds_result/org_list_v2',
                { level_id: all ? '' : data[0][dataValueKey] },
                $('#org_id'),
                'org_id',
                'org_name',
                'filterOrganization',
                !!tokenID.is_hr,
                'All Organization'
              );
            }

            targetNode.append(optionsString);
          }
        },
        error: xhr => {
          targetNode.append('<option>-</option>');
        }
      });
    },
    refreshData: (page = 1, size = 10) => {
      $.ajax({
        url: `${restfulURL}/${cdsResultAPIPathV2}`,
        type: 'GET',
        data: {
          page,
          size,
          current_appraisal_year: state.filterYear,
          month_id: state.filterMonth,
          appraisal_type_id: state.filterAppraisalType,
          level_id: state.filterAppraisalLevel,
          org_id: state.filterOrganization,
          position_id: state.filterPosition.id,
          emp_id: state.filterEmp.id
        },
        success: (data, status, xhr) => {
          if (xhr.status === 200) {
            if (data.data) {
              state.originalData = [...data.data];
              state.modifiedData = [...data.data];
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
    renderData: records => {
      let htmlTable = ``;
      const dataRowString = `
      <tr class="rowSearch" data-recordid="$cdsId" data-toggle="collapse" data-target="#collapse-$cdsId$orgId$levelId">
        <td class="expandButton text-center" style="cursor: pointer;">
          <i class="fa fa-plus" style="vertical-align: middle;"></i>
        </td>
        <td class="Search">$orgOrEmpName</td>
        <td class="Search">$cdsName</td>
        <td class="Search">$UOMName</td>
        <td class="Search">$year</td>
      </tr>
      <tr class="collapse" id="collapse-$cdsId$orgId$levelId">
        <td colspan='6' class="cds-item-collapse">
          <div class="collapse-hide table-responsive">
            <table>
              <thead>
                <tr>
                  <th style='width: 12.5%;min-width: 90px;'>เดือน</th>
                  $monthsTableHead
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style='width: 12.5%;min-width: 90px;'>ค่าของชุดข้อมูล</td>
                  $cdsValueInputsString
                </tr>
                <tr>
                  <td style='width: 12.5%;min-width: 90px;'>ค่าคาดการณ์</td>
                  $cdsForecastValueInputsString
                </tr>
                <tr>
                  <td style='width: 12.5%;min-width: 90px;'>ค่าคาดการณ์หน่วยงาน</td>
                  $cdsForecastBUInputsString
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
      `;
      records.map(item => {
        let monthsTableHead = '';
        let cdsValueInputsString = '';
        let cdsForecastValueInputsString = '';
        let cdsForecastBUInputsString = '';
        let months = [...MONTHS_ARRAY];
        months.map(month => {
          let monthItem = item.months.find(i => i.appraisal_month_no == month.id);
          monthsTableHead += `
            <th class="colHead">
              <span class='${ monthItem ? 'text-success' : 'text-primary'}'>
                ${month.label_th_short}
              </span>
              <span class='colHeadOptions'>
                <i data-trigger="focus" 
                  tabindex="0" 
                  data-content="
                    <button style='width:100%;' 
                      class='btn btn-success btn-small btn-gear cdsDetailButton' 
                      data-target='' data-backdrop='static' 
                      data-keyboard='false' data-toggle='modal'
                      data-cdsid='${item.cds_id}'
                      data-orgid='${item.org_id}'
                      data-levelid='${item.level_id}'
                      data-empid='${item.emp_id}'
                      data-monthno='${month.id}'>
                      Detail
                    </button>  
                    <button style='width:100%;'
                      class='btn btn-danger btn-small btn-gear cdsDeleteButton'
                      data-cdsid='${item.cds_id}'
                      data-orgid='${item.org_id}'
                      data-levelid='${item.level_id}'
                      data-empid='${item.emp_id}'
                      data-monthno='${month.id}'>
                      Delete
                    </button>"
                  data-placement="top" 
                  data-toggle="popover" 
                  data-html="true" 
                  class="fa fa-ellipsis-v options popover-detail-del" 
                  data-original-title="" 
                  title="">
                </i>
              </span>
            </th>`;
          cdsValueInputsString += `
          <td>
            <input type='text' 
              id="cdsValueInput-${item.cds_result_id}-${month.id}" 
              data-cds_id=${item.cds_id}
              data-cds_result_id=${item.cds_result_id}
              data-level_id=${item.level_id}
              data-org_id=${item.org_id}
              data-emp_id=${item.emp_id}
              data-monthid=${month.id}
              class="cdsValueInput colCdsData" 
              value="${monthItem ? monthItem.cds_value || '' : ''}" 
              ${state.cdsEditing ? '' : 'disabled'} />
          </td>`;
          cdsForecastValueInputsString += `
          <td>
            <input type='text' 
              id="cdsForecastValueInput-${item.cds_result_id}-${month.id}" 
              data-cds_id=${item.cds_id}
              data-cds_result_id=${item.cds_result_id}
              data-level_id=${item.level_id}
              data-org_id=${item.org_id}
              data-emp_id=${item.emp_id}
              data-monthid=${month.id}
              class="cdsForecastValueInput colCdsData" 
              value="${monthItem ? monthItem.corporate_forecast_value || '' : ''}"
              ${state.cdsEditing ? '' : 'disabled'} />
          </td>`;
          cdsForecastBUInputsString += `
            <td>
              <input type='text' 
                id="cdsForecastBUInput-${item.cds_result_id}-${month.id}" 
                data-cds_id=${item.cds_id}
                data-cds_result_id=${item.cds_result_id}
                data-level_id=${item.level_id}
                data-org_id=${item.org_id}
                data-emp_id=${item.emp_id}
                data-monthid=${month.id}
                class="cdsForecastBUInput colCdsData" 
                value="${monthItem ? monthItem.bu_forecast_value || '' : ''}" 
                ${state.cdsEditing ? '' : 'disabled'} />
            </td>`;
        });

        htmlTable += dataRowString
          .replace('$orgOrEmpName', state.filterAppraisalType == '2' ? item.emp_name : item.org_name)
          .replace('$cdsName', item.cds_name)
          .replace('$UOMName', item.uom_name)
          .replace('$year', item.year)
          .replace(/\$cdsId/g, item.cds_id)
          .replace(/\$orgId/g, item.org_id)
          .replace(/\$levelId/g, item.level_id)
          .replace(/\$empId/g, item.emp_id)
          .replace('$monthsTableHead', monthsTableHead)
          .replace('$cdsValueInputsString', cdsValueInputsString)
          .replace('$cdsForecastValueInputsString', cdsForecastValueInputsString)
          .replace('$cdsForecastBUInputsString', cdsForecastBUInputsString)
      });

      let tableBody = $('#listCdsResult');

      tableBody.empty();
      tableBody.append(htmlTable);

      let expendableColumns = $('.expandButton');

      if (expendableColumns) {
        expendableColumns.children().on('click', e => {
          e.preventDefault();
          e.stopPropagation();

          let expandIcon = $(e.target);

          let subCdsRowSelector = expandIcon
            .parent()
            .parent()
            .data('target');
          let subCdsRow = $(subCdsRowSelector)
            .children()
            .children();

          if (expandIcon.hasClass('fa-plus')) {
            expandIcon.removeClass('fa-plus').addClass('fa-minus');
            subCdsRow.removeClass('collapse-hide').addClass('collapse-show');
          } else {
            expandIcon.removeClass('fa-minus').addClass('fa-plus');
            subCdsRow.removeClass('collapse-show').addClass('collapse-hide');
          }
        });

        expendableColumns.on('click', e => {
          e.preventDefault();

          let expandIcon = $(e.target).children();

          let subCdsRowSelector = expandIcon
            .parent()
            .parent()
            .data('target');
          let subCdsRow = $(subCdsRowSelector)
            .children()
            .children();

          if (expandIcon.hasClass('fa-plus')) {
            expandIcon.removeClass('fa-plus').addClass('fa-minus');
            subCdsRow.removeClass('collapse-hide').addClass('collapse-show');
          } else {
            expandIcon.removeClass('fa-minus').addClass('fa-plus');
            subCdsRow.removeClass('collapse-show').addClass('collapse-hide');
          }
        });
      }

      let cdsValueInputs = $('.cdsValueInput');
      let forecastValueInputs = $('.cdsForecastValueInput');
      let forecastBUInputs = $('.cdsForecastBUInput');

      cdsValueInputs.off('change');
      forecastValueInputs.off('change');
      forecastBUInputs.off('change');

      cdsValueInputs.on('change', e => {
        let cdsId = e.target.dataset.cds_id;
        let orgId = e.target.dataset.org_id;
        let levelId = e.target.dataset.level_id;
        let empId = e.target.dataset.emp_id;
        let monthId = e.target.dataset.monthid;
        let newValue = e.target.value;

        state.modifiedData = state.modifiedData.map(item => {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
              if (monthIndex >= 0 && item.months[monthIndex]) {
                let oldData = item.months[monthIndex];
                item.months[monthIndex] = { ...oldData, cds_value: newValue };
              } else {
                let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                let updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  cds_value: newValue,
                  cds_id,
                  year,
                  org_id,
                  level_id,
                  position_id,
                  appraisal_type_id,
                  emp_id
                };
                item.months = [...item.months, updatedMonth];
              }
            }
          } else {
            if (item.cds_id == cdsId && item.emp_id == empId) {
              let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
              if (monthIndex >= 0 && item.months[monthIndex]) {
                let oldData = item.months[monthIndex];
                item.months[monthIndex] = { ...oldData, cds_value: newValue };
              } else {
                let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                let updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  cds_value: newValue,
                  cds_id,
                  year,
                  org_id,
                  level_id,
                  position_id,
                  appraisal_type_id,
                  emp_id
                };
                item.months = [...item.months, updatedMonth];
              }
            }
          }
          return item;
        });
      });

      forecastValueInputs.on('change', e => {
        let cdsId = e.target.dataset.cds_id;
        let orgId = e.target.dataset.org_id;
        let levelId = e.target.dataset.level_id;
        let empId = e.target.dataset.emp_id;
        let monthId = e.target.dataset.monthid;
        let newValue = e.target.value;

        state.modifiedData = state.modifiedData.map(item => {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
              if (monthIndex >= 0 && item.months[monthIndex]) {
                let oldData = item.months[monthIndex];
                item.months[monthIndex] = { ...oldData, corporate_forecast_value: newValue };
              } else {
                let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                let updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  corporate_forecast_value: newValue,
                  cds_id,
                  year,
                  org_id,
                  level_id,
                  position_id,
                  appraisal_type_id,
                  emp_id
                };
                item.months = [...item.months, updatedMonth];
              }
            }
          } else {
            if (item.cds_id == cdsId && item.emp_id == empId) {
              let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
              if (monthIndex >= 0 && item.months[monthIndex]) {
                let oldData = item.months[monthIndex];
                item.months[monthIndex] = { ...oldData, corporate_forecast_value: newValue };
              } else {
                let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                let updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  corporate_forecast_value: newValue,
                  cds_id,
                  year,
                  org_id,
                  level_id,
                  position_id,
                  appraisal_type_id,
                  emp_id
                };
                item.months = [...item.months, updatedMonth];
              }
            }
          }
          return item;
        });
      });

      forecastBUInputs.on('change', e => {
        let cdsId = e.target.dataset.cds_id;
        let orgId = e.target.dataset.org_id;
        let levelId = e.target.dataset.level_id;
        let empId = e.target.dataset.emp_id;
        let monthId = e.target.dataset.monthid;
        let newValue = e.target.value;

        state.modifiedData = state.modifiedData.map(item => {
          if (item.appraisal_type_id == 1) {
            if (item.cds_id == cdsId && item.org_id == orgId && item.level_id == levelId) {
              let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
              if (monthIndex >= 0 && item.months[monthIndex]) {
                let oldData = item.months[monthIndex];
                item.months[monthIndex] = { ...oldData, bu_forecast_value: newValue };
              } else {
                let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                let updatedMonth = {
                  cds_result_id: null,
                  appraisal_month_no: monthId,
                  appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                  bu_forecast_value: newValue,
                  cds_id,
                  year,
                  org_id,
                  level_id,
                  position_id,
                  appraisal_type_id,
                  emp_id
                };
                item.months = [...item.months, updatedMonth];
              }
            } else {
              if (item.cds_id == cdsId && item.emp_id == empId) {
                let monthIndex = item.months.findIndex(month => month.appraisal_month_no == monthId);
                if (monthIndex >= 0 && item.months[monthIndex]) {
                  let oldData = item.months[monthIndex];
                  item.months[monthIndex] = { ...oldData, bu_forecast_value: newValue };
                } else {
                  let { cds_id, year, level_id, org_id, appraisal_type_id, position_id, emp_id } = item;
                  let targetMonth = MONTHS_ARRAY.find(month => month.id == monthId);
                  let updatedMonth = {
                    cds_result_id: null,
                    appraisal_month_no: monthId,
                    appraisal_month_name: targetMonth ? targetMonth.label_en_short : 'Unknown',
                    bu_forecast_value: newValue,
                    cds_id,
                    year,
                    org_id,
                    level_id,
                    position_id,
                    appraisal_type_id,
                    emp_id
                  };
                  item.months = [...item.months, updatedMonth];
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

      let cdsItem = $('.CdsResult');

      cdsItem.off('click', '.popover-detail-del');
      cdsItem.on('click', '.popover-detail-del', () => {
        let cdsDetailButtons = $('.cdsDetailButton');
        let cdsDeleteButtons = $('.cdsDeleteButton');

        cdsDetailButtons.off('click');
        cdsDetailButtons.on('click', e => {
          let targetCdsId = e.target.dataset.cdsid;
          let targetOrgId = e.target.dataset.orgid;
          let targetLevelId = e.target.dataset.levelid;
          let targetEmpId = e.target.dataset.empid;
          let targetMonth = e.target.dataset.monthno;
          let cdsRecord = state.originalData.find(
            record =>
              record.cds_id == targetCdsId &&
              (record.appraisal_type_id == 1 ? record.org_id == targetOrgId : record.emp_id == targetEmpId) &&
              record.level_id == targetLevelId
          );

          if (cdsRecord) {
            let cdsResultRecord = cdsRecord.months.find(
              cdsResult =>
                cdsResult.appraisal_month_no == targetMonth &&
                cdsResult.cds_id == targetCdsId &&
                (cdsResult.appraisal_type_id == 1
                  ? cdsResult.org_id == targetOrgId
                  : cdsResult.emp_id == targetEmpId) &&
                cdsResult.level_id == cdsRecord.level_id
            );

            if (cdsResultRecord && cdsResultRecord.cds_result_id) {
              methods.openEditDetailModal(cdsResultRecord.cds_result_id);
            }
          }
        });

        cdsDeleteButtons.off('click');
        cdsDeleteButtons.on('click', e => {
          let targetCdsId = e.target.dataset.cdsid;
          let targetOrgId = e.target.dataset.orgid;
          let targetLevelId = e.target.dataset.levelid;
          let targetMonth = e.target.dataset.monthno;
          let cdsRecord = state.originalData.find(
            record =>
              record.cds_id == targetCdsId &&
              (record.appraisal_type_id == 1 ? record.org_id == targetOrgId : record.emp_id == targetEmpId) &&
              record.level_id == targetLevelId
          );

          if (cdsRecord) {
            let cdsResultRecord = cdsRecord.months.find(
              cdsResult =>
                cdsResult.appraisal_month_no == targetMonth &&
                cdsResult.cds_id == targetCdsId &&
                (cdsResult.appraisal_type_id == 1
                  ? cdsResult.org_id == targetOrgId
                  : cdsResult.emp_id == targetEmpId) &&
                cdsResult.level_id == cdsRecord.level_id
            );

            if (cdsResultRecord && cdsResultRecord.cds_result_id) {
              methods.openDeleteModal(cdsResultRecord.cds_result_id);
            }
          }
        });
      });
    },
    setupPagination: pagination => {
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
      $('.pagination_top,.pagination_bottom').on('page', function(event, pageNo) {
        methods.refreshData(pageNo, pagination.perPage);
      });

      $('.countPagination').off('change');
      $('.countPagination').on('change', e => {
        let currentPerPage = e.target.value;

        state.pagination = {
          ...pagination,
          perPage: currentPerPage
        };

        $('#countPaginationTop').val(currentPerPage);
        $('#countPaginationBottom').val(currentPerPage);

        methods.refreshData(1, currentPerPage);
      });
    },
    openEditDetailModal: cdsResultId => {
      const detailModal = $('#detailModal');
      state.sunEditorInstance = null;
      detailModal
        .modal({
          backdrop: setModalPopup[0],
          keyboard: setModalPopup[1]
        })
        .css({
          'margin-top': '0px'
        });

      let htmlOption = `<textarea id="datail_name" style="width: 95%" class=""></textarea>`;
      $('#sunEdit').html(htmlOption);

      let editorDetailName = SUNEDITOR.create('datail_name', {
        height: 250,
        width: '100%',
        buttonList: [
          ['undo', 'redo'],
          ['fontSize', 'formats'],
          ['bold', 'underline', 'italic', 'strike', 'removeFormat'],
          ['fontColor', 'hiliteColor'],
          ['indent', 'outdent'],
          ['align', 'line', 'list']
        ]
      });

      state.sunEditorInstance = editorDetailName;

      methods.renderCdsResultDetails(cdsResultId);

      $('#btnSaveDetail').on('click', () => {
        if (state.saveDetailAction === 'add') {
          $.ajax({
            url: `${restfulURL}/${cdsResultAPIPath}/detail/${cdsResultId}`,
            type: 'POST',
            dataType: 'json',
            data: { detail_name: editorDetailName.getContent() },
            success: function(data, status) {
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
            url: `${restfulURL}/${cdsResultAPIPath}/detail/${cdsResultId}`,
            type: 'PATCH',
            dataType: 'json',
            data: {
              detail_name: editorDetailName.getContent(),
              reason_cds_result_id: state.selectingReasonCdsResultId
            },
            success: function(data, status) {
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

      $('#btnCancelDetail').on('click', () => {
        state.sunEditorInstance.setContent('');
        state.saveDetailAction = 'add';
        state.selectingReasonCdsResultId = null;
      });
    },
    openDeleteModal: cdsResultId => {
      $('#informConfirm').empty();

      $('#confrimModal')
        .modal({
          backdrop: setModalPopup[0],
          keyboard: setModalPopup[1]
        })
        .css({ 'margin-top': '0px' });

      $(document).off('click', '#btnConfirmOK');
      $(document).on('click', '#btnConfirmOK', () => {
        $.ajax({
          url: `${restfulURL}/${cdsResultAPIPath}/${cdsResultId}`,
          type: 'DELETE',
          dataType: 'json',
          success: data => {
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
    renderCdsResultDetails: cdsResultId => {
      $.ajax({
        url: `${restfulURL}/${cdsResultAPIPath}/detail/${cdsResultId}`,
        type: 'get',
        dataType: 'json',
        success: data => {
          const detailContainer = $('#listDataDetail');
          let detailRows = '';
          let rowTemplate = `
          <tr>
            <td>$index</td>
            <td>$cds_detail_name</td>
            <td style="text-align: center;">
              <i 
                data-trigger="focus" 
                tabindex="$index" 
                data-content="
                  <button 
                    style='width:100%;' 
                    class='btn btn-warning btn-small btn-gear detailEdit' 
                    id='edit_detail-$cds_detail_id' 
                    data-recordid='$cds_detail_id'
                    data-target='' 
                    data-backdrop='$setModalPopupFunction0' 
                    data-keyboard='$setModalPopupFunction1' 
                    data-toggle='modal'>
                      $liferayEditText
                  </button>
                  <button 
                    id='delete_detail-$cds_detail_id' 
                    style='width:100%;' 
                    data-recordid='$cds_detail_id'
                    class='btn btn-danger btn-small btn-gear detailDel'
                    >
                      $liferayDeleteText
                  </button>" 
                data-placement="top" 
                data-toggle="popover" 
                data-html="true" 
                class="fa fa-cog font-gear popover-edit-del" 
                data-original-title="" title="">
              </i>
            </td>
          </tr> `;

          if (data) {
            data.map((item, index) => {
              detailRows += rowTemplate
                .replace(/\$index/g, index + 1)
                .replace(/\$cds_detail_name/g, item.reason_cds_result_name)
                .replace(/\$cds_detail_id/g, item.reason_cds_result_id)
                .replace(/\$setModalPopupFunction0/g, setModalPopup[0])
                .replace(/\$setModalPopupFunction1/g, setModalPopup[1])
                .replace(/\$liferayEditText/g, Liferay.Language.get('edit'))
                .replace(/\$liferayDeleteText/g, Liferay.Language.get('delete'));
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
          detailContainer.on('click', '.popover-edit-del', () => {
            $('.detailDel').off('click');
            $('.detailDel').on('click', e => {
              $('#informConfirm').empty();

              let id = e.target.dataset.recordid;

              $('#confrimModal')
                .modal({
                  backdrop: setModalPopup[0],
                  keyboard: setModalPopup[1]
                })
                .css({ 'margin-top': '0px' });

              $(document).off('click', '#btnConfirmOK');
              $(document).on('click', '#btnConfirmOK', () => {
                $.ajax({
                  url: `${restfulURL}/${cdsResultAPIPath}/detail/${id}`,
                  type: 'DELETE',
                  dataType: 'json',
                  success: data => {
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
            $('.detailEdit').on('click', e => {
              let id = e.target.dataset.recordid;
              $.ajax({
                url: `${restfulURL}/${cdsResultAPIPath}/detail/${cdsResultId}/${id}`,
                type: 'get',
                dataType: 'json',
                success: data => {
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

  const state = {
    filterYear: '',
    filterAppraisalType: '2',
    filterEmp: { id: '', name: '' },
    filterPosition: { id: '', name: '' },
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
