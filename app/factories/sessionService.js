app.factory('sessionService',['$http',function($http){
	return { 
	set:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get:function(key){
	return sessionStorage.getItem(key);
	},
	destroy:function(key){
	$http.post('php_pages/destroy.php');
	return sessionStorage.removeItem(key);	
	},
	set_liabilityvalue:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_liabilityvalue:function(key){
	return sessionStorage.getItem(key);
	},
	set_currentchat:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_currentchat:function(key){
	return sessionStorage.getItem(key);
	},
	set_currenttab:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_currenttab:function(key){
	return sessionStorage.getItem(key);
	},
	set_ratesdata:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_ratesdata:function(key){
	return sessionStorage.getItem(key);
	},
	set_sessionid:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_sessionid:function(key){
	return sessionStorage.getItem(key);
	}, 
	set_setformid:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_getformid:function(key){
	return sessionStorage.getItem(key);
	},
	set_applicantsname:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_applicantsname:function(key){
	return sessionStorage.getItem(key);
	},
	set_messagecount:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_messagecount:function(key){
	return sessionStorage.getItem(key);
	},
	set_yrsdata:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_yrsdata:function(key){
	return sessionStorage.getItem(key);
	},
	set_ryrsdata:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_ryrsdata:function(key){
	return sessionStorage.getItem(key);
	},
	set_applicantindex:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_applicantindex:function(key){
	return sessionStorage.getItem(key);
	},
	set_selectedproducts:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_selectedproducts:function(key){
	return sessionStorage.getItem(key);
	},	
	set_mortagereqdata:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_mortagereqdata:function(key){
	return sessionStorage.getItem(key);
	},	
	set_bridgingdata:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_bridgingdata:function(key){
	return sessionStorage.getItem(key);
	},
	set_propertyaddress:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_propertyaddress:function(key){
	return sessionStorage.getItem(key);
	},
	set_videoid:function(key,value){
	return sessionStorage.setItem(key,value);
	},
	get_videoid:function(key){
	return sessionStorage.getItem(key);
	},
	};
}])
