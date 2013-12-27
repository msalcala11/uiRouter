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
        $rootScope.lastListItem;
      }]);

	//Lets define our routes
	myApp.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: '/angularTemplates/home.html'
		});
		$stateProvider.state('list', {
			url: '/list',
			templateUrl: '/angularTemplates/list.html',
			controller: 'listCtrl'
		});
		$stateProvider.state('list.show', {
			url: '/show/:itemID',
			templateUrl: '/angularTemplates/list.show.html',
			controller: 'listItemCtrl'
		});
		$stateProvider.state('list.edit', {
			url: '/edit/:itemID',
			templateUrl: 'list.edit.html',
			controller: 'listEditCtrl'
		});
		$stateProvider.state('list.new', {
			url: '/new',
			templateUrl: 'list.new.html',
			controller: 'listNewCtrl'
		});
		$stateProvider.state('about', {
			url: '/about',
			templateUrl: 'about.html'
		});
	});

	// This controller populates the sidebar with data
	myApp.controller('listCtrl', function ($scope, Food) {
		$scope.foods = Food.query();
	});

	myApp.controller('listNewCtrl', function ($scope, Food, $location) {
		//lets initialize a placeholder object
		//note, the reason we must do this is because we are not using numeric indexing. This is bad. Use numeric indexing
		$scope.foods['New Food'] = 
			{
				"id": 457,
				"name": "new food"
			}

		$scope.saveFood = function(){
			//lets initialize a string that we can append to the new route after saving
			var newName = $scope.foods['New Food'].name;

			//lets create a new object so that we can id it with the newly typed name
			$scope.foods[$scope.foods['New Food'].name] = $scope.foods['New Food'];
			//lets delete the placeholder object;
			delete $scope.foods['New Food'];
			//lets save our foods object back to the server
			Food.save($scope.foods);
			//lets reroute the user to the newly created food profile
			$location.path('/list/show/' + newName);
		}

	});

	myApp.controller('listEditCtrl', function ($scope, Food, $location, $stateParams) {
	
	//Lets grab both the foods object and the spedific food and generate a placeholder. We only need
	//to use a placeholder because we are using non-numeric object ids, which is not good.
	//Using numeric object ids would allow us to simply grab the selected food from the server, change
	//the name property and save it right back to the server - 3 lines of code. Lesson: USE NUMERIC IDs
		$scope.myFoodSearch = Food.query(function(response) {
			$scope.foods = response;
			angular.forEach(response, function(item){
				if(item.name == $stateParams.itemID){
					$scope.foods['Placeholder Food'] = {
						id: item.id,
						name: item.name
					};

					//set the parent scope food to the placeholder food so the sidebar updates as the user types a new name
					$scope.$parent.foods[$stateParams.itemID] = $scope.foods['Placeholder Food'];
				}
			});
		});


		$scope.updateFood = function(){
			//lets initialize a string that we can append to the new route after saving
			var newName = $scope.foods['Placeholder Food'].name;

			//lets create a new object so that we can id it with the newly typed name
			$scope.foods[$scope.foods['Placeholder Food'].name] = $scope.foods['Placeholder Food'];
			//lets delete the placeholder object;
			delete $scope.foods['Placeholder Food'];
			delete $scope.foods[$stateParams.itemID];
			//lets save our foods object back to the server
			Food.save($scope.foods);
			//lets reroute the user to the newly created food profile
			$location.path('/list/show/' + newName);
		}

	});


	// This controller populates the list item detail pane with data based on the URL parameter provided and uses it to index into 
	myApp.controller('listItemCtrl', function ($scope, Food, $stateParams, $rootScope) {

		//Lets grab our food from the server
		$scope.food = Food.get({ id:$stateParams.itemID });
 	  	// Let's save this state so when the user navigates away from "List" and returns
        // the list item they were viewing last is the one selected.
		$rootScope.lastListItem = $scope.food;

	  //  You can use the following code format to perform a more complex query:
      // 	$scope.letsGrabTheFoodFunction = selectedFood.query(function (response) {
      // 	angular.forEach(response, function(item) {
	  // 		if (item.name == $stateParams.itemID) {
	  //	   		$scope.food = item;
	  //	   		// Let's save this state so when the user navigates away from "List" and returns
	  //	   		// the list item they were viewing last is the one selected.
	  //	   		$rootScope.lastListItem = $scope.food;
	  // 		}
	  //   });
      // });

    });


