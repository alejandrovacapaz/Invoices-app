app.controller('InvoiceController', function ($scope, InvoiceService, ProductService, CustomerService) {
    init();
    function init() {
        getinvoices();
        getproducts();
        getcustomers();
        datainvoice();
    }

    function datainvoice() {
        $("#divNew").hide();
        $("#divList").show();
        $scope.editinvoice = {
            id: 0,
            state: 1
        };
    };

    function getcustomers() {
        var response = CustomerService.getcustomers();
        response.then(function (res) {
            if (res.length > 0) {
                $scope.customers = res;
            }
        });
    }


    function getproducts() {
        var response = ProductService.getproducts();
        response.then(function (res) {
            if (res.length > 0) {
                $scope.products = res;
            }
        });
    }

    function getinvoices() {
        var response = InvoiceService.getinvoices();
        response.then(function (res) {
            if (res.length > 0) {
                $scope.invoices = res;
            }
        });
    }

    function saveinvoice(itemtoadd) {
        $scope.editinvoice.customer_id = $scope.selectedcustomer.id;
        $scope.editinvoice.total = $scope.sumTotal;
        $scope.editinvoice.discount = $scope.invoiceitem.discount;

        if ($scope.editinvoice.id == 0) {
            var response = InvoiceService.saveinvoice($scope.editinvoice);
            response.then(function (res) {
                if (res && res.id) {
                    $scope.editinvoice.id = res.id;

                    if ($scope.editinvoice.id > 0) {
                        $scope.detailitemadd = {};
                        $scope.detailitemadd.invoice_id = $scope.editinvoice.id;
                        $scope.detailitemadd.product_id = itemtoadd.product_id;
                        $scope.detailitemadd.quantity = itemtoadd.quantity;
                        var response = InvoiceService.saveinvoiceitem($scope.detailitemadd);
                        response.then(function (res) {
                            if (res && res.id) {
                                $scope.detailitemadd.detail_id = res.id;

                                var n = $scope.listsale.where(function (row) {
                                    if (row.product_id == itemtoadd.product_id) {
                                        row.detail_id = res.id;
                                        row.invoice_id = $scope.editinvoice.id;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else {
            if ($scope.editinvoice.id > 0) {
                $scope.detailitemadd = {};
                $scope.detailitemadd.invoice_id = $scope.editinvoice.id;
                $scope.detailitemadd.product_id = itemtoadd.product_id;
                $scope.detailitemadd.quantity = itemtoadd.quantity;
                var response = InvoiceService.saveinvoiceitem($scope.detailitemadd);
                response.then(function (res) {
                    if (res && res.id) {
                        $scope.detailitemadd.detail_id = res.id;

                        var n = $scope.listsale.where(function (row) {
                            if (row.product_id == itemtoadd.product_id) {
                                row.detail_id = res.id;
                                row.invoice_id = $scope.editinvoice.id;
                            }
                        });
                    }
                });
            }
        }
    };

    function updatedetail(itemupdate) {
        $scope.updatedetailitem = {};
        $scope.updatedetailitem.quantity = itemupdate.quantity;
        $scope.updatedetailitem.detail_id = itemupdate.detail_id;
        $scope.updatedetailitem.product_id = itemupdate.product_id;
        $scope.updatedetailitem.invoice_id = itemupdate.invoice_id;
        var response = InvoiceService.updateinvoiceitem($scope.updatedetailitem);
        response.then(function (res) {
            if (res) {
                console.log("detail invoice saved");
            }
        });
    }

    $scope.selectedinvoice = function (invoice, option) {
        $scope.invoiceselected = invoice;
        $scope.editinvoice = angular.copy($scope.invoiceselected);
        $scope.editinvoice.state = 2;

        if (option == 1) {
            $('#title').val($scope.editinvoice.title);
        }
    };

    $scope.newinvoice = function () {
        $scope.editinvoice = {};
        $scope.invoiceitem = {};
        $scope.editinvoice.id = 0;
        $scope.invoiceitem.discount = 0;
        $scope.invoiceitem.quantity = 1;
        $scope.listsale = [];
        $("#divNew").show();
        $("#divList").hide();
    };

    $scope.additem = function () {
        $scope.detailinvoice = {};

        var n = $scope.listsale.where(function (row) {
            return row.iditem == $scope.selectedproduct.id;
        });

        if (n.length == 0) {
            $scope.detailinvoice.price = +$scope.selectedproduct.price;
            $scope.detailinvoice.quantity = +$scope.invoiceitem.quantity;
            $scope.detailinvoice.name = $scope.selectedproduct.name;
            $scope.detailinvoice.product_id = $scope.selectedproduct.id;
            $scope.listsale.push($scope.detailinvoice);
        }
        getTotal();

        saveinvoice($scope.detailinvoice);
    }

    function getTotal() {
        $scope.sumTotal = $scope.listsale.sum(function (item) {
            return parseFloat(item.price * item.quantity);
        });
        $scope.sumTotalDiscount = ($scope.sumTotal - ($scope.sumTotal * ($scope.invoiceitem.discount / 100)));
    }

    $scope.increasequantity = function (item) {
        if (item.quantity >= 0) {
            item.quantity++;
            $scope.detailinvoice.quantity = item.quantity;
            getTotal();
            updatedetail(item);
        }
    }

    $scope.decreasequentity = function (item) {
        if (item.quantity > 1) {
            item.quantity--;
            $scope.detailinvoice.quantity = item.quantity;
            getTotal();
            updatedetail(item);
        }
    }

    $scope.savecustomer = function () {
        var response = CustomerService.savecustomer($scope.customer);
        response.then(function (res) {
            if (res) {
                getcustomers();
            } else {
                console.log(res);
            }
            $("#modaladdcustomer").modal("hide");
        });
    }

    $scope.openmodalcustomer = function () {
        $("#modaladdcustomer").modal();
    }

    $scope.saveproduct = function () {
        var response = ProductService.saveproduct($scope.product);
        response.then(function (res) {
            if (res) {
                getproducts();
            } else {
                console.log(res);
            }
            $("#modaladdproduct").modal("hide");
        });
    }

    $scope.openmodalproduct = function () {
        $("#modaladdproduct").modal();
    }
});