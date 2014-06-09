(function(){
	var app = angular.module('tag', []);

	app.controller('TagController', function($scope){

	});

	/**
	 * Filter function
	 */
	app.filter('slug', function(){
		return function(input){
			input = input.toLowerCase();
		    input = input.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
		    input = input.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
		    input = input.replace(/ì|í|ị|ỉ|ĩ/g, "i");
		    input = input.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
		    input = input.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
		    input = input.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
		    input = input.replace(/đ/g, "d");
		    input = input.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
		    input = input.replace(/-+-/g, "-");
		    input = input.replace(/^\-+|\-+$/g, "");
		    return input;
		};
	});

	/**
	 * Directive tag
	 */
	app.directive('imoodTag', function(){
		return {
			restrict: 'E',
			templateUrl: '../views/tag-block.html',
			controller: function($scope, $http) {

				$scope.showMoodByTag = function() {

				};

				$scope.arrTag = [
					{
						name: 'chill',
						color: '#FFF',
						bgColor: '#E35736'
					},
					{
						name: 'study',
						color: '#FFF',
						bgColor: '#BFAB54'
					},
					{
						name: 'hip hop',
						color: '#FFF',
						bgColor: '#F9E0A0'
					},
					{
						name: 'pop',
						color: '#FFF',
						bgColor: '#9D0193'
					},
					{
						name: 'electronic',
						color: '#FFF',
						bgColor: '#FF6B04'
					},
					{
						name: 'dub step',
						color: '#FFF',
						bgColor: '#613915'
					},
					{
						name: 'smoke',
						color: '#FFF',
						bgColor: '#405161'
					},
					{
						name: 'focus',
						color: '#FFF',
						bgColor: '#613915'
					},
					{
						name: 'happy',
						color: '#FFF',
						bgColor: '#BFAB54'
					},
					{
						name: 'good mood',
						color: '#FFF',
						bgColor: '#C9D2EF'
					},
					{
						name: 'sex',
						color: '#FFF',
						bgColor: '#9D0193'
					}
				];
			},
			controllerAs: 'tag'
		};
	});
})();