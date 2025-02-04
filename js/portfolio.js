document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".portfolio-gallery");
  const filterButtons = document.querySelectorAll(".filter-buttons button");

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");

  let currentIndex = 0;
  let images = [];

  // Fetch and display images
  fetch("/data/portfolio.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load portfolio.json");
      }
      return response.json();
    })
    .then((data) => {
      images = data.images;

      images.forEach((image, index) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("portfolio-gallery__img");

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;
        img.setAttribute("data-category", image.category);
        img.setAttribute("data-index", index);
        img.setAttribute("loading", image.loading || "lazy"); // Apply lazy loading

        imgWrapper.appendChild(img);
        gallery.appendChild(imgWrapper);

        img.addEventListener("click", () => {
          openModal(index);
        });
      });

      // Add filter functionality
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");
          const allWrappers = gallery.querySelectorAll(
            ".portfolio-gallery__img"
          );

          allWrappers.forEach((wrapper) => {
            const img = wrapper.querySelector("img");
            if (
              filter === "all" ||
              img.getAttribute("data-category") === filter
            ) {
              wrapper.style.display = "";
            } else {
              wrapper.style.display = "none";
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });

  // Open modal
  function openModal(index) {
    currentIndex = index;
    modalImage.src = images[index].src;
    modalImage.alt = images[index].alt;
    modal.classList.add("open");
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("open");
  }

  // Show previous image
  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
  }

  // Show next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
  }

  // Event listeners
  modalClose.addEventListener("click", closeModal);
  leftArrow.addEventListener("click", showPreviousImage);
  rightArrow.addEventListener("click", showNextImage);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
    if (event.key === "ArrowLeft" && modal.classList.contains("open")) {
      showPreviousImage();
    }
    if (event.key === "ArrowRight" && modal.classList.contains("open")) {
      showNextImage();
    }
  });
});
