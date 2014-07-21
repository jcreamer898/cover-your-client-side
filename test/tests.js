"use strict";

module("zip code searcher");
test("should be a zip code search view model", function() {
    ok(AddressViewModel);
});

test("should validate zip codes", function() {
    var vm = new AddressViewModel(), 
        valid;

    valid = vm.isValid("3717a");

    ok(!valid, "this is an invalid zip code");

    valid = vm.isValid(37179);

    ok(valid, "this is a valid zip code");
});

test("should check the length of zip codes", function() {
    var vm = new AddressViewModel(), 
        valid;

    valid = vm.isLongEnough(3717);

    ok(!valid, "this is too short");


    valid = vm.isLongEnough(37179);

    ok(valid, "this is a valid zip code");
});

test("should search for zip codes if a zip is valid", function() {
    var vm = new AddressViewModel(),
        promise;

    sinon.stub(jQuery, "ajax").returns({
        done: $.noop
    });

    promise = vm.fetch(37179).done;

    ok(jQuery.ajax.calledOnce, "should try to fetch");

    jQuery.ajax.restore();
});

test("should not search for zip codes if a zip is invalid", function() {
    var vm = new AddressViewModel();

    throws(function() { 
        vm.fetch("abc"); 
    }, "an exception will be thrown when there is no zip passed to fetch");
});

asyncTest("should set the city state and county with a valid zip", function() {
    var vm = new AddressViewModel(),
        promise;

    sinon.stub(jQuery, "ajax").returns({
        done: function(callback) {
            callback({
                postalcodes: [{
                    adminCode1: "foo",
                    adminName2: "bar",
                    placeName: "bam"
                }]
            });

            ok(vm.isLocated(), "should set an isLocated flag to true");
            equal(vm.city(), "bam");
            equal(vm.state(), "foo");
            equal(vm.county(), "bar");

            start();
            jQuery.ajax.restore();
        }
    });

    vm.zip(37179);
});

test("should be able to clear the results", function() {
    var vm = new AddressViewModel();

    vm.zip(12345);
    vm.city("foo");
    vm.state("bar");
    vm.county("bam");

    vm.clear();

    equal(vm.zip(), "");
    equal(vm.city(), "");
    equal(vm.state(), "");
    equal(vm.county(), "");
});