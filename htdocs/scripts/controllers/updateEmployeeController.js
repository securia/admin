'use strict';
/**
 * @ngdoc function
 * @name SecuriaAdminApp.controller:authController
 * @description
 * # authController
 * Controller of the login screen
 */
 angular.module('SecuriaAdminApp')
  .controller('UpdateEmployeeController', ['$scope','$rootScope','$http', '$timeout','$location', 
                    function ($scope,$rootScope,$http ,$timeout,$location) {     
     $scope.user=$rootScope.selectedUser;

     $scope.updateEmployeeDetails = function(index){
        $scope.user.token=$rootScope.user_token;
        $http.post($rootScope.api_base_url+"user/save", $scope.user).success(function(data, status) {
            if(data.success){
                $location.path("/dashboard/employees");   
            }else{
                alert(data.message.description);
            }
        });

    };
}]);