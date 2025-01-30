fetch("../data/songs.json")
  .then((response) => response.json())
  .then((songs) => {
    const songListDiv = document.getElementById("songList");

    // Create a table element
    const table = document.createElement("table");
    table.classList.add("table");

    songs.forEach((song, index) => {
      const row = document.createElement("tr");
      row.classList.add("table__row");
      row.dataset.index = index; // Attach the index to the row for easy access

      // Image cell
      const imageCell = document.createElement("td");
      imageCell.classList.add("table__image");
      imageCell.innerHTML = `
        <img src="./img/covers/${song.cover}" alt="${song.title} Cover" />
      `;
      row.appendChild(imageCell);

      // Title cell
      const titleCell = document.createElement("td");
      titleCell.classList.add("table__title");
      const formattedPlays = Number(song.plays).toLocaleString();
      titleCell.innerHTML = `
        <div class="table__title-content">
          <div class="table__title-title">${song.title}</div>
          <div class="table__title-subtitle">${formattedPlays} plays</div>
        </div>
      `;
      row.appendChild(titleCell);

      // Action cell
      const actionCell = document.createElement("td");
      actionCell.classList.add("table__action");
      actionCell.innerHTML = `
        <button class="btn btn-link">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      `;
      row.appendChild(actionCell);

      // Add click event to the row
      row.addEventListener("click", () => {
        showCard(song);
      });

      table.appendChild(row);
    });

    // Append the table to the songListDiv
    songListDiv.appendChild(table);
  })
  .catch((error) => console.error("Error loading songs:", error));

// Function to show the card
function showCard(song) {
  // Check if the card already exists
  let card = document.querySelector(".card-song");
  if (!card) {
    // Create the card if it doesn't exist
    card = document.createElement("div");
    card.classList.add("card-song");
    document.body.appendChild(card);
  }

  // Populate the card with song details and progress bar
  card.innerHTML = `
    <div class="card-song__content">
      <div class="card-song__image">
        <img src="./img/covers/${song.cover}" alt="${song.title} Cover" />
      </div>
      <div class="card-song__details">
        <div class="card-song__title">${song.title}</div>
        <div class="card-song__subtitle">${song.artist}</div>
      </div>
      <button class="btn btn-link play-pause-btn">
        <i class="fa-solid fa-pause"></i>
      </button>
    </div>
    <div class="card-song__progress-container">
      <div class="card-song__progress-bar"></div>
    </div>
  `;

  // Make the card visible
  card.classList.add("visible");

  // Adjust the profile margin-bottom
  const profile = document.querySelector(".profile");
  if (profile) {
    profile.style.marginBottom = "150px";
  }

  // Initialize play/pause button and progress bar
  const progressBar = card.querySelector(".card-song__progress-bar");
  const playPauseBtn = card.querySelector(".play-pause-btn i");
  let progress = 0;
  let isPlaying = true;
  let interval;

  function startProgress() {
    interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);

        // Reset progress and playback state
        progress = 0;
        progressBar.style.width = `${progress}%`;
        isPlaying = false;

        // Update play/pause button to show play icon
        playPauseBtn.classList.remove("fa-pause");
        playPauseBtn.classList.add("fa-play");

        // Sync modal play/pause button if open
        const modal = document.getElementById("songPlaying");
        if (modal && modal.classList.contains("open")) {
          const drawerPlayPauseIcon = modal.querySelector(
            ".drawer-body__song-actions .play-pause-btn i"
          );
          if (drawerPlayPauseIcon) {
            drawerPlayPauseIcon.className = "fa-solid fa-play";
          }
        }
      } else {
        progress += 1;
        progressBar.style.width = `${progress}%`;

        // Update drawer progress bar if open
        const modal = document.getElementById("songPlaying");
        if (modal && modal.classList.contains("open")) {
          const drawerProgress = modal.querySelector(
            ".drawer-body__song-progress input"
          );
          if (drawerProgress) {
            drawerProgress.value = progress;
          }
        }
      }
    }, 100);
  }

  function pauseProgress() {
    clearInterval(interval);
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseProgress();
      playPauseBtn.classList.remove("fa-pause");
      playPauseBtn.classList.add("fa-play");
    } else {
      startProgress();
      playPauseBtn.classList.remove("fa-play");
      playPauseBtn.classList.add("fa-pause");
    }
    isPlaying = !isPlaying;
  }

  // Add event listener for the play/pause button
  const playPauseButton = card.querySelector(".play-pause-btn");
  playPauseButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click from propagating to the card
    togglePlayPause();
  });

  // Add click event to open the modal
  card.addEventListener("click", () => {
    const modal = document.getElementById("songPlaying");
    if (modal) {
      modal.classList.add("open"); // Add your modal open class

      // Populate modal with song details
      const drawerHeaderTitle = modal.querySelector(".drawer-header__title");
      const drawerBody = modal.querySelector(".drawer-body");

      if (drawerHeaderTitle) {
        drawerHeaderTitle.textContent = song.artist; // Replace title with artist name
      }

      if (drawerBody) {
        drawerBody.innerHTML = `
          <div class="drawer-body__song">
            <div class="drawer-body__song-cover">
              <img src="./img/covers/${song.cover}" alt="${song.title} Cover" />
            </div>
            <div class="drawer-body__song-details">
              <div class="drawer-body__song-title">${song.title}</div>
              <div class="drawer-body__song-artist">${song.artist}</div>
            </div>
            <div class="drawer-body__song-progress">
              <input type="range" min="0" max="100" value="${progress}">
            </div>
            <div class="drawer-body__song-actions">
              <button class="btn btn-link shuffle-btn"><i class="fa-solid fa-shuffle"></i></button>
              <button class="btn btn-link restart-btn"><i class="fa-solid fa-backward-step"></i></button>
              <button class="btn btn-link play-pause-btn">
                <i class="fa-solid ${isPlaying ? "fa-pause" : "fa-play"}"></i>
              </button>
              <button class="btn btn-link next-btn"><i class="fa-solid fa-forward-step"></i></button>
              <button class="btn btn-link loop-btn"><i class="fa-solid fa-repeat"></i></button>
            </div>
          </div>
        `;

        // Add play/pause functionality in the drawer
        const drawerPlayPauseButton = modal.querySelector(
          ".drawer-body__song-actions .play-pause-btn"
        );
        if (drawerPlayPauseButton) {
          drawerPlayPauseButton.addEventListener("click", () => {
            togglePlayPause();

            // Sync drawer play/pause icon
            const drawerPlayPauseIcon =
              drawerPlayPauseButton.querySelector("i");
            drawerPlayPauseIcon.className = `fa-solid ${
              isPlaying ? "fa-pause" : "fa-play"
            }`;
          });
        }
      }
    }
  });

  startProgress();
}
