'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('SecuriaAdminApp')
	.directive('header',function(){
	return {
	    templateUrl:'scripts/directives/header/header.html',
	    restrict: 'E',
	    replace: true,
		controller:function($scope,$rootScope,localStorageService,$location){
			var user_token=localStorageService.get("user_token");
			if(user_token && user_token!=""){
				$rootScope.user_token=user_token;
				$rootScope.user_name=localStorageService.get("user_name");
				$rootScope.user_email=localStorageService.get("user_email");
			}else{
 				$location.path("/login");
			}
	    }
	}
});


