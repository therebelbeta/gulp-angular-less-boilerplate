var App = angular.module('therebelrobot', ['ngRoute','templates']);

App.config(function ($routeProvider) {
    $routeProvider
      .when('/', {  templateUrl: 'states/main.html', controller: 'MainCtrl'  })
      .when('/about', {  templateUrl: 'states/about.html', controller: 'AboutCtrl'  })
      .otherwise({
        redirectTo: '/'
      });
  });