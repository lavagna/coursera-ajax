(function () {
"use strict";

angular.module('public')
.controller('MenuController', MenuController);

MenuController.$inject = ['menuCategories'];
function MenuController(menuCategories) {
  var $ctrl = this;
  $ctrl.menuCategories = menuCategories;

  // For displaying info at the bottom upon successful submission
  $ctrl.submit = function () {
    $ctrl.completed = true;
  }
}

})();
