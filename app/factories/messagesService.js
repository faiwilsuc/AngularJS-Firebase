app.factory('messagenotificationService',['$http',function($http){

  	var obj = {};
	
	obj.get_applicantbenefits =function(appid)
	{
		return  $http.post('php_pages/getbenefits_data.php',{"applicant_id":appid}).then(function (response) {
		
		return response.data;     	
		});
	}	
		
	obj.getmessagecount = function(userid,sessionid)
	{
	conversation_id= clientid +":"+userid;	
		console.log(conversation_id);
		 return $http.post('php_pages/getcount.php',{"cid":conversation_id}).then(function (results) {			
		 
		});			
	}
	obj.getuserslist = function()
	{
		$http.post('php_pages/users_list.php').then(function (response) {	
	 	return response.data;	
		});			
	}
	obj.onlinelist = function()
	{
		$http.post('php_pages/online_list.php').then(function (response) {	
	 	return response.data;		
		});			
	}	
	obj.getmsgdetails =function(conversation,rconversation)
	{
		return  $http.post('php_pages/getmsgdetails.php',{"conversation":conversation,"rconversation":rconversation}).then(function (response) {
		return 	response.data;     	
		});
	}
    
    obj.getmsg_details =function(conversation,rconversation)
	{
		return  $http.post('php_pages/getmsg_details.php',{"conversation":conversation,"rconversation":rconversation}).then(function (response) {
		return 	response.data;     	
		});
	}
    
	obj.getmsgnotify =function(conversationid)
	{
		return $http.post('php_pages/getmsgnotify.php',{"conversation":conversationid}).then(function (response) {
		return 	response.data;     		
     	});
	}
	
	obj.getminimize =function(conversationid)
	{
		return $http.post('php_pages/getmsgnotify.php',{"conversation":conversationid}).then(function (response) {
		return 	response.data.unread;     		
     	});
	}
	
	obj.getcountnotify =function(count)
	{
		return count;     		
     	
	}
	
	return obj;

}]);