app.controller("signupController", ['$scope', '$http', function($scope, $http) {
	
        $scope.url = 'php_pages/signup.php';
        $scope.formsubmit = function(isValid) {
		if (isValid) {
        $http.post($scope.url, {"emailid": $scope.emailid, "password": $scope.password, "cpassword": $scope.cpassword, "telephone_number": $scope.telephone_number,"mobile_number": $scope.mobile_number}).
        success(function(data, status) {						
		if(data=='failure')
		{							
		$("#exists").html('<h3 style="color:#0294c3";>This emailid is already taken</h3>');
		}
		else
		{							
		$("#validation").html('<h3 style="color:#0294c3";>Thanks for signup you can login using your emailid</h3>');
		}
   		$scope.status = status;
        $scope.data = data;
        $scope.result = data; // Show result from server in our <pre></pre> element
	     })
        }else
		{
        //alert('Please fill out all the fields in form');
            }
        }
 }]);	