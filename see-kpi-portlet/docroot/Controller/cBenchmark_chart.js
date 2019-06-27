var list_year;
var list_type;
// var list_quarter;
// var list_month;

var year;

const search_kpi = () => {
    var startYear = $("#s_yr1").val()
    var endYear = $("#s_yr2").val()
    var type = $("#s_type").val()
    // var typeValue = $("#s_type_value").val()
    if (!startYear || !endYear || !type) return
    // if (!typeValue && (type === 'Month' || type === 'Quarter')) return
    $('#s_kpi').empty();
    var data_val = { 's_check': 'wdsdwaswdokd', 's_yr1': $("#s_yr1").val(), 's_yr2': $("#s_yr2").val(), 's_type': $("#s_type").val() }//, 's_type_value': $("#s_type_value").val() || null  };
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_kpi",
        type: "get",
        dataType: "json",
        headers: { Authorization: "Bearer " + tokenID.token },
        async: false,
        data: { "datas": JSON.stringify(data_val) },
        success: function (result) {
            //console.log(result.kpi)
            var list_kpi;
            if (result.nodata) {
                list_kpi +=
                    '<option value="">Select KPI</option>'
                    ;
            }
            else {
                list_kpi +=
                    '<option value="">Select KPI</option>'
                    ;
                $.each(result.kpi, function (key, value) {
                    list_kpi +=
                        '<option value="' + value.kpi_name + '">' + value.kpi_name + '</option>'
                        ;
                });
            }
            $('#s_kpi').append(list_kpi);
        }
    });
}

$(document).ready(function () {
    var username = $('#user_portlet').val();
    var password = $('#pass_portlet').val();
    var plid = $('#plid_portlet').val();
    if (username != "" && username != null & username != [] && username != undefined) {

        if (connectionServiceFn(username, password, plid) == false) {
            return false;
        }

        $(".app_url_hidden").show();

        $.ajax({
            url: restfulURL + '/' + serviceName + "/public/benchmark_data/select_list_search_q",
            type: "get",
            dataType: "json",
            headers: { Authorization: "Bearer " + tokenID.token },
            async: false,
            success: function (result) {
                if (result.nodata) {
                    $('#s_yr1').append('<option value="" disabled="" selected>ไม่มีข้อมูลปี</option>');
                    $('#s_yr2').append('<option value="" disabled="" selected>ไม่มีข้อมูลปี</option>');
                    $('#s_type').append('<option value="" disabled="" selected>ไม่มีข้อมูล</option>');
                    // $('#s_type_value').append('<option value="" disabled="" selected>ไม่มีข้อมูล</option>');
                    $('#s_kpi').append('<option value="" disabled="" selected>ไม่มีข้อมูล KPI</option>');
                }
                else {
                    year = result.year
                    // list_year += '<option value="">Start Year</option>'; 
                    $.each(result.year, function (key, value) {
                        list_year +=
                            '<option value="' + value.year + '">' + value.year + '</option>'
                            ;
                    });
                    $('#s_yr1').append(list_year);
                    $('#s_yr2').append(list_year);

                    list_type += '<option value="">Select Type</option>';
                    $.each(result.type, (key, value) => {
                        list_type += `<option value="${value}">${value}</option>`;
                    })

                    // list_quarter += `<option value="">Select Quarter</option>`;
                    // $.each(result.quarter, (key, value) => {
                    //     list_quarter += `<option value="${value}">${value}</option>`;
                    // })

                    // list_month += `<option value="">Select Month</option>`;
                    // $.each(result.month, (key, value) => {
                    //     list_month += `<option value="${value}">${value}</option>`;
                    // })

                    $('#s_type').append(list_type);
                    // $('#s_type_value').append(`<option value="">Select Filter</option>`);

                    var list_kpi;
                    list_kpi += '<option value="">Select KPI</option>';
                    $('#s_kpi').append(list_kpi);
                }
            }
        });
        //search kpi
        $("#s_yr1").change(function () {
            let yearOptions = `<option value="">End Year</option>`
            $("#s_yr2").empty()

            year.filter(value => {
                return value.year >= $("#s_yr1").val()
            }).map(value => {
                yearOptions += `<option value="${value.year}">${value.year}</option>`
            })

            $("#s_yr2").append(yearOptions)

            search_kpi();
        });

        $("#s_yr2").change(function () {
            search_kpi();
        })

        $("#s_type").change(function () {
            // switch ($("#s_type").val()) {
            //     case 'Quarter': {
            //         $("#s_type_value").empty();
            //         $("#s_type_value").removeClass('hidden');
            //         $("#s_type_value").append(list_quarter)
            //         break;
            //     }
            //     case 'Month': {
            //         $("#s_type_value").empty();
            //         $("#s_type_value").removeClass('hidden');
            //         $("#s_type_value").append(list_month)
            //         break;
            //     }
            //     default: {
            //         $("#s_type_value").empty();
            //         $("#s_type_value").addClass('hidden');
            //     }
            // }
            search_kpi();
        })

        // $("#s_type_value").change(function () {
        //     search_kpi();
        // })
    }
});

