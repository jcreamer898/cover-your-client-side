/*globals AddressViewModel*/

var FormViewModel = function() {
    this.address = new AddressViewModel();
};

ko.applyBindings(new FormViewModel());