const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

const RECIPIENT = "yerimahlimnyuy695@gmail.com";

const rules = {
    name: (value) =>
        value.trim().length >= 2
            ? ""
            : "Name must contain at least 2 characters.",

    email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
            ? ""
            : "Please enter a valid email address.",

    message: (value) =>
        value.trim().length >= 10
            ? ""
            : "Message must contain at least 10 characters."
};


function validateField(field) {

    const errorMessage = rules[field.name](field.value);

    const errorElement = document.getElementById(
        field.name + "Error"
    );

    errorElement.textContent = errorMessage;

    field.setAttribute(
        "aria-invalid",
        String(Boolean(errorMessage))
    );

    return !errorMessage;
}

Object.keys(rules).forEach((fieldName) => {

    const field = form.elements.namedItem(fieldName);

    field.addEventListener("input", () => {

        if (field.hasAttribute("aria-invalid")) {
            validateField(field);
        }

        status.textContent = "";

    });

});

form.addEventListener("submit", (event) => {

    event.preventDefault();

    status.textContent = "";

    const fields = Object.keys(rules).map(
        (name) => form.elements.namedItem(name)
    );

    const results = fields.map(validateField);

    if (results.includes(false)) {

        const firstInvalidField = fields.find(
            (field) => field.getAttribute("aria-invalid") === "true"
        );

        firstInvalidField.focus();

        status.textContent = "Please correct the highlighted errors.";

        return;
    }

    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const message = form.elements.namedItem("message").value.trim();

    const subject = encodeURIComponent(
        "Portfolio message from " + name
    );

    const body = encodeURIComponent(
        message + "\n\nReply to: " + email
    );

    const mailtoLink =
        "mailto:" + RECIPIENT +
        "?subject=" + subject +
        "&body=" + body;

    window.location.href = mailtoLink;

    status.textContent =
        "Your email application is opening with your message.";

    form.reset();

    fields.forEach((field) => {
        field.removeAttribute("aria-invalid");
    });

});


document.getElementById("year").textContent = new Date().getFullYear();
