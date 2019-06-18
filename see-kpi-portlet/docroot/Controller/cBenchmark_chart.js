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
            url:restfulURL+'/'+serviceName+"/public/benchmark_data/select_list_search_q",
            type:"get" ,
    		dataType:"json" ,
    		headers:{Authorization:"Bearer "+tokenID.token},
    		async:false,
            success:function(result) {
                //console.log(result)
                if(result.nodata) {
                    $('#s_yr').append('<option value="" disabled="" selected>ไม่มีข้อมูลปี</option>');
                    $('#s_kpi').append('<option value="" disabled="" selected>ไม่มีข้อมูล KPI</option>');
                    resizeWidth(); // resize width kpi
                }
                else {
                    var list_year;
                    list_year +='<option value="">Select Year</option>';
                    $.each(result.year, function (key,value) {
                        list_year += 
                            '<option value="'+value.year+'">' + value.year + '</option>'
                            ;
                    });
                    $('#s_yr').append(list_year);

                    var list_kpi;
                    list_kpi +='<option value="">Select KPI</option>';
                    $('#s_kpi').append(list_kpi);
                    resizeWidth(); // resize width kpi
                }
            }
        });

        //search kpi
        $("#s_yr").change(function(){
            $('#s_kpi').empty();
            var data_val = {'s_check':'wdsdwaswdokd','s_yr':$("#s_yr").val()};
            $.ajax({
                url:restfulURL+'/'+serviceName+"/public/benchmark_data/search_kpi",
                type:"get" ,
        		dataType:"json" ,
        		headers:{Authorization:"Bearer "+tokenID.token},
        		async:false,
                data:{"datas":JSON.stringify(data_val)},
                success:function(result) {
                    //console.log(result.kpi)
                    var list_kpi;
                    if(result.nodata) {
                        list_kpi +=
                            '<option value="">Select KPI</option>'
                            ;
                    }
                    else {
                        list_kpi +=
                            '<option value="">Select KPI</option>'
                            ;
                        $.each(result.kpi, function (key,value) {
                            list_kpi +=
                                '<option value="'+value.kpi_name+'">' + value.kpi_name + '</option>'
                            ;
                        });
                    }
                    $('#s_kpi').append(list_kpi);
                    resizeWidth(); // resize width kpi
                }
            });
        });
    }
});



