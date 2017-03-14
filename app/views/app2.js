var myapp = angular.module('myapp', ["checklist-model", "ng-bootstrap-datepicker", "ui.bootstrap", "ngCookies", "wiz.validation", "xml", "rorymadden.date-dropdowns", "ngAnimate"]);


//Not Necessary to Create Service, Same can be done in COntroller also as method like add() method
myapp.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,
                function (i) {
                    /* Search Text in all 3 fields */
                    return searchUtil(i, toSearch);
                });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

    this.paged1 = function (valLists1, pageSize1) {
        retVal = [];
        for (var i = 0; i < valLists1.length; i++) {
            if (i % pageSize1 === 0) {
                retVal[Math.floor(i / pageSize1)] = [valLists1[i]];
            } else {
                retVal[Math.floor(i / pageSize1)].push(valLists1[i]);
            }
        }
        return retVal;
    };

});

myapp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

myapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
});
myapp.filter('newline', function ($sce) {
    return function (text) {
        text = text.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
});
//filter Multiple...
myapp.filter('filterMultiple', ['$filter', function ($filter) {
        return function (items, keyObj) {
            if (items) {
                var filterObj = {
                    data: items,
                    filteredData: [],
                    applyFilter: function (obj, key) {
                        var fData = [];
                        if (this.filteredData.length == 0)
                            this.filteredData = this.data;
                        if (obj) {
                            var fObj = {};
                            if (angular.isString(obj)) {
                                fObj[key] = obj;
                                fData = fData.concat($filter('filter')(this.filteredData, fObj));
                            } else if (angular.isArray(obj)) {
                                if (obj.length > 0) {
                                    for (var i = 0; i < obj.length; i++) {
                                        if (angular.isString(obj[i])) {
                                            fObj[key] = obj[i];
                                            fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                        }

                                    }

                                }
                            }
                            if (fData.length > 0) {
                                this.filteredData = fData;

                            }


                        }

                    }
                };

                if (keyObj) {
                    angular.forEach(keyObj, function (obj, key) {
                        filterObj.applyFilter(obj, key);
                    });
                }

                return filterObj.filteredData;
            }
        }
    }]);

myapp.filter('filterMultiple1', ['$filter', function ($filter) {
        return function (items, keyObj1) {
            if (items) {
                var filterObj = {
                    data: items,
                    filteredData: [],
                    applyFilter: function (obj, key) {
                        var fData = [];
                        if (this.filteredData.length == 0)
                            this.filteredData = this.data;
                        if (obj) {
                            var fObj = {};
                            if (angular.isString(obj)) {
                                fObj[key] = obj;
                                fData = fData.concat($filter('filter')(this.filteredData, fObj));
                            } else if (angular.isArray(obj)) {
                                if (obj.length > 0) {
                                    for (var i = 0; i < obj.length; i++) {
                                        if (angular.isString(obj[i])) {
                                            fObj[key] = obj[i];
                                            fData = fData.concat($filter('filter')(this.filteredData, fObj));
                                        }

                                    }

                                }
                            }
                            if (fData.length > 0) {
                                this.filteredData = fData;

                            }


                        }

                    }
                };

                if (keyObj1) {
                    angular.forEach(keyObj1, function (obj, key) {
                        filterObj.applyFilter(obj, key);
                    });
                }

                return filterObj.filteredData;
            }
        }
    }]);

myapp.filter('unique', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        if (input) {
            for (var i = 0; i < input.length; i++) {
                if (typeof unique[input[i][key]] == "undefined") {
                    unique[input[i][key]] = "";
                    uniqueList.push(input[i]);
                }
            }
        }
        return uniqueList;
    };
});
myapp.filter('truncate', function () {
    return function (text, length, end) {
        if (text) {
            if (isNaN(length))
                length = 2;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length - end.length) + end;
            }
        }
        ;

    };
});
myapp.filter('roundConverter', function () {
    return function (val) {
        if (val) {
            var parsed = parseFloat(val, 10);
            if (parsed !== parsed) {
                return null;
            } // check for NaN
            var rounded = Math.round(parsed);
            return rounded;
        }
        ;

    };
});
myapp.filter('dateformat', function () {
    return function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));

    };
});
myapp.filter('changedateformat', function () {
    return function (str) {
        var date = str;
        var d = new Date(date.split("/").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        return (dd + "/" + mm + "/" + yy);
    };
});

myapp.filter('jsonDate', ['$filter', function ($filter) {
        return function (input, format) {
            return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
            // return (input) ? $filter('date')(input, format) : '';
        };
    }]);
myapp.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd/MM/yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
});
myapp.directive('moDateInput', function ($window) {
    return {
        require: '^ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue)
                    return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                scope = scope;
                if (!dateFormat || !modelValue)
                    return "";
                var retVal = moment(modelValue).local().format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                scope = scope;
                var date = moment.utc(viewValue, dateFormat);
                return (date && date.isValid()) ? date.toDate() : "";
            });
        }
    };
});
myapp.directive('onlyAlphabets', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }
            ngModel.$parsers.unshift(function (inputValue) {
                var alphabets = inputValue.split('').filter(function (s) {
                    return (isALetter(s));
                }).join('');
                ngModel.$viewValue = alphabets;
                ngModel.$render();
                return alphabets;
            });
        }
    };

    function isALetter(charVal)
    {
        if (charVal.toUpperCase() != charVal.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
});
myapp.directive('invalidDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            var invalidDate = attr.invalidDate;
            ngModel.$parsers.unshift(function (value) {
                console.log(value.length);
                if (value.length < invalidDate) {
                    ngModel.$setValidity('invalidDate', false);
                    return "";
                } else {
                    ngModel.$setValidity('invalidDate', true);
                    return value;
                }
            });
        }
    };
});
myapp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(value) {
                if (value) {
                    var transformedInput = value.replace(/[^0-9]/g, '');

                    if (transformedInput !== value) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
myapp.directive('onlyNum', function () {
    return function (scope, element, attrs) {

        var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
        element.bind("keydown", function (event) {
            console.log($.inArray(event.which, keyCode));
            if ($.inArray(event.which, keyCode) == -1) {
                scope.$apply(function () {
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
})
myapp.directive('validNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
myapp.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input))
            return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});
myapp.filter('groupBy', function ($parse) {
    // var memoizedFunc = _.memoize(func);
    //  memoizedFunc.cache;
    return _.memoize(function (items, field) {
        var getter = $parse(field);
        return _.groupBy(items, function (item) {
            return getter(item);
        });
    });

    // return _.memoize(function(collection, field) {
    // return _.groupBy(collection, field);
//}, function resolver(collection, field) {
    // return collection.length + field;
//});

});
myapp.directive('validateOldDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                var value = ngModel.$modelValue;
                a = /\/Date\((\d*)\)\//.exec(value);
                if (a) {
                    var date = new Date(parseInt(value.substr(6)));
                } else {
                    var date = new Date(value);

                }
                var year = date.getFullYear();
                //  console.log(ngModel.$modelValue);
                // console.log(year);
                if (year > '1998') {
                    ngModel.$setValidity('validateOldDate', false);
                    return "";
                } else {
                    ngModel.$setValidity('validateOldDate', true);
                    return ngModel.$modelValue;
                }
            });
        }
    };
});
function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

myapp.directive('compareDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                var value = ngModel.$modelValue;
                a = /\/Date\((\d*)\)\//.exec(value);
                if (a) {
                    var date = new Date(parseInt(value.substr(6)));
                } else {
                    var date = new Date(value);

                }
                var year = date.getFullYear();
                //  console.log(ngModel.$modelValue);
                // console.log(year);
                if ((year < '2016') && (year > '2015')) {
                    ngModel.$setValidity('compareDate', false);
                    return "";
                } else {
                    ngModel.$setValidity('compareDate', true);
                    return ngModel.$modelValue;
                }
            });
        }
    };
});
myapp.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
                console.log(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

myapp.directive('calucalteLtv', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                // var value = ngModel.$modelValue;
                var value = ((parseFloat(scope.cmortgage.PropertyValue) - parseFloat(scope.cmortgage.Deposit) + parseFloat(scope.cmortgage.CapitalRaising)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                console.log(value);
                if (!isEmpty(value) && value > '100') {
                    ngModel.$setValidity('calucalteLtv', false);
                    return "";
                } else if (!isEmpty(value) && value < '0') {
                    ngModel.$setValidity('calucalteLtv', false);
                    return "";
                } else if (!isEmpty(value) && value == '0') {
                    ngModel.$setValidity('calucalteLtv', false);
                    return "";
                } else {
                    ngModel.$setValidity('calucalteLtv', true);
                    return ngModel.$modelValue;
                }
            });
        }
    };
});
myapp.directive('remoCalucalteLtv', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                //  var value = ngModel.$modelValue; 

                if (scope.cmortgage.eMortgageTypeID == '10' || scope.cmortgage.eMortgageTypeID == '11') {

                    var value = ((parseFloat(scope.cmortgage.Contingency) + parseFloat(scope.cmortgage.CapitalRaising) + parseFloat(scope.Consolidatedliabilities)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                } else {
                    if (scope.cmortgage.ERCPaymentMode == '1') {
                        var value = ((parseFloat(scope.cmortgage.RemainingBalance) + parseFloat(scope.cmortgage.Contingency) + parseFloat(scope.cmortgage.CapitalRaising) + parseFloat(scope.Consolidatedliabilities) + parseFloat(scope.cmortgage.ERC)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;

                    } else {
                        var value = ((parseFloat(scope.cmortgage.RemainingBalance) + parseFloat(scope.cmortgage.Contingency) + parseFloat(scope.cmortgage.CapitalRaising) + parseFloat(scope.Consolidatedliabilities)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                    }
                }
                console.log(value);
                if (!isEmpty(value) && value > '100') {
                    ngModel.$setValidity('remoCalucalteLtv', false);
                    return "";
                } else if (!isEmpty(value) && value < '0') {
                    ngModel.$setValidity('remoCalucalteLtv', false);
                    return "";
                } else if (!isEmpty(value) && value == '0') {
                    ngModel.$setValidity('remoCalucalteLtv', false);
                    return "";
                } else {
                    ngModel.$setValidity('remoCalucalteLtv', true);
                    return ngModel.$modelValue;
                }
            });
        }
    };
});

myapp.directive('remoCalucalteLtvs', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                //  var value = ngModel.$modelValue; 

                if (scope.cmortgage.eMortgageTypeID == '10' || scope.cmortgage.eMortgageTypeID == '11') {

                    var value = ((parseFloat(scope.cmortgage.RemainingBalance)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                } else {
                    if (scope.cmortgage.ERCPaymentMode == '1') {
                        var value = ((parseFloat(scope.cmortgage.RemainingBalance) + parseFloat(scope.cmortgage.ERC)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;

                    } else {
                        var value = ((parseFloat(scope.cmortgage.RemainingBalance)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                    }
                }
                console.log(value);
                if (!isEmpty(value) && value > '100') {
                    ngModel.$setValidity('remoCalucalteLtvs', false);
                    return "";
                } else if (!isEmpty(value) && value < '0') {
                    ngModel.$setValidity('remoCalucalteLtvs', false);
                    return "";
                } else if (!isEmpty(value) && value == '0') {
                    ngModel.$setValidity('remoCalucalteLtvs', false);
                    return "";
                } else {
                    ngModel.$setValidity('remoCalucalteLtvs', true);
                    return ngModel.$modelValue;
                }
            });
        }
    };
});
myapp.directive('ddTextCollapse', ['$compile', function ($compile) {

        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {

                // start collapsed
                scope.collapsed = false;

                // create the function to toggle the collapse
                scope.toggle = function () {
                    scope.collapsed = !scope.collapsed;
                };

                // wait for changes on the text
                attrs.$observe('ddTextCollapseText', function (text) {

                    // get the length from the attributes
                    var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

                    if (text.length > maxLength) {
                        // split the text in two parts, the first always showing
                        var firstPart = String(text).substring(0, maxLength);
                        var secondPart = String(text).substring(maxLength, text.length);

                        // create some new html elements to hold the separate info
                        var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                        var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                        var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                        var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                        var toggleButton = $compile('<span class="collapse-text-toggle"  style="color:#11aac6; font-size: 13px; cursor:pointer;"ng-click="toggle()">{{collapsed ? "Less" : "More info"}}</span>')(scope);
                        var modalButton = $compile('<div class="clearfix"></div><span  style="color:#11aac6; font-size: 13px; cursor:pointer;"ng-click="modalv($event)" data-id="' + String(text) + '">More info</span>')(scope);

                        // remove the current contents of the element
                        // and add the new ones we created
                        element.empty();
                        element.append(firstSpan);
                        element.append(secondSpan);
                        element.append(moreIndicatorSpan);
                        element.append(lineBreak);
                        // element.append(toggleButton);
                        element.append(modalButton);
                    } else {
                        element.empty();
                        element.append(text);
                    }
                });
            }
        };
    }]);
myapp.directive('myCompare',
        function ($q, $http, $templateCache) {
            return {
                link: function (scope, element, attrs) {

                    $http.get('map.xml', {
                        cache: $templateCache
                    }).then(function (result) {
                        // console.log(result.data);
                        scope.fields = result.data.fields.fieldlist;
                        // console.log(scope.fields[0]._name);
                    });


                    if (attrs.myCompareData !== undefined) {

                        var data = attrs.myCompareData;
                        //  data = angular.fromJson(data);
                        // do something with data
                        var values = scope.fields;
                        angular.forEach(values, function (value, key) {
                            //console.log(value._name);

                            if (data == value._name) {
                                var Url = value._linkid;
                                var insidetabname = value._insidetabname;
                                var fieldname = value._fieldname;
                                //  console.log(Url);                            
                                attrs.$set('link', Url);
                                attrs.$set('insidetabname', insidetabname);
                                attrs.$set('fieldname', fieldname);
                            }
                            // console.log(data);
                        });


                    }


                }
            };
        });
/*myapp.directive('ngModel', ['$timeout', function($timeout) {
 return {
 require:'^ngModel',
 restrict: 'A',
 priority: 0,
 link: function(scope, element, attr) {
 scope.$watch(attr.ngModel, function(value) {
 $timeout(function() {
 element.trigger('change');
 console.log(value);
 if(typeof value === 'undefined' || value == "" ){
 }
 }, 0, false);
 });
 }
 };
 }]);
 
 myapp.directive('formDrctv', function() {
 return function(scope, el, attrs) {
 scope.$watch(attrs.name, function(newVal, oldVal) {
 console.log("newVal: ", newVal);
 }, true);
 
 }
 });*/


myapp.directive('datepickerPopup', function (dateFilter, datepickerPopupConfig) {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var dateFormat = attr.datepickerPopup || datepickerPopupConfig.datepickerPopup;
            ngModel.$formatters.push(function (value) {
                var retVal = new Date(parseInt(value.substr(6)));
                if (value == "")
                    return "";
                return dateFilter(retVal, dateFormat);

            });

        }
    };
});
myapp.directive('feeDirective', function () {
    return {
        restrict: 'A',
        scope: {
            ccj: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('ccj.clientids', function (newValue, oldValue) {
                console.log(newValue);
                var data = newValue.split('$$');
                if (data.length === 2) {
                    console.log(data);
                    var s = JSON.stringify(data);
                    console.log(s);
                    var string = s.replace(/"/g, '');
                    console.log(string);

                    scope.selectedClientID = {
                        ccj: string};
                    console.log(scope.selectedClientID);
                    //   scope.tests = data[0]; 
                    //   scope.tests1 = data[1]; 
                }
            }, true);
        }
    }
});

/*
 myapp.directive('dateAsMs', function() {
 return {
 restrict: 'A',
 require: 'ngModel',
 link: function(scope,elem,attrs,ngModelCtrl) { 
 
 ngModelCtrl.$formatters.unshift(function (modelValue) {
 var value = ngModelCtrl.$modelValue;
 //     var retVal = new Date(parseInt(value.substr(6)));
 var retVal = moment(modelValue).local().format('DD/MM/YYYY');
 console.log(retVal); 
 return retVal;
 });
 
 ngModelCtrl.$parsers.unshift(function (viewValue) {
 var value = ngModelCtrl.$viewValue;
 //   var retVal = new Date(parseInt(value.substr(6))); 
 console.log(value);
 return viewValue;
 }); 
 
 }
 };
 });
 
 */
myapp.directive('myCombineDirective', function () {
    return {
        restrict: 'A',
        priority: 1,
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            scope.$watch(function () {
                if (attrs.myCombineDirective === " / ") {

                    ngModel.$formatters.unshift(function (modelValue) {
                        var value = ngModel.$modelValue;
                        console.log(value);
                        return value;
                    });
                } else {
                    ngModel.$setViewValue(attrs.myCombineDirective);
                    ngModel.$modelValue = attrs.myCombineDirective;
                    return ngModel.$modelValue;
                }

            }, function (v) {
                console.log(v);
            });
        }
    };
});

myapp.directive('uploadFiles', function () {
    return {
        scope: true, //create a new scope  
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files[0];
                scope.$emit("seletedFile", {file: files});
                console.log(files.name);
                // refferences
                //  var files = event.target.files;   
                //iterate files since 'multiple' may be specified on the element  
                //   for (var i = 0; i < files.length; i++) {  
                //emit event upward  
                // scope.$emit("seletedFile", { file: files[i] });                     
                //    console.log(files[i].name);
                //   scope.filename = files[i].name;
                // }  
            });
        }
    };
});


function SearchCtrl($scope, $http, $rootScope, $filter, $element, filteredListService, filterFilter, $window, $cookieStore) {

    //  url = http://localhost/sourcing/index.html?/#/?username=samplename&tocken=tocken

    //  $location.search();
    //  console.log( $location.search().username);

    // $scope.SearchDate = moment(new Date()).format("DD/MM/YYYY")

    //1. Used to list all selected files  
    $scope.files = [];

    //3. listen for the file selected event which is raised from directive  
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection  
            $scope.files.push(args.file);
            console.log($scope.files);
        });
    });

    $scope.jsonData = {};
    //4. Post data and selected files.  
    $scope.save = function (savefile) {
        $scope.loader.uploadloading = true;
        $scope.jsonData = angular.copy(savefile);

        $scope.jsonData.APPID = $rootScope.appids;
        $scope.jsonData.FFID = $rootScope.FFID;

        var dataObj1 = $scope.jsonData;
        var res = $http({
            method: 'POST',
            url: "checkCaseDocuments.php",
            headers: {'Content-Type': undefined},
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                var datalength = data.files.length - 1;
                console.log(datalength);
                formData.append("file", data.files[datalength]);
                //  for (var i = 0; i < data.files.length; i++) {  
                //   formData.append("file" + i, data.files[i]); 

                // }  
                return formData;
            },
            data: {model: $scope.jsonData, files: $scope.files}
        })
        res.success(function (data, status, headers, config) {
            $rootScope.docexist = data.existdoc;



            if (!isEmpty($rootScope.docexist) && ($rootScope.docexist == '0')) {
                $http({
                    method: 'POST',
                    url: "SaveCaseDocuments.php",
                    headers: {'Content-Type': undefined},
                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("model", angular.toJson(data.model));
                        var datalength = data.files.length - 1;
                        console.log(datalength);
                        formData.append("file", data.files[datalength]);
                        //  for (var i = 0; i < data.files.length; i++) {  
                        //   formData.append("file" + i, data.files[i]); 

                        // }  
                        return formData;
                    },
                    data: {model: $scope.jsonData, files: $scope.files}
                }).
                        success(function (data, status, headers, config) {
                            //  alert("success!");  
                            $scope.loader.uploadloading = false;
                            $("#docmodal").modal('hide');

                            angular.element(document.getElementById('message')).append('<div class="alert alert-success"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong>  Document uploaded successfully  </div>');
                            $scope.hidealert = hidealert();
                        }).
                        error(function (data, status, headers, config) {
                            // alert("failed!");  
                        });

            } else {

                $scope.loader.uploadloading = false;
                $("#docmodal").modal('hide');

                angular.element(document.getElementById('message')).append('<div class="alert alert-warning"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Sorry!</strong> Already document exist  </div>');
                $scope.hidealert = hidealert();

                // alert("Exist!");  
            }
        });

    };


    $scope.show3 = 'true';

    $scope.getmonth = function ($event) {

        var dayspermonth = [];

        var ID = $($event.target).data('value');
        var panelID1 = $($event.target).data('panel1');
        var panelID2 = $($event.target).data('panel2');


        var getmonths = ID.substr(0, 3);
        var getyears = ID.substr(5, 9);

        var month = new Array();

        month['Jan'] = "1";
        month['Feb'] = "2";
        month['Mar'] = "3";
        month['Apr'] = "4";
        month['May'] = "5";
        month['Jun'] = "6";
        month['Jul'] = "7";
        month['Aug'] = "8";
        month['Sep'] = "9";
        month['Oct'] = "10";
        month['Nov'] = "11";
        month['Dec'] = "12";

        var n = month[getmonths];
        console.log(n);
        console.log(getyears);
        daysInMonth(n, getyears);

        function daysInMonth(month, year) {
            var datespermonth = new Date(year, month, 0).getDate();
            var cumonth = new Date(year, month, 0).getMonth() + '/' + new Date(year, month, 0).getFullYear();
            var frommonth = new Date().getMonth() + '/' + new Date().getFullYear();
            console.log(cumonth);
            console.log(frommonth);
            if (cumonth === frommonth) {
                var datespermonth = new Date().getDate();
            }
            for (var i = 1; i <= datespermonth; i++) {
                dayspermonth.push(i);
                // return i; 
            }
        }

        if (!isEmpty(panelID1) || !isEmpty(panelID2)) {
            $scope[panelID1] = 'ng-hide';
            $scope[panelID2] = 'ng-show';
            //$scope.customshow =[];
            // $scope.customshow.pop('ng-hide');
            console.log($scope[panelID1]);
        }

        $scope.dayspermonth = dayspermonth;
        $scope.monthyear = ID;
        console.log($scope.dayspermonth);



    };

    $scope.getdays = function ($event) {

        var getdays = $($event.target).data('value');
        $scope.days = getdays;
        var panelID1 = $($event.target).data('panel1');
        if (!isEmpty(panelID1)) {
            $scope[panelID1] = 'ng-hide';
            console.log($scope[panelID1]);

        }
    };


    $scope.showdates = function ($event) {

        var panel1 = $($event.target).data('panel1');

        var panel2 = $($event.target).data('panel2');
        if (!isEmpty(panel1) || !isEmpty(panel2)) {

            $scope[panel1] = 'ng-show';
            $scope[panel2] = 'ng-show';
            console.log($scope[panel2]);

        }
    };


    var unique = function (origArr) {
        var newArr = [],
                origLen = origArr.length,
                found, x, y;

        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x] === newArr[y]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }


    $scope.testData = {
        realDate: new Date()
    };

    var today = new Date();
    var today24 = new Date();
    var today36 = new Date();
    var today72 = new Date();
    today.setMonth(today.getMonth() - 12);
    today24.setMonth(today24.getMonth() - 24);
    today36.setMonth(today36.getMonth() - 36);
    today72.setMonth(today72.getMonth() - 72);

    var date = new Date();
    var months = [],
            months24 = [],
            months36 = [],
            months72 = [],
            monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < 13; i++) {
        months.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }

    $scope.months = unique(months);


    console.log($scope.months);
    var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (var i = 0; i < 13; i++) {
        months24.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months24 = unique(months24);
    console.log($scope.months24);
    var date = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());
    for (var i = 0; i < 13; i++) {
        months36.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months36 = unique(months36);
    console.log($scope.months36);
    var date = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());
    for (var i = 0; i < 37; i++) {
        months72.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());

        // Subtract a month each time
        date.setMonth(date.getMonth() - 1);
    }
    $scope.months72 = unique(months72);
    console.log($scope.months72);



    $scope.tre = today;

    $scope.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    $scope.minDate24 = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());
    $scope.maxDate24 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    $scope.minDate36 = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());
    $scope.maxDate36 = new Date(today24.getFullYear(), today24.getMonth(), today24.getDate());

    $scope.minDate72 = new Date(today72.getFullYear(), today72.getMonth(), today72.getDate());
    $scope.maxDate72 = new Date(today36.getFullYear(), today36.getMonth(), today36.getDate());

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.toggleMin = function () {
        $scope.maxDate = $scope.maxDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];


    $http.get('map.xml').success(function (data) {
        $scope.fields = data.fields.fieldlist;
        console.log($scope.fields);
    });

    $scope.checkdatas = 'nodata';

    $scope.dateFormat = "DD/MM/YYYY";

    // $scope.format = 'yyyy/MM/dd';

    // for select 5 products in shortlist
    $scope.limit = 5;
    $scope.checked = 0;

    $scope.checkChanged = function (five) {
        if (five)
            $scope.checked++;
        else
            $scope.checked--;
        console.log($scope.checked);
        if ($scope.checked == 5)
            alert('5 products selected');
    }

    $scope.filterlimit = 2;
    $scope.filterchecked = 0;
    $scope.checklistChanged = function (ProductType) {
        if (ProductType)
            $scope.filterchecked++;
        else
            $scope.filterchecked--;
        console.log($scope.filterchecked);
        //  if($scope.filterchecked == 2)
        //   alert('2 only allowed');
    }

    $scope.termlimit = 2;
    $scope.termchecked = 0;
    $scope.checktermlistChanged = function (Term) {
        if (Term)
            $scope.termchecked++;
        else
            $scope.termchecked--;
        console.log($scope.termchecked);
        // if($scope.termchecked == 2)
        // alert('2 only allowed');
    }

    $scope.onelimit = 1;
    $scope.onechecked = 0;
    $scope.onecheckChanged = function (ProductID) {
        if (ProductID)
            $scope.onechecked++;
        else
            $scope.onechecked--;
        console.log($scope.onechecked);
        if ($scope.onechecked == 1)
            alert('1 only allowed');
    }

    // Return today's date and time
    var currentTime = new Date()

// returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1

// returns the day of the month (from 1 to 31)
    var day = currentTime.getDate()

// returns the year (four digits)
    var year = currentTime.getFullYear()

    $scope.currentyears = year;
