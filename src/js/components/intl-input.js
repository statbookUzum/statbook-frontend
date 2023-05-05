import intlTelInput from 'intl-tel-input';

const input = document.querySelector(".fast-form__input-phone");

if (input) {
  intlTelInput(input, {
    initialCountry: "auto",
    separateDialCode: true,
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then(function (res) { return res.json(); })
        .then(function (data) { callback(data.country_code); })
        .catch(function () { callback("us"); });
    }
  })
}
