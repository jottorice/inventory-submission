'use strict';

angular.module('inventoryApp')

.controller('HomeController', ['$scope', '$state', 'itemFactory', function ($scope, $state, itemFactory) {
    console.log("In HomeController")
    $scope.showDish = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    
    $scope.sortType     = 'itemRef'; // set the default sort type
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

    $scope.deleteItem = function(itemid) {
        console.log("Will delete item", itemid);
        itemFactory.delete({id:itemid})
          .$promise.then (
            function (response) {
                $state.go($state.current, {}, {reload: true})
            }
          )
    }

}])

.controller('ItemDetailController', ['$scope', '$state', '$stateParams', 'itemFactory', function ($scope, $state, $stateParams, itemFactory) {

    $scope.item = {};
    $scope.showItem = false;
    $scope.isEditable = false;
    $scope.message = "";
    
    console.log("In ItemDetailController");
    console.log($stateParams);
    
    // If "id" is null, then this is a new item. Otherwise, we get the item data from
    // the database. The "newItem" value is used by the view to control whether we deal
    // with an existing item, or a new one.
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
                $scope.allowEdit = false;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        )
    } else {
        $scope.showItem = true;
        $scope.newItem = true;
        $scope.allowEdit = true;
    }

    $scope.editItem = function () {
        console.log("In ItemDetailController:editItem");
        console.log("Setting allowEdit to true");
        $scope.allowEdit = true;
    }
    
    $scope.saveItem = function () {
        console.log("In ItemDetailController:saveItem");
        console.log("$scope.item:");
        console.log($scope.item);
        console.log("Item id:");
        var myID = $scope.item._id;
        console.log(myID);
        console.log("Item Ref:");
        var myRef = $scope.item.itemRef;
        console.log(myRef);
        if ($scope.newItem) {
            itemFactory.save($scope.item)
                .$promise.then(
                    function(response) {$state.go("app", {reload: true})}
                )
        } else {
            itemFactory.update({id:myID}, $scope.item)
                .$promise.then(
                    function(response) {$state.go("app", {reload: true})}
                )
        }
    }
    
}])
