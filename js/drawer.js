document.addEventListener("DOMContentLoaded", function () {
  // Open drawer
  document.querySelectorAll("[data-drawer-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const drawerId = button.getAttribute("data-drawer-target");
      const drawerOverlay = document.getElementById(drawerId);
      if (drawerOverlay) {
        drawerOverlay.classList.add("open");
      }
    });
  });

  // Close drawer
  document.querySelectorAll("[data-drawer-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const drawerOverlay = button.closest(".drawer-overlay");
      if (drawerOverlay) {
        drawerOverlay.classList.remove("open");
      }
    });
  });
});
