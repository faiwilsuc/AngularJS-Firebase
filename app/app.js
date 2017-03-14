app = angular.module('cdealsApp', ['firebase', 'ngSanitize', 'ngRoute', 'angular-smilies', 'ui.bootstrap', 'luegg.directives', 'ngMask', 'wiz.validation']);
app.constant('FirebaseConfig', 'https://factfinding-f477d.firebaseio.com/');
app.config(['$routeProvider',
    function ($routeProvider) {
        //$locationProvider.html5Mode(true);  
        $routeProvider
                .when('/', {
                    title: 'Home',
                    templateUrl: 'app/views/login.html',
                    controller: 'mainController'
                })


                .when('/consultantdashboard', {
                    title: 'Consultant Dashboard',
                    templateUrl: 'app/views/consultant-dashboard.html',
                    controller: 'ConsultantDashboardController'
                })
                .when('/clientdashboard', {
                    title: 'Client Dashboard',
                    templateUrl: 'app/views/client-dashboard.html',
                    controller: 'ClientDashboardController'
                })
                .when('/sourcenow', {
                    title: 'Source Now',
                    templateUrl: 'app/views/sourcing.html',
                    controller: 'sourcingController'
                })

                .when('/applicants', {
                    title: 'Applicants',
                    templateUrl: 'app/views/applicant.html',
                    controller: 'ApplicantController'
                })

                .when('/meetingaims', {
                    title: 'Meeting Aims',
                    templateUrl: 'app/views/meetingaims.html',
                    controller: 'MeetingaimsController'
                })

                .when('/employmentandincome', {
                    title: 'Employment and Income',
                    templateUrl: 'app/views/employmentandincome.html',
                    controller: 'EmploymentandincomeController'
                })

                .when('/liabilities', {
                    title: 'Liabilities',
                    templateUrl: 'app/views/liabilities.html',
                    controller: 'LiabilitiesController'
                })

                .when('/monthlyoutgoing', {
                    title: 'Monthly Outgoing',
                    templateUrl: 'app/views/monthlyoutgoing.html',
                    controller: 'MonthlyoutgoingController'
                })

                .when('/yourmortgagerequirement', {
                    title: 'Your mortgage requirement',
                    templateUrl: 'app/views/yourmortgagerequirement.html',
                    controller: 'YourmortgagerequirementController'
                })

                .when('/anotherexistingmortgage', {
                    title: 'Another Existing Mortgage',
                    templateUrl: 'app/views/anotherexistingmortgage.html',
                    controller: 'AnotherexistingmortgageController'
                })

                .when('/propertydetails', {
                    title: 'Property Details',
                    templateUrl: 'app/views/propertydetails.html',
                    controller: 'propertydetailsController'
                })

                .when('/credithistroy', {
                    title: 'Credit Histroy',
                    templateUrl: 'app/views/credithistroy.html',
                    controller: 'credithistroyController'
                })

                .when('/additionalnotes', {
                    title: 'Additional Notes',
                    templateUrl: 'app/views/additionalnotes.html',
                    controller: 'additionalnotesController'
                })

                .when('/otherproducts', {
                    title: 'Other Products',
                    templateUrl: 'app/views/otherproducts.html',
                    controller: 'otherproductsController'
                })



                .otherwise({
                    redirectTo: '/'
                });


    }]);

/*app.run(['$route', function($route)  {
 $route.reload();
 }]);*/

