// create our client controller and get access to firebase
app.controller('YourmortgagerequirementController', function($firebaseObject, $firebaseArray, $scope, $http, $rootScope) {

    var liabilitiesref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants");
    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };

    //  $scope.data = $firebaseObject(ref);
    var fb = $firebaseObject(ref);
    // sync as object 

    $scope.liabilitiesdata = $firebaseArray(liabilitiesref);

    var syncObject = $firebaseObject(ref);
    // three way data binding
    syncObject.$bindTo($scope, 'customers');


    (function() {
        $scope.customer = {
            mortgage: {}
        };

        $scope.local = {
            customer: {
                mortgage: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            mortgage: {}
        };

        $scope.customer.mortgage[name] = {
            typing: true
        };

        $scope.local.customer.mortgage[name] = {
            typing: true
        };
    }

    $scope.hideTyping = function(name) {
        $scope.customer = {
            mortgage: {}
        };

        $scope.customer.mortgage[name] = {
            typing: false
        };

        $scope.local.customer.mortgage[name] = {
            typing: false
        };
    }

    if (!$scope.customers) {
        $scope.customers = {};
    }

    //active panel tabs
    $scope.customers.showEmortgagedetails = true;
    $scope.customers.showNmortgagedetails = false;
    $scope.customers.selected1 = true;

    $scope.Emortgagedetails = function($index) {
        $scope.customers.showEmortgagedetails = true;
        $scope.customers.showNmortgagedetails = false;
        $scope.customers.showbmortgagedetails = false;
        $scope.customers.selected1 = true;
        $scope.customers.selected2 = false;
        $scope.customers.selected7 = false;
    };
    $scope.Nmortgagedetails = function() {
        $scope.customers.showEmortgagedetails = false;
        $scope.customers.showNmortgagedetails = true;
        $scope.customers.showbmortgagedetails = false;
        $scope.customers.selected1 = false;
        $scope.customers.selected2 = true;
        $scope.customers.selected7 = false;
    };
    $scope.bmortgagedetails = function() {
        // alert("sdfds");
        $scope.customers.showEmortgagedetails = false;
        $scope.customers.showNmortgagedetails = false;
        $scope.customers.showpmortgagedetails = false;
        $scope.customers.showbmortgagedetails = true;
        $scope.customers.selected5 = false;
        $scope.customers.selected6 = true;
        $scope.customers.selected7 = true;
        $scope.customers.selected1 = false;
        $scope.customers.selected2 = false;
    };

    $scope.customers.showpmortgagedetails = true;
    $scope.customers.showbmortgagedetails = false;
    $scope.customers.selected5 = true;

    $scope.pmortgagedetails = function($index) {
        $scope.customers.showpmortgagedetails = true;
        $scope.customers.showbmortgagedetails = false;
        $scope.customers.selected5 = true;
        $scope.customers.selected6 = false;
    };

    $scope.switchmortgagedetails = function() {

        $scope.customers.showpmortgagedetails = true;
        $scope.customers.showNmortgagedetails = false;
        $scope.customers.showEmortgagedetails = true;
        $scope.customers.selected1 = true;
        $scope.customers.showbmortgagedetails = false;
        $scope.customers.selected5 = true;
        $scope.customers.selected6 = false;
    };

    $scope.currenttab_selection = function(tabname) {
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function() {
            $location.path('/' + tabname + '');
        });
    }

    $scope.consolidatedvalue = function() {

        var liabilites = $scope.customers.applicants[0].liabilities;

        if (liabilites == undefined) {
            $scope.customers.your_mortgage_rquirement.new_mortgage_details.total_consolidated = 0;
            return 0;
        }

        var sum = 0;
        var consolkeys = Object.keys(liabilites);
        for (i = 0; i < consolkeys.length; i++) {
            item = liabilites[consolkeys[i]];
            if (item.consolidate == 1 || item.consolidate == '1' || item.consolidate == true) {
                sum = sum + parseInt(item.balance_outstanding);
            }
        }

        $scope.customers.your_mortgage_rquirement.new_mortgage_details.total_consolidated = sum;
        return sum;

        //return sum;
        /*
		var applicants = $scope.customers.applicants;
		var liabilites = [];
		if(applicants.length > 0){
			liabilites = applicants[0].liabilities;
		}
*/

    }

    /*
    	$http.post('GetConsolidatedliabilities.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
    		success(function (response, status) {
    			$scope.status = status;
    			//  $scope.data = data; 
    			$rootScope.Consolidatedliabilities = response.data; // Show result from server in our <pre></pre> element
    			console.log($rootScope.Consolidatedliabilities);
    			$scope.Consolidatedliabilities = response.data;
    		});
    */

    $scope.createcmortgage = function(cmortgage) {
        $scope.mastercmortgage = angular.copy(cmortgage);

        $rootScope.eMortgageTypeIDs = $scope.mastercmortgage.mortgage_type;

        if ($rootScope.eMortgageTypeIDs == '1' || $rootScope.eMortgageTypeIDs == '2' || $rootScope.eMortgageTypeIDs == '3' || $rootScope.eMortgageTypeIDs == '4' || $rootScope.eMortgageTypeIDs == '5') {

            var loanamount = parseFloat(cmortgage.property_value) - parseFloat(cmortgage.deposit_amt) + parseFloat(cmortgage.capital_rasing);
            $rootScope.LoanRequireds = loanamount;

        } else {
            var loanamount = parseFloat(cmortgage.outstand_balance) + parseFloat(cmortgage.capital_rasing);
            $rootScope.LoanRequireds = loanamount;

        }


        var ltvs = (parseFloat($rootScope.LoanRequireds) / parseFloat(cmortgage.property_value)) * 100;
        $rootScope.ltvs = ltvs;
        var dataObj = $scope.mastercmortgage;
        var res = $http.post('php_pages/cmortgage.php', dataObj);
        res.success(function(data, status, headers, config) {
            //$scope.mortagereq=true; tm


            //place the condition to check the loan required and ltv

            var dataObj = $scope.mastercmortgageapp;
            var res = $http.post('php_pages/cmortgageapp.php', dataObj);
            res.success(function(data, status, headers, config) {
                $scope.mortagereq = true;

                $scope.messages = data;
                $scope.success = true;

                if (cmortgage.Nmortgagedetails == '2') {
                    console.log('no tickmark');
                    $scope.showNmortgagedetails = false;
                    $scope.Nmortgagedetails();
                }
                if (cmortgage.Nmortgagedetails == '0' && $scope.customers.meeting_aims.select_apps.is_bridging_sta == "true") {
                    $scope.bmortgagedetails();
                    $scope.showEmortgagedetails = false;
                    if (cmortgage.Nmortgagedetails == '0' && cmortgage.Bmortgagedetails == "1") {
                        //$scope.getexistingmortage_tickmark();
                        console.log('birgubf values', $scope.mastercmortgage.Bmortgagedetails);
                        //$scope.getotherexistingmortage_save();
                    }
                } else if (cmortgage.Nmortgagedetails == '0') {
                    //$scope.getexistingmortage_tickmark();
                    $rootScope.current_tab = 'anotherexistingmortgage';
                }

                if (cmortgage.Purchasedetails == '0' && $scope.customers.meeting_aims.select_apps.is_bridging_sta == "true") {
                    console.log('next button with sections');
                    $scope.bmortgagedetails();
                    if (cmortgage.Purchasedetails == '0' && $scope.customers.meeting_aims.select_apps.is_bridging_sta == 'true') {
                        $scope.getexistingmortage_tickmark();
                        $scope.getotherexistingmortage_save();
                    }
                } else if (cmortgage.Purchasedetails == '0') {
                    //$scope.getexistingmortage_tickmark();
                    console.log('birgubf values', $scope.mastercmortgage.IsBridging);
                    //$scope.getotherexistingmortage_save();
                    $rootScope.current_tab = 'anotherexistingmortgage';
                }
                angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Mortgage Requirement saved</div>');
                $scope.hidealert();
                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = 'anotherexistingmortgage';


            });
            // $scope.scrolltop = scrolltop();
        });
        res.error(function(data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
        // Making the fields empty
    };

    $scope.hidealert = function() {
        $(".alert-success").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert-success").alert('close');
        });
        $(".alert-warning").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert-warning").alert('close');
        });
    };

});