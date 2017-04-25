var myApp = angular.module('myApp', ['ngRoute']);

// ROUTES
//////////////////////////////////////////////////

myApp.config(function ($routeProvider, $locationProvider){

$locationProvider.hashPrefix('');

	$routeProvider
	.when('/', {
		templateUrl:'app/components/landing/landing.html',
		controller:'landingController'
	})
	
	.when('/styleguide', {
		templateUrl:'app/components/styleguide/styleguide.html',
		controller:'styleguideController'
	})

	.when('/ticket-detail', {
		templateUrl:'app/components/ticket-detail/ticket-detail.html',
		controller:'ticketDetailController'
	})
});

// CONTROLERS
//////////////////////////////////////////////////

myApp.controller('landingController', ['$scope', function($scope) {


}]); 

myApp.controller('styleguideController', ['$scope', function($scope) {


}]);

myApp.controller('ticketDetailController', ['$scope', function($scope) {


}]);

// FACTORIES / SERVICES
//////////////////////////////////////////////////


// DIRECTIVES
//////////////////////////////////////////////////