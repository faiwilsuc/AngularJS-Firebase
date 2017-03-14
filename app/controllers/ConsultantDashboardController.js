// create our consultant controller and get access to firebase
app.controller('ConsultantDashboardController', function ($firebaseObject, $scope, $http, $rootScope, $location, loginServices, sessionService, FirebaseConfig) {

    Firebase.enableLogging(true);
    var firebaseUrl = new Firebase(FirebaseConfig);

    $scope.tabs = [
        {
            id: 'meetingaims',
            title: 'Meeting Aims',
            templateUrl: 'app/views/meetingaims.html',
        },
        {
            id: 'applicants',
            title: 'Applicants',
            templateUrl: 'app/views/applicants.html',
        },
        {
            id: 'employmentandincome',
            title: 'Employment and Income',
            templateUrl: 'app/views/employmentandincome.html',
        },
        {
            id: 'liabilities',
            title: 'Liabilities',
            templateUrl: 'app/views/liabilities.html',
        },
        {
            id: 'monthlyoutoging',
            title: 'Monthly Outgoing',
            templateUrl: 'app/views/monthlyoutgoing.html',
        },
        {
            id: 'yourmortgagerequirement',
            title: 'Your mortgage requirement',
            templateUrl: 'app/views/yourmortgagerequirement.html',
        },
        {
            id: 'anotherexistingmortgage',
            title: 'Another Existing Mortgage',
            templateUrl: 'app/views/anotherexistingmortgage.html',
        },
        {
            id: 'propertydetails',
            title: 'Property Details',
            templateUrl: 'app/views/propertydetails.html',
        },
        {
            id: 'credithistroy',
            title: 'Credit Histroy',
            templateUrl: 'app/views/credithistroy.html',
        },
        {
            id: 'additionalnotes',
            title: 'Additional Notes',
            templateUrl: 'app/views/additionalnotes.html',
        },
        {
            id: 'otherproducts',
            title: 'Other Products',
            templateUrl: 'app/views/otherproducts.html',
        },
        {
            id: 'sourcenow',
            title: 'Source Now',
            templateUrl: 'app/views/sourcing.html',
        }
    ];
    $scope.tabsStats = {
        'currentTabId' : 'meetingaims',
        'meetingaims': {
            active: true,
            enableTick: false
        },
        applicants: {
            active: false,
            enableTick: false
        },
        employmentandincome: {
            active: false,
            enableTick: false
        },
        liabilities: {
            active: false,
            enableTick: false
        },
        monthlyoutoging: {
            active: false,
            enableTick: false
        },
        yourmortgagerequirement: {
            active: false,
            enableTick: false
        },
        anotherexistingmortgage: {
            active: false,
            enableTick: false
        },
        propertydetails: {
            active: false,
            enableTick: false
        },
        credithistroy: {
            active: false,
            enableTick: false
        },
        additionalnotes: {
            active: false,
            enableTick: false
        },
        otherproducts: {
            active: false,
            enableTick: false
        },
        sourcenow: {
            active: false,
            enableTick: false
        }
    };


    $scope.session = sessionService.get('user');
    $('.mirror').hide();

    firebaseUrl.child('tabsStats').once('value',function(snapshot){
        if(snapshot.val() == null) {
            var firebaseTabsStats = new $firebaseObject(firebaseUrl);
            firebaseTabsStats.tabsStats = $scope.tabsStats;
            firebaseTabsStats.$save();
        }
        new $firebaseObject(firebaseUrl.child('tabsStats')).$bindTo($scope, 'tabsStats');
    });


    $scope.changeActiveTab = function (tabId) {
        $scope.$watch('tab', function (newVal, oldVal) {
            $scope.tabsStats[$scope.tabsStats.currentTabId].active = false;
            $scope.tabsStats[tabId].active = true;
            $scope.tabsStats.currentTabId = tabId;
        }, true);

    };

    $scope.isActiveTab = function (tabId) {
        return $scope.tabsStats.currentTabId === tabId;
    }



    //logout
    $scope.logout = function () {
        var userid;
        userid = sessionService.get('user');
        //alert(userid);
        $http.post('php_pages/destroy1.php', {id: userid});
        loginServices.logout();
    }


    //get consultant list for contactlist
    $http.post('php_pages/check_consultant.php').then(function (response) {
        $scope.check_consultantname = response.data;
    });

    //get mirroring client list
    //setInterval(function(){
    $http.post('php_pages/client_mirror.php').then(function (response) {
        $scope.client_det = response.data;
    });
    //},1000);

    //show client mirroring form
    $scope.textchat = function (client) {
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


    //current tab selection
    //$scope.customers.current_tab='#etab1';

    $scope.currenttab_selection = function (tabname) {
        $scope.tabsStats.currentTabId = tabname;
        $location.path('/' + tabname + '');
    }

    $scope.tickAccordion = function (tabname) {
        $scope.tabsStats[$scope.tabsStats.currentTabId].enableTick = true;
    };

    $('.new-sidebar').hide();

    //chatbox popup
    $scope.livechat = function () {
        $('#cdeals-sidebar_secondary').addClass('cdeals-popup-box-on');
        $scope.glued = true;
    }
    $scope.removeClass = function () {
        $('#cdeals-sidebar_secondary').removeClass('cdeals-popup-box-on');
    }
    $(".name").click(function () {
        $scope.glued = true;
        // $scope.videopod=false;
        $(".filp").slideToggle();
    });


});
