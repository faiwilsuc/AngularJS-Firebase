app.controller('chatClientController', function($scope,$http,messagenotificationService) {
	
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
        // $(".name").click(function() {
			 $scope.glued = true; 
			// $scope.videopod=false;
			$(".filp").slideToggle();
	     // });
}	
            
            
  
            $scope.chaton = function(){	
			if($scope.editedid)
			{
			$scope.glued = true; 	
			$http.post('php_pages/updatemessage.php',{"editedid":$scope.editedid,"message":$scope.chatmsg}).then(function (response) { 
			$scope.chatmsg='';
			$scope.editedid='';			
			});
			return true;	
			}
			else
			{	
		 	$scope.consultantid=2;
			$scope.glued = true; 
			$scope.session =1;	
			$scope.conversation = $scope.session +":"+$scope.consultantid;	
			$http.post('php_pages/chat_box.php',{"message":$scope.chatmsg,"userid":$scope.session,"toid":$scope.consultantid,"conversation_id":$scope.conversation,"minimize":$scope.minimize_count}).	
			success(function(data, status) {
            $scope.chatmsg='';          
			})
			return true;
		 
			}
			
         	};	

          /*  setInterval(function(){
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
			},1000);*/
			
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
			
			
//edit and delete functionalities in chat
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
		
		
		$scope.editMessage = function(msg){
		var editid=msg;  
		$scope.editvalue = 'edited';
		$http.post('php_pages/editmessage.php',{"editid":editid}).then(function (response) {
		
		$scope.selected= response.data.message;	
		$scope.chatmsg = response.data.message; 
		$scope.editedid = response.data.id;	
      	});
		}	
		
//for smiley
$scope.chatmsg='';
	
	$('#emoticons a').click(function() {
    var smiley = $(this).attr('title');	
    $('#chatbox').val($('#chatbox').val()+" "+smiley+" ");
	if($scope.chatmsg!=null){	
	$scope.chatmsg = $scope.chatmsg + smiley;
	}
	else{
	$scope.chatmsg = smiley; 
	}
	});
			
		
		

			  

});
