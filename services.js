angular.module('angularServices', ['ngResource'])
	.factory('Food', function($resource){
		return $resource('/foods', {}, {'query': {method: 'GET', isArray: false}}); 
		// NOTE:{'query': {method: 'GET', isArray: false}} is included because we are sending json data as an object, not an array
	});