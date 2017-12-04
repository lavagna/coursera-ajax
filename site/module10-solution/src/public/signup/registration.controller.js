(function(){
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['SignUpService'];
function RegistrationController(SignUpService) {
    var $ctrl = this;
    $ctrl.firstName = '';
    $ctrl.lastName = '';
    $ctrl.email = '';
    $ctrl.phone = '';
    $ctrl.menuShortName = '';
    $ctrl.error = '';

    $ctrl.submit = function () {

        // Save my info in service up to phone number
        SignUpService.saveMyInfo($ctrl.firstName, $ctrl.lastName, $ctrl.email, $ctrl.phone);

        // Test menu Short name before saving it. If errors out, save the error
        SignUpService.testShortName($ctrl.menuShortName).then(function() {
            SignUpService.saveShortName($ctrl.menuShortName);
            $ctrl.completed = true;
        })
        .catch(function (result) {
            $ctrl.error = "No such menu number exists";
            $ctrl.menuShortName = '';
            $ctrl.completed = false;
          })
    }

    $ctrl.valid = function() {
        return ($ctrl.menuShortName !== '');
    };
}

})();
