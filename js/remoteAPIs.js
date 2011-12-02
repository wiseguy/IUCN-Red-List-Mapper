//iNaturalist Stuff


function getInaturalistInfo(results) {
results = results.toLowerCase();
results = results.slice(0,1).toUpperCase() + results.slice(1);

console.log(results);
console.log("getInaturalistInfo");
		var requestHandle = esri.request({
          url : inaturalistURL + results,
          load: requestSucceededINat,
          error: requestFailed
        }, {useProxy: false});

      }
        
		//inaturalist
 function requestSucceededINat(jsonresponse, io) {
        //loop through the items and add to the feature layer

	//var inaturalistLayer;
	inaturalistLayer = new esri.layers.GraphicsLayer({id:"inaturalistLayer"});
	
		var template = new esri.InfoTemplate();        
        template.setTitle("<b>${place_guess}</b>");
        template.setContent(getWindowContentInaturalist);
	
	
	//var sms = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setColor(new dojo.Color([255,0,0,0.5]));
	//var pms = new esri.symbol.PictureMarkerSymbol('images/inature.png', 30, 30);


	for (k = 0; k < jsonresponse.length; ++k) 
		{
		if ((parseFloat(jsonresponse[k].longitude) != 0.0) && (parseFloat(jsonresponse[k].latitude) != 0.0))
			{
		var location = new esri.geometry.Point(jsonresponse[k].longitude, jsonresponse[k].latitude, new esri.SpatialReference({ wkid: 4326 }));		
		var geom = esri.geometry.geographicToWebMercator(location);
		var graphic = new esri.Graphic(geom,smsiNat,jsonresponse[k],template);
		
		inaturalistLayer.add(graphic);		
			}
	}
	
	map.addLayer(inaturalistLayer);
	}
	
	function requestFailed(error) {
        console.log('failed');
      }
	  

	  
	  function getWindowContentInaturalist(graphic) {
        //make a tab container
        var tc = new dijit.layout.TabContainer({
         style:"width:100%;height:100%;"
        }, dojo.create("div"));
       
        //display attribute information
        var cp1 = new dijit.layout.ContentPane({
          title: "Info",
          content: graphic.attributes.description + "<br /><br />Observed on " + graphic.attributes.observed_on_string
        });
        tc.addChild(cp1);
       
	
		//var photoID = oPhotos.push(graphic.attributes.photos);
		var groupName = graphic.attributes.latitude.toString() + graphic.attributes.longitude.toString();
		if (!oPhotos[groupName]){
		oPhotos[groupName] = graphic.attributes.photos;
		}
		
		var imgContent = "";
		for (var i=0; i < graphic.attributes.photos.length ; i++){
		imgContent += "<img src='" + graphic.attributes.photos[i].square_url + "' onClick=\"loadLightBoxImages('"+ groupName +"','iNaturalist')\"/>&nbsp;"	
		}
		
		
        var cp2 = new dijit.layout.ContentPane({
          title: "Pictures",
		  content: imgContent
        });
		

		console.log(cp2.content);
        tc.addChild(cp2);


        return tc.domNode;
      }
	  
	 function loadLightBoxImages(groupName,apitype){
	//iNaturalist lightbox
	if (apitype==="iNaturalist"){
	dialog = new dojox.image.LightboxDialog({ closable: true, modal: true, group: groupName });
	
	dialog.startup();
	
	for (var i=0; i < oPhotos[groupName].length ; i++){
		if (oPhotos[groupName].length === 1) 
		{
		startPic = oPhotos[groupName][i].medium_url;
		setTimeout(function(){
			dialog.show({title:"pictures",href:startPic } );
			},200);
		} 	
			else
		{		
			if ((oPhotos[groupName].length-1) === i) 
			{		
			startPic = oPhotos[groupName][0].medium_url;			
			dialog.addImage({ title:"pictures", href:oPhotos[groupName][i].medium_url }, groupName);
			setTimeout(function(){
			dialog.show({ group:groupName, href:startPic } );
			},200);			
			} else
			{
			dialog.addImage({ title:"pictures", href:oPhotos[groupName][i].medium_url }, groupName);
			}
	
		}
	}	  
	
					}
//EOL lightbox					
 if (apitype==="EOL"){
	dialog = new dojox.image.LightboxDialog({ closable: true, modal: true, group: groupName }); 
	dialog.startup();
	startPic = groupName;
		setTimeout(function(){
			dialog.show({title:"pictures",href:startPic } );
			},200);
	//dialog.show({ title:"picture", href:groupName } );
} 
	
	}

	
	//////////////////Flickr Stuff
	
	
