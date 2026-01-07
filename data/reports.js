const container = document.getElementById("reportsContainer");

// ---------------- LOAD ALL REPORTS ----------------
async function loadReports() {
  try {
    const res = await fetch("/api/reports");
    const reports = await res.json();
    renderReports(reports);
  } catch (err) {
    console.error("Failed to load reports:", err);
    container.innerHTML = "<p>Failed to load reports.</p>";
  }
}

// ---------------- RENDER REPORTS ARRAY ----------------
function renderReports(reports) {
  if (!reports || !reports.length) {
    container.innerHTML = "<p>No reports submitted yet.</p>";
    return;
  }

  container.innerHTML = reports
    .map(
      (r) => `
    <div class="report-card glass-card">
      <h3>${r.place}, ${r.state}</h3>
      <p><strong>Type:</strong> ${r.problemType}</p>
      <p><strong>Description:</strong> ${r.description}</p>
      <p><strong>Date of Incident:</strong> ${r.incidentDate}</p>
      <p><strong>Severity:</strong> ${r.severity}</p>
      <p><em>Reported At: ${new Date(r.reportedAt).toLocaleString()}</em></p>
      <p><strong>Coordinates:</strong> ${r.coordinates.lat}, ${r.coordinates.lng}</p>
    </div>
  `
    )
    .join("");
}

// ---------------- ADD SINGLE REPORT DYNAMICALLY ----------------
function addReport(report) {
  if (!report) return;

  // Insert newest report at top
  const html = `
    <div class="report-card glass-card">
      <h3>${report.place}, ${report.state}</h3>
      <p><strong>Type:</strong> ${report.problemType}</p>
      <p><strong>Description:</strong> ${report.description}</p>
      <p><strong>Date of Incident:</strong> ${report.incidentDate}</p>
      <p><strong>Severity:</strong> ${report.severity}</p>
      <p><em>Reported At: ${new Date(report.reportedAt).toLocaleString()}</em></p>
      <p><strong>Coordinates:</strong> ${report.coordinates.lat}, ${report.coordinates.lng}</p>
    </div>
  `;
  container.insertAdjacentHTML("afterbegin", html);
}

// ---------------- INITIAL LOAD ----------------
loadReports();