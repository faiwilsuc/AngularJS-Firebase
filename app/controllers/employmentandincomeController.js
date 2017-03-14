// create our client controller and get access to firebase
app.controller('EmploymentandincomeController', function($firebaseObject, $firebaseArray, $scope, $http, $rootScope, $location, sessionService) {

    $scope.session = sessionService.get('user');


    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");

    var benefitsref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/emploment/0/benifits");


    //ng repeat data for emp tab start   
    var emp_tab = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/emploment");

    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };
    $scope.incomeTab = {
        first: boolean = true,
        second: boolean = false,
        third: boolean = false,
        forth: boolean = false,

    }
    $scope.customers = $firebaseObject(ref);
    console.log($scope.customers);
    var fb = $firebaseObject(ref);
    // sync as object 

    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');
    (function() {
        $scope.customer = {
            emp: {}
        };

        $scope.local = {
            customer: {
                emp: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            emp: {}
        };

        $scope.customer.emp[name] = {
            typing: true
        };

        $scope.local.customer.emp[name] = {
            typing: true
        };
    }

    $scope.hideTyping = function(name) {
        $scope.customer = {
            emp: {}
        };

        $scope.customer.emp[name] = {
            typing: false
        };

        $scope.local.customer.emp[name] = {
            typing: false
        };
    }
    $scope.customers.showbenefitsone1 = false;

    //var messagesRef = new Firebase('https://cdeals-8f387.firebaseio.com/customers/applicants/emploment').child('benifits');
    //var Data = $firebase(messagesRef);
    //$scope.empdata = $firebaseObject(messagesRef);
    $scope.benefitsdata = $firebaseArray(benefitsref);
    console.log('employment data', $scope.benefitsdata);

    //$scope.applicant_tab=true;

    $scope.customers.activeTab = 0;
    $scope.setActiveTabValue = function(index) {
        $scope.customers.activeTab = index;
    };
    $scope.isTabActive = function(tab) {
        return angular.equals($scope.customers.activeApplicant, tab);
    };

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


    //active tab function  
    $scope.currenttab_selection = function(tabname) {
            $scope.tabsStats.currentTabId = tabname;
            $scope.$apply(function() {
                $location.path('/' + tabname + '');
            });
        }
        //end active tab    


    //active the subpanel tabs
    $scope.customers.employpanel1selected = true;
    $scope.customers.employheaders1 = true;
    $scope.showincome1 = true;
    $scope.employincomepanel1selected = true;


    $scope.employpanel1 = function() {
        $scope.customers.employheaders1 = true;
        $scope.customers.showques1 = false;
        $scope.customers.showincome1 = false;
        $scope.customers.showaddincome1 = false;

        $scope.customers.employpanel1selected = true;
        $scope.customers.employincomepanel1selected = false;
        $scope.customers.benefitspanel1selected = false;
        $scope.customers.addincomepanel1selected = false;
    };
    $scope.employincomepanel1 = function() {

        $scope.customers.showques1 = false;
        $scope.customers.showincome1 = true;
        $scope.customers.employheaders1 = false;
        $scope.customers.showaddincome1 = false;

        $scope.customers.employpanel1selected = false;
        $scope.customers.employincomepanel1selected = true;
        $scope.customers.benefitspanel1selected = false;
        $scope.customers.addincomepanel1selected = false;
    };
    $scope.benefitspanel1 = function() {
        $scope.customers.showques1 = true;
        $scope.customers.showincome1 = false;
        $scope.customers.employheaders1 = false;
        $scope.customers.showaddincome1 = false;

        $scope.customers.employpanel1selected = false;
        $scope.customers.employincomepanel1selected = false;
        $scope.customers.benefitspanel1selected = true;
        $scope.customers.addincomepanel1selected = false;
    };
    $scope.addincomepanel1 = function() {
        $scope.customers.showaddincome1 = true;
        $scope.customers.showincome1 = false;
        $scope.customers.employheaders1 = false;
        $scope.customers.showques1 = false;

        $scope.customers.employpanel1selected = false;
        $scope.customers.employincomepanel1selected = false;
        $scope.customers.benefitspanel1selected = false;
        $scope.customers.addincomepanel1selected = true;
    };


    //save to db

    $scope.wholedata = {};
    $scope.emp_header = function(employ, index) {
        $scope.wholedata = angular.copy(employ);
        $rootScope.eEmploymentStatusIDs1 = $scope.wholedata.employement_type;
        var dataobj = $scope.wholedata;
        dataobj.userid = sessionService.get('user');
        $http.post('php_pages/employheader_db.php', dataobj).success(function(data, status) {
            if (index === 0) {
                $scope.customers.employpanel1selected = false;
                $scope.customers.benefitspanel1selected = false;

                if ($rootScope.eEmploymentStatusIDs1 == 5 || $rootScope.eEmploymentStatusIDs1 == 6) {
                    $scope.customers.addincomepanel1selected = true;
                    $scope.customers.employincomepanel1selected = false;
                } else {
                    $scope.customers.addincomepanel1selected = false;
                    $scope.customers.employincomepanel1selected = true;
                }

            } else if (index === 1) {
                $scope.customers.employpanel2selected = false;
                $scope.customers.benefitspanel2selected = false;

                if ($rootScope.eEmploymentStatusIDs1 == 5 || $rootScope.eEmploymentStatusIDs1 == 6) {
                    $scope.customers.addincomepanel2selected = true;
                    $scope.customers.employincomepanel2selected = false;
                } else {
                    $scope.customers.addincomepanel2selected = false;
                    $scope.customers.employincomepanel2selected = true;
                }

            } else if (index === 2) {
                $scope.customers.employpanel3selected = false;
                $scope.customers.benefitspanel3selected = false;

                if ($rootScope.eEmploymentStatusIDs1 == 5 || $rootScope.eEmploymentStatusIDs1 == 6) {
                    $scope.customers.addincomepanel3selected = true;
                    $scope.customers.employincomepanel3selected = false;
                } else {
                    $scope.customers.addincomepanel3selected = false;
                    $scope.customers.employincomepanel3selected = true;
                }


            } else if (index === 3) {
                $scope.customers.employpanel4selected = false;
                $scope.customers.benefitspanel4selected = false;

                if ($rootScope.eEmploymentStatusIDs1 == 5 || $rootScope.eEmploymentStatusIDs1 == 6) {
                    $scope.customers.addincomepanel4selected = true;
                    $scope.customers.employincomepanel4selected = false;
                } else {
                    $scope.customers.addincomepanel4selected = false;
                    $scope.customers.employincomepanel4selected = true;
                }

            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
            $scope.hidealert();

        });
    };
    $scope.wholedata1 = {};
    $scope.emp_annual = function(emp, index) {
        //$scope.annual=true;	tm
        $scope.wholedata1 = angular.copy(emp);
        $scope.session = 1;
        $scope.wholedata1.userid = $scope.session;
        var dataobj = $scope.wholedata1;
        dataobj.applicant_id = index;
        $http.post('php_pages/employannual_db.php', dataobj).success(function(data, status) {
            if (index === 0) {
                $scope.customers.employpanel1selected = false;
                $scope.customers.addincomepanel1selected = true;
                $scope.customers.benefitspanel1selected = false;
                $scope.customers.employincomepanel1selected = false;
            } else if (index === 1) {
                $scope.customers.employpanel2selected = false;
                $scope.customers.addincomepanel2selected = true;
                $scope.customers.benefitspanel2selected = false;
                $scope.customers.employincomepanel2selected = false;
            } else if (index === 2) {
                $scope.customers.employpanel3selected = false;
                $scope.customers.addincomepanel3selected = true;
                $scope.customers.benefitspanel3selected = false;
                $scope.customers.employincomepanel3selected = false;
            } else if (index === 3) {
                $scope.customers.employpanel4selected = false;
                $scope.customers.addincomepanel4selected = true;
                $scope.customers.benefitspanel4selected = false;
                $scope.customers.employincomepanel4selected = false;
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment Income saved</div>');
            $scope.hidealert();
        })
    };
    $scope.emp_selfemploy = function(self, index) {
        $scope.wholedata = angular.copy(self);
        $scope.wholedata.userid = $scope.session;
        var dataobj = $scope.wholedata;
        $http.post('php_pages/selfemployment_db.php', dataobj).success(function(data, status) {
            if (index === 0) {
                $scope.customers.employpanel1selected = false;
                $scope.customers.addincomepanel1selected = true;
                $scope.customers.benefitspanel1selected = false;
                $scope.customers.employincomepanel1selected = false;
            } else if (index === 1) {
                $scope.customers.employpanel2selected = false;
                $scope.customers.addincomepanel2selected = true;
                $scope.customers.benefitspanel2selected = false;
                $scope.customers.employincomepanel2selected = false;
            } else if (index === 2) {
                $scope.customers.employpanel3selected = false;
                $scope.customers.addincomepanel3selected = true;
                $scope.customers.benefitspanel3selected = false;
                $scope.customers.employincomepanel3selected = false;
            } else if (index === 3) {
                $scope.customers.employpanel4selected = false;
                $scope.customers.addincomepanel4selected = true;
                $scope.customers.benefitspanel4selected = false;
                $scope.customers.employincomepanel4selected = false;
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Self Employed saved</div>');
            $scope.hidealert();
        });
    };
    $scope.wholedata2 = {};
    $scope.emp_additional = function(add, index) {
        $scope.wholedata2 = angular.copy(add);
        $scope.session = 1;
        $scope.wholedata2.userid = $scope.session;
        var dataobj = $scope.wholedata2;
        dataobj.applicant_id = index;
        $http.post('php_pages/employadditional_db.php', dataobj).success(function(data, status) {
            if (index === 0) {
                $scope.customers.employpanel1selected = false;
                $scope.customers.addincomepanel1selected = false;
                $scope.customers.benefitspanel1selected = true;
                $scope.customers.employincomepanel1selected = false;
            } else if (index === 1) {
                $scope.customers.employpanel2selected = false;
                $scope.customers.addincomepanel2selected = false;
                $scope.customers.benefitspanel2selected = true;
                $scope.customers.employincomepanel2selected = false;
            } else if (index === 2) {
                $scope.customers.employpanel3selected = false;
                $scope.customers.addincomepanel3selected = false;
                $scope.customers.benefitspanel3selected = true;
                $scope.customers.employincomepanel3selected = false;
            } else if (index === 3) {
                $scope.customers.employpanel4selected = false;
                $scope.customers.addincomepanel4selected = false;
                $scope.customers.benefitspanel4selected = true;
                $scope.customers.employincomepanel4selected = false;
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional Income saved</div>');
            $scope.hidealert();
        })
    };
    $scope.wholedata3 = {};
    $scope.emp_benefits = function(benfits, index) {
        if (benfits == undefined) {
            $scope.tickAccordion($scope.tabsStats.currentTabId);
            $scope.tabsStats.currentTabId = 'liabilities';

            $scope.customers.showliabilities = true;
            $scope.customers.showPayDayLoans = false;
            $scope.customers.liabilitiesselected = true;
            $scope.customers.PayDayLoansselected = false;
            /*
			if (index + 1 !== $rootScope.applicants_tab_count) {
                $scope.setActiveTabValue(index + 1);
                $scope.employpanel1();
            } else {
                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = 'liabilities';
            }*/
        }
        if (benfits.length) {
            $scope.session = 1;
            $scope.wholedata3 = angular.copy(benfits);
            $scope.wholedata3.userid = $scope.session;
            $scope.wholedata3.applicantid = 1;
            var dataobj = $scope.wholedata3;
            $http.post('php_pages/employbenefits_db.php', dataobj).success(function(data, status) {
                angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits saved</div>');
                $scope.hidealert();

                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = 'liabilities';

                $scope.customers.showliabilities = true;
                $scope.customers.showPayDayLoans = false;
                $scope.customers.liabilitiesselected = true;
                $scope.customers.PayDayLoansselected = false;
            })
        } else {
            $scope.tickAccordion($scope.tabsStats.currentTabId);
            $scope.tabsStats.currentTabId = 'liabilities';

            $scope.customers.showliabilities = true;
            $scope.customers.showPayDayLoans = false;
            $scope.customers.liabilitiesselected = true;
            $scope.customers.PayDayLoansselected = false;
        }



    };


    //add benefits multiple scenarios
    $scope.benefit_count = 0;
    $scope.addbenefits = function(data, index) {
        $scope.customers.applicants[index].showMoreBenifit = false;

        var count = Math.floor(100000 + Math.random() * 900000);
        if ($scope.customers.applicants[index].benifit) {
            $scope.customers.applicants[index].benifit = {};
        }

        if (!$scope.customers.applicants[index].benifits) {
            $scope.customers.applicants[index].benifits = [];
        }
        $scope.customers.applicants[index].benifits.push({
            benefitid: count,
            benefit: data.benefit,
            benefit_amt: data.benefit_amt
        });

        if ($scope.customers.applicants[index].moreBenifit) {
            $scope.customers.applicants[index].moreBenifit = {};
        }

        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefit saved</div>');
        $scope.hidealert();

        // angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefit saved</div>');
        // $scope.hidealert();

    };


    //delete benefits
    $scope.deleteadded_benefits = function(applicantIndex, benefitsindex) {
        $scope.customers.applicants[applicantIndex].benifits.splice(benefitsindex, 1);
        $scope.customers.applicants[0].benifit = { do_you_have_benefits: 0 };
    }

    // Display the header type name in multiple scenario
    $scope.benefitstype = [{ id: "26", name: 'Child Benefit' }, { id: "13", name: 'Child Tax Credit' }, {
        id: "25",
        name: 'Court Order Maintenance'
    }, { id: "14", name: 'Disability Living Allowance' }, { id: "15", name: 'Foster Parent Income' }, {
        id: "16",
        name: 'Housing Benefit'
    }, { id: "17", name: 'Incapacity Benefit' }, { id: "18", name: 'Pension Credit' }, {
        id: "19",
        name: 'Severe Disability Allowance'
    }, { id: "20", name: 'Statutory Maternity Pay' }, { id: "21", name: 'Statutory Paternity Pay' }, {
        id: "22",
        name: 'Statutory Sick Pay'
    }, { id: "27", name: 'Widow Benefit' }, { id: "23", name: 'Working Family Tax Credits' }];

    $scope.getBenefitType = function(benefitid) {
        $scope.result = "";
        angular.forEach($scope.benefitstype, function(benefits) {

            if (benefits.id == benefitid)
                $scope.result = benefits.name;
            //            console.log($scope.result);
        });
        return $scope.result;
    }


    //add more button click		
    $scope.addMoreBenefits = function() {
        $scope.customers.showbenefitsone1 = true;
    };
    $scope.save_Benefits = function(emplomentbenifits, benifits) {
        var count = Math.floor(100000 + Math.random() * 900000);
        emplomentbenifits.push(benifits);
        benifits = {};

    };
    $scope.showAlert = function() {
        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefit saved</div>');
        $scope.hidealert();
    }

    $scope.deleteBenefits = function(applicantIndex, benefitIndex) {
        $scope.customers.applicants[applicantIndex].benifits.splice(benefitIndex, 1);
    };
    $scope.customers.showbenefitsone1 = false;
    $scope.showbenefitsone = function(index) {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.customers.showbenefitsone1 = true;
        } else {
            $scope.customers.showbenefitsone1 = false;
        }
        $(this).data('state', state);

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
            .replace(/(^|\W)(?=\d\W)/g, "$10") // padding
            .replace(match, replace) // fields
            .replace(/(\W)+/g, "$1"); // remove repeats
    }

    $scope.datekeyup = function(event) {
        //$("input[name='birthdate']:first").keyup(function(e) {   
        if (!event.ctrlKey && !event.metaKey && (event.keyCode == 32 || event.keyCode > 46))
            doFormat(event.target)
    };


});