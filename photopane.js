function placePhotosInPane(){
	
}
var currentFilters = {}
var currentSort = "time";

$(document).ready(function() {
	$("#photopane").css("height",400)
	$("#photopane").css("width",'100%')
	
	$.get('/part15.csv', function(data) {
	  	foodPhotoData = JSON.parse(CSV2JSON(data));
	  	
	  	for(foodPhoto in foodPhotoData){
	  		var f = foodPhotoData[foodPhoto];
	  		var imgPath = f.photoPath
	  		var date = f.DateTime
	  		var dayOfWeek = f.dayOfWeek
	  		var description = f.description
	  		var meal = f.mealType
	  		var location = f.placeType
	  		var timestamp_eaten = f.timestamp_eaten
	  		var starRating = f.starRating
	  		var dayOfWeek = f.DayOfWeek
	  		var numPeople = f.social_howmany
	  		createPin(timestamp_eaten,imgPath,description, starRating, meal,location,numPeople,date,dayOfWeek)
	  	}
	});
});


function createPin(timestamp_eaten,imgPath, description, stars,meal,location,numPeople,date, dayOfWeek){

	if(meal ==  undefined){
		console.log("MEAL OTHER \n")
		meal = "other"
	}
	var pin = $("<div>").attr("class","pin")
						.attr("id","pin_"+timestamp_eaten)
						.attr("meal",meal)
						.attr("location",location.toLowerCase())
						.attr("stars",stars)
						.attr("dayOfWeek",dayOfWeek.toLowerCase())
						.attr("dateTime",date)
						.attr("description",description)
						.attr("numPeople",numPeople)
						.attr("timestamp_eaten",timestamp_eaten)
	
	if(meal == "breakfast"){
		pin.css("background-color","purple")
	}
	else if(meal == "dinner"){
		pin.css("background-color","red")
	}
	else if(meal == "snack"){
		pin.css("background-color","green")
	}
	else if(meal == "dinner"){
		pin.css("background-color","blue")
	}
	else if(meal == "beverage"){
		pin.css("background-color","orange")
	}
	else if(meal == "other"){
		pin.css("background-color","pink")
	}
	else if(meal == "lunch"){
		pin.css("background-color","yellow")
	}
		
	if(imgPath == null){
		imgPath = 'about:blank'
	}
	var pinImage = $("<img>").attr("src","http://"+imgPath)
	$(".pin").mouseover(function(){showImageTooltip($(this))})
	
	//pinTooltip = $("<a>").attr("id","ltip")
	//pinTooltip.append(pinImage)
	//var pinDescription = $("<p>").html(description)
	
	pin.append(pinImage)//.append(pinDescription)
	//pin.append('');
	//<div class = "tooltip_photo" id="tooltip_'+timestamp_eaten+' timestampe_eaten="'+timestamp_eaten+'">hello</div>
	
	pin.hover(function(){
		console.log($(this).attr("timestamp_eaten"))
    	$("#tooltip").show().animate({width:"75px"},0) //Show tooltip
			}, function() {
        $("#tooltip").hide().animate({width:"0"},0) //Hide tooltip
    })
    
    pin.mousemove(function(e){
    	var newLeft = (this).offsetLeft + $(this).width()+5
		var newTop = (this).offsetTop //+ $(this).height()
   	 
		//$("#tooltip").css({left:newLeft, top:newTop, width:$(this).width(), height:$(this).height(),backgroundColor:"red"});
		$("#tooltip").css({left:e.pageX-25, top:e.pageY-100});
		$("#tooltip").html("description " + $(this).attr("description"))
   	 //$("#tooltip").css({left:e.pageX-120, top:e.pageY-80});
	});
	
	
	
	//pin.append('<a id="ltip"+ href="#" title="">image of 1 Maple St.</a>');
	$("#photopane").append(pin)
	//$("#pin_"+timestamp_eaten+"#ltip").tooltip({ content: '<img src="http://icdn.pro/images/fr/a/v/avatar-barbe-brun-homme-utilisateur-icone-9665-128.png" />' }); 
	
	
	
	$("#pin_"+timestamp_eaten +" #ltip").tooltip({ content: '<img src="http://icdn.pro/images/fr/a/v/avatar-barbe-brun-homme-utilisateur-icone-9665-128.png" />' });
	return pin
}


function showImageTooltip(thePin){
	//console.log("tooltippy",thePin);


}

function filterPhotos(json){
	console.log("FILTER JSON "+json)
	var filters = Object.keys(json)
	var filterString = ""
	for(f in filters){
		var value = json[filters[f]]
		filterString = filterString + "["+filters[f]+"='"+value+"']"
		currentFilters=(json)
		//console.log($(".pin["+filters[f]+"='"+value+"']"))
	}
	$(".pin").each(function(index){
		$(this).hide()
	})
	console.log("FILTER STRING IS: "+filterString)
	$(".pin"+filterString).each(function(index){
		$(this).show()
	})
}