var click_year;
var click_kpi;
var click_quarter;

var click_year2;
var click_kpi2;
var click_quarter2;

var charts2;
var chartResult;

function search_chart() {

    if (!$('#s_yr1').val()) {
        $('#s_yr1').focus();
    }
    else if (!$('#s_yr2').val()) {
        $('#s_yr2').focus();
    }
    else if (!$('#s_type').val()) {
        $('#s_type').focus();
    }
    else if (!$("#s_kpi").val()) {
        $('#s_kpi').focus();
    }
    else {
        var data_val = {
            's_check': 'Kcsodwdw2iow48',
            's_yr1': $("#s_yr1").val(),
            's_yr2': $("#s_yr2").val(),
            's_type': $("#s_type").val(),
            's_kpi': $("#s_kpi").val()
        };
        $.ajax({
            url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_chart",
            type: "get",
            dataType: "json",
            headers: { Authorization: "Bearer " + tokenID.token },
            async: false,
            data: { "datas": data_val },
            success: function (result) {
                chartResult = result

                FusionCharts.ready(function () {
                    $('#chart-container').empty()
                    chartResult.map((item, index) => {
                        $('#chart-container').append(`<div id="chartItem-${index}" style="width: 100%; max-width: 100%; padding-right: 1rem;"></div>`)
                        charts = new FusionCharts({
                            type: 'mscombi2d',
                            renderAt: `chartItem-${index}`,
                            width: '1160',
                            height: '100%',
                            chartRightMargin: '15',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "exportenabled": "0",
                                    "caption": `Cost of Fund by ${item.type}{br}${item.year} ${item.kpi}`,
                                    "xAxisname": item.type,
                                    "xAxisnameFontSize": "14",
                                    "defaultNumberScale": " %",
                                    "theme": "fusion",
                                    "palettecolors": "ff850c,00a950,003090,7a58bf,ec068d,64d3f4,663300,2F4F4F,330066,000000",
                                },
                                "categories": [{
                                    "category": item.category
                                }],
                                "dataset": item.dataset
                            },
                            events: {
                                "legendItemClicked": (event, legendItem) => {
                                    let anotherIndex = 99
                                    if (legendItem.datasetIndex < Math.floor(item.dataset.length / 2)) {
                                        anotherIndex = legendItem.datasetIndex + Math.floor(item.dataset.length / 2)
                                    } else {
                                        anotherIndex = legendItem.datasetIndex - Math.floor(item.dataset.length / 2)
                                    }

                                    item = {
                                        ...item,
                                        dataset: item.dataset.map((value, index) => {
                                            if (index === anotherIndex) {
                                                return { ...value, initiallyHidden: "1" }
                                            } else if (index === legendItem.datasetIndex) {
                                                if (value.initiallyHidden === "0")
                                                    return { ...value, initiallyHidden: "1" }
                                                else
                                                    return { ...value, initiallyHidden: "0" }
                                            } else {
                                                return { ...value }
                                            }
                                        })
                                    }

                                    chartResult = [...chartResult.slice(0, index), item, ...chartResult.slice(index+1)]

                                    window.setTimeout(() => {
                                        $(`#chartItem-${index}`).updateFusionCharts({
                                            dataSource: {
                                                "chart": {
                                                    "exportenabled": "0",
                                                    "caption": `Cost of Fund by ${item.type}{br}${item.year} ${item.kpi}`,
                                                    "xAxisname": item.type,
                                                    "xAxisnameFontSize": "14",
                                                    "defaultNumberScale": " %",
                                                    "theme": "fusion",
                                                    "palettecolors": "ff850c,00a950,003090,7a58bf,ec068d,64d3f4,663300,2F4F4F,330066,000000",
                                                },
                                                "categories": [{
                                                    category: item.category,
                                                }],
                                                "dataset": item.dataset,
                                            }
                                        })
                                    }, 0)
                                }
                            }
                        })
                        charts.render()
                        // return item
                    })
                })
            }
        })
    }
}

