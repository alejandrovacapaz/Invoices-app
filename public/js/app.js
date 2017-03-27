var app = angular.module("invoiceApp", ["ngRoute", "ngStorage"]);

app.run(function ($localStorage, $rootScope, $location, $timeout) {
    $location.path('/invoice');        
});

app.config(function($routeProvider) {
    $routeProvider    
    .when("/invoice", {
        controller: "InvoiceController",
        templateUrl : "partials/invoice.html"
    })
    .when("/customer", {
        controller: "CustomerController",
        templateUrl : "partials/customer.html"
    })
    .when("/product", {
        controller: "ProductController",
        templateUrl : "partials/product.html"
    })
    .otherwise({ redirectTo: '/' });
});

Array.prototype.where = Array.prototype.filter || function (predicate, context) {
    context = context || window;
    var arr = [];
    var l = this.length;
    for (var i = 0; i < l; i++)
        if (predicate.call(context, this[i], i, this) === true) arr.push(this[i]);
    return arr;
};

Array.prototype.sum = function (s) {
    s = s || DefaultSelector;
    var l = this.length;
    var sum = 0;
    while (l-- > 0) sum += s(this[l]);
    return sum;
};