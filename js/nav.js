function loadNav() {
  const navHTML = `
    <div class="nav">
      <a
        href="home.html"
        class="btn nav-link"
        data-name="home"
        >Home</a>
      <a
        href="portfolio.html"
        class="btn nav-link"
        data-name="portfolio"
        >Portfolio</a>
      <a
        href="details.html"
        class="btn nav-link"
        data-name="details"
        >Details</a>
      <a
        href="home.html"
        class="btn nav-link-title"
        >Mike Mona
      </a>
      <a
        href="about.html"
        class="btn nav-link"
        data-name="about"
        >About</a>
      <a
        href="information.html"
        class="btn nav-link"
        data-name="information"
        >Information</a>
      <a
        href="contact.html"
        class="btn nav-link"
        data-name="contact"
        >Contact</a>
    </div>
  `;

  const navContainers = document.querySelectorAll(".nav-container");

  navContainers.forEach((navContainer) => {
    navContainer.innerHTML = navHTML;
    setActiveNavLink(navContainer.id); // Set active link based on the container ID
  });
}

function setActiveNavLink(pageId) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkName = link.getAttribute("data-name");

    if (linkName === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Load navigation on page load
document.addEventListener("DOMContentLoaded", loadNav);
