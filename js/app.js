'use strict';

/* App Module */

var sfvApp = angular.module('sfvApp', [
  'sfvControllers',
  'sfvServices',
  'sfvFilters'
]);

sfvApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);
