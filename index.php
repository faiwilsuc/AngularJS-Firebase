<!DOCTYPE html>
<html lang="en" ng-app="cdealsApp">
    <head><title>Cdeals FactFind</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <!--<base href="http://www.cdeals.co.uk/factfinding/">-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="images/icons/favicon.ico">
        <link rel="apple-touch-icon" href="images/icons/favicon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="images/icons/favicon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="images/icons/favicon-114x114.png">
        <!--Loading bootstrap css-->
        <link rel="stylesheet" type="text/css" href="css/supernote.css">
        <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,700">
        <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Oswald:400,700,300">
        <link type="text/css" rel="stylesheet" href="vendors/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css">
        <link type="text/css" rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
        <link type="text/css" rel="stylesheet" href="vendors/bootstrap/css/bootstrap.min.css">
        <!--LOADING STYLESHEET FOR PAGE--><!--Loading style vendors-->
        <link type="text/css" rel="stylesheet" href="vendors/animate.css/animate.css">
        <link type="text/css" rel="stylesheet" href="vendors/jquery-pace/pace.css">
        <link type="text/css" rel="stylesheet" href="vendors/iCheck/skins/all.css">
        <link type="text/css" rel="stylesheet" href="vendors/jquery-news-ticker/jquery.news-ticker.css">
        <!--Loading style-->
        <link type="text/css" rel="stylesheet" href="css/themes/style3/blue-dark.css" id="theme-change" class="style-change color-change">
        <link type="text/css" rel="stylesheet" href="css/style-responsive.css">
        <link href="css/cdeals_chat.css" rel="stylesheet" type="text/css" /> 
        <!--<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">-->
        <script src="js/jquery.js"></script>
        <script src="js/jquery-1.10.2.min.js"></script>    
        <script src="js/jquery-migrate-1.2.1.min.js"></script>
        <script src="js/jquery-ui.js"></script>
        <!--loading bootstrap js-->
        <script src="vendors/bootstrap/js/bootstrap.min.js"></script>
        <script src="vendors/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js"></script>
        <script src="js/html5shiv.js"></script>
        <script src="js/respond.min.js"></script>
        <script src="vendors/metisMenu/jquery.metisMenu.js"></script>
        <script src="vendors/slimScroll/jquery.slimscroll.js"></script>
        <script src="vendors/jquery-cookie/jquery.cookie.js"></script>
        <script src="vendors/iCheck/icheck.min.js"></script>
        <script src="vendors/iCheck/custom.min.js"></script>
        <!--<script src="vendors/jquery-news-ticker/jquery.news-ticker.js"></script>-->
        <script src="js/jquery.menu.js"></script>
        <script src="vendors/jquery-pace/pace.min.js"></script>
        <script src="vendors/holder/holder.js"></script>
        <script src="vendors/responsive-tabs/responsive-tabs.js"></script>
        <script src="vendors/lodash/lodash.min.js" type="text/javascript"></script>
        <script src="vendors/underscore/underscore.js" type="text/javascript"></script>
        <!--LOADING SCRIPTS FOR PAGE--><!--CORE JAVASCRIPT-->
        <script src="js/main.js"></script>
        <!--<script src="js/angular.js"></script>-->
        <script src="js/angular.min.js"></script> 
        <!-- Firebase -->
        <script src="js/firebase.js"></script>
        <script src="js/scripts/ngMask.js"></script>
        <!-- AngularFire -->
        <script src="js/angularfire.min.js"></script>
        <script src="js/angular-sanitize.js" ></script>
        <script src="js/angular-route.js" ></script>
        <script src="js/angular-smilies.js"></script>
        <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js" type="text/javascript"></script>
        <script type="text/javascript" src="js/supernote.js"></script>
        <script src="js/angular-animate.min.js"></script>
        <script type="text/javascript" src="js/angular-cookies.js"></script>
        <script type="text/javascript" src="js/scroll-glue.js"></script>
        <script src="vendors/wizValidation/wizValidation/wizValidation.js" type="text/javascript"></script>
        <script src="app/app.js"></script>

        <script src="app/controllers/mainController.js"></script>
        <script src="app/directives/compileHtml.js"></script>
        <script src="app/directives/headerDirective.js"></script>
        <script src="app/directives/allDirective.js"></script> 
        <script src="app/factories/sessionService.js"></script>
        <script src="app/factories/loginServices.js"></script>
        <!--<script src="app/factories/firebaseref.js"></script> -->
        <script src="app/factories/messagesService.js"></script>
        <script src="app/controllers/HeaderController.js"></script>
        <script src="app/filters/capitalize.js"></script>
        <script src="app/controllers/signupController.js"></script>
        <script src="app/controllers/loginController.js"></script>
        <script src="app/controllers/chatClientController.js"></script>
        <script src="app/controllers/chatConsultantController.js"></script>
        <script src="app/controllers/ClientDashboardController.js"></script>
        <script src="app/controllers/ConsultantDashboardController.js"></script>
        <script src="app/controllers/meetingaimsController.js"></script>
        <script src="app/controllers/applicantController.js"></script>
        <script src="app/controllers/employmentandincomeController.js"></script>
        <script src="app/controllers/liabilitiesController.js"></script>
        <script src="app/controllers/monthlyoutgoingController.js"></script>
        <script src="app/controllers/yourmortgagerequirementController.js"></script>
        <script src="app/controllers/anotherexistingmortgageController.js"></script>
        <script src="app/controllers/propertydetailsController.js"></script>
        <script src="app/controllers/credithistroyController.js"></script>
        <script src="app/controllers/additionalnotesController.js"></script>
        <script src="app/controllers/otherproductsController.js"></script>
        <script src="app/controllers/sourcingController.js"></script>
        <script>
            function MM_swapImgRestore() { //v3.0
                var i, x, a = document.MM_sr;
                for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
                    x.src = x.oSrc;
            }
            function MM_preloadImages() { //v3.0
                var d = document;
                if (d.images) {
                    if (!d.MM_p)
                        d.MM_p = new Array();
                    var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
                    for (i = 0; i < a.length; i++)
                        if (a[i].indexOf("#") != 0) {
                            d.MM_p[j] = new Image;
                            d.MM_p[j++].src = a[i];
                        }
                }
            }

            function MM_findObj(n, d) { //v4.01
                var p, i, x;
                if (!d)
                    d = document;
                if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
                    d = parent.frames[n.substring(p + 1)].document;
                    n = n.substring(0, p);
                }
                if (!(x = d[n]) && d.all)
                    x = d.all[n];
                for (i = 0; !x && i < d.forms.length; i++)
                    x = d.forms[i][n];
                for (i = 0; !x && d.layers && i < d.layers.length; i++)
                    x = MM_findObj(n, d.layers[i].document);
                if (!x && d.getElementById)
                    x = d.getElementById(n);
                return x;
            }

            function MM_swapImage() { //v3.0
                var i, j = 0, x, a = MM_swapImage.arguments;
                document.MM_sr = new Array;
                for (i = 0; i < (a.length - 2); i += 3)
                    if ((x = MM_findObj(a[i])) != null) {
                        document.MM_sr[j++] = x;
                        if (!x.oSrc)
                            x.oSrc = x.src;
                        x.src = a[i + 2];
                    }
            }
        </script>
        <script type="text/javascript">

            // SuperNote setup: Declare a new SuperNote object and pass the name used to
            // identify notes in the document, and a config variable hash if you want to
            // override any default settings.

            var supernote = new SuperNote('supernote', {});

            // Available config options are:
            //allowNesting: true/false    // Whether to allow triggers within triggers.
            //cssProp: 'visibility'       // CSS property used to show/hide notes and values.
            //cssVis: 'inherit'
            //cssHid: 'hidden'
            //IESelectBoxFix: true/false  // Enables the IFRAME select-box-covering fix.
            //showDelay: 0                // Millisecond delays.
            //hideDelay: 500
            //animInSpeed: 0.1            // Animation speeds, from 0.0 to 1.0; 1.0 disables.
            //animOutSpeed: 0.1

            // You can pass several to your "new SuperNote()" command like so:
            //{ name: value, name2: value2, name3: value3 }


            // All the script from this point on is optional!

            // Optional animation setup: passed element and 0.0-1.0 animation progress.
            // You can have as many custom animations in a note object as you want.
            function animFade(ref, counter)
            {
                //counter = Math.min(counter, 0.9); // Uncomment to make notes translucent.
                var f = ref.filters, done = (counter == 1);
                if (f)
                {
                    if (!done && ref.style.filter.indexOf("alpha") == -1)
                        ref.style.filter += ' alpha(opacity=' + (counter * 100) + ')';
                    else if (f.length && f.alpha)
                        with (f.alpha)
                        {
                            if (done)
                                enabled = false;
                            else {
                                opacity = (counter * 100);
                                enabled = true
                            }
                        }
                } else
                    ref.style.opacity = ref.style.MozOpacity = counter * 0.999;
            }
            ;
            supernote.animations[supernote.animations.length] = animFade;



            // Optional custom note "close" button handler extension used in this example.
            // This picks up click on CLASS="note-close" elements within CLASS="snb-pinned"
            // notes, and closes the note when they are clicked.
            // It can be deleted if you're not using it.
            addEvent(document, 'click', function (evt)
            {
                var elm = evt.target || evt.srcElement, closeBtn, note;

                while (elm)
                {
                    if ((/note-close/).test(elm.className))
                        closeBtn = elm;
                    if ((/snb-pinned/).test(elm.className)) {
                        note = elm;
                        break
                    }
                    elm = elm.parentNode;
                }

                if (closeBtn && note)
                {
                    var noteData = note.id.match(/([a-z_\-0-9]+)-note-([a-z_\-0-9]+)/i);
                    for (var i = 0; i < SuperNote.instances.length; i++)
                        if (SuperNote.instances[i].myName == noteData[1])
                        {
                            setTimeout('SuperNote.instances[' + i + '].setVis("' + noteData[2] +
                                    '", false, true)', 100);
                            cancelEvent(evt);
                        }
                }
            });


            // Extending the script: you can capture mouse events on note show and hide.
            // To get a reference to a note, use 'this.notes[noteID]' within a function.
            // It has properties like 'ref' (the note element), 'trigRef' (its trigger),
            // 'click' (whether its shows on click or not), 'visible' and 'animating'.
            addEvent(supernote, 'show', function (noteID)
            {
                // Do cool stuff here!
            });
            addEvent(supernote, 'hide', function (noteID)
            {
                // Do cool stuff here!
            });


            // If you want draggable notes, feel free to download the "DragResize" script
            // from my website http://www.twinhelix.com -- it's a nice addition :).
            var isShift = false;

            var seperator = "/";

            function DateFormat(txt, keyCode) {

                if (keyCode == 16)
                    isShift = true;
                if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {
                    if ((txt.value.length == 2 || txt.value.length == 5) && keyCode != 8){
                        txt.value += seperator;
                    }
                    return true;
                } else{
                    return false;
                }
            }


            function ValidateDate(txt, keyCode) {

                if (keyCode == 16)
                    isShift = false;

                var val = txt.value;

                var lblmesg = document.getElementById("message");

                if (val.length == 10) {
                    var splits = val.split("/");
                    var dt = new Date(splits[1] + "/" + splits[0] + "/" + splits[2]);
                    //Validation for Dates

                    if (dt.getDate() == splits[0] && dt.getMonth() + 1 == splits[1] && dt.getFullYear() == splits[2]) {
                        txt.style.border = "thin solid #cacaca";

                    } else {
                        console.log('error');
                        txt.style.border = "thin solid #a94442";
                        txt.value = "";

                        return;

                    }
                }
            }

            function stopRKey(evt) {
                var evt = (evt) ? evt : ((event) ? event : null);
                var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
                if ((evt.keyCode == 13) && (node.type == "text")) {
                    return false;
                }
                if ((evt.keyCode == 13) && (node.type == "number")) {
                    return false;
                }
            }
            document.onkeypress = stopRKey;
            $(document).keydown(function (e) {

                // Set self as the current item in focus
                var self = $(':focus'),
                        // Set the form by the current item in focus
                        form = self.parents('form:eq(0)'),
                        focusable;

                // Array of Indexable/Tab-able items
                focusable = form.find('input,a,select,textarea').filter(':visible');

                function enterKey() {
                    if (e.which === 13 && !self.is('textarea')) { // [Enter] key

                        // If not a regular hyperlink/button/textarea
                        if ($.inArray(self, focusable) && (!self.is('a,button'))) {
                            // Then prevent the default [Enter] key behaviour from submitting the form
                            e.preventDefault();
                        } // Otherwise follow the link/button as by design, or put new line in textarea

                        // Focus on the next item (either previous or next depending on shift)
                        focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();

                        return false;
                    }
                }
                // We need to capture the [Shift] key and check the [Enter] key either way.
                if (e.shiftKey) {
                    enterKey()
                } else {
                    enterKey()
                }
            });
        </script>    
    </head>
    <body class="pace-done right-side-collapsed">
        <!--BEGIN BACK TO TOP-->

        <div ng-controller="HeaderController">
            <a id="totop" href="#"><i class="fa fa-angle-up"></i></a><!--END BACK TO TOP--><!--BEGIN TOPBAR-->
            <div id="header-topbar-option-demo" class="page-header-topbar">
                <nav id="topbar" role="navigation" style="margin-bottom: 0;"  class="navbar  navbar-static-top" >
                    <div class="navbar-header" >
                        <button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span></button>
                        <a id="logo" href="" class="navbar-brand"><img src="images/logo.png" alt="Cdeals" class="img-responsive pull-left mrm" /></a></div>
                    <div class="topbar-main" > <a id="menu-toggle" href="#" class="hidden-xs"><i class="fa fa-bars"></i></a>
                        <ul class="nav navbar navbar-top-links navbar-right mbn" ng-if="isLoggedIn == 1">
                            <!--<a href="#" ng-click="logout()"><img src="images/Logout-h.png" alt="Cdeals" class="img-responsive pull-left mrm" /></a>-->

                            <li class="dropdown"><a data-hover="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-bell fa-fw"></i><span class="badge badge-green">3</span></a> </li>
                            <li class="dropdown"><a data-hover="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-envelope fa-fw"></i><span class="badge badge-orange">7</span></a> </li>
                            <li id="topbar-chat" class="hidden-xs"><a href="javascript:void(0)"  class="btn-chat"><i class="fa fa-comments"></i><span class="badge badge-info">3</span></a></li>
                            <li class="dropdown topbar-user">
                                <a class="dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">
                                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg" alt="" class="img-responsive img-circle"/>&nbsp;<span class="hidden-xs">Client1</span>&nbsp;
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-user" role="menu" aria-labelledby="menu1">
                                    <li><a><i class="fa fa-user"></i>My Profile</a></li>
                                    <li><a ng-click="logout()"><i class="fa fa-key"></i>Log Out</a></li>
                                </ul>
                                <!--                                <a  href="javascript:void(0)" class="dropdown-toggle"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg" alt="" class="img-responsive img-circle"/>&nbsp;<span class="hidden-xs">Client1</span>&nbsp;<span class="caret"></span></a>
                                                                <ul class="dropdown-menu dropdown-user pull-right">
                                                                    <li><a><i class="fa fa-user"></i>My Profile</a></li>
                                                                    <li><a ng-click="logout()"><i class="fa fa-key"></i>Log Out</a></li>
                                                                </ul>-->
                            </li>
                        </ul>
                        <ul class="nav navbar navbar-top-links navbar-right mbn" ng-if="isLoggedIn == 2">
                            <!--  <a href="#" ng-click="logout()"><img src="images/Logout-h.png" alt="Cdeals" class="img-responsive pull-left mrm" /></a>-->

                            <li class="dropdown"><a data-hover="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-bell fa-fw"></i><span class="badge badge-green">3</span></a> </li>
                            <li class="dropdown"><a data-hover="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-envelope fa-fw"></i><span class="badge badge-orange">7</span></a> </li>
                            <li id="topbar-chat" class="hidden-xs"><a href="javascript:void(0)"  class="btn-chat"><i class="fa fa-comments"></i><span class="badge badge-info">3</span></a></li>
                            <li class="dropdown topbar-user">
                                <a class="dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">
                                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/48.jpg" alt="" class="img-responsive img-circle"/>&nbsp;<span class="hidden-xs">Consultant1</span>&nbsp;
                                    <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu dropdown-user" role="menu" aria-labelledby="menu1">
                                    <li><a><i class="fa fa-user"></i>My Profile</a></li>
                                    <li><a ng-click="logout()"><i class="fa fa-key"></i>Log Out</a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
            <!--END TOPBAR-->
            <div id="message"></div>

            <div id="wrapper" class="right-sidebar" ><!--BEGIN client SIDEBAR MENU-->
                <nav id="sidebar" role="navigation" data-step="2"  data-position="right" class="navbar-default navbar-static-side" ng-if="isLoggedIn == 1">
                    <div class="sidebar-collapse menu-scroll">
                        <ul id="side-menu" class="nav">
                            <li class="user-panel"> Video Chat
                                <div class="clearfix"></div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <!--END client SIDEBAR-->
            <!--BEGIN consultant SIDEBAR MENU-->
            <div id="wrapper"><!--BEGIN SIDEBAR MENU-->
                <nav id="sidebar" role="navigation" data-step="2" class="navbar-default navbar-static-side" ng-if="isLoggedIn == 2">
                    <div class="sidebar-collapse menu-scroll">
                        <ul id="side-menu" class="nav">
                            <li class="user-panel">

                                <div class="clearfix"></div>
                            </li>
                            <li class="active"><a><i class="fa fa-tachometer fa-fw">
                                        <div class="icon-bg bg-orange"></div>
                                    </i><span class="menu-title">Dashboard</span></a></li>
                            <li><a href="#"><i class="fa fa-desktop fa-fw">
                                        <div class="icon-bg bg-pink"></div>
                                    </i><span class="menu-title">Consultants List</span><span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level" ng-repeat="consultname in check_consultantname" ng-if="consultname.client_id != session">
                                    <li ng-class="{'cht-sel': consultname.client_id == selectedid}"><a style="cursor:pointer;"><span class="badge badge-orange">7</span><span class="submenu-title">{{consultname.client_name| capitalize }}</span></a></li>
                                  <!--  <li><a href="#"><span class="badge badge-orange">7</span></i><span class="submenu-title">Consultant2</span></a></li>
                                    <li><a href="#"><span class="badge badge-orange">7</span><span class="submenu-title">Consultant3</span></a></li>-->
                                </ul>
                            </li>
                            <li><a href="#"><i class="fa fa-send-o fa-fw">
                                        <div class="icon-bg bg-green"></div>
                                    </i><span class="menu-title">Mirroring Clients</span><span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level" ng-repeat="client in client_det">
                                    <li ng-class="{'cht-sel': client.client_id == selectedid}"><a style="cursor:pointer;" ng-click="textchat(client)"><span class="badge badge-orange">7</span><span class="submenu-title">{{client.client_name| capitalize }}</span></a></li>

                                </ul>
                            </li>
                            <li><a href="#"><i class="fa fa-edit fa-fw">
                                        <div class="icon-bg bg-violet"></div>
                                    </i><span class="menu-title">Clients List</span><span class="fa arrow"></span></a>
                                <ul class="nav nav-second-level">
                                    <li><a style="cursor:pointer;"><span class="badge badge-orange">3</span><span class="submenu-title">Client1</span></a></li>
                                    <li><a style="cursor:pointer;"><span class="badge badge-orange">4</span></i><span class="submenu-title">Client2</span></a></li>
                                    <li><a style="cursor:pointer;"><span class="badge badge-orange">5</span><span class="submenu-title">Client3</span></a></li>
                                </ul>
                            </li>



                        </ul>
                    </div>
                </nav>
            </div>

            <!--END SIDEBAR MENU--><!--BEGIN CHAT FORM-->
            <div id="chat-form" class="fixed" >
                <div class="chat-inner" >
                    <h2 class="chat-header"><a href="javascript:;" class="chat-form-close pull-right"><i class="glyphicon glyphicon-remove"></i></a><i class="fa fa-user"></i>&nbsp;
                        Video Chat
                        &nbsp;<span class="badge badge-info">3</span></h2>
                </div>

            </div>
        </div> 
        <!--BEGIN PAGE WRAPPER-->
        <div id="page-wrapper"><!--BEGIN TITLE & BREADCRUMB PAGE-->

            <!--END TITLE & BREADCRUMB PAGE--><!--BEGIN CONTENT-->
            <div class="page-content">
                <!--<div ng-controller="mainController">-->
                <div ng-view>  

                </div>
                <!--</div>-->
                <div id="footer">
                    <div class="copyright text-center">© Copyright 2016. George Dodds. All Rights Reserved</div>
                </div>
                <!--END FOOTER-->
            </div>
        </div> 
        <!--END PAGE WRAPPER-->
    </body>
</html>