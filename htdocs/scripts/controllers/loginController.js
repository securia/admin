'use strict';
/**
 * @ngdoc function
 * @name SecuriaAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the SecuriaAdminApp
 */
angular.module('SecuriaAdminApp')
  .controller('LoginController', ['$scope','$rootScope','$timeout','$location','$http','localStorageService', 
                        function ($scope, $rootScope,$timeout,$location,$http,localStorageService) {
   
    $scope.userId="";
    $scope.userPassword="";
    $scope.error_message="";
    $scope.showErrorMessage=false;
    
    var user_token=localStorageService.get("user_token");
    if(user_token){
        $location.path("/dashboard/calls");
        return;
    }
    
    console.log("load LoginController list");

    $scope.sendPost = function() {
        var data = {
            'email': $scope.userId,
            'password':$scope.userPassword
        };

        $http.post($rootScope.api_base_url+"auth/login", data)
            .success(function(data, status) {
                if(data.success){
                    var user_name=data.data.name;
                    var user_email=data.data.email;
                    var user_token=data.data.token;

                    $rootScope.user_email=user_email;
                    $rootScope.user_token=user_token;
                    $rootScope.user_name=user_name;

                    localStorageService.set("user_name",user_name);
                    localStorageService.set("user_email",user_email);
                    localStorageService.set("user_token",user_token);
                    
                    $location.path("/dashboard/calls");
                    $scope.showErrorMessage=false;
                }else{
                    $scope.error_message=data.message.description;
                    $scope.showErrorMessage=true;    
                }
            }).error(function(response){
                if (response.status === 0) {
                   $scope.error_message = 'No connection. Verify application is running.';
                } else if (response.status == 401) {
                   $scope.error_message = 'Unauthorized';
                } else if (response.status == 405) {
                   $scope.error_message = 'HTTP verb not supported [405]';
                } else if (response.status == 500) {
                   $scope.error_message = 'Internal Server Error [500].';
                } else {
                  $scope.error_message = JSON.parse(JSON.stringify(response.data));
                }
                $scope.showErrorMessage=true; 
            });
    }
}]);