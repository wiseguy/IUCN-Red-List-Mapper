      var ID_NO, map, extentMap, renderer, navToolbar, resizeTimer, basemapGalleryOpen, pfafstetterLevel, watershedsLayer, binomial;
      var layerDefinitions = [];
	  var basemapURL = "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer";
	  var overviewURL = "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer";
	  //var watershedURL = "http://79.125.16.106/ArcGIS/rest/services/IUCN_Secure/Watersheds/MapServer";
	  var watershedURL = "http://ags10.blueraster.net/ArcGIS/rest/services/IUCN/Watersheds/MapServer";
	  var inaturalistURL = "http://www.inaturalist.org/observations.json?has[]=photos&taxon_name=";
	  //&quality_grade=casual
	  var eolURL = "http://api.flickr.com/services/rest/?text=&group_id=806927@N20&method=flickr.photos.search&api_key=a3b295b098e05706c1137ee9b4a04adc&tag_mode=all&per_page=25&extras=description,license,date_upload,date_taken,owner_name,icon_server,original_format,last_update,geo,tags,machine_tags,o_dims,views,media,path_alias,url_sq,url_t,url_s,url_m,url_z,url_l,url_o&format=json&tags=taxonomy:binomial=";
	  var kmlUrl = "http://data.gbif.org/ws/rest/occurrence/list?format=kml&coordinatestatus=true&scientificname=";
	  var lightbox;
	  var oPhotos  = new Array();
	  var dialog, startPic;
	  var extentMapHolder;
	  var inaturalistLayer,eolLayer,gbifLayer;	  
	  
	  var smsiNat =  new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1), new dojo.Color([255,0,0]),0.25);
      var smsEOL =  new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1), new dojo.Color([0,255,0]),0.25);
      var smsGBIF =  new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1), new dojo.Color([0,0,255]),0.25);
	  //"http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer"
      //used to filter the results for an individual species