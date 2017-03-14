app.controller('HeaderController', function ($scope, $http, loginServices, sessionService) {
    //session variables
    $scope.session = sessionService.get('user');
    $scope.loginServices = loginServices;

    $scope.$watch("loginServices.isLoggedIn()", function LoggedIn(newValue, oldValue) {

        if (newValue == 1)
        {
            $scope.isLoggedIn = newValue;
            $scope.consultant = 'true';
        } else
        {
            $scope.isLoggedIn = newValue;
            $scope.client = 'true';
        }
    });
    //logout
    $scope.logout = function () {
        var userid;
        userid = sessionService.get('user');
        //alert(userid);	 
        $http.post('php_pages/destroy1.php', {id: userid});
        loginServices.logout();
    }


    //get the header html 
    $scope.headers = [
        {id: 'null', title: 'initial', templateUrl: 'app/views/header.html'},
        {id: '1', title: 'consultant', templateUrl: 'app/views/header_consultant.html'},
        {id: '2', title: 'client', templateUrl: 'app/views/header_client.html'}

    ];


    //get consultant list for contactlist
    $http.post('php_pages/check_consultant.php').then(function (response) {
        $scope.check_consultantname = response.data;
    });

    //get mirroring client list
    //	setInterval(function(){
    $http.post('php_pages/client_mirror.php').then(function (response) {
        $scope.client_det = response.data;
    });
    //	},1000);	

    //show client mirroring form
    $scope.textchat = function (client)
    {
        $('.mirror').show();
        $('#sidebar_secondary').addClass('popup-box-on');
        sessionService.set_currentchat('userid', client.client_id);
        $scope.get_currentchat = sessionService.get_currentchat('userid');
        $scope.divid = 1;
        $scope.selectedid = client.client_id;
        /*$scope.class='cht-sel';*/
        $scope.to_id = client.client_id;
        $scope.clientname = client.client_name;
        $scope.status = client.logged_in;
        $scope.toid = 1;
        $scope.conversation = $scope.session + ":" + $scope.toid;
        $scope.rconversation = $scope.toid + ":" + $scope.session;
    }

});