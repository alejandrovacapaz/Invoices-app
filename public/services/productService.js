app.service('ProductService', function ($http, $q) {

    init();

    function init() {
    }   
    this.getproducts = function () {
        var defer = $q.defer();
        $http.get('/api/products?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveproduct = function (product) {
        var defer = $q.defer();
        $http.post('/api/products', product).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});