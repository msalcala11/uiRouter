var myApp = angular.module("myApp", ['ui.router'])

	//Lets define our routes
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: 'home.html'
		});
		$stateProvider.state('list', {
			url: '/list',
			templateUrl: 'list.html'
		});
		$stateProvider.state('list.item', {
			url: '/:itemID',
			templateUrl: 'list.item.html'
		});
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: 'about.html'
		});
	});

	//This controller manages navigation bar functionality
	myApp.controller('navControl', function($scope) {

			$scope.changeActive = function(linkName){
				//This function manages the active (highlighted) state of the items in the main menu bar
				$scope.homeActive = '';
				$scope.listActive = '';
				$scope.aboutActive = '';
				$scope[linkName + 'Active'] = 'active';
			}
	});

	//This controller populates the sidebar with data and manages the active state of each nav pill
	myApp.controller('listCtrl', function($scope) {

		$scope.foods = { 
			"eggs" : {
				"id": 0,
				"name": "eggs"
			},

			"oatmeal" : {
				"id": 1,
				"name": "oatmeal"
			},

			"bread" : {
				"id": 2,
				"name" : "bread"
			},

			"rice milk": {
				"id": 3,
				"name": "rice milk"
			},
			"chicken": {
				"id": 32,
				"name": "chicken"
			}
		},

		$scope.setActive = function(foodName){
			// This function is for setting the active state of the sidebar items

			// First lets define an array to store the ng-class of each list item and initialize the value of that class to 
			// an empty string
			$scope.activeArray = new Array();
			for(i = 0; i < $scope.foods.length; i++) {
				$scope.activeArray[i] = '';
			}

			// When a user clicks on a certain list item, lets dig into the array and change that list item's value to 'active'
			$scope.activeArray[$scope.foods[foodName].id] = "active";
		}
	});


	//This controller populates the list item detail pane with data based on the URL parameter provided and uses it to index into 
	//$scope.foods from listCtrl
	myApp.controller('listItemCtrl', function($scope, $stateParams) {
		$scope.selectedFood = $scope.foods[$stateParams.itemID];
	});


