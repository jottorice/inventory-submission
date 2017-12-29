'use strict';

angular.module('inventoryApp')

//.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {
//
//    $scope.tab = 1;
//    $scope.filtText = '';
//    $scope.showDetails = false;
//    $scope.showFavorites = false;
//    $scope.showMenu = false;
//    $scope.message = "Loading ...";
//
//    menuFactory.query(
//        function (response) {
//            $scope.dishes = response;
//            $scope.showMenu = true;
//
//        },
//        function (response) {
//            $scope.message = "Error: " + response.status + " " + response.statusText;
//        });
//
//    $scope.select = function (setTab) {
//        $scope.tab = setTab;
//
//        if (setTab === 2) {
//            $scope.filtText = "appetizer";
//        } else if (setTab === 3) {
//            $scope.filtText = "mains";
//        } else if (setTab === 4) {
//            $scope.filtText = "dessert";
//        } else {
//            $scope.filtText = "";
//        }
//    };
//
//    $scope.isSelected = function (checkTab) {
//        return ($scope.tab === checkTab);
//    };
//
//    $scope.toggleDetails = function () {
//        $scope.showDetails = !$scope.showDetails;
//    };
//
//    $scope.toggleFavorites = function () {
//        $scope.showFavorites = !$scope.showFavorites;
//    };
//    
//    $scope.addToFavorites = function(dishid) {
//        console.log('Add to favorites', dishid);
//        favoriteFactory.save({_id: dishid});
//        $scope.showFavorites = !$scope.showFavorites;
//    };
//}])
//
//.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
//
//    $scope.feedback = {
//        mychannel: "",
//        firstName: "",
//        lastName: "",
//        agree: false,
//        email: ""
//    };
//
//    var channels = [{
//        value: "tel",
//        label: "Tel."
//    }, {
//        value: "Email",
//        label: "Email"
//    }];
//
//    $scope.channels = channels;
//    $scope.invalidChannelSelection = false;
//
//    $scope.sendFeedback = function () {
//
//
//        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
//            $scope.invalidChannelSelection = true;
//        } else {
//            $scope.invalidChannelSelection = false;
//            feedbackFactory.save($scope.feedback);
//            $scope.feedback = {
//                mychannel: "",
//                firstName: "",
//                lastName: "",
//                agree: false,
//                email: ""
//            };
//            $scope.feedback.mychannel = "";
//            $scope.feedbackForm.$setPristine();
//        }
//    };
//}])
//
//.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {
//
//    $scope.dish = {};
//    $scope.showDish = false;
//    $scope.message = "Loading ...";
//
//    $scope.dish = menuFactory.get({
//            id: $stateParams.id
//        })
//        .$promise.then(
//            function (response) {
//                $scope.dish = response;
//                $scope.showDish = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );
//
//    $scope.mycomment = {
//        rating: 5,
//        comment: ""
//    };
//
//    $scope.submitComment = function () {
//
//        commentFactory.save({id: $stateParams.id}, $scope.mycomment);
//
//        $state.go($state.current, {}, {reload: true});
//        
//        $scope.commentForm.$setPristine();
//
//        $scope.mycomment = {
//            rating: 5,
//            comment: ""
//        };
//    }
//}])
//
//// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', '$state', 'itemFactory', function ($scope, $state, itemFactory) {
    console.log("In HomeController")
    $scope.showDish = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    
    $scope.sortType     = 'location'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFilter   = 'Where';     // set the default search/filter term

    var items = itemFactory.query()
        .$promise.then(
            function (response) {
                var items = response;
                console.log("Items:");
                console.log(items);
                $scope.items = items;
                $scope.showItems = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    
    $scope.showItemDetail = function(itemid) {
        console.log("Show detail for item", itemid);
        $state.go('app.itemdetails', {id: itemid});
    };

    $scope.addNewItem = function() {
        console.log("Add new item");
        $state.go('app.itemdetails', {id: null});
    }

}])

