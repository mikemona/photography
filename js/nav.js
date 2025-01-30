function loadNav() {
  const isTabletOrSmaller = window.innerWidth <= 768; // Define tablet size threshold

  // Define the navigation for larger screens
  const desktopNavHTML = `
    <div class="nav">
      <a href="home.html" class="btn nav-link" data-name="home">Home</a>
      <a href="portfolio.html" class="btn nav-link" data-name="portfolio">Portfolio</a>
      <a href="details.html" class="btn nav-link" data-name="details">Details</a>
      <a href="home.html" class="btn nav-link-title">Mike Mona</a>
      <a href="about.html" class="btn nav-link" data-name="about">About</a>
      <a href="information.html" class="btn nav-link" data-name="information">Information</a>
      <a href="contact.html" class="btn nav-link" data-name="contact">Contact</a>
    </div>
    <button class="nav__toggle" id="openDrawer">☰</button>
    <div class="drawer-overlay" id="navDrawer">
      <div class="drawer drawer--nav" id="drawer">
        <div class="drawer-header">
          <a href="home.html" class="drawer-header__title">Mike Mona Photography</a>
          <button class="drawer-header__close" data-drawer-close>&times;</button>
        </div>
        <div class="drawer-body">
          <a href="home.html" class="btn nav-link" data-name="home">Home</a>
          <a href="portfolio.html" class="btn nav-link" data-name="portfolio">Portfolio</a>
          <a href="details.html" class="btn nav-link" data-name="details">Details</a>
          <a href="about.html" class="btn nav-link" data-name="about">About</a>
          <a href="information.html" class="btn nav-link" data-name="information">Information</a>
          <a href="contact.html" class="btn nav-link" data-name="contact">Contact</a>
        </div>
      </div>
    </div>
  `;

  // Define the navigation for smaller screens (mobile)
  const mobileNavHTML = `
    <div class="nav-mobile">
      <a href="home.html" class="nav-link-logo"><img src="../img/Logo/logo-dark.svg"></img></a>
      <button class="nav-mobile__toggle" id="openDrawer">☰</button>
    </div>
    <div class="drawer-overlay" id="navDrawer">
      <div class="drawer drawer--nav" id="drawer">
        <div class="drawer-header">
          <a href="home.html" class="drawer-header__title">Mike Mona Photography</a>
          <button class="drawer-header__close" data-drawer-close>&times;</button>
        </div>
        <div class="drawer-body">
          <a href="home.html" class="btn nav-link" data-name="home">Home</a>
          <a href="portfolio.html" class="btn nav-link" data-name="portfolio">Portfolio</a>
          <a href="details.html" class="btn nav-link" data-name="details">Details</a>
          <a href="about.html" class="btn nav-link" data-name="about">About</a>
          <a href="information.html" class="btn nav-link" data-name="information">Information</a>
          <a href="contact.html" class="btn nav-link" data-name="contact">Contact</a>
        </div>
      </div>
    </div>
  `;

  const navHTML = isTabletOrSmaller ? mobileNavHTML : desktopNavHTML; // Choose nav based on screen size

  const navContainers = document.querySelectorAll(".nav-container");

  navContainers.forEach((navContainer) => {
    navContainer.innerHTML = navHTML;
    setActiveNavLink(navContainer.id); // Set active link based on the container ID

    const menuButton = navContainer.querySelector("#openDrawer");
    const drawerOverlay = navContainer.querySelector("#navDrawer");
    const drawer = navContainer.querySelector("#drawer");
    const closeDrawerButtons = drawer?.querySelectorAll("[data-drawer-close]");

    if (menuButton && drawerOverlay && drawer) {
      // Open the drawer when the menu button is clicked
      menuButton.addEventListener("click", () => {
        drawerOverlay.classList.add("open");
        drawer.classList.add("open");
      });

      // Close the drawer when any close button is clicked
      closeDrawerButtons?.forEach((button) => {
        button.addEventListener("click", () => {
          drawerOverlay.classList.remove("open");
          drawer.classList.remove("open");
        });
      });

      // Close the drawer by clicking outside of it
      drawerOverlay.addEventListener("click", (event) => {
        if (event.target === drawerOverlay) {
          drawerOverlay.classList.remove("open");
          drawer.classList.remove("open");
        }
      });
    }
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

// Reload navigation on window resize
function handleResize() {
  loadNav(); // Reload the nav to reflect the current screen size
}

// Initial load of navigation on page load
document.addEventListener("DOMContentLoaded", loadNav);

// Listen for window resize and reload the navigation
window.addEventListener("resize", handleResize);

function handleScroll() {
  const nav = document.querySelector(".nav");
  const navLogo = document.querySelector(".nav-link-logo");
  const menuButton = document.querySelector(".nav__toggle");
  const scrollPosition = window.scrollY;
  const maxScroll = 200;

  let opacity = 1 - scrollPosition / maxScroll;
  opacity = Math.max(opacity, 0);

  if (navLogo) {
    navLogo.style.opacity = opacity;
  }

  if (nav) {
    nav.style.opacity = opacity;

    if (opacity === 0 && menuButton) {
      menuButton.style.display = "block"; // Show menu button when nav fades
    } else if (menuButton) {
      menuButton.style.display = "none"; // Hide menu button when nav is visible
    }
  }
}

// Add the scroll event listener
window.addEventListener("scroll", handleScroll);
