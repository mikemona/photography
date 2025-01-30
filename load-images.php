<?php
// The folder where your images are stored
$folderPath = 'img/portfolio/';

// Get all the .jpg files in the folder
$images = glob($folderPath . "*.jpg");

if ($images) {
  // Loop through each image and create an <img> tag
  foreach ($images as $image) {
    $imagePath = basename($image); // Get the image name (without folder path)
    echo "<img src='/img/portfolio/{$imagePath}' alt='Portfolio Image'>";
  }
} else {
  echo "No images found.";
}
?>
