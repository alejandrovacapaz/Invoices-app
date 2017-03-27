app.controller('ProductController', function ($scope, ProductService) {
    init();
    function init() {
        getproducts();
    }

    function getproducts() {
        var response = ProductService.getproducts();
        response.then(function (res) {
            if(res.length > 0){
                $scope.products = res;
            }
        });
    }
});