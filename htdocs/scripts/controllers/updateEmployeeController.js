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
     
     $scope.user={};

     if($rootScope.selectedUser){
        $scope.user.user_id = $rootScope.selectedUser.user_id;
        $scope.user.name = $rootScope.selectedUser.name;
        $scope.user.position = $rootScope.selectedUser.position;
        $scope.user.contact_number = $rootScope.selectedUser.contact_number;
        $scope.user.email = $rootScope.selectedUser.email;
        $scope.user.type = $rootScope.selectedUser.type;
        $scope.user.password = $rootScope.selectedUser.password;
        $scope.user.is_active = $rootScope.selectedUser.is_active+"";
     }else{
        $scope.user.type = "employee"; 
     }

     $scope.updateEmployeeDetails = function(index){
        $scope.user.token=$rootScope.user_token;
        
        $scope.user.is_active = $scope.user.is_active=="false"?false:true;

        $http.post($rootScope.api_base_url+"user/save", $scope.user).success(function(data, status) {
            if(data.success){
                $location.path("/dashboard/employees");   
            }else{
                alert(data.message.description);
            }
        });

    };
}]);