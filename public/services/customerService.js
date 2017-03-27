app.service('CustomerService', function ($http, $q) {

    init();

    function init() {
    }   
    this.getcustomers = function () {
        var defer = $q.defer();
        $http.get('/api/customers?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.savecustomer = function (customer) {
        var defer = $q.defer();
        $http.post('/api/customers', customer).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});