.controller('ItemDetailController', ['$scope', '$state', '$stateParams', 'itemFactory', function ($scope, $state, $stateParams, itemFactory) {

    $scope.item = {};
    $scope.showItem = false;
    $scope.isEditable = false;
    $scope.message = "";
    
//    console.log("ItemDetailController:", $stateParams.id);
//    console.log($stateParams.id);
    console.log("In ItemDetailController");
    console.log($stateParams);
    
    if ($stateParams.id) {
        $scope.newItem = false;
        $scope.message = "Loading ...";

        $scope.item = itemFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.item = response;
                console.log("Got item from DB:");
                console.log($scope.item);
                $scope.showItem = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        )
    } else {
        $scope.showItem = true;
        $scope.newItem = true;
    }

    $scope.saveItem = function () {
        console.log("In ItemDetailController:saveItem");
        console.log("$scope.item:");
        console.log($scope.item);
        itemFactory.save($scope.item);
        $state.go("app");
//            .promise.then(
//                function (response) {
//                    console.log("saveItem response:")
//                    console.log(response);
//                }
//            )
    }
    
}])

//.controller('NewItemController', ['$scope', '$state', '$stateParams', 'itemFactory', function ($scope, $state, $stateParams, itemFactory) {
//
//    $scope.item = {};
//    
//    $scope.

//    $scope.item = itemFactory.get({
//            id: $stateParams.id
//        })
//        .$promise.then(
//            function (response) {
//                $scope.item = response;
//                $scope.showItem = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );

//}])

//.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
//
//    $scope.leaders = corporateFactory.query();
//
//}])
//
//.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {
//
//    $scope.tab = 1;
//    $scope.filtText = '';
//    $scope.showDetails = false;
//    $scope.showDelete = false;
//    $scope.showMenu = false;
//    $scope.message = "Loading ...";
//
//    favoriteFactory.query(
//        function (response) {
//            $scope.dishes = response.dishes;
//            $scope.showMenu = true;
//        },
//        function (response) {
//            $scope.message = "Error: " + response.status + " " + response.statusText;
//        });
//
//    $scope.select = function (setTab) {
//        $scope.tab = setTab;
//
//        if (setTab === 2) {
//            $scope.filtText = "appetizer";
//        } else if (setTab === 3) {
//            $scope.filtText = "mains";
//        } else if (setTab === 4) {
//            $scope.filtText = "dessert";
//        } else {
//            $scope.filtText = "";
//        }
//    };
//
//    $scope.isSelected = function (checkTab) {
//        return ($scope.tab === checkTab);
//    };
//
//    $scope.toggleDetails = function () {
//        $scope.showDetails = !$scope.showDetails;
//    };
//
//    $scope.toggleDelete = function () {
//        $scope.showDelete = !$scope.showDelete;
//    };
//    
//    $scope.deleteFavorite = function(dishid) {
//        console.log('Delete favorites', dishid);
//        favoriteFactory.delete({id: dishid});
//        $scope.showDelete = !$scope.showDelete;
//        $state.go($state.current, {}, {reload: true});
//    };
//}])
//
//.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {
//
//    $scope.loggedIn = false;
//    $scope.username = '';
//    
//    if(AuthFactory.isAuthenticated()) {
//        $scope.loggedIn = true;
//        $scope.username = AuthFactory.getUsername();
//    }
//        
//    $scope.openLogin = function () {
//        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
//    };
//    
//    $scope.logOut = function() {
//       AuthFactory.logout();
//        $scope.loggedIn = false;
//        $scope.username = '';
//    };
//    
//    $rootScope.$on('login:Successful', function () {
//        $scope.loggedIn = AuthFactory.isAuthenticated();
//        $scope.username = AuthFactory.getUsername();
//    });
//        
//    $rootScope.$on('registration:Successful', function () {
//        $scope.loggedIn = AuthFactory.isAuthenticated();
//        $scope.username = AuthFactory.getUsername();
//    });
//    
//    $scope.stateis = function(curstate) {
//       return $state.is(curstate);  
//    };
//    
//}])
//
//.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
//    
//    $scope.loginData = $localStorage.getObject('userinfo','{}');
//    
//    $scope.doLogin = function() {
//        if($scope.rememberMe)
//           $localStorage.storeObject('userinfo',$scope.loginData);
//
//        AuthFactory.login($scope.loginData);
//
//        ngDialog.close();
//
//    };
//            
//    $scope.openRegister = function () {
//        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
//    };
//    
//}])
//
//.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
//    
//    $scope.register={};
//    $scope.loginData={};
//    
//    $scope.doRegister = function() {
//        console.log('Doing registration', $scope.registration);
//
//        AuthFactory.register($scope.registration);
//        
//        ngDialog.close();
//
//    };
//}])
//;