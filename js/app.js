$(document).ready(function () {
	var rank = 0;
	var calculate = new waterPointService('https://raw.githubusercontent.com/onaio/ona-tech/master/data/water_points.json');

	for(var key in calculate.moduleData().data[0].number_water_point_not_functioning){
		rank++

		$('#tbody').append(
			"<tr>" + 
				"<td>" + calculate.moduleData().arrNotFunctioning[key].key  + "</td>" + 
				"<td>" + calculate.moduleData().data[0].number_water_point_not_functioning[key].value + '%' + "</td>" + 
				"<td>" + rank + "</td>" + 
			"</tr>");
		
	}
	
	for (var key in calculate.moduleData().data[0].number_water_point){
		
		$('#tbodywaterpoints').append(
			"<tr>" + 
				"<td>" + calculate.moduleData().data[0].number_water_point[key].key + "</td>" + 
				"<td>" + calculate.moduleData().data[0].number_water_point[key].value + "</td>" + 
			"</tr>");
	}	

	console.log(calculate.moduleData().data);
});
