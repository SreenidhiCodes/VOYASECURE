document.addEventListener("DOMContentLoaded", () => {

  const reportForm = document.getElementById("reportForm");

  // ---------------- SEVERITY LOGIC ----------------
  const severityMap = {
    "Scam / Fraud": "High",
    "Money Laundering": "High",
    "Theft": "Medium",
    "Harassment": "Medium",
    "Safety Risk": "High",
    "Other": "Low"
  };

  const problemSelect = document.getElementById("problemType");
  const severityInput = document.getElementById("severity");
  const otherInput = document.getElementById("otherProblem");

  problemSelect.addEventListener("change", () => {
    const value = problemSelect.value;
    severityInput.value = severityMap[value] || "Low";
    otherInput.style.display = value === "Other" ? "block" : "none";
  });

  // ---------------- FORM SUBMISSION ----------------
  reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const place = document.getElementById("place").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();
    const lat = document.getElementById("lat").value.trim();
    const lng = document.getElementById("lng").value.trim();
    const problemTypeSelect = problemSelect.value;
    const description = document.getElementById("description").value.trim();
    const incidentDate = document.getElementById("incidentDate").value;
    const severity = severityInput.value;

    // Validate required fields
    if (!place || !state || !lat || !lng || !problemTypeSelect || !description || !incidentDate) {
      alert("❌ Fill all required fields and select a location on the map.");
      return;
    }

    // Determine actual problem type (handle "Other")
    let problemType = problemTypeSelect;
    if (problemTypeSelect === "Other") {
      const otherValue = otherInput.value.trim();
      if (!otherValue) {
        alert("❌ Please specify the problem in 'Other'");
        return;
      }
      problemType = otherValue;
    }

    const formData = {
      place,
      state,
      country,
      coordinates: { lat, lng },
      problemType,
      description,
      incidentDate,
      severity
    };

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();

      if (data.success) {
        alert("✅ Report submitted successfully!");

        // Reset form fields
        reportForm.reset();
        document.getElementById("lat").value = "";
        document.getElementById("lng").value = "";
        document.getElementById("coordinates").value = "";
        severityInput.value = "";

        // ---------------- Optional: dynamically add report if reports page open ----------------
        if (typeof addReport === "function") {
          formData.reportedAt = new Date().toISOString(); // add timestamp
          addReport(formData);
        }

        // ---------------- Optional redirect to reported page ----------------
        // window.location.href = "/reported";

      } else {
        console.error("Failed to save report:", data);
        alert("❌ Failed to submit report. Try again.");
      }

    } catch (err) {
      console.error("Network/server error:", err);
      alert("❌ Network or server error. Open the page via Flask (http://127.0.0.1:5000/report)");
    }

  });

});