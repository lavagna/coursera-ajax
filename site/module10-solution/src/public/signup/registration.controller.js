(function(){
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['SignUpService'];
function RegistrationController(SignUpService) {
    var reg = this;
    
    // For displaying info at the bottom upon successful submission
    reg.submit = function () {

        // Save my info in service
        SignUpService.saveMyInfo(reg.user.username, reg.user.email, reg.user.phone);

        reg.completed = true;
    };
}

})();
