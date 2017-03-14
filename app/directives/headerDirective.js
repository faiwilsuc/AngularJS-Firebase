app.directive('loginheader', function ($compile) {
    return {
        restrict: 'E',
        controller: ['$scope', function ($scope) {

                function showLoginDirective() {
                    $scope.isLoggedIn = true;
                    $scope.session = 1;

                }
                ;

                showLoginDirective();
            }
        ],
        template: '<div ng-include="app/views/header_consultant.html"></div>',
        link: function (scope, element, attrs) {

        }
    };
});