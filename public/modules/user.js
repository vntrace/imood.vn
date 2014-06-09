(function(){
	var app = angular.module('user', []);
	app.controller('UserController', function($scope, $window, $location, UserService, AuthenticationService){
		$scope.user = {
			email: '',
			password: ''
		};

		$scope.login = function() {
			if($scope.user.email.trim() === "" || $scope.user.password === "") return false;

			UserService
				.login($scope.user.email, $scope.user.password)
				.success(function(data){
					AuthenticationService.auth.isLogged = true;
					$window.sessionStorage.token = data.token;
					// Close modal
					console.log('Login success');
				})
				.error(function(status, data){
					console.log(status, data);
				});
		};
	});
})();