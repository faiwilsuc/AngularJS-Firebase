app.controller('sourcingController', function ($firebaseObject, $scope, $http, $rootScope, $location, $filter, $window, filteredListService, filterFilter) {


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
    (function () {
        $scope.customer = {
            emp: {}
        };

        $scope.local = {
            customer: {
                emp: {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');
        ;
    })();

    $scope.showTyping = function (name) {
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

    $scope.hideTyping = function (name) {
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



    $scope.sourcingback = function () {
        $location.path('/consultantdashboard');
    }

    $scope.loader = {
        loading: false,
    };

    if (!$scope.customers) {
        $scope.customers = {};
    }

    $scope.customers.showAllProduct = true;
    $scope.customers.showFaildProduct = false;
    $scope.customers.showShortListProduct = false;

    $scope.allProduct = function () {
        $scope.customers.showAllProduct = true;
        $scope.customers.showFaildProduct = false;
        $scope.customers.showShortListProduct = false;
    };

    $scope.failedProduct = function () {
        $scope.customers.showAllProduct = false;
        $scope.customers.showFaildProduct = true;
        $scope.customers.showShortListProduct = false;
    };

    $scope.shortlistProduct = function () {
        $scope.customers.showAllProduct = false;
        $scope.customers.showFaildProduct = false;
        $scope.customers.showShortListProduct = true;
    };

    $scope.limit = 5;
    $scope.checked = 0;
    $scope.customers.compareList = [];
    $scope.showCompareList = false;


    $scope.checkChanged = function (item) {
        if (!$scope.customers.compareList) {
            $scope.customers.compareList = [];
        }
        if (item.checkbox) {
            $scope.customers.compareList.push(item);
            $scope.checked++;
        } else {
            $scope.checked--;
            $scope.customers.compareList.forEach(function (compareListItem, index) {
                if (compareListItem.ProductID == item.ProductID) {
                    $scope.customers.compareList.splice(index, 1);
                    return false;
                }
            });
        }
    }

    $scope.resetCompare = function () {
        $scope.checked = 0;
        $scope.customers.compareList.forEach(function (compareListItem, index) {
            compareListItem.checkbox = false;
        });
        $scope.customers.compareList = [];
    }

    $scope.showCompare = function () {
        $scope.showCompareList = true;
        $scope.shortlistProduct();
    };

    $scope.hideCompare = function () {
        $scope.showCompareList = false;
    }

    //$scope.post_data_toapi=function ()
    //{
    $scope.sourcenow = true;
    //$scope.post_data_toapi();
    $scope.loader.loading = true;
    $scope.showeditpanel = false;
    $scope.sourcing = false;
    $scope.loader.sourceloading = true;
    $scope.success = false;

    $scope.ff = {
        UserID: '68',
        eCaseStatusID: '1',
        ModifiedBy: '68'
    }

    var dataObj = $scope.ff;
    var res = $http.post('php_pages/createff.php', dataObj);
    res.success(function (data, status, headers, config) {

        $scope.showffid = data;
        $scope.appid = data;
        $scope.applicant = data;
        $scope.expenditure = data;
        $scope.liabilities = data;
        $scope.othermortgage = data;
        $scope.extraq = data;
        $scope.ccj = data;
        $scope.arrears = data;
        $scope.defaults = data;
        $scope.Bankruptcy = data;
        $scope.iva = data;
        $scope.Repossession = data;
        $scope.Address = data;
        $rootScope.FFID = data.FFID;
        $scope.success = true;
        console.log(data);


        $('.panel-collapse').collapse('hide');

        console.log('ffidfordatapost', $rootScope.FFID);
        $scope.masterid = {};
        $scope.masterid.FFID = $rootScope.FFID;


        var dataObj1 = $scope.masterid;
        var res = $http.post('php_pages/createapp.php', dataObj1);
        res.success(function (data, status, headers, config) {
            $scope.resultapp = data;

            $scope.success = true;
            console.log(data);

        });

        var dataObj1 = $scope.masterid;
        var res = $http.post('php_pages/Createmeetingaims.php', dataObj1);
        res.success(function (data, status, headers, config) {
            $rootScope.MeetingAimsID = data.MeetingAimsID;

            $scope.success = true;
            console.log($rootScope.MeetingAimsID);
            // $scope.loader.loading = false ;

        });


        var dataObj1 = $scope.masterid;
        var res = $http.post('php_pages/GetAppid.php', dataObj1);
        res.success(function (data, status, headers, config) {
            $scope.cmortgage = data;
            $rootScope.appids = data.Appid;
            //  $rootScope.appids = angular.copy($scope.test);
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.ffloading = false;
            $scope.showeditpanel = true;

            //start mortage requirements
            $scope.mastercmortgage = {};


            $scope.loader.cmortgageloading = true;

            $scope.success = false;
            $scope.mastercmortgage = angular.copy($scope.cmortgage);
            $scope.mastercmortgage.FFID = $rootScope.FFID;
            $scope.mastercmortgage.Appid = $rootScope.appids;
            var dataObj = $scope.mastercmortgage;
            var res = $http.post('php_pages/cmortgage_api.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.messages = data;
                $scope.messages.MortgageID = data;
                $scope.success = true;
                console.log(data);
                console.log($scope.messages.MortgageID);
                //  $scope.loader.loading = false ;

                $scope.mastercmortgageapp = {};

                $scope.mastercmortgageapp.Appid = $rootScope.appids;
                $scope.mastercmortgageapp.FFID = $rootScope.FFID;
                $scope.mastercmortgageapp.MortAppID = $rootScope.MortAppIDs;

                var dataObj = $scope.mastercmortgageapp;
                console.log($scope.mastercmortgageapp);
                var res = $http.post('php_pages/cmortgageapp_api.php', dataObj);
                res.success(function (data, status, headers, config) {
                    $scope.messages = data;
                    $scope.success = true;
                    console.log(data);
                    $scope.loader.cmortgageloading = false;

                    $http.post('php_pages/GetMortAppDetails.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element
                                console.log($scope.GetMortAppDetails);
                            });
                });

            });
            res.error(function (data, status, headers, config) {
                console.log("failure message: " + JSON.stringify({data: data}));
            });
            // Making the fields empty


        });



        // Making the fields empty

        $scope.FFID = $rootScope.FFID;
        //alert('ffidtotest',$rootScope.FFID);
        var dataObj = $scope.master;
        console.log('apidata', dataObj);
        var res = $http.post('php_pages/getapplicant_api.php', {"data": $scope.FFID});
        res.success(function (data, status, headers, config) {
            $scope.resultapplicant = data;
            $scope.employment = data;
            $scope.ClientID = data.ClientID;
            $rootScope.ClientIDs = data.ClientID;
            //$scope.resultapp = thedata;
            $scope.success = true;
//            console.log(data);
//            $scope.reset();

        });
        $scope.appclients = {};
        $scope.appclients.FFID = $rootScope.FFID;
        $scope.appclients.AppID = $rootScope.appids;
        $scope.appclients.ClientID = $rootScope.ClientIDs;
        var dataObjapp = $scope.appclients;
        console.log($scope.appclients);
        var res = $http.post('php_pages/createAppClients.php', dataObjapp);
        res.success(function (data, status, headers, config) {
            $scope.resultapplicents = data;

        });

        var res = $http.post('php_pages/GetClientListByAppid.php', dataObjapp);
        res.success(function (response, status, headers, config) {
            $scope.resultclientresult = response.data;
            console.log($scope.resultclientresult);


        });

        $http.post('php_pages/getapplicant.php', {"data": $rootScope.FFID}).
                success(function (response, status) {
                    console.log(response.data);

                    $scope.status = status;
                    //  $scope.data = data;
                    $scope.result = response.data; // Show result from server in our <pre></pre> element
                    $scope.employment = response.data;
                    if (response.data && response.data.length) {
                        $rootScope.ClientID1 = response.data[0].ClientID;
                        $rootScope.Clientname = response.data[0].Firstname;
                        $scope.employment1 = {};
                        $scope.employment1.ClientID = $rootScope.ClientID1;
                        $scope.employment1.FFID = $rootScope.FFID;

                        $rootScope.ClientID2 = response.data[1].ClientID;
                        $scope.employment2 = {};
                        $scope.employment2.ClientID = $rootScope.ClientID2;
                        $scope.employment2.FFID = $rootScope.FFID;

                        $rootScope.ClientID3 = response.data[2].ClientID;
                        $scope.employment3 = {};
                        $scope.employment3.ClientID = $rootScope.ClientID3;
                        $scope.employment3.FFID = $rootScope.FFID;

                        $rootScope.ClientID4 = response.data[3].ClientID;
                        $scope.employment4 = {};
                        $scope.employment4.ClientID = $rootScope.ClientID4;
                        $scope.employment4.FFID = $rootScope.FFID;
                    }
                });

        $scope.loader.applicantloading = false;


        res.error(function (data, status, headers, config) {
            $scope.loader.loading = false;
        });

        $scope.mastere = {};


        $scope.loader.eheaderloading = true;

        $scope.success = false;


        var dataObj = $rootScope.FFID;
        var res = $http.post('php_pages/createEmploymentheader.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employdetails1 = data;
            $scope.selfemploye1 = data;
            $scope.incomeother1 = data;
            $scope.benefits1 = data;
            $rootScope.EmploymentHeaderIDs1 = data.EmploymentHeaderID;
            $rootScope.EmpFullStatuss1 = data.EmpFullStatus;
            $rootScope.EmpSelfCertifications1 = data.EmpSelfCertification;
            $rootScope.MinEmployments1 = data.MinEmployment;
            $rootScope.ehClientID1 = data.ClientID;


            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.eheaderloading = false;

            $scope.mastered = {};
            $scope.mastered.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs1;
            $scope.mastered.eEmploymentStatusID = $rootScope.eEmploymentStatusIDs1;
            $scope.mastered.StartDate = $rootScope.StartDates1;
            $scope.mastered.EndDate = $rootScope.EndDates1;
            $scope.mastered.CurrentEmployment = $rootScope.CurrentEmployments1;

            console.log($scope.mastered);

            var dataObj = $scope.mastered;
            var res = $http.post('php_pages/createemploydetails.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.employincome1 = data;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.edetailsloading = false;

                $http.post('php_pages/GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data;
                            $scope.employdetails1 = response.data;
                            $scope.employdesc1 = response.data; // Show result from server in our <pre></pre> element
                            console.log($scope.employdesc1);
                        });


                $http.post('php_pages/GetByEmploymentHeaderID.php', {
                    "FFID": $rootScope.FFID,
                    "ClientID": $rootScope.ehClientID1
                }).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data;
                            $scope.employheader1 = response.data; // Show result from server in our <pre></pre> element

                            console.log($scope.employheader1);

                            $scope.addemploy1header = 'false';
                            $scope.editemploy1header = 'true';
                        });


            });
            res.error(function (data, status, headers, config) {
                console.log("failure message: " + JSON.stringify({data: data}));
                $scope.loader.loading = false;
            });
            // Making the fields empty


        });


        //post method for  income other
        $scope.masterincomeother = {};


        $scope.loader.edetailsloading = true;

        $scope.success = false;


        var res = $http.post('php_pages/saveicomeother.php');
        res.success(function (data, status, headers, config) {
            $scope.OtherIncomeID = data.OtherIncomeID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.OtherIncomeID);
            $scope.loader.edetailsloading = false;

            $http.post('php_pages/GetIncomeOtherByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.GetIncomeOther1 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetIncomeOther1);

                        $scope.addincomeother1header = 'false';
                        $scope.editincomeother1 = 'true';
                    });


        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty


        $scope.masterbenefits = {};


        $scope.loader.edetailsloading = true;

        $scope.success = false;
        var res = $http.post('php_pages/savebenefits.php');
        res.success(function (data, status, headers, config) {
            $scope.IncomeBenefitID = data.IncomeBenefitID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.IncomeBenefitID);
            $scope.loader.edetailsloading = false;

            $http.post('php_pages/GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.GetAllIncomeBenefits1 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits1);
                    });

        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty

        $scope.callid = function () {
            alert('callerid');
        }

        $scope.applicant_liabilities = function (index, applicantname) {
            alert('cliekingalert');
            //console.log('checkformdaa',$scope.applicants_fullname1[dataindex]);
            var dataobj = $scope.applicants_fullname1[index];
            var fieldname = 'selected';
            console.log('getselectedapplicantdata', dataobj);
            for (var propertyName in dataobj) {
                if (propertyName == fieldname) {
                    console.log('conditina satisfied');
                    dataobj[propertyName] = true;
                }
            }
            console.log('checkedvalues', dataobj);
            $scope.applicants_fullname1[index] = dataobj;
            console.log('applicantsnamecheck', $scope.applicants_fullname1);

        }


        //liability


        //end  liabilities

        //start monthly outgoing
        $scope.masters = {};


        $scope.success = false;

        $scope.masters.FFID = $rootScope.FFID;
        var dataObj = $scope.masters;
        var res = $http.post('php_pages/saveexpenditures_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            $scope.messages.ExpenditureID = data;

            console.log($scope.messages.ExpenditureID);

        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty

        //end monthly outgoing



        $scope.masterother = {};


        $scope.success = false;


        $rootScope.ClientID = $scope.masterother.testing;
        $scope.text = $rootScope.ClientID;

        console.log($scope.masterother);
        console.log($scope.text);

        var dataObj = $scope.masterother;
        var res = $http.post('php_pages/saveothermortgage_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);

            $scope.othermor.existing = '0';
            $rootScope.OtherMortID = data.OtherMortID;

            if (($scope.selectedClientID.othermortgage[0]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[0];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }
            if (($scope.selectedClientID.othermortgage[1]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[1];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

            }
            if (($scope.selectedClientID.othermortgage[2]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[2];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

            }


        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


        $scope.masterp = {};


        $scope.success = false;
        $scope.masterp.FFID = $rootScope.FFID;
        var dataObj = $scope.masterp;
        var res = $http.post('php_pages/saveproperty_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.AddressID = data.AddressID;
            $scope.success = true;
            console.log(data);
            console.log($scope.AddressID);


            $http.post('php_pages/getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                    });


        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty

        $scope.masterp.FFID = $rootScope.FFID;
        var dataObj = $scope.masterp;
        var res = $http.post('php_pages/saveextraq.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultextraq = data;
            //$scope.resultapp = thedata;
            console.log(data);
            $scope.loader.extraqloading = false;
            $scope.sourcing = true;

            $scope.addextraq = false;
            $scope.editextraq = true;

            $http.post('php_pages/getextraq.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.getextraq = response.data; // Show result from server in our <pre></pre> element
                    });

        });


        $scope.masterccj = {};


        $scope.masterccj.FFID = $rootScope.FFID;
        var dataObj = $scope.masterccj;

        var res = $http.post('php_pages/saveccj_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ;
            $rootScope.CreditHistoryID = data.CreditHistoryID;

            $scope.ccjs.existing = '0';


            if (($scope.selectedClientID.ccj[0]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[0];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                    $http.post('php_pages/getccj.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getccj = response.data; // Show result from server in our <pre></pre> element
                                console.log($scope.getccj);
                            });
                });

            }
            if (($scope.selectedClientID.ccj[1]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[1];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                });

            }

            if (($scope.selectedClientID.ccj[2]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[2];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                });

            }

        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


        $scope.masterarrears = {};


        $scope.masterarrears.FFID = $rootScope.FFID;

        var dataObj = $scope.masterarrears;

        console.log($scope.masterarrears);
        console.log($scope.text);

        $rootScope.NumOccurences = $scope.masterarrears;

        var res = $http.post('php_pages/savearrears_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ;
            $rootScope.ArrDefID = data.ArrDefID;
            $scope.arrearss.existing = '0';


            if (($scope.selectedClientID.arrears[0]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[0];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/getarrears.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getarrears = response.data; // Show result from server in our <pre></pre> element
                            });


                });

            }
            if (($scope.selectedClientID.arrears[1]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[1];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.arrears[2]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[2];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            $scope.NumOccurences = {}
            $scope.NumOccurences = $rootScope.NumOccurences;
            $scope.NumOccurences.ArrDefID = $rootScope.ArrDefID;


            var dataObj = $scope.NumOccurences;
            var res = $http.post('php_pages/NumOccurences.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.NumOccurences = data;
                $scope.success = true;
                console.log(data);
            });

            $http.post('php_pages/getNumOccurences.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;
                        $scope.getNumOccurences = response.data; // Show result from server in our <pre></pre> element
                    });


        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


        $scope.masterdefaults = {};

        $scope.success = false;

        $scope.masterdefaults.FFID = $rootScope.FFID;
        var dataObj = $scope.masterdefaults;

        var res = $http.post('php_pages/savedefaults_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            // $scope.loader.loading = false ;
            $rootScope.ArrDefID = data.ArrDefID;
            $scope.Defaults.existing = '0';


            if (($scope.selectedClientID.defaults[0]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[0];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/getdefaults.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getDefaults = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }
            if (($scope.selectedClientID.defaults[1]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[1];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.defaults[2]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[2];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });


        $scope.masterBankruptcy = {};


        $scope.success = false;

        //$rootScope.ClientID = $scope.masterBankruptcy.testing;
        //$scope.text = $rootScope.ClientID;
        $scope.masterBankruptcy.FFID = $rootScope.FFID;

        var dataObj = $scope.masterBankruptcy;


        console.log($scope.masterBankruptcy);
        console.log($scope.text);

        var res = $http.post('php_pages/saveBankruptcy_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //  $scope.loader.loading = false ;
            $rootScope.BankruptcyID = data.BankruptcyID;
            $scope.Bankrupts.existing = '0';
            if (($scope.selectedClientID.Bankruptcy[0]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[0];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/getBankruptcy.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getBankruptcy = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }
            if (($scope.selectedClientID.Bankruptcy[1]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[1];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.Bankruptcy[2]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[2];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });
            }
        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });


        $scope.masteriva = {};


        $scope.success = false;


        $scope.masteriva.FFID = $rootScope.FFID;

        var dataObj = $scope.masteriva;


        console.log($scope.masteriva);
        console.log($scope.text);

        var res = $http.post('php_pages/saveiva_api.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            // $scope.loader.loading = false ;
            $rootScope.IVAID = data.IVAID;
            $scope.IVAs.existing = '0';
            if (($scope.selectedClientID.iva[0]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[0];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/getiva.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getiva = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }

            if (($scope.selectedClientID.iva[1]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[1];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            if (($scope.selectedClientID.iva[2]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[2];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


        $scope.masterRepossession = {};

        $scope.success = false;

        $scope.masterRepossession.FFID = $rootScope.FFID;

        var dataObj = $scope.masterRepossession;


        console.log($scope.masterRepossession);
        console.log($scope.text);

        var res = $http.post('php_pages/saveRepossession.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ;
            $rootScope.RepoID = data.RepoID;
            $scope.possesseds.existing = '0';

            if (($scope.selectedClientID.Repossession[0]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[0];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('php_pages/getRepossession.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data;
                                $scope.getRepossession = response.data; // Show result from server in our <pre></pre> element
                            });

                });


            }
            if (($scope.selectedClientID.Repossession[1]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[1];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });


            }
            if (($scope.selectedClientID.Repossession[2]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[2];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('php_pages/SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });


            }

        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty


        //}


        $scope.mastergetsource = {};
        $scope.sourcedproducts = false;
        // $scope.getsource = function() {
        $scope.sourcenow = true;
        //$scope.post_data_toapi();
        $scope.loader.loading = true;
        $scope.showeditpanel = false;
        $scope.sourcing = false;
        $scope.loader.sourceloading = true;
        $scope.success = false;

        $scope.mastergetsource.FFID = $rootScope.FFID;
        $scope.mastergetsource.Appid = $rootScope.appids;


        var dataObj = $scope.mastergetsource;


        var res = $http.post('php_pages/getsource.php', dataObj);
        res.success(function (response, status, headers, config) {
            //console.log(response.data);

            $scope.souringdata = response.data;
            $scope.souringdata1 = response.data[0].DataTable1;
            console.log('datatable1', $scope.souringdata1);
            $scope.souringdata2 = response.data[0].DataTable2;
            $scope.success = true;
            $scope.passed = 'selected';


            //  console.log($scope.souringdata1);
            $scope.loader.sourceloading = false;
            $scope.sourcedproducts = true;
            $rootScope.pop = $scope.souringdata;
            $rootScope.pop1 = $scope.souringdata1;
            $rootScope.pop2 = $scope.souringdata2;
            $scope.gettest();
            //$('.active').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty

        //   };


        //$scope.getsource();


        $scope.gettest = function () {
            //    $scope.selected_rates = values;

            $scope.pageSize = 25;
            $scope.pageSize1 = 25;
            $scope.allItems = $rootScope.pop1;
            $scope.allItems2 = $rootScope.pop2;

            //console.log($scope.allItems2);
            $scope.reverse = false;

            $scope.resetAll = function () {
                $scope.filteredList = $scope.allItems;
                $scope.filteredList1 = $scope.allItems2;
                $scope.newEmpId = '';
                $scope.newName = '';
                $scope.newEmail = '';
                $scope.searchText = '';
                $scope.currentPage = 0;
                $scope.Header = ['', '', ''];
            };


            $scope.searching = function () {
                $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);
                console.log($scope.filteredList);
                if ($scope.searchText == '') {
                    $scope.filteredList = $scope.allItems;
                }
                $scope.pagination();
            };

            // Calculate Total Number of Pages based on Search Result
            $scope.pagination = function () {
                $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
            };
            $scope.pagination1 = function () {
                $scope.ItemsByPage1 = filteredListService.paged1($scope.filteredList1, $scope.pageSize1);
            };

            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function () {
                $scope.currentPage = $scope.ItemsByPage.length - 1;
            };

            $scope.range = function (input, total) {
                var ret = [];
                if (!total) {
                    total = input;
                    input = 0;
                }
                for (var i = input; i < total; i++) {
                    if (i != 0 && i != total - 1) {
                        ret.push(i);
                    }
                }
                return ret;
            };

            $scope.sort = function (sortBy) {
                $scope.resetAll();

                $scope.columnToOrder = sortBy;
                var iconName;
                //$Filter - Standard Service
                $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

                if ($scope.reverse)
                    iconName = 'glyphicon glyphicon-chevron-up';
                else
                    iconName = 'glyphicon glyphicon-chevron-down';

                if (sortBy === 'Term') {
                    $scope.Header[0] = iconName;
                } else if (sortBy === 'LenderRate') {
                    $scope.Header[1] = iconName;
                } else if (sortBy === 'InitialPayment') {
                    $scope.Header[2] = iconName;
                } else if (sortBy === 'ValuationFee') {
                    $scope.Header[3] = iconName;
                } else if (sortBy === 'Cashback') {
                    $scope.Header[4] = iconName;
                } else if (sortBy === 'ArrangementFee') {
                    $scope.Header[5] = iconName;
                } else if (sortBy === 'BookingFee') {
                    $scope.Header[6] = iconName;
                } else {
                    $scope.Header[7] = iconName;
                }

                $scope.reverse = !$scope.reverse;

                $scope.pagination();
                $scope.pagination1();


            };

            //By Default sort ny Name
            $scope.sort();


            function searchUtil(c1, toSearch) {
                /* Search Text in all 3 fields */
                return (c1.TotalFee.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || c1.TotalFee.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || c1.TotalFee == toSearch) ? true : false;
            }
            ;


            $scope.keyObj = {};
            $scope.resetFilters = function () {
                // needs to be a function or it won't trigger a $watch
                $scope.keyObj = {};
                $scope.selectedlender = "";
                $scope.selectedProductType = "";
                $scope.selectedterm = "";
            };

            $scope.resetselected = function () {
                $scope.selectedClientID.c1 = "";
                $scope.checked = 0;
            };

            // pagination controls
            $scope.currentPage1 = 1;
            $scope.totalItems = $scope.allItems.length;
            $scope.entryLimit = 25; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

            // $watch search to update pagination
            $scope.$watch('keyObj', function (newVal, oldVal) {

                $scope.filtered = filterFilter($scope.allItems, newVal);
                $scope.totalItems = $scope.filtered.length;
                console.log($scope.totalItems);
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage1 = 1;
            }, true);

            $scope.sort = function (sortBy) {

                //  $scope.resetFilters();

                $scope.columnToOrder = sortBy;
                var iconName;
                //$Filter - Standard Service
                $scope.filtered = $filter('orderBy')($scope.filtered, $scope.columnToOrder, $scope.reverse);

                if ($scope.reverse)
                    iconName = 'glyphicon glyphicon-chevron-up';
                else
                    iconName = 'glyphicon glyphicon-chevron-down';

                if (sortBy === 'Term') {
                    $scope.Header[0] = iconName;
                } else if (sortBy === 'LenderRate') {
                    $scope.Header[1] = iconName;
                } else if (sortBy === 'InitialPayment') {
                    $scope.Header[2] = iconName;
                } else if (sortBy === 'ValuationFee') {
                    $scope.Header[3] = iconName;
                } else if (sortBy === 'Cashback') {
                    $scope.Header[4] = iconName;
                } else if (sortBy === 'ArrangementFee') {
                    $scope.Header[5] = iconName;
                } else if (sortBy === 'BookingFee') {
                    $scope.Header[6] = iconName;
                } else {
                    $scope.Header[7] = iconName;
                }

                $scope.reverse = !$scope.reverse;

            };

            //By Default sort ny Name
            $scope.sort('LenderRate');

        };


        $scope.showlenderlist = false;

        $scope.$watch('customers.lenderlist', function (newVal, oldVal) {
            // do something here

            if (newVal) {
                $scope.showlenderlist = true;
            } else {
                $scope.showlenderlist = false;
            }

        }, true);


        $scope.smaster = {};
        $scope.shortlist = function (c1) {
            $scope.smaster = angular.copy(c1);

            $scope.prefs = 'true';
            $scope.shortlistedproducts = true;
            $rootScope.shortlistscopes = $scope.productsdata.items;
            // console.log('shortlistproducts',$rootScope.shortlistscopes);
            //    $rootScope.shortlistscopes0 = $scope.selectedClientID.c1[0];
            //    $rootScope.shortlistscopes1 = $scope.selectedClientID.c1[1];
            //    $rootScope.shortlistscopes2 = $scope.selectedClientID.c1[2];
            //    $rootScope.shortlistscopes3 = $scope.selectedClientID.c1[3];
            //     $rootScope.shortlistscopes4 = $scope.selectedClientID.c1[4];
            //$scope.smaster.test3 = $scope.selectedClientID.c1[2];

            $scope.sorting = function (sortBy) {

                $scope.columnToOrders = sortBy;

                //$Filter - Standard Service
                $scope.shortlistscope = $filter('orderBy')($rootScope.shortlistscopes, $scope.columnToOrders, $scope.reverse);
                //  $scope.reverse = !$scope.reverse;
                console.log($scope.shortlistscope[0]);
                console.log($scope.shortlistscope[1]);
                console.log($scope.shortlistscope[2]);
                $rootScope.shortlistscopes0 = $scope.shortlistscope[0]['qty'];
                $rootScope.shortlistscopes1 = $scope.shortlistscope[1]['qty'];
                $rootScope.shortlistscopes2 = $scope.shortlistscope[2]['qty'];
                $rootScope.shortlistscopes3 = $scope.shortlistscope[3]['qty'];
                // $rootScope.shortlistscopes4 = $scope.shortlistscope[4]['qty'];
            };

            //By Default sort ny Name
            $scope.sorting('-IncrementalCost');


            $scope.showshortlistproducts = 'true';
            //  $scope.sourcedproducts = 'false';
            $('#clickshort').find('a').trigger('click');
            // $('.active').next('li').find('a').trigger('click');

            $rootScope.ProductID1 = $rootScope.shortlistscopes0.ProductID;
            $rootScope.ProductID2 = $rootScope.shortlistscopes1.ProductID;
            $rootScope.ProductID3 = $rootScope.shortlistscopes2.ProductID;
            $rootScope.ProductID4 = $rootScope.shortlistscopes3.ProductID;
            $rootScope.ProductID5 = $rootScope.shortlistscopes4.ProductID;
        };

        $scope.savemaster = {};
        $scope.saveshortlist = function (shortlist) {
            // alert('suces');
            $scope.loader.shortlistproductsloading = true;
            $scope.savemaster = angular.copy(shortlist);
            $rootScope.selectedproid = $scope.selectedClientID.ProductID[0];
            $rootScope.ProductID1Notes = $scope.savemaster.ProductIDNotes1;
            $rootScope.ProductID2Notes = $scope.savemaster.ProductIDNotes2;
            $rootScope.ProductID3Notes = $scope.savemaster.ProductIDNotes3;
            $rootScope.ProductID4Notes = $scope.savemaster.ProductIDNotes4;
            $rootScope.ProductID5Notes = $scope.savemaster.ProductIDNotes5;
            $scope.saveprodall = {};
            $scope.saveprodall = $rootScope.shortlistscopes;
            $scope.savemaster.FFID = $rootScope.FFID;
            $scope.savemaster.ClientName = $rootScope.Clientname;
            $scope.savemaster.SelectedProductId = $rootScope.selectedproid;


            $scope.savemasterlist = {
                FFID: $rootScope.FFID,
                AppID: $rootScope.appids,
                ProductID1: $rootScope.ProductID1,
                ProductID2: $rootScope.ProductID2,
                ProductID3: $rootScope.ProductID3,
                ProductID4: $rootScope.ProductID4,
                ProductID5: $rootScope.ProductID5,
                SelectedProductID: $rootScope.selectedproid
            }
            console.log($scope.savemasterlist);
            var dataObjapps = $scope.savemasterlist;
            var res = $http.post('php_pages/saveselectedproductslist.php', dataObjapps);
            res.success(function (data, status, headers, config) {
                $rootScope.MortQuoteIDs = data.MortQuoteID;
                console.log($rootScope.MortQuoteIDs);


                if (($rootScope.shortlistscopes0.ProductID) > 0) {

                    $scope.savemaster0 = {};
                    $scope.savemaster0 = $rootScope.shortlistscopes0;
                    $scope.savemaster0.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster0.FFID = $rootScope.FFID;// $rootScope.FFID;
                    $scope.savemaster0.ClientName = $rootScope.Clientname;//$rootScope.ClientID;
                    $scope.savemaster0.SelectedProductId = $rootScope.selectedproid;
                    $scope.savemaster0.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster0.ProductID1Notes = $rootScope.ProductID1Notes;
                    $scope.savemaster0.ProductID2Notes = $rootScope.ProductID2Notes;
                    $scope.savemaster0.ProductID3Notes = $rootScope.ProductID3Notes;
                    $scope.savemaster0.ProductID4Notes = $rootScope.ProductID4Notes;
                    $scope.savemaster0.ProductID5Notes = $rootScope.ProductID5Notes;
                    $scope.savemaster0.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                    var dataObjapps = $scope.savemaster0;
                    var res = $http.post('php_pages/saveselectedproducts.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        console.log(data);

                    });
                    var dataObjapps = $scope.savemaster0;
                    var res = $http.post('php_pages/SaveMortgageProductNotes.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                        console.log(data);

                    });

                }
                if (($rootScope.shortlistscopes1.ProductID) > 0) {

                    $scope.savemaster1 = {};
                    $scope.savemaster1 = $rootScope.shortlistscopes1;
                    $scope.savemaster1.FFID = $rootScope.FFID;// $rootScope.FFID;
                    $scope.savemaster1.ClientName = $rootScope.Clientname;//$rootScope.ClientID;
                    $scope.savemaster1.SelectedProductId = $rootScope.selectedproid;
                    $scope.savemaster1.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster1.ProductID1Notes = $rootScope.ProductID1Notes;
                    $scope.savemaster1.ProductID2Notes = $rootScope.ProductID2Notes;
                    $scope.savemaster1.ProductID3Notes = $rootScope.ProductID3Notes;
                    $scope.savemaster1.ProductID4Notes = $rootScope.ProductID4Notes;
                    $scope.savemaster1.ProductID5Notes = $rootScope.ProductID5Notes;
                    $scope.savemaster1.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                    var dataObjapps = $scope.savemaster1;
                    var res = $http.post('php_pages/saveselectedproducts.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        console.log(data);

                    });
                    var dataObjapps = $scope.savemaster1;
                    var res = $http.post('php_pages/SaveMortgageProductNotes.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                        console.log(data);

                    });

                }
                if (($rootScope.shortlistscopes2.ProductID) > 0) {

                    $scope.savemaster2 = {};
                    $scope.savemaster2 = $rootScope.shortlistscopes2;
                    $scope.savemaster2.FFID = $rootScope.FFID;// $rootScope.FFID;
                    $scope.savemaster2.ClientName = $rootScope.Clientname;//$rootScope.ClientID;
                    $scope.savemaster2.SelectedProductId = $rootScope.selectedproid;
                    $scope.savemaster2.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster2.ProductID1Notes = $rootScope.ProductID1Notes;
                    $scope.savemaster2.ProductID2Notes = $rootScope.ProductID2Notes;
                    $scope.savemaster2.ProductID3Notes = $rootScope.ProductID3Notes;
                    $scope.savemaster2.ProductID4Notes = $rootScope.ProductID4Notes;
                    $scope.savemaster2.ProductID5Notes = $rootScope.ProductID5Notes;
                    $scope.savemaster2.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                    var dataObjapps = $scope.savemaster2;
                    var res = $http.post('php_pages/saveselectedproducts.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        console.log(data);

                    });
                    var dataObjapps = $scope.savemaster2;
                    var res = $http.post('php_pages/SaveMortgageProductNotes.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                        console.log(data);

                    });
                }
                if (($rootScope.shortlistscopes3.ProductID) > 0) {

                    $scope.savemaster3 = {};
                    $scope.savemaster3 = $rootScope.shortlistscopes3;
                    $scope.savemaster3.FFID = $rootScope.FFID;// $rootScope.FFID;
                    $scope.savemaster3.ClientName = $rootScope.Clientname;//$rootScope.ClientID;
                    $scope.savemaster3.SelectedProductId = $rootScope.selectedproid;
                    $scope.savemaster3.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster3.ProductID1Notes = $rootScope.ProductID1Notes;
                    $scope.savemaster3.ProductID2Notes = $rootScope.ProductID2Notes;
                    $scope.savemaster3.ProductID3Notes = $rootScope.ProductID3Notes;
                    $scope.savemaster3.ProductID4Notes = $rootScope.ProductID4Notes;
                    $scope.savemaster3.ProductID5Notes = $rootScope.ProductID5Notes;
                    $scope.savemaster3.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                    var dataObjapps = $scope.savemaster3;
                    var res = $http.post('php_pages/saveselectedproducts.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        console.log(data);

                    });
                    var dataObjapps = $scope.savemaster3;
                    var res = $http.post('php_pages/SaveMortgageProductNotes.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                        console.log(data);

                    });
                }

                if (($rootScope.shortlistscopes4.ProductID) > 0) {
                    $scope.savemaster4 = {}
                    $scope.savemaster4 = $rootScope.shortlistscopes4;
                    $scope.savemaster4.FFID = $rootScope.FFID;// $rootScope.FFID;
                    $scope.savemaster4.ClientName = $rootScope.ClientID;//$rootScope.ClientID;
                    $scope.savemaster4.SelectedProductId = $rootScope.selectedproid;
                    $scope.savemaster4.MortQuoteId = $rootScope.MortQuoteIDs;
                    $scope.savemaster4.ProductID1Notes = $rootScope.ProductID1Notes;
                    $scope.savemaster4.ProductID2Notes = $rootScope.ProductID2Notes;
                    $scope.savemaster4.ProductID3Notes = $rootScope.ProductID3Notes;
                    $scope.savemaster4.ProductID4Notes = $rootScope.ProductID4Notes;
                    $scope.savemaster4.ProductID5Notes = $rootScope.ProductID5Notes;
                    $scope.savemaster4.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                    var dataObjapps = $scope.savemaster4;
                    var res = $http.post('php_pages/saveselectedproducts.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        console.log(data);

                    });
                    var dataObjapps = $scope.savemaster4;
                    var res = $http.post('php_pages/SaveMortgageProductNotes.php', dataObjapps);
                    res.success(function (data, status, headers, config) {
                        $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                        console.log(data);

                    });
                }

            });


            $scope.showshortlistproducts = false;
            $scope.loader.shortlistproductsloading = false;
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Product  saved now  </div>');
            $scope.hidealert = hidealert();
        }
    });
    res.error(function (data, status, headers, config) {
        console.log("failure message: " + JSON.stringify({data: data}));
        //$scope.loader.loading = false ;
    });
    $scope.producttype = [
        'Fixed', 
        'Discounted', 
        'Tracker', 
        'Capped', 
        'Variable'
    ];
    $scope.filteryears=[
        '1 years', 
        '2 years', 
        '3 years', 
        '4 years', 
        '5 years'
    ];
    $scope.limit = 2;
    /*$scope.checkChanged = function(prodcut){
        if(prodcut) $scope.checked++;
        else $scope.checked--;
    }*/
    $scope.choosemymortage=[
        'Offset Mortgages ', 
        'Overpayment Facility', 
        'No Booking Fee', 
        'No Arrangement Fee', 
        'No Higher Lending Charge',
        'Cashback Required', 
        'No Early Repayment Charges', 
        'No Early Repayment Charge Overhang'
        ];


	$scope.moveback = function(reason) {
		switch (reason)
		{
			case "A lower LTV product is available":
			case "Above maximum Loan Size":
			case "Min loan":
			case "Let to Buy":
			case "FirstTimeLandlord":
			case "BTL Rental Income Only not accepted":
			case "BTL Rental Income + Salary not accepted":
			case "LTV for flat not Accepted":
			case "LTV For House Is Not Accepted":
			case "LTV Exceeded for Debt consolidation":
			case "Exceeded Maximum amount of Debt Consolidation":
			case "LTV Exceeded for Debt consolidation":
			case "Max Valuation":
			case "Min Valuation":
			case "Repayment Method":
			case "Shared Ownership not required":
			case "Right to buy not available":
			case "Right to buy max loan ":
			case "Right to buy max LTV":
			case "Above maximum LTV":
			case "Max loan":
			case "Shared Ownership":
			case "BTLCapitalRaisingReason BTL":
				$scope.customers.showEmortgagedetails = true;
				$scope.customers.showNmortgagedetails = false;
				$scope.customers.showbmortgagedetails = false;
				$scope.customers.selected1 = true;
				$scope.customers.selected2 = false;
				$scope.customers.selected7 = false;
				$scope.tabsStats.currentTabId = 'yourmortgagerequirement';
			   break;
			case "Above maximum term":
			case "Min Term":
			case "Above maximum age at end of term":
			case "Bridging Product":
			case "Not a Non Regulated Bridging Product":
			case "Not a Regulated Bridging Product":
			case "Bridging Term Exceeded Max Term Allowed":
				$scope.customers.showEmortgagedetails = false;
				$scope.customers.showNmortgagedetails = false;
				$scope.customers.showpmortgagedetails = false;
				$scope.customers.showbmortgagedetails = true;
				$scope.customers.selected5 = false;
				$scope.customers.selected6 = true;
				$scope.customers.selected7 = true;
				$scope.customers.selected1 = false;
				$scope.customers.selected2 = false;
				$scope.tabsStats.currentTabId = 'yourmortgagerequirement';
			   break;
			case "Capital Raising BTL":
			   $scope.tabsStats.currentTabId = 'yourmortgagerequirement';
			   break;
			case "Remortgage Only":
			case "Purchase Only":
			case "Not available to FTB":
			case "Only available to FTB":
			   $scope.tabsStats.currentTabId = 'yourmortgagerequirement';
			   break;
			case "Rental Income":
			   $scope.tabsStats.currentTabId = 'yourmortgagerequirement';
			   break;

			case "BTL StressTest Percentage":
			case "Income not enough to meet loan":
			case "Self Cert not available":
			case "Employment Status":
			case "Self-cert not required":
			case "In Probation Period Not accepted":
			case "Employed Minimum months":
			case "Employed Minimum Continuous months":
			case "Self Employed Minimum months":
			case "Self Employed Minimum Continuous months":
			case "Min Employment Months":
				$scope.customers.employpanel1selected = true;
				$scope.customers.addincomepanel1selected = false;
				$scope.customers.benefitspanel1selected = false;
				$scope.customers.employincomepanel1selected = false;
				$scope.tabsStats.currentTabId = 'employmentandincome';
				//Employment & Income - Employment
			   break;
			case "Minimum Income":
				$scope.customers.employpanel1selected = false; 
				$scope.customers.addincomepanel1selected = false; 
				$scope.customers.benefitspanel1selected = false; 
				$scope.customers.employincomepanel1selected = true;
				$scope.tabsStats.currentTabId = 'employmentandincome';
				//TotalNetMonthlyIncome
			   break;


			case "NonExcouncil House Not Accepted":
			case "NonExcouncil House refer to lender":
			case "Ex-Council Not accepted":
			case "Minimum Outset Lease":
			case "Minimum Excess Lease":
			case "Agricultural Tie":
			case "Agricultural Tie Not Accecpted":
			case "Agricultural Tie refer to lender":
			case "Construction Type":
			case "Self Build":
			case "Self Build Not Accecpted":
			case "Number Of Kitchens":
			case "Number Of Bedrooms":
			case "Family Let BTL":
			case "Student Let BTL":
			case "Less 10 Years Old And No NHBC":
			case "Multiple Occupancy":
			case "Above Commercial":
			case "Semi Commercial":
				$scope.customers.showAddProperty = false;
				$scope.customers.showfirsthalfproperty = false;
				$scope.customers.showsecondhalfproperty = true;
				$scope.customers.selected2 = false;
				$scope.customers.selected3 = false;
				$scope.customers.selected4 = true;
				$scope.tabsStats.currentTabId = 'propertydetails';
				//Additional Property details
			   break;
			case "Flat Having Balcony Access":
			case "Property Residence":
			case "Region":
			case "Studio Flat":
			case "Flat Purpose Built":
			case "Flat Converted":
			case "Property Type House Is Not Accepted":
			case "Property Age Is Not Accepted":
				$scope.customers.showAddProperty = false;
				$scope.customers.showfirsthalfproperty = true;
				$scope.customers.showsecondhalfproperty = false;
				$scope.customers.selected2 = false;
				$scope.customers.selected3 = true;
				$scope.customers.selected4 = false;
				$scope.tabsStats.currentTabId = 'propertydetails';
			   break;
			case "Exceeds max floors in block":
			case "Exceeds max floors in block for Excouncil flat/purpose built with lift":
			case "Exceeds max floors in block for Excouncil flat/purpose built without Lift":
			case "Exceeds max floors in block for Excouncil flat/converted with lift":
			case "Exceeds max floors in block for Excouncil flat/converted without Lift":
			case "Exceeds max floors in block for flat/purpose built with lift":
			case "Exceeds max floors in block for flat/purpose built without Lift":
			case "Exceeds max floors in block for flat/converted with lift":
			case "Exceeds max floors in block for flat/converted without Lift":
				$scope.customers.showAddProperty = false;
				$scope.customers.showfirsthalfproperty = true;
				$scope.customers.showsecondhalfproperty = false;
				$scope.customers.selected2 = false;
				$scope.customers.selected3 = true;
				$scope.customers.selected4 = false;
				$scope.tabsStats.currentTabId = 'propertydetails';

				//Property details - floorsinwholeblock
			   break;
			case "Freehold Flat":
			case "Flying Freehold":
			   $scope.customers.showAddProperty = false;
				$scope.customers.showfirsthalfproperty = true;
				$scope.customers.showsecondhalfproperty = false;
				$scope.customers.selected2 = false;
				$scope.customers.selected3 = true;
				$scope.customers.selected4 = false;
				$scope.tabsStats.currentTabId = 'propertydetails';
				//Property details - Tenure
			   break;



			case "Pay day loan not repaid":
				$scope.customers.showliabilities = false;
				$scope.customers.showPayDayLoans = true;
				$scope.customers.liabilitiesselected = false;
				$scope.customers.PayDayLoansselected = true;
			   $scope.tabsStats.currentTabId = 'liabilities';
				//Payday Loans
			   break;

			case "Adverse - Arrears":
			case "Adverse - CCJ":
			case "Adverse - Defaults":
			case "Adverse - Bankrupt":
			case "Adverse - Repossession":
			case "Adverse - IVA":
			case "Previous Adverse credit not acceptable":
			case "A better adverse product exists for this lender":
			case "Adverse - Not allowed both CCJ and Arrears":
			   $scope.tabsStats.currentTabId = 'credithistroy';
			   break;

			case "Min Age":
			case "Ex-Patriates":
			case "Must Be On Voters Roll":
			   $scope.tabsStats.currentTabId = 'applicants';
			   break;

			case "Not a Bridging Product":
			   $scope.tabsStats.currentTabId = 'meetingaims';
			   break;


			case "BTL max number of properties":
			case "BTL max number of properties Specific to Lender":
			case "BTL Value Exceeds 10 times of Clients Income -Skipton specific":
			   $scope.tabsStats.currentTabId = 'anotherexistingmortgage';
			   break;
			   

		   default: 
			   console.log(reason);
			   return false;
		}
	}
});          
    