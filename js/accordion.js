document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-item__header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".fa-angle-down");

      // Close all other accordions
      accordionHeaders.forEach((otherHeader) => {
        const otherContent = otherHeader.nextElementSibling;
        const otherIcon = otherHeader.querySelector(".fa-angle-down");

        if (otherHeader !== this) {
          otherContent.style.maxHeight = null;
          otherIcon.classList.remove("rotate");
          otherHeader.classList.remove("active");
        }
      });

      // Toggle current accordion
      if (content.style.maxHeight) {
        content.style.maxHeight = null; // Close
        icon.classList.remove("rotate");
        this.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Open
        icon.classList.add("rotate");
        this.classList.add("active");
      }
    });
  });
});
