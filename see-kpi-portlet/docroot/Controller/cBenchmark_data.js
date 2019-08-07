//auto check
function generate_dropdown() {
    $('#s_yr,#s_qt,#show_nodata').empty();
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/select_list_search",
        type: "get",
        dataType: "json",
        headers: { Authorization: "Bearer " + tokenID.token },
        async: false,
        success: function(result) {
            //console.log(result)
            if (result.nodata) {
                $('#s_yr').append('<option value="" disabled="" selected>'+ Liferay.Language.get('no-year-data')+'</option>');
                $('#s_qt').append('<option value="" disabled="" selected>'+ Liferay.Language.get('no-quarter-data')+'</option>');
                $('#show_nodata').append(Liferay.Language.get('downlond-the-information-below-to-add-information'));
            } else {
                var list_year;
                list_year += '<option value="">'+ Liferay.Language.get('select-year')+'</option>';  //Liferay.Language.get('select-year')
                $.each(result.year, function(key, value) {
                    list_year +=
                        '<option value="' + value.year + '">' + value.year + '</option>';
                });
                $('#s_yr').append(list_year);

                var list_quarter;
                list_quarter += '<option value="">'+ Liferay.Language.get('select-quarter')+'</option>';  //"+Liferay.Language.get('select-quarter')+"
                $('#s_qt').append(list_quarter);
            }
        }
    });
}

$(document).ready(function() {
    var username = $('#user_portlet').val();
    var password = $('#pass_portlet').val();
    var plid = $('#plid_portlet').val();
    if (username != "" && username != null & username != [] && username != undefined) {

        if (connectionServiceFn(username, password, plid) == false) {
            return false;
        }
    }

    $(".app_url_hidden").show();
    $('.dropify').dropify();

    generate_dropdown();

    //search quarter
    $("#s_yr").change(function() {
        $('#s_qt').empty();
        var data_val = { 's_check': 'wdsdwokd@wkdo', 's_yr': $("#s_yr").val() };
        $.ajax({
            url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_quarter",
            type: "get",
            dataType: "json",
            headers: { Authorization: "Bearer " + tokenID.token },
            async: false,
            data: { "datas": JSON.stringify(data_val) },
            success: function(result) {
                //console.log(result.nodata)
                var list_quarter;
                if (result.nodata) {
                    list_quarter +=
                        '<option value="">'+Liferay.Language.get('select-quarter')+'</option>';
                } else {
                    list_quarter +=
                        '<option value="">'+Liferay.Language.get('select-quarter')+'</option>';
                    $.each(result.quarter, function(key, value) {
                        list_quarter +=
                            '<option value="' + value.quarter + '">' + value.quarter + '</option>';
                    });
                }
                $('#s_qt').append(list_quarter);
            }
        });
    });
});


function search_benchmark() {

    $('#data-benchmark').empty();
    var data_val = {
        's_check': 'Kcsodiow48',
        's_yr': $("#s_yr").val(),
        's_qt': $("#s_qt").val()
    };
    //console.log(data_val)
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/search_benchmark",
        type: "get",
        //crossDomain: true,
        dataType: "json",
        data: { "datas": JSON.stringify(data_val) },
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function(result) {
            //console.log(result)
            var trHTML;
            $.each(result, function(key, value) {
                trHTML +=
                    '<tr><td>' + value.year +
                    '</td><td>' + value.quarter +
                    '</td><td>' + value.month +
                    '</td><td>' + value.kpi_name +
                    '</td><td>' + value.company_code +
                    '</td><td>' + value.value +
                    '</td></tr>';
            });
            $('#data-benchmark').append(trHTML);
        }
    })
}

//Check Validation Edd
var validateFileFn = function(data) {
    var validateFile = "";
    $.each(data, function(index, indexEntry) {
        if (indexEntry[Object.keys(indexEntry)[0]] != undefined || indexEntry[Object.keys(indexEntry)[0]] == null) {
            if (indexEntry[Object.keys(indexEntry)[0]] == null) { //The employee code field is null
                validateFile += "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " + Object.keys(indexEntry)[0] + " : null <i class='fa fa-level-down'></i><br>";
            } else {
                validateFile += "<font color='#FFC446'><i class='fa fa-exclamation-triangle'></i></font> " + Object.keys(indexEntry)[0] + ": " + indexEntry[Object.keys(indexEntry)[0]] + " <i class='fa fa-level-down'></i><br>";
            }
            if (indexEntry['errors'] != null || indexEntry['errors'] != undefined || indexEntry['errors'] != "") {
                //validateFile+="<font color='red'>&emsp;*</font> "+indexEntry['errors']+"<br>";
                for (var key in indexEntry['errors']) {
                    if (indexEntry['errors'].hasOwnProperty(key)) {
                        validateFile += "<font color='red'>&emsp;*</font> " + indexEntry['errors'][key] + "<br>";
                    }
                }
            }
        }


    });
    callFlashSlideInModal(validateFile, "#informationFile", "error");
}

