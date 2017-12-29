'use strict';

angular.module('inventoryApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
//                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the dishdetail page
            .state('app.itemdetails', {
                url: 'items/:id',
                params: {
                    id: null
                },
                views: {
                    'content@': {
                        templateUrl : 'views/itemdetail.html',
                        controller  : 'ItemDetailController'
                   }
                },
                resolve :{
                    id: function($stateParams){
                        console.log("In app.itemdetails resolve");
                        console.log($stateParams);
                        console.log("url", window.location);
                        return $stateParams.id;
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    })
;
