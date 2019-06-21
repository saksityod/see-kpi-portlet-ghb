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
                //console.log(result)
                if (result.nodata) {
                    $('#s_yr').append('<option value="" disabled="" selected>ไม่มีข้อมูลปี</option>');
                    $('#s_kpi').append('<option value="" disabled="" selected>ไม่มีข้อมูล KPI</option>');
                    
                }
                else {
                    var list_year;
                    list_year += '<option value="">Select Year</option>';
                    $.each(result.year, function (key, value) {
                        list_year +=
                            '<option value="' + value.year + '">' + value.year + '</option>'
                            ;
                    });
                    $('#s_yr').append(list_year);

                    var list_kpi;
                    list_kpi += '<option value="">Select KPI</option>';
                    $('#s_kpi').append(list_kpi);
                    
                }
            }
        });

        //search kpi
        $("#s_yr").change(function () {
            $('#s_kpi').empty();
            var data_val = { 's_check': 'wdsdwaswdokd', 's_yr': $("#s_yr").val() };
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
        });
    }
});

var click_year;
var click_kpi;
var click_quarter;

var click_year2;
var click_kpi2;
var click_quarter2;

var charts2;
var resultForMixed;

function search_chart() {

    if ($('#s_yr').val() == "") {
        $('#s_yr').focus();
    }
    else if ($("#s_kpi").val() == "") {
        $('#s_kpi').focus();
    }
    else {
        var data_val = {
            's_check': 'Kcsodwdw2iow48',
            's_yr': $("#s_yr").val(),
            's_kpi': $("#s_kpi").val()
        };
        $.ajax({
            url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_chart",
            type: "get",
            dataType: "json",
            headers: { Authorization: "Bearer " + tokenID.token },
            async: false,
            data: { "datas": JSON.stringify(data_val) },
            success: function (result) {
                resultForMixed = result.resultForMixed

                if (result.resultArray.nodata_year_previos) {
                    $("#previous_chart").hide();
                }
                else if (result.resultArray.year_previos) {
                    $("#previous_chart").show();
                    click_year = result.resultArray.year_previos;
                    click_kpi = result.resultArray.kpi_previos;
                    click_quarter = result.resultArray.quarter_previos_next;
                }

                if (result.resultArray.nodata_year_next) {
                    $("#next_chart").hide();
                }
                else if (result.year_next) {
                    $("#next_chart").show();
                    click_year2 = result.resultArray.year_next;
                    click_kpi2 = result.resultArray.kpi_next;
                    click_quarter2 = result.resultArray.quarter_previos_next;
                }

                FusionCharts.ready(function () {
                    var fusioncharts = new FusionCharts({
                        type: 'mscolumn2d',
                        renderAt: 'chart-container',
                        width: '100%',
                        height: '400',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "caption": "Cost of Fund by Quarter{br}" + result.resultArray.year + " " + result.resultArray.kpi,
                                "xAxisname": "Quarter",
                                "xAxisnameFontSize": "14",
                                "defaultNumberScale": " %",
                                "plotFillAlpha": "100",
                                "theme": "fusion",
                            },
                            "categories": [{
                                "category": result.resultArray.category
                            }],
                            "dataset": result.resultArray.dataset
                        }
                    });

                    fusioncharts.render();

                    charts2 = new FusionCharts({
                        type: 'mscombi2d',
                        renderAt: 'chart-container3',
                        width: '100%',
                        height: '400',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "exportenabled": "0",
                                "caption": "Cost of Fund by Quarter{br}" + result.resultForMixed.year + " " + result.resultForMixed.kpi,
                                "xAxisname": "Quarter",
                                "xAxisnameFontSize": "14",
                                "defaultNumberScale": " %",
                                "theme": "fusion",
                            },
                            "categories": [{
                                "category": result.resultForMixed.category
                            }],
                            "dataset": resultForMixed.dataset
                        },
                        events: {
                            "legendItemClicked": (event, item) => {
                                let anotherIndex = 99
                                if (item.datasetIndex < Math.floor(resultForMixed.dataset.length / 2)) {
                                    anotherIndex = item.datasetIndex + Math.floor(resultForMixed.dataset.length / 2)
                                } else {
                                    anotherIndex = item.datasetIndex - Math.floor(resultForMixed.dataset.length / 2)
                                }

                                resultForMixed = {
                                    ...resultForMixed,
                                    dataset: resultForMixed.dataset.map((value, index) => {
                                        if (index === anotherIndex) {
                                            return { ...value, initiallyHidden: "1" }
                                        } else if (index === item.datasetIndex) {
                                            if (value.initiallyHidden === "0")
                                                return {...value, initiallyHidden: "1"}
                                            else 
                                                return { ...value, initiallyHidden: "0" }
                                        } else {
                                            return { ...value }
                                        }
                                    })
                                }

                                window.setTimeout(() => {
                                    $('#chart-container3').updateFusionCharts({
                                        dataSource: {
                                            "chart": {
                                                "exportenabled": "0",
                                                "caption": "Cost of Fund by Quarter{br}" + resultForMixed.year + " " + resultForMixed.kpi,
                                                "xAxisname": "Quarter",
                                                "xAxisnameFontSize": "14",
                                                "defaultNumberScale": " %",
                                                "theme": "fusion",
                                            },
                                            "categories": [{
                                                category: resultForMixed.category,
                                            }],
                                            "dataset": resultForMixed.dataset,
                                        }
                                    })
                                }, 0)
                            }
                        }
                    });
                    charts2.render();
                });
            }
        })
    }
}

$("#previous_chart").click(function() {
    //console.log(click_kpi);
    $("#s_yr").val(click_year);
    $("#s_kpi").val(click_kpi);

    search_chart();
    s_chart_q(click_quarter);
});

$("#next_chart").click(function() {
    //console.log(click_kpi);
    $("#s_yr").val(click_year2);
    $("#s_kpi").val(click_kpi2);

    search_chart();
    s_chart_q(click_quarter2);
});

function s_chart_q(q) {
    var data_val = {
        's_check': 'Acdsad2iow48',
        's_yr': $("#s_yr").val(),
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
        's_yr': $("#s_yr").val(),
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