'use strict';

//Cards service used for cards REST endpoint
angular.module('arenahelper.cards').factory('Cards', ['$resource', function($resource) {
    return $resource('cards/:cardId', {
        cardId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
