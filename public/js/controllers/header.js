'use strict';

angular.module('arenahelper.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
    {
        'title': 'Your Drafts',
        'link': 'drafts'
    },
    {
        'title': 'Create New Draft',
        'link': 'drafts/create'
    }];
    
    $scope.isCollapsed = false;
}]);
