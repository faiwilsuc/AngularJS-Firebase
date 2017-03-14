app.controller('chatConsultantController', function($scope,$http,messagenotificationService) {
	
	
	         
 
		 //chatbox popup
		    $scope.glued = true; 
			$scope.livechat=function(){
			
		 	$('#cdeals-sidebar_secondary').addClass('cdeals-popup-box-on');
			$scope.glued = true; 	
     		}
			$scope.removeClass=function(){
	   		$('#cdeals-sidebar_secondary').removeClass('cdeals-popup-box-on');
     		} 	
			
			$scope.openpopup=function(){
 //$(".name").click(function() {
	
			 $scope.glued = true; 
		
			$(".filp").slideToggle();
	        //});	
            }
            
  
            $scope.chaton = function(chatmsg){	
			if($scope.editedid)
			{
			$scope.glued = true;
			$scope.chatmsg=chatmsg;	
			$http.post('php_pages/updatemessage.php',{"editedid":$scope.editedid,"message":$scope.chatmsg}).then(function (response) { 
			$scope.chatmsg='';
			$scope.editedid='';			
			});
			return true;	
			}
			else
			{	
		 	$scope.consultantid=1;
			$scope.glued = true; 
			$scope.session =2;	
			$scope.chatmsg=chatmsg;
			$scope.conversation = $scope.session +":"+$scope.consultantid;	
			console.log($scope.chatmsg,'chatmsg');
			$http.post('php_pages/chat_box.php',{"message":$scope.chatmsg,"userid":$scope.session,"toid":$scope.consultantid,"conversation_id":$scope.conversation,"minimize":$scope.minimize_count}).	
			success(function(data, status) {
            $scope.chatmsg='';          
			})
			return true;
		 
			}
			
         	};	

            setInterval(function(){
	  		$scope.check_consultantid=2;
			$scope.fromid=1;	
			$scope.toid=1;	   		
			var conversation = $scope.check_consultantid +":"+ $scope.toid;	
		    var rconversation =$scope.toid +":"+ $scope.check_consultantid;
			messagenotificationService.getmsgnotify(rconversation).then(function(data){
       		 $scope.getunreadcount = data.unread;
			 
    		});
			 messagenotificationService.getmsgdetails(conversation,rconversation).then(function(data){
       		 $scope.msgdetails = data;
		    	
    		});
			},1000);
			
	$scope.Getusername = function(msgdetail){
			if(msgdetail==2)
			{
			var values='consultant1';
			return values;
			}
			else
			{
			var values='client1';
			return values;
			}
			} 

		$scope.showPopover = function(id){	
		$scope.selectedmsgid=id;
  		$scope.popoverIsVisible = true; 
		};
		$scope.hidePopover = function (){
  		$scope.popoverIsVisible = false;
		};		
		
		$scope.deleteMessage = function(msg){
		var delid=msg;  
		$http.post('php_pages/deletemessage.php',{"deleteid":delid}).then(function (response) {
      	});
		}	

});
