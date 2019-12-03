$(document).ready(() => {
  const apiUrl = `${restfulURL}/${serviceName}`;

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

      const yearSelector = $('#yearSelect');
      const periodSelector = $('#periodSelect');
      const orgSelector = $('#orgLevelSelect');
      const orgItems = $('#orgLevelSelectItems');
      const empSelector = $('#empLevelSelect');
      const empItems = $('#orgLevelSelectItems');
      const searchForm = $('#searchForm');

      const graphBudgetContainer = $('#graphBudget');
      const graphActualContainer = $('#graphActual');
      const graphAdjustContainer = $('#graphAdjust');

      methods.fetchDropdownData();
      methods.renderDropdownItems(yearSelector, periodSelector, orgSelector, empSelector);
      methods.applySearchListeners(yearSelector, periodSelector, orgSelector, empSelector, searchForm);
      methods.renderGraph(graphBudgetContainer, graphActualContainer, graphAdjustContainer);
    },
    fetchDropdownData: async () => {
      // TODO: FIX WHOLE METHOD!!
      let unstructuredYear = await $.ajax({
        url: `${apiUrl}/public/appraisal/year_list`,
        type: 'GET',
      });

      if (unstructuredYear) {
        state.years = unstructuredYear.map(item => {
          return {
            id: item.appraisal_year,
            name: item.appraisal_year
          };
        });

        state.filterYear = unstructuredYear[0].appraisal_year
      }

      let unstructuredPeriod = await $.ajax({
        url: `${apiUrl}/public/appraisal/period_list`,
        type: 'GET',
        data: {
          appraisal_year: state.filterYear
        }
      });

      if (unstructuredPeriod) {
        state.periods = unstructuredPeriod.map(item => {
          return {
            id: item.period_id,
            name: item.appraisal_period_desc
          };
        });
      }

      let unstructuredOrgLevel = await $.ajax({
        url: `${apiUrl}/public/appraisal/parameter/org_level`,
        type: 'GET',
      });

      if (unstructuredOrgLevel) {
        state.orgs = unstructuredOrgLevel.map(item => {
          return {
            id: item.period_id,
            name: item.appraisal_period_desc
          };
        });
      }

      let unstructuredEmpLevel = await $.ajax({
        url: `${apiUrl}/public/appraisal/parameter/emp_level`,
        type: 'GET',
      });

      if (unstructuredEmpLevel) {
        state.emps = unstructuredEmpLevel.map(item => {
          return {
            id: item.period_id,
            name: item.appraisal_period_desc
          };
        });
      }
    },
    renderDropdownItems: (container, data) => {
      let optionsHtml = '';
      let optionTemplate = `<option value="$key">$value</option>`;
      container.empty();
      data.map(item => {
        optionsHtml += optionTemplate.replace(/\$key/g, item.id).replace(/\$value/g, item.name);
      });

      container.append(optionsHtml);
    },
    renderMultiDropdownItems: (container, data) => {
      let optionsHtml = '';
      let optionTemplate = `
      <li class="option" data-value="$key">
        <span class="option-check hide"><i class="glyphicon glyphicon-ok"></i></span>
        <span class="option-text">$value</span>
      </li>
      `;

      container.empty();
      data.map(item => {
        optionsHtml += optionTemplate.replace(/\$key/g, item.id).replace(/\$value/g, item.name);
      });

      container.append(optionsHtml);
    },
    applySearchListeners: async (yearSelector, periodSelector, orgSelector, empSelector, searchForm) => {
      if (yearSelector) {
        yearSelector.on('change', e => {
          state.yearFilter = e.target.value;

          let unstructuredPeriod = await $.ajax({
            url: `${apiUrl}/public/appraisal/period_list`,
            type: 'GET',
            data: {
              appraisal_year: e.target.value
            }
          });
    
          if (unstructuredPeriod) {
            state.periods = unstructuredPeriod.map(item => {
              return {
                id: item.period_id,
                name: item.appraisal_period_desc
              };
            });
          }
        });
      }

      if (periodSelector) {
        periodSelector.on('change', e => {
          state.periodFilter = e.target.value;
        });
      }

      if (orgSelector) {
        orgSelector.next().on('click', e => {
          if (state.orgFilter.includes(+e.target.dataset.value)) {
            $(e.target).removeClass('checked');
            state.orgFilter.filter(item => item !== +e.target.dataset.value);
          } else {
            $(e.target).addClass('checked');
            state.orgFilter = [...state.orgFilter, +e.target.dataset.value];
          }

          console.log(state.orgFilter);
        });
        orgSelector.next().on('blur', () => {
          orgSelector.next().removeClass('show');
          orgSelector.next().addClass('hide');
        });
        orgSelector.on('click', e => {
          e.preventDefault();
          e.stopPropagation();

          orgSelector.next().removeClass('hide');
          orgSelector.next().addClass('show');
        });
      }

      if (empSelector) {
        empSelector.next().on('click', e => {
          if (state.empFilter.includes(+e.target.dataset.value)) {
            $(e.target).removeClass('checked');
            state.empFilter.filter(item => item !== +e.target.dataset.value);
          } else {
            $(e.target).addClass('checked');
            state.empFilter = [...state.empFilter, +e.target.dataset.value];
          }
        });
        empSelector.next().on('blur', () => {
          empSelector.next().removeClass('show');
          empSelector.next().addClass('hide');
        });
        empSelector.on('click', e => {
          e.preventDefault();
          e.stopPropagation();

          empSelector.next().removeClass('hide');
          empSelector.next().addClass('show');
        });
      }
      if (searchForm) {
        searchForm.on('submit', e => {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    },
    findPercent: data => {
      let sum = data.reduce((sum, item) => sum + item, 0);
      let result = data.reduce((result, item, index) => {
        if (item) {
          return [...result, (item / sum) * 100];
        }
        return [...result, ((data[index - 1] || 0 + data[index + 1] || 0) / sum) * 100];
      }, []);
      console.log(result);
      return result;
    },
    findMean: data => data.reduce((sum, item) => sum + item, 0) / data.length,
    findMedian: data => {
      let sorted = data.sort((a, b) => a - b);
      let middleIndex = data.length / 2;
      if (middleIndex % 1 !== 0) {
        middleIndexLow = Math.floor(middleIndex);
        middleIndexHigh = Math.ceil(middleIndex);
        middleIndex = (middleIndexLow + middleIndexHigh) / 2;
      }

      return sorted[middleIndex];
    },
    findMode: data => {
      let countedData = data.reduce((memo, item) => {
        if (!memo[item]) {
          memo[item] = 1;
        } else {
          memo[item]++;
        }
        return memo;
      }, {});

      let mode = 0;
      for (number in countedData) {
        if (countedData[number] > mode) {
          mode = countedData[number];
        }
      }

      return mode;
    },
    findRange: data => Math.max(...data) - Math.min(...data),
    findVariance: (data, mean) => {
      if (!mean) {
        mean = methods.findMean(data);
      }
      let powSum = data.reduce((sum, item) => {
        return sum + Math.pow(item - mean, 2);
      }, 0);
      return powSum / data.length;
    },
    findStandardDeviation: data => {
      return Math.pow(methods.findVariance(data), 0.5);
    },
    findPercentile: percentileIndex => {},
    makeData: (data = [], stdDivRangeCount = 3, stdDivStep = 0.5) => {
      let mean = methods.findMean(data);
      let stdDiv = methods.findStandardDeviation(data, mean) * stdDivStep;

      return Array.from(new Array(1 + stdDivRangeCount * 2), (item, index) => {
        return stdDiv * (index - stdDivRangeCount) + mean;
      });
    },
    renderGraph: (graphBudgetContainer, graphActualContainer, graphAdjustContainer) => {
      let graphBudget = null;
      let graphActual = null;
      let graphAdjust = null;
      const labels = ['C', 'B', 'B+', 'A', 'A+'];
      if (graphBudgetContainer) {
        graphBudget = new Chart(graphBudgetContainer.get()[0].getContext('2d'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Grade',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: methods.findPercent([2, 6, 14, 7, 1])
              }
            ]
          },
          options: {}
        });
      }

      if (graphActualContainer) {
        graphActual = new Chart(graphActualContainer.get()[0].getContext('2d'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Grade',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: methods.findPercent([2, 6, 14, 7, 1])
              }
            ]
          },
          options: {}
        });
      }

      if (graphAdjustContainer) {
        graphAdjust = new Chart(graphAdjustContainer.get()[0].getContext('2d'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Grade',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: methods.findPercent([2, 6, 14, 7, 1])
              }
            ]
          },
          options: {}
        });
      }
    }
  };

  const state = {
    _yearFilter: '',
    _periodFilter: '',
    _orgFilter: [],
    _empFilter: [],
    _graphBudgetData: [],
    _graphActualData: [],
    _graphAdjustData: [],
    _budgetAdjust: {},
    _records: [],
    _years: [],
    _periods: [],
    _orgs: [],
    _emps: [],

    set yearFilter(year) {
      this._yearFilter = year;
    },
    get yearFilter() {
      return this._yearFilter;
    },
    set periodFilter(period) {
      this._periodFilter = period;
    },
    get periodFilter() {
      return this._periodFilter;
    },
    set orgFilter(org) {
      this._orgFilter = org;
    },
    get orgFilter() {
      return this._orgFilter;
    },
    set empFilter(emp) {
      this._graphBudgetData = emp;
    },
    get empFilter() {
      return this._graphBudgetData;
    },
    set graphActualData(newData) {
      this._graphActualData = newData;
    },
    get graphActualData() {
      return this._graphActualData;
    },
    set graphAdjustData(newData) {
      this._graphAdjustData = newData;
    },
    get graphAdjustData() {
      return this._graphAdjustData;
    },
    set budgetAdjust(newData) {
      this._budgetAdjust = newData;
    },
    get budgetAdjust() {
      return this._budgetAdjust;
    },
    set records(newRecords) {
      this._records = newRecords;
    },
    get records() {
      return this._records;
    },
    set years(years) {
      this._years = years;

      methods.renderDropdownItems($('#yearSelect'), years);
    },
    get years() {
      return this._years;
    },
    set periods(periods) {
      this._periods = periods;

      methods.renderDropdownItems($('#periodSelect'), periods);
    },
    get periods() {
      return this._periods;
    },
    set orgs(orgs) {
      this._orgs = orgs;

      methods.renderMultiDropdownItems($('#orgLevelSelectItems'), orgs);
    },
    get orgs() {
      return this._orgs;
    },
    set emps(emps) {
      this._emps = emps;

      methods.renderMultiDropdownItems($('#empLevelSelectItems'), emps);
    },
    get emps() {
      return this._emps;
    }
  };

  console.log(methods);

  methods.pageInit();
});
