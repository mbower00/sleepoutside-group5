async function loadAlerts() {
  try {
    const response = await fetch("../json/alerts.json");
    const alerts = await response.json();

    if (alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      alerts.forEach((alert) => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertSection.appendChild(alertElement);
      });

      const mainElement = document.querySelector("main");

      mainElement.prepend(alertSection);
    }
  } catch (error) {
    console.error("Error loading alerts:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadAlerts);
