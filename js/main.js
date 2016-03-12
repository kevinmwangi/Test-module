/**
  * Main class that accepts JSON data in an array
  * Test data can be found on this url https://raw.githubusercontent.com/onaio/ona-tech/master/data/water_points.json
  * @ Author KELVIN WACHIRA <kevinnmwangi@gmail.com>
  * @ Git https://github.com/kevinmwangi/Test-module.git
**/
var waterPointService = function (url) {
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",url,false);
	Httpreq.send(null);
	
	this.jsonObj = JSON.parse(Httpreq.responseText);
	
};

/**
 * Obtain key value pairs of community from the JSON data water_points.json
 * @number_water_point 
 * @number_water_point_not_functioning 
 * @arrCommunities 
 * @arrNotFunctioning 
 * @data : data,
 * @water_functioning 
 * @numberWaterPoints 
 */

waterPointService.prototype.moduleData = function  (){
	var number_water_point = {},
		communityByWaterPoints = [],
		number_water_point_not_functioning = {}, //change
		arrCommunities = [],
		arrNotFunctioning = [],
		data = [],
		water_functioning = 0,
		numberWaterPoints = 0;

	// Getting the number of communities and communuty name from the data
	this.jsonObj.map(function(obj){ 
		var rObj = [];
		rObj.push([ obj.communities_villages  ,  obj.water_functioning ]);

		for(var i = 0; i < rObj.length; i++) {

			if (!number_water_point_not_functioning[rObj[i]])
				number_water_point_not_functioning[rObj[i]] = 0;
				++number_water_point_not_functioning[rObj[i]];
		}

	});
	var count;
	
	for(var i = 0; i < this.jsonObj.length; i++) {

		//Pushing all intances of communities_villages to arrCommunities
		arrCommunities.push([ this.jsonObj[i]['communities_villages'] ]);

		if (!number_water_point[arrCommunities[i]])
			number_water_point[arrCommunities[i]] = 0;
			count = ++number_water_point[arrCommunities[i]];
		
		// Counting the numbere of functioning water points
		if(this.jsonObj[i].water_functioning === 'yes'){
			water_functioning++
		}

	}
	
	//Using the arrCommunities to make an object 
	function communityByNumberOfWaterPoints(communityname){
		communityByWaterPoints.push({
			key: communityname,
			sortable: true,
			resizeable: true,
			value: number_water_point[communityname]
		});
		
	};
		
	for (var key in number_water_point)
		communityByNumberOfWaterPoints(key);
	
	// Calculate the percentage of broken water points for each community
	function communityRanking(communityname, numberbroken, totalbroken){
		var percentageOfBroken = ( numberbroken / totalbroken ) * 100
		var name = communityname,
			percentageOfBroken = percentageOfBroken.toFixed(2);
		
		arrNotFunctioning.push({
			key: communityname,
			sortable: true,
			resizeable: true,
			value: percentageOfBroken
		});
		
		// Sort by number of none functional water points low to high
		arrNotFunctioning.sort(function (a, b) {
			if (a.value > b.value) {
				return 1;
			}
			if (a.value < b.value) {
				return -1;
			}
			return 0;
		});
	};

	// Getting the number of broken water points per community
	for (var key in number_water_point_not_functioning) {
		if(key.includes('no')){
			var indexOf = key.indexOf(",", 1);	
			communityRanking(
				key.slice(0, indexOf),
				number_water_point_not_functioning[key].toFixed(2), 
				number_water_point[key.slice(0, indexOf)]
			);
		}
	};
	
	//pushing the main data object to array data
	data.push({
		'number_functional' : water_functioning	,
		'number_water_point': communityByWaterPoints,
		'number_water_point_not_functioning': arrNotFunctioning
	});

	return {

		communityByWaterPoints : communityByWaterPoints,
		number_water_point_not_functioning : number_water_point_not_functioning,
		arrCommunities : arrCommunities,
		arrNotFunctioning : arrNotFunctioning,
		data : data,
		water_functioning : water_functioning,
		numberWaterPoints : numberWaterPoints,
	};
};
