(function () {
	var app = angular.module('mood', []);
	app.controller('MoodController', function($scope, $rootScope){
		$scope.isViewLoading = $rootScope.isViewLoading;
	});
})();