// $scope.currentyear = null;
    // $scope.YearBuiltIn = null;

    $scope.$watch('property.YearBuiltIn', function (newVal, oldVal) {
        // do something here

        if (newVal == null) {
            $scope.currentyear = '0';
        } else {
            $scope.currentyear = year;
        }
    }, true);



    //$scope.url = 'applicant.php'; // The url of our search
    $scope.selectedClientID = {
        // roles: [2, 4]

    };

    $scope.countryList = [
        {CountryId: 1, Name: 'India'},
        {CountryId: 2, Name: 'USA'}
    ];

    $scope.cityList = [];

    $scope.$watch('user.country', function (newVal, oldVal) {

        if (newVal == 1)
            $scope.cityList = [
                {CountryId: 1, CityId: 1, Name: 'Noida'},
                {CountryId: 1, CityId: 2, Name: 'Delhi'}];
        else if (newVal == 2)
            $scope.cityList = [
                {CountryId: 2, CityId: 3, Name: 'Texas'},
                {CountryId: 2, CityId: 4, Name: 'NewYork'}];
        else
            $scope.cityList = [];
    });



    $scope.datepickerOptions = {
        format: 'mm/dd/yyyy',
        autoclose: true,
        weekStart: 0
    };


    $scope.eventformvalidate = {
        rules: {
            Subject: {
                required: true,
                email: true
            }
        },
        messages: {
            Subject: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        validateOnInit: true
    };

    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    };

    $scope.IsVisibleemployement1 = false;
    $scope.ShowHide1 = function () {
        //If DIV is visible it will be hidden and vice versa. 
        $scope.IsVisibleemployement1 = $scope.IsVisibleemployement1 ? false : true;
    };

    $scope.next = function () {
        //If DIV is visible it will be hidden and vice versa. 
        $('.nav-pills .active').next('li').find('a').trigger('click');
        $scope.scrolltop = scrolltop();
    };
    $scope.previousstep = function () {
        //If DIV is visible it will be hidden and vice versa. 
        $('.nav-pills .active').prev('li').find('a').trigger('click');
        $scope.scrolltop = scrolltop();
    };

    $scope.topradio = function () {

        $scope.scrolltop = scrolltop();
    };
    $scope.change = function () {

        $rootScope.checkboxSelection = $scope.checkboxSelection;
    };


    $scope.showlenderlist = false;

    $scope.$watch('lenderlist', function (newVal, oldVal) {
        // do something here

        if (newVal) {
            $scope.showlenderlist = true;
        } else {
            $scope.showlenderlist = false;
        }

    }, true);

    $scope.showotherproduct = false;


    $scope.ShowHideotherproduct = function (meetingaims) {

        $scope.LifeApp = meetingaims.LifeApp;
        $scope.HomeInsuranceApp = meetingaims.HomeInsuranceApp;
        if ($scope.LifeApp === true || $scope.HomeInsuranceApp === true) {
            $scope.showotherproduct = true;
        } else {
            $scope.showotherproduct = false;
        }

    };



    $scope.createnewfactfind = true;

    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function () {

        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.




        $http.post('applicant.php', {"data": $scope.keywords}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.result = response.data; // Show result from server in our <pre></pre> element
                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });





    };


    function formatter(value) {
        if (value === true) {
            return 'Yes';
        } else if (value === false) {
            return 'No';
        } else {
            return '';
        }
    }


    $scope.modal = function ( ) {

        $("#signup").modal();
    }
    $scope.docmodal = function ( ) {

        $("#docmodal").modal();
    }

    $scope.scomparisonmodal = function ( ) {

        $("#securedloancomparison").modal();
    }
    $scope.mcomparisonmodal = function ( ) {

        $("#mortgageloancomparison").modal();
    }
    $scope.emcomparisonmodal = function ( ) {

        $("#emortgageloancomparison").modal();
    }
    $scope.pcomparisonmodal = function ( ) {

        $("#purchaseloancomparison").modal();
    }

    $scope.addmcomparisonmodal = function ( ) {

        $("#addmortgageloancomparison").modal();
    }

    $scope.notmcomparisonmodal = function ( ) {

        $("#notmortgageloancomparison").modal();
    }


    $scope.remindermodal = function ( ) {

        $("#reminder").modal();
    }

    $scope.editaddressmodal = function ( ) {

        $("#editaddressmodal").modal();
    }



    $scope.modalv = function (e) {
        $("#viewvalue").modal();
        var id = $(e.target).data('id');
        console.log(id);
        // $('#value_id').val(id);
        document.getElementById("value_id").innerHTML = id;
    };



    $scope.checkboxModel = {
        value1: true
    };


    $scope.toJsDate = function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));
    }
    $scope.toJsDate1 = function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));
    }


    $scope.toJsDate2 = function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));
    }
    $scope.startDate = function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));
    }
    $scope.endDate = function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));
    }


    // $scope.$watch('res.DOB', function (newValue) {
    // $scope.DOB = $filter('date')(newValue, 'dd/mm/yyyy'); 
    //$scope.DOB = $filter('date')(new Date(newValue), 'yyyy/MM/dd');
    //  });



    $scope.loader = {
        loading: false,
    };

    $scope.loggedin = false;

    $scope.login = {};
    $scope.logined = function (login) {

        $scope.login = angular.copy(login);

        var dataObj = $scope.login;

        $http.post('GetUserDetailsByPassword.php', dataObj).success(function (response, status) {

            $scope.users = response.data;
            $rootScope.UserID = response.data[0].UserID;
            console.log($rootScope.UserID);

            if ($rootScope.UserID == 'empty') {

                angular.element(document.getElementById('message')).append('<div class="alert alert-warning"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Sorry!</strong> Please enter valid logins  </div>');
                $scope.hidealert = hidealert();

            } else {

                //set the browser session, to avoid relogin on refresh
                $window.sessionStorage["userInfo"] = JSON.stringify($rootScope.UserID);
                $scope.loggedin = true;

                //or
                $rootScope.currentUser = $rootScope.UserID;

                console.log($rootScope.UserID);
                //run success function
                //success($scope.login.username);


            }
            ;


        });


    };


    if ($window.sessionStorage["userInfo"]) {
        $scope.loggedin = true;
        $cookieStore.put("currentUser", $window.sessionStorage["userInfo"]);
        console.log($cookieStore.get('currentUser'));
    }
    ;

    var setCurrentUser = function () {
        $scope.currentUser = $cookieStore.get('currentUser');
        console.log($rootScope.currentUser);
    };

    $scope.logout = function () {
        $window.location.reload();
        $window.sessionStorage.removeItem("userInfo");
        //$scope.loggedin = false;      
        $cookieStore.remove('currentUser');

    };

    if ($cookieStore.get('currentUser')) {
        $scope.loggedin = true;
    }
    ;

    //post method create factfind

    $scope.master = {};

    $scope.createff = function (ff) {
        $scope.showeditpanel = true;

    };
    //post method create appid


    // create meeting aims
    $scope.editmeetingaims = false;
    $scope.addmeetingaims = true;
    $scope.meetingaimsdata = {};

    $scope.createmeetingaims = function (meetingaims) {

        $scope.loader.meetingaimsloading = true;

        $scope.meetingaimsdata = angular.copy(meetingaims);

        if ($scope.meetingaimsdata.MeetingAimsID == '0') {

            if ($scope.currentUser) {
                $scope.ff = {
                    UserID: $scope.currentUser,
                    eCaseStatusID: '1',
                    ModifiedBy: $scope.currentUser
                }
            }
            ;
            if ($cookieStore.get('currentUser')) {
                $scope.ff = {
                    UserID: $cookieStore.get('currentUser'),
                    eCaseStatusID: '1',
                    ModifiedBy: $cookieStore.get('currentUser')
                }
            }
            ;
            var dataObj = $scope.ff;
            var res = $http.post('createff.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.showffid = data;
                $scope.appid = data;
                $scope.applicant = data;
                //$scope.employment1 = data;
                //$scope.employment2 = data;
                $scope.expenditure = data;
                $scope.liabilities = data;
                $scope.othermortgage = data;
                $scope.extraq = data;
                $scope.ccj = data;
                $scope.arrears = data;
                $scope.defaults = data;
                $scope.Bankruptcy = data;
                $scope.iva = data;
                $scope.Repossession = data;
                $scope.Address = data;
                $rootScope.FFID = data.FFID;
                $scope.success = true;
                console.log(data);
                // $scope.loader.loading = false ;
                // var link = "http://www.google.com/";
                //window.open(link,'newStuff'); //open's link in newly opened tab!

                $('.panel-collapse').collapse('hide');
                //$('#collapse3').collapse('show');
                //$('#collapse2').collapse('hide'); 

                $scope.masterid = {};
                $scope.masterid.FFID = $rootScope.FFID;


                var dataObj1 = $scope.masterid;
                var res = $http.post('createapp.php', dataObj1);
                res.success(function (data, status, headers, config) {
                    $scope.resultapp = data;
                    //$scope.resultapp = thedata;
                    $scope.success = true;
                    console.log(data);
                    // $scope.loader.loading = false ;
                });




                var dataObj1 = $scope.masterid;
                var res = $http.post('GetAppid.php', dataObj1);
                res.success(function (data, status, headers, config) {
                    $scope.cmortgage = data;
                    $rootScope.appids = data.Appid;
                    //  $rootScope.appids = angular.copy($scope.test);
                    //$scope.resultapp = thedata;
                    $scope.success = true;
                    console.log(data);
                    $scope.loader.ffloading = false;


                });

                $scope.meetingaimsdata.FFID = $rootScope.FFID;
                console.log($scope.meetingaimsdata);
                var dataObj1 = $scope.meetingaimsdata;
                var res = $http.post('Createmeetingaims.php', dataObj1);
                res.success(function (data, status, headers, config) {
                    $rootScope.MeetingAimsID = data.MeetingAimsID;
                    $scope.MeetingAimsID = data.MeetingAimsID;
                    //  $rootScope.appids = angular.copy($scope.test);
                    //$scope.resultapp = thedata;
                    $scope.success = true;
                    console.log($rootScope.MeetingAimsID);
                    // $scope.loader.loading = false ; 
                    $scope.loader.meetingaimsloading = false;
                    angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Meeting aims saved</div>');
                    $scope.hidealert = hidealert();
                    $scope.next();
                    if ($rootScope.MeetingAimsID > 0) {
                        $http.post('getmeetingaims.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                                success(function (response, status) {
                                    $scope.status = status;
                                    //  $scope.data = data; 
                                    $scope.meetingaims = response.data; // Show result from server in our <pre></pre> element          
                                    console.log($scope.meetingaims);
                                    $scope.editmeetingaims = true;
                                    $scope.addmeetingaims = false;


                                });
                    }

                });




            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
            });

        } else {
            $scope.meetingaimsdata.FFID = $rootScope.FFID;
            console.log($scope.meetingaimsdata);
            var dataObj1 = $scope.meetingaimsdata;
            var res = $http.post('Createmeetingaims.php', dataObj1);
            res.success(function (data, status, headers, config) {
                $rootScope.MeetingAimsID = data.MeetingAimsID;
                $scope.MeetingAimsID = data.MeetingAimsID;
                //  $rootScope.appids = angular.copy($scope.test);
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log($rootScope.MeetingAimsID);
                // $scope.loader.loading = false ; 
                $scope.loader.meetingaimsloading = false;
                angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Meeting aims saved</div>');
                $scope.hidealert = hidealert();
                $scope.next();
                if ($rootScope.MeetingAimsID > 0) {
                    $http.post('getmeetingaims.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.meetingaims = response.data; // Show result from server in our <pre></pre> element          
                                console.log($scope.meetingaims);
                                $scope.editmeetingaims = true;
                                $scope.addmeetingaims = false;


                            });
                }

            });
        }

    };

    $scope.addnotes = true;
    $scope.editnotes = false;

    // save notes 
    $scope.notes = {};

    $scope.savenotes = function (note) {
        $scope.loader.notesloading = true;
        $("#signup").modal('hide');
        $scope.notes = angular.copy(note);
        $scope.notes.FFID = $rootScope.FFID;
        $scope.notes.AppID = $rootScope.appids;
        if ($rootScope.currentUser) {
            $scope.notes.Modified_By = $rootScope.currentUser;
        }
        if ($cookieStore.get('currentUser')) {
            $scope.notes.Modified_By = $cookieStore.get('currentUser');
        }
        console.log($scope.notes);
        var dataObj1 = $scope.notes;
        var res = $http.post('createnotes.php', dataObj1);
        res.success(function (data, status, headers, config) {
            $rootScope.NoteID = data.NoteID;
            $scope.success = true;

            $scope.loader.notesloading = false;
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Notes saved</div>');
            $scope.hidealert = hidealert();



            $http.post('getnotes.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.notess = response.data; // Show result from server in our <pre></pre> element          
                        console.log($scope.notes);

                        if (response.data == null) {
                            $scope.editnotes = false;
                            $scope.addnotes = true;
                        } else {
                            $scope.editnotes = true;
                            $scope.addnotes = false;
                        }

                    });

        });


    };



    // save notes 
    $scope.saveremindervalue = {};

    $scope.savereminder = function (reminder) {
        $scope.loader.notesloading = true;


        $scope.saveremindervalue = angular.copy(reminder);
        $scope.saveremindervalue.FFID = $rootScope.FFID;
        $scope.saveremindervalue.ReminderDate = $scope.saveremindervalue.ReminderDated + " " + $scope.saveremindervalue.ReminderDatehour + ":" + $scope.saveremindervalue.ReminderDatemin + ":" + $scope.saveremindervalue.ReminderDatesec;

        console.log($scope.saveremindervalue.ReminderDate);
        if ($rootScope.currentUser) {
            $scope.saveremindervalue.Modified_By = $rootScope.currentUser;
        }
        if ($cookieStore.get('currentUser')) {
            $scope.saveremindervalue.Modified_By = $cookieStore.get('currentUser');
        }
        var dataObj1 = $scope.saveremindervalue;
        var res = $http.post('savereminder.php', dataObj1);
        res.success(function (data, status, headers, config) {
            $scope.reminder = data;
            console.log($scope.reminder);
            $scope.success = true;

            $scope.loader.notesloading = false;
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Reminder saved</div>');
            $scope.hidealert = hidealert();
            $("#reminder").modal('hide');
        });


    };

    $scope.master = {};

    $scope.createapp = function (appid) {

        $scope.loader.loading = true;

        $scope.success = false;
        $scope.master = angular.copy(appid);

        var dataObj = $scope.master;
        var res = $http.post('createapp.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultapp = data;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.loading = false;

            var dataObj1 = $scope.master;
            var res = $http.post('Createmeetingaims.php', dataObj1);
            res.success(function (data, status, headers, config) {
                $rootScope.MeetingAimsID = data.MeetingAimsID;
                //  $rootScope.appids = angular.copy($scope.test);
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log($rootScope.MeetingAimsID);
                $scope.loader.loading = false;

            });


            var dataObj1 = $scope.master;
            var res = $http.post('GetAppid.php', dataObj1);
            res.success(function (data, status, headers, config) {
                $scope.cmortgage = data;
                $rootScope.appids = data.Appid;
                //  $rootScope.appids = angular.copy($scope.test);
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.loading = false;

                $('.active').next('li').find('a').trigger('click');



            });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };

    //post method create appid

    $scope.master = {};

    $scope.createapplicant = function (applicant) {

        $scope.loader.applicantloading = true;

        $scope.success = false;
        $scope.master = angular.copy(applicant);
        $scope.master.FFID = $rootScope.FFID;
        console.log($scope.master.txtDateofBirth1);

        var val = $scope.master.txtDateofBirth1;
        var splits = val.split("/");
        var dt = splits[1] + "/" + splits[0] + "/" + splits[2];
        $scope.master.txtDateofBirth1 = dt;
        console.log($scope.master.txtDateofBirth1);
        $rootScope.applicantsno = $scope.master.applicantno;
        $rootScope.MobilePhones = $scope.master.MobilePhone;
        $rootScope.EmailAddresss = $scope.master.EmailAddress;
        $rootScope.txtDateofBirth1s = $scope.master.txtDateofBirth1;

        //$scope.employment.ClientID = '5490';
        var dataObj = $scope.master;
        var res = $http.post('createapplicant.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultapplicant = data;
            $scope.employment = data;
            $scope.ClientID = data.ClientID;
            $rootScope.ClientIDs = data.ClientID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.reset();
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant saved</div>');
            $scope.hidealert = hidealert();
            //  $('.nav-tabs-inside .active').next('li').find('a').trigger('click'); 


            $scope.appclients = {};
            $scope.appclients.FFID = $rootScope.FFID;
            $scope.appclients.AppID = $rootScope.appids;
            $scope.appclients.ClientID = $rootScope.ClientIDs;


            var dataObjapp = $scope.appclients;
            console.log($scope.appclients);
            var res = $http.post('createAppClients.php', dataObjapp);
            res.success(function (data, status, headers, config) {
                $scope.resultapplicents = data;

            });

            $scope.masteradd = {};
            $scope.masteradd.FFID = $rootScope.FFID;
            $scope.masteradd.eAddressTypeID = '1';
            $scope.masteradd.ClientID = $rootScope.ClientIDs;
            $scope.masteradd.MobilePhone = $rootScope.MobilePhones;
            $scope.masteradd.EmailAddress = $rootScope.EmailAddresss;
            var dataObj = $scope.masteradd;
            var res = $http.post('createaddress.php', dataObj);
            res.success(function (data, status, headers, config) {
                $rootScope.clientaddressid = data.AddressID;
                console.log($rootScope.clientaddressid);
                $scope.master.ClientID = $rootScope.ClientIDs;
                $scope.master.AddressID = $rootScope.clientaddressid;
                $scope.master.txtDateofBirth1 = $rootScope.txtDateofBirth1s;

                var dataObj = $scope.master;
                var res = $http.post('createapplicant.php', dataObj);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                    $http.post('getapplicant.php', {"data": $rootScope.FFID}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.result = response.data; // Show result from server in our <pre></pre> element
                                $scope.employment = response.data;
                                $rootScope.ClientID1 = response.data[0].ClientID;
                                $rootScope.Clientname1 = response.data[0].Firstname;
                                $rootScope.Clientname2 = response.data[0].Surname;
                                $scope.employment1 = {};
                                $scope.employment1.ClientID = $rootScope.ClientID1;
                                $scope.employment1.FFID = $rootScope.FFID;
                                console.log($scope.employment1.ClientID);
                                $rootScope.clientaddressid0 = response.data[0].AddressID;
                                if ($rootScope.clientaddressid0) {
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid0}).
                                            success(function (response, status) {

                                                $scope.result[0].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[0].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[0].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }

                                $rootScope.ClientID2 = response.data[1].ClientID;
                                $scope.employment2 = {};
                                $scope.employment2.ClientID = $rootScope.ClientID2;
                                $scope.employment2.FFID = $rootScope.FFID;
                                console.log($scope.employment2.ClientID);
                                $rootScope.clientaddressid1 = response.data[1].AddressID;
                                if ($rootScope.clientaddressid1) {
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid1}).
                                            success(function (response, status) {

                                                $scope.result[1].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[1].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[1].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }

                                $rootScope.ClientID3 = response.data[2].ClientID;
                                $scope.employment3 = {};
                                $scope.employment3.ClientID = $rootScope.ClientID3;
                                $scope.employment3.FFID = $rootScope.FFID;
                                console.log($scope.employment3.ClientID);
                                $rootScope.clientaddressid2 = response.data[2].AddressID;
                                if ($rootScope.clientaddressid2) {
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid2}).
                                            success(function (response, status) {

                                                $scope.result[2].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[2].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[2].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }

                                $rootScope.ClientID4 = response.data[3].ClientID;
                                $scope.employment4 = {};
                                $scope.employment4.ClientID = $rootScope.ClientID4;
                                $scope.employment4.FFID = $rootScope.FFID;
                                console.log($scope.employment4.ClientID);
                                $rootScope.clientaddressid3 = response.data[3].AddressID;
                                if ($rootScope.clientaddressid3) {
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid3}).
                                            success(function (response, status) {

                                                $scope.result[3].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[3].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[3].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }

                                console.log($scope.employment);


                            });
                });


            });

            var res = $http.post('GetClientListByAppid.php', dataObjapp);
            res.success(function (response, status, headers, config) {
                $scope.resultclientresult = response.data;
                console.log($scope.resultclientresult);
                //  $('.active').next('li').find('a').trigger('click');
                $scope.selectedClientID = {
                    ccj: [$scope.resultclientresult[0].ClientID],
                    liabilities: [$scope.resultclientresult[0].ClientID],
                    othermortgage: [$scope.resultclientresult[0].ClientID],
                    arrears: [$scope.resultclientresult[0].ClientID],
                    defaults: [$scope.resultclientresult[0].ClientID],
                    Bankruptcy: [$scope.resultclientresult[0].ClientID],
                    iva: [$scope.resultclientresult[0].ClientID],
                    Repossession: [$scope.resultclientresult[0].ClientID]
                };

            });






            $scope.loader.applicantloading = false;


            if ($rootScope.checkboxSelection == $rootScope.applicantsno) {

                var value = $rootScope.applicantsno;
                var emp = 'a[id="employment' + '1' + '"]';
                console.log(emp);
                $('.active').next('li').find('a').trigger('click');
                $('.nav-tabs-inside li').find(emp).trigger('click');
                scrolltop();
            } else {
                console.log($rootScope.applicantsno);
                $('.nav-tabs-inside .active').next('li').find('a').trigger('click');
                scrolltop();

            }


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };

    $scope.reset = function () {
        $scope.applicant = {};
        $scope.applicant.eTitleID = null;
        $scope.applicant.eMaritalStatusID = null;
        $scope.applicant.eGenderID = null;
        $scope.applicant.eNationalityID = null;
        $scope.applicant.ddlProofofResidency1 = null;
        $scope.applicant.txtDateofBirth1 = null;
        $scope.applicant.rblOnVotersRoll1 = null;
    }


    $scope.addexpenditure = true;
    $scope.editexpenditure = false;

    //post method for Save expenditures

    $scope.masters = {};

    $scope.createexpenditure = function (expenditure) {

        $scope.loader.addexpendloading = true;
        $scope.loader.editexpendloading = true;

        $scope.success = false;
        $scope.masters = angular.copy(expenditure);


        var dataObj = $scope.masters;
        var res = $http.post('saveexpenditures.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);

            // var link = "http://www.google.com/";
            //window.open(link,'newStuff'); //open's link in newly opened tab!
            //$('.active').next('li').find('a').trigger('click');
            $scope.messages.ExpenditureID = data;

            console.log($scope.messages.ExpenditureID);
            $http.post('getexpenditure.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getexpenditure = response.data; // Show result from server in our <pre></pre> element
                        $scope.loader.addexpendloading = false;
                        $scope.loader.editexpendloading = false;
                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Monthly Outgoing saved</div>');
                        $scope.hidealert = hidealert();
                        $('.active').next('li').find('a').trigger('click');
                        $scope.scrolltop = scrolltop();
                    });

            $scope.addexpenditure = false;
            $scope.editexpenditure = true;

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    //post method for Save expenditures

    $scope.masterlia = {};

    $scope.createliabilities = function (liabilities) {

        $scope.loader.addliabloading = true;
        $scope.loader.editliabloading = true;

        $scope.success = false;
        $scope.masterlia = angular.copy(liabilities);
        if ($scope.masterlia.StartDate1) {
            var val = $scope.masterlia.StartDate1;
            var splits = val.split("/");
            $scope.masterlia.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterlia.StartDate);
        }
        if ($scope.masterlia.EndDate1) {
            var val = $scope.masterlia.EndDate1;
            var splits = val.split("/");
            $scope.masterlia.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterlia.EndDate);
        }



        // $rootScope.ClientID = $scope.masterlia.testing;
        // $scope.text = $rootScope.ClientID;
        $scope.masterlia.FFID = $rootScope.FFID;
        var dataObj = $scope.masterlia;

        console.log($scope.masterlia);
        console.log($scope.text);

        var res = $http.post('createliabilities.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //  $scope.loader.loading = false ; 
            $rootScope.LiabilityID = data.LiabilityID;

            if (($scope.selectedClientID.liabilities[0]) > 0) {

                $scope.liabilities = {};
                $scope.liabilities.ScopeID = $rootScope.LiabilityID;
                // $scope.liabilities.ClientID  = $rootScope.ClientID;

                $scope.liabilities.ClientID = $scope.selectedClientID.liabilities[0];
                console.log($scope.liabilities.ClientID);
                $scope.liabilities.eFinancialCategoryID = '1';
                var dataObjapps = $scope.liabilities;
                console.log($scope.liabilities);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            if (($scope.selectedClientID.liabilities[1]) > 0) {

                $scope.liabilities = {};
                $scope.liabilities.ScopeID = $rootScope.LiabilityID;
                // $scope.liabilities.ClientID  = $rootScope.ClientID;

                $scope.liabilities.ClientID = $scope.selectedClientID.liabilities[1];
                console.log($scope.liabilities.ClientID);
                $scope.liabilities.eFinancialCategoryID = '1';
                var dataObjapps = $scope.liabilities;
                console.log($scope.liabilities);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            if (($scope.selectedClientID.liabilities[2]) > 0) {

                $scope.liabilities = {};
                $scope.liabilities.ScopeID = $rootScope.LiabilityID;
                // $scope.liabilities.ClientID  = $rootScope.ClientID;

                $scope.liabilities.ClientID = $scope.selectedClientID.liabilities[2];
                console.log($scope.liabilities.ClientID);
                $scope.liabilities.eFinancialCategoryID = '1';
                var dataObjapps = $scope.liabilities;
                console.log($scope.liabilities);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            if (($scope.selectedClientID.liabilities[3]) > 0) {

                $scope.liabilities = {};
                $scope.liabilities.ScopeID = $rootScope.LiabilityID;
                // $scope.liabilities.ClientID  = $rootScope.ClientID;

                $scope.liabilities.ClientID = $scope.selectedClientID.liabilities[3];
                console.log($scope.liabilities.ClientID);
                $scope.liabilities.eFinancialCategoryID = '1';
                var dataObjapps = $scope.liabilities;
                console.log($scope.liabilities);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }


            $http.post('getliabilities.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getliabilities = response.data; // Show result from server in our <pre></pre> element

                    });

            $http.post('GetConsolidatedliabilities.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $rootScope.Consolidatedliabilities = response.data; // Show result from server in our <pre></pre> element
                        console.log($rootScope.Consolidatedliabilities);
                        $scope.Consolidatedliabilities = response.data;
                    });



            $scope.loader.addliabloading = false;
            $scope.loader.editliabloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Liabilities saved</div>');
            $scope.hidealert = hidealert();
            $scope.viewPayDayLoans();
            // $('.active').next('li').find('a').trigger('click');
            $scope.scrolltop = scrolltop();
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty
        $scope.showmeliability1 = 'false';


    };



    $scope.addpropertyaddress = true;
    //post method for Address

    $scope.mastera = {};

    $scope.createaddress = function (Address) {

        $scope.loader.caddressloading = true;

        $scope.success = false;

        $scope.mastera = angular.copy(Address);
        $scope.mastera.FFID = $rootScope.FFID;
        $scope.mastera.eAddressTypeID = '4';
        var dataObj = $scope.mastera;
        var res = $http.post('createaddress.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.property = data;
            $scope.propertyaddressid = data.AddressID;
            $scope.Addressing = {};
            $scope.Addressing.AddressID = data.AddressID;
            $rootScope.AddressID = data.AddressID;

            console.log($scope.propertyaddressid);
            $("#editaddressmodal").modal('hide');
            $scope.updateid = {};

            $scope.updateid.AddressID = $scope.propertyaddressid;
            $scope.updateid.FFID = $rootScope.FFID;
            $scope.updateid.AppID = $rootScope.appids;

            var dataObjes = $scope.updateid;
            console.log($scope.updateid);
            var res = $http.post('updateappid.php', dataObjes);
            res.success(function (data, status, headers, config) {
                $scope.propertys = data;
                console.log($scope.propertys);
                $scope.loader.caddressloading = false;
                $scope.addpropertyaddress = false;

            });


            $http.post('GetAddressByAddressID.php', {"data": $scope.propertyaddressid}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getPostCodeaddress = response.data; // Show result from server in our <pre></pre> element

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Mortgage Property Address saved</div>');
                        $scope.hidealert = hidealert();

                    })
                    .
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };



    $scope.mastera = {};

    $scope.editaddress = function (Address) {

        $scope.loader.caddressloading = true;

        $scope.success = false;

        $scope.mastera = angular.copy(Address);
        $scope.mastera.AddressID = $rootScope.AddressID;
        $scope.mastera.FFID = $rootScope.FFID;
        $scope.mastera.eAddressTypeID = '4';
        var dataObj = $scope.mastera;
        var res = $http.post('createaddress.php', dataObj);
        res.success(function (data, status, headers, config) {
            // $scope.property = data; 
            $scope.propertyaddressid = data.AddressID;
            $scope.Addressing = {};
            $scope.Addressing.AddressID = data.AddressID;

            console.log($scope.propertyaddressid);
            $("#editaddressmodal").modal('hide');
            $scope.updateid = {};

            $scope.updateid.AddressID = $scope.propertyaddressid;
            $scope.updateid.FFID = $rootScope.FFID;
            $scope.updateid.AppID = $rootScope.appids;

            var dataObjes = $scope.updateid;
            console.log($scope.updateid);
            var res = $http.post('updateappid.php', dataObjes);
            res.success(function (data, status, headers, config) {
                $scope.propertys = data;
                console.log($scope.propertys);
                $scope.loader.caddressloading = false;
                $scope.addpropertyaddress = false;

            });


            $http.post('GetAddressByAddressID.php', {"data": $scope.propertyaddressid}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getPostCodeaddress = response.data; // Show result from server in our <pre></pre> element

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Mortgage Property Address saved</div>');
                        $scope.hidealert = hidealert();

                    })
                    .
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    //post method for Save Property

    $scope.addproperty = true;
    $scope.editproperty = false;

    $scope.masterp = {};

    $scope.createproperty = function (property) {

        $scope.loader.addpropertyloading = true;
        $scope.loader.editpropertyloading = true;

        $scope.success = false;
        $scope.masterp = angular.copy(property);
        var ageyear = parseFloat($scope.currentyear = year) - parseFloat($scope.masterp.YearBuiltIn);
        $scope.masterp.AgeYears = ageyear;

        var dataObj = $scope.masterp;
        var res = $http.post('saveproperty.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.AddressID = data.AddressID;
            $scope.success = true;
            console.log(data);
            console.log($scope.AddressID);

            // var link = "http://www.google.com/";
            //window.open(link,'newStuff'); //open's link in newly opened tab!

            $http.post('getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                        $scope.checkdatas = response.data[0].data;
                    });
            $scope.addproperty = false;
            $scope.editproperty = true;
            $scope.loader.addpropertyloading = false;
            $scope.loader.editpropertyloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Property Details saved</div>');
            $scope.hidealert = hidealert();

            if ($scope.masterp.secondhalfproperty == '1') {
                $scope.firsthalfproperty();
                $('.active').next('li').find('a').trigger('click');
                $scope.scrolltop = scrolltop();
            } else {
                $scope.secondhalfproperty();
            }


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty

        $scope.masterp.CapitalRaisingReason = $rootScope.CapitalRaisingReason;
        $scope.masterp.IsCapitalRaisingAllowed = $rootScope.IsCapitalRaisingAllowed;
        $scope.masterp.Payday12Months = $rootScope.Payday12Months;
        $scope.masterp.PaydayRepaid = $rootScope.PaydayRepaid;
        $scope.masterp.IsBridging = $rootScope.IsBridging;
        $scope.masterp.IsBridgingMainResidence = $rootScope.IsBridgingMainResidence;
        $scope.masterp.BridgingTermMonths = $rootScope.BridgingTermMonths;
        $scope.masterp.PayEndofTerm = $rootScope.PayEndofTerm;
        $scope.masterp.AnotherAddress = $rootScope.AnotherAddress;
        $scope.masterp.AnotherValue = $rootScope.AnotherValue;
        $scope.masterp.AnotherOutstanding = $rootScope.AnotherOutstanding;
        $scope.masterp.AnotherLender = $rootScope.AnotherLender;
        $scope.masterp.BridgingEquity = $rootScope.BridgingEquity;
        $scope.masterp.RolledUpInterest = $rootScope.RolledUpInterest;
        $scope.masterp.FFID = $rootScope.FFID;
        $scope.masterp.ExtraQnID = $rootScope.ExtraQnID;
        var dataObj = $scope.masterp;
        var res = $http.post('saveextraq.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultextraq = data;
            //$scope.resultapp = thedata;            
            console.log(data);
            $scope.loader.extraqloading = false;
            $scope.sourcing = true;

            $scope.addextraq = false;
            $scope.editextraq = true;

            $http.post('getextraq.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getextraq = response.data; // Show result from server in our <pre></pre> element
                        $rootScope.ExtraQnID = response.data[0].ExtraQnID;
                    });

        });

        $http.post('GetMortAppDetails.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.GetMortAppDetails);
                });



    };



    //post method for current mortgages
    $scope.addcurrentmortgage = true;
    $scope.editcurrentmortgage = false;

    $scope.mastercmortgage = {};

    $scope.createcmortgage = function (cmortgage) {

        $scope.loader.cmortgageloading = true;

        $scope.success = false;
        $scope.mastercmortgage = angular.copy(cmortgage);
        $scope.mastercmortgage.FFID = $rootScope.FFID;
        $scope.mastercmortgage.Appid = $rootScope.appids;
        $rootScope.checkvalue = $scope.mastercmortgage.eMortgagePaymentMethodID;
        if (!$rootScope.checkvalue) {
            $scope.mastercmortgage.eMortgagePaymentMethodID = '0';
        }
        $rootScope.RemainingBalance = $scope.mastercmortgage.RemainingBalance;
        $rootScope.MortAppIDs = $scope.mastercmortgage.MortAppID;
        $rootScope.eMortgageTypeIDs = $scope.mastercmortgage.eMortgageTypeID;
        $rootScope.PropertyValues = $scope.mastercmortgage.PropertyValue;
        $rootScope.IsLTBs = $scope.mastercmortgage.IsLTB;
        $rootScope.ISFTLs = $scope.mastercmortgage.ISFTL;
        $rootScope.PurchasePrices = $scope.mastercmortgage.PurchasePrice;
        $rootScope.RTBPurchasePriceAfterDiscounts = $scope.mastercmortgage.RTBPurchasePriceAfterDiscount;
        $rootScope.eDepositSourceIDs = $scope.mastercmortgage.eDepositSourceID;
        $rootScope.ePaymentMethodIDs = $scope.mastercmortgage.ePaymentMethodID;
        $rootScope.eBTLMortgagePaymentCoveredIDs = $scope.mastercmortgage.eBTLMortgagePaymentCoveredID;
        $rootScope.BTLAnticipatedMonthlyIncomes = $scope.mastercmortgage.BTLAnticipatedMonthlyIncome;
        //$rootScope.LoanRequireds =  $scope.mastercmortgage.LoanRequired;
        $rootScope.CapitalRaisings = $scope.mastercmortgage.CapitalRaising;
        $rootScope.Deposits = $scope.mastercmortgage.Deposit;
        $rootScope.TermMonths = $scope.mastercmortgage.TermMonths;
        $rootScope.PropertyPurchaseDates = $scope.mastercmortgage.PropertyPurchaseDate;

        if (isEmpty($scope.mastercmortgage.ERCPaymentMode)) {
            $scope.mastercmortgage.ERCPaymentMode = '1';
        }
        if (isEmpty($rootScope.Consolidatedliabilities)) {
            $rootScope.Consolidatedliabilities = '0';
        }
        console.log($rootScope.eMortgageTypeIDs);
        if ($scope.mastercmortgage.PropertyPurchaseDate1) {
            var val = $scope.mastercmortgage.PropertyPurchaseDate1;
            var splits = val.split("/");
            $scope.mastercmortgage.PropertyPurchaseDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastercmortgage.PropertyPurchaseDate);
            $rootScope.PropertyPurchaseDates = $scope.mastercmortgage.PropertyPurchaseDate;
        }

        var selPage2 = parseFloat($scope.mastercmortgage.yrs * 12) + parseFloat($scope.mastercmortgage.mnth);
        $rootScope.TermMonthss = selPage2;

        if ($rootScope.eMortgageTypeIDs == '1' || $rootScope.eMortgageTypeIDs == '2' || $rootScope.eMortgageTypeIDs == '3' || $rootScope.eMortgageTypeIDs == '4' || $rootScope.eMortgageTypeIDs == '5') {

            var loanamount = parseFloat($scope.mastercmortgage.PropertyValue) - parseFloat($scope.mastercmortgage.Deposit) + parseFloat($scope.mastercmortgage.CapitalRaising);
            $rootScope.LoanRequireds = loanamount;
            console.log(loanamount);

        } else if ($rootScope.eMortgageTypeIDs == '10' || $rootScope.eMortgageTypeIDs == '11') {

            //  Loan required = liabilities + additional capital raising + contingency 

            var loanamount = parseFloat($scope.mastercmortgage.CapitalRaising) + parseFloat($scope.mastercmortgage.Contingency) + parseFloat($rootScope.Consolidatedliabilities);
            $rootScope.LoanRequireds = loanamount;
            console.log(loanamount);
        } else {


            //  Loan required = liabilities + outstanding + additional capital raising + contingency + ERC amount
            if ($scope.mastercmortgage.ERCPaymentMode == '1') {
                var loanamount = parseFloat($scope.mastercmortgage.RemainingBalance) + parseFloat($scope.mastercmortgage.CapitalRaising) + parseFloat($scope.mastercmortgage.Contingency) + parseFloat($scope.mastercmortgage.ERC) + parseFloat($rootScope.Consolidatedliabilities);
                $rootScope.LoanRequireds = loanamount;
                console.log(loanamount);
            } else {
                var loanamount = parseFloat($scope.mastercmortgage.RemainingBalance) + parseFloat($scope.mastercmortgage.CapitalRaising) + parseFloat($scope.mastercmortgage.Contingency) + parseFloat($rootScope.Consolidatedliabilities);
                $rootScope.LoanRequireds = loanamount;
                console.log(loanamount);

            }

        }

        //  var ltvs = (parseFloat($rootScope.LoanRequireds) / parseFloat($scope.mastercmortgage.PropertyValue)) * 100;
        //  $rootScope.ltvs = ltvs;

        if ($rootScope.eMortgageTypeIDs == '10' || $rootScope.eMortgageTypeIDs == '11') {
            var ltvs = ((parseFloat($rootScope.LoanRequireds)) / parseFloat($scope.mastercmortgage.PropertyValue)) * 100;
            $rootScope.ltvs = ltvs;
        } else {
            var ltvs = (parseFloat($rootScope.LoanRequireds) / parseFloat($scope.mastercmortgage.PropertyValue)) * 100;
            $rootScope.ltvs = ltvs;
        }

        console.log($rootScope.TermMonthss);
        console.log($scope.mastercmortgage);
        var dataObj = $scope.mastercmortgage;
        var res = $http.post('cmortgage.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.messages.MortgageID = data;
            $scope.success = true;
            console.log(data);
            console.log($scope.messages.MortgageID);
            //  $scope.loader.loading = false ; 
            $rootScope.CapitalRaisingReason = $scope.mastercmortgage.CapitalRaisingReason;
            $rootScope.IsCapitalRaisingAllowed = $scope.mastercmortgage.IsCapitalRaisingAllowed;
            $scope.mastercmortgage.ExtraQnID = $rootScope.ExtraQnID;
            $scope.mastercmortgage.Payday12Months = $rootScope.Payday12Months;
            $scope.mastercmortgage.PaydayRepaid = $rootScope.PaydayRepaid;
            $rootScope.IsBridging = $scope.mastercmortgage.IsBridging;
            $rootScope.IsBridgingMainResidence = $scope.mastercmortgage.IsBridgingMainResidence;
            $rootScope.BridgingTermMonths = $scope.mastercmortgage.BridgingTermMonths;
            $rootScope.PayEndofTerm = $scope.mastercmortgage.PayEndofTerm;
            $rootScope.AnotherAddress = $scope.mastercmortgage.AnotherAddress;
            $rootScope.AnotherValue = $scope.mastercmortgage.AnotherValue;
            $rootScope.AnotherOutstanding = $scope.mastercmortgage.AnotherOutstanding;
            $rootScope.AnotherLender = $scope.mastercmortgage.AnotherLender;
            $rootScope.BridgingEquity = $scope.mastercmortgage.BridgingEquity;
            $rootScope.RolledUpInterest = $scope.mastercmortgage.RolledUpInterest;
            $rootScope.Contingency = $scope.mastercmortgage.Contingency;
            $rootScope.InterestOnlyAmount = $scope.mastercmortgage.InterestOnlyAmount;
            $rootScope.RepaymentAmount = $scope.mastercmortgage.RepaymentAmount;
            var dataObj = $scope.mastercmortgage;
            var res = $http.post('saveextraq.php', dataObj);
            res.success(function (data, status, headers, config) {
                $rootScope.ExtraQnID = data.ExtraQnID;
                console.log($rootScope.ExtraQnID);
                $http.post('getextraq.php', {"FFID": $rootScope.FFID}).
                        success(function (response, status) {
                            $scope.status = status;
                            $scope.getextraq = response.data;
                        });
                $http.post('getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                            $scope.checkdatas = response.data[0].data;
                            //  $scope.getProperties1 = response.data[0].AddressID; 
                            console.log($scope.getProperties);
                        });
            });
            $scope.mastercmortgageapp = {};

            $scope.mastercmortgageapp.Appid = $rootScope.appids;
            $scope.mastercmortgageapp.FFID = $rootScope.FFID;
            $scope.mastercmortgageapp.MortAppID = $rootScope.MortAppIDs;
            $scope.mastercmortgageapp.eMortgageTypeID = $rootScope.eMortgageTypeIDs;
            $scope.mastercmortgageapp.PropertyValue = $rootScope.PropertyValues;
            $scope.mastercmortgageapp.IsLTB = $rootScope.IsLTBs;
            $scope.mastercmortgageapp.ISFTL = $rootScope.ISFTLs;
            $scope.mastercmortgageapp.PurchasePrice = $rootScope.PurchasePrices;
            $scope.mastercmortgageapp.RTBPurchasePriceAfterDiscount = $rootScope.RTBPurchasePriceAfterDiscounts;
            $scope.mastercmortgageapp.eDepositSourceID = $rootScope.eDepositSourceIDs;
            $scope.mastercmortgageapp.ePaymentMethodID = $rootScope.ePaymentMethodIDs;
            $scope.mastercmortgageapp.LoanRequired = $rootScope.LoanRequireds;
            $scope.mastercmortgageapp.CapitalRaising = $rootScope.CapitalRaisings;
            $scope.mastercmortgageapp.TermMonths = $rootScope.TermMonths;
            if ($rootScope.TermMonthss) {
                $scope.mastercmortgageapp.TermMonths = $rootScope.TermMonthss;
            }
            $scope.mastercmortgageapp.Deposit = $rootScope.Deposits;
            $scope.mastercmortgageapp.LTV = $rootScope.ltvs;
            $scope.mastercmortgageapp.eBTLMortgagePaymentCoveredID = $rootScope.eBTLMortgagePaymentCoveredIDs;
            $scope.mastercmortgageapp.BTLAnticipatedMonthlyIncome = $rootScope.BTLAnticipatedMonthlyIncomes;
            $scope.mastercmortgageapp.PropertyPurchaseDate = $rootScope.PropertyPurchaseDates;
            $scope.mastercmortgageapp.Contingency = $rootScope.Contingency;
            $scope.mastercmortgageapp.InterestOnlyAmount = $rootScope.InterestOnlyAmount;
            $scope.mastercmortgageapp.RepaymentAmount = $rootScope.RepaymentAmount;


            var dataObj = $scope.mastercmortgageapp;
            console.log($scope.mastercmortgageapp);
            var res = $http.post('cmortgageapp.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.messages = data;
                $scope.success = true;
                console.log(data);
                $scope.loader.cmortgageloading = false;

                $http.post('GetMortAppDetails.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element
                            console.log($scope.GetMortAppDetails);
                        });
                /* $http.post('GetCurrentMortgages.php', { "FFID" : $rootScope.FFID, "Appid" : $rootScope.appids }).
                 success(function(response, status) {
                 $scope.status = status;
                 //  $scope.data = data; 
                 $scope.GetCurrentMortgages = response.data; // Show result from server in our <pre></pre> element
                 console.log($scope.GetCurrentMortgages); 
                 }); */

                $scope.addcurrentmortgage = false;
                $scope.editcurrentmortgage = true;
                if ($scope.mastercmortgage.Nmortgagedetails == '1') {
                    $scope.pmortgagedetails();
                    $scope.Emortgagedetails();
                    $('.active').next('li').find('a').trigger('click');
                    $scope.scrolltop = scrolltop();
                } else {

                    if ($scope.mastercmortgage.Nmortgagedetails == '2') {
                        $scope.Nmortgagedetails();
                    } else if ($rootScope.IsBridging == "0" || $rootScope.IsBridging == "false") {

                        console.log($rootScope.IsBridging);
                        $('.active').next('li').find('a').trigger('click');
                        $scope.pmortgagedetails();

                    } else if ($rootScope.IsBridging == "1" || $rootScope.IsBridging == "true") {
                        $scope.bmortgagedetails();
                    } else {
                        $('.active').next('li').find('a').trigger('click');
                        $scope.pmortgagedetails();
                    }
                }
            });



            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Mortgage Requirement saved</div>');
            $scope.hidealert = hidealert();
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty 

    };


    $scope.masterother = {};

    $scope.createothermortgage = function (othermortgage) {

        $scope.loader.othermortgageloading = true;

        $scope.success = false;
        $scope.masterother = angular.copy(othermortgage);

        $rootScope.ClientID = $scope.masterother.testing;
        $scope.text = $rootScope.ClientID;

        console.log($scope.masterother);
        console.log($scope.text);

        var dataObj = $scope.masterother;
        var res = $http.post('saveothermortgage.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);

            $scope.showmeothermortgages1 = 'false';
            $rootScope.OtherMortID = data.OtherMortID;

            if (($scope.selectedClientID.othermortgage[0]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[0];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

                $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                        });

            }
            if (($scope.selectedClientID.othermortgage[1]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[1];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });
                $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                        });

            }
            if (($scope.selectedClientID.othermortgage[2]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[2];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });
                $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                        });

            }

            if (($scope.selectedClientID.othermortgage[3]) > 0) {

                $scope.othermortgages = {};
                $scope.othermortgages.ScopeID = $rootScope.OtherMortID;
                $scope.othermortgages.ClientID = $scope.selectedClientID.othermortgage[3];
                $scope.othermortgages.eFinancialCategoryID = '11';
                console.log($scope.othermortgages.ClientID);
                var dataObjapps = $scope.othermortgages;
                console.log($scope.othermortgages);

                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

                $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                        });

            }



            $scope.loader.othermortgageloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Existing Mortgage saved</div>');
            $scope.hidealert = hidealert();

            $('.active').next('li').find('a').trigger('click');
            $scope.scrolltop = scrolltop();

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };



    $scope.sourcing = false;

    //post method for extra question

    $scope.addextraq = true;
    $scope.editextraq = false;

    $scope.masterextra = {};

    $scope.createextraq = function (extraq) {

        $scope.loader.extraqloading = true;

        $scope.masterextra = angular.copy(extraq);
        $scope.masterextra.FFID = $rootScope.FFID;
        $scope.masterextra.ExtraQnID = $rootScope.ExtraQnID;
        $scope.masterextra.CapitalRaisingReason = $rootScope.CapitalRaisingReason;
        $scope.masterextra.IsCapitalRaisingAllowed = $rootScope.IsCapitalRaisingAllowed;
        $rootScope.Payday12Months = $scope.masterextra.Payday12Months;
        $rootScope.PaydayRepaid = $scope.masterextra.PaydayRepaid;

        var dataObj = $scope.masterextra;
        // console.log($scope.masterextra.ExtraQnID);
        var res = $http.post('saveextraq.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultextraq = data;
            //$scope.resultapp = thedata;            
            console.log(data);
            $scope.loader.extraqloading = false;
            $scope.sourcing = true;

            $scope.addextraq = false;
            $scope.editextraq = true;
            $scope.pmortgagedetails();
            $http.post('getextraq.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getextraq = response.data; // Show result from server in our <pre></pre> element
                        $rootScope.ExtraQnID = response.data[0].ExtraQnID;
                        $rootScope.PaydayRepaid = response.data[0].PaydayRepaid;
                        $rootScope.Payday12Months = response.data[0].Payday12Months;
                        $rootScope.IsCapitalRaisingAllowed = response.data[0].IsCapitalRaisingAllowed;
                        $rootScope.CapitalRaisingReason = response.data[0].CapitalRaisingReason;
                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong>  Paydayloan saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.next();

                    });

            $http.post('getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                        $scope.checkdatas = response.data[0].data;
                        //  $scope.getProperties1 = response.data[0].AddressID; 
                        console.log($scope.getProperties);
                    });

            $http.post('GetMortAppDetails.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetMortAppDetails);
                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.masterextras = {};

    $scope.createextraqs = function (extraqs) {

        $scope.loader.extraqloading = true;

        $scope.masterextras = angular.copy(extraqs);
        $scope.masterextras.FFID = $rootScope.FFID;
        $scope.masterextras.ExtraQnID = $rootScope.ExtraQnID;
        $scope.masterextras.CapitalRaisingReason = $rootScope.CapitalRaisingReason;
        $scope.masterextras.IsCapitalRaisingAllowed = $rootScope.IsCapitalRaisingAllowed;
        $rootScope.Payday12Months = $scope.masterextras.Payday12Months;
        $rootScope.PaydayRepaid = $scope.masterextras.PaydayRepaid;

        var dataObj = $scope.masterextras;
        // console.log($scope.masterextra.ExtraQnID);
        var res = $http.post('saveextraq.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.resultextraq = data;
            //$scope.resultapp = thedata;            
            console.log(data);
            $scope.loader.extraqloading = false;
            $scope.sourcing = true;

            $scope.addextraq = false;
            $scope.editextraq = true;
            $scope.pmortgagedetails();
            $http.post('getextraq.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getextraq = response.data; // Show result from server in our <pre></pre> element
                        $rootScope.ExtraQnID = response.data[0].ExtraQnID;
                        $rootScope.PaydayRepaid = response.data[0].PaydayRepaid;
                        $rootScope.Payday12Months = response.data[0].Payday12Months;
                        $rootScope.IsCapitalRaisingAllowed = response.data[0].IsCapitalRaisingAllowed;
                        $rootScope.CapitalRaisingReason = response.data[0].CapitalRaisingReason;
                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong>  Notes saved</div>');
                        $scope.hidealert = hidealert();

                    });


            $http.post('getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                        $scope.checkdatas = response.data[0].data;
                        //  $scope.getProperties1 = response.data[0].AddressID; 
                        console.log($scope.getProperties);
                    });

            $http.post('GetMortAppDetails.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetMortAppDetails);
                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };

    //post method for CCJ question

    $scope.masterccj = {};

    $scope.createccj = function (ccj) {

        $scope.loader.addccjloading = true;
        $scope.loader.editccjloading = true;

        $scope.success = false;
        $scope.masterccj = angular.copy(ccj);

        if ($scope.masterccj.JudgementDate) {
            var val = $scope.masterccj.JudgementDate;
            var splits = val.split("/");
            $scope.masterccj.JudgementDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterccj.JudgementDate);
        }
        if ($scope.masterccj.DateSatisfied) {
            var val = $scope.masterccj.DateSatisfied;
            var splits = val.split("/");
            $scope.masterccj.DateSatisfied = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterccj.DateSatisfied);
        }

        // $rootScope.ClientID = $scope.masterccj.testing;
        //$scope.text = $rootScope.ClientID;
        $scope.masterccj.FFID = $rootScope.FFID;
        var dataObj = $scope.masterccj;


        console.log($scope.masterccj);
        console.log($scope.text);

        var res = $http.post('saveccj.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ; 
            $rootScope.CreditHistoryID = data.CreditHistoryID;

            $scope.showmeccj1 = 'false';


            if (($scope.selectedClientID.ccj[0]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[0];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                    $http.post('getccj.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getccj = response.data; // Show result from server in our <pre></pre> element
                                console.log($scope.getccj);
                            });
                });

            }
            if (($scope.selectedClientID.ccj[1]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[1];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                });

            }

            if (($scope.selectedClientID.ccj[2]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[2];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                });

            }
            if (($scope.selectedClientID.ccj[3]) > 0) {

                $scope.ccj = {};
                $scope.ccj.ScopeID = $rootScope.CreditHistoryID;
                $scope.ccj.ClientID = $scope.selectedClientID.ccj[3];
                $scope.ccj.eFinancialCategoryID = '2';

                var dataObjapps = $scope.ccj;
                console.log($scope.ccj);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);
                });

            }

            $scope.loader.addccjloading = false;
            $scope.loader.editccjloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> CCJ saved</div>');
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('12');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    $scope.customshow = [];
    //post method for Arrears question

    $scope.masterarrears = {};

    $scope.createarrears = function (arrears) {



        //find('ul').removeClass('ng-hide');

        $scope.loader.addarearsloading = true;
        $scope.loader.editarearsloading = true;

        $scope.success = false;
        $scope.masterarrears = angular.copy(arrears);
        //$rootScope.ClientID = $scope.masterarrears.testing;
        //$scope.text = $rootScope.ClientID;

        if ($scope.masterarrears.ArrDefDate) {
            var val = $scope.masterarrears.ArrDefDate;
            var splits = val.split("/");
            $scope.masterarrears.ArrDefDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterarrears.ArrDefDate);
        }


        $scope.masterarrears.FFID = $rootScope.FFID;

        var dataObj = $scope.masterarrears;

        console.log($scope.masterarrears);
        console.log($scope.masterarrears.One);

        if ($scope.masterarrears.One === null ? '' : $scope.masterarrears.One) {
            var One = $scope.masterarrears.One.split('/')[1] + $scope.masterarrears.One.split('/')[2];
        }
        if ($scope.masterarrears.Two === null ? '' : $scope.masterarrears.Two) {
            var Two = $scope.masterarrears.Two.split('/')[1] + $scope.masterarrears.Two.split('/')[2];
        }
        if ($scope.masterarrears.Three === null ? '' : $scope.masterarrears.Three) {
            var Three = $scope.masterarrears.Three.split('/')[1] + $scope.masterarrears.Three.split('/')[2];
        }
        if ($scope.masterarrears.Four === null ? '' : $scope.masterarrears.Four) {
            var Four = $scope.masterarrears.Four.split('/')[1] + $scope.masterarrears.Four.split('/')[2];
        }
        if ($scope.masterarrears.Five === null ? '' : $scope.masterarrears.Five) {
            var Five = $scope.masterarrears.Five.split('/')[1] + $scope.masterarrears.Five.split('/')[2];
        }
        if ($scope.masterarrears.Six === null ? '' : $scope.masterarrears.Six) {
            var Six = $scope.masterarrears.Six.split('/')[1] + $scope.masterarrears.Six.split('/')[2];
        }
        if ($scope.masterarrears.Seven === null ? '' : $scope.masterarrears.Seven) {
            var Seven = $scope.masterarrears.Seven.split('/')[1] + $scope.masterarrears.Seven.split('/')[2];
        }
        if ($scope.masterarrears.Eight === null ? '' : $scope.masterarrears.Eight) {
            var Eight = $scope.masterarrears.Eight.split('/')[1] + $scope.masterarrears.Eight.split('/')[2];
        }
        if ($scope.masterarrears.Nine === null ? '' : $scope.masterarrears.Nine) {
            var Nine = $scope.masterarrears.Nine.split('/')[1] + $scope.masterarrears.Nine.split('/')[2];
        }
        if ($scope.masterarrears.Ten === null ? '' : $scope.masterarrears.Ten) {
            var Ten = $scope.masterarrears.Ten.split('/')[1] + $scope.masterarrears.Ten.split('/')[2];
        }
        if ($scope.masterarrears.eleven === null ? '' : $scope.masterarrears.eleven) {
            var eleven = $scope.masterarrears.eleven.split('/')[1] + $scope.masterarrears.eleven.split('/')[2];
        }
        if ($scope.masterarrears.Twelve === null ? '' : $scope.masterarrears.Twelve) {
            var Twelve = $scope.masterarrears.Twelve.split('/')[1] + $scope.masterarrears.Twelve.split('/')[2];
        }

        function Highestcount12() {
            array_elements = [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, eleven, Twelve];
            array_elements.sort();
            $scope.maximumber = [];
            var current = null;
            var cnt = 0;
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        //  console.log(current + ' comes --&gt; ' + cnt + ' times&lt;br&gt;');
                        // return cnt;  
                        $scope.maximumber.push(cnt);
                        $scope.masterarrears.Highest12 = Math.max.apply(Math, $scope.maximumber);
                        console.log($scope.masterarrears.Highest12);
                    } else {

                        $scope.masterarrears.Highest12 = array_elements.length;
                    }
                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }

        }
        Highestcount12();


        if ($scope.masterarrears.Thirteen === null ? '' : $scope.masterarrears.Thirteen) {
            var Thirteen = $scope.masterarrears.Thirteen.split('/')[1] + $scope.masterarrears.Thirteen.split('/')[2];
        }
        if ($scope.masterarrears.Fourteen === null ? '' : $scope.masterarrears.Fourteen) {
            var Fourteen = $scope.masterarrears.Fourteen.split('/')[1] + $scope.masterarrears.Fourteen.split('/')[2];
        }
        if ($scope.masterarrears.Fifteen === null ? '' : $scope.masterarrears.Fifteen) {
            var Fifteen = $scope.masterarrears.Fifteen.split('/')[1] + $scope.masterarrears.Fifteen.split('/')[2];
        }
        if ($scope.masterarrears.Sixteen === null ? '' : $scope.masterarrears.Sixteen) {
            var Sixteen = $scope.masterarrears.Sixteen.split('/')[1] + $scope.masterarrears.Sixteen.split('/')[2];
        }
        if ($scope.masterarrears.Seventeen === null ? '' : $scope.masterarrears.Seventeen) {
            var Seventeen = $scope.masterarrears.Seventeen.split('/')[1] + $scope.masterarrears.Seventeen.split('/')[2];
        }
        if ($scope.masterarrears.Eighteen === null ? '' : $scope.masterarrears.Eighteen) {
            var Eighteen = $scope.masterarrears.Eighteen.split('/')[1] + $scope.masterarrears.Eighteen.split('/')[2];
        }
        if ($scope.masterarrears.Nineteen === null ? '' : $scope.masterarrears.Nineteen) {
            var Nineteen = $scope.masterarrears.Nineteen.split('/')[1] + $scope.masterarrears.Nineteen.split('/')[2];
        }
        if ($scope.masterarrears.Twenty === null ? '' : $scope.masterarrears.Twenty) {
            var Twenty = $scope.masterarrears.Twenty.split('/')[1] + $scope.masterarrears.Twenty.split('/')[2];
        }
        if ($scope.masterarrears.Twentyone === null ? '' : $scope.masterarrears.Twentyone) {
            var Twentyone = $scope.masterarrears.Twentyone.split('/')[1] + $scope.masterarrears.Twentyone.split('/')[2];
        }
        if ($scope.masterarrears.Twentytwo === null ? '' : $scope.masterarrears.Twentytwo) {
            var Twentytwo = $scope.masterarrears.Twentytwo.split('/')[1] + $scope.masterarrears.Twentytwo.split('/')[2];
        }
        if ($scope.masterarrears.Twentythree === null ? '' : $scope.masterarrears.Twentythree) {
            var Twentythree = $scope.masterarrears.Twentythree.split('/')[1] + $scope.masterarrears.Twentythree.split('/')[2];
        }
        if ($scope.masterarrears.TwentyFour === null ? '' : $scope.masterarrears.TwentyFour) {
            var TwentyFour = $scope.masterarrears.TwentyFour.split('/')[1] + $scope.masterarrears.TwentyFour.split('/')[2];
        }

        function Highestcount24() {
            array_elements = [Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty, Twentyone, Twentytwo, Twentythree, TwentyFour];
            array_elements.sort();
            $scope.maximumber = [];
            var current = null;
            var cnt = 0;
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        //  console.log(current + ' comes --&gt; ' + cnt + ' times&lt;br&gt;');
                        // return cnt;  
                        $scope.maximumber.push(cnt);
                        $scope.masterarrears.Highest24 = Math.max.apply(Math, $scope.maximumber);
                        console.log($scope.masterarrears.Highest24);
                    } else {
                        $scope.masterarrears.Highest24 = array_elements.length;
                    }

                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }

        }
        Highestcount24();

        if ($scope.masterarrears.TwentyFive === null ? '' : $scope.masterarrears.TwentyFive) {
            var TwentyFive = $scope.masterarrears.TwentyFive.split('/')[1] + $scope.masterarrears.TwentyFive.split('/')[2];
        }
        if ($scope.masterarrears.TwentySix === null ? '' : $scope.masterarrears.TwentySix) {
            var TwentySix = $scope.masterarrears.TwentySix.split('/')[1] + $scope.masterarrears.TwentySix.split('/')[2];
        }
        if ($scope.masterarrears.TwentySeven === null ? '' : $scope.masterarrears.TwentySeven) {
            var TwentySeven = $scope.masterarrears.TwentySeven.split('/')[1] + $scope.masterarrears.TwentySeven.split('/')[2];
        }
        if ($scope.masterarrears.TwentyEight === null ? '' : $scope.masterarrears.TwentyEight) {
            var TwentyEight = $scope.masterarrears.TwentyEight.split('/')[1] + $scope.masterarrears.TwentyEight.split('/')[2];
        }
        if ($scope.masterarrears.TwentyNine === null ? '' : $scope.masterarrears.TwentyNine) {
            var TwentyNine = $scope.masterarrears.TwentyNine.split('/')[1] + $scope.masterarrears.TwentyNine.split('/')[2];
        }
        if ($scope.masterarrears.Thirty === null ? '' : $scope.masterarrears.Thirty) {
            var Thirty = $scope.masterarrears.Thirty.split('/')[1] + $scope.masterarrears.Thirty.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyOne === null ? '' : $scope.masterarrears.ThirtyOne) {
            var ThirtyOne = $scope.masterarrears.ThirtyOne.split('/')[1] + $scope.masterarrears.ThirtyOne.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyTwo === null ? '' : $scope.masterarrears.ThirtyTwo) {
            var ThirtyTwo = $scope.masterarrears.ThirtyTwo.split('/')[1] + $scope.masterarrears.ThirtyTwo.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyThree === null ? '' : $scope.masterarrears.ThirtyThree) {
            var ThirtyThree = $scope.masterarrears.ThirtyThree.split('/')[1] + $scope.masterarrears.ThirtyThree.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyFour === null ? '' : $scope.masterarrears.ThirtyFour) {
            var ThirtyFour = $scope.masterarrears.ThirtyFour.split('/')[1] + $scope.masterarrears.ThirtyFour.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyFive === null ? '' : $scope.masterarrears.ThirtyFive) {
            var ThirtyFive = $scope.masterarrears.ThirtyFive.split('/')[1] + $scope.masterarrears.ThirtyFive.split('/')[2];
        }
        if ($scope.masterarrears.ThirtySix === null ? '' : $scope.masterarrears.ThirtySix) {
            var ThirtySix = $scope.masterarrears.ThirtySix.split('/')[1] + $scope.masterarrears.ThirtySix.split('/')[2];
        }

        function Highestcount36() {
            array_elements = [TwentyFive, TwentySix, TwentySeven, TwentyEight, TwentyNine, Thirty, ThirtyOne, ThirtyTwo, ThirtyThree, ThirtyFour, ThirtyFive, ThirtySix];
            array_elements.sort();
            console.log(array_elements);
            $scope.maximumber = [];
            var current = null;
            var cnt = 0;
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        //  console.log(current + ' comes --&gt; ' + cnt + ' times&lt;br&gt;');
                        // return cnt; 
                        $scope.maximumber.push(cnt);
                        $scope.masterarrears.Highest36 = Math.max.apply(Math, $scope.maximumber);
                        console.log($scope.masterarrears.Highest36);
                    } else {
                        $scope.masterarrears.Highest36 = array_elements.length;
                    }

                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }

        }
        Highestcount36();



        if ($scope.masterarrears.ThirtySeven === null ? '' : $scope.masterarrears.ThirtySeven) {
            var ThirtySeven = $scope.masterarrears.ThirtySeven.split('/')[1] + $scope.masterarrears.ThirtySeven.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyEight === null ? '' : $scope.masterarrears.ThirtyEight) {
            var ThirtyEight = $scope.masterarrears.ThirtyEight.split('/')[1] + $scope.masterarrears.ThirtyEight.split('/')[2];
        }
        if ($scope.masterarrears.ThirtyNine === null ? '' : $scope.masterarrears.ThirtyNine) {
            var ThirtyNine = $scope.masterarrears.ThirtyNine.split('/')[1] + $scope.masterarrears.ThirtyNine.split('/')[2];
        }
        if ($scope.masterarrears.Forty === null ? '' : $scope.masterarrears.Forty) {
            var Forty = $scope.masterarrears.Forty.split('/')[1] + $scope.masterarrears.Forty.split('/')[2];
        }
        if ($scope.masterarrears.FortyOne === null ? '' : $scope.masterarrears.FortyOne) {
            var FortyOne = $scope.masterarrears.FortyOne.split('/')[1] + $scope.masterarrears.FortyOne.split('/')[2];
        }
        if ($scope.masterarrears.FortyTwo === null ? '' : $scope.masterarrears.FortyTwo) {
            var FortyTwo = $scope.masterarrears.FortyTwo.split('/')[1] + $scope.masterarrears.FortyTwo.split('/')[2];
        }
        if ($scope.masterarrears.FortyThree === null ? '' : $scope.masterarrears.FortyThree) {
            var FortyThree = $scope.masterarrears.FortyThree.split('/')[1] + $scope.masterarrears.FortyThree.split('/')[2];
        }
        if ($scope.masterarrears.FortyFour === null ? '' : $scope.masterarrears.FortyFour) {
            var FortyFour = $scope.masterarrears.FortyFour.split('/')[1] + $scope.masterarrears.FortyFour.split('/')[2];
        }
        if ($scope.masterarrears.FortyFive === null ? '' : $scope.masterarrears.FortyFive) {
            var FortyFive = $scope.masterarrears.FortyFive.split('/')[1] + $scope.masterarrears.FortyFive.split('/')[2];
        }
        if ($scope.masterarrears.FortySix === null ? '' : $scope.masterarrears.FortySix) {
            var FortySix = $scope.masterarrears.FortySix.split('/')[1] + $scope.masterarrears.FortySix.split('/')[2];
        }
        if ($scope.masterarrears.FortySeven === null ? '' : $scope.masterarrears.FortySeven) {
            var FortySeven = $scope.masterarrears.FortySeven.split('/')[1] + $scope.masterarrears.FortySeven.split('/')[2];
        }
        if ($scope.masterarrears.FortyEight === null ? '' : $scope.masterarrears.FortyEight) {
            var FortyEight = $scope.masterarrears.FortyEight.split('/')[1] + $scope.masterarrears.FortyEight.split('/')[2];
        }
        if ($scope.masterarrears.FortyNine === null ? '' : $scope.masterarrears.FortyNine) {
            var FortyNine = $scope.masterarrears.FortyNine.split('/')[1] + $scope.masterarrears.FortyNine.split('/')[2];
        }
        if ($scope.masterarrears.Fifty === null ? '' : $scope.masterarrears.Fifty) {
            var Fifty = $scope.masterarrears.Fifty.split('/')[1] + $scope.masterarrears.Fifty.split('/')[2];
        }
        if ($scope.masterarrears.Fiftyone === null ? '' : $scope.masterarrears.Fiftyone) {
            var Fiftyone = $scope.masterarrears.Fiftyone.split('/')[1] + $scope.masterarrears.Fiftyone.split('/')[2];
        }
        if ($scope.masterarrears.Fiftytwo === null ? '' : $scope.masterarrears.Fiftytwo) {
            var Fiftytwo = $scope.masterarrears.Fiftytwo.split('/')[1] + $scope.masterarrears.Fiftytwo.split('/')[2];
        }
        if ($scope.masterarrears.Fiftythree === null ? '' : $scope.masterarrears.Fiftythree) {
            var Fiftythree = $scope.masterarrears.Fiftythree.split('/')[1] + $scope.masterarrears.Fiftythree.split('/')[2];
        }
        if ($scope.masterarrears.Fiftyfour === null ? '' : $scope.masterarrears.Fiftyfour) {
            var Fiftyfour = $scope.masterarrears.Fiftyfour.split('/')[1] + $scope.masterarrears.Fiftyfour.split('/')[2];
        }
        if ($scope.masterarrears.Fiftyfive === null ? '' : $scope.masterarrears.Fiftyfive) {
            var Fiftyfive = $scope.masterarrears.Fiftyfive.split('/')[1] + $scope.masterarrears.Fiftyfive.split('/')[2];
        }
        if ($scope.masterarrears.Fiftysix === null ? '' : $scope.masterarrears.Fiftysix) {
            var Fiftysix = $scope.masterarrears.Fiftysix.split('/')[1] + $scope.masterarrears.Fiftysix.split('/')[2];
        }
        if ($scope.masterarrears.Fiftyseven === null ? '' : $scope.masterarrears.Fiftyseven) {
            var Fiftyseven = $scope.masterarrears.Fiftyseven.split('/')[1] + $scope.masterarrears.Fiftyseven.split('/')[2];
        }
        if ($scope.masterarrears.Fiftyeight === null ? '' : $scope.masterarrears.Fiftyeight) {
            var Fiftyeight = $scope.masterarrears.Fiftyeight.split('/')[1] + $scope.masterarrears.Fiftyeight.split('/')[2];
        }
        if ($scope.masterarrears.Fiftynine === null ? '' : $scope.masterarrears.Fiftynine) {
            var Fiftynine = $scope.masterarrears.Fiftynine.split('/')[1] + $scope.masterarrears.Fiftynine.split('/')[2];
        }
        if ($scope.masterarrears.Sixty === null ? '' : $scope.masterarrears.Sixty) {
            var Sixty = $scope.masterarrears.Sixty.split('/')[1] + $scope.masterarrears.Sixty.split('/')[2];
        }
        if ($scope.masterarrears.Sixtyone === null ? '' : $scope.masterarrears.Sixtyone) {
            var Sixtyone = $scope.masterarrears.Sixtyone.split('/')[1] + $scope.masterarrears.Sixtyone.split('/')[2];
        }
        if ($scope.masterarrears.Sixtytwo === null ? '' : $scope.masterarrears.Sixtytwo) {
            var Sixtytwo = $scope.masterarrears.Sixtytwo.split('/')[1] + $scope.masterarrears.Sixtytwo.split('/')[2];
        }
        if ($scope.masterarrears.Sixtythree === null ? '' : $scope.masterarrears.Sixtythree) {
            var Sixtythree = $scope.masterarrears.Sixtythree.split('/')[1] + $scope.masterarrears.Sixtythree.split('/')[2];
        }
        if ($scope.masterarrears.Sixtyfour === null ? '' : $scope.masterarrears.Sixtyfour) {
            var Sixtyfour = $scope.masterarrears.Sixtyfour.split('/')[1] + $scope.masterarrears.Sixtyfour.split('/')[2];
        }
        if ($scope.masterarrears.Sixtyfive === null ? '' : $scope.masterarrears.Sixtyfive) {
            var Sixtyfive = $scope.masterarrears.Sixtyfive.split('/')[1] + $scope.masterarrears.Sixtyfive.split('/')[2];
        }
        if ($scope.masterarrears.Sixtysix === null ? '' : $scope.masterarrears.Sixtysix) {
            var Sixtysix = $scope.masterarrears.Sixtysix.split('/')[1] + $scope.masterarrears.Sixtysix.split('/')[2];
        }
        if ($scope.masterarrears.Sixtyseven === null ? '' : $scope.masterarrears.Sixtyseven) {
            var Sixtyseven = $scope.masterarrears.Sixtyseven.split('/')[1] + $scope.masterarrears.Sixtyseven.split('/')[2];
        }
        if ($scope.masterarrears.Sixtyeight === null ? '' : $scope.masterarrears.Sixtyeight) {
            var Sixtyeight = $scope.masterarrears.Sixtyeight.split('/')[1] + $scope.masterarrears.Sixtyeight.split('/')[2];
        }
        if ($scope.masterarrears.Sixtynine === null ? '' : $scope.masterarrears.Sixtynine) {
            var Sixtynine = $scope.masterarrears.Sixtynine.split('/')[1] + $scope.masterarrears.Sixtynine.split('/')[2];
        }
        if ($scope.masterarrears.Seventy === null ? '' : $scope.masterarrears.Seventy) {
            var Seventy = $scope.masterarrears.Seventy.split('/')[1] + $scope.masterarrears.Seventy.split('/')[2];
        }
        if ($scope.masterarrears.Seventyone === null ? '' : $scope.masterarrears.Seventyone) {
            var Seventyone = $scope.masterarrears.Seventyone.split('/')[1] + $scope.masterarrears.Seventyone.split('/')[2];
        }
        if ($scope.masterarrears.Seventytwo === null ? '' : $scope.masterarrears.Seventytwo) {
            var Seventytwo = $scope.masterarrears.Seventytwo.split('/')[1] + $scope.masterarrears.Seventytwo.split('/')[2];
        }

        function Highestcount72() {
            array_elements = [ThirtySeven, ThirtyEight, ThirtyNine, Forty, FortyOne, FortyTwo, FortyThree, FortyFour, FortyFive, FortySix, FortySeven, FortyEight, FortyNine, Fifty, Fiftyone, Fiftytwo, Fiftythree, Fiftyfour, Fiftyfive, Fiftysix, Fiftyseven, Fiftyeight, Fiftynine, Sixty, Sixtyone, Sixtytwo, Sixtythree, Sixtyfour, Sixtyfive, Sixtysix, Sixtyseven, Sixtyeight, Sixtynine, Seventy, Seventyone, Seventytwo];
            array_elements.sort();
            console.log(array_elements);
            $scope.maximumber = [];
            var current = null;
            var cnt = 0;
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        //  console.log(current + ' comes --&gt; ' + cnt + ' times&lt;br&gt;');
                        // return cnt;  
                        $scope.maximumber.push(cnt);
                        $scope.masterarrears.Highest72 = Math.max.apply(Math, $scope.maximumber);
                        console.log($scope.masterarrears.Highest72);
                    } else {
                        $scope.masterarrears.Highest72 = array_elements.length;
                    }

                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }

        }
        Highestcount72();


        if ($scope.masterarrears.NumOccurence12 === null || $scope.masterarrears.NumOccurence12 == "0") {
            $scope.masterarrears.NumOccurence12 = "";
            $scope.masterarrears.Highest12 = "";
        }

        if ($scope.masterarrears.NumOccurence24 === null || $scope.masterarrears.NumOccurence24 == "0") {
            $scope.masterarrears.NumOccurence24 = "";
            $scope.masterarrears.Highest24 = "";
        }

        if ($scope.masterarrears.NumOccurence36 === null || $scope.masterarrears.NumOccurence36 == "0") {
            $scope.masterarrears.NumOccurence36 = "";
            $scope.masterarrears.Highest36 = "";

            console.log($scope.masterarrears.Highest36);
        }

        if ($scope.masterarrears.NumOccurence72 === null || $scope.masterarrears.NumOccurence72 == "0") {
            $scope.masterarrears.NumOccurence72 = "";
            $scope.masterarrears.Highest72 = "";
        }

        $rootScope.NumOccurences = $scope.masterarrears;


        var res = $http.post('savearrears.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ; 
            $rootScope.ArrDefID = data.ArrDefID;
            $scope.showmearrearss1 = 'false';


            if (($scope.selectedClientID.arrears[0]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[0];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('getarrears.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getarrears = response.data; // Show result from server in our <pre></pre> element 
                            });


                });

            }
            if (($scope.selectedClientID.arrears[1]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[1];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.arrears[2]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[2];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.arrears[3]) > 0) {

                $scope.arrears = {};
                $scope.arrears.ScopeID = $rootScope.ArrDefID;
                $scope.arrears.ClientID = $scope.selectedClientID.arrears[3];
                $scope.arrears.eFinancialCategoryID = '4';

                var dataObjapps = $scope.arrears;
                console.log($scope.arrears);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            $scope.NumOccurences = {}
            $scope.NumOccurences = $rootScope.NumOccurences;
            $scope.NumOccurences.ArrDefID = $rootScope.ArrDefID;


            var dataObj = $scope.NumOccurences;
            var res = $http.post('NumOccurences.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.NumOccurences = data;
                $scope.success = true;
                console.log(data);
            });

            $http.post('getNumOccurences.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getNumOccurences = response.data; // Show result from server in our <pre></pre> element
                    });

            $scope.loader.addarearsloading = false;
            $scope.loader.editarearsloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Arrears saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('13');
            }, 3000);

            $scope.customshow.pop('ng-hide');
            $scope.customshow = 'ng-show';

            //   $('ul').find('.removecss').removeClass('ng-hide');  
            // $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty

    };


    //post method for Default question

    $scope.masterdefaults = {};

    $scope.createdefaults = function (defaults) {

        $scope.loader.adddefaultsloading = true;
        $scope.loader.editdefaultsloading = true;

        $scope.success = false;
        $scope.masterdefaults = angular.copy(defaults);

        if ($scope.masterdefaults.ArrDefDate) {
            var val = $scope.masterdefaults.ArrDefDate;
            var splits = val.split("/");
            $scope.masterdefaults.ArrDefDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterdefaults.ArrDefDate);
        }
        if ($scope.masterdefaults.DateSatisfied) {
            var val = $scope.masterdefaults.DateSatisfied;
            var splits = val.split("/");
            $scope.masterdefaults.DateSatisfied = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterdefaults.DateSatisfied);
        }

        //$rootScope.ClientID = $scope.masterdefaults.testing;
        //$scope.text = $rootScope.ClientID;

        $scope.masterdefaults.FFID = $rootScope.FFID;


        var dataObj = $scope.masterdefaults;


        console.log($scope.masterdefaults);
        console.log($scope.text);

        var res = $http.post('savedefaults.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            // $scope.loader.loading = false ; 
            $rootScope.ArrDefID = data.ArrDefID;
            $scope.showmeDefaults1 = 'false';


            if (($scope.selectedClientID.defaults[0]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[0];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('getdefaults.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getDefaults = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }
            if (($scope.selectedClientID.defaults[1]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[1];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.defaults[2]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[2];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.defaults[3]) > 0) {

                $scope.defaults = {};
                $scope.defaults.ScopeID = $rootScope.ArrDefID;
                $scope.defaults.ClientID = $scope.selectedClientID.defaults[3];
                $scope.defaults.eFinancialCategoryID = '5';

                var dataObjapps = $scope.defaults;
                console.log($scope.defaults);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            $scope.loader.adddefaultsloading = false;
            $scope.loader.editdefaultsloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Defaults saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('14');
            }, 3000);

            //   $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    //post method for Bankruptcy question

    $scope.masterBankruptcy = {};

    $scope.createBankruptcy = function (Bankruptcy) {

        $scope.loader.addbankloading = true;
        $scope.loader.editbankloading = true;

        $scope.success = false;
        $scope.masterBankruptcy = angular.copy(Bankruptcy);

        if ($scope.masterBankruptcy.DischargeDate) {
            var val = $scope.masterBankruptcy.DischargeDate;
            var splits = val.split("/");
            $scope.masterBankruptcy.DischargeDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterBankruptcy.DischargeDate);
        }

        //$rootScope.ClientID = $scope.masterBankruptcy.testing;
        //$scope.text = $rootScope.ClientID;
        $scope.masterBankruptcy.FFID = $rootScope.FFID;

        var dataObj = $scope.masterBankruptcy;


        console.log($scope.masterBankruptcy);
        console.log($scope.text);

        var res = $http.post('saveBankruptcy.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //  $scope.loader.loading = false ; 
            $rootScope.BankruptcyID = data.BankruptcyID;

            $scope.showmeBankrupts1 = 'false';
            if (($scope.selectedClientID.Bankruptcy[0]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[0];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('getBankruptcy.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getBankruptcy = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }
            if (($scope.selectedClientID.Bankruptcy[1]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[1];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.Bankruptcy[2]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[2];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.Bankruptcy[3]) > 0) {
                $scope.Bankruptcy = {};
                $scope.Bankruptcy.ScopeID = $rootScope.BankruptcyID;
                $scope.Bankruptcy.ClientID = $scope.selectedClientID.Bankruptcy[3];
                $scope.Bankruptcy.eFinancialCategoryID = '14';

                var dataObjapps = $scope.Bankruptcy;
                console.log($scope.Bankruptcy);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            $scope.loader.addbankloading = false;
            $scope.loader.editbankloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Bankrupt saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('15');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };



    //post method for iva question

    $scope.masteriva = {};

    $scope.createiva = function (iva) {

        $scope.loader.addivaloading = true;
        $scope.loader.editivaloading = true;

        $scope.success = false;
        $scope.masteriva = angular.copy(iva);

        if ($scope.masteriva.DateStarted) {
            var val = $scope.masteriva.DateStarted;
            var splits = val.split("/");
            $scope.masteriva.DateStarted = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masteriva.DateStarted);
        }

        if ($scope.masteriva.DateCompleted) {
            var val = $scope.masteriva.DateCompleted;
            var splits = val.split("/");
            $scope.masteriva.DateCompleted = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masteriva.DateCompleted);
        }

        //$rootScope.ClientID = $scope.masteriva.testing;
        //$scope.text = $rootScope.ClientID;

        $scope.masteriva.FFID = $rootScope.FFID;

        var dataObj = $scope.masteriva;


        console.log($scope.masteriva);
        console.log($scope.text);

        var res = $http.post('saveiva.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            // $scope.loader.loading = false ; 
            $rootScope.IVAID = data.IVAID;

            $scope.showmeIVAs1 = 'false';
            if (($scope.selectedClientID.iva[0]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[0];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('getiva.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getiva = response.data; // Show result from server in our <pre></pre> element
                            });

                });

            }

            if (($scope.selectedClientID.iva[1]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[1];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            if (($scope.selectedClientID.iva[2]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[2];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }
            if (($scope.selectedClientID.iva[3]) > 0) {

                $scope.iva = {};
                $scope.iva.ScopeID = $rootScope.IVAID;
                $scope.iva.ClientID = $scope.selectedClientID.iva[3];
                $scope.iva.eFinancialCategoryID = '3';

                var dataObjapps = $scope.iva;
                console.log($scope.iva);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });

            }

            $scope.loader.addivaloading = false;
            $scope.loader.editivaloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> IVA saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('16');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    //post method for Repossession question

    $scope.masterRepossession = {};

    $scope.createRepossession = function (Repossession) {

        $scope.loader.addreploading = true;
        $scope.loader.editreploading = true;

        $scope.success = false;
        $scope.masterRepossession = angular.copy(Repossession);

        if ($scope.masterRepossession.RepoDate) {
            var val = $scope.masterRepossession.RepoDate;
            var splits = val.split("/");
            $scope.masterRepossession.RepoDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.masterRepossession.RepoDate);
        }

        //$rootScope.ClientID = $scope.masterRepossession.testing;
        //$scope.text = $rootScope.ClientID;
        $scope.masterRepossession.FFID = $rootScope.FFID;

        var dataObj = $scope.masterRepossession;


        console.log($scope.masterRepossession);
        console.log($scope.text);

        var res = $http.post('saveRepossession.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.messages = data;
            $scope.success = true;
            console.log(data);
            //$scope.loader.loading = false ; 
            $rootScope.RepoID = data.RepoID;

            $scope.showmepossesseds1 = 'false';

            if (($scope.selectedClientID.Repossession[0]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[0];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                    $http.post('getRepossession.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.getRepossession = response.data; // Show result from server in our <pre></pre> element
                            });

                });


            }
            if (($scope.selectedClientID.Repossession[1]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[1];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });


            }
            if (($scope.selectedClientID.Repossession[2]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[2];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });


            }

            if (($scope.selectedClientID.Repossession[3]) > 0) {
                $scope.Repossession = {};
                $scope.Repossession.ScopeID = $rootScope.RepoID;
                $scope.Repossession.ClientID = $scope.selectedClientID.Repossession[3];
                $scope.Repossession.eFinancialCategoryID = '6';

                var dataObjapps = $scope.Repossession;
                console.log($scope.Repossession);
                var res = $http.post('SaveSelectedClientID.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $scope.resultSelectedClientID = data;
                    console.log(data);

                });


            }

            $scope.loader.addreploading = false;
            $scope.loader.editreploading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Re-possessed saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('17');
            }, 3000);

            //$('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    $scope.back = function (obj) {
        $scope.showeditpanel = true;
        $scope.sourcing = true;
        $scope.showquotes = false;
        $scope.sourcedproducts = false;
        $scope.shortlistscope = "";
        $scope.selectedClientID.c1 = "";
        $scope.checked = 0;
        $scope.onechecked = 0;
        $scope.filterchecked = 0;
        $scope.limitchecked = 0;
        var href = obj.target.attributes.link.value;

        var links = "a[href='" + href + "']";
        $('li').find(links).trigger('click');

        var insidetabname = obj.target.attributes.insidetabname.value;
        var fieldname = obj.target.attributes.fieldname.value;
        if (insidetabname) {
            $scope[insidetabname]();
        }
        if (fieldname) {
            $rootScope.fieldname = fieldname;
            $scope[fieldname] = "rejectreason";

            if (fieldname == "TotalNetMonthlyIncome" || fieldname == "continousemployment" || fieldname == "EmploymentStatus" || fieldname == "Accounts" || fieldname == "EmploymentType") {
                $('li').find('a[id="employment1"]').trigger('click');
            }
        }

        console.log(links);
        $scope.prefs = 'false';


    }

    $scope.backed = function () {
        $('.nav > .active').prev('li').find('a').trigger('click');
    }


    //post method for sourcing

    $scope.mastergetsource = {};

    $scope.getsource = function (test) {

        $scope.loader.loading = true;
        $scope.showeditpanel = false;
        $scope.sourcing = false;
        $scope.loader.sourceloading = true;
        $scope.success = false;
        //  $scope.mastergetsource = angular.copy(test); 
        $scope.mastergetsource.FFID = $rootScope.FFID; //'4324'; //
        $scope.mastergetsource.Appid = $rootScope.appids;  //'34162'; //

        console.log($scope.mastergetsource);
        var dataObj = $scope.mastergetsource;

        var res = $http.post('getsource.php', dataObj);
        res.success(function (response, status, headers, config) {
            $scope.souringdata = response.data;
            $scope.souringdata1 = response.data[0].DataTable1;
            $scope.souringdata2 = response.data[0].DataTable2;
            $scope.success = true;
            console.log(response.data);
            //  console.log($scope.souringdata1);  
            $scope.loader.sourceloading = false;
            $scope.sourcedproducts = true;
            $rootScope.pop = $scope.souringdata;
            $rootScope.pop1 = $scope.souringdata1;
            $rootScope.pop2 = $scope.souringdata2;
            $scope.rr = getsourcing();
            $('#active').find('a').trigger('click');

            console.log($rootScope.fieldname);
            $scope[$rootScope.fieldname] = {};

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    $scope.showquotes = false;
    $scope.loader.showquotes = false;
    $scope.mastergetquotes = {};

    $scope.getquotes = function () {
        $scope.showquotesummarydata = false;
        $scope.showeditpanel = false;
        $scope.loader.showquotes = true;
        $scope.mastergetquotes.FFID = $rootScope.FFID;
        var dataObj = $scope.mastergetquotes;

        var res = $http.post('getactivequotes.php', dataObj);
        res.success(function (response, status, headers, config) {
            $scope.getquotesdataactive = response.data;
            console.log(response.data);
            $scope.showquotes = true;
            $scope.loader.showquotes = false;
        });

        var res = $http.post('getdeactivequotes.php', dataObj);
        res.success(function (response, status, headers, config) {
            $scope.getquotesdatadeactive = response.data;
            console.log(response.data);
            $scope.showquotes = true;
            $scope.loader.showquotes = false;
        });

        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };

    $scope.showquotesummarydata = false;

    $scope.loader.getquotesummarydataloading = false;

    $scope.mastergetquotesummary = {};

    $scope.getquotesummary = function ($event) {

        $scope.showquotesummarydata = false;

        $scope.loader.getquotesummarydataloading = true;

        var MortQuoteID = $($event.target).data('mortquoteid');
        var quotefor = $($event.target).data('quotefor');
        var qmodifieddate = $($event.target).data('date');
        console.log(MortQuoteID);
        console.log(quotefor);
        console.log(qmodifieddate);
        if (quotefor) {
            $scope.quotefor = quotefor;
        }
        if (qmodifieddate) {
            $scope.qmodifieddate = moment(qmodifieddate).local().format('DD/MM/YYYY');
        }
        $scope.mastergetquotesummary.FFID = $rootScope.FFID;
        $scope.mastergetquotesummary.MortQuoteID = MortQuoteID;  // $rootScope.FFID; 

        var dataObj = $scope.mastergetquotesummary;

        var res = $http.post('getquotesummary.php', dataObj);
        res.success(function (response, status, headers, config) {
            $scope.getquotesummarydata = response.data;
            console.log(response.data);
            $scope.loader.getquotesummarydataloading = false;
            $scope.showquotesummarydata = true;

        });

        var res = $http.post('getproductnotes.php', dataObj);
        res.success(function (response, status, headers, config) {
            $scope.getproductnotes = response.data;
            console.log(response.data);

        });


        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty   
    };

    //post method for getquotes

    /*  $scope.submit = function() {
     if ($scope.form.$valid) {
     alert('send to server: ' + $scope.number); }
     else {
     alert("Please correct errors!");
     }
     }
     
     */


    //post method applicant

    $scope.master = {};

    $scope.updateapplicant = function (result) {

        $scope.master = angular.copy(result);

        $rootScope.applicantno = $scope.master.applicantno;
        $rootScope.clientaddressid = $scope.master.AddressID;

        console.log($scope.master.DOB);

        $scope.loader.updateapplicantloading = true;

        $scope.success = false;


        var dataObj = $scope.master;
        var res = $http.post('saveapplicants.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.message1 = data;
            $scope.success = true;
            console.log(data);
            $scope.loader.loading = false;
            // var link = "http://www.google.com/";
            //window.open(link,'newStuff'); //open's link in newly opened tab!

            $('.panel-collapse').collapse('hide');
            //$('#collapse3').collapse('show');
            //$('#collapse2').collapse('hide'); 
            $scope.masteradd = {};
            $scope.masteradd = $scope.master;
            $scope.masteradd.AddressID = $rootScope.clientaddressid;
            $scope.masteradd.FFID = $rootScope.FFID;
            $scope.masteradd.eAddressTypeID = '1';

            var dataObj = $scope.masteradd;
            var res = $http.post('createaddress.php', dataObj);
            res.success(function (data, status, headers, config) {
                $rootScope.clientaddressid = data.AddressID;
                console.log($rootScope.clientaddressid);

                $scope.master.AddressID = $rootScope.clientaddressid;
                var dataObj = $scope.master;
                var res = $http.post('saveapplicants.php', dataObj);
                res.success(function (data, status, headers, config) {

                    console.log(data);

                    $http.post('getapplicant.php', {"data": $rootScope.FFID}).
                            success(function (response, status) {
                                $scope.status = status;
                                //  $scope.data = data; 
                                $scope.result = response.data; // Show result from server in our <pre></pre> element
                                $scope.employment = response.data;
                                $rootScope.Clientname1 = response.data[0].Firstname;
                                $rootScope.Clientname2 = response.data[0].Surname;
                                if ($rootScope.ClientID1 = response.data[0].ClientID) {
                                    if ($scope.master.ClientID == $rootScope.ClientID1) {
                                        $rootScope.clientaddressid0 = response.data[0].AddressID;
                                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant1 saved</div>');
                                        $scope.hidealert = hidealert();
                                    }
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid0}).
                                            success(function (response, status) {

                                                $scope.result[0].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[0].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[0].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }
                                $scope.employment1 = {};
                                $scope.employment1.ClientID = $rootScope.ClientID1;
                                $scope.employment1.FFID = $rootScope.FFID;
                                console.log($scope.employment1.ClientID);
                                if ($rootScope.ClientID2 = response.data[1].ClientID) {
                                    if ($scope.master.ClientID == $rootScope.ClientID2) {
                                        $rootScope.clientaddressid1 = response.data[1].AddressID;
                                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant2 saved</div>');
                                        $scope.hidealert = hidealert();
                                    }
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid1}).
                                            success(function (response, status) {

                                                $scope.result[1].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[1].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[1].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }
                                $scope.employment2 = {};
                                $scope.employment2.ClientID = $rootScope.ClientID2;
                                $scope.employment2.FFID = $rootScope.FFID;
                                console.log($scope.employment2.ClientID);

                                if ($rootScope.ClientID3 = response.data[2].ClientID) {
                                    if ($scope.master.ClientID == $rootScope.ClientID3) {
                                        $rootScope.clientaddressid2 = response.data[2].AddressID;
                                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant3 saved</div>');
                                        $scope.hidealert = hidealert();
                                    }
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid2}).
                                            success(function (response, status) {

                                                $scope.result[2].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[2].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[2].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }
                                $scope.employment3 = {};
                                $scope.employment3.ClientID = $rootScope.ClientID3;
                                $scope.employment3.FFID = $rootScope.FFID;
                                console.log($scope.employment3.ClientID);

                                if ($rootScope.ClientID4 = response.data[3].ClientID) {
                                    $rootScope.clientaddressid3 = response.data[3].AddressID;
                                    if ($scope.master.ClientID == $rootScope.ClientID4) {
                                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Applicant4 saved</div>');
                                        $scope.hidealert = hidealert();
                                    }
                                    $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid3}).
                                            success(function (response, status) {

                                                $scope.result[3].EmailAddress = response.data[0].EmailAddress;
                                                $scope.result[3].MobilePhone = response.data[0].MobilePhone;
                                                $scope.result[3].eAddressTypeID = response.data[0].eAddressTypeID;


                                            });
                                }
                                $scope.employment4 = {};
                                $scope.employment4.ClientID = $rootScope.ClientID4;
                                $scope.employment4.FFID = $rootScope.FFID;
                                console.log($scope.employment4.ClientID);

                                console.log($scope.employment);




                                // $('.nav-tabs-inside .active').next('li').find('a').trigger('click'); 

                            });


                });


            });

            var res = $http.post('GetClientListByAppid.php', {"FFID": $rootScope.FFID});
            res.success(function (response, status, headers, config) {
                $scope.resultclientresult = response.data;
                console.log($scope.resultclientresult);
                //  $('.nav-tabs-inside .active').next('li').find('a').trigger('click'); 
                $scope.selectedClientID = {
                    ccj: [$scope.resultclientresult[0].ClientID],
                    liabilities: [$scope.resultclientresult[0].ClientID],
                    othermortgage: [$scope.resultclientresult[0].ClientID],
                    arrears: [$scope.resultclientresult[0].ClientID],
                    defaults: [$scope.resultclientresult[0].ClientID],
                    Bankruptcy: [$scope.resultclientresult[0].ClientID],
                    iva: [$scope.resultclientresult[0].ClientID],
                    Repossession: [$scope.resultclientresult[0].ClientID]
                };

            });




            if ($rootScope.checkboxSelection == $rootScope.applicantno) {

                var value = $rootScope.applicantno;
                var emp = 'a[id="employment' + '1' + '"]';
                console.log(emp);
                $('li').find('a[href="#etab4"]').trigger('click');
                $('.nav-tabs-inside li').find(emp).trigger('click');
                scrolltop();
            } else {
                $('.nav-tabs-inside .active').next('li').find('a').trigger('click');
                scrolltop();

            }

            $scope.loader.updateapplicantloading = false;

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            //$scope.loader.loading = false ;
        });
        // Making the fields empty




    };
    $scope.nextemployement1 = function () {
        if ($rootScope.ClientID1) {
            $('.nav-tabs-inside li').find('a[id="employment' + '1' + '"]').trigger('click');
            scrolltop();
        } else {
            $('.nav-pills .active').next('li').find('a').trigger('click');
            scrolltop();
        }
    };

    $scope.nextemployement2 = function () {
        if ($rootScope.ClientID2) {
            $('.nav-tabs-inside li').find('a[id="employment' + '2' + '"]').trigger('click');
            scrolltop();
        } else {
            $('.nav-pills .active').next('li').find('a').trigger('click');
            scrolltop();
        }
    };

    $scope.nextemployement3 = function () {
        if ($rootScope.ClientID3) {
            $('.nav-tabs-inside li').find('a[id="employment' + '3' + '"]').trigger('click');
            scrolltop();
        } else {
            $('.nav-pills .active').next('li').find('a').trigger('click');
            scrolltop();
        }
    };

    $scope.nextemployement4 = function () {
        if ($rootScope.ClientID4) {
            $('.nav-tabs-inside li').find('a[id="employment' + '4' + '"]').trigger('click');
            scrolltop();
        } else {
            $('.nav-pills .active').next('li').find('a').trigger('click');
            scrolltop();
        }
    };

    // for employment
    $scope.employpanel1 = function () {
        $scope.employheaders1 = true;
        $scope.showques1 = false;
        $scope.showincome1 = false;
        $scope.showaddincome1 = false;

        $scope.employpanel1selected = true;
        $scope.employincomepanel1selected = false;
        $scope.benefitspanel1selected = false;
        $scope.addincomepanel1selected = false;
    };
    $scope.employincomepanel1 = function () {
        $scope.showques1 = false;
        $scope.showincome1 = true;
        $scope.employheaders1 = false;
        $scope.showaddincome1 = false;

        $scope.employpanel1selected = false;
        $scope.employincomepanel1selected = true;
        $scope.benefitspanel1selected = false;
        $scope.addincomepanel1selected = false;
    };
    $scope.benefitspanel1 = function () {
        $scope.showques1 = true;
        $scope.showincome1 = false;
        $scope.employheaders1 = false;
        $scope.showaddincome1 = false;

        $scope.employpanel1selected = false;
        $scope.employincomepanel1selected = false;
        $scope.benefitspanel1selected = true;
        $scope.addincomepanel1selected = false;
    };

    $scope.addincomepanel1 = function () {
        $scope.showaddincome1 = true;
        $scope.showincome1 = false;
        $scope.employheaders1 = false;
        $scope.showques1 = false;

        $scope.employpanel1selected = false;
        $scope.employincomepanel1selected = false;
        $scope.benefitspanel1selected = false;
        $scope.addincomepanel1selected = true;
    };


    $scope.employpanel2 = function () {
        $scope.employheaders2 = true;
        $scope.showques2 = false;
        $scope.showincome2 = false;
        $scope.showaddincome2 = false;

        $scope.employpanel2selected = true;
        $scope.employincomepanel2selected = false;
        $scope.benefitspanel2selected = false;
        $scope.addincomepanel2selected = false;
    };
    $scope.employincomepanel2 = function () {
        $scope.showques2 = false;
        $scope.showincome2 = true;
        $scope.employheaders2 = false;
        $scope.showaddincome2 = false;

        $scope.employpanel2selected = false;
        $scope.employincomepanel2selected = true;
        $scope.benefitspanel2selected = false;
        $scope.addincomepanel2selected = false;
    };
    $scope.benefitspanel2 = function () {
        $scope.showques2 = true;
        $scope.showincome2 = false;
        $scope.employheaders2 = false;
        $scope.showaddincome2 = false;

        $scope.employpanel2selected = false;
        $scope.employincomepanel2selected = false;
        $scope.benefitspanel2selected = true;
        $scope.addincomepanel2selected = false;
    };
    $scope.addincomepanel2 = function () {
        $scope.showaddincome2 = true;
        $scope.showincome2 = false;
        $scope.employheaders2 = false;
        $scope.showques2 = false;

        $scope.employpanel2selected = false;
        $scope.employincomepanel2selected = false;
        $scope.benefitspanel2selected = false;
        $scope.addincomepanel2selected = true;
    };

    $scope.employpanel3 = function () {
        $scope.employheaders3 = true;
        $scope.showques3 = false;
        $scope.showincome3 = false;
        $scope.showaddincome3 = false;

        $scope.employpanel3selected = true;
        $scope.employincomepanel3selected = false;
        $scope.benefitspanel3selected = false;
        $scope.addincomepanel3selected = false;

    };
    $scope.employincomepanel3 = function () {
        $scope.showques3 = false;
        $scope.showincome3 = true;
        $scope.employheaders3 = false;
        $scope.showaddincome3 = false;

        $scope.employpanel3selected = false;
        $scope.employincomepanel3selected = true;
        $scope.benefitspanel3selected = false;
        $scope.addincomepanel3selected = false;
    };
    $scope.benefitspanel3 = function () {
        $scope.showques3 = true;
        $scope.showincome3 = false;
        $scope.employheaders3 = false;
        $scope.showaddincome3 = false;

        $scope.employpanel3selected = false;
        $scope.employincomepanel3selected = false;
        $scope.benefitspanel3selected = true;
        $scope.addincomepanel3selected = false;
    };
    $scope.addincomepanel3 = function () {
        $scope.showaddincome3 = true;
        $scope.showincome3 = false;
        $scope.employheaders3 = false;
        $scope.showques3 = false;

        $scope.employpanel3selected = false;
        $scope.employincomepanel3selected = false;
        $scope.benefitspanel3selected = false;
        $scope.addincomepanel3selected = true;
    };

    $scope.employpanel4 = function () {
        $scope.employheaders4 = true;
        $scope.showques4 = false;
        $scope.showincome4 = false;
        $scope.showaddincome4 = false;

        $scope.employpanel4selected = true;
        $scope.employincomepanel4selected = false;
        $scope.benefitspanel4selected = false;
        $scope.addincomepanel4selected = false;
    };
    $scope.employincomepanel4 = function () {
        $scope.showques4 = false;
        $scope.showincome4 = true;
        $scope.employheaders4 = false;
        $scope.showaddincome4 = false;

        $scope.employpanel4selected = false;
        $scope.employincomepanel4selected = true;
        $scope.benefitspanel4selected = false;
        $scope.addincomepanel4selected = false;
    };
    $scope.benefitspanel4 = function () {
        $scope.showques4 = true;
        $scope.showincome4 = false;
        $scope.employheaders4 = false;
        $scope.showaddincome4 = false;

        $scope.employpanel4selected = false;
        $scope.employincomepanel4selected = false;
        $scope.benefitspanel4selected = true;
        $scope.addincomepanel4selected = false;
    };
    $scope.addincomepanel4 = function () {
        $scope.showaddincome4 = true;
        $scope.showincome4 = false;
        $scope.employheaders4 = false;
        $scope.showques4 = false;

        $scope.employpanel4selected = false;
        $scope.employincomepanel4selected = false;
        $scope.benefitspanel4selected = false;
        $scope.addincomepanel4selected = true;
    };

    // end employement

    $scope.check = function (items) {
        console.log(items);
    };

    // Create First Employment

    $scope.addemploy1header = 'true';
    $scope.editemploy1header = 'false';


    $scope.mastere = {};

    $scope.createemployment1 = function (employment1) {



        $scope.loader.eheaderloading = true;

        $scope.success = false;
        $scope.mastere = angular.copy(employment1);
        $scope.mastere.EmpFullStatus = "true";
        $scope.mastere.EmpSelfCertification = "false";
        $rootScope.eEmploymentStatusIDs1 = $scope.mastere.eEmploymentStatusID;

        if ($scope.mastere.StartDate) {
            var val = $scope.mastere.StartDate;
            var splits = val.split("/");
            $scope.mastere.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.StartDate);
        }
        if ($scope.mastere.EndDate) {
            var val = $scope.mastere.EndDate;
            var splits = val.split("/");
            $scope.mastere.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.EndDate);
        }

        $rootScope.StartDates1 = $scope.mastere.StartDate;
        $rootScope.EndDates1 = $scope.mastere.EndDate;
        $rootScope.CurrentEmployments1 = $scope.mastere.CurrentEmployment;

        var dataObj = $scope.mastere;
        var res = $http.post('createemploymentheader.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employdetails1 = data;
            $scope.selfemploye1 = data;
            $scope.incomeother1 = data;
            $scope.benefits1 = data;
            $rootScope.EmploymentHeaderIDs1 = data.EmploymentHeaderID;
            $rootScope.EmpFullStatuss1 = data.EmpFullStatus;
            $rootScope.EmpSelfCertifications1 = data.EmpSelfCertification;
            $rootScope.MinEmployments1 = data.MinEmployment;
            $rootScope.ehClientID1 = data.ClientID;


            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.eheaderloading = false;

            $scope.mastered = {};
            $scope.mastered.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs1;
            $scope.mastered.eEmploymentStatusID = $rootScope.eEmploymentStatusIDs1;
            $scope.mastered.StartDate = $rootScope.StartDates1;
            $scope.mastered.EndDate = $rootScope.EndDates1;
            $scope.mastered.CurrentEmployment = $rootScope.CurrentEmployments1;

            console.log($scope.mastered);

            var dataObj = $scope.mastered;
            var res = $http.post('createemploydetails.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.employincome1 = data;
                $scope.selfemploye1 = data;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.edetailsloading = false;

                $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employdetails1 = response.data;
                            $scope.employdetails1[0].MinEmployment = $rootScope.MinEmployments1;
                            $scope.employdesc1 = response.data; // Show result from server in our <pre></pre> element  
                            console.log($scope.employdesc1);
                        });


                $http.post('GetByEmploymentHeaderID.php', {"FFID": $rootScope.FFID, "ClientID": $rootScope.ehClientID1}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employheader1 = response.data; // Show result from server in our <pre></pre> element 
                            $rootScope.MinEmployments1 = response.data[0].MinEmployment;
                            console.log($scope.employheader1);
                            $scope.addemploy1header = 'false';
                            $scope.editemploy1header = 'true';
                            if ($rootScope.eEmploymentStatusIDs1 == '5' || $rootScope.eEmploymentStatusIDs1 == '6') {
                                $scope.addincomepanel1();
                            } else {
                                $scope.employincomepanel1();
                            }
                            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
                            $scope.hidealert = hidealert();
                            $scope.scrolltoid();
                        });



            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                $scope.loader.loading = false;
            });
            // Making the fields empty



        });
    };

    //post method for employdetails

    $scope.mastered = {};

    $scope.createemploydetails1 = function (employdetails1) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.mastered = angular.copy(employdetails1);

        if ($scope.mastered.StartDate) {
            var val = $scope.mastered.StartDate;
            var splits = val.split("/");
            $scope.mastered.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.StartDate);
        }
        if ($scope.mastered.EndDate) {
            var val = $scope.mastered.EndDate;
            var splits = val.split("/");
            $scope.mastered.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.EndDate);
        }
        $rootScope.eEmploymentStatusIDs1 = $scope.mastered.eEmploymentStatusID;
        $rootScope.EmploymentHeaderIDs1 = $scope.mastered.EmploymentHeaderID;
        $rootScope.KeyWorkers1 = $scope.mastered.KeyWorker;
        $rootScope.EmpFullStatuss1 = $scope.mastered.EmpFullStatus;
        $rootScope.EmpSelfCertifications1 = $scope.mastered.EmpSelfCertification;
        $rootScope.ClientIDs1 = $scope.mastered.ClientID;
        $rootScope.MinEmployments1 = $scope.mastered.MinEmployment;
        var dataObj = $scope.mastered;
        var res = $http.post('createemploydetails.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome1 = data;
            $scope.selfemploye1 = data;
            $scope.EmploymentIDss1 = data.EmploymentID;
            $rootScope.$EmploymentIDs1 = $scope.EmploymentIDss1;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employdesc1 = response.data; // Show result from server in our <pre></pre> element  
                        console.log($scope.employdesc1);

                        $scope.mastere = {};

                        $scope.mastere.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs1;
                        $scope.mastere.KeyWorker = $rootScope.KeyWorkers1;
                        $scope.mastere.EmpFullStatus = $rootScope.EmpFullStatuss1;
                        $scope.mastere.EmpSelfCertification = $rootScope.EmpSelfCertifications1;
                        $scope.mastere.ClientID = $rootScope.ClientID1;
                        console.log($scope.mastere.ClientID);
                        $scope.mastere.FFID = $rootScope.FFID;
                        $scope.mastere.EmpFullStatus = "true";
                        $scope.mastere.EmpSelfCertification = "false";
                        $scope.mastere.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
                        $scope.mastere.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs1;
                        $scope.mastere.MinEmployment = $rootScope.MinEmployments1;
                        console.log($scope.mastere.TotalNetMonthlyIncome);
                        var dataObj = $scope.mastere;
                        var res = $http.post('createemploymentheader.php', dataObj);
                        res.success(function (data, status, headers, config) {

                            $scope.incomeother1 = data;
                            $scope.benefits1 = data;
                            // $scope.employincome1 = data;
                            //$scope.selfemploye1 = data;
                            //$scope.resultapp = thedata;
                            $scope.success = true;
                            console.log(data);
                            $scope.loader.edetailsloading = false;
                        });
                    });


            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        $scope.data = data;

                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addemployincome1 = 'true';
                            $scope.editemployincome1 = 'false';
                            $scope.employincome1 = {}
                            $scope.employincome1.EmploymentID = $rootScope.$EmploymentIDs1;
                            $scope.employincome1.ClientID = $rootScope.ehClientID1;
                            console.log($scope.employincome1.EmploymentID);
                        } else {
                            $scope.addemployincome1 = 'false';
                            $scope.editemployincome1 = 'true';
                            $scope.employincome1 = response.data;
                            $scope.employincome1[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
                            console.log($scope.employincome1);

                        }

                    });

            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;  
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addselfemploye1 = 'true';
                            $scope.editselfemploye1 = 'false';
                            $scope.selfemploye1 = {}
                            $scope.selfemploye1.EmploymentID = $rootScope.$EmploymentIDs1;
                            console.log($scope.selfemploye1.EmploymentID);
                        } else {
                            $scope.editselfemploye1 = 'true';
                            $scope.addselfemploye1 = 'false';
                            $scope.selfemploye1 = response.data;
                            console.log($scope.selfemploye1);
                            $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes1;
                            $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs1;

                        }
                    });
            if ($rootScope.eEmploymentStatusIDs1 == '5' || $rootScope.eEmploymentStatusIDs1 == '6') {
                $scope.addincomepanel1();
            } else {
                $scope.employincomepanel1();
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoid();



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.addemployincome1 = "true";
    //post method for employment income
    $scope.masteremployincome = {};

    $scope.createemployincome1 = function (employincome1) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masteremployincome = angular.copy(employincome1);
        $rootScope.TotalNetMonthlyIncomes1 = $scope.masteremployincome.TotalNetMonthlyIncome;
        $rootScope.eh1ClientID1 = $scope.masteremployincome.ClientID;
        console.log($scope.masteremployincome.TotalNetMonthlyIncome);

        var dataObj = $scope.masteremployincome;
        var res = $http.post('saveemployincome.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome1 = data;
            $scope.employincomes = data.IncomeEmpDetailID;
            $scope.$EmploymentIDs1 = data.EmploymentID;
            $rootScope.$EmploymentIDs1 = $scope.$EmploymentIDs1;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.employincomes);
            console.log($scope.$EmploymentIDs1);
            //$scope.loader.loading = false ;
            $scope.addemployincome1 = "false";
            $scope.editemployincome1 = "true";
            $scope.addincomepanel1();

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment income saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('1');

            $scope.mastereIncom = {};
            $scope.mastereIncom.FFID = $rootScope.FFID;
            if ($rootScope.ehClientID1 > 0) {
                $scope.mastereIncom.ClientID = $rootScope.ehClientID1;
            } else {
                $scope.mastereIncom.ClientID = $rootScope.eh1ClientID1;
            }
            $scope.mastereIncom.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs1;
            $scope.mastereIncom.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
            $scope.mastereIncom.EmpFullStatus = $rootScope.EmpFullStatuss1;
            $scope.mastereIncom.EmpSelfCertification = $rootScope.EmpSelfCertifications1;
            $scope.mastereIncom.MinEmployment = $rootScope.MinEmployments1;

            console.log($scope.mastereIncom);
            var dataObj = $scope.mastereIncom;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;

                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;


            });


            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employincome1 = response.data; // Show result from server in our <pre></pre> element 
                        $scope.employincome1[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
                        console.log($scope.employincome1[0].TotalNetMonthlyIncome);
                        console.log($scope.employincome1);

                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };

    $scope.addselfemploye1 = "true";

    //post method for self employment income
    $scope.masterselfemploye = {};

    $scope.createselfemploye1 = function (selfemploye1) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterselfemploye = angular.copy(selfemploye1);
        $rootScope.eAccountsAvailableIDs1 = $scope.masterselfemploye.eAccountsAvailableID;
        $rootScope.TotalNetMonthlyIncomes1 = $scope.masterselfemploye.TotalNetMonthlyIncome;


        var dataObj = $scope.masterselfemploye;
        var res = $http.post('saveselfemploye.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.selfemploye1 = data;
            $scope.selfemployes = data;
            $scope.selfemployes = data.IncomeSelfEmpDetailID;
            $scope.$sEmploymentIDs1 = data.EmploymentID;
            $rootScope.$sEmploymentIDs1 = $scope.$sEmploymentIDs1;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.selfemployes);
            // $scope.loader.loading = false ; 
            //   $scope.addselfemploye1= "false";
            //  $scope.editselfemploye1= "true";


            $scope.masterself = {};
            $scope.masterself.FFID = $rootScope.FFID;
            $scope.masterself.ClientID = $rootScope.ehClientID1;
            $scope.masterself.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs1;
            $scope.masterself.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs1;
            $scope.masterself.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
            $scope.masterself.EmpFullStatus = $rootScope.EmpFullStatuss1;
            $scope.masterself.EmpSelfCertification = $rootScope.EmpSelfCertifications1;
            $scope.masterself.MinEmployment = $rootScope.MinEmployments1;

            console.log($scope.masterself);
            var dataObj = $scope.masterself;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });



            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$sEmploymentIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.selfemploye1 = response.data;
                        console.log($scope.selfemploye1);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes1;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs1;
                        $scope.addselfemploye1 = "false";
                        $scope.editselfemploye1 = "true";
                        $scope.addincomepanel1();
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Self Employed saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('1');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty






    };


    $scope.addincomeother1header = 'true';
    $scope.editincomeother1 = 'false';

    //post method for  income other
    $scope.masterincomeother = {};

    $scope.createincomeother1 = function (incomeother1) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterincomeother = angular.copy(incomeother1);

        var dataObj = $scope.masterincomeother;
        var res = $http.post('saveicomeother.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.OtherIncomeID = data.OtherIncomeID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.OtherIncomeID);
            $scope.loader.edetailsloading = false;

            $http.post('GetIncomeOtherByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetIncomeOther1 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetIncomeOther1);

                        $scope.addincomeother1header = 'false';
                        $scope.editincomeother1 = 'true';

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional income saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.scrolltoids('2');
                        $scope.addincomeothers1 = {};
                        $scope.addincomeothers1.income = true;
                        $scope.benefitspanel1();
                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    //post method for  benefits
    $scope.masterbenefits = {};

    $scope.createbenefits1 = function (benefits1) {

        $scope.loader.edetailsloading = true;
        $scope.success = false;
        $scope.masterbenefits = angular.copy(benefits1);

        var dataObj = $scope.masterbenefits;
        var res = $http.post('savebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.IncomeBenefitID = data.IncomeBenefitID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.IncomeBenefitID);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits1 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits1);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitsone1 = 'false';
                        // $scope.nextemployement2();
                        $scope.scrolltoids('18');



                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };



    // Create Second Employment

    $scope.addemploy2header = 'true';
    $scope.editemploy2header = 'false';

    $scope.mastere = {};

    $scope.createemployment2 = function (employment2) {



        $scope.loader.eheaderloading = true;

        $scope.success = false;
        $scope.mastere = angular.copy(employment2);
        $rootScope.eEmploymentStatusIDs2 = $scope.mastere.eEmploymentStatusID;
        if ($scope.mastere.StartDate) {
            var val = $scope.mastere.StartDate;
            var splits = val.split("/");
            $scope.mastere.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.StartDate);
        }
        if ($scope.mastere.EndDate) {
            var val = $scope.mastere.EndDate;
            var splits = val.split("/");
            $scope.mastere.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.EndDate);
        }
        $rootScope.StartDates2 = $scope.mastere.StartDate;
        $rootScope.EndDates2 = $scope.mastere.EndDate;
        $rootScope.CurrentEmployments2 = $scope.mastere.CurrentEmployment;
        $scope.mastere.FFID = $rootScope.FFID;
        $scope.mastere.ClientID = $rootScope.ClientID2;
        $scope.mastere.EmpFullStatus = "true";
        $scope.mastere.EmpSelfCertification = "false";

        var dataObj = $scope.mastere;
        var res = $http.post('createemploymentheader.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employdetails2 = data;
            $scope.selfemploye2 = data;
            $scope.incomeother2 = data;
            $rootScope.EmploymentHeaderIDs2 = data.EmploymentHeaderID;
            $rootScope.EmpFullStatuss2 = data.EmpFullStatus;
            $rootScope.EmpSelfCertifications2 = data.EmpSelfCertification;
            $rootScope.MinEmployments2 = data.MinEmployment;
            $rootScope.ehClientID2 = data.ClientID;

            $scope.benefits2 = data;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.eheaderloading = false;

            $scope.mastered = {};
            $scope.mastered.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs2;
            $scope.mastered.eEmploymentStatusID = $rootScope.eEmploymentStatusIDs2;
            $scope.mastered.StartDate = $rootScope.StartDates2;
            $scope.mastered.EndDate = $rootScope.EndDates2;
            $scope.mastered.CurrentEmployment = $rootScope.CurrentEmployments2;

            console.log($scope.mastered);

            var dataObj = $scope.mastered;
            var res = $http.post('createemploydetails.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.employincome2 = data;
                $scope.selfemploye2 = data;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.edetailsloading = false;

                $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs2}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employdetails2 = response.data;
                            $scope.employdetails2[0].MinEmployment = $rootScope.MinEmployments2;
                            $scope.employdesc2 = response.data; // Show result from server in our <pre></pre> element  
                            console.log($scope.employdesc2);
                        });


                $http.post('GetByEmploymentHeaderID.php', {"FFID": $rootScope.FFID, "ClientID": $rootScope.ehClientID2}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employheader2 = response.data; // Show result from server in our <pre></pre> element 
                            $rootScope.MinEmployments2 = response.data[0].MinEmployment;
                            console.log($scope.employheader2);

                            $scope.addemploy2header = 'false';
                            $scope.editemploy2header = 'true';
                            if ($rootScope.eEmploymentStatusIDs2 == '5' || $rootScope.eEmploymentStatusIDs2 == '6') {
                                $scope.addincomepanel2();
                            } else {
                                $scope.employincomepanel2();
                            }
                            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
                            $scope.hidealert = hidealert();
                            $scope.scrolltoids('3');
                        });



            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                $scope.loader.loading = false;
            });
            // Making the fields empty



        });
    };
    //post method for employdetails
    $scope.mastered = {};

    $scope.createemploydetails2 = function (employdetails2) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.mastered = angular.copy(employdetails2);

        if ($scope.mastered.StartDate) {
            var val = $scope.mastered.StartDate;
            var splits = val.split("/");
            $scope.mastered.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.StartDate);
        }
        if ($scope.mastered.EndDate) {
            var val = $scope.mastered.EndDate;
            var splits = val.split("/");
            $scope.mastered.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.EndDate);
        }
        $rootScope.eEmploymentStatusIDs2 = $scope.mastered.eEmploymentStatusID;
        $rootScope.EmploymentHeaderIDs2 = $scope.mastered.EmploymentHeaderID;
        $rootScope.KeyWorkers2 = $scope.mastered.KeyWorker;
        $rootScope.EmpFullStatuss2 = $scope.mastered.EmpFullStatus;
        $rootScope.EmpSelfCertifications2 = $scope.mastered.EmpSelfCertification;
        $rootScope.ClientIDs2 = $scope.mastered.ClientID;
        $rootScope.MinEmployments2 = $scope.mastered.MinEmployment;
        var dataObj = $scope.mastered;
        var res = $http.post('createemploydetails.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome2 = data;
            $scope.selfemploye2 = data;
            $scope.EmploymentIDss2 = data.EmploymentID;
            $rootScope.$EmploymentIDs2 = $scope.EmploymentIDss2;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employdesc2 = response.data; // Show result from server in our <pre></pre> element 
                        console.log($scope.employdesc2);

                        $scope.mastere = {};

                        $scope.mastere.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs2;
                        $scope.mastere.KeyWorker = $rootScope.KeyWorkers2;
                        $scope.mastere.EmpFullStatus = $rootScope.EmpFullStatuss2;
                        $scope.mastere.EmpSelfCertification = $rootScope.EmpSelfCertifications2;
                        $scope.mastere.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
                        $scope.mastere.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs2;
                        $scope.mastere.MinEmployment = $rootScope.MinEmployments2;
                        $scope.mastere.ClientID = $rootScope.ClientID2;
                        console.log($scope.mastere.ClientID);
                        $scope.mastere.FFID = $rootScope.FFID;
                        $scope.mastere.EmpFullStatus = "true";
                        $scope.mastere.EmpSelfCertification = "false";
                        var dataObj = $scope.mastere;
                        var res = $http.post('createemploymentheader.php', dataObj);
                        res.success(function (data, status, headers, config) {
                            // $scope.employincome2 = data;
                            //  $scope.selfemploye2 = data;
                            //$scope.resultapp = thedata;
                            $scope.success = true;
                            console.log(data);
                            $scope.loader.edetailsloading = false;
                        });
                    });


            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addemployincome2 = 'true';
                            $scope.editemployincome2 = 'false';
                            $scope.employincome2 = {}
                            $scope.employincome2.EmploymentID = $rootScope.$EmploymentIDs2;
                            $scope.employincome2.ClientID = $rootScope.ehClientID2;
                            console.log($scope.employincome2.EmploymentID);
                        } else {
                            $scope.addemployincome2 = 'false';
                            $scope.editemployincome2 = 'true';
                            $scope.employincome2 = response.data;
                            $scope.employincome2[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
                            console.log($scope.employincome2);

                        }

                    });

            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;  
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addselfemploye2 = 'true';
                            $scope.editselfemploye2 = 'false';
                            $scope.selfemploye2 = {}
                            $scope.selfemploye2.EmploymentID = $rootScope.$EmploymentIDs2;
                            console.log($scope.selfemploye2.EmploymentID);
                        } else {
                            $scope.editselfemploye2 = 'true';
                            $scope.addselfemploye2 = 'false';
                            $scope.selfemploye2 = response.data;
                            console.log($scope.selfemploye2);
                            $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes2;
                            $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs2;

                        }
                    });
            if ($rootScope.eEmploymentStatusIDs2 == '5' || $rootScope.eEmploymentStatusIDs2 == '6') {
                $scope.addincomepanel2();
            } else {
                $scope.employincomepanel2();
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('3');


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.addemployincome2 = "true";
    //post method for employment income
    $scope.masteremployincome = {};

    $scope.createemployincome2 = function (employincome2) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masteremployincome = angular.copy(employincome2);
        $rootScope.TotalNetMonthlyIncomes2 = $scope.masteremployincome.TotalNetMonthlyIncome;
        $rootScope.eh2ClientID2 = $scope.masteremployincome.ClientID;

        var dataObj = $scope.masteremployincome;
        var res = $http.post('saveemployincome.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome2 = data;
            $scope.employincomes = data.IncomeEmpDetailID;
            $scope.$EmploymentIDs2 = data.EmploymentID;
            $rootScope.$EmploymentIDs2 = $scope.$EmploymentIDs2;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.employincomes);
            console.log($scope.$EmploymentIDs2);
            //$scope.loader.loading = false ;
            $scope.addemployincome2 = "false";
            $scope.editemployincome2 = "true";
            $scope.addincomepanel2();

            $scope.mastereIncom = {};
            $scope.mastereIncom.FFID = $rootScope.FFID;
            if ($rootScope.ehClientID2 > 0) {
                $scope.mastereIncom.ClientID = $rootScope.ehClientID2;
            } else {
                $scope.mastereIncom.ClientID = $rootScope.eh2ClientID2;
            }
            $scope.mastereIncom.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs2;
            $scope.mastereIncom.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
            $scope.mastereIncom.EmpFullStatus = $rootScope.EmpFullStatuss2;
            $scope.mastereIncom.EmpSelfCertification = $rootScope.EmpSelfCertifications2;
            $scope.mastereIncom.MinEmployment = $rootScope.MinEmployments2;

            console.log($scope.mastereIncom);
            var dataObj = $scope.mastereIncom;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;

                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });


            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employincome2 = response.data; // Show result from server in our <pre></pre> element 
                        $scope.employincome2[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
                        console.log($scope.employincome2[0].TotalNetMonthlyIncome);
                        console.log($scope.employincome2);

                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment income saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('4');



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };

    $scope.addselfemploye2 = "true";
    //post method for self employment income 
    $scope.masterselfemploye = {};

    $scope.createselfemploye2 = function (selfemploye2) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterselfemploye = angular.copy(selfemploye2);
        $rootScope.eAccountsAvailableIDs2 = $scope.masterselfemploye.eAccountsAvailableID;
        $rootScope.TotalNetMonthlyIncomes2 = $scope.masterselfemploye.TotalNetMonthlyIncome;


        var dataObj = $scope.masterselfemploye;
        var res = $http.post('saveselfemploye.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.selfemploye2 = data;
            $scope.selfemployes = data;
            $scope.selfemployes = data.IncomeSelfEmpDetailID;
            $scope.$sEmploymentIDs2 = data.EmploymentID;
            $rootScope.$sEmploymentIDs2 = $scope.$sEmploymentIDs2;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.selfemployes);
            // $scope.loader.loading = false ; 

            $scope.addselfemploye2 = "false";
            $scope.editselfemploye2 = "true";
            $scope.addincomepanel2();
            $scope.masterself = {};
            $scope.masterself.FFID = $rootScope.FFID;
            $scope.masterself.ClientID = $rootScope.ehClientID2;
            $scope.masterself.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs2;
            $scope.masterself.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs2;
            $scope.masterself.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
            $scope.masterself.EmpFullStatus = $rootScope.EmpFullStatuss2;
            $scope.masterself.EmpSelfCertification = $rootScope.EmpSelfCertifications2;
            $scope.masterself.MinEmployment = $rootScope.MinEmployments2;

            console.log($scope.masterself);
            var dataObj = $scope.masterself;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });


            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$sEmploymentIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.selfemploye2 = response.data;
                        console.log($scope.selfemploye2);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes2;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs2;
                        $scope.addselfemploye2 = "false";
                        $scope.editselfemploye2 = "true";
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Self Employed saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('4');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty






    };


    $scope.addincomeother2header = 'true';
    $scope.editincomeother2 = 'false';

    //post method for  income other
    $scope.masterincomeother = {};

    $scope.createincomeother2 = function (incomeother2) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterincomeother = angular.copy(incomeother2);

        var dataObj = $scope.masterincomeother;
        var res = $http.post('saveicomeother.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.OtherIncomeID = data.OtherIncomeID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.OtherIncomeID);
            $scope.loader.edetailsloading = false;

            $http.post('GetIncomeOtherByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetIncomeOther2 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetIncomeOther2);

                        $scope.addincomeother2header = 'false';
                        $scope.editincomeother2 = 'true';
                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional income saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.scrolltoids('5');

                        $scope.addincomeothers2 = {};
                        $scope.addincomeothers2.income = true;
                        $scope.benefitspanel2();


                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    //post method for  benefits
    $scope.masterbenefits = {};

    $scope.createbenefits2 = function (benefits2) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterbenefits = angular.copy(benefits2);

        var dataObj = $scope.masterbenefits;
        var res = $http.post('savebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.IncomeBenefitID = data.IncomeBenefitID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.IncomeBenefitID);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits2 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits2);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitssecond1 = 'false';
                        // $scope.nextemployement3();
                        $scope.scrolltoids('18');
                        $scope.showbenefits2.emp1 = '0';

                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };



    // Create third Employment

    $scope.addemploy3header = 'true';
    $scope.editemploy3header = 'false';

    $scope.mastere = {};

    $scope.createemployment3 = function (employment3) {



        $scope.loader.eheaderloading = true;

        $scope.success = false;
        $scope.mastere = angular.copy(employment3);
        $rootScope.eEmploymentStatusIDs3 = $scope.mastere.eEmploymentStatusID;

        if ($scope.mastere.StartDate) {
            var val = $scope.mastere.StartDate;
            var splits = val.split("/");
            $scope.mastere.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.StartDate);
        }
        if ($scope.mastere.EndDate) {
            var val = $scope.mastere.EndDate;
            var splits = val.split("/");
            $scope.mastere.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.EndDate);
        }

        $rootScope.StartDates3 = $scope.mastere.StartDate;
        $rootScope.EndDates3 = $scope.mastere.EndDate;
        $rootScope.CurrentEmployments3 = $scope.mastere.CurrentEmployment;
        $scope.mastere.FFID = $rootScope.FFID;
        $scope.mastere.ClientID = $rootScope.ClientID3;
        $scope.mastere.EmpFullStatus = "true";
        $scope.mastere.EmpSelfCertification = "false";
        var dataObj = $scope.mastere;
        var res = $http.post('createemploymentheader.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employdetails3 = data;
            $scope.selfemploye3 = data;
            $scope.incomeother3 = data;
            $rootScope.EmploymentHeaderIDs3 = data.EmploymentHeaderID;
            $rootScope.EmpFullStatuss3 = data.EmpFullStatus;
            $rootScope.EmpSelfCertifications3 = data.EmpSelfCertification;
            $rootScope.MinEmployments3 = data.MinEmployment;
            $rootScope.ehClientID3 = data.ClientID;

            $scope.benefits3 = data;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.eheaderloading = false;

            $scope.mastered = {};
            $scope.mastered.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs3;
            $scope.mastered.eEmploymentStatusID = $rootScope.eEmploymentStatusIDs3;
            $scope.mastered.StartDate = $rootScope.StartDates3;
            $scope.mastered.EndDate = $rootScope.EndDates3;
            $scope.mastered.CurrentEmployment = $rootScope.CurrentEmployments3;

            console.log($scope.mastered);

            var dataObj = $scope.mastered;
            var res = $http.post('createemploydetails.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.employincome3 = data;
                $scope.selfemploye3 = data;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.edetailsloading = false;

                $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs3}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employdetails3 = response.data;
                            $scope.employdetails3[0].MinEmployment = $rootScope.MinEmployments3;
                            $scope.employdesc3 = response.data; // Show result from server in our <pre></pre> element  
                            console.log($scope.employdesc3);
                        });


                $http.post('GetByEmploymentHeaderID.php', {"FFID": $rootScope.FFID, "ClientID": $rootScope.ehClientID3}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employheader3 = response.data; // Show result from server in our <pre></pre> element 
                            $rootScope.MinEmployments3 = response.data[0].MinEmployment;
                            console.log($scope.employheader3);

                            $scope.addemploy3header = 'false';
                            $scope.editemploy3header = 'true';
                            if ($rootScope.eEmploymentStatusIDs3 == '5' || $rootScope.eEmploymentStatusIDs3 == '6') {
                                $scope.addincomepanel3();
                            } else {
                                $scope.employincomepanel3();
                            }
                            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
                            $scope.hidealert = hidealert();
                            $scope.scrolltoids('6');
                        });





            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                $scope.loader.loading = false;
            });
            // Making the fields empty



        });
    };
    //post method for employdetails
    $scope.mastered = {};

    $scope.createemploydetails3 = function (employdetails3) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.mastered = angular.copy(employdetails3);

        if ($scope.mastered.StartDate) {
            var val = $scope.mastered.StartDate;
            var splits = val.split("/");
            $scope.mastered.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.StartDate);
        }
        if ($scope.mastered.EndDate) {
            var val = $scope.mastered.EndDate;
            var splits = val.split("/");
            $scope.mastered.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.EndDate);
        }
        $rootScope.eEmploymentStatusIDs3 = $scope.mastered.eEmploymentStatusID;
        $rootScope.EmploymentHeaderIDs3 = $scope.mastered.EmploymentHeaderID;
        $rootScope.KeyWorkers3 = $scope.mastered.KeyWorker;
        $rootScope.EmpFullStatuss3 = $scope.mastered.EmpFullStatus;
        $rootScope.EmpSelfCertifications3 = $scope.mastered.EmpSelfCertification;
        $rootScope.ClientIDs3 = $scope.mastered.ClientID;
        $rootScope.MinEmployments3 = $scope.mastered.MinEmployment;
        var dataObj = $scope.mastered;
        var res = $http.post('createemploydetails.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome3 = data;
            $scope.selfemploye3 = data;
            $scope.EmploymentIDss3 = data.EmploymentID;
            $rootScope.$EmploymentIDs3 = $scope.EmploymentIDss3;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employdesc3 = response.data; // Show result from server in our <pre></pre> element 
                        console.log($scope.employdesc3);

                        $scope.mastere = {};

                        $scope.mastere.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs3;
                        $scope.mastere.KeyWorker = $rootScope.KeyWorkers3;
                        $scope.mastere.EmpFullStatus = $rootScope.EmpFullStatuss3;
                        $scope.mastere.EmpSelfCertification = $rootScope.EmpSelfCertifications3;
                        $scope.mastere.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
                        $scope.mastere.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs3;
                        $scope.mastere.ClientID = $rootScope.ClientID3;
                        $scope.mastere.MinEmployment = $rootScope.MinEmployments3;
                        console.log($scope.mastere.ClientID);
                        $scope.mastere.FFID = $rootScope.FFID;
                        $scope.mastere.EmpFullStatus = "true";
                        $scope.mastere.EmpSelfCertification = "false";
                        var dataObj = $scope.mastere;
                        var res = $http.post('createemploymentheader.php', dataObj);
                        res.success(function (data, status, headers, config) {
                            //$scope.employincome3 = data;
                            //  $scope.selfemploye3 = data;
                            //$scope.resultapp = thedata;
                            $scope.success = true;
                            console.log(data);
                            $scope.loader.edetailsloading = false;
                        });
                    });

            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addemployincome3 = 'true';
                            $scope.editemployincome3 = 'false';
                            $scope.employincome3 = {}
                            $scope.employincome3.EmploymentID = $rootScope.$EmploymentIDs3;
                            $scope.employincome3.ClientID = $rootScope.ehClientID3;
                            console.log($scope.employincome3.EmploymentID);
                        } else {
                            $scope.addemployincome3 = 'false';
                            $scope.editemployincome3 = 'true';
                            $scope.employincome3 = response.data;
                            $scope.employincome3[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
                            console.log($scope.employincome3);

                        }

                    });

            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;  
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addselfemploye3 = 'true';
                            $scope.editselfemploye3 = 'false';
                            $scope.selfemploye3 = {}
                            $scope.selfemploye3.EmploymentID = $rootScope.$EmploymentIDs3;
                            console.log($scope.selfemploye3.EmploymentID);
                        } else {
                            $scope.editselfemploye3 = 'true';
                            $scope.addselfemploye3 = 'false';
                            $scope.selfemploye3 = response.data;
                            console.log($scope.selfemploye3);
                            $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes3;
                            $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs3;

                        }
                    });

            if ($rootScope.eEmploymentStatusIDs3 == '5' || $rootScope.eEmploymentStatusIDs3 == '6') {
                $scope.addincomepanel3();
            } else {
                $scope.employincomepanel3();
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('6');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.addemployincome3 = "true";
    //post method for employment income
    $scope.masteremployincome = {};

    $scope.createemployincome3 = function (employincome3) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masteremployincome = angular.copy(employincome3);
        $rootScope.TotalNetMonthlyIncomes3 = $scope.masteremployincome.TotalNetMonthlyIncome;
        $rootScope.eh3ClientID3 = $scope.masteremployincome.ClientID;

        var dataObj = $scope.masteremployincome;
        var res = $http.post('saveemployincome.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome3 = data;
            $scope.employincomes = data.IncomeEmpDetailID;
            $scope.$EmploymentIDs3 = data.EmploymentID;
            $rootScope.$EmploymentIDs3 = $scope.$EmploymentIDs3;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.employincomes);
            console.log($scope.$EmploymentIDs3);
            //$scope.loader.loading = false ;
            $scope.addemployincome3 = "false";
            $scope.editemployincome3 = "true";

            $scope.addincomepanel3();

            $scope.mastereIncom = {};
            $scope.mastereIncom.FFID = $rootScope.FFID;
            if ($rootScope.ehClientID3 > 0) {
                $scope.mastereIncom.ClientID = $rootScope.ehClientID3;
            } else {
                $scope.mastereIncom.ClientID = $rootScope.eh3ClientID3;
            }
            $scope.mastereIncom.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs3;
            $scope.mastereIncom.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
            $scope.mastereIncom.EmpFullStatus = $rootScope.EmpFullStatuss3;
            $scope.mastereIncom.EmpSelfCertification = $rootScope.EmpSelfCertifications3;
            $scope.mastereIncom.MinEmployment = $rootScope.MinEmployments3;

            console.log($scope.mastereIncom);
            var dataObj = $scope.mastereIncom;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;

                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });

            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employincome3 = response.data; // Show result from server in our <pre></pre> element 
                        $scope.employincome3[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
                        console.log($scope.employincome3[0].TotalNetMonthlyIncome);
                        console.log($scope.employincome3);

                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment income saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('7');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };
    $scope.addselfemploye3 = "true";
    //post method for self employment income
    $scope.masterselfemploye = {};

    $scope.createselfemploye3 = function (selfemploye3) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterselfemploye = angular.copy(selfemploye3);
        $rootScope.eAccountsAvailableIDs3 = $scope.masterselfemploye.eAccountsAvailableID;
        $rootScope.TotalNetMonthlyIncomes3 = $scope.masterselfemploye.TotalNetMonthlyIncome;


        var dataObj = $scope.masterselfemploye;
        var res = $http.post('saveselfemploye.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.selfemploye3 = data;
            $scope.selfemployes = data;
            $scope.selfemployes = data.IncomeSelfEmpDetailID;
            $scope.$sEmploymentIDs3 = data.EmploymentID;
            $rootScope.$sEmploymentIDs3 = $scope.$sEmploymentIDs3;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.selfemployes);
            // $scope.loader.loading = false ; 

            $scope.addselfemploye3 = "false";
            $scope.editselfemploye3 = "true";

            $scope.addincomepanel3();

            $scope.masterself = {};
            $scope.masterself.FFID = $rootScope.FFID;
            $scope.masterself.ClientID = $rootScope.ehClientID3;
            $scope.masterself.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs3;
            $scope.masterself.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs3;
            $scope.masterself.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
            $scope.masterself.EmpFullStatus = $rootScope.EmpFullStatuss3;
            $scope.masterself.EmpSelfCertification = $rootScope.EmpSelfCertifications3;
            $scope.masterself.MinEmployment = $rootScope.MinEmployments3;

            console.log($scope.masterself);
            var dataObj = $scope.masterself;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });


            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$sEmploymentIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.selfemploye3 = response.data;
                        console.log($scope.selfemploye1);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes3;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs3;
                        $scope.addselfemploye3 = "false";
                        $scope.editselfemploye3 = "true";
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Self Employed saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('7');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty






    };


    $scope.addincomeother3header = 'true';
    $scope.editincomeother3 = 'false';
    //post method for  income other
    $scope.masterincomeother = {};

    $scope.createincomeother3 = function (incomeother3) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterincomeother = angular.copy(incomeother3);

        var dataObj = $scope.masterincomeother;
        var res = $http.post('saveicomeother.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.OtherIncomeID = data.OtherIncomeID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.OtherIncomeID);
            $scope.loader.edetailsloading = false;

            $http.post('GetIncomeOtherByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetIncomeOther3 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetIncomeOther3);

                        $scope.addincomeother3header = 'false';
                        $scope.editincomeother3 = 'true';

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional income saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.scrolltoids('8');

                        $scope.addincomeothers3 = {};
                        $scope.addincomeothers3.income = true;
                        $scope.benefitspanel3();
                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    //post method for  benefits
    $scope.masterbenefits = {};

    $scope.createbenefits3 = function (benefits3) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterbenefits = angular.copy(benefits3);

        var dataObj = $scope.masterbenefits;
        var res = $http.post('savebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.IncomeBenefitID = data.IncomeBenefitID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.IncomeBenefitID);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits3 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits3);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitsthird1 = 'false';
                        //  $scope.nextemployement4();
                        $scope.scrolltoids('18');
                        $scope.showbenefits3.emp1 = '0';

                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };



    // Create Fourth Employment


    $scope.addemploy4header = 'true';
    $scope.editemploy4header = 'false';

    $scope.mastere = {};

    $scope.createemployment4 = function (employment4) {



        $scope.loader.eheaderloading = true;

        $scope.success = false;
        $scope.mastere = angular.copy(employment4);

        if ($scope.mastere.StartDate) {
            var val = $scope.mastere.StartDate;
            var splits = val.split("/");
            $scope.mastere.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.StartDate);
        }
        if ($scope.mastere.EndDate) {
            var val = $scope.mastere.EndDate;
            var splits = val.split("/");
            $scope.mastere.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastere.EndDate);
        }

        $rootScope.eEmploymentStatusIDs4 = $scope.mastere.eEmploymentStatusID;
        $rootScope.StartDates4 = $scope.mastere.StartDate;
        $rootScope.EndDates4 = $scope.mastere.EndDate;
        $rootScope.CurrentEmployments4 = $scope.mastere.CurrentEmployment;
        $scope.mastere.FFID = $rootScope.FFID;
        $scope.mastere.ClientID = $rootScope.ClientID4;
        $scope.mastere.EmpFullStatus = "true";
        $scope.mastere.EmpSelfCertification = "false";
        var dataObj = $scope.mastere;
        var res = $http.post('createemploymentheader.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employdetails4 = data;
            $scope.selfemploye4 = data;
            $scope.incomeother4 = data;
            $rootScope.EmploymentHeaderIDs4 = data.EmploymentHeaderID;
            $rootScope.EmpFullStatuss4 = data.EmpFullStatus;
            $rootScope.EmpSelfCertifications4 = data.EmpSelfCertification;
            $rootScope.MinEmployments4 = data.MinEmployment;
            $rootScope.ehClientID4 = data.ClientID;

            $scope.benefits4 = data;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.eheaderloading = false;

            $scope.mastered = {};
            $scope.mastered.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs4;
            $scope.mastered.eEmploymentStatusID = $rootScope.eEmploymentStatusIDs4;
            $scope.mastered.StartDate = $rootScope.StartDates4;
            $scope.mastered.EndDate = $rootScope.EndDates4;
            $scope.mastered.CurrentEmployment = $rootScope.CurrentEmployments4;

            console.log($scope.mastered);

            var dataObj = $scope.mastered;
            var res = $http.post('createemploydetails.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.employincome4 = data;
                $scope.selfemploye4 = data;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                $scope.loader.edetailsloading = false;

                $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs4}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employdetails4 = response.data;
                            $scope.employdetails4[0].MinEmployment = $rootScope.MinEmployments4;
                            $scope.employdesc4 = response.data; // Show result from server in our <pre></pre> element  
                            console.log($scope.employdesc4);
                        });


                $http.post('GetByEmploymentHeaderID.php', {"FFID": $rootScope.FFID, "ClientID": $rootScope.ehClientID4}).
                        success(function (response, status) {
                            $scope.status = status;
                            //  $scope.data = data; 
                            $scope.employheader4 = response.data; // Show result from server in our <pre></pre> element 
                            $rootScope.MinEmployments4 = response.data[0].MinEmployment;
                            console.log($scope.employheader4);

                            $scope.addemploy4header = 'false';
                            $scope.editemploy4header = 'true';
                            if ($rootScope.eEmploymentStatusIDs4 == '5' || $rootScope.eEmploymentStatusIDs4 == '6') {
                                $scope.addincomepanel4();
                            } else {
                                $scope.employincomepanel4();
                            }
                            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
                            $scope.hidealert = hidealert();
                            $scope.scrolltoids('9');
                        });



            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                $scope.loader.loading = false;
            });
            // Making the fields empty



        });
    };
    //post method for employdetails
    $scope.mastered = {};

    $scope.createemploydetails4 = function (employdetails4) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.mastered = angular.copy(employdetails4);

        if ($scope.mastered.StartDate) {
            var val = $scope.mastered.StartDate;
            var splits = val.split("/");
            $scope.mastered.StartDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.StartDate);
        }
        if ($scope.mastered.EndDate) {
            var val = $scope.mastered.EndDate;
            var splits = val.split("/");
            $scope.mastered.EndDate = splits[1] + "/" + splits[0] + "/" + splits[2];
            console.log($scope.mastered.EndDate);
        }
        $rootScope.eEmploymentStatusIDs4 = $scope.mastered.eEmploymentStatusID;
        $rootScope.EmploymentHeaderIDs4 = $scope.mastered.EmploymentHeaderID;
        $rootScope.KeyWorkers4 = $scope.mastered.KeyWorker;
        $rootScope.EmpFullStatuss4 = $scope.mastered.EmpFullStatus;
        $rootScope.EmpSelfCertifications4 = $scope.mastered.EmpSelfCertification;
        $rootScope.ClientIDs4 = $scope.mastered.ClientID;
        $rootScope.MinEmployments4 = $scope.mastered.MinEmployment;
        var dataObj = $scope.mastered;
        var res = $http.post('createemploydetails.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome4 = data;
            $scope.selfemploye4 = data;
            $scope.EmploymentIDss4 = data.EmploymentID;
            $rootScope.$EmploymentIDs4 = $scope.EmploymentIDss4;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllEmploymentsDesc.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employdesc4 = response.data; // Show result from server in our <pre></pre> element 
                        console.log($scope.employdesc4);

                        $scope.mastere = {};

                        $scope.mastere.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs4;
                        $scope.mastere.KeyWorker = $rootScope.KeyWorkers4;
                        $scope.mastere.EmpFullStatus = $rootScope.EmpFullStatuss4;
                        $scope.mastere.EmpSelfCertification = $rootScope.EmpSelfCertifications4;
                        $scope.mastere.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
                        $scope.mastere.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs4;
                        $scope.mastere.MinEmployment = $rootScope.MinEmployments4;
                        $scope.mastere.ClientID = $rootScope.ClientID4;
                        console.log($scope.mastere.ClientID);
                        $scope.mastere.FFID = $rootScope.FFID;
                        $scope.mastere.EmpFullStatus = "true";
                        $scope.mastere.EmpSelfCertification = "false";
                        var dataObj = $scope.mastere;
                        var res = $http.post('createemploymentheader.php', dataObj);
                        res.success(function (data, status, headers, config) {
                            // $scope.employincome4 = data;
                            // $scope.selfemploye4 = data;
                            //$scope.resultapp = thedata;
                            $scope.success = true;
                            console.log(data);
                            $scope.loader.edetailsloading = false;
                        });
                    });

            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addemployincome4 = 'true';
                            $scope.editemployincome4 = 'false';
                            $scope.employincome4 = {}
                            $scope.employincome4.EmploymentID = $rootScope.$EmploymentIDs4;
                            $scope.employincome4.ClientID = $rootScope.ehClientID4;
                            console.log($scope.employincome4.EmploymentID);
                        } else {
                            $scope.addemployincome4 = 'false';
                            $scope.editemployincome4 = 'true';
                            $scope.employincome4 = response.data;
                            $scope.employincome4[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
                            console.log($scope.employincome4);

                        }

                    });


            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data;  
                        $scope.checkdata = response.data[0].data;

                        if ($scope.checkdata == 'nodata') {
                            $scope.addselfemploye4 = 'true';
                            $scope.editselfemploye4 = 'false';
                            $scope.selfemploye4 = {}
                            $scope.selfemploye4.EmploymentID = $rootScope.$EmploymentIDs4;
                            console.log($scope.selfemploye4.EmploymentID);
                        } else {
                            $scope.editselfemploye4 = 'true';
                            $scope.addselfemploye4 = 'false';
                            $scope.selfemploye4 = response.data;
                            console.log($scope.selfemploye4);
                            $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes4;
                            $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs4;

                        }
                    });
            if ($rootScope.eEmploymentStatusIDs4 == '5' || $rootScope.eEmploymentStatusIDs4 == '6') {
                $scope.addincomepanel4();
            } else {
                $scope.employincomepanel4();
            }
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('9');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.addemployincome4 = "true";
    //post method for employment income
    $scope.masteremployincome = {};

    $scope.createemployincome4 = function (employincome4) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masteremployincome = angular.copy(employincome4);
        $rootScope.TotalNetMonthlyIncomes4 = $scope.masteremployincome.TotalNetMonthlyIncome;
        $rootScope.eh4ClientID4 = $scope.masteremployincome.ClientID;

        var dataObj = $scope.masteremployincome;
        var res = $http.post('saveemployincome.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.employincome4 = data;
            $scope.employincomes = data.IncomeEmpDetailID;
            $scope.$EmploymentIDs4 = data.EmploymentID;
            $rootScope.$EmploymentIDs4 = $scope.$EmploymentIDs4;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.employincomes);
            console.log($scope.$EmploymentIDs4);
            //$scope.loader.loading = false ;
            $scope.addemployincome4 = "false";
            $scope.editemployincome4 = "true";

            $scope.addincomepanel4();

            $scope.mastereIncom = {};
            $scope.mastereIncom.FFID = $rootScope.FFID;
            if ($rootScope.ehClientID4 > 0) {
                $scope.mastereIncom.ClientID = $rootScope.ehClientID4;
            } else {
                $scope.mastereIncom.ClientID = $rootScope.eh4ClientID4;
            }
            $scope.mastereIncom.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs4;
            $scope.mastereIncom.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
            $scope.mastereIncom.EmpFullStatus = $rootScope.EmpFullStatuss4;
            $scope.mastereIncom.EmpSelfCertification = $rootScope.EmpSelfCertifications4;
            $scope.mastereIncom.MinEmployment = $rootScope.MinEmployments4;

            console.log($scope.mastereIncom);
            var dataObj = $scope.mastereIncom;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;

                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });


            $http.post('GeIncomeEmpDetail.php', {"EmploymentID": $rootScope.$EmploymentIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.employincome4 = response.data; // Show result from server in our <pre></pre> element 
                        $scope.employincome4[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
                        console.log($scope.employincome4[0].TotalNetMonthlyIncome);
                        console.log($scope.employincome4);

                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Employment income saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('10');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };
    $scope.addselfemploye4 = "true";
    //post method for self employment income
    $scope.masterselfemploye = {};

    $scope.createselfemploye4 = function (selfemploye4) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterselfemploye = angular.copy(selfemploye4);
        $rootScope.eAccountsAvailableIDs4 = $scope.masterselfemploye.eAccountsAvailableID;
        $rootScope.TotalNetMonthlyIncomes4 = $scope.masterselfemploye.TotalNetMonthlyIncome;


        var dataObj = $scope.masterselfemploye;
        var res = $http.post('saveselfemploye.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.selfemploye4 = data;
            $scope.selfemployes = data;
            $scope.selfemployes = data.IncomeSelfEmpDetailID;
            $scope.$sEmploymentIDs4 = data.EmploymentID;
            $rootScope.$sEmploymentIDs4 = $scope.$sEmploymentIDs4;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.selfemployes);
            // $scope.loader.loading = false ; 

            $scope.addselfemploye4 = "false";
            $scope.editselfemploye4 = "true";
            $scope.addincomepanel4();

            $scope.masterself = {};
            $scope.masterself.FFID = $rootScope.FFID;
            $scope.masterself.ClientID = $rootScope.ehClientID4;
            $scope.masterself.EmploymentHeaderID = $rootScope.EmploymentHeaderIDs4;
            $scope.masterself.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs4;
            $scope.masterself.TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
            $scope.masterself.EmpFullStatus = $rootScope.EmpFullStatuss4;
            $scope.masterself.EmpSelfCertification = $rootScope.EmpSelfCertifications4;
            $scope.masterself.MinEmployment = $rootScope.MinEmployments4;

            console.log($scope.masterself);
            var dataObj = $scope.masterself;
            var res = $http.post('saveselfemployeheader.php', dataObj);
            res.success(function (data, status, headers, config) {
                $scope.saveselfemployeheader = data;
                $scope.saveselfemployeheader = data.EmploymentHeaderID;
                //$scope.resultapp = thedata;
                $scope.success = true;
                console.log(data);
                console.log($scope.saveselfemployeheader);
                $scope.loader.edetailsloading = false;



            });


            $http.post('GeIncomeSelfEmpDetail.php', {"EmploymentID": $rootScope.$sEmploymentIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.selfemploye4 = response.data;
                        console.log($scope.selfemploye4);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes4;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs4;
                        $scope.addselfemploye4 = "false";
                        $scope.editselfemploye4 = "true";
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Self Employed saved</div>');
            $scope.hidealert = hidealert();
            $scope.scrolltoids('10');

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty






    };

    $scope.addincomeother4header = 'true';
    $scope.editincomeother4 = 'false';
    //post method for  income other
    $scope.masterincomeother = {};

    $scope.createincomeother4 = function (incomeother4) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterincomeother = angular.copy(incomeother4);

        var dataObj = $scope.masterincomeother;
        var res = $http.post('saveicomeother.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.OtherIncomeID = data.OtherIncomeID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.OtherIncomeID);
            $scope.loader.edetailsloading = false;

            $http.post('GetIncomeOtherByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetIncomeOther4 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetIncomeOther4);

                        $scope.addincomeother4header = 'false';
                        $scope.editincomeother4 = 'true';

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Additional income  saved</div>');
                        $scope.hidealert = hidealert();
                        $scope.scrolltoids('11');
                        $scope.addincomeothers4 = {};
                        $scope.addincomeothers4.income = true;
                        $scope.benefitspanel4();
                    });



        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    //post method for  benefits
    $scope.masterbenefits = {};

    $scope.createbenefits4 = function (benefits4) {

        $scope.loader.edetailsloading = true;

        $scope.success = false;
        $scope.masterbenefits = angular.copy(benefits4);

        var dataObj = $scope.masterbenefits;
        var res = $http.post('savebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.IncomeBenefitID = data.IncomeBenefitID;
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log(data);
            console.log($scope.IncomeBenefitID);
            $scope.loader.edetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits4 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits4);
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits saved</div>');
            $scope.hidealert = hidealert();
            $scope.showbenefitsfourth1 = 'false';
            // $scope.next();
            $scope.scrolltoids('18');
            $scope.showbenefits4.emp1 = '0';


        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };






    $scope.searchpostcode = function () {
        $scope.loader.postcodeloading = true;
        console.log($scope.PostCode);
        $http.post('GetPostcodeByFreeText.php', {"data": $scope.PostCode}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getPostCode = response.data; // Show result from server in our <pre></pre> element
                    $scope.loader.postcodeloading = false;
                    $scope.hideaddresslist = true;
                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });

    };


    $scope.postcodeid = {};

    $scope.selectpostcode = function (value) {
        $scope.loader.postcodeaddloading = true;
        $scope.postcodeid = angular.copy(value);
        console.log($scope.postcodeid);
        $http.post('postcodeID.php', {"data": $scope.postcodeid}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getPostCodeid = response.data; // Show result from server in our <pre></pre> element
                    $scope.hideaddresslist = false;
                    $scope.loader.postcodeaddloading = false;
                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });

    };


    $scope.search = function () {
        $scope.showquotes = false;
        $scope.prefs = 'false';

        $('li').find('a[href="#etab1"]').trigger('click');
        scrolltop();

        $scope.createnewfactfind = false;

        $scope.sourcing = false;
        $scope.sourcedproducts = false;
        $scope.showshortlistproducts = false;

        $scope.loader.searchloading = true;

        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.

        // GET APPLICANT
        $rootScope.FFID = $scope.keywords;

        // FOR ADDRESS
        $scope.Address = {};
        $scope.Address.FFID = $scope.keywords;

        //show FFID 
        $scope.showffid = {};
        $scope.showffid.FFID = $rootScope.FFID;

        //GET APPID        
        $scope.getappid = {};
        $scope.getappid.FFID = $scope.keywords;
        var dataObapp = $scope.getappid;
        var res = $http.post('GetAppid.php', dataObapp);
        res.success(function (data, status, headers, config) {
            $scope.cmortgage = data;
            $rootScope.appids = data.Appid;
            //  $rootScope.appids = angular.copy($scope.test);
            //$scope.resultapp = thedata;
            $scope.success = true;
            console.log($rootScope.appids);
            $scope.loader.ffloading = false;

        });


        $http.post('getmeetingaims.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.meetingaims = response.data; // Show result from server in our <pre></pre> element       
                    $scope.MeetingAimsID = response.data[0].MeetingAimsID;
                    console.log($scope.meetingaims);
                    $scope.editmeetingaims = true;
                    $scope.addmeetingaims = false;

                });

        $http.post('getnotes.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.notess = response.data; // Show result from server in our <pre></pre> element          
                    console.log($scope.notess);
                    if (response.data == null) {
                        $scope.editnotes = false;
                        $scope.addnotes = true;
                    } else {
                        $scope.editnotes = true;
                        $scope.addnotes = false;
                    }

                });


        $scope.showeditpanel = false;
        $http.post('getapplicant.php', {"data": $scope.keywords}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.result = response.data; // Show result from server in our <pre></pre> element
                    $scope.showeditpanel = true;
                    //$rootScope.pop =  $scope.result;
                    //$scope.rr= getsourcing();
                    $scope.applicant = {};
                    if (response.data == null) {
                        angular.element(document.getElementById('message')).append('<div class="alert alert-warning"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Sorry!</strong> Case does not exist  </div>');
                        $scope.hidealert = hidealert();
                        $scope.loader.searchloading = false;
                        $scope.showeditpanel = false;
                    }

                    $scope.applicant.FFID = $rootScope.FFID;
                    console.log($scope.applicant.FFID);

                    $scope.employment = response.data;
                    $rootScope.ClientID1 = response.data[0].ClientID;
                    $rootScope.Clientname1 = response.data[0].Firstname;
                    $rootScope.Clientname2 = response.data[0].Surname;
                    $rootScope.clientaddressid0 = response.data[0].AddressID;
                    if ($rootScope.ClientID1 > 0) {
                        $scope.checkboxSelection = '1';
                        $rootScope.checkboxSelection = $scope.checkboxSelection;
                        $scope.loader.searchloading = false;
                        $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid0}).
                                success(function (response, status) {

                                    $scope.result[0].EmailAddress = response.data[0].EmailAddress;
                                    $scope.result[0].MobilePhone = response.data[0].MobilePhone;
                                    $scope.result[0].eAddressTypeID = response.data[0].eAddressTypeID;


                                });
                    }

                    $scope.employment1 = {};
                    $scope.employment1.ClientID = $rootScope.ClientID1;
                    $scope.employment1.FFID = $rootScope.FFID;
                    console.log($scope.employment1.ClientID);


                    $rootScope.ClientID2 = response.data[1].ClientID;
                    $rootScope.clientaddressid1 = response.data[1].AddressID;
                    if ($rootScope.ClientID2 > 0) {
                        $scope.checkboxSelection = '2';
                        $rootScope.checkboxSelection = $scope.checkboxSelection;
                        $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid1}).
                                success(function (response, status) {

                                    $scope.result[1].EmailAddress = response.data[0].EmailAddress;
                                    $scope.result[1].MobilePhone = response.data[0].MobilePhone;
                                    $scope.result[1].eAddressTypeID = response.data[0].eAddressTypeID;


                                });
                    }
                    $scope.employment2 = {};
                    $scope.employment2.ClientID = $rootScope.ClientID2;
                    $scope.employment2.FFID = $rootScope.FFID;
                    console.log($scope.employment2.ClientID);

                    $rootScope.ClientID3 = response.data[2].ClientID;
                    $rootScope.clientaddressid2 = response.data[2].AddressID;
                    if ($rootScope.ClientID3 > 0) {
                        $scope.checkboxSelection = '3';
                        $rootScope.checkboxSelection = $scope.checkboxSelection;
                        $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid2}).
                                success(function (response, status) {

                                    $scope.result[2].EmailAddress = response.data[0].EmailAddress;
                                    $scope.result[2].MobilePhone = response.data[0].MobilePhone;
                                    $scope.result[2].eAddressTypeID = response.data[0].eAddressTypeID;


                                });
                    }
                    $scope.employment3 = {};
                    $scope.employment3.ClientID = $rootScope.ClientID3;
                    $scope.employment3.FFID = $rootScope.FFID;
                    console.log($scope.employment3.ClientID);

                    $rootScope.ClientID4 = response.data[3].ClientID;
                    $rootScope.clientaddressid3 = response.data[3].AddressID;
                    if ($rootScope.ClientID4 > 0) {
                        $scope.checkboxSelection = '4';
                        $rootScope.checkboxSelection = $scope.checkboxSelection;
                        $http.post('GetFullAddressesbyAddressID.php', {"AddressID": $rootScope.clientaddressid3}).
                                success(function (response, status) {

                                    $scope.result[3].EmailAddress = response.data[0].EmailAddress;
                                    $scope.result[3].MobilePhone = response.data[0].MobilePhone;
                                    $scope.result[3].eAddressTypeID = response.data[0].eAddressTypeID;


                                });
                    }
                    $scope.employment4 = {};
                    $scope.employment4.ClientID = $rootScope.ClientID4;
                    $scope.employment4.FFID = $rootScope.FFID;
                    console.log($scope.employment4.ClientID);

                    console.log($scope.employment);



                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });



        //GET SELECTED CLIENTS
        $scope.getclientid = {};
        $scope.getclientid.FFID = $scope.keywords;
        var dataObjapp = $scope.getclientid;
        var res = $http.post('GetClientListByAppid.php', dataObjapp);
        res.success(function (response, status, headers, config) {
            $scope.resultclientresult = response.data;
            console.log($scope.resultclientresult);
            //  $('.active').next('li').find('a').trigger('click');
            $scope.selectedClientID = {
                ccj: [$scope.resultclientresult[0].ClientID],
                liabilities: [$scope.resultclientresult[0].ClientID],
                othermortgage: [$scope.resultclientresult[0].ClientID],
                arrears: [$scope.resultclientresult[0].ClientID],
                defaults: [$scope.resultclientresult[0].ClientID],
                Bankruptcy: [$scope.resultclientresult[0].ClientID],
                iva: [$scope.resultclientresult[0].ClientID],
                Repossession: [$scope.resultclientresult[0].ClientID]
            };

        });


        $http.post('GetByEmploymentHeaderID1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employheader1 = response.data; // Show result from server in our <pre></pre> element 
                    // console.log($scope.employheader1); 

                    if ($scope.employheader1 == '') {
                        $scope.editemploy1header = 'false';
                        $scope.addemploy1header = 'true';
                    } else {
                        $scope.editemploy1header = 'true';
                        $scope.addemploy1header = 'false';
                    }

                    $scope.employpanel1();
                    $rootScope.eAccountsAvailableIDs1 = response.data[0].eAccountsAvailableID;
                    $rootScope.TotalNetMonthlyIncomes1 = response.data[0].TotalNetMonthlyIncome;
                    $rootScope.EmploymentHeaderIDs1 = response.data[0].EmploymentHeaderID;
                    $rootScope.MinEmployments1 = response.data[0].MinEmployment;
                    // console.log($rootScope.EmploymentHeaderIDs1); 

                    $scope.benefits1 = {};
                    $scope.benefits1.EmploymentHeaderID = response.data[0].EmploymentHeaderID;
                    console.log($scope.benefits1.EmploymentHeaderID);

                    $scope.incomeother1 = {};
                    $scope.incomeother1.EmploymentHeaderID = response.data[0].EmploymentHeaderID;

                    //  $scope.employdetails1 ={};
                    //  $scope.employdetails1.ClientID = response.data[0].ClientID;
                    // console.log($scope.employdetails1.ClientID);
                    $rootScope.ehClientID1 = response.data[0].ClientID;
                });


        $http.post('GetAllEmploymentsDesc1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employdetails1 = response.data; // Show result from server in our <pre></pre> element 

                    console.log($scope.employdetails1);
                    $rootScope.$EmploymentIDs1 = response.data[0].EmploymentID;
                    $rootScope.$sEmploymentIDs1 = response.data[0].EmploymentID;
                    $scope.employdetails1[0].MinEmployment = $rootScope.MinEmployments1;
                    console.log($rootScope.$EmploymentIDs1);

                });



        $http.post('GeIncomeEmpDetail1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addemployincome1 = 'true';
                        $scope.editemployincome1 = 'false';
                        $scope.employincome1 = {}
                        $scope.employincome1.EmploymentID = $rootScope.$EmploymentIDs1;
                        $scope.employincome1.ClientID = $rootScope.ehClientID1;
                        console.log($scope.employincome1.EmploymentID);
                    } else {
                        $scope.addemployincome1 = 'false';
                        $scope.editemployincome1 = 'true';
                        $scope.employincome1 = response.data;
                        $scope.employincome1[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes1;
                        console.log($scope.employincome1);

                    }

                });


        $http.post('GeIncomeSelfEmpDetail1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data;  
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addselfemploye1 = 'true';
                        $scope.editselfemploye1 = 'false';
                        $scope.selfemploye1 = {}
                        $scope.selfemploye1.EmploymentID = $rootScope.$EmploymentIDs1;
                        console.log($scope.selfemploye1.EmploymentID);
                    } else {
                        $scope.editselfemploye1 = 'true';
                        $scope.addselfemploye1 = 'false';
                        $scope.selfemploye1 = response.data;
                        console.log($scope.selfemploye1);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes1;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs1;

                    }
                });

        $http.post('GetIncomeOtherByEmploymentHeaderID1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetIncomeOther1 = response.data; // Show result from server in our <pre></pre> element

                    if ($scope.GetIncomeOther1 == '') {
                        $scope.addincomeother1header = 'true';
                        $scope.editincomeother1 = 'false';
                    } else {
                        $scope.addincomeother1header = 'false';
                        $scope.editincomeother1 = 'true';

                    }
                    $rootScope.$getinid1 = response.data[0].OtherIncomeID;
                    console.log($rootScope.$getinid1);
                });

        $http.post('GetAllIncomeBenefitsByEmploymentHeaderID1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetAllIncomeBenefits1 = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.GetAllIncomeBenefits1);
                });


        //GET EMPLOYMENT TWO
        $http.post('GetByEmploymentHeaderID2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employheader2 = response.data; // Show result from server in our <pre></pre> element 
                    // console.log($scope.employheader1); 

                    if ($scope.employheader2 == '') {
                        $scope.editemploy2header = 'false';
                        $scope.addemploy2header = 'true';
                    } else {
                        $scope.editemploy2header = 'true';
                        $scope.addemploy2header = 'false';
                    }
                    $scope.employpanel2();
                    $rootScope.eAccountsAvailableIDs2 = response.data[0].eAccountsAvailableID;
                    $rootScope.TotalNetMonthlyIncomes2 = response.data[0].TotalNetMonthlyIncome;
                    $rootScope.EmploymentHeaderIDs2 = response.data[0].EmploymentHeaderID;
                    $rootScope.MinEmployments2 = response.data[0].MinEmployment;
                    // console.log($rootScope.EmploymentHeaderIDs2); 

                    $scope.benefits2 = {};
                    $scope.benefits2.EmploymentHeaderID = response.data[0].EmploymentHeaderID;
                    $scope.incomeother2 = {};
                    $scope.incomeother2.EmploymentHeaderID = response.data[0].EmploymentHeaderID;

                    //  $scope.employdetails1 ={};
                    //  $scope.employdetails1.ClientID = response.data[0].ClientID;
                    // console.log($scope.employdetails1.ClientID);
                    $rootScope.ehClientID2 = response.data[0].ClientID;
                });


        $http.post('GetAllEmploymentsDesc2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employdetails2 = response.data; // Show result from server in our <pre></pre> element 

                    console.log($scope.employdetails2);
                    $rootScope.$EmploymentIDs2 = response.data[0].EmploymentID;
                    $rootScope.$sEmploymentIDs2 = response.data[0].EmploymentID;
                    $scope.employdetails2[0].MinEmployment = $rootScope.MinEmployments2;
                    console.log($rootScope.$EmploymentIDs1);

                });



        $http.post('GeIncomeEmpDetail2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addemployincome2 = 'true';
                        $scope.editemployincome2 = 'false';
                        $scope.employincome2 = {}
                        $scope.employincome2.EmploymentID = $rootScope.$EmploymentIDs2;
                        $scope.employincome2.ClientID = $rootScope.ehClientID2;
                        console.log($scope.employincome2.EmploymentID);
                    } else {
                        $scope.addemployincome2 = 'false';
                        $scope.editemployincome2 = 'true';
                        $scope.employincome2 = response.data;
                        $scope.employincome2[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes2;
                        console.log($scope.employincome2);

                    }

                });


        $http.post('GeIncomeSelfEmpDetail2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data;  
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addselfemploye2 = 'true';
                        $scope.editselfemploye2 = 'false';
                        $scope.selfemploye2 = {}
                        $scope.selfemploye2.EmploymentID = $rootScope.$EmploymentIDs2;
                        console.log($scope.selfemploye2.EmploymentID);
                    } else {
                        $scope.editselfemploye2 = 'true';
                        $scope.addselfemploye2 = 'false';
                        $scope.selfemploye2 = response.data;
                        console.log($scope.selfemploye2);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes2;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs2;

                    }
                });

        $http.post('GetIncomeOtherByEmploymentHeaderID2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetIncomeOther2 = response.data; // Show result from server in our <pre></pre> element

                    if ($scope.GetIncomeOther2 == '') {
                        $scope.addincomeother2header = 'true';
                        $scope.editincomeother2 = 'false';
                    } else {
                        $scope.addincomeother2header = 'false';
                        $scope.editincomeother2 = 'true';

                    }
                    $rootScope.$getinid2 = response.data[0].OtherIncomeID;
                    console.log($rootScope.$getinid2);
                });

        $http.post('GetAllIncomeBenefitsByEmploymentHeaderID2.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetAllIncomeBenefits2 = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.GetAllIncomeBenefits2);
                });



        //GET EMPLOYMENT THREE
        $http.post('GetByEmploymentHeaderID3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employheader3 = response.data; // Show result from server in our <pre></pre> element 
                    // console.log($scope.employheader1); 

                    if ($scope.employheader3 == '') {
                        $scope.editemploy3header = 'false';
                        $scope.addemploy3header = 'true';
                    } else {
                        $scope.editemploy3header = 'true';
                        $scope.addemploy3header = 'false';
                    }
                    $scope.employpanel3();
                    $rootScope.eAccountsAvailableIDs3 = response.data[0].eAccountsAvailableID;
                    $rootScope.TotalNetMonthlyIncomes3 = response.data[0].TotalNetMonthlyIncome;
                    $rootScope.EmploymentHeaderIDs3 = response.data[0].EmploymentHeaderID;
                    $rootScope.MinEmployments3 = response.data[0].MinEmployment;
                    console.log($rootScope.EmploymentHeaderIDs3);

                    $scope.benefits3 = {};
                    $scope.benefits3.EmploymentHeaderID = response.data[0].EmploymentHeaderID;
                    $scope.incomeother3 = {};
                    $scope.incomeother3.EmploymentHeaderID = response.data[0].EmploymentHeaderID;

                    //  $scope.employdetails1 ={};
                    //  $scope.employdetails1.ClientID = response.data[0].ClientID;
                    // console.log($scope.employdetails1.ClientID);
                    $rootScope.ehClientID3 = response.data[0].ClientID;
                });


        $http.post('GetAllEmploymentsDesc3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employdetails3 = response.data; // Show result from server in our <pre></pre> element 

                    console.log($scope.employdetails3);
                    $rootScope.$EmploymentIDs3 = response.data[0].EmploymentID;
                    $rootScope.$sEmploymentIDs3 = response.data[0].EmploymentID;
                    $scope.employdetails3[0].MinEmployment = $rootScope.MinEmployments3;
                    console.log($rootScope.$EmploymentIDs3);

                });



        $http.post('GeIncomeEmpDetail3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addemployincome3 = 'true';
                        $scope.editemployincome3 = 'false';
                        $scope.employincome3 = {}
                        $scope.employincome3.EmploymentID = $rootScope.$EmploymentIDs3;
                        $scope.employincome3.ClientID = $rootScope.ehClientID3;
                        console.log($scope.employincome3.EmploymentID);
                    } else {
                        $scope.addemployincome3 = 'false';
                        $scope.editemployincome3 = 'true';
                        $scope.employincome3 = response.data;
                        $scope.employincome3[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes3;
                        console.log($scope.employincome3);

                    }

                });


        $http.post('GeIncomeSelfEmpDetail3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data;  
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addselfemploye3 = 'true';
                        $scope.editselfemploye3 = 'false';
                        $scope.selfemploye3 = {}
                        $scope.selfemploye3.EmploymentID = $rootScope.$EmploymentIDs3;
                        console.log($scope.selfemploye3.EmploymentID);
                    } else {
                        $scope.editselfemploye3 = 'true';
                        $scope.addselfemploye3 = 'false';
                        $scope.selfemploye3 = response.data;
                        console.log($scope.selfemploye3);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes3;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs3;

                    }
                });

        $http.post('GetIncomeOtherByEmploymentHeaderID3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetIncomeOther3 = response.data; // Show result from server in our <pre></pre> element

                    if ($scope.GetIncomeOther3 == '') {
                        $scope.addincomeother3header = 'true';
                        $scope.editincomeother3 = 'false';
                    } else {
                        $scope.addincomeother3header = 'false';
                        $scope.editincomeother3 = 'true';

                    }
                    $rootScope.$getinid3 = response.data[0].OtherIncomeID;
                    console.log($rootScope.$getinid3);
                });

        $http.post('GetAllIncomeBenefitsByEmploymentHeaderID3.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetAllIncomeBenefits3 = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.GetAllIncomeBenefits3);
                });




        //GET EMPLOYMENT FOUR
        $http.post('GetByEmploymentHeaderID4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employheader4 = response.data; // Show result from server in our <pre></pre> element 
                    // console.log($scope.employheader1); 

                    if ($scope.employheader4 == '') {
                        $scope.editemploy4header = 'false';
                        $scope.addemploy4header = 'true';
                    } else {
                        $scope.editemploy4header = 'true';
                        $scope.addemploy4header = 'false';
                    }
                    $scope.employpanel4();
                    $rootScope.eAccountsAvailableIDs4 = response.data[0].eAccountsAvailableID;
                    $rootScope.TotalNetMonthlyIncomes4 = response.data[0].TotalNetMonthlyIncome;
                    $rootScope.EmploymentHeaderIDs4 = response.data[0].EmploymentHeaderID;
                    $rootScope.MinEmployments4 = response.data[0].MinEmployment;
                    console.log($rootScope.EmploymentHeaderIDs4);

                    $scope.benefits4 = {};
                    $scope.benefits4.EmploymentHeaderID = response.data[0].EmploymentHeaderID;
                    $scope.incomeother4 = {};
                    $scope.incomeother4.EmploymentHeaderID = response.data[0].EmploymentHeaderID;

                    //  $scope.employdetails1 ={};
                    //  $scope.employdetails1.ClientID = response.data[0].ClientID;
                    // console.log($scope.employdetails1.ClientID);
                    $rootScope.ehClientID4 = response.data[0].ClientID;
                });


        $http.post('GetAllEmploymentsDesc4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.employdetails4 = response.data; // Show result from server in our <pre></pre> element 

                    console.log($scope.employdetails4);
                    $rootScope.$EmploymentIDs4 = response.data[0].EmploymentID;
                    $rootScope.$sEmploymentIDs4 = response.data[0].EmploymentID;
                    $scope.employdetails4[0].MinEmployment = $rootScope.MinEmployments4;
                    console.log($rootScope.$EmploymentIDs4);

                });


        $http.post('GeIncomeEmpDetail4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addemployincome4 = 'true';
                        $scope.editemployincome4 = 'false';
                        $scope.employincome4 = {}
                        $scope.employincome4.EmploymentID = $rootScope.$EmploymentIDs4;
                        $scope.employincome4.ClientID = $rootScope.ehClientID4;
                        console.log($scope.employincome4.EmploymentID);
                    } else {
                        $scope.addemployincome4 = 'false';
                        $scope.editemployincome4 = 'true';
                        $scope.employincome4 = response.data;
                        $scope.employincome4[0].TotalNetMonthlyIncome = $rootScope.TotalNetMonthlyIncomes4;
                        console.log($scope.employincome4);

                    }

                });


        $http.post('GeIncomeSelfEmpDetail4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data;  
                    $scope.checkdata = response.data[0].data;

                    if ($scope.checkdata == 'nodata') {
                        $scope.addselfemploye4 = 'true';
                        $scope.editselfemploye4 = 'false';
                        $scope.selfemploye4 = {}
                        $scope.selfemploye4.EmploymentID = $rootScope.$EmploymentIDs4;
                        console.log($scope.selfemploye4.EmploymentID);
                    } else {
                        $scope.editselfemploye4 = 'true';
                        $scope.addselfemploye4 = 'false';
                        $scope.selfemploye4 = response.data;
                        console.log($scope.selfemploye4);
                        $scope.TotalNetMonthlyIncomeself = $rootScope.TotalNetMonthlyIncomes4;
                        $scope.eAccountsAvailableID = $rootScope.eAccountsAvailableIDs4;

                    }
                });

        $http.post('GetIncomeOtherByEmploymentHeaderID4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetIncomeOther4 = response.data; // Show result from server in our <pre></pre> element

                    if ($scope.GetIncomeOther4 == '') {
                        $scope.addincomeother4header = 'true';
                        $scope.editincomeother4 = 'false';
                    } else {
                        $scope.addincomeother4header = 'false';
                        $scope.editincomeother4 = 'true';

                    }
                    $rootScope.$getinid4 = response.data[0].OtherIncomeID;
                    console.log($rootScope.$getinid4);
                });

        $http.post('GetAllIncomeBenefitsByEmploymentHeaderID4.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.GetAllIncomeBenefits4 = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.GetAllIncomeBenefits4);
                });





        //GET MONTHLY OUTGOING
        $http.post('getexpenditure.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getexpenditure = response.data; // Show result from server in our <pre></pre> element
                    $scope.expenditure = {};
                    $scope.expenditure.FFID = $rootScope.FFID;
                    console.log($scope.expenditure.FFID);

                    if ($scope.getexpenditure == '') {
                        $scope.addexpenditure = true;
                        $scope.editexpenditure = false;
                    } else {
                        $scope.addexpenditure = false;
                        $scope.editexpenditure = true;
                    }
                });


        //GET LIABILITIES
        $http.post('getliabilities.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getliabilities = response.data; // Show result from server in our <pre></pre> element
                });

        //GET ALL CURRENT MORTGAGES  
        if ($rootScope.appids = !"") {
            $http.post('GetMortAppDetails1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetMortAppDetails = response.data; // Show result from server in our <pre></pre> element

                        console.log($scope.GetMortAppDetails);
                        //  $scope.cmortgage ={};            
                        //  $scope.cmortgage.FFID =  $rootScope.FFID;
                        // $scope.cmortgage.Appid =  $rootScope.appids;
                        // console.log($scope.cmortgage.FFID);

                        if ($scope.GetMortAppDetails == '') {
                            $scope.addcurrentmortgage = true;
                            $scope.editcurrentmortgage = false;
                            $scope.Emortgagedetails();
                        } else {
                            $scope.addcurrentmortgage = false;
                            $scope.editcurrentmortgage = true;
                            $scope.Emortgagedetails();
                        }
                    });


        }



        // GET OTHER EXISTING MORTGAGES

        $scope.othermortgage = {};
        $scope.othermortgage.FFID = $rootScope.FFID;

        $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                });


        // GET PROPERTY

        $http.post('getProperties1.php', {"FFID": $rootScope.FFID/* , "appdata" : appkeywords */}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getProperties = response.data; // Show result from server in our <pre></pre> element
                    //  $scope.getProperties1 = response.data[0].AddressID; 
                    console.log($scope.getProperties);
                    $scope.Addressing = {};
                    $scope.Addressing.AddressID = response.data[0].AddressID;
                    $rootScope.AddressID = response.data[0].AddressID;

                    $scope.checkdatas = response.data[0].data;

                    if ($scope.checkdatas == 'nodata') {

                        $scope.addpropertyaddress = true;
                        $scope.editproperty = false;
                    } else {
                        $scope.addpropertyaddress = false;
                        $scope.editproperty = true;


                    }



                });

        // GET EXTRA COMMON QUESTIONS
        $http.post('getextraq.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getextraq = response.data; // Show result from server in our <pre></pre> element
                    $rootScope.ExtraQnID = response.data[0].ExtraQnID;
                    if ($scope.getextraq == '') {
                        $scope.addextraq = true;
                        $scope.editextraq = false;
                    } else {
                        $scope.addextraq = false;
                        $scope.editextraq = true;
                        $rootScope.CapitalRaisingReason = response.data[0].CapitalRaisingReason;
                        $rootScope.IsCapitalRaisingAllowed = response.data[0].IsCapitalRaisingAllowed;
                        $rootScope.Payday12Months = response.data[0].Payday12Months;
                        $rootScope.PaydayRepaid = response.data[0].PaydayRepaid;
                        $rootScope.IsBridging = response.data[0].IsBridging;
                        $rootScope.IsBridgingMainResidence = response.data[0].IsBridgingMainResidence;
                        $rootScope.BridgingTermMonths = response.data[0].BridgingTermMonths;
                        $rootScope.PayEndofTerm = response.data[0].PayEndofTerm;
                        $rootScope.AnotherAddress = response.data[0].AnotherAddress;
                        $rootScope.AnotherValue = response.data[0].AnotherValue;
                        $rootScope.AnotherOutstanding = response.data[0].notherOutstanding;
                        $rootScope.AnotherLender = response.data[0].AnotherLender;
                        $rootScope.BridgingEquity = response.data[0].BridgingEquity;
                        $rootScope.RolledUpInterest = response.data[0].RolledUpInterest;

                    }
                });



        // GET CCJ

        $http.post('getccj1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getccj = response.data; // Show result from server in our <pre></pre> element
                    console.log($scope.getccj);
                });


        // GET REPOSSESSION

        $http.post('getRepossession1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getRepossession = response.data; // Show result from server in our <pre></pre> element
                });

        //GET getNumOccurences values
        $http.post('getNumOccurences.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getNumOccurences = response.data; // Show result from server in our <pre></pre> element
                });

        //GET ARREARS

        $http.post('getarrears1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getarrears = response.data; // Show result from server in our <pre></pre> element
                });

        // GET IVA

        $http.post('getiva1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getiva = response.data; // Show result from server in our <pre></pre> element
                });


        //GET BANKRUPTCY

        $http.post('getBankruptcy1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getBankruptcy = response.data; // Show result from server in our <pre></pre> element
                });

        //GET DEFAULTS

        $http.post('getdefaults1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getDefaults = response.data; // Show result from server in our <pre></pre> element

                });

        //GET NULL VALUES
        // $http.post('Getnullvalues.php', { "FFID" : $rootScope.FFID}).
        //success(function(response, status) {
        //	$scope.status = status;
        //  $scope.data = data; 
        //	 $scope.Getnullvalues = response.data; // Show result from server in our <pre></pre> element

        //});




        //GET selected address values
        $http.post('GetAddressByAddressID1.php', {"FFID": $rootScope.FFID}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $scope.getPostCodeaddress = response.data; // Show result from server in our <pre></pre> element

                })
                .
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });


        //GET GetConsolidatedliabilities values

        $http.post('GetConsolidatedliabilities.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                success(function (response, status) {
                    $scope.status = status;
                    //  $scope.data = data; 
                    $rootScope.Consolidatedliabilities = response.data; // Show result from server in our <pre></pre> element
                    $scope.Consolidatedliabilities = response.data;
                    console.log($rootScope.Consolidatedliabilities)
                });














    };

    $scope.remove = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $('ul').find('.removecss').removeClass('ng-hide');
            console.log('yes');
        } else {
            $('ul').find('.removecss').removeClass('ng-hide');
            console.log('no');
        }
        $(this).data('state', state);

    };
    function scrolltop() {
        $('html, body').animate({
            scrollTop: $("#showeditpanel").offset().top
        }, 1000);
    }
    ;

    function hidealert() {
        $(".alert-success").fadeTo(2000, 500).slideUp(500, function () {
            $(".alert-success").alert('close');
        });
        $(".alert-warning").fadeTo(2000, 500).slideUp(500, function () {
            $(".alert-warning").alert('close');
        });
    }
    ;

    $scope.clickscrolltop = function () {
        $('html, body').animate({
            scrollTop: $("#showeditpanel").offset().top
        }, 1000);
    };

    $scope.scrolltoid = function () {
        $('html, body').animate({
            scrollTop: $("#scrolltoid").offset().top
        }, 1000);
    };
    $scope.scrolltoids = function (id) {
        var id = id;
        $('html, body').animate({
            scrollTop: $("#scrolltoid" + id + "").offset().top
        }, 1000);
    };

    $scope.showbenefitsone1 = 'false';

    $scope.showbenefitsone = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showbenefitsone1 = 'true';
        } else {
            $scope.showbenefitsone1 = 'false';
        }
        $(this).data('state', state);

    }

    $scope.showbenefitssecond1 = 'false';
    $scope.showbenefitssecond = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showbenefitssecond1 = 'true';
        } else {
            $scope.showbenefitssecond1 = 'false';
        }
        $(this).data('state', state);

    }

    $scope.showbenefitsthird1 = 'false';
    $scope.showbenefitsthird = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showbenefitsthird1 = 'true';
        } else {
            $scope.showbenefitsthird1 = 'false';
        }
        $(this).data('state', state);

    }

    $scope.showbenefitsfourth1 = 'false';

    $scope.showbenefitsfourth = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showbenefitsfourth1 = 'true';
        } else {
            $scope.showbenefitsfourth1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmeliability1 = 'false';
    $scope.showmeliability = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeliability1 = 'true';
        } else {
            $scope.showmeliability1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmeccj = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeccj1 = 'true';
        } else {
            $scope.showmeccj1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmearrearss = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmearrearss1 = 'true';
        } else {
            $scope.showmearrearss1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmeDefaults = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeDefaults1 = 'true';
        } else {
            $scope.showmeDefaults1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmeBankrupts = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeBankrupts1 = 'true';
        } else {
            $scope.showmeBankrupts1 = 'false';
        }
        $(this).data('state', state);

    }
    $scope.showmeIVAs = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeIVAs1 = 'true';
        } else {
            $scope.showmeIVAs1 = 'false';
        }
        $(this).data('state', state);

    }

    $scope.showmepossesseds = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmepossesseds1 = 'true';
        } else {
            $scope.showmepossesseds1 = 'false';
        }
        $(this).data('state', state);

    }

    $scope.showmeothermortgages1 = 'false';

    $scope.showmeothermortgages = function () {

        var state = $(this).data('state');
        state = !state;
        if (state) {
            $scope.showmeothermortgages1 = 'true';
        } else {
            $scope.showmeothermortgages1 = 'false';
        }
        $(this).data('state', state);

    }





    function getsourcing() {


        $scope.pageSize = 25;
        $scope.pageSize1 = 25;
        $scope.allItems = $rootScope.pop1;
        $scope.allItemslendername = $rootScope.pop1;
        $scope.allItems2 = $rootScope.pop2;

        //console.log($scope.allItems2);
        $scope.reverse = false;

        $scope.resetAll = function () {
            $scope.filteredList = $scope.allItems;
            $scope.filteredList1 = $scope.allItems2;
            $scope.newEmpId = '';
            $scope.newName = '';
            $scope.newEmail = '';
            $scope.searchText = '';
            $scope.currentPage = 0;
            $scope.Header = ['', '', ''];
        };

        $scope.add = function () {
            $scope.allItems.push({
                EmpId: $scope.newEmpId,
                name: $scope.newName,
                Email: $scope.newEmail
            });
            $scope.resetAll();
        };

        $scope.searching = function () {
            $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);
            console.log($scope.filteredList);
            if ($scope.searchText == '') {
                $scope.filteredList = $scope.allItems;
            }
            $scope.pagination();
        };

        // Calculate Total Number of Pages based on Search Result
        $scope.pagination = function () {
            $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
        };
        $scope.pagination1 = function () {
            $scope.ItemsByPage1 = filteredListService.paged1($scope.filteredList1, $scope.pageSize1);
        };

        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $scope.firstPage = function () {
            $scope.currentPage = 0;
        };

        $scope.lastPage = function () {
            $scope.currentPage = $scope.ItemsByPage.length - 1;
        };

        $scope.range = function (input, total) {
            var ret = [];
            if (!total) {
                total = input;
                input = 0;
            }
            for (var i = input; i < total; i++) {
                if (i != 0 && i != total - 1) {
                    ret.push(i);
                }
            }
            return ret;
        };

        $scope.sort = function (sortBy) {
            $scope.resetAll();

            $scope.columnToOrder = sortBy;

            //$Filter - Standard Service
            $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

            if ($scope.reverse)
                iconName = 'glyphicon glyphicon-chevron-up';
            else
                iconName = 'glyphicon glyphicon-chevron-down';

            if (sortBy === 'Term') {
                $scope.Header[0] = iconName;
            } else if (sortBy === 'LenderRate') {
                $scope.Header[1] = iconName;
            } else if (sortBy === 'InitialPayment') {
                $scope.Header[2] = iconName;
            } else if (sortBy === 'ValuationFee') {
                $scope.Header[3] = iconName;
            } else if (sortBy === 'Cashback') {
                $scope.Header[4] = iconName;
            } else if (sortBy === 'ArrangementFee') {
                $scope.Header[5] = iconName;
            } else if (sortBy === 'BookingFee') {
                $scope.Header[6] = iconName;
            } else if (sortBy === 'LenderName') {
                $scope.Header[7] = iconName;
            } else {
                $scope.Header[8] = iconName;
            }

            $scope.reverse = !$scope.reverse;

            $scope.pagination();
            $scope.pagination1();
        };

        //By Default sort ny Name
        $scope.sort();
        $scope.sort();

        function searchUtil(c1, toSearch) {
            /* Search Text in all 3 fields */
            return (c1.TotalFee.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || c1.TotalFee.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || c1.TotalFee == toSearch) ? true : false;
        }
        ;



        $scope.keyObj = {};
        $scope.keyObj1 = {};
        $scope.resetFilters = function () {
            // needs to be a function or it won't trigger a $watch
            $scope.keyObj = {};
            $scope.selectedlender = "";
            $scope.selectedProductType = "";
            $scope.selectedterm = "";
            $scope.filterchecked = 0;
            $scope.termchecked = 0;
        };

        $scope.$watch('keyObj.LenderName', function (newVal, oldVal) {
            // do something here

            if (newVal == null) {
                $scope.keyObj = {};
            }
        }, true);


        $scope.resetselected = function () {
            $scope.selectedClientID.c1 = "";
            $scope.checked = 0;
        };

        // pagination controls
        $scope.currentPage1 = 1;
        $scope.totalItems = $scope.allItems.length;
        $scope.entryLimit = 25; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

        // $watch search to update pagination
        $scope.$watch('keyObj', function (newVal, oldVal) {

            $scope.filtered = filterFilter($scope.allItems, newVal);
            $scope.totalItems = $scope.filtered.length;
            console.log($scope.totalItems);
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage1 = 1;
            if ($scope.totalItems == '0') {
                $scope.allItems = {};
            } else {
                $scope.allItems = $rootScope.pop1;
            }

        }, true);


        // pagination controls
        $scope.currentPage2 = 1;
        $scope.totalItemssec = $scope.allItems2.length;

        $scope.$watch('keyObj1', function (newVal, oldVal) {

            $scope.filtered1 = filterFilter($scope.allItems2, newVal);
            $scope.totalItemssec = $scope.filtered1.length;
            console.log($scope.totalItemssec);
            $scope.noOfPages = Math.ceil($scope.totalItemssec / $scope.entryLimit);
            $scope.currentPage2 = 1;

        }, true);


        $scope.sort = function (sortBy) {

            //  $scope.resetFilters();

            $scope.columnToOrder = sortBy;

            //$Filter - Standard Service
            $scope.filtered = $filter('orderBy')($scope.filtered, $scope.columnToOrder, $scope.reverse);

            if ($scope.reverse)
                iconName = 'glyphicon glyphicon-chevron-up';
            else
                iconName = 'glyphicon glyphicon-chevron-down';

            if (sortBy === 'Term') {
                $scope.Header[0] = iconName;
            } else if (sortBy === 'LenderRate') {
                $scope.Header[1] = iconName;
            } else if (sortBy === 'InitialPayment') {
                $scope.Header[2] = iconName;
            } else if (sortBy === 'ValuationFee') {
                $scope.Header[3] = iconName;
            } else if (sortBy === 'Cashback') {
                $scope.Header[4] = iconName;
            } else if (sortBy === 'ArrangementFee') {
                $scope.Header[5] = iconName;
            } else if (sortBy === 'BookingFee') {
                $scope.Header[6] = iconName;
            } else if (sortBy === 'LenderName') {
                $scope.Header[7] = iconName;
            } else {
                $scope.Header[8] = iconName;
            }

            $scope.reverse = !$scope.reverse;

        };

        //By Default sort ny Name
        $scope.sort('LenderRate');

    }
    ;

    $scope.smaster = {};
    $scope.shortlist = function (c1) {
        $scope.smaster = angular.copy(c1);

        $scope.prefs = 'true';
        $rootScope.shortlistscopes = $scope.selectedClientID.c1;
        //     $rootScope.shortlistscopes0 = $scope.selectedClientID.c1[0];
        //    $rootScope.shortlistscopes1 = $scope.selectedClientID.c1[1];
        //    $rootScope.shortlistscopes2 = $scope.selectedClientID.c1[2];
        //    $rootScope.shortlistscopes3 = $scope.selectedClientID.c1[3];
        //     $rootScope.shortlistscopes4 = $scope.selectedClientID.c1[4];
        //$scope.smaster.test3 = $scope.selectedClientID.c1[2];
        // console.log($rootScope.shortlistscopes0.ProductID);
        // console.log($rootScope.shortlistscopes1.ProductID);
        // console.log($rootScope.shortlistscopes2.ProductID);
        // console.log($rootScope.shortlistscopes3.ProductID);
        // console.log($rootScope.shortlistscopes4.ProductID);
        // $scope.shortlistscope = $rootScope.shortlistscopes;

        $scope.sorting = function (sortBy) {

            $scope.columnToOrders = sortBy;

            //$Filter - Standard Service
            $scope.shortlistscope = $filter('orderBy')($rootScope.shortlistscopes, $scope.columnToOrders, $scope.reverse);
            //  $scope.reverse = !$scope.reverse;
            console.log($scope.shortlistscope[0]);
            console.log($scope.shortlistscope[1]);
            console.log($scope.shortlistscope[2]);
            $rootScope.shortlistscopes0 = $scope.shortlistscope[0];
            $rootScope.shortlistscopes1 = $scope.shortlistscope[1];
            $rootScope.shortlistscopes2 = $scope.shortlistscope[2];
            $rootScope.shortlistscopes3 = $scope.shortlistscope[3];
            $rootScope.shortlistscopes4 = $scope.shortlistscope[4];
        };

        //By Default sort ny Name
        $scope.sorting('-IncrementalCost');


        $scope.showshortlistproducts = 'true';
        //  $scope.sourcedproducts = 'false'; 
        $('#clickshort').find('a').trigger('click');
        // $('.active').next('li').find('a').trigger('click');

        $rootScope.ProductID1 = $rootScope.shortlistscopes0.ProductID;
        $rootScope.ProductID2 = $rootScope.shortlistscopes1.ProductID;
        $rootScope.ProductID3 = $rootScope.shortlistscopes2.ProductID;
        $rootScope.ProductID4 = $rootScope.shortlistscopes3.ProductID;
        $rootScope.ProductID5 = $rootScope.shortlistscopes4.ProductID;
    };

    $scope.savemaster = {};
    $scope.saveshortlist = function (shortlist) {
        // alert('suces');
        $scope.loader.shortlistproductsloading = true;
        $scope.savemaster = angular.copy(shortlist);
        $rootScope.selectedproid = $scope.selectedClientID.ProductID[0];
        $rootScope.ProductID1Notes = $scope.savemaster.ProductIDNotes1;
        $rootScope.ProductID2Notes = $scope.savemaster.ProductIDNotes2;
        $rootScope.ProductID3Notes = $scope.savemaster.ProductIDNotes3;
        $rootScope.ProductID4Notes = $scope.savemaster.ProductIDNotes4;
        $rootScope.ProductID5Notes = $scope.savemaster.ProductIDNotes5;
        $scope.saveprodall = {};
        $scope.saveprodall = $rootScope.shortlistscopes;
        $scope.savemaster.FFID = $rootScope.FFID;
        $scope.savemaster.ClientName = $rootScope.Clientname1 + $rootScope.Clientname2;
        $scope.savemaster.SelectedProductId = $rootScope.selectedproid;
        console.log($rootScope.selectedproid);
        console.log($rootScope.ProductID1Notes);
        console.log($rootScope.ProductID2Notes);
        console.log($rootScope.ProductID3Notes);
        console.log($rootScope.ProductID4Notes);
        console.log($rootScope.ProductID5Notes);


        $scope.savemasterlist = {
            FFID: $rootScope.FFID,
            AppID: $rootScope.appids,
            ProductID1: $rootScope.ProductID1,
            ProductID2: $rootScope.ProductID2,
            ProductID3: $rootScope.ProductID3,
            ProductID4: $rootScope.ProductID4,
            ProductID5: $rootScope.ProductID5,
            SelectedProductID: $rootScope.selectedproid
        }
        console.log($scope.savemasterlist);
        var dataObjapps = $scope.savemasterlist;
        var res = $http.post('saveselectedproductslist.php', dataObjapps);
        res.success(function (data, status, headers, config) {
            $rootScope.MortQuoteIDs = data.MortQuoteID;
            console.log($rootScope.MortQuoteIDs);

            if ($scope.currentUser) {
                $scope.ff = {
                    FFID: $rootScope.FFID,
                    UserID: $scope.currentUser,
                    eCaseStatusID: '2',
                    ModifiedBy: $scope.currentUser
                }
            }
            ;
            if ($cookieStore.get('currentUser')) {
                $scope.ff = {
                    FFID: $rootScope.FFID,
                    UserID: $cookieStore.get('currentUser'),
                    eCaseStatusID: '2',
                    ModifiedBy: $cookieStore.get('currentUser')
                }
            }
            ;
            var dataObj = $scope.ff;
            var res = $http.post('createff.php', dataObj);
            res.success(function (data, status, headers, config) {
                console.log(data);
            });
            res.error(function (data, status, headers, config) {
                alert("failure message: " + JSON.stringify({data: data}));
                //$scope.loader.loading = false ;
            });


            if (($rootScope.shortlistscopes0.ProductID) > 0) {

                $scope.savemaster0 = {};
                $scope.savemaster0 = $rootScope.shortlistscopes0;
                $scope.savemaster0.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster0.FFID = $rootScope.FFID;// $rootScope.FFID;
                $scope.savemaster0.ClientName = $rootScope.Clientname1 + $rootScope.Clientname2;//$rootScope.ClientID;
                $scope.savemaster0.SelectedProductId = $rootScope.selectedproid;
                $scope.savemaster0.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster0.ProductID1Notes = $rootScope.ProductID1Notes;
                $scope.savemaster0.ProductID2Notes = $rootScope.ProductID2Notes;
                $scope.savemaster0.ProductID3Notes = $rootScope.ProductID3Notes;
                $scope.savemaster0.ProductID4Notes = $rootScope.ProductID4Notes;
                $scope.savemaster0.ProductID5Notes = $rootScope.ProductID5Notes;
                $scope.savemaster0.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                var dataObjapps = $scope.savemaster0;
                var res = $http.post('saveselectedproducts.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                });
                var dataObjapps = $scope.savemaster0;
                var res = $http.post('SaveMortgageProductNotes.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                    console.log(data);

                });

            }
            if (($rootScope.shortlistscopes1.ProductID) > 0) {

                $scope.savemaster1 = {};
                $scope.savemaster1 = $rootScope.shortlistscopes1;
                $scope.savemaster1.FFID = $rootScope.FFID;// $rootScope.FFID;
                $scope.savemaster1.ClientName = $rootScope.Clientname1 + $rootScope.Clientname2;//$rootScope.ClientID;
                $scope.savemaster1.SelectedProductId = $rootScope.selectedproid;
                $scope.savemaster1.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster1.ProductID1Notes = $rootScope.ProductID1Notes;
                $scope.savemaster1.ProductID2Notes = $rootScope.ProductID2Notes;
                $scope.savemaster1.ProductID3Notes = $rootScope.ProductID3Notes;
                $scope.savemaster1.ProductID4Notes = $rootScope.ProductID4Notes;
                $scope.savemaster1.ProductID5Notes = $rootScope.ProductID5Notes;
                $scope.savemaster1.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                var dataObjapps = $scope.savemaster1;
                var res = $http.post('saveselectedproducts.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                });
                var dataObjapps = $scope.savemaster1;
                var res = $http.post('SaveMortgageProductNotes.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                    console.log(data);

                });

            }
            if (($rootScope.shortlistscopes2.ProductID) > 0) {

                $scope.savemaster2 = {};
                $scope.savemaster2 = $rootScope.shortlistscopes2;
                $scope.savemaster2.FFID = $rootScope.FFID;// $rootScope.FFID;
                $scope.savemaster2.ClientName = $rootScope.Clientname1 + $rootScope.Clientname2;//$rootScope.ClientID;
                $scope.savemaster2.SelectedProductId = $rootScope.selectedproid;
                $scope.savemaster2.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster2.ProductID1Notes = $rootScope.ProductID1Notes;
                $scope.savemaster2.ProductID2Notes = $rootScope.ProductID2Notes;
                $scope.savemaster2.ProductID3Notes = $rootScope.ProductID3Notes;
                $scope.savemaster2.ProductID4Notes = $rootScope.ProductID4Notes;
                $scope.savemaster2.ProductID5Notes = $rootScope.ProductID5Notes;
                $scope.savemaster2.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                var dataObjapps = $scope.savemaster2;
                var res = $http.post('saveselectedproducts.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                });
                var dataObjapps = $scope.savemaster2;
                var res = $http.post('SaveMortgageProductNotes.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                    console.log(data);

                });
            }
            if (($rootScope.shortlistscopes3.ProductID) > 0) {

                $scope.savemaster3 = {};
                $scope.savemaster3 = $rootScope.shortlistscopes3;
                $scope.savemaster3.FFID = $rootScope.FFID;// $rootScope.FFID;
                $scope.savemaster3.ClientName = $rootScope.Clientname1 + $rootScope.Clientname2;//$rootScope.ClientID;
                $scope.savemaster3.SelectedProductId = $rootScope.selectedproid;
                $scope.savemaster3.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster3.ProductID1Notes = $rootScope.ProductID1Notes;
                $scope.savemaster3.ProductID2Notes = $rootScope.ProductID2Notes;
                $scope.savemaster3.ProductID3Notes = $rootScope.ProductID3Notes;
                $scope.savemaster3.ProductID4Notes = $rootScope.ProductID4Notes;
                $scope.savemaster3.ProductID5Notes = $rootScope.ProductID5Notes;
                $scope.savemaster3.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                var dataObjapps = $scope.savemaster3;
                var res = $http.post('saveselectedproducts.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                });
                var dataObjapps = $scope.savemaster3;
                var res = $http.post('SaveMortgageProductNotes.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                    console.log(data);

                });
            }

            if (($rootScope.shortlistscopes4.ProductID) > 0) {
                $scope.savemaster4 = {}
                $scope.savemaster4 = $rootScope.shortlistscopes4;
                $scope.savemaster4.FFID = $rootScope.FFID;// $rootScope.FFID;
                $scope.savemaster4.ClientName = $rootScope.ClientID;//$rootScope.ClientID;
                $scope.savemaster4.SelectedProductId = $rootScope.selectedproid;
                $scope.savemaster4.MortQuoteId = $rootScope.MortQuoteIDs;
                $scope.savemaster4.ProductID1Notes = $rootScope.ProductID1Notes;
                $scope.savemaster4.ProductID2Notes = $rootScope.ProductID2Notes;
                $scope.savemaster4.ProductID3Notes = $rootScope.ProductID3Notes;
                $scope.savemaster4.ProductID4Notes = $rootScope.ProductID4Notes;
                $scope.savemaster4.ProductID5Notes = $rootScope.ProductID5Notes;
                $scope.savemaster4.MortgageProductNotesID = $rootScope.MortgageProductNotesID;
                var dataObjapps = $scope.savemaster4;
                var res = $http.post('saveselectedproducts.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    console.log(data);

                });
                var dataObjapps = $scope.savemaster4;
                var res = $http.post('SaveMortgageProductNotes.php', dataObjapps);
                res.success(function (data, status, headers, config) {
                    $rootScope.MortgageProductNotesID = data.MortgageProductNotesID;
                    console.log(data);

                });
            }

        });

        $scope.onechecked = 1;
        $scope.shortlist.ProductIDNotes1 = null;
        $scope.shortlist.ProductIDNotes2 = null;
        $scope.shortlist.ProductIDNotes3 = null;
        $scope.shortlist.ProductIDNotes4 = null;
        $scope.shortlist.ProductIDNotes5 = null;

        $scope.showshortlistproducts = false;
        $scope.loader.shortlistproductsloading = false;
        angular.element(document.getElementById('message')).append('<div class="alert alert-success"   id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Product  saved now  </div>');
        $scope.hidealert = hidealert();
    }

    $scope.empLists = [
        {"LenderName": "test"},
        {"LenderName": "Keystone"}];


    // show / hide divs------
    $scope.showEmortgagedetails = true;
    $scope.showNmortgagedetails = false;
    $scope.selected1 = true;

    $scope.Emortgagedetails = function ($index) {
        $scope.showEmortgagedetails = true;
        $scope.showNmortgagedetails = false;
        $scope.showbmortgagedetails = false;
        $scope.selected1 = true;
        $scope.selected2 = false;
        $scope.selected7 = false;
    };
    $scope.Nmortgagedetails = function () {
        $scope.showEmortgagedetails = false;
        $scope.showNmortgagedetails = true;
        $scope.showbmortgagedetails = false;
        $scope.selected1 = false;
        $scope.selected2 = true;
        $scope.selected7 = false;
    };

    $scope.showpmortgagedetails = true;
    $scope.showbmortgagedetails = false;
    $scope.selected5 = true;

    $scope.pmortgagedetails = function ($index) {
        $scope.showpmortgagedetails = true;
        $scope.showbmortgagedetails = false;
        $scope.selected5 = true;
        $scope.selected6 = false;
    };
    $scope.bmortgagedetails = function () {
        $scope.showEmortgagedetails = false;
        $scope.showNmortgagedetails = false;
        $scope.showpmortgagedetails = false;
        $scope.showbmortgagedetails = true;
        $scope.selected5 = false;
        $scope.selected6 = true;
        $scope.selected7 = true;
        $scope.selected1 = false;
        $scope.selected2 = false;
    };
    $scope.switchmortgagedetails = function () {

        $scope.showpmortgagedetails = true;
        $scope.showNmortgagedetails = false;
        $scope.showEmortgagedetails = true;
        $scope.selected1 = true;
        $scope.showbmortgagedetails = false;
        $scope.selected5 = true;
        $scope.selected6 = false;
    };

    $scope.showfirsthalfproperty = true;
    $scope.showsecondhalfproperty = false;
    $scope.selected3 = true;

    $scope.firsthalfproperty = function () {
        $scope.showfirsthalfproperty = true;
        $scope.showsecondhalfproperty = false;
        $scope.selected3 = true;
        $scope.selected4 = false;
    };

    $scope.secondhalfproperty = function () {
        $scope.showfirsthalfproperty = false;
        $scope.showsecondhalfproperty = true;
        $scope.selected3 = false;
        $scope.selected4 = true;
    };

    $scope.showliabilities = true;
    $scope.showPayDayLoans = false;
    $scope.liabilitiesselected = true;

    $scope.viewliabilities = function () {
        $scope.showliabilities = true;
        $scope.showPayDayLoans = false;
        $scope.liabilitiesselected = true;
        $scope.PayDayLoansselected = false;
    };

    $scope.viewPayDayLoans = function () {
        $scope.showliabilities = false;
        $scope.showPayDayLoans = true;
        $scope.liabilitiesselected = false;
        $scope.PayDayLoansselected = true;
    };


    //Deleting grids//  
    $scope.masterdeletelia = {};
    $scope.deleteliabilities = function (liabilities) {
        $scope.loader.deleteliabloading = true;
        $scope.masterdeletelia = angular.copy(liabilities);

        $scope.masterdeletelia.FFID = $rootScope.FFID;
        var dataObj = $scope.masterdeletelia;

        var res = $http.post('DeleteLiability.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $http.post('getliabilities.php', {"data": $rootScope.FFID/* , "appdata" : appkeywords */}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getliabilities = response.data; // Show result from server in our <pre></pre> element

                    });

            $http.post('GetConsolidatedliabilities.php', {"FFID": $rootScope.FFID, "Appid": $rootScope.appids}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $rootScope.Consolidatedliabilities = response.data; // Show result from server in our <pre></pre> element
                        console.log($rootScope.Consolidatedliabilities);
                        $scope.Consolidatedliabilities = response.data;
                    });
            $scope.loader.deleteliabloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Liabilities Deleted</div>');
            $scope.hidealert = hidealert();
            // $scope.viewPayDayLoans();
            // $('.active').next('li').find('a').trigger('click');
            $scope.scrolltop = scrolltop();
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty
        $scope.showmeliability1 = 'false';


    };

    $scope.masterdeleteother = {};

    $scope.deleteothermortgage = function (othermortgage) {

        $scope.loader.deleteothermortgageloading = true;
        $scope.success = false;
        $scope.masterdeleteother = angular.copy(othermortgage);
        var dataObj = $scope.masterdeleteother;
        var res = $http.post('DeleteExistingMortgage.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $http.post('GetOtherMortgageDetails.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.othermortgages = response.data; // Show result from server in our <pre></pre> element
                    });
            $scope.loader.deleteothermortgageloading = false;

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Existing Mortgage Deleted  </div>');
            $scope.hidealert = hidealert();

            //  $('.active').next('li').find('a').trigger('click');
            $scope.scrolltop = scrolltop();

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty
    }


    $scope.masterdeleteRepossession = {};

    $scope.deleteRepossession = function (Repossession) {

        $scope.loader.deletereploading = true;

        $scope.masterdeleteRepossession = angular.copy(Repossession);

        $scope.masterdeleteRepossession.FFID = $rootScope.FFID;

        var dataObj = $scope.masterdeleteRepossession;

        var res = $http.post('DeleteReposession.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.showmepossesseds1 = 'false';
            $scope.loader.deletereploading = false;
            $http.post('getRepossession1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getRepossession = response.data; // Show result from server in our <pre></pre> element
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Re-possessed Deleted</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('17');
            }, 3000);

            //$('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    $scope.masterdeleteiva = {};

    $scope.deleteiva = function (iva) {

        $scope.loader.deleteivaloading = true;

        $scope.masterdeleteiva = angular.copy(iva);

        $scope.masterdeleteiva.FFID = $rootScope.FFID;

        var dataObj = $scope.masterdeleteiva;
        var res = $http.post('DeleteIVA.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.showmeIVAs1 = 'false';
            $scope.loader.deleteivaloading = false;
            $http.post('getiva1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getiva = response.data; // Show result from server in our <pre></pre> element
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> IVA saved</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('16');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    $scope.masterdeleteBankruptcy = {};

    $scope.deleteBankruptcy = function (Bankruptcy) {

        $scope.loader.deletebankloading = true;
        $scope.masterdeleteBankruptcy = angular.copy(Bankruptcy);

        $scope.masterdeleteBankruptcy.FFID = $rootScope.FFID;

        var dataObj = $scope.masterdeleteBankruptcy;

        var res = $http.post('DeleteBankrupts.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.showmeBankrupts1 = 'false';
            $scope.loader.deletebankloading = false;

            $http.post('getBankruptcy1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getBankruptcy = response.data; // Show result from server in our <pre></pre> element
                    });


            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Bankrupt Deleted</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('15');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    $scope.masterdeletedefaults = {};

    $scope.deletedefaults = function (defaults) {

        $scope.loader.deletedefaultsloading = true;
        $scope.masterdeletedefaults = angular.copy(defaults);
        $scope.masterdeletedefaults.FFID = $rootScope.FFID;
        var dataObj = $scope.masterdeletedefaults;
        var res = $http.post('deletedefaults.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.showmeDefaults1 = 'false';
            $scope.loader.deletedefaultsloading = false;

            $http.post('getdefaults1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getDefaults = response.data; // Show result from server in our <pre></pre> element
                    });
            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Defaults Deleted</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('14');
            }, 3000);

            //   $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };



    $scope.masterdeletearrears = {};

    $scope.deletearrears = function (arrears) {

        $scope.loader.deletearearsloading = true;
        $scope.masterdeletearrears = angular.copy(arrears);

        var dataObj = $scope.masterdeletearrears;
        var res = $http.post('deletedefaults.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.loader.editarearsloading = false;

            $http.post('getarrears1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getarrears = response.data; // Show result from server in our <pre></pre> element
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Arrears Deleted</div>');
            $scope.hidealert = hidealert();
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('13');
            }, 3000);


            // $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    $scope.masterdeleteccj = {};

    $scope.deleteccj = function (ccj) {
        $scope.loader.deleteccjloading = true;
        $scope.masterdeleteccj = angular.copy(ccj);
        $scope.masterdeleteccj.FFID = $rootScope.FFID;
        var dataObj = $scope.masterdeleteccj;
        var res = $http.post('deleteccj.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);
            $scope.showmeccj1 = 'false';
            $scope.loader.deleteccjloading = false;

            $http.post('getccj1.php', {"FFID": $rootScope.FFID}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.getccj = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.getccj);
                    });

            angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> CCJ Deleted</div>');
            $scope.hidealert = hidealert();
            setTimeout(function () {
                $scope.scrolltoids('12');
            }, 3000);

            //  $('.active').next('li').find('a').trigger('click');
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });
        // Making the fields empty



    };


    $scope.masterdeletebenefits = {};

    $scope.deletebenefits1 = function (benefits1) {

        $scope.loader.deleteedetailsloading = true;
        $scope.success = false;
        $scope.masterdeletebenefits = angular.copy(benefits1);

        var dataObj = $scope.masterdeletebenefits;
        var res = $http.post('deletebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);

            $scope.loader.deleteedetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs1}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits1 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits1);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits Deleted</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitsone1 = 'false';
                        // $scope.nextemployement2();
                        $scope.scrolltoids('18');



                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.deletebenefits2 = function (benefits2) {

        $scope.loader.deleteedetailsloading = true;
        $scope.success = false;
        $scope.masterdeletebenefits = angular.copy(benefits2);

        var dataObj = $scope.masterdeletebenefits;
        var res = $http.post('deletebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);

            $scope.loader.deleteedetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs2}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits2 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits2);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits Deleted</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitssecond1 = 'false';
                        // $scope.nextemployement2();
                        $scope.scrolltoids('18');



                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.deletebenefits3 = function (benefits3) {

        $scope.loader.deleteedetailsloading = true;
        $scope.success = false;
        $scope.masterdeletebenefits = angular.copy(benefits3);

        var dataObj = $scope.masterdeletebenefits;
        var res = $http.post('deletebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);

            $scope.loader.deleteedetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs3}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits3 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits3);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits Deleted</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitsthird1 = 'false';
                        // $scope.nextemployement2();
                        $scope.scrolltoids('18');



                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


    $scope.deletebenefits4 = function (benefits4) {

        $scope.loader.deleteedetailsloading = true;
        $scope.success = false;
        $scope.masterdeletebenefits = angular.copy(benefits4);

        var dataObj = $scope.masterdeletebenefits;
        var res = $http.post('deletebenefits.php', dataObj);
        res.success(function (data, status, headers, config) {
            console.log(data);

            $scope.loader.deleteedetailsloading = false;

            $http.post('GetAllIncomeBenefitsByEmploymentHeaderID.php', {"EmploymentHeaderID": $rootScope.EmploymentHeaderIDs4}).
                    success(function (response, status) {
                        $scope.status = status;
                        //  $scope.data = data; 
                        $scope.GetAllIncomeBenefits4 = response.data; // Show result from server in our <pre></pre> element
                        console.log($scope.GetAllIncomeBenefits4);

                        angular.element(document.getElementById('message')).append('<div class="alert alert-success"  id="success-alert"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>Success!</strong> Benefits Deleted</div>');
                        $scope.hidealert = hidealert();
                        $scope.showbenefitsfourth1 = 'false';
                        // $scope.nextemployement2();
                        $scope.scrolltoids('18');



                    });

        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
            $scope.loader.loading = false;
        });
        // Making the fields empty



    };


}













