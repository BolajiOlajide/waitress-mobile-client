angular.module('waitress')
  .controller('LoginForUserNameController', LoginForUserNameController);
LoginForUserNameController.$inject = ['$scope', '$ionicHistory', '$state', '$cordovaToast'];

/**
* LoginForUserNameController
@param {service} $scope, This controlls the scope
@param {service} $ionicHistory, for history purposes
@param {service} $state resolved service from ui-router
@param {service} $cordovaToast for cordova error messages
@return {void}
*/
function LoginForUserNameController($scope, $ionicHistory, $state, $cordovaToast) {
  $ionicHistory.clearHistory();
  $scope.password = '';
  $scope.verifyPassword = function(password) {
    if (password === 'andela2016') {
      return $state.go('dashboard.alphabets');
    }
    return $cordovaToast.show('You entered the wrong password', 'short', 'top');
  };
}
