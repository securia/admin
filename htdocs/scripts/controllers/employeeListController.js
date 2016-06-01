'use strict';
/**
 * @ngdoc function
 * @name SecuriaAdminApp.controller:authController
 * @description
 * # authController
 * Controller of the login screen
 */
 angular.module('SecuriaAdminApp')
  .controller('EmployeeListController', ['$scope', '$timeout','$location','localStorageService','$http','$rootScope',
                                     function ($scope, $timeout,$location,localStorageService,$http,$rootScope) {
    $scope.users;
    $scope.user;
    
    $rootScope.selectedUser=null;

    $scope.getInitData = function(){        
        var data = {
            'token': localStorageService.get("user_token"),
            'page':1,
            'per_page':100,
            "search_by": [
                "name",
                "email",
                "contact_number"
            ],
            "search_value": "",
            "sort": [{"sort_by": "name", "order_by": 1}]
        };

        $http.post($rootScope.api_base_url+"user/getAll", data).success(function(data, status) {
            console.log("User Success",data);
            $scope.users=data.data.content;
        });
    };

    $scope.getInitData();

    $scope.deleteEmployee = function(index){
        console.log("User Success",index);
        var res = window.confirm("Are you sure you want to delete employee?");
        if(res){
            var data = {
                'token': localStorageService.get("user_token"),
                'user_id':$scope.users[index].user_id
            };
        
            $http.post($rootScope.api_base_url+"user/delete", data).success(function(data, status) {
                if(data.success){
                     $scope.users.splice(index,1);   
                }else{
                    alert(data.message.description);
                }
            });
        }
    };

    $scope.updateEmployee = function(index){
        $rootScope.selectedUser=$scope.users[index];
        $location.path("/dashboard/updateEmployee");
        console.log("User Success",index);
    };
}]);