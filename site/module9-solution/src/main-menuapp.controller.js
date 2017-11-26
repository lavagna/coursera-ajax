(function () {
  'use strict';
  
  // angular.module('MenuApp')
  angular.module('data')
  .controller('MainMenuAppController', MainMenuAppController);
  


  // MainMenuAppController.$inject = ['MenuDataService'];
  // function MainMenuAppController(MenuDataService) {
  //   var categoriesList = this;
  //   categoriesList.items = [];
  
  //   categoriesList.$onInit = function () {
  //     // returns a promise
  //     MenuDataService.getAllCategories()
  //     .then(function (result) {
  //       categoriesList.items = result;
  //     });
  //   };
  // }


  MainMenuAppController.$inject = ['MenuDataService','items'];
  function MainMenuAppController(MenuDataService, items) {
    var categoriesList = this;
    categoriesList.items = items.data;
    console.log("ITEMS.DATA = " + categoriesList.items);
  };
  
  })();
    