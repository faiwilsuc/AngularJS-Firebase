// create our client controller and get access to firebase
app.controller('ApplicantController', function ($firebaseObject, $firebase, $compile, $sce, $scope, $http, $rootScope, $location) {

    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };
    //  var dbref = firebase.database().ref("applicants");

    Firebase.enableLogging(true);
    // sync as object 

    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');
    (function () {
        $scope.customer = {
            applicant: {}
        };

        $scope.local = {
            customer: {
                applicant: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');
    })();

    $scope.showTyping = function (name) {
        $scope.customer = {
            applicant: {}
        };

        $scope.customer.applicant[name] = {
            typing: true
        };

        $scope.local.customer.applicant[name] = {
            typing: true
        };
    }

    $scope.hideTyping = function (name) {
        $scope.customer = {
            applicant: {}
        };

        $scope.customer.applicant[name] = {
            typing: false
        };

        $scope.local.customer.applicant[name] = {
            typing: false
        };
    };
    $scope.isTabActive = function (tab) {
        return angular.equals($scope.customers.activeApplicant, tab);
    };
    //console.log(ref.child('applicants'));
    $scope.add_applicants_tab = function (tabvalues) {
        $scope.customers.activeTab = tabvalues;
        console.log($scope.customers.activeApplicant);
        $scope.$watch('tabvalues', function (newVal, oldVal) {
            $scope.customers.no_of_applicants = tabvalues;
            $scope.addapplicants(tabvalues);
        }, true);
    };
    
    $scope.changeTab = function (tab) {
        $scope.customers.applicants[tab].active = false;
        $scope.customers.applicants[tab - 1].active = true;
    };
    if (!$scope.customers) {
        $scope.customers = {};
    }
//    $scope.customers.activeApplicant = 1;
//    $scope.customers.applicant1Active = true;
//    $scope.customers.applicant2Active = false;
//    $scope.customers.applicant3Active = false;
//    $scope.customers.applicant4Active = false;
//    $scope.firstApplicatnt = function () {
//        $scope.customers.applicant1Active = true;
//        $scope.customers.applicant2Active = false;
//        $scope.customers.applicant3Active = false;
//        $scope.customers.applicant4Active = false;
//    };
//    $scope.secondApplicatnt = function () {
//        $scope.customers.applicant1Active = false;
//        $scope.customers.applicant2Active = true;
//        $scope.customers.applicant3Active = false;
//        $scope.customers.applicant4Active = false;
//    }
//    $scope.thirdApplicatnt = function () {
//        $scope.customers.applicant1Active = false;
//        $scope.customers.applicant2Active = false;
//        $scope.customers.applicant3Active = true;
//        $scope.customers.applicant4Active = false;
//    }
//    $scope.fourthApplicatnt = function () {
//        $scope.customers.applicant1Active = false;
//        $scope.customers.applicant2Active = false;
//        $scope.customers.applicant3Active = false;
//        $scope.customers.applicant4Active = true;
//    }
//$scope.oldsize=0;
    $scope.$watch('customers.no_of_applicants', function (newVal, oldVal) {
        if ($scope.customers) {
            $scope.customers.no_of_applicants = newVal;
            $scope.addapplicants(newVal);
        }
    }, true);

    $scope.addapplicants = function (tabvalues) {
        $scope.newsize = parseInt(tabvalues);
        $rootScope.applicants_tab_count = parseInt(tabvalues);
        if (!$scope.customers.applicants)
            $scope.customers.applicants = [];
        if (parseInt($scope.newsize) && parseInt($scope.newsize) > parseInt($scope.customers.applicants.length)) {
            console.log('oldvalue', $scope.oldsize, 'addpush');
            var value_of_i = parseInt($scope.customers.applicants.length);
            for (i = value_of_i; i < parseInt($scope.newsize); i++) {
                console.log('ivaluesare', i);
                var customers = {
                    "id": i,
                    "active": false,
                    "another_existing_mortgage": [{
                            "applicant_id": 0,
                            "lenders": "",
                            "mortgage_type": "",
                            "outstanding_mortgage": "",
                            "rental_income": "",
                            "repayment_type": ""
                        }],
                    "credit_histroy": {
                        "arrears": [{
                                "arr_applicant": "",
                                "date_incurred": "",
                                "is_clear": "",
                                "months_occurrence_12": {"no_of_occurrence": "", "occurrence_date": [""]},
                                "months_occurrence_24": {"no_of_occurrence": "", "occurrence_date": [""]},
                                "months_occurrence_36": {"no_of_occurrence": "", "occurrence_date": [""]},
                                "months_occurrence_72": {"no_of_occurrence": "", "occurrence_date": [""]},
                                "type": ""
                            }],
                        "bankrupt": [{"bank_applicant": "", "discahrged_date": "", "isdischarged": ""}],
                        "ccj": [{"amt": "3000", "ccj_applicant": "", "is_satisfied": "", "register_date": ""}],
                        "defaults": [{"amt": "5000", "def_applicant": "", "incurred_date": "", "satisfied_date": ""}],
                        "iva": [{
                                "discharge_date": "",
                                "iva_applicant": "",
                                "register_date": "",
                                "satisfactorily_conducted": ""
                            }],
                        "repossessed": [{"outstand_amt": "", "rep_applicant": "", "repossession_date": ""}]
                    },
                    "dob": "",
                    "email_address": "",
                    "emploment": {
                        "additional_income": {
                            "bedroom_rental": "",
                            "investments": "",
                            "other": "",
                            "pension": "",
                            "second_job": ""
                        },
                        "benifits": [{"benefitid": "", "benefit": "", "benefit_amt": ""}],
                        "employement_type": "3",
                        "employment": "",
                        "employment_status": "2",
                        "end_date": "",
                        "how_continous_employment": "",
                        "income_employed": {
                            "a_basic_salary": "",
                            "a_guaranteed_bonus": "",
                            "a_guaranteed_ot": "",
                            "a_regular_bonus": "",
                            "gross_a_income": "",
                            "irregular_commission": "",
                            "living_allowance": "",
                            "net_monthly_income": ""
                        },
                        "inner_tab": "",
                        "is_current_employment": "",
                        "main_employment_income": {
                            "accounts": "",
                            "current_yr_projection": "",
                            "projection": "",
                            "total_net_monthly_income": ""
                        },
                        "start_date": ""
                    },
                    "forename": "KA",
                    "gender": "",
                    "liabilities": [{
                            "liabilities_id": "",
                            "applicant_id": 0,
                            "balance_outstanding": "",
                            "card_type": "",
                            "consolidate": "",
                            "credit_limit": "",
                            "end_date": "",
                            "liablility_type": "",
                            "monthly_payment": "",
                            "provider": "",
                            "rate_of_interest": "",
                            "start_date": "",
                            "overdraft_rate": ""
                        }],
                    "marital_status ": "",
                    "middlename": "",
                    "mobile_number": "",
                    "nationality": "",
                    "rblOnVotersRoll": "",
                    "residency_proof": "",
                    "surname": "",
                    "title": "",
                    "voters_roll": "1",
                    "active_liability": false,
                    "applicants_nameliabiltiy": '',
                    'employment': {
                        is_current_employment: 0,
                        applicant_id: i
                    }
                };
                $scope.customers.applicants.push(customers);
//$scope.customers.applicants.push({active: "false",dob: "",email_address: "",forename: "",gender:"",marital_status:"",middlename:"",mobile_number:"",nationality:"",rblOnVotersRoll:"",residency_proof:"",surname:"",title:"",voters_roll:""});
            }
        } else if (parseInt($scope.newsize) < parseInt($scope.customers.applicants.length)) {
            var slice_value = parseInt($scope.customers.applicants.length) - parseInt($scope.newsize);
            $scope.customers.applicants.splice(parseInt($scope.newsize), slice_value);
        }
        $scope.oldsize = parseInt($scope.newsize);
    }


    $scope.currenttab_selection = function (tabname) {
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function () {
            $location.path('/' + tabname + '');
        });
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


    //move to next applicants in current applicant
    $scope.movetonexttab = function (applicantsdata, index) {
        if (index + 1 == $rootScope.applicants_tab_count) {
            $scope.tickAccordion($scope.tabsStats.currentTabId);
        }
        //alert('movetotnexttab');
        var fieldName = 'active';
        var fieldValue = 'savetonext';
        var tabname = 'applicants_save';
        var firstname = applicantsdata.forename;
        //$rootScope.applicants_tab_count = 0;
        //var id=parseInt(applicantsdata.id);
        var id = parseInt(index) + 1;
        var dataobj1 = $scope.customers.applicants[index];
        for (var propertyName in dataobj1) {
            if (propertyName == 'title') {
                dataobj1['forename'] = firstname;
                dataobj1['applicants_nameliabiltiy'] = firstname;
            }
        }
        $scope.customers.applicants[index] = dataobj1;
        if (fieldValue == 'savetonext') {
            if (id == $rootScope.applicants_tab_count) {
                $scope.tabsStats.currentTabId = 'employmentandincome';
            } else {
                var nexttab = parseInt(index) + 1;
            }
        }
        var dataobj = $scope.customers.applicants[nexttab];
        for (var propertyName in dataobj) {
            if (propertyName == fieldName) {
                dataobj[propertyName] = true;
            }
        }
        //$scope.$apply(function () {
        $scope.customers.applicants[nexttab] = dataobj;
        //});

    }


    //save to db
    $scope.master = {};
    $scope.createapplicant = function (applicant, index) {
        //alert('clieck');

        $scope.master = angular.copy(applicant);
        //var formid;

        //$scope.userid = $scope.session;
        var dataObj = $scope.master;

		$scope.customers.employheaders1 = true;
        $scope.customers.showques1 = false;
        $scope.customers.showincome1 = false;
        $scope.customers.showaddincome1 = false;

        $scope.customers.employpanel1selected = true;
        $scope.customers.employincomepanel1selected = false;
        $scope.customers.benefitspanel1selected = false;
        $scope.customers.addincomepanel1selected = false;

        $scope.movetonexttab(applicant, index);

        var res = $http.post('php_pages/createapplicant.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultapplicant = data;

            $scope.employment = data;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant saved</div>');
            $scope.hidealert();


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });


        // Making the fields empty

        //$scope.getapplicantdata();
    }

    //keyup detecing
    var format = "dd/mm/yyyy";
    var match = new RegExp(format
            .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
            .replace(/m|d|y/g, "\\d"));
    var replace = "$1/$2/$3$4"
            .replace(/\//g, format.match(/\W/));

    function doFormat(target) {
        target.value = target.value
                .replace(/(^|\W)(?=\d\W)/g, "$10")   // padding
                .replace(match, replace)             // fields
                .replace(/(\W)+/g, "$1");            // remove repeats
    }

    $scope.datekeyup = function (event) {
//$("input[name='birthdate']:first").keyup(function(e) {   
        if (!event.ctrlKey && !event.metaKey && (event.keyCode == 32 || event.keyCode > 46))
            doFormat(event.target)
    };


});
