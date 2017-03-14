// create our client controller and get access to firebase
app.controller('credithistroyController', function($firebaseObject, $firebaseArray, $scope, $http) {

    var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899");
    var totalref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy");
    var config = {
        apiKey: "AIzaSyDPqELrk7wAGT7XZrTnHKtuvur40yIpSb4",
        authDomain: "cdeals-8f387.firebaseapp.com",
        databaseURL: "https://cdeals-8f387.firebaseio.com"
    };
    $scope.customers = $firebaseObject(ref);

    $scope.applicants = $firebaseObject(totalref);

    var fb = $firebaseObject(ref);
    // sync as object 

    var syncObject = $firebaseObject(ref);

    // three way data binding
    syncObject.$bindTo($scope, 'customers');


    //$scope.applicant_tab=true;

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

    $scope.submitCreditHistory = function() {
        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Credit History saved</div>');
        $scope.hidealert();
        $scope.tickAccordion($scope.tabsStats.currentTabId);
        $scope.tabsStats.currentTabId = 'additionalnotes';
    }


    $scope.currenttab_selection = function(tabname) {
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function() {
            $location.path('/' + tabname + '');
        });
    }
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

    //get month and dates for arrears
    $scope.getmonth = function($event) {

        var dayspermonth = [];

        var ID = $($event.target).data('value');
        var panelID1 = $($event.target).data('panel1');
        var panelID2 = $($event.target).data('panel2');


        var getmonths = ID.substr(0, 3);
        var getyears = ID.substr(5, 9);

        var month = new Array();

        month['Jan'] = "1";
        month['Feb'] = "2";
        month['Mar'] = "3";
        month['Apr'] = "4";
        month['May'] = "5";
        month['Jun'] = "6";
        month['Jul'] = "7";
        month['Aug'] = "8";
        month['Sep'] = "9";
        month['Oct'] = "10";
        month['Nov'] = "11";
        month['Dec'] = "12";

        var n = month[getmonths];
        console.log(n);
        console.log(getyears);
        daysInMonth(n, getyears);

        function daysInMonth(month, year) {
            var datespermonth = new Date(year, month, 0).getDate();
            var cumonth = new Date(year, month, 0).getMonth() + '/' + new Date(year, month, 0).getFullYear();
            var frommonth = new Date().getMonth() + '/' + new Date().getFullYear();
            console.log(cumonth);
            console.log(frommonth);
            if (cumonth === frommonth) {
                var datespermonth = new Date().getDate();
            }
            for (var i = 1; i <= datespermonth; i++) {
                dayspermonth.push(i);
                // return i;
            }
        }

        if (!isEmpty(panelID1) || !isEmpty(panelID2)) {
            $scope[panelID1] = 'ng-hide';
            $scope[panelID2] = 'ng-show';
            //$scope.customshow =[];
            // $scope.customshow.pop('ng-hide');
            console.log($scope[panelID1]);
        }

        $scope.dayspermonth = dayspermonth;
        $scope.monthyear = ID;
        console.log($scope.dayspermonth);
        //var index=1;


    };

    $scope.getdays = function($event) {

        var getdays = $($event.target).data('value');
        $scope.days = getdays;
        var panelID1 = $($event.target).data('panel1');
        if (!isEmpty(panelID1)) {
            $scope[panelID1] = 'ng-hide';
            console.log($scope[panelID1]);

        }


    };


    $scope.showdates = function($event) {
        var index = 1;
        var panel1 = $($event.target).data('panel1');

        var panel2 = $($event.target).data('panel2');
        if (!isEmpty(panel1) || !isEmpty(panel2)) {

            $scope[panel1] = 'ng-show';
            $scope[panel2] = 'ng-show';
            console.log($scope[panel2]);

        }

    };


    var unique = function(origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x] === newArr[y]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }

    var today = new Date();
    var today24 = new Date();
    var today36 = new Date();
    var today72 = new Date();
    today.setMonth(today.getMonth() - 12);
    today24.setMonth(today24.getMonth() - 24);
    today36.setMonth(today36.getMonth() - 36);
    today72.setMonth(today72.getMonth() - 72);

    var date = new Date();
    var months = [],
        months24 = [],
        months36 = [],
        months72 = [],
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    for (var i = 0; i < 12; i++) {
        months.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months = unique(months);

    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (var i = 0; i < 12; i++) {
        months24.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months24 = unique(months24);

    var date = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());
    for (var i = 0; i < 12; i++) {
        months36.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months36 = unique(months36);

    var date = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());
    for (var i = 0; i < 36; i++) {
        months72.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months72 = unique(months72);


    $scope.tre = today;

    $scope.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    $scope.minDate24 = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());
    $scope.maxDate24 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    $scope.minDate36 = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());
    $scope.maxDate36 = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());

    $scope.minDate72 = new Date(today72.getFullYear(), today72.getMonth(), today72.getDate());
    $scope.maxDate72 = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.toggleMin = function() {
        $scope.maxDate = $scope.maxDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];


    $http.get('map.xml').success(function(data) {
        $scope.fields = data.fields.fieldlist;
        console.log($scope.fields);
    });

    //end here	


    //save to db

    //add more button scenarios functions //

    var ccjref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy/ccj");

    $scope.credithistroy_ccj_length = $firebaseArray(ccjref);
    $scope.addcredithistroy_ccj = function(data, index, count) {
        // console.log(data);
        var dataobj = {
            ccj_id: count,
            applicant_id: index,
            amt: data.ccj_amt,
            is_satisfied: data.is_satisfied,
            // register_date: data.ccj_register_date,
            satisfied_date: data.satisfied_date
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.ccj) {
            $scope.customers.applicants[0].credit_histroy.ccj = [];
        }
        $scope.customers.applicants[0].credit_histroy.ccj.push(dataobj);
        $scope.showmeccj1 = 'false';
    };

    $scope.deleteadded_ccj = function(credithistroyindex) {
        //console.log(appindex,credithistroyindex);
        $scope.customers.applicants[0].credit_histroy.ccj.splice(credithistroyindex, 1);

        $scope.customers.do_you_have_ccj = 0;
    }

    $scope.updateccj = function(ccj, index) {
        $scope.customers.applicants[0].credit_histroy.ccj[index] = ccj;
        
    };

    $scope.showmeccj1 = 'false';
    $scope.showmeccj = function() {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeccj1 = 'true';
        } else {
            $scope.showmeccj1 = 'false';
        }
        $(this).data('state', state);
    }

    //end add more scenarios functions//

    $scope.masterccj = {};

    $scope.createccj = function(ccj) {

        // console.log(ccj);

        $scope.masterccj = angular.copy(ccj);

        $scope.masterccj.applicantid = 'test3';
        $scope.masterccj.applicant_id = '1';
        $scope.applicantid = 'test';

        var dataObj = $scope.masterccj;
        var index = 0;
        var count = Math.floor(100000 + Math.random() * 900000);
        $scope.addcredithistroy_ccj(ccj, index, count);
        var res = $http.post('php_pages/saveccj.php', dataObj);
        res.success(function(data, status, headers, config) {

            $http.post('php_pages/saveccj_data.php').then(function(response) {
                $scope.ccjresults = response.data;
                //get the saved datas

            });
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Ccj saved</div>');
            $scope.hidealert();
            //$scope.showmeccj1 = 'false';// this is to hide the yes or no question
        });


        res.error(function(data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({ data: data }));
        });

        // Making the fields empty


    };

    $scope.createarrears = function(data) {


        var dataobj = {
            defaults_id: 0,
            applicant_id: 0,
            type: data.type,
            date_incurred: data.date_incurred,
            num12: data.num12,
            arrearss: data.arrearss,
            satisfied_date: data.satisfied_date
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.arrears) {
            $scope.customers.applicants[0].credit_histroy.arrears = [];
        }
        $scope.customers.applicants[0].credit_histroy.arrears.push(dataobj);
        $scope.showmeDefaults1 = 'false';
        $scope.hidealert();

        $scope.showmeArrears1 = false;
    };


    //add more button scenarios functions //

    var defaultsref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy/defaults");

    $scope.credithistroy_default_length = $firebaseArray(defaultsref);
    $scope.addcredithistroy_defaults = function(data, index, count) {
        var dataobj = {
            defaults_id: 0,
            applicant_id: 0,
            default_amt: data.default_amt,
            incurred_date: data.incurred_date,
            satisfied_date: data.satisfied_date
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.defaults) {
            $scope.customers.applicants[0].credit_histroy.defaults = [];
        }
        $scope.customers.applicants[0].credit_histroy.defaults.push(dataobj);
        $scope.showmeDefaults1 = 'false';
        $scope.hidealert();
    };

    $scope.deletedefault = function(index) {
        $scope.customers.applicants[0].credit_histroy.defaults.splice(index, 1);

        $scope.customers.do_you_have_defaults = 0;
    }

    $scope.deletearea = function(index) {
        $scope.customers.applicants[0].credit_histroy.arrears.splice(index, 1);

        $scope.customers.do_you_have_arrears = 0;
    }

    $scope.deleteadded_defaults = function(credithistroyindex) {
        $scope.customers.applicants[0].credit_histroy.defaults.splice(credithistroyindex, 1);
    }
     $scope.updatedefaults = function(defaults,$index) {

        $scope.customers.applicants[0].credit_histroy.defaults[index] = defaults;
    };
    $scope.showmeDefaults1 = 'false';
    $scope.showmeDefaults = function() {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeDefaults1 = 'true';
        } else {
            $scope.showmeDefaults1 = 'false';
        }
        $(this).data('state', state);

    }


    $scope.showmeArrears = function() {

            var state = $(this).data('state');
            state = !state;
            if (state) {
                $scope.showmeArrears1 = 'true';
            } else {
                $scope.showmeArrears1 = 'false';
            }
            $(this).data('state', state);

        }
        //end add more scenarios functions//


    $scope.masterdefaults = {};


    $scope.createdefaults = function(defaults) {


        $scope.masterdefaults = angular.copy(defaults);
        $scope.masterdefaults.applicantid = 'test2';
        $scope.masterdefaults.applicant_id = '1';


        var dataObj = $scope.masterdefaults;


        console.log($scope.masterdefaults);
        var index = 0;
        //var appindex = sessionService.get_applicantindex('applicantindex');
        var count = Math.floor(100000 + Math.random() * 900000);
        $scope.addcredithistroy_defaults(defaults, index, count);

        /*var res = $http.post('php_pages/savedefaults.php', dataObj);
         res.success(function(data, status, headers, config) {
         
         
         $http.post('php_pages/savedefault_data.php').then(function (response) {
         $scope.defaultresults = response.data;
         //get saved data response
         
         });
         
         angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Defaults saved</div>');
         $scope.hidealert();
         // $scope.showmeDefaults1 = 'false';  //this is to hide the yes or no question
         
         
         
         });
         res.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
         });*/


        // Making the fields empty

    };


    //add more button scenarios functions //
    var bankruptref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy/bankrupt");

    $scope.credithistroy_bankrupt_length = $firebaseArray(bankruptref);
    $scope.addcredithistroy_bankrupt = function(data, index, count) {
        var dataobj = {
            bankrupt_id: count,
            applicant_id: index,
            discahrged_date: data.discahrged_date,
            isdischarged: data.isdischarged
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.bankrupt) {
            $scope.customers.applicants[0].credit_histroy.bankrupt = [];
        }
        $scope.customers.applicants[0].credit_histroy.bankrupt.push(dataobj);
        $scope.showmeBankrupts1 = 'false';
    };

    $scope.deleteadded_bankrupt = function(credithistroyindex) {
        $scope.customers.applicants[0].credit_histroy.bankrupt.splice(credithistroyindex, 1);

        $scope.customers.do_you_have_bankrupt = 0;
    }


    $scope.deleteadded_iva = function(credithistroyindex) {
        $scope.customers.applicants[0].credit_histroy.iva.splice(credithistroyindex, 1);

        $scope.customers.do_you_have_iva = 0;
    }

    $scope.showmeBankrupts1 = 'false';
    $scope.showmeBankrupts = function() {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeBankrupts1 = 'true';
        } else {
            $scope.showmeBankrupts1 = 'false';
        }
        $(this).data('state', state);
    }

    //end add more scenarios functions//


    $scope.masterBankruptcy = {};


    $scope.createBankruptcy = function(Bankruptcy) {
        
        $scope.masterBankruptcy = angular.copy(Bankruptcy);
        $scope.masterBankruptcy.applicantid = 'test1';
        $scope.masterBankruptcy.applicant_id = 1;
        $scope.applicantid = 1;

        var dataObj = $scope.masterBankruptcy;


        // console.log($scope.masterBankruptcy);
        var index = 0;
        var count = Math.floor(100000 + Math.random() * 900000);
        //var appindex = sessionService.get_applicantindex('applicantindex');
        $scope.addcredithistroy_bankrupt(Bankruptcy, index, count);

        /*var res = $http.post('php_pages/saveBankruptcy.php', dataObj);
         res.success(function(data, status, headers, config) {
         
         $http.post('php_pages/savebankruptacy_data.php').then(function (response) {
         $scope.bankruptacyresults = response.data;
         
         });
         
         angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Bankruptcy saved</div>');
         $scope.hidealert();
         //  $scope.showmeBankrupts1 = 'false'; //this is to hide the yes or no question
         
         
         });
         res.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
         });	*/

        // Making the fields empty


    };


    //add more button scenarios functions //
    var ivaref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy/iva");

    $scope.credithistroy_iva_length = $firebaseArray(ivaref);
    $scope.addcredithistroy_iva = function(data, index, count) {
    
           console.log(data);
        var dataobj = {
            iva_id: 0,
            applicant_id: 0,
            iva_discharge_date: data.iva_discharge_date,
            iva_register_date: data.iva_register_date,
            satisfactorily_conducted: data.is_satisfied
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.iva) {
            $scope.customers.applicants[0].credit_histroy.iva = [];
        }
        $scope.customers.applicants[0].credit_histroy.iva.push(dataobj);
        $scope.showmeIVAs1 = 'false';
    };

    $scope.deleteaed_iva = function(credithistroyindex) {
        $scope.customers.applicants[0].credit_histroy.iva.splice(credithistroyindex, 1);
    }

    $scope.showmeIVAs1 = 'false';
    $scope.showmeIVAs = function() {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeIVAs1 = 'true';
        } else {
            $scope.showmeIVAs1 = 'false';
        }
        $(this).data('state', state);
    }

    //end add more scenarios functions//


    $scope.masteriva = {};

    $scope.createiva = function(iva) {

        $scope.masteriva = angular.copy(iva);

        $scope.masteriva.applicantid = 'test';
        $scope.masteriva.applicant_id = 1;

        var dataObj = $scope.masteriva;
          console.log($scope.masteriva );
        var index = 0;
        var count = Math.floor(100000 + Math.random() * 900000);
        //var appindex = sessionService.get_applicantindex('applicantindex');
        $scope.addcredithistroy_iva(iva, index, count);

        /*var res = $http.post('php_pages/saveiva.php', dataObj);
         res.success(function(data, status, headers, config) {
         
         $http.post('php_pages/saveiva_data.php').then(function (response) {
         $scope.ivaresults = response.data;
         
         //get saved datas
         });
         
         angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Iva saved</div>');
         $scope.hidealert();
         // $scope.showmeIVAs1 = 'false'; //this is to hide the yes or no question
         });
         res.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
         });	*/
        // Making the fields empty


    };


    //add more button scenarios functions //
    var reposessionref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/applicants/0/credit_histroy/iva");

    $scope.credithistroy_reposession_length = $firebaseArray(reposessionref);
    $scope.addcredithistroy_reposession = function(data, index, count) {

        var dataobj = {
            reposession_id: 0,
            applicant_id: 0,
            repossess_outstand_amt: data.repossess_outstand_amt,
            repossession_date: data.repossession_date
        };
        if (!$scope.customers.applicants[0].credit_histroy) {
            $scope.customers.applicants[0].credit_histroy = {};
        }
        if (!$scope.customers.applicants[0].credit_histroy.repossessed) {
            $scope.customers.applicants[0].credit_histroy.repossessed = [];
        }
        $scope.customers.applicants[0].credit_histroy.repossessed.push(dataobj);
        $scope.showmepossesseds1 = 'false';

        $scope.customers.do_you_have_repossession = 0;
    };

    $scope.deleteadded_reposession = function(credithistroyindex) {
        $scope.customers.applicants[0].credit_histroy.repossessed.splice(credithistroyindex, 1);
    }
     $scope.updaterepossessed = function(repossessed, index) {
         alert("adfadf0");
        $scope.customers.applicants[0].credit_histroy.repossessed[index] = repossessed;
    };
    $scope.showmepossesseds1 = 'false';
    $scope.showmepossesseds = function() {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmepossesseds1 = 'true';
        } else {
            $scope.showmepossesseds1 = 'false';
        }
        $(this).data('state', state);
    }

    //end add more scenarios functions//

    $scope.masterRepossession = {};

    $scope.createRepossession = function(Repossession) {


        $scope.masterRepossession = angular.copy(Repossession);
        $scope.masterRepossession.applicantid = 'test';

        $scope.masterRepossession.applicant_id = 1;

        var dataObj = $scope.masterRepossession;


        console.log($scope.masterRepossession);
        var index = 0;
        var count = Math.floor(100000 + Math.random() * 900000);
        //var appindex = sessionService.get_applicantindex('applicantindex');
        $scope.addcredithistroy_reposession(Repossession, index, count);

        /*var res = $http.post('php_pages/saveRepossession.php', dataObj);
         res.success(function(data, status, headers, config) {
         
         $http.post('php_pages/saverepossession_data.php').then(function (response) {
         $scope.repossessionresults = response.data;
         
         //get saved data to db
         });
         angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Repossession saved</div>');
         $scope.hidealert();
         
         // $scope.showmepossesseds1 = 'false';  //this is to hide the yes or no question
         
         });
         res.error(function(data, status, headers, config) {
         alert( "failure message: " + JSON.stringify({data: data}));
         });	*/


    };


});