$("#previous_chart").click(function () {
    $("#s_yr1").val(click_year);
    $("#s_kpi").val(click_kpi);
    search_chart();
    s_chart_q(click_quarter);
});

$("#next_chart").click(function () {
    $("#s_yr1").val(click_year2);
    $("#s_kpi").val(click_kpi2);
    search_chart();
    s_chart_q(click_quarter2);
});

function s_chart_q(q) {
    var data_val = {
        's_check': 'Acdsad2iow48',
        's_yr1': $("#s_yr1").val(),
        's_kpi': $("#s_kpi").val(),
        's_q': q
    };
    // console.log(data_val);
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_chart_quarter",
        type: "get",
        dataType: "json",
        headers: { Authorization: "Bearer " + tokenID.token },
        async: false,
        data: { "datas": JSON.stringify(data_val) },
        success: function (result) {
            //console.log(result)
            // console.log(JSON.stringify(result.categories));
            // console.log(JSON.stringify(result.dataset));
            FusionCharts.ready(function () {
                var fusioncharts = new FusionCharts({
                    type: 'mscolumn2d',
                    renderAt: 'chart-container2',
                    width: '100%',
                    height: '400',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "Cost of Fund Compare Previous Year{br}" + result.quarter,
                            "xAxisname": "Bank",
                            "xAxisnameFontSize": "14",
                            "defaultNumberScale": " %",
                            "plotFillAlpha": "100",
                            "theme": "fusion",
                        },
                        "categories": result.categories,
                        "dataset": result.dataset
                    }
                });

                fusioncharts.render();
            });
        }
    })
}

function s_chart_month(q) {
    var data_val = {
        's_check': 'Acdsad2iow48',
        's_yr1': $("#s_yr1").val(),
        's_kpi': $("#s_kpi").val(),
        's_q': q
    };
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_chart_month",
        type: "get",
        dataType: "json",
        headers: { Authorization: "Bearer " + tokenID.token },
        async: false,
        data: { "datas": JSON.stringify(data_val) },
        success: function (result) {
            // console.log(result)
            FusionCharts.ready(function () {
                var fusioncharts = new FusionCharts({
                    type: 'mscolumn2d',
                    renderAt: 'chart-container4',
                    width: '100%',
                    height: '400',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "Cost of Fund By Month{br}" + result.quarter,
                            "xAxisname": "Bank",
                            "xAxisnameFontSize": "14",
                            "defaultNumberScale": " %",
                            "plotFillAlpha": "100",
                            "theme": "fusion",
                        },
                        "categories": result.categories,
                        "dataset": result.dataset
                    }
                });

                fusioncharts.render();
            });
        }
    })
}