function getEOLflikrInfo(results) {
results = results.toLowerCase();
results = results.slice(0,1).toUpperCase() + results.slice(1);
console.log("getEOLflikrInfo");
console.log(results);
 var requestHandle = esri.request({
          url:eolURL + results,
          callbackParamName: "jsoncallback",
          load: requestSucceededEOL,
          error: requestFailed
        }, {
          useProxy: true
        });

      }	  
	  
	  
	        function requestSucceededEOL(jsonresponse, io) {
        //loop through the items and add to the feature layer
console.log("requestSucceededEOL");
var eolPhotos = jsonresponse.photos.photo;
//var eolLayer;
eolLayer = new esri.layers.GraphicsLayer({id:"eolLayer"});
	
		var template = new esri.InfoTemplate();        
        template.setTitle("<b>${ownername}</b>");
        template.setContent(getWindowContentEOL);
	
	
	//var sms = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setColor(new dojo.Color([255,0,0,0.5]));
	//var pms = new esri.symbol.PictureMarkerSymbol('images/eol.png', 30, 30);

	for (k = 0; k < eolPhotos.length; ++k) 
		{
		if ((parseFloat(eolPhotos[k].longitude) != 0.0) && (parseFloat(eolPhotos[k].latitude) != 0.0)){
		var location = new esri.geometry.Point(eolPhotos[k].longitude, eolPhotos[k].latitude, new esri.SpatialReference({ wkid: 4326 }));		
		var geom = esri.geometry.geographicToWebMercator(location);
		var graphic = new esri.Graphic(geom,smsEOL,eolPhotos[k],template);
		
		eolLayer.add(graphic);		
			}
	}
//alert(tnPhotoIDs.toString());
  map.addLayer(eolLayer);
      }
	  
	  
	   function getWindowContentEOL(graphic) {
        //make a tab container
        var tc = new dijit.layout.TabContainer({
         style:"width:100%;height:100%;"
        }, dojo.create("div"));
       
        //display attribute information
        var cp1 = new dijit.layout.ContentPane({
          title: "Info",
          content: graphic.attributes.title 
        });
        tc.addChild(cp1);
       
		var imgContent = "";
		imgContent += "<img src='" + graphic.attributes.url_sq + "' onClick=\"loadLightBoxImages('"+ graphic.attributes.url_m +"','EOL')\"/>&nbsp;"	
	
        var cp2 = new dijit.layout.ContentPane({
          title: "Picture",
		  content: imgContent
        });		

		console.log(cp2.content);
        tc.addChild(cp2);


        return tc.domNode;
      }
	  

	  function getGBIF(results) {
	results = results.toLowerCase();
	results = results.slice(0,1).toUpperCase() + results.slice(1);
	console.log(results);
	console.log("getGBIF");
	
		var requestHandle = esri.request({
          url : kmlUrl + results,
          load: requestSucceededGBIF,
		  handleAs: "xml",
          error: requestFailed
        }, {useProxy: false});

      }
	
	  function requestSucceededGBIF(kmlresponse, io) {
        //loop through the items and add to the feature layer
		console.log(kmlresponse);
		gbifLayer = new esri.layers.GraphicsLayer({id:"gbiftLayer"});
		//var pms = new esri.symbol.PictureMarkerSymbol('images/gbif.png', 30, 30);
		
		var template = new esri.InfoTemplate();        
        template.setTitle("<b>${title}</b>");
        template.setContent(getWindowContentGBIF);
		
		dojo.query("Placemark", kmlresponse).forEach(function(node, index, nodeList) {
			console.log(node.firstChild.nodeValue);
			//var coord = node.firstChild.nodeValue.split(",");
			var coord = node.lastElementChild.firstChild.nextSibling.firstChild.nodeValue.split(",");
			
			if ((parseFloat(coord[0]) != 0.0) && (parseFloat(coord[1]) != 0.0))
				{
			var location = new esri.geometry.Point(coord[0], coord[1], new esri.SpatialReference({ wkid: 4326 }));		
			var geom = esri.geometry.geographicToWebMercator(location);
			//,{"title": node.children[0].firstChild.nodeValue,"description": node.children[1].firstChild.nodeValue},template
			
			var graphic = new esri.Graphic(geom,smsGBIF,{"title": node.firstElementChild.firstChild.nodeValue,"description": node.firstElementChild.nextElementSibling.firstChild.nodeValue},template);
			
			gbifLayer.add(graphic);	
				}
			});
		
		map.addLayer(gbifLayer);
}
	
	   function getWindowContentGBIF(graphic) {
        //make a tab container
        var tc = new dijit.layout.TabContainer({
         style:"width:100%;height:100%;"
        }, dojo.create("div"));
       
        //display attribute information
        var cp1 = new dijit.layout.ContentPane({
          title: "Info",
          content: graphic.attributes.description 
        });
        tc.addChild(cp1);
		
        return tc.domNode;
      }
	