// create our client controller and get access to firebase
app.controller('additionalnotesController', function ($firebaseObject, $scope, $http, $rootScope, $location) {

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
            notes : {}
        };

        $scope.local = {
            customer : {
                notes : {}
            }
        };

        var ref = new Firebase("https://cdeals-8f387.firebaseio.com/5467899/typing");

        $firebaseObject(ref).$bindTo($scope, 'customer');;
    })();

    $scope.showTyping = function(name) {
        $scope.customer = {
            notes : {}
        };

        $scope.customer.notes[name] = {
            typing : true
        };

        $scope.local.customer.notes[name] = {
            typing : true
        };
    }

    $scope.hideTyping = function(name) {
        $scope.customer = {
            notes : {}
        };

        $scope.customer.notes[name] = {
            typing : false
        };

        $scope.local.customer.notes[name] = {
            typing : false
        };
    }
    //$scope.applicant_tab=true;

    $scope.source_now = function ($event) {
        //$scope.getsource();
        //$scope.initialtabs=false;
        //$scope.meeting_aims=false;
        //$scope.sourcenowtab=true;
        //$location.path('/sourcenow');

        $scope.$watch('sourcenow', function (newVal, oldVal) {
            console.log('changed');
            $scope.tabsStats.currentTabId = 'sourcenow';
        }, true);
    }

    $scope.saveAdditionalNotesForm = function(form) {
        $scope.tickAccordion($scope.tabsStats.currentTabId);

        alertSuccess.showMessage();

    }

    var alertSuccess = (function(){
        var showing = false;

        return {
            showMessage: function(){
                if(!showing) {
                    showing = true;
                    angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional Notes saved</div>');

                    $(".alert-success").fadeTo(2000, 500).slideUp(500, function () {
                        $(".alert-success").alert('close');
                        showing = false;
                    });
                    $(".alert-warning").fadeTo(2000, 500).slideUp(500, function () {
                        $(".alert-warning").alert('close');
                        showing = false;
                    });
                }
            }
        }
    })();


});
