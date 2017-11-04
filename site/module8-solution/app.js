(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
// .controller('MenuCategoriesController', MenuCategoriesController)
// .service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var nid = this;

  var promise = MenuSearchService.getMatchedMenuItems(nid.searchText);

  // console.log("SEARCH TEXT = " + nid.searchText);

  // promise.then(function (response) {
  //   menu.categories = response.data;
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

  nid.logItems = function () {
    console.log("SEARCH TEXT 2 = " + nid.searchText);
    
    var searchTextLocal = angular.lowercase(nid.searchText);
    var promise = MenuSearchService.getMatchedMenuItems();

    if (!searchTextLocal) {
      nid.errorMessage = "Nothing found!";
    } else {
    
      promise.then(function (response) {

        nid.foundItems = [];
        angular.forEach(response.data, function(value, key) {
          angular.forEach(value, function(value, key) {

            // console.log("value.description: " + value.description);
            
            if ((value.description).indexOf(searchTextLocal) != -1) {
              nid.foundItems.push(value);
            }

          });
          
          // if ((value.description).indexOf(searchText) != -1) {
          //   foundItems.push(value);
          // }
        });

        // console.log(response.data);
        console.log(nid.foundItems);

      })
      .catch(function (error) {
        console.log(error);
      })
    }
  };


  // menu.logMenuItems = function (shortName) {
  //   var promise = MenuCategoriesService.getMenuForCategory(shortName);

  //   promise.then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };
}

// MenuCategoriesController.$inject = ['MenuCategoriesService'];
// function MenuCategoriesController(MenuCategoriesService) {
//   var menu = this;

//   var promise = MenuCategoriesService.getMenuCategories();

//   promise.then(function (response) {
//     menu.categories = response.data;
//   })
//   .catch(function (error) {
//     console.log("Something went terribly wrong.");
//   });

//   menu.logMenuItems = function (shortName) {
//     var promise = MenuCategoriesService.getMenuForCategory(shortName);

//     promise.then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//   };
// }

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };

  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
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
