// create our client controller and get access to firebase
app.controller('otherproductsController', function($firebaseObject,$scope) {
  
var ref = new Firebase("https://cdeals-8f387.firebaseio.com/customers");  
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
  
  //$scope.applicant_tab=true;
    
  //active panel tabs
 

});
