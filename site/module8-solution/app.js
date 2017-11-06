(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
// .factory('NarrowItDownFactory', NarrowItDownFactory)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItemsList', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',

    // Isolate scope with directive property called dirList,
    // bound to myList (my-list attribute in HTML)
    scope: {
      dirList: '<myList',
      title: '@title',  // can be interpolated inside double curly braces in directive template
      onRemove: '&'
    },

    // NOTHING WORKS!! 
    // The scope property referenced inside directive is called dirList. 
    // But if we declare a controller here, with controllerAs syntax, wouldn't we need to
    // reference that as 'list' inside the directive? CONFUSING.
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };
  
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.getFoundItems = function() {

    // Initialize variables
    list.errorMessage = "";
    list.found = [];
    
    list.title = "List of Found Items (" + list.found.length + ") items";

    var searchTextLocal = angular.lowercase(list.searchText);
    console.log("searchTextLoal = " + searchTextLocal);
  
    if (!searchTextLocal) {
      console.log("search text is empty!");
      list.errorMessage = "Nothing found!";
    } else {
   
      var promise = MenuSearchService.getMatchedMenuItems(searchTextLocal);
      promise.then(function (response) {  
        console.log("Contoller: response = " + response);

        list.found = response;
        if (list.found.length === 0) {
          console.log("found array is 0!");
          list.errorMessage = "Nothing found!";
        }
        list.title = "List of Found Items (" + list.found.length + ") items";
        
      })
      .catch(function (error) {
        console.log(error);
      })
    } // end else

  }; // end getFoundItems()

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    list.found.splice(itemIndex, 1);
    list.title = "List of Found Items (" + list.found.length + ") items";
    
  };

}; // end controller



MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {

    // Wipe out array
    var foundItems = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {

      // process result and only keep items that match
      angular.forEach(result.data, function(value, key) {
        angular.forEach(value, function(value, key) {
          
          if ((value.description).indexOf(searchTerm) != -1) {
            foundItems.push(value);
          }
        });
      });
  
      console.log("INSIDE getMatchedMenuItems, foundItems = " + foundItems);
      // return processed items
      return foundItems;
    });

  }; // end getMatchedMenuItems

}

function NarrowItDownFactory() {
  var factory = function() {
    return new NarrowItDownController();
  };
  return factory;
}

})();
