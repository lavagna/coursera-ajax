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
    $ctrl.checkShortName = function() {

        // var promise = SignUpService.isValidShortName($ctrl.menuShortName);

        var promise = SignUpService.isValidShortName($ctrl.menuShortName);
        
        promise.then(function (result) {
            console.log("is a valid short name");
        }, function (errorResponse) {
            console.log("error message inside chckShortName: " + errorResponse.message);
        });
        
        // promise.then(function(response) {
        //    console.log("is a valid short name");
        // })
        // .catch(function(errorResponse) {
        //     // $ctrl.error = "No such menu number exists!!";
        //     // $ctrl.error = errorResponse.message;
        //     // console.log("errorResponse.message = " + errorResponse.message);
        //     console.log("CAUGHT error message inside registration controller");
        // });
    
        // return deferred.promise;

        // if (SignUpService.isValidShortName($ctrl.menuShortName)) {
        //     return true;
        // }
        // return false;
        // return ($ctrl.menuShortName !== '' && SignUpService.isValidShortName($ctrl.menuShortName));
    }

    // $ctrl.checkShortName = function () {
    //     if (!$ctrl.isValidShortName()) {
    //         $ctrl.error = "No such menu number exists";

    //     }
    //     // else {
    //     // //   console.log("No cookies here. Move right along!");
    //     // //   var warningElem = $element.find('div.error');
    //     // //   warningElem.slideUp(900);
    //     // }
    // }

    
}

})();
