(function(){
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignUpService', 'ApiPath'];
function MyInfoController(SignUpService, ApiPath) {

    var $ctrl = this;
    $ctrl.isSignedUp = false;

    // Get registered data from service
    if (SignUpService.isSignedUp()) {

        $ctrl.isSignedUp = true;
        $ctrl.myInformation = SignUpService.getMyInfo();
        $ctrl.imagePath = ApiPath + '/images/' + $ctrl.myInformation.menuShortName + '.jpg';

        // console.log("myinfo : " + $ctrl.myInformation);
        // console.log("myinfo name : " + $ctrl.myInformation.firstname);
        // console.log("myinfo imagePath: " + $ctrl.imagePath);

    }


}

})();
