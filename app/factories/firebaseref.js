app.factory('FirebaseRef', function ($window, FirebaseConfig) {
        return new $window.Firebase(FirebaseConfig);
    });