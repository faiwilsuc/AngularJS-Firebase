// create our client controller and get access to firebase
app.controller('ClientDashboardController', function ($firebaseObject, $firebaseArray, $scope, $rootScope, $location, loginServices, sessionService, FirebaseConfig) {

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

    firebaseUrl.child('tabsStats').once('value',function(snapshot){
        if(snapshot.val() == null) {
            var firebaseTabsStats = new $firebaseObject(firebaseUrl);
            firebaseTabsStats.tabsStats = $scope.tabsStats;
            firebaseTabsStats.$save();
        }
        new $firebaseObject(firebaseUrl.child('tabsStats')).$bindTo($scope, 'tabsStats');
    });

    $scope.customers = {};
    $scope.customers.current_tab = 'meetingaims';
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


    $('.new-sidebar').hide();

    //chatbox popup
    $scope.livechat = function () {
        $('#cdeals-sidebar_secondary').addClass('cdeals-popup-box-on');
        $scope.glued = true;
    }
    $scope.removeClass = function () {
        $('#cdeals-sidebar_secondary').removeClass('cdeals-popup-box-on');
    }
    $scope.tickAccordion = function (tabname) {
        $scope.tabsStats[$scope.tabsStats.currentTabId].enableTick = true;
    };
    $(".name").click(function () {
        $scope.glued = true;
        // $scope.videopod=false;
        $(".filp").slideToggle();
    });


});
