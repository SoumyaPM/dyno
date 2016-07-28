var app = angular.module("Dashboard", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/AddNewToyCategory", {
        templateUrl : '/partials/createToyCategory.html',
		controller: 'toyDashboardCtrl'
    })
    .when("/AddNewToy", {
        templateUrl : '/partials/createToy.html',
		controller: 'toyDashboardCtrl'
    })
    .when("/tableView", {
        templateUrl : "/partials/tableView.html",
		controller: 'tableViewCtrl'
    });
}]);

app.controller("toyDashboardCtrl", ['$scope', '$http', function($scope, $http) {

	var rowVisible = false;
	$scope.item = {
		toyId: 100,
		category: {
			value: '',

		}
	};
	$scope.savedToyCategories = localStorage.getItem('toyCategory');
	$scope.toyCategory = (localStorage.getItem('toyCategory')!==null) ? JSON.parse($scope.savedToyCategories) : 
		[ {CategoryName: 'Transforming toys',items: []}, {CategoryName: 'Mechanical toys‎', items: []} ];
	localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));


	/**method to create Toy category*/
	$scope.AddNewToyCategory = function() {
		$scope.toyCategory.push({
			CategoryName: $scope.toyCategoryName,
			items: []
		});
		$scope.toyCategoryName = ''; //clear the input after adding
		localStorage.setItem('toyCategory', JSON.stringify($scope.toyCategory));
	};

	/**method to create Toy category*/
	$scope.AddNewToyRow = function() {
		$scope.rowVisible = true;
		$scope.item.toyId = $scope.item.toyId + 1;
	};
	$scope.AddNewToy = function() {
		var toyCategory = JSON.parse(localStorage.getItem('toyCategory'));
		angular.forEach(toyCategory, function(value) {
			if(value.CategoryName === $scope.item.categoryId) {
				value.items.push($scope.item);
			}
		});
		localStorage.setItem('toyCategory', JSON.stringify(toyCategory));
		$scope.showSuccessStatus = true;
	};

}]);
app.controller("tableViewCtrl", ['$scope', '$http', function($scope, $http) {
	$scope.toyCategory = (localStorage.getItem('toyCategory')!==null) ? JSON.parse(localStorage.getItem('toyCategory')) : [];
}]);