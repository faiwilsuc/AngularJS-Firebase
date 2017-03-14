// create our client controller and get access to firebase
app.controller('propertydetailsController', function ($firebaseObject, $compile, $sce, $scope, $http, $rootScope, $location) {

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

    ;(function(){
        $scope.customer = {
            property : {}
        };

        $scope.local = {
            customer : {
                property : {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            property : {}
        };

        $scope.customer.property[name] = {
            typing : true
        };

        $scope.local.customer.property[name] = {
            typing : true
        };
    }

    $scope.hideTyping = function(name) {
        $scope.customer = {
            property : {}
        };

        $scope.customer.property[name] = {
            typing : false
        };

        $scope.local.customer.property[name] = {
            typing : false
        };
    }
    //$scope.applicant_tab=true;

    if(!$scope.customers){
        $scope.customers = {};
    }

    //active subpanel tabs
    $scope.customers.showAddProperty = true;
    $scope.customers.showfirsthalfproperty = false;
    $scope.customers.showsecondhalfproperty = false;
    $scope.customers.selected2 = true;

    $scope.showAddproperty = function() {
        $scope.customers.showAddProperty = true;
        $scope.customers.showfirsthalfproperty = false;
        $scope.customers.showsecondhalfproperty = false;
        $scope.customers.selected2 = true;
        $scope.customers.selected3 = false;
        $scope.customers.selected4 = false;
    }

    $scope.firsthalfproperty = function () {
        $scope.customers.showAddProperty = false;
        $scope.customers.showfirsthalfproperty = true;
        $scope.customers.showsecondhalfproperty = false;
        $scope.customers.selected2 = false;
        $scope.customers.selected3 = true;
        $scope.customers.selected4 = false;
    };

    $scope.secondhalfproperty = function () {
        $scope.customers.showAddProperty = false;
        $scope.customers.showfirsthalfproperty = false;
        $scope.customers.showsecondhalfproperty = true;
        $scope.customers.selected2 = false;
        $scope.customers.selected3 = false;
        $scope.customers.selected4 = true;
    };
    //ends

    //submit address form
    $scope.createaddress = function (address) {
        /*$scope.$watch ('tabname', function(newVal, oldVal){
         console.log('changed');
         $scope.customers.current_tab='';
         },true);*/

        $scope.firsthalfproperty();
    }

    $scope.submitForm = function(form){
        if($scope.customers.property_details.additional_property_details.construction_type){
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Property Details saved</div>');
            $scope.hidealert();
            $scope.tickAccordion($scope.tabsStats.currentTabId);
            $scope.tabsStats.currentTabId = 'credithistroy';
        }
    }


    $scope.currenttab_selection = function (tabname) {


        /* $scope.$watch ('tabname', function(newVal, oldVal){
         console.log('changed');
         $scope.customers.current_tab=tabname;
         },true);*/
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function () {
            $location.path('/' + tabname + '');
        });
    }


    $scope.searchpostcode = function (postcode) {
//alert('saved');
//$scope.loader.postcodeloading = true ;

        $http.post('php_pages/GetPostcodeByFreeText.php', {"data": $scope.customers.property_details.post_code}).
            success(function (response, status) {
                $scope.status = status;
                //  $scope.data = data;
                $scope.getPostCode = response.data; // Show result from server in our <pre></pre> element
                //  $scope.loader.postcodeloading = false ;3
                                $scope.hideaddresslist = true;
            })
            .
            error(function (data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });

    };


    $scope.postcodeid = {};

    $scope.selectpostcode = function (value) {
//         $scope.loader.postcodeaddloading = true;
        $scope.postcodeid = angular.copy(value);
        console.log($scope.postcodeid);
        //  $scope.select_postcode(value);
        $http.post('php_pages/postcodeID.php', {"data": value}).
            success(function (response, status) {
                $scope.status = status;
                //  $scope.data = data;
                $scope.$watch('address', function (newVal, oldVal) {
                    console.log('changed');
                    $scope.customers.getPostCodeid = response.data;
                    console.log(response.data);
                }, true);
                // $scope.getPostCodeid = response.data; // Show result from server in our <pre></pre> element

                $scope.hideaddresslist = false;
                //  $scope.loader.postcodeaddloading = false;
                for (var i = 0; i < response.data.length; i++) {
                    console.log('res', response.data[0]['Results'][i]['Line1']);


                    /*	sessionService.set_propertyaddress('propertyaddress',response.data[0]['Results'][i]['Line1']+response.data[0]['Results'][i]['Line2']+response.data[0]['Results'][i]['Line3']+response.data[0]['Results'][i]['PostTown']+response.data[0]['Results'][i]['County']);	*/


                    $scope.customers.property_details.add_property_address = [];
                    var property_address = {
                        prop_addres: response.data[0]['Results'][i]['Line1'] + response.data[0]['Results'][i]['Line2'] + response.data[0]['Results'][i]['Line3'] + response.data[0]['Results'][i]['PostTown'] + response.data[0]['Results'][i]['County'],
                        PostCode: '',
                        PostcodeID: response.data[0]['Results'][i]['Postcode'],
                        Line1: response.data[0]['Results'][i]['Line1'],
                        Line2: response.data[0]['Results'][i]['Line2'],
                        Line3: response.data[0]['Results'][i]['Line3'],
                        Town: response.data[0]['Results'][i]['PostTown'],
                        County: response.data[0]['Results'][i]['County']
                    };
                    $scope.customers.property_details.add_property_address.push(property_address);

                }

            })
            .error(function (data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
            });

    }


    var currentTime = new Date()

// returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1

// returns the day of the month (from 1 to 31)
    var day = currentTime.getDate()

// returns the year (four digits)
    var year = currentTime.getFullYear()

    $scope.currentyears = year;
    $scope.$watch('customers.property_details.property_detail.built_yr', function (newVal, oldVal) {

        if (newVal == null) {
            $scope.currentyear = '0';
        }
        else {
            $scope.currentyear = year;
        }
    }, true);


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


    $scope.currenttab_selection = function (tabname) {


        $scope.$watch('tabname', function (newVal, oldVal) {
            console.log('changed');
            $scope.tabsStats.currentTabId = tabname;
        }, true);
        $scope.tabsStats.currentTabId = tabname;
        $scope.$apply(function () {
            $location.path('/' + tabname + '');
        });
    }


    $scope.createproperty = function (property, isFromCorrectForm) {
        // alert('clicked');

        if(isFromCorrectForm) {

            $scope.masterp = angular.copy(property);

            $scope.masterp.userid = 1;
            var ageyear = parseFloat($scope.currentyear) - parseFloat($scope.masterp.built_yr);
            $scope.masterp.AgeYears = ageyear;

            var dataObj = $scope.masterp;
            //  if(formname.$valid)
            var res = $http.post('php_pages/saveproperty.php', dataObj);
            res.success(function (data, status, headers, config) {
                //$scope.property_success=true; tm

                $scope.secondhalfproperty();

                angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Property saved</div>');
                $scope.hidealert();


                if ($scope.masterp.secondhalfproperty == '1') {
                    $scope.firsthalfproperty();
                    // $location.path('/credithistroy');
                    // $rootScope.current_tab='credithistroy';
                    //save mirroring using watch
                    $scope.$watch('credithistroy', function (newVal, oldVal) {
                        console.log('changed');
                        $scope.tabsStats.currentTabId = 'credithistroy';
                    }, true);

                } else {

                    $scope.secondhalfproperty();

                }


            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
            });
        }
    };


});
