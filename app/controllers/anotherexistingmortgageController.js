// create our client controller and get access to firebase
app.controller('AnotherexistingmortgageController', function($firebaseObject, $scope, $http, $location, $firebaseArray) {

    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var anotheref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/another_existing_mortgage/");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };

    $scope.anotherexistingdata = $firebaseArray(anotheref);
    //  $scope.data = $firebaseObject(ref);
    var fb = $firebaseObject(ref);
    // sync as object 

    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');


    ;
    (function() {
        $scope.customer = {
            existing: {}
        };

        $scope.local = {
            customer: {
                existing: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            existing: {}
        };

        $scope.customer.existing[name] = {
            typing: true
        };

        $scope.local.customer.existing[name] = {
            typing: true
        };
    }

    $scope.hideTyping = function(name) {
            $scope.customer = {
                existing: {}
            };

            $scope.customer.existing[name] = {
                typing: false
            };

            $scope.local.customer.existing[name] = {
                typing: false
            };
        }
        //$scope.applicant_tab=true;

    $scope.currenttab_selection = function(tabname) {
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function() {
            $location.path('/' + tabname + '');
        });
    }

    $scope.submitForm = function() {
        $scope.tickAccordion($scope.tabsStats.currentTabId);
        $scope.tabsStats.currentTabId = 'propertydetails';
    }

    //hiding the tickmark    
    $scope.hidealert = function() {
        $(".alert-success").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert-success").alert('close');
        });
        $(".alert-warning").fadeTo(2000, 500).slideUp(500, function() {
            $(".alert-warning").alert('close');
        });
    };
    //hiding the tickmarkend


    //save to db
    $scope.masterother = {};

    $scope.deleteMoreMortgage = function(id) {
        $scope.anotherexistingdata.$remove(id);
    }

    $scope.createothermortgage = function(othermortgage) {
        // console.log(othermortgage);

        $scope.masterother = angular.copy(othermortgage);
        $scope.masterother.applicant_name = 'test';
        $scope.masterother.applicant_id = 1;

        var dataObj = {
            applicant_id: 0,
            repayment_type: othermortgage.repayment_type,
            lenders: othermortgage.lenders,
            mortgage_type: othermortgage.mortgage_type,
            outstanding_mortgage: othermortgage.outstanding_mortgage,
            rental_income: othermortgage.rental_income
        };

        $scope.anotherexistingdata.$add(dataObj);

        //$scope.anotherexistingdata.push(dataObj);
        $scope.customers.another_existing_mortgage = 0;

        $scope.showmeothermortgages1 = false;

        /*
        var res = $http.post('php_pages/saveothermortgage.php', dataObj);
        res.success(function (data, status, headers, config) {

            $http.post('php_pages/saveothermortgage_all.php').then(function (response) {
                $scope.othermortgage_datas = response.data;

            });
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Another Existing Mortgage saved</div>');
            $scope.hidealert();
            $scope.tickAccordion($scope.tabsStats.currentTabId);
            // $rootScope.current_tab='propertydetails';

            //save mirroring using watch
            $scope.$watch('propertydetails', function (newVal, oldVal) {
                console.log('changed');
                $scope.tabsStats.currentTabId = 'propertydetails';
            }, true);

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
		*/
        // Making the fields empty
        //  $scope.showmeothermortgages1='false';
        //$scope.othermortage_details =true;
    };

    //add button functionality
    $scope.showmeothermortgages1 = false;



    $scope.showmeothermortgages = function() {
        $scope.showmeothermortgages1 = !$scope.showmeothermortgages1;

        /*
        var state = $(this).data('state');
        state = !state;
        if (state) {
        	$scope.showmeothermortgages1 = 'true';
        } else {
        	$scope.showmeothermortgages1 = 'false';
        }
        $(this).data('state', state);
        */
    }

    //display the header type
    $scope.existingothermortgagestypes = [{ id: "1", name: 'Residential' }, { id: "2", name: 'BTL' }];

    $scope.getExistingType = function(existingid) {
        var result = "";
        angular.forEach($scope.existingothermortgagestypes, function(existingothermortgages) {

            if (existingothermortgages.id === existingid)
                result = existingothermortgages.name;
        });
        return result;
    }
});