var span_item = 3;
var resizeWidth = function () {
    $("#width_tmp_option").html($('#s_kpi option:selected').text());  

    var tmp_width = $("#width_tmp_select").width();
    var span_width = 0;
    var loop = 1;

    $("#kpiArea").removeClass("span" + span_item).addClass("span3");
    span_item = 3;

    while (loop) {
        span_width = $('#kpiArea').width();
        if (span_width >= tmp_width) {
            $('#s_kpi').width(50);
            $('#s_kpi').width($("#width_tmp_select").width());
            loop = 0;
        } else {
            $("#kpiArea").removeClass("span" + span_item).addClass("span" + (span_item + 1));
            span_item++;
            if (span_item >= 12) {
                $('#s_kpi').width(50);
                $('#s_kpi').width($("#width_tmp_select").width());
                loop = 0;
            }
        }
    }
};



            var click_year;
            var click_kpi;
            var click_quarter;

            var click_year2;
            var click_kpi2;
            var click_quarter2;


            function search_chart() {

                if($('#s_yr').val()=="") {
                    $('#s_yr').focus();
                }
                else if($("#s_kpi").val()=="") {
                    $('#s_kpi').focus();
                }
                else
                {
                    var data_val = {
                        's_check':'Kcsodwdw2iow48',
                        's_yr':$("#s_yr").val(),
                        's_kpi':$("#s_kpi").val()
                    };
                    $.ajax({
                        url:restfulURL+'/'+serviceName+"/public/benchmark_data/search_chart",
                        type:"get" ,
                		dataType:"json" ,
                		headers:{Authorization:"Bearer "+tokenID.token},
                		async:false,
                        data:{"datas":JSON.stringify(data_val)},
                        success:function(result) {
                            //console.log(result);

                            if(result.nodata_year_previos) {
                                $("#previous_chart").hide();
                            }
                            else if(result.year_previos){
                                $("#previous_chart").show();
                                click_year = result.year_previos;
                                click_kpi = result.kpi_previos;
                                click_quarter = result.quarter_previos_next;
                            }
                            
                            if(result.nodata_year_next) {
                                $("#next_chart").hide();
                            }
                            else if(result.year_next){
                                $("#next_chart").show();
                                click_year2 = result.year_next;
                                click_kpi2 = result.kpi_next;
                                click_quarter2 = result.quarter_previos_next;
                            }
                            
                            FusionCharts.ready(function(){
                                var fusioncharts = new FusionCharts({
                                    type: 'mscolumn2d',
                                    renderAt: 'chart-container',
                                    width: '100%',
                        	        height: '400',
                                    dataFormat: 'json',
                                    dataSource: {
                                        "chart": {
                                            "caption": "Cost of Fund by Quarter{br}"+result.year+" "+result.kpi,
                                            "xAxisname": "Quarter",
                                            "xAxisnameFontSize": "14",
                                            "defaultNumberScale": " %",
                                            "plotFillAlpha": "100",

                                            //Cosmetics
                                            "paletteColors": "#0E50DE,#FF9C33,#EC008C,#00A950,#23b3e8,#4F2A81,#000000",
                                            "baseFontColor": "#333333",
                                            "baseFont": "Helvetica Neue,Arial",
                                            "captionFontSize": "14",
                                            "subcaptionFontSize": "14",
                                            "subcaptionFontBold": "1",
                                            "showBorder": "0",
                                            "bgColor": "#ffffff",
                                            "showShadow": "1",
                                            "canvasBgColor": "#ffffff",
                                            "canvasBorderAlpha": "0",
                                            "divlineAlpha": "100",
                                            "divlineColor": "#999999",
                                            "divlineThickness": "1",
                                            "divLineIsDashed": "1",
                                            "divLineDashLen": "1",
                                            "divLineGapLen": "1",
                                            "usePlotGradientColor": "0",
                                            "showplotborder": "0",
                                            "valueFontSize": "14",
                                            "valueFontColor": "#ffffff",
                                            "placeValuesInside": "1",
                                            "showHoverEffect": "1",
                                            "rotateValues": "1",
                                            "showXAxisLine": "1",
                                            "xAxisLineThickness": "1",
                                            "xAxisLineColor": "#999999",
                                            "showAlternateHGridColor": "0",
                                            "legendBgAlpha": "0",
                                            "legendBorderAlpha": "0",
                                            "legendShadow": "0",
                                            "legendItemFontSize": "14",
                                            "legendItemFontColor": "#000000",
                                            "labelFontSize": "14",
                                            "useroundedges": "1",
                                        },
                                        "categories": [{
                                            "category": result.category
                                        }],
                                        "dataset": result.dataset
                                    }
                                });

                                fusioncharts.render();
                            });
                        }
                    })
                }
            }

            $("#previous_chart").click(function() {
                //console.log(click_kpi);
                $("#s_yr").val(click_year);
                $("#s_kpi").val(click_kpi);
                resizeWidth(); // resize width kpi
                search_chart();
                s_chart_q(click_quarter);
            });

            $("#next_chart").click(function() {
                //console.log(click_kpi);
                $("#s_yr").val(click_year2);
                $("#s_kpi").val(click_kpi2);
                resizeWidth(); // resize width kpi
                search_chart();
                s_chart_q(click_quarter2);
            });

            function s_chart_q(q)
            {
                var data_val = {
                    's_check':'Acdsad2iow48',
                    's_yr':$("#s_yr").val(),
                    's_kpi':$("#s_kpi").val(),
                    's_q':q
                };
                console.log(data_val);
                $.ajax({
                    url:restfulURL+'/'+serviceName+"/public/benchmark_data/search_chart_quarter",
                    type:"get" ,
            		dataType:"json" ,
            		headers:{Authorization:"Bearer "+tokenID.token},
            		async:false,
                    data:{"datas":JSON.stringify(data_val)},
                    success:function(result) {
                        //console.log(result)
                        console.log(JSON.stringify(result.categories));
                        console.log(JSON.stringify(result.dataset));
                        FusionCharts.ready(function(){
                            var fusioncharts = new FusionCharts({
                                type: 'mscolumn2d',
                                renderAt: 'chart-container2',
                                width: '100%',
                    	        height: '400',
                                dataFormat: 'json',
                                dataSource: {
                                    "chart": {
                                        "caption": "Cost of Fund Compare Previous Year{br}"+result.quarter,
                                        "xAxisname": "Bank",
                                        "xAxisnameFontSize": "14",
                                        "defaultNumberScale": " %",
                                        "plotFillAlpha": "100",

                                        //Cosmetics
                                        "paletteColors": "#CAFF70,#FFF68F,#FFA07A",
                                        "baseFontColor": "#333333",
                                        "baseFont": "Helvetica Neue,Arial",
                                        "captionFontSize": "14",
                                        "subcaptionFontSize": "14",
                                        "subcaptionFontBold": "1",
                                        "showBorder": "0",
                                        "bgColor": "#ffffff",
                                        "showShadow": "1",
                                        "canvasBgColor": "#ffffff",
                                        "canvasBorderAlpha": "0",
                                        "divlineAlpha": "100",
                                        "divlineColor": "#999999",
                                        "divlineThickness": "1",
                                        "divLineIsDashed": "1",
                                        "divLineDashLen": "1",
                                        "divLineGapLen": "1",
                                        "usePlotGradientColor": "0",
                                        "showplotborder": "0",
                                        "valueFontSize": "14",
                                        "valueFontColor": "#000000",
                                        "placeValuesInside": "1",
                                        "showHoverEffect": "1",
                                        "rotateValues": "1",
                                        "showXAxisLine": "1",
                                        "xAxisLineThickness": "1",
                                        "xAxisLineColor": "#999999",
                                        "showAlternateHGridColor": "0",
                                        "legendBgAlpha": "0",
                                        "legendBorderAlpha": "0",
                                        "legendShadow": "0",
                                        "legendItemFontSize": "14",
                                        "legendItemFontColor": "#000000",
                                        "labelFontSize": "14",
                                        "useroundedges": "1",
                                    },
                                    "categories":result.categories,
                                    "dataset": result.dataset
                                }
                            });

                            fusioncharts.render();
                        });
                    }
                })
            }