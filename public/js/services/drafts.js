'use strict';

//Drafts service used for drafts REST endpoint
angular.module('arenahelper.drafts').factory('Drafts', ['$resource', function($resource) {
    return $resource('drafts/:draftId', {
        draftId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
