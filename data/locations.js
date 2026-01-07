document.addEventListener("DOMContentLoaded", () => {
  const locationsGrid = document.getElementById("locationsGrid");

  if (!locationsGrid) {
    console.error("❌ locationsGrid not found");
    return;
  }

  // Fetch JSON from assets
  fetch("../assets/locations.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load JSON");
      return res.json();
    })
    .then(data => {
      // Sort locations alphabetically by name
      data.sort((a, b) => a.name.localeCompare(b.name));

      // Clear grid
      locationsGrid.innerHTML = "";

      // Render each location
      data.forEach(loc => {
        const card = document.createElement("div");
        card.className = "location-card";
        card.style.backgroundImage = `url(${loc.image})`;

        card.innerHTML = `
          <div class="card-overlay">
            <h3>${loc.name}</h3>
            <p>${loc.city}, ${loc.state}</p>
            <span class="risk ${loc.riskLevel.toLowerCase()}">
              Risk: ${loc.riskLevel}
            </span>
          </div>
        `;

        // Show modal on click
        card.addEventListener("click", () => showLocationDetails(loc));
        locationsGrid.appendChild(card);
      });
    })
    .catch(err => console.error("❌ JSON fetch error:", err));
});

// -----------------------
// Show location details in modal
function showLocationDetails(loc) {
  let modal = document.getElementById("locationModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "locationModal";
    modal.className = "modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${loc.name}</h2>
      <img src="${loc.image}" alt="${loc.name}">
      <p><strong>City:</strong> ${loc.city}, ${loc.state}</p>
      <p><strong>Risk Level:</strong> <span class="risk ${loc.riskLevel.toLowerCase()}">${loc.riskLevel}</span></p>
      <p><strong>Issues Reported:</strong> ${loc.issuesReported && loc.issuesReported.length ? loc.issuesReported.join(", ") : "None"}</p>
      <p><strong>Sources:</strong> ${loc.sources && loc.sources.length ? loc.sources.join(", ") : "Unknown"}</p>
      <p><strong>Last Verified:</strong> ${loc.lastVerified || "N/A"}</p>
    </div>
  `;

 requestAnimationFrame(() => {
  modal.style.display = "flex";
});

  // Close button
  modal.querySelector(".close").onclick = () => modal.style.display = "none";

  // Close if clicked outside content
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}


