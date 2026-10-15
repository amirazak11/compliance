/* =========================================================
   intl-tel-input – initialises every .phone field on the page
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  if (!window.intlTelInput) return;

  document.querySelectorAll("input.phone").forEach(function (telInput) {
    // Phone numbers always read left-to-right. Without this the plugin sees the
    // page's dir="rtl" (Arabic) and pads the wrong side, so "+966" overlaps the number.
    telInput.setAttribute("dir", "ltr");

    const iti = window.intlTelInput(telInput, {
      initialCountry: "sa",
      countryOrder: ["sa", "ae", "qa", "om", "bh", "kw"],
      onlyCountries: [
        "dz", // Algeria
        "bh", // Bahrain
        "eg", // Egypt
        "iq", // Iraq
        "jo", // Jordan
        "kw", // Kuwait
        "lb", // Lebanon
        "ly", // Libya
        "ma", // Morocco
        "mr", // Mauritania
        "om", // Oman
        "ps", // Palestine
        "qa", // Qatar
        "sa", // Saudi Arabia
        "sd", // Sudan
        "sy", // Syria
        "tn", // Tunisia
        "ae", // United Arab Emirates
        "ye", // Yemen
        "so", // Somalia
        "dj", // Djibouti
        "km", // Comoros
      ],
      separateDialCode: true,
      formatOnDisplay: false, // keep prefilled values exactly as typed (edit-page change tracking)
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.10.10/build/js/utils.js"),
    });

    // Feed the result into native validation so Bootstrap's .invalid-feedback shows/hides.
    const validate = () => {
      const value = telInput.value.trim();
      const ok = !value ? !telInput.required : iti.isValidNumber() !== false;
      telInput.setCustomValidity(ok ? "" : "invalid");
      return ok;
    };

    telInput.addEventListener("blur", () => {
      validate();
      if (telInput.value.trim()) telInput.classList.toggle("is-invalid", !telInput.checkValidity());
    });
    telInput.addEventListener("input", () => {
      telInput.classList.remove("is-invalid");
      validate();
    });
    telInput.addEventListener("countrychange", validate);
    validate();
  });
});
