var myApp = angular.module("myApp", ['ui.router', 'angularServices'])

 	myApp.run(
      [        '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);

	//Lets define our routes
	myApp.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
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
	myApp.controller('navControl', ['$scope', '$location', '$state', function ($scope, $location, $state) {

		//$scope.$state = $state;

	}]);

	myApp.controller('homeCtrl', function ($scope, $location) {

		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);
	});

	myApp.controller('aboutCtrl', function ($scope, $location) {

		$scope.currentLocation = $location.path();
		console.log($scope.currentLocation);
	});

	// This controller populates the sidebar with data and manages the active state of each nav pill
	myApp.controller('listCtrl', function ($scope, Food, $location, $state, $stateParams, $rootScope) {

		$scope.foods = Food.query();

		function setSelectedFood(selectedFood){
			console.log("made it into setSelectedFood");
			$rootScope.food = selectedFood;
			$state.go('list.item({itemID:selectedFood.name})');
		}

	});

	// This controller populates the list item detail pane with data based on the URL parameter provided and uses it to index into 
	myApp.controller('listItemCtrl', ['$scope', '$stateParams', function ($scope, $stateParams, utils) {

     				   $scope.food = $scope.foods[$stateParams.itemID];
    }]);


