(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('dollarSignFilter', dollarSignFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.removeItem = function(itemIndex) {

    // Get the item
    var item = ShoppingListCheckOffService.getToBuyItemAtIndex(itemIndex);

    // Add to the Bought list
    ShoppingListCheckOffService.addItemToBought(item.name, item.quantity, item.pricePerItem);
    
    // Remove from the ToBuy list
    ShoppingListCheckOffService.removeItemFromToBuy(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of To-Buy items
  var toBuyItems = [
    { name: "apples", quantity: 10, pricePerItem: 1 },
    { name: "bananas", quantity: 5, pricePerItem: 1.50 },
    { name: "cookies", quantity: 3, pricePerItem: 2 },
    { name: "donuts", quantity: 10, pricePerItem: .50 },
    { name: "eels", quantity: 2, pricePerItem: 50 }
  ];

  // List of Already-Bought items
  var boughtItems = [];

  service.addItemToBought = function (itemName, quantity, pricePerItem) {
    var item = {
      name: itemName,
      quantity: quantity,
      price: pricePerItem
    };
    boughtItems.push(item);
  };

  service.removeItemFromToBuy = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1)
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  // Return the item from the ToBuy list at the given index
  service.getToBuyItemAtIndex = function (itemIndex) {
    return toBuyItems[itemIndex];
  };

}

// Custom filter to replace dollar sign
function dollarSignFilter() {
  return function(input, target, replace) {
    input = input.replace(target, replace);
    return input;
  }
}


})();
