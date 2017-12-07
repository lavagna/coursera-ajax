(function(){
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['SignUpService', '$element'];
function RegistrationController(SignUpService, $element) {
    var $ctrl = this;
    $ctrl.firstname = '';
    $ctrl.lastname = '';
    $ctrl.email = '';
    $ctrl.phone = '';
    $ctrl.menuShortName = '';
    $ctrl.error = '';

    $ctrl.submit = function () {

        // Save my info in service up to phone number
        SignUpService.saveMyInfo($ctrl.firstname, $ctrl.lastname, $ctrl.email, $ctrl.phone);

        // getMenuItem also saves info in the service. If this promise errors out, save the error
        SignUpService.getMenuItem($ctrl.menuShortName).then(function(response) {
            $ctrl.completed = true;
        })
        .catch(function (result) {
            $ctrl.error = "No such menu number exists";
            $ctrl.menuShortName = '';
            $ctrl.completed = false;
          })
    } 
}

})();
