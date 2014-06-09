(function() {
	var app = angular.module('imood', ['ngRoute', 'tag', 'mood', 'user']);

	app.controller('ImoodController', function($scope, UserService, AuthenticationService){
		$scope.$on('$routeChangeStart', function(){
			NProgress.start();
		});

		$scope.$on('$routeChangeSuccess', function(){
			NProgress.done();
		});

		$scope.$on('$routeChangeError', function(){
			NProgress.remove();
		});
	});

	app.factory('AuthenticationService', function(){
		var auth = {
			isLogged: false
		};

		return auth;
	});

	app.factory('UserService', function($http){
		return {
			login: function(email, password) {
				return $http.post('/login', {email: email, password: password});
			},
			logout: function() {

			}
		}
	});

	app.factory('TokenInterceptor', function($q, $window, AuthenticationService){
		return {
			request: function(config) {
				config.headers = config.headers || {};
				if($window.sessionStorage.token) {
					config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
				}
				return config;
			},
			response: function(response) {
				return response || $q.when(response);
			}
		}
	});

	app.config(function($httpProvider){
		$httpProvider.interceptors.push('TokenInterceptor');
	});

	app.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {
			controller: 'MoodController',
			templateUrl: '../views/index.html'
		})
		.when('/tag/:tag', {
			controller: 'TagController',
			templateUrl: '../views/tag.html'
		})
		.when('/mood/:mood', {
			controller: 'MoodController',
			templateUrl: '../views/detail.html'
		});

		// Enable html5 mode for router - remove #
		$locationProvider.html5Mode(true);
	});
})();