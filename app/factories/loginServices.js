app.factory("loginServices", function ($http, $location, sessionService) {
    var loggedIn = false;
    return {
        login: function (data, scope) {
            var $promise = $http.post('php_pages/login.php', data);
            $promise.then(function (msg) {
                var uid = msg.data.session_id;
                console.log(uid);
                if (uid) {
                    loggedIn = !loggedIn;
                    scope.msgtxt = 'correct information';
                    sessionService.set('user', uid);
                    var role = msg.data.role;
                    if (role == 2) {
                        //uncomment this line if login works
                        $location.path('/clientdashboard');
                    }
                    else {
                        $location.path('/consultantdashboard');
                    }

                }
                else {
                    scope.msgtxt = 'Incorrect information';
                    $location.path('/');
                }
            });
        },
        logout: function () {
            sessionService.destroy('user');
            $location.path('/');
        },
        isLoggedIn: function () {
            var sessionid;
            if (sessionService.get('user')) {
                sessionid = sessionService.get('user');
                return sessionid;
            }
            else {
                return false;
            }
        }
    }

});