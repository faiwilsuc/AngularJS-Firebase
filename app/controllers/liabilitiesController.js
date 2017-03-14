app.controller('LiabilitiesController', function ($firebaseObject, $firebaseArray, $scope, $http, $rootScope, $location, sessionService) {

    var liabilitiesref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/liabilities");
    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };

//  $scope.data = $firebaseObject(ref);
    var fb = $firebaseObject(ref);
    $scope.liabilityobj = $firebaseObject(ref);
    // sync as object 
    $scope.liabilitiesdata = $firebaseArray(liabilitiesref);
    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');
    (function () {
        $scope.customer = {
            property: {}
        };

        $scope.local = {
            customer: {
                property: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');
    })();

    $scope.showTyping = function (name) {
        $scope.customer = {
            liab: {}
        };

        $scope.customer.liab[name] = {
            typing: true
        };

        $scope.local.customer.liab[name] = {
            typing: true
        };
    }

    $scope.hideTyping = function (name) {
        $scope.customer = {
            liab: {}
        };

        $scope.customer.liab[name] = {
            typing: false
        };

        $scope.local.customer.liab[name] = {
            typing: false
        };
    }
    //$scope.applicant_tab=true;

    $scope.submitForm = function () {
        $scope.tickAccordion($scope.tabsStats.currentTabId);
        $scope.tabsStats.currentTabId = 'monthlyoutoging';
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
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function () {
            $location.path('/' + tabname + '');
        });
    }
//end active tab    

    if (!$scope.customers) {
        $scope.customers = {};
    }
    //active the subpanel tabs
    $scope.customers.showliabilities = true;
    $scope.customers.showPayDayLoans = false;
    $scope.customers.liabilitiesselected = true;
	$scope.customers.PayDayLoansselected = false;

    $scope.viewliabilities = function () {
        $scope.customers.showliabilities = true;
        $scope.customers.showPayDayLoans = false;
        $scope.customers.liabilitiesselected = true;
        $scope.customers.PayDayLoansselected = false;
    };

    $scope.viewPayDayLoans = function () {
        $scope.customers.showliabilities = false;
        $scope.customers.showPayDayLoans = true;
        $scope.customers.liabilitiesselected = false;
        $scope.customers.PayDayLoansselected = true;
    };

	$scope.setInitValue = function() {
		$scope.customers.dataObj = {};
		$scope.customers.dataObj.consolidate=false;
		$scope.customers.showmeliability1 = 0;
	}

//save to db
    $scope.masterlia = {};
    $scope.createliabilities = function () {

        $scope.success = false;
        $scope.masterlia = angular.copy($scope.customers.dataObj);
        //$scope.masterlia.userid = $scope.session;
        var count = Math.floor(100000 + Math.random() * 900000);
        var appindex = sessionService.get_applicantindex(1);
        // console.log("application index", appindex);
        //$scope.addliabilities($scope.customers.dataObj, $scope.customers.activeApplicant, count);
		var data = $scope.customers.dataObj;

		var liability_pushdata = {
            applicant_id: 0,
            liabilityid: count,
            balance_outstanding: data.balance_outstanding?data.balance_outstanding:0,
            card_type: data.card_type?data.card_type:0,
            consolidate: data.consolidate?data.consolidate:0,
            credit_limit: data.credit_limit?data.credit_limit:0,
            liablility_type: data.liablility_type,
            monthly_payment: data.monthly_payment?data.monthly_payment:0,
            provider: data.provider?data.provider:0,
			
			start_date: data.start_date?data.start_date:"",
			end_date: data.end_date?data.end_date:"",
			rate_of_interest: data.rate_of_interest?data.rate_of_interest:0,

            overdraft_rate: data.overdraft_rate?data.overdraft_rate:0
        };
		
        if (!$scope.customers.applicants[0]) {
            $scope.customers.applicants[0] = {};
        }

        if ($scope.customers.applicants[0].liabilities==undefined) {
            $scope.customers.applicants[0].liabilities = [];
        }
		$scope.customers.applicants[0].liabilities[count]=liability_pushdata;
        //$scope.customers.applicants["0"].liabilities.push(liability_pushdata);
        //$scope.customers[0].liabilities.push(liability_pushdata);
 /*       $scope.liabilitiesdata.$add(liability_pushdata);
		*/
		$scope.setInitValue();
    };




//save paydayloan  

    $scope.masterdata = {};

    $scope.createpaydayloan = function (extraq) {

        $scope.masterextra = angular.copy(extraq);
        var dataObj = $scope.masterextra;
        // console.log($scope.masterextra.ExtraQnID);
        var res = $http.post('php_pages/paydayloans_db.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultdetails = data;

            console.log(data);
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong>  Paydayloan saved</div>');
            $scope.hidealert();


            //$scope.customers.current_tab='monthlyoutoging';
            $scope.$watch('tabname', function (newVal, oldVal) {
                console.log('changed');
                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = 'monthlyoutoging';
            }, true);
            $http.post('php_pages/getpaydayloan.php').
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.getpaydayloans = response.data; // Show result from server in our <pre></pre> element

                    });


        });
        res.error(function (data, status, headers, config) {
            //alert( "failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty
    };

    //add benefits multiple scenarios
    $scope.addliabilities = function (data, index, count) {
        var liability_pushdata = {
            applicant_id: 0,
            liabilityid: count,
            balance_outstanding: data.balance_outstanding?data.balance_outstanding:0,
            card_type: data.card_type?data.card_type:0,
            consolidate: data.consolidate?data.consolidate:0,
            credit_limit: data.credit_limit?data.credit_limit:0,
            liablility_type: data.liablility_type,
            monthly_payment: data.monthly_payment?data.monthly_payment:0,
            provider: data.provider?data.provider:0,
			
			start_date: data.start_date?data.start_date:"",
			end_date: data.end_date?data.end_date:"",
			rate_of_interest: data.rate_of_interest?data.rate_of_interest:0,

            overdraft_rate: data.overdraft_rate?data.overdraft_rate:0
        };

		$scope.customers.showmeliability1 = 0;

        if (!$scope.customers.applicants["0"]) {
            $scope.customers.applicants["0"] = {};
        }
        if (!$scope.customers.applicants["0"].liabilities) {
            $scope.customers.applicants["0"].liabilities = [];
        }
		$scope.customers.applicants["0"].liabilities[count]=liability_pushdata;
        //$scope.customers.applicants["0"].liabilities.push(liability_pushdata);
        //$scope.customers[0].liabilities.push(liability_pushdata);
        $scope.liabilitiesdata.$add(liability_pushdata);
    };	




    $scope.add_liabilities = function () {
        var appindex = 0;
        var liability_pushdata = {
            liabilityid: '123',
            balance_outstanding: '120',
            card_type: '140',
            consolidate: 'true',
            credit_limit: '240',
            liablility_type: '6',
            monthly_payment: '',
            provider: 'test',
        };
        $scope.customers.applicants[1].liabilities.push(liability_pushdata);
        //$scope.customers[0].liabilities.push(liability_pushdata);
        console.log($scope.customers, 'pusheddata');
        //$scope.showmeliability1 = 0;


    };


    $scope.get_applicantindex = function (event, index) {

        var dat = sessionService.set_applicantindex('applicantindex', index);
    };


    //add more button click
    $scope.save_Liabilities = function (liabilitiesdata) {
        $scope.customers.showmeliability1 = 0;
        // emplomentbenifits.push(benifits);
        console.log(liabilitiesdata);

    };
    $scope.deleteLiabilities = function (allliabilities, applicantIndex) {
        var array = $.map($scope.customers.applicants[applicantIndex].liabilities, function (value, index) {
            return value;
        });
        var liablityIndex = array.indexOf(allliabilities);
        array.splice(liablityIndex, 1);
        $scope.customers.applicants[applicantIndex].liabilities = array;
    };


    //To display the header type
    $scope.liabilitiestypes = [{id: "3", name: 'Credit Card'}, {id: "7", name: 'Existing Mortgage'}, {
            id: "5",
            name: 'Mail Order'
        }, {id: "6", name: 'Overdraft'}, {id: "2", name: 'Secured Loan'}, {id: "4", name: 'Store Card'}, {
            id: "1",
            name: 'Unsecured Loan'
        }];

    $scope.getLiabilityType = function (liabilityid) {
        $scope.result = "";
        angular.forEach($scope.liabilitiestypes, function (liabilities) {
            if (liabilities.id == liabilityid)
                $scope.result = liabilities.name;
        });
        return $scope.result;
    }


//add more button function
    if (!$scope.customers) {
        $scope.customers = {};
        $scope.customers.dataObj = {}
		$scope.customers.dataObj.consolidate = false;
    }

    $scope.showmeliability = function() {
		$scope.customers.showmeliability1 = 1 - $scope.customers.showmeliability1;
		$scope.customers.dataObj = {}
		$scope.customers.dataObj.consolidate = false;
    }

	$scope.togglecollapse = function(liabilityid) {
		$scope.customers.collapseliabilities[liabilityid]=!$scope.customers.collapseliabilities[liabilityid];
	}

});
