app.controller('loginController', function ($scope,$http,loginServices) {
  
  $scope.msgtxt='';
  $scope.name='';
  $scope.login=function(user)
  {	
  loginServices.login(user,$scope);
  }

});