app.factory("loginServices",function($http,$location,sessionService) {
	 var loggedIn = false;  	 
	 return {  
 	 login:function(data,scope){	 
	 var $promise = $http.post('json_php/login.php',data);
	 $promise.then(function(msg)
	 {
	 var uid = msg.data.session_id;	
	 console.log(uid);
	 if(uid){
		  loggedIn = !loggedIn;
		 scope.msgtxt='correct information';
		 scope.login=true;
	     sessionService.set('user',uid);
		var role=msg.data.role;
		if(role==2){
		$location.path('/consultant-dashboard'); }
		else{
		$location.path('/clientdashboard');	
		}
	
	 }
	 else
	 {
	 scope.msgtxt='Incorrect information'; 
	 $location.path('/');
	 }
	 });
	 },	  
	 logout:function(){	
	 sessionService.destroy('user');
	 $location.path('/');
	 },
	 isLoggedIn:function() {
		  if(sessionService.get('user'))
		  return true;
		  else
		  return false;
     }
	 }
	
});