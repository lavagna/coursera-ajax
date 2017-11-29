(function () {
  'use strict';
  
  angular.module('data')
  .controller('MainMenuAppController', MainMenuAppController);

  MainMenuAppController.$inject = ['items'];
  function MainMenuAppController(items) {
    var categoriesList = this;
    categoriesList.items = items.data;
    console.log("MainMenuAppController List of categories = " + categoriesList.items);
  };
  
  })();
    