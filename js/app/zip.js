var AddressViewModel = function(options) {
    options = options || {};

    this.zip = ko.observable(options.zip);
    this.city = ko.observable(options.city);
    this.state = ko.observable(options.state);
    this.county = ko.observable(options.county);

    this.isLocated = ko.computed(function() {
        return this.city() && this.state() && this.county() && this.zip();
    }, this);

    this.initialize();
};

AddressViewModel.prototype.initialize = function() {
    this.zip.subscribe(this.zipChanged, this);
};

AddressViewModel.prototype.zipChanged = function(value) {
    if (value.toString().length === 5) {
        this.fetch(value);
    }
};

AddressViewModel.prototype.fetch = function(zip) {
    var baseUrl = "http://www.geonames.org/postalCodeLookupJSON";

    $.ajax({
        url: baseUrl,
        data: {
            "postalcode": zip,
            "country": "us"
        },
        type: "GET",
        dataType: "JSONP"
    }).done(this.fetched.bind(this));
};

AddressViewModel.prototype.fetched = function(data) {
    var cityInfo;

    if (data.postalcodes && data.postalcodes.length === 1) {
        cityInfo = data.postalcodes[0];

        this.city(cityInfo.placeName);
        this.state(cityInfo.adminCode1);
        this.county(cityInfo.adminName2);
    }
};
