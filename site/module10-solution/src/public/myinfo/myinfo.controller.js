(function(){
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpService'];
function MyInfoController(SignUpService) {
    var $ctrl = this;

    $ctrl.isSignedUp = false;
    $ctrl.firstName = '';
    $ctrl.lastName = '';
    $ctrl.email = '';
    $ctrl.phone = '';
    $ctrl.menuShortName = '';
    // $ctrl.myInformation = {};

    // Get registered data from service
    if (SignUpService.isSignedUp()) {
        $ctrl.isSignedUp = true;
        $ctrl.myInformation = SignUpService.getMyInfo();

        console.log("myinfo : " + $ctrl.myInformation);
    }


}

})();
