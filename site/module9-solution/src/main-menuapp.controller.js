(function () {
  'use strict';
  
  angular.module('data')
  .controller('MainMenuAppController', MainMenuAppController);

  MainMenuAppController.$inject = ['MenuDataService','items'];
  function MainMenuAppController(MenuDataService, items) {
    var categoriesList = this;
    categoriesList.items = items.data;
    console.log("ITEMS.DATA = " + categoriesList.items);
  };
  
  })();
    