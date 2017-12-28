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

//            // route for the newitem page
//            .state('app.newitem', {
//                url: 'items',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/newitem.html',
//                        controller  : 'NewItemController'
//                   }
//                }
//
//            })

//            // route for the aboutus page
//            .state('app.aboutus', {
//                url:'aboutus',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/aboutus.html',
//                        controller  : 'AboutController'                  
//                    }
//                }
//            })
//        
//            // route for the contactus page
//            .state('app.contactus', {
//                url:'contactus',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/contactus.html',
//                        controller  : 'ContactController'                  
//                    }
//                }
//            })
//
//            // route for the menu page
//            .state('app.menu', {
//                url: 'menu',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/menu.html',
//                        controller  : 'MenuController'
//                    }
//                }
//            })
//
//            // route for the dishdetail page
//            .state('app.dishdetails', {
//                url: 'menu/:id',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/dishdetail.html',
//                        controller  : 'DishDetailController'
//                   }
//                }
//            })
//        
//            // route for the dishdetail page
//            .state('app.favorites', {
//                url: 'favorites',
//                views: {
//                    'content@': {
//                        templateUrl : 'views/favorites.html',
//                        controller  : 'FavoriteController'
//                   }
//                }
//            });
//    
        $urlRouterProvider.otherwise('/');
    })
;
