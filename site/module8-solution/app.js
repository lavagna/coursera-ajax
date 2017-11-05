(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nid = this;



  nid.getFoundItems = function(searchText) {

    // Initialize variables
    nid.errorMessage = "";
    nid.found = [];
    
    var searchTextLocal = angular.lowercase(searchText);
    console.log("searchTextLoal = " + searchTextLocal);
  
    if (!searchTextLocal) {
      console.log("search text is empty!");
      nid.errorMessage = "Nothing found!";
    } else {
    
      var promise = MenuSearchService.getMatchedMenuItems(searchTextLocal);

      promise.then(function (response) {
  
        nid.found = response;
  
        // console.log("nid.found = " = nid.found);

        if (nid.found.length === 0) {
          console.log("found array is 0!");
          nid.errorMessage = "Nothing found!";
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    } // end else

    // return nid.found;
  };

  


}; // end controller

  // var promise = MenuSearchService.getMatchedMenuItems(nid.searchText);

  // console.log("SEARCH TEXT = " + nid.searchText);

  // promise.then(function (response) {
  //   menu.categories = response.data;
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

  //TODO MOVE FUNCTION TO INSIDE SERVICE FUNCTION?

  // nid.logItems = function () {
  //   console.log("SEARCH TEXT 2 = " + nid.searchText);
    
  //   // Initialize variables
  //   nid.errorMessage = "";
  //   nid.found = [];

  //   var searchTextLocal = angular.lowercase(nid.searchText);

  //   // Get the list of ONLY matched items
  //   var promise = MenuSearchService.getMatchedMenuItems2(searchTextLocal);

  //   if (!searchTextLocal) {
  //     console.log("search text is empty!");
  //     nid.errorMessage = "Nothing found!";
  //   } else {
    
  //     promise.then(function (response) {

  //       // angular.forEach(response.data, function(value, key) {
  //       //   angular.forEach(value, function(value, key) {
            
  //       //     if ((value.description).indexOf(searchTextLocal) != -1) {
  //       //       nid.found.push(value);
  //       //     }

  //       //   });
  //       // });

  //       if (nid.found.length === 0) {
  //         console.log("found array is 0!");
  //         nid.errorMessage = "Nothing found!";
  //       }
  //       console.log(nid.found);

  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //   }
  // };

// }

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // list of matched items
  // var found = []; 

  // service.getMatchedMenuItems = function(searchTerm) {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json")
  //   });
  //   return response;
  // };

  service.getMatchedMenuItems = function(searchTerm) {

    // Get all menu items
    // var response = $http({
    //   method: "GET",
    //   url: (ApiBasePath + "/menu_items.json")
    // });

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {

      // process result and only keep items that match
      var foundItems = [];
  
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


    // console.log("INSIDE getMatchedMenuItems, response = " + response.data);
    // // Loop through and find ones containing the search term
    // angular.forEach(response.data, function(value, key) {
    //   angular.forEach(value, function(value, key) {
        
    //     if ((value.description).indexOf(searchTerm) != -1) {
    //       found.push(value);
    //     }
    //   });
    // });

    // console.log("INSIDE getMatchedMenuItems, found = " + found);
    // // Return the list of matched items
    // return found;
  };

}

// MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
// function MenuCategoriesService($http, ApiBasePath) {
//   var service = this;

//   service.getMenuCategories = function () {
//     var response = $http({
//       method: "GET",
//       url: (ApiBasePath + "/categories.json")
//     });

//     return response;
//   };


//   service.getMenuForCategory = function (shortName) {
//     var response = $http({
//       method: "GET",
//       url: (ApiBasePath + "/menu_items.json"),
//       params: {
//         category: shortName
//       }
//     });

//     return response;
//   };

// }

})();
