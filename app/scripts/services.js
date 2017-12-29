'use strict';

angular.module('inventoryApp')
.constant("baseURL", "https://inventory-server-2017-12-21.herokuapp.com/")

.factory('itemFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "items/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}]);