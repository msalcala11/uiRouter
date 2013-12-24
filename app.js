var myApp = angular.module("myApp", ['ui.router', 'angularServices'])

	//Lets define our routes
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: 'home.html',
			controller: 'homeCtrl'
		});
		$stateProvider.state('list', {
			url: '/list',
			templateUrl: 'list.html',
			controller: 'listCtrl'
		});
		$stateProvider.state('list.item', {
			url: '/:itemID',
			templateUrl: 'list.item.html',
			controller: 'listItemCtrl'
		});
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: 'about.html',
			controller: 'aboutCtrl'
		});
	});

	//This controller manages navigation bar functionality and changes the navbar based on URL changes NOT clicks
	myApp.controller('navControl', ['$scope', '$location', function($scope, $location) {

		$scope.navList = [
			{url: "/home", title: "Home"},
			{url: "/list", title: "List"},
			{url: "/about", title: "About"}
		];

		function detectRoute() {
 			angular.forEach($scope.navList, function(item) {
 				//Look at the new url. If it matches any of the urls in navList, initialize and set that item's active attribute to true
    			item.active = $location.path().match(new RegExp(item.url)) ? true : false;
  			});  
		}

		$scope.$on('$locationChangeSuccess', detectRoute);

// This was the old bad way of handling navigation bar active by focusing on clicks as the triggering event 
// instead of URL changes
		// console.log($scope.NewRoute);
		// 	$scope.changeActive = function(linkName){
		// 		//This function manages the active (highlighted) state of the items in the main menu bar
		// 		$scope.homeActive = '';
		// 		$scope.listActive = '';
		// 		$scope.aboutActive = '';
		// 		$scope[linkName + 'Active'] = 'active';
		// 	}

	}]);

	myApp.controller('homeCtrl', function($scope, $location) {

		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);
	});

	myApp.controller('aboutCtrl', function($scope, $location) {

		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);
	});

	//This controller populates the sidebar with data and manages the active state of each nav pill
	myApp.controller('listCtrl', function($scope, Food, $location) {

		$scope.foods = Food.query();

		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);

		//This now gets sent from the server
		// $scope.foods = { 
		// 	"eggs" : {
		// 		"id": 0,
		// 		"name": "eggs"
		// 	},

		// 	"oatmeal" : {
		// 		"id": 1,
		// 		"name": "oatmeal"
		// 	},

		// 	"bread" : {
		// 		"id": 2,
		// 		"name" : "bread"
		// 	},

		// 	"rice milk": {
		// 		"id": 3,
		// 		"name": "rice milk"
		// 	},
		// 	"chicken": {
		// 		"id": 32,
		// 		"name": "chicken"
		// 	}
		// },

		function detectRoute() {
			angular.forEach($scope.foods, function(food){
				//Look at the new url. If it matches any of the urls defined in the RegExp, initialize and set that item's active attribute to true
				food.active = $location.path().match(new RegExp("/list/"+food.name)) ? true : false;
			});
		}

		$scope.$on('$locationChangeSuccess', detectRoute);

			//This was the old ineffective to change class to active because it relied on a click (not a URL change) as the trigger

	//$scope.setActive = function(foodName){
			// This function is for setting the active state of the sidebar items
			// First lets define an array to store the ng-class of each list item and initialize the value of that class to 
			// an empty string
			// $scope.activeArray = new Array();
			// for(i = 0; i < $scope.foods.length; i++) {
			// 	$scope.activeArray[i] = '';
			// }

			// // When a user clicks on a certain list item, lets dig into the array and change that list item's value to 'active'
			// $scope.activeArray[$scope.foods[foodName].id] = "active";
		//}

	});


	//This controller populates the list item detail pane with data based on the URL parameter provided and uses it to index into 
	//$scope.foods from listCtrl
	myApp.controller('listItemCtrl', function($scope, $stateParams, $location) {
		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);

		$scope.selectedFood = $scope.foods[$stateParams.itemID];
	});


