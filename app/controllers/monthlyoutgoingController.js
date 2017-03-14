// create our client controller and get access to firebase
app.controller('MonthlyoutgoingController', function ($firebaseObject, $scope, $http, $rootScope, $location) {

    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };
//  $scope.data = $firebaseObject(ref);
    var fb = $firebaseObject(ref);
    // sync as object 

    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');

    //$scope.applicant_tab=true;

    ;(function(){
        $scope.customer = {
            monthly : {}
        };

        $scope.local = {
            customer : {
                monthly : {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            monthly : {}
        };

        $scope.customer.monthly[name] = {
            typing : true
        };

        $scope.local.customer.monthly[name] = {
            typing : true
        };
    }

    $scope.hideTyping = function(name) {
        $scope.customer = {
            monthly : {}
        };

        $scope.customer.monthly[name] = {
            typing : false
        };

        $scope.local.customer.monthly[name] = {
            typing : false
        };
    }

//hiding the tickmark    
    $scope.hidealert = function () {
        $(".alert-success").fadeTo(2000, 500).slideUp(500, function () {
            $(".alert-success").alert('close');
        });
        $(".alert-warning").fadeTo(2000, 500).slideUp(500, function () {
            $(".alert-warning").alert('close');
        });
    };
    //hiding the tickmarkend


//active tab function  
    $scope.currenttab_selection = function (tabname) {
        $scope.monthlyshow = true;
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function () {
            $location.path('/' + tabname + '');
        });
    }
//end active tab    
 $scope.monthlyshow = true;
 $scope.showliabilities = false;
 $scope.showPayDayLoans = false;
    $scope.masters = {};

/* $scope.MonthlBack = function () {
        $scope.showliabilities = true;
        $scope.showPayDayLoans = true;
      
       $scope.monthlyshow = false;
    };*/

$scope.viewPayDayLoans = function () {
        $scope.showliabilities = false;
        $scope.showPayDayLoans = true;
        $scope.liabilitiesselected = false;
        $scope.PayDayLoansselected = true;
    };


    $scope.createexpenditure = function (expenditure) {


        $scope.success = false;
        $scope.masters = angular.copy(expenditure);
        $scope.masters.userid = 1;


        var dataObj = $scope.masters;
        var res = $http.post('php_pages/saveexpenditures.php', dataObj);
        res.success(function (data, status, headers, config) {

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Expenditure saved</div>');
            $scope.hidealert();

            //  $rootScope.current_tab='yourmortgagerequirement';

            //save mirroring using watch
            $scope.$watch('yourmortgagerequirement', function (newVal, oldVal) {
                console.log('changed');
                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = 'yourmortgagerequirement';
            }, true);
            success(function (response, status) {
                $scope.status = status;
                //  $scope.data = data;
                $scope.getexpenditure = response.data; // Show result from server in our <pre></pre> element

            });

            //  $scope.addexpenditure=false;
            //    $scope.editexpenditure=true;

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


    };


});
