'use strict';
/**
 * @ngdoc function
 * @name SecuriaAdminApp.controller:authController
 * @description
 * # authController
 * Controller of the login screen
 */
 angular.module('SecuriaAdminApp')
  .controller('CallsController', ['$scope','$rootScope', '$timeout','$location','$http','localStorageService', 
                        function ($scope, $rootScope, $timeout, $location, $http,localStorageService) {
   
    $scope.callRecords = [];

    var date = new Date();
    $scope.lastDate = $scope.currentDate=date.toISOString().substring(0, 10);
    $scope.userId="0";
    $scope.users;
    $scope.selectedUserId="";

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

    $http.post($rootScope.api_base_url+"user/getAll", data)
        .success(function(data, status) {
            console.log("User Success",data);
            if(data.success){
                $scope.users=data.data.content;
            }
        });

    $scope.fetchDetails = function() {
        var data = {
            'user_id': $scope.selectedUserId,
            'from_date':$scope.lastDate,
            'to_date':$scope.currentDate
        };

        $http.post($rootScope.api_base_url+"call/getReports", data).success(function(data, status) {
            console.log("Reports Success",data);
            if(data.success){
                $scope.callRecords=data.data.calls;
            }
        });
    }

    $scope.fetchDetails();

    $scope.formatTime = function(unixTimestamp) {
        var dt = new Date(unixTimestamp * 1000);
        var date = dt.getDate();
        var month = dt.getMonth()+1;
        var year = dt.getFullYear();

        if (date < 10)
            date = '0' + date;

        if (month < 10)
            month = '0' + month;

        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var seconds = dt.getSeconds();

        // the above dt.get...() functions return a single digit
        // so I prepend the zero here when needed
        if (hours < 10)
            hours = '0' + hours;

        if (minutes < 10)
            minutes = '0' + minutes;

        if (seconds < 10)
            seconds = '0' + seconds;

        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

}]);