(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var toBuy = this;

  // toBuy.items = [
  //   { name: "apples", quantity: 10 },
  //   { name: "bananas", quantity: 5 },
  //   { name: "cookies", quantity: 3 },
  //   { name: "donuts", quantity: 10 },
  //   { name: "eels", quantity: 2 }
  // ];
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  // console.log("toBuy.items = ", toBuy.items);

  // toBuy.itemName = "";
  // toBuy.itemQuantity = "";

  // toBuy.addItemToBuy = function () {
  //   ShoppingListCheckOffService.addItemToBuy(
  //     toBuy.itemName, toBuy.itemQuantity);
  // };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();

  bought.itemName = "";
  bought.itemQuantity = "";

  bought.addItemBought = function() {
    ShoppingListCheckOffService.addItemBought(
      bought.itemName, bought.itemQuantity);
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of To-Buy items
  var toBuyItems = [
    { name: "apples", quantity: 10 },
    { name: "bananas", quantity: 5 },
    { name: "cookies", quantity: 3 },
    { name: "donuts", quantity: 10 },
    { name: "eels", quantity: 2 }
  ];

  // List of Already-Bought items
  var boughtItems = [];

  // service.addItemToBuy = function (itemName, quantity) {
  //   var item = {
  //     name: itemName,
  //     quantity: quantity
  //   };
  //   toBuyItems.push(item);
  // };

  service.addItemToBought = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  service.removeItemFromToBuy = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1)
  };

  service.removeItemFromBought = function (itemIndex) {
    boughtItems.splice(itemIndex);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  // Return number of items to buy
  service.getNumToBuyItems = function () {
    return toBuyItems.length;
  }

  // Return number of bought items
  service.getNumBoughtItems = function() {
    return boughtItems.length;
  }
}


// .controller('LunchCheckController', LunchCheckController); 

  // LunchCheckController.$inject = ['$scope'];

  // function LunchCheckController($scope) {

  //   // initialize vars
  //   $scope.lunchItems = "";
  //   $scope.message = "";
    
  //   $scope.displayMessage = function () {

  //     // split string by comma
  //     var arrayOfLunchItems = $scope.lunchItems.split(',');

  //     // num items including empty content
  //     var numLunchItems = arrayOfLunchItems.length;      
  
  //     // dis-count empty contents : does NOT count empty item as an item
  //     for (var i=0; i<arrayOfLunchItems.length; i++) {
  //       var lunchItem = arrayOfLunchItems[i].trim();
  //       if (!lunchItem || lunchItem.length === 0) {
  //         numLunchItems--;
  //       }
  //     }
      
  //     // store message in global scope
  //     if (numLunchItems == 0) {
  //       $scope.message = "Please enter data first"; 
  //       $scope.messageStyle = {
  //         "color" : "red",
  //         "border" : "solid 1px red"
  //       }
  //     } else if (numLunchItems > 0 && numLunchItems <=3) {
  //       $scope.message = "Enjoy!";
  //       $scope.messageStyle = {
  //         "color" : "green",
  //         "border" : "solid 1px green"
  //       }
  //     } else {
  //       $scope.message = "Too much!";
  //       $scope.messageStyle = {
  //         "color" : "green",
  //         "border" : "solid 1px green"
  //       }
  //     }

  //   };
  // }


})();
