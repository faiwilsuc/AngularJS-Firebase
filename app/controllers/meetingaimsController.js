// create our client controller and get access to firebase
app.controller('MeetingaimsController', function ($firebaseObject, $scope, $http, $rootScope, $location) {

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

    $scope.meeting_aims_tab = true;
    (function(){
        $scope.customer = {
            meetingAims : {
                textarea : {
                    typing : false
                }
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');
    })();

    $scope.showTyping = function() {
        $scope.customer = {
            meetingAims : {
                textarea : {
                    typing : true
                }
            }
        };

        $scope.local = {
            customer : {
                meetingAims : {
                    textarea : {
                        typing : true
                    }
                }
            }
        };
    }

    $scope.hideTyping = function() {
        $scope.customer = {
            meetingAims : {
                textarea : {
                    typing : false
                }
            }
        };

        $scope.local = {
            customer : {
                meetingAims : {
                    textarea : {
                        typing : false
                    }
                }
            }
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
    /* $scope.currenttab_selection=function(tabname)
     {
     $rootScope.current_tab=tabname;
     $scope.$apply(function () {
     $scope.customers.current_tab=tabname;
     });*/

//end active tab    


    //save to db
    $scope.meetingaimsdata = {};
    $scope.createmeetingaims = function (meetingaims, tabname) {

        $scope.meetingaimsdata = angular.copy(meetingaims);

        var dataObj1 = $scope.meetingaimsdata;

        var res = $http.post('php_pages/Createmeetingaims.php', dataObj1);
        res.success(function (data, status, headers, config) {

            $scope.success = true;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Meeting aims saved</div>');
            $scope.hidealert();
//$rootScope.getmeetingaims=true;
            //get current index value

            //moving to next tabs

            //   $rootScope.current_tab=tabname;

            /*var nexttab=parseInt(index)+1;
             var tabdatas=$scope.tabs[nexttab];
             var fieldName = 'active';

             for(var propertyName in tabdatas) {
             if(propertyName==fieldName)
             {
             dataobj[propertyName]=true;
             }
             }
             $scope.tabs[nexttab]=tabdatas;*/

            //save mirroring using watch
            $scope.$watch('tabname', function (newVal, oldVal) {
                console.log('changed');
                $scope.tickAccordion($scope.tabsStats.currentTabId);
                $scope.tabsStats.currentTabId = tabname;
            }, true);


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });

    }


});
