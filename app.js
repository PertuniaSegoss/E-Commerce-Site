function goToInstagram() {
  window.location.href =
    "https://www.instagram.com/redbillionforex__/profilecard/?igsh=MXFxYmk0YzFnNHQ0OQ==";
}
function goToTelegram() {
  window.location.href = "https://t.me/REDBILLIONFOREX746";
}
document.getElementById("sendEmail").addEventListener("click", function () {
  const email = "Redbillion67@gmail.com";
  const subject = "Your Subject";
  const body = "This is the body of the email.";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const anchor = document.createElement("a");
  anchor.href = mailtoLink;

  anchor.click();
});
