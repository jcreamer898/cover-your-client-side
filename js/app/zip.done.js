function AddressViewModel() {
    this.zip = ko.observable();
    this.city = ko.observable();
    this.state = ko.observable();
    this.county = ko.observable();

    this.isLocated = ko.computed(function() { 
        return this.zip() && this.city() && this.county() && this.state();
    }, this);

    this.zip.subscribe(this.zipChanged.bind(this));
}

AddressViewModel.prototype.isLongEnough = function(zip) {
    return zip.toString().length === 5;
};

AddressViewModel.prototype.isValid = function(zip) {
    return !isNaN(Number(zip));
};

AddressViewModel.prototype.fetch = function(zip) {
    if ( !this.isValid(zip) ) {
        throw new Error("Invalid zip code");
    }

    return $.ajax({
        url: "http://www.geonames.org/postalCodeLookupJSON",
        data: {
            "postalcode": zip,
            "country": "us"
        },
        type: "GET",
        dataType: "JSONP"
    });
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

AddressViewModel.prototype.zipChanged = function(value) {
    if (this.isLongEnough(value)) {
        try {
            this.fetch(value).done(this.fetched.bind(this));
        }
        catch(e) {
            console.log("Invalid zip code: " + value);
        }
    }
};

AddressViewModel.prototype.clear = function() {
    ["zip", "city", "state", "county"].forEach(function(field) {
        this[field]("");
    }.bind(this));
};