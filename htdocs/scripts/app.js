'use strict';
/**
 * @ngdoc overview
 * @name SecuriaAdminApp
 * @description
 * # SecuriaAdminApp
 *
 * Main module of the application.
 */
var securiaApp = angular.module('SecuriaAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'angular-loading-bar',
  ])

securiaApp.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','localStorageServiceProvider',
          function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,localStorageServiceProvider) {
    
    console.log("App config load event",localStorageServiceProvider);
    localStorageServiceProvider.setPrefix("securia.health.pharama");
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'SecuriaAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    
     .state('login',{
        templateUrl:'views/login.html',
        url:'/login',
        controller:'LoginController',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({}),
            $ocLazyLoad.load({
                name:'SecuriaAdminApp',
                files:['scripts/controllers/loginController.js']
            })
          }
        }
    })

    .state('dashboard.calls',{
        url:'/calls',
        templateUrl:'views/calls.html',
        controller:'CallsController',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'SecuriaAdminApp',
              files:[
                  'scripts/controllers/main.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'SecuriaAdminApp',
                files:['scripts/controllers/callsController.js']
            })
          }
        }
    })

    .state('dashboard.updateEmployee',{
        url:'/updateEmployee',
        templateUrl:'views/updateEmployee.html',
        controller:'UpdateEmployeeController',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'SecuriaAdminApp',
              files:[
                'scripts/controllers/main.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'SecuriaAdminApp',
                files:['scripts/controllers/updateEmployeeController.js']
            })
          }
        }
    })

    .state('dashboard.employees',{
        url:'/employees',
        templateUrl:'views/employeeList.html',
        controller:'EmployeeListController',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'SecuriaAdminApp',
              files:[
              'scripts/controllers/main.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'SecuriaAdminApp',
                files:['scripts/controllers/employeeListController.js']
            })
          }
        }
    })

}]);

securiaApp.run(function($rootScope) {
  $rootScope.api_base_url="http://api.securiapharma.com/admin/1.0/";
  console.log("App load event");
});

    
