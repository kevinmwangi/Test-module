# Test-module
This is a test module that accepts JSON data

Clone the repo and navigate to the root directory and open the index.html file.

The main data object returns a structure that looks like this:
		
		{
			number_functional : ...,
			number_water_points : {
			communityA : ...,
			},
			community_ranking : ...
		}

The main logic is the main.js file

# To instantiate the app:

```javascript 

Intanciate the main function by a variable then parse the url provided like below:

var calculate = new waterPointService('https://raw.githubusercontent.com/onaio/ona-tech/master/data/water_points.json');


```
	

