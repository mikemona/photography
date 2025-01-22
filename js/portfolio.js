document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".portfolio-gallery");

  // Fetch images from the PHP file
  fetch("load-images.php")
    .then((response) => response.text()) // Get the image HTML returned by PHP
    .then((data) => {
      gallery.innerHTML = data; // Insert the images into the gallery
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
});