function download_benchmark() {
    var d_check = 'Swc4w8dQ88Wcd8';
    window.open(restfulURL + '/' + serviceName + '/public/benchmark_data/download_benchmark/' + d_check, "_self");
    return false;
}

$("#btn_import").click(function() {
    $('#file').val("");
    $(".btnModalClose").click();
    $(".dropify-clear").click();
    $("#btn_import").attr({
        "data-backdrop": setModalPopup[0],
        "data-keyboard": setModalPopup[1]
    });
});

var files;
// Add events
$('#file').on('change', prepareUpload2);

// Grab the files and set them to our variable
function prepareUpload2(event) {
    files = event.target.files;
}
$('form#fileImportEmployee').on('submit', uploadFiles);

// Catch the form submit and upload the files
function uploadFiles(event) {

    event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening

    // START A LOADING SPINNER HERE

    // Create a formdata object and add the files
    var data = new FormData();
    $.each(files, function(key, value) {
        data.append(key, value);
    });
    $("body").mLoading();
    $.ajax({
        url: restfulURL + '/' + serviceName + "/public/benchmark_data/import_benchmark",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        headers: { Authorization: "Bearer " + tokenID.token },
        success: function(data, textStatus, jqXHR) {

            if (data['status'] == 200 && data['errors'].length == 0) {

                callFlashSlide(Liferay.Language.get('import-employee-succesfully'));
                $("body").mLoading('hide');
                $('#ModalImport').modal('hide');
                generate_dropdown();

            } else {
                validateFileFn(data['errors']);
                $("body").mLoading('hide');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            callFlashSlide('Format Error : ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
    return false;
}

//var oFileIn;
//oFileIn = document.getElementById('file');
//if (oFileIn.addEventListener) {
//    oFileIn.addEventListener('change', filePicked, false);
//}
//
//
//function filePicked(oEvent) {
//	
//	event.stopPropagation(); // Stop stuff happening
//	event.preventDefault(); // Totally stop stuff happening
//	
//    $('#data-benchmark').empty();
//    // Get The File From The Input
//    var oFile = oEvent.target.files[0];
//    var sFilename = oFile.name;
//    // Create A File Reader HTML5
//    var reader = new FileReader();
//
//    // Ready The Event For When A File Gets Selected
//    reader.onload = function (e) {
//        var data = e.target.result;
//        var cfb = XLSX.read(data, { type: 'binary' });
//        //console.log(cfb)
//        cfb.SheetNames.forEach(function (sheetName) {
//            // Obtain The Current Row As CSV
//            //var sCSV = XLS.utils.make_csv(cfb.Sheets[sheetName]);   
//            var oJS = XLS.utils.sheet_to_json(cfb.Sheets[sheetName]);
//            //$("#ip_excel").html(sCSV);
//            console.log(oJS);
//            $('#loading').show();
//            $.ajax({
//                url: restfulURL + '/' + serviceName + "/public/benchmark_data/import_benchmark",
//                type: "post",
//                //crossDomain: true,
//                dataType: "json",
//                data: { "datas": JSON.stringify(oJS) },
//                success: function (result) {
//                    //console.log(result)
//                    var trHTML;
//                    $.each(result, function (key, value) {
//                        trHTML +=
//                            '<tr><td>' + value.year +
//                            '</td><td>' + value.quarter +
//                            '</td><td>' + value.kpi_name +
//                            '</td><td>' + value.company_code +
//                            '</td><td>' + value.value +
//                            '</td></tr>';
//                    });
//
//                    $('#loading').hide();
//                    callFlashSlide("Import Employee Successfully");
//                    $("body").mLoading('hide');
//					$('#ModalImport').modal('hide');
//                    $('#ip_confirm').addClass("fa fa-check text-success");
//                    $("#ip_confirmt").text("Import Success");
//                    $('#data-benchmark').append(trHTML);
//
//                    $('#number').show();
//                    $('#textnumber').show();
//                    var counter = 10;
//                    var interval = setInterval(function () {
//                        counter--;
//                        $("#number").html(counter);
//                        if (counter == 0) {
//                            //Do something
//                            //$("#number").html("Refresh!");
//                            // Stop the counter
//                            clearInterval(interval);
//                        }
//                    }, 1000);
//                    setTimeout(location.reload.bind(location), 10000);
//                }
//            })
//        });
//    };
//    // Tell JS To Start Reading The File.. You could delay this if desired
//    reader.readAsBinaryString(oFile);
//}