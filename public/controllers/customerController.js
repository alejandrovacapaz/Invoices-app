app.controller('CustomerController', function ($scope, CustomerService) {
    init();
    function init() {
        getcustomers();
    }

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (res) {
            if(res.length > 0){
                $scope.customers = res;
            }
        });
    }
});