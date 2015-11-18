(function() {
    'use strict';

    /**
     * @ngInject
     */
    function AuthController ($scope, $state, $window, AuthService) {

        $scope.auth = {};

        $scope.alerts = [];
        $scope.addAlert = function(alertObject) {
            $scope.alerts.push(alertObject);
        };
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.authenticate = function() {
            $scope.alerts = [];
            $scope.authenticated = AuthService.authenticate($scope.auth);
            $scope.authenticated.then(function(result) {
                if (result.isAuthenticated) {
                    // redirect to editor main page, with a full page reload,
                    // to pick up the newly set credentials
                    $window.location.href = '/editor/';
                } else {
                    handleError(result);
                }
            }, function (result) {
                handleError(result);
            });
        };

        var handleError = function (result) {
            $scope.auth.failure = true;
            var msg = result.error || (result.status + ': Unknown Error.');
            $scope.addAlert({
                type: 'danger',
                msg: msg
            });
        };
    }

    angular.module('ase.views.login').controller('AuthController', AuthController);

})();