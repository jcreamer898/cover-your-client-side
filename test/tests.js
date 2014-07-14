module("zip code retriever");
test("form view model", function() {
    ok(AddressViewModel, "A viewModel for our form should exist");
});

module("address view model");
test("should only try to get data if there's 5 chars", function() {
    var address = new AddressViewModel();

    sinon.stub(jQuery, "ajax").returns({
        done: $.noop
    });

    address.zip(3717);

    ok(!jQuery.ajax.calledOnce);

    address.zip(37179);

    ok(jQuery.ajax.calledOnce);

    jQuery.ajax.restore();
});

test("should show city state data if a zip code is found", function() {
    var address = new AddressViewModel();

    ok(!address.isLocated());

    address.zip(12345);
    address.city("foo");
    address.state("bar");
    address.county("bam");

    ok(address.isLocated());
});

test("should set city info based off search result", function() {
    var address = new AddressViewModel();

    address.fetched({
        postalcodes: [{
            adminCode1: "foo",
            adminName2: "bar",
            placeName: "bam"
        }]
    });

    equal(address.city(), "bam");
    equal(address.state(), "foo");
    equal(address.county(), "bar");
});