function sortPhotos(radioClicked){
	console.log("click")
	console.log(radioClicked)
	currentSort = $(radioClicked).attr("value")
	console.log(currentSort)
	var sortedDivs = $(".unsorted").find("div").toArray().sort(sorter);
		$.each(sortedDivs, function (index, value) {
		$(".unsorted").append(value);
	});
	
	//sortByData('rating',"descending");	
}

function sorter(a, b) {
	if(currentSort == 'stars'){
		console.log(b.getAttribute(currentSort) - a.getAttribute(currentSort))
		return b.getAttribute(currentSort) - a.getAttribute(currentSort);
	}
	else if(currentSort == 'dateTime'){
		console.log("datetime")
		console.log("b"+b.getAttribute(currentSort))
		console.log("a"+a.getAttribute(currentSort))
		console.log(b.getAttribute(currentSort) > a.getAttribute(currentSort))
		if(new Date(b.getAttribute(currentSort)) > new Date(a.getAttribute(currentSort))){
			return -1;
		}
		else{
			return 1;
		}
	}
	else if(currentSort == 'meal'){
		if(b.getAttribute(currentSort) > a.getAttribute(currentSort)){
			return -1;
		}
		else{
			return 1;
		}	}
};




function sortByData(sortBy,order){

	if(sortBy == 'rating' && currentSort!='rating'){
		var allImages=[]
		
		$(".pin").each(function(){
			allImages.push($(this))
		})
		/*
		if(order == 'descending'){
			allImages = allImages.sort(function(a,b){return a.attr('starRating') - b.attr('starRating')})

			for (var i = 0; i < allImages.length; i++) {
				var self = $(allImages[i]);
				self.detach();
				$("#photopane").prepend(self);
			}
		}
		else{
			allImages = allImages.sort(function(a,b){return b.attr('starRating') - a.attr('starRating')})

			for (var i = 0; i < allImages.length; i++) {
				var self = $(allImages[i]);
				self.detach();
				$("#photopane").prepend(self);
			}
		}
		*/
		$('div.pin').sort(function(a,b){
			var contentA =parseInt( $(a).attr('stars'));
			var contentB =parseInt( $(b).attr('stars'));
			return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
		})
	}
	/*
	else if(sortBy == 'time'){
		if($("#timeButton").attr('sortBy')=='desc'){
			$("#timeButton").attr('sortBy','asc')
			$("#timeButton").css('background-color','rgb(66, 194, 90)')
			$("#timeButton").html('Time &#x25B2;');
			$("#timeButton").css('height','20px');
			order = 'ascending';
			currentSortby ='timeAsc'
		}
		else if($("#timeButton").attr('sortBy')=='asc'){
			$("#timeButton").attr('sortBy','desc')
			$("#timeButton").css('background-color','rgb(66, 194, 90)')
			$("#timeButton").html('Time &#x25BC;');
			order = 'descending';
			currentSortby ='timeDesc'
		}
		else if($("#timeButton").attr('sortBy')=='none'){
			$("#timeButton").attr('sortBy','desc')
			$("#timeButton").css('background-color','rgb(66, 194, 90)')
			$("#timeButton").html('Time &#x25BC;');
			
			$("#completenessButton").css('background-color','')
			$("#ratingButton").css('background-color','')
			
			$("#completenessButton").html('Completeness')
			$("#ratingButton").html('Rating')
			
			$("#completenessButton").attr('sortBy','none')
			$("#ratingButton").attr('sortBy','none')
			
			
			order = 'descending';
			currentSortby ='timeDesc'
		}
		
		
		 
		var allImages=[]
		
		$(".mealDiv").each(function(){
			allImages.push($(this))
		})
		
		if(order == 'descending'){
			allImages = allImages.sort(function(a,b){return a.attr('timestamp') - b.attr('timestamp')})

			for (var i = 0; i < allImages.length; i++) {
				var self = $(allImages[i]);
				self.detach();
				$("#food_photos_table").prepend(self);
			}
		}
		else{
			allImages = allImages.sort(function(a,b){return b.attr('timestamp') - a.attr('timestamp')})

			for (var i = 0; i < allImages.length; i++) {
				var self = $(allImages[i]);
				self.detach();
				$("#food_photos_table").prepend(self);
			}
		}
		
	}
	*/
	
}








/*

CSV Utils

*/
function CSV2JSON(csv) {
    var array = CSVToArray(csv);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    var json = JSON.stringify(objArray);
    var str = json.replace(/},/g, "},\r\n");

    return str;
}

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}