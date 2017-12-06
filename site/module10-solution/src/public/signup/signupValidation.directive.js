// Reference: https://weblogs.asp.net/dwahlin/building-a-custom-angularjs-unique-value-directive

angular.module('public')
.directive('wcUnique', ['SignUpService', function (SignUpService) {
return {
    // restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
        element.bind('blur', function (e) {
            if (!ngModel || !element.val()) return;
            var currentValue = element.val();
            SignUpService.verifyMenuItemExists(currentValue)
                .then(function (unique) {
                    //Ensure value that being checked hasn't changed
                    //since the Ajax call was made
                    if (currentValue == element.val()) { 
                        ngModel.$setValidity('menuShortName', true);
                    }
                }, function () {
                    //Probably want a more robust way to handle an error
                    //For this demo we'll set unique to true though
                    ngModel.$setValidity('menuShortName', false);
                });
        });
    }
}
}]);