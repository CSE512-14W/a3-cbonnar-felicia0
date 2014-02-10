function placePhotosInPane(){
	
}
var currentFilters = {}
var currentSort = "time";
var colorCodes = {
				"breakfast":"rgb(146,128,169)",
				"lunch": "rgb(0,167,141)",
				"dinner": "rgb(252,185,37)",
				"snack": "rgb(236,51,48)",
				"beverage": "rgb(51,120,63)",
				"other": "rgb(64,10,88)"
				}

$(document).ready(function() {

	$("#photopane").css("width",'99%')
	
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
	  	sortPhotos($("#date"))
	});
	meals = Object.keys(colorCodes)
	for (m in meals){
		$("#"+meals[m]+"_color").css("background-color",colorCodes[meals[m]])
	}
});


function createPin(timestamp_eaten,imgPath, description, stars,meal,location,numPeople,date, dayOfWeek){

	if(meal ==  "undefined"){
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
	
	
	pin.css("background-color",colorCodes[meal])
	if(imgPath == null){
		imgPath = 'about:blank'
	}
	var pinImage = $("<img>").attr("src","http://"+imgPath)//.attr("title","The tooltip text #1")
	
	pinImage.attr("id","img_"+timestamp_eaten);
	
	pin.append(pinImage)//.append(pinDescription)
	
	$("#photopane").append(pin)
	
/*
	$("#photopane img[title] ").tooltip({
        effect: 'slide',
        direction: 'right',
        bounce: true,
        slideOffset: 40
    });
*/

	return pin
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
	if($(radioClicked).attr("value")!=currentSort){
	currentSort = $(radioClicked).attr("value")
		console.log(currentSort)
		var sortedDivs = $(".unsorted").find("div").toArray().sort(sorter);
			$.each(sortedDivs, function (index, value) {
			$(".unsorted").append(value);
		});	
	}
}

function sorter(a, b) {
	console.log("starting to sort: "+ currentSort)
	if(currentSort == 'stars'){
		console.log("sorting by: stars")
		console.log(b.getAttribute(currentSort) - a.getAttribute(currentSort))
		return b.getAttribute(currentSort) - a.getAttribute(currentSort);
	}
	else if(currentSort == 'dateTime'){
		console.log("sorting by: datetime")
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
		console.log("sorting by: stars")
		if(b.getAttribute(currentSort) > a.getAttribute(currentSort)){
			return -1;
		}
		else{
			return 1;
		}	}
};







/*

CSV Utils
From http://jsfiddle.net/sturtevant/AZFvQ/
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