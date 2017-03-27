app.service('InvoiceService', function ($http, $q) {

    init();

    function init() {
    }

    this.saveinvoice = function (invoice) {
        var defer = $q.defer();
        $http.post('/api/invoices', invoice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.saveinvoiceitem = function (invoice) {
        var defer = $q.defer();
        $http.post('/api/invoices/' + invoice.invoice_id + '/items', invoice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.updateinvoiceitem = function (invoice) {
        var defer = $q.defer();
        $http.put('/api/invoices/' + invoice.invoice_id + '/items/' + invoice.detail_id, invoice).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };

    this.getinvoices = function () {
        var defer = $q.defer();
        $http.get('/api/invoices?' + new Date().getMilliseconds).success(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    };
});