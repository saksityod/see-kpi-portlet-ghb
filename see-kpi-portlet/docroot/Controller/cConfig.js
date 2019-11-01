var restfulURL 			= "";
var restfulURL_IMPkpi 	= "";
var lifeRayApiUrl 		= "";
var serviceName			= "ghb/dev/see-kpi-service-ghb/ghb_api";
// var serviceName         = "see_api_ghb_505/see-kpi-service-ghb/ghb_api";
var serviceName_IMPkpi 	= "impexpservices_api/public";
var servicePort 		= (document.location.protocol == "https:" ? ":8443" : ":80"); // HTTP default port :80

	/*####### Web Service Server #######*/
	restfulURL = document.location.protocol + "//" + document.location.hostname + servicePort ;
	//restfulURL = document.location.protocol + "//192.168.1.64" + servicePort ;
	restfulURL_IMPkpi = document.location.protocol + "//" + document.location.hostname + servicePort ;
	
	/*####### Liferay Server #######*/
	lifeRayApiUrl= document.location.origin;
