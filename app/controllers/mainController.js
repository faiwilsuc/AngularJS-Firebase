app.controller('mainController', function ($scope, $http, loginServices, sessionService) {
    /*	
     $scope.session=sessionService.get('user');
     console.log('sessionid',$scope.session);
     $scope.loginServices = loginServices;
     
     $scope.$watch("loginServices.isLoggedIn()", function LoggedIn( newValue, oldValue) {		  
     $scope.isLoggedIn =  newValue;
     console.log($scope.isLoggedIn);
     });*/


    //logout
    $scope.logout = function () {
        var userid;
        userid = sessionService.get('user');
        //alert(userid);	 
        $http.post('php_pages/destroy1.php', {id: userid});
        loginServices.logout();
    }

    $scope.login = false;
    $scope.client = true;
    $scope.consultant = false;
    $scope.msgtxt = '';
    $scope.name = '';
    $scope.login = function (user)
    {
        loginServices.login(user, $scope);
    }
    // $scope.session=sessionService.get('user');

    /* if($scope.session==1)
     {
     $scope.header='app/views/header_consultant.html';	  
     }
     else if($scope.session==2)
     {
     $scope.header='app/views/header_client.html';	 	  
     }
     else
     {
     $scope.header='app/views/header.html';	  
     }
     */
    /*  
     $scope.$watch('header', function(newValue, oldValue) { 
     $scope.updated_header=newValue;
     console.log($scope.updated_header);
     }); 
     console.log($scope.session);*/

});