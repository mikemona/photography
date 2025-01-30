document.addEventListener("DOMContentLoaded", function () {
  fetch("/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer.html");
      }
      return response.text();
    })
    .then((footerHtml) => {
      document.getElementById("footer").innerHTML = footerHtml;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});
