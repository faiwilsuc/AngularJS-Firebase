app.filter('unique', function () {
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
app.filter('truncate', function () {
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


app.filter('newline', function ($sce) {
    return function (text) {
        text = text.replace(/\n/g, '<br />');
        return $sce.trustAsHtml(text);
    }
});

app.directive('myCombineDirective', function () {
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

app.filter('roundConverter', function () {
    return function (val) {
        if (val) {
            var parsed = parseFloat(val, 10);
            if (parsed !== parsed) {
                return null;
            } // check for NaN-
            var rounded = Math.round(parsed);
            return rounded;
        }
        ;

    };
});
app.filter('dateformat', function () {
    return function (str) {
        if (!str)
            return null;
        return new Date(parseInt(str.substr(6)));

    };
});
app.filter('changedateformat', function () {
    return function (str) {
        var date = str;
        var d = new Date(date.split("/").reverse().join("-"));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        return (dd + "/" + mm + "/" + yy);
    };
});

app.filter('jsonDate', ['$filter', function ($filter) {
        return function (input, format) {
            return (input) ? $filter('date')(parseInt(input.substr(6)), format) : '';
            // return (input) ? $filter('date')(input, format) : '';
        };
    }]);
app.directive('date', function (dateFilter) {
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
app.directive('moDateInput', function ($window) {
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
app.filter('groupBy', function ($parse) {
    return _.memoize(function (items, field) {
        var getter = $parse(field);
        return _.groupBy(items, function (item) {
            return getter(item);
        });
    });

});
app.directive('onlyAlphabets', function () {
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

    function isALetter(charVal) {
        if (charVal.toUpperCase() != charVal.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
});
app.directive('invalidDate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            var invalidDate = attr.invalidDate;
            ngModel.$parsers.unshift(function (value) {
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
app.directive('numbersOnly', function () {
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
app.directive('onlyNum', function () {
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
app.directive('validNumber', function () {
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
app.filter('setDecimal', function ($filter) {
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
app.directive('validateOldDate', function () {
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
app.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            scope.$watch(attr.ngMin, function () {
                ngModel.$setViewValue(ngModel.$viewValue);
                //  console.log(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ngModel.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ngModel.$setValidity('ngMin', true);
                    return value;
                }
            };

            ngModel.$parsers.push(minValidator);
            ngModel.$formatters.push(minValidator);
        }
    };
});
app.directive('calucalteLtv', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (scope.cmortgage) {
                scope.$watch(function () {
                    // var value = ngModel.$modelValue;
                    var value = ((parseFloat(scope.cmortgage.PropertyValue) - parseFloat(scope.cmortgage.Deposit) + parseFloat(scope.cmortgage.CapitalRaising)) / parseFloat(scope.cmortgage.PropertyValue)) * 100;
                    //console.log(value);
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
        }
    };
});
app.directive('remoCalucalteLtv', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(function () {
                if (scope.cmortgage) {
                    //  var value = ngModel.$modelValue;
                    var value = ((parseFloat(scope.cmortgage.RemainingBalance) + parseFloat(scope.cmortgage.CapitalRaising)) / parseFloat(scope.cmortgage.rPropertyValue)) * 100;
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
                }
            });
        }
    };
});
app.directive('backButton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});
app.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,
                function (i) {
                    /* Search Text in all 3 fields */
                    return searchUtil(i, toSearch);
                });
    };

    this.paged = function (valLists, pageSize) {
        var retVal = [];
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
        var retVal = [];
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
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
app.directive('myCompare', function ($q, $http, $templateCache) {
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
//filter Multiple...
app.filter('filterMultiple', ['$filter', function ($filter) {
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

//
//app.directive('date', function (dateFilter) {
//    return {
//        require: 'ngModel',
//        link: function (scope, elm, attrs, ctrl) {
//
//            var dateFormat = attrs['date'] || 'dd/MM/yyyy';
//
//            ctrl.$formatters.unshift(function (modelValue) {
//                return dateFilter(modelValue, dateFormat);
//            });
//        }
//    };
//})


app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});
//app.directive('ngEnter', function () {
//    return function (scope, element, attrs) {
//        element.bind("keydown keypress", function (event) {
//            if (event.which === 13) {
//                scope.$apply(function () {
//                    scope.$eval(attrs.ngEnter);
//                });
//
//                event.preventDefault();
//            }
//        });
//    };
//});

