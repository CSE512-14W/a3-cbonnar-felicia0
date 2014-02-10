var margin = {top: 40, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    
var places = [
	{name: "Home", rating: 3.71, photos: 108}, 
	{name: "Other", rating: 3.25, photos: 83}, 
	{name:"Restaurant", rating: 3.60, photos: 81}, 
	{name: "Work", rating: 3.21, photos: 131}];
		
var days = [
	{name: "Monday", rating: 2.74, photos: 68},
	{name: "Tuesday", rating: 3.10, photos: 61},
	{name: "Wednesday", rating: 3.45, photos: 53},
	{name: "Thursday", rating: 3.52, photos: 63},
	{name: "Friday", rating: 3.47, photos: 77 },
	{name: "Saturday", rating: 3.15, photos: 47},
	{name: "Sunday", rating: 3.24, photos: 58}
];
	
var people = [
	{name: "0", rating: 3.20, photos: 176},
	{name: "1-3", rating: 3.60, photos: 156},
	{name: "4-6", rating: 3.49, photos: 33 },
	{name: "7+", rating: 3.89, photos: 26}
];
	
window.onload = function() {
		
	construct_Graph();

};

function construct_Graph() {

	var graph = places;
	removeExisting();
	if(document.getElementById('place_eaten').checked) {
    	
    } else if(document.getElementById('day_of_week').checked) {
		graph = days;
	} else if(document.getElementById('people_with').checked) {
		graph = people;
	}
	
	var yAxisLabel = "Star Rating";
	var yRange = 5;
	if(document.getElementById('num_photos').checked) {
	  yAxisLabel = "Number of Photos";
	  yRange = Math.max.apply(Math,graph.map(function(o){return o.photos;})) + 10;
	} 
	
	var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .3);

	var y = d3.scale.linear()
    	.range([height, 0]);

	var xAxis = d3.svg.axis()
   	 	.scale(x)
   	 	.orient("bottom");

   	var yAxis = d3.svg.axis()
    	.scale(y)
		.orient("left")
	
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {return "<strong>Average Rating: </strong> <span style='color:red'>" + d.rating + "</span></br><strong>Number of Photos: </strong><span style='color:red'>" + d.photos + "</span>";})

	var svg = d3.select("#barchart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);



  x.domain(graph.map(function(d) { return d.name;}));
  y.domain([0, yRange]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
	 .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yAxisLabel);
  
  if(document.getElementById('star_ratings').checked) { 
	  svg.selectAll(".bar")
      	.data(graph)
	  .enter().append("rect")
	  	.attr("class", "bar")
	  	.attr("x", function(d) { return x(d.name); })
	  	.attr("width", x.rangeBand())
	  	.attr("y", function(d) { return y(d.rating); })
	  	.attr("height", function(d) { return height - y(d.rating); })
	  	.on('mouseover', tip.show)
     	.on('mouseout', tip.hide)
	 	.on('click', function(d,i){selectBar(d,i,$(this))})
	  } else {
	  
	  svg.selectAll(".bar")
      	.data(graph)
	  .enter().append("rect")
	  	.attr("class", "bar")
	  	.attr("x", function(d) { return x(d.name); })
	  	.attr("width", x.rangeBand())
	  	.attr("y", function(d) { return y(d.photos); })
	  	.attr("height", function(d) { return height - y(d.photos); })
	  	.on('mouseover', tip.show)
     	.on('mouseout', tip.hide)
	 	.on('click', function(d,i){selectBar(d,i,$(this))})
		  
	}
};

function removeExisting() {
	var svg = d3.select("svg")
				.remove()
	unselectBar()
};

function selectBar(d,i,selectedBar) {
	var filterJson = {}
	var checkedDimension = $("input:radio[name=dimension]:checked").attr("axisType");

	//couldn't figure out how to add a class, so I changed the fill color of all bars
	if(selectedBar.attr("style")=="fill:steelblue" ||selectedBar.attr("style")==undefined ){
		$(".bar").each(function(i){
			$(this).attr("style","fill:steelblue")
		})
		selectedBar.attr("style","fill:brown");
		filterJson[checkedDimension] = d.name.toLowerCase()
		filterPhotos(filterJson)
	}
	else{
		filterPhotos({})
		selectedBar.attr("style","fill:steelblue");
	}
	
	var filters = Object.keys(currentFilters)
	var filterString = "";
	for(f in filters){
		var categoryType = filters[f];
		if(categoryType == "numPeople"){
			categoryType = "People in Group: ";
		} else if(categoryType == "location") {
			categoryType = "Location: ";
		} else if(categoryType == "dayOfWeek") {
			categoryType = "Day of Week: ";
		}
		
		filterString = categoryType + currentFilters[filters[f]].charAt(0).toUpperCase() + currentFilters[filters[f]].slice(1) + "<br>" + filterString
	}
	
	$('#filters').html("<b>Filter:</b> <br>" + filterString)
};

function unselectBar() {
	$(".bar").each(function(i){
		$(this).attr("style","fill:steelblue")
	})
	currentFilters={}
	filterPhotos({})
	$('#filters').html("<b>Filter:</b>")
}

function show_Tips() {
	if(document.getElementById('tip1').style.display == 'none') {
		document.getElementById('tip1').style.display = 'block';
		document.getElementById('tip2').style.display = 'block';
	}
	else {
		document.getElementById('tip1').style.display = 'none';
		document.getElementById('tip2').style.display = 'none';
	}
}


//Stuff I did to try and dynamically average... almost works...
/*
  var placeTypes = data.map(function(d) { return d.placeType;});
  var starRatings = data.map(function(d) {return parseInt(d.starRating);});
  var tab1 = dv.table([
  	{name:"place", ratings:placeTypes, type:dv.type.nominal},
  	{name:"rating", ratings:starRatings, type:dv.type.numeric}
  ]);
  
  //console.log(tab1);
  var filtered_table = tab1.where(function(table, row) {return table.get("rating", row) != 0;});

  console.log(filtered_table);
	
  var tab2 = dv.table([
  	{name:"place", ratings:filtered_table["place"], type:dv.type.nominal},
  	{name:"rating", ratings:filtered_table["rating"], type:dv.type.numeric}
  ]);

    var groups = tab2.query({dims:[0], vals:[dv.avg(1)], code: true});

  console.log(groups);
*/


