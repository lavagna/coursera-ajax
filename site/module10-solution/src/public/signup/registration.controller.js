(function(){
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['SignUpService'];
function RegistrationController(SignUpService) {
    var $ctrl = this;
    $ctrl.firstname = '';
    $ctrl.lastname = '';
    $ctrl.email = '';
    $ctrl.phone = '';
    $ctrl.menuShortName = '';
    $ctrl.error = '';
    $ctrl.isInvalidShortName = false;

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

    // Validation function returns true if the short name exists and is a valid one
    $ctrl.isValidShortName = function() {
        if (SignUpService.isValidShortName($ctrl.menuShortName)) {
            $ctrl.isInvalidShortName = false;
        }
        $ctrl.isInvalidShortName = true;
        // return ($ctrl.menuShortName !== '' && SignUpService.isValidShortName($ctrl.menuShortName));
    };

    
}

})();
