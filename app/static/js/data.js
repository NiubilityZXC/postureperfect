var correctSittingChart, reminderChart;
document.addEventListener("DOMContentLoaded", function () {
  function fetchData(interval = "day") {
    fetch(`/api/posture-data?interval=${interval}`)
      .then((response) => response.json())
      .then((data) => {
        if (correctSittingChart) {
          correctSittingChart.destroy();
        }
        if (reminderChart) {
          reminderChart.destroy();
        }
        var ctxCorrectSitting = document
          .getElementById("correctSittingChart")
          .getContext("2d");
        correctSittingChart = new Chart(ctxCorrectSitting, {
          type: "line",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Hours",
                data: data.correctSitting,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgb(75, 192, 192)",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        var ctxReminder = document
          .getElementById("reminderChart")
          .getContext("2d");
        reminderChart = new Chart(ctxReminder, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Reminders",
                data: data.reminders,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        document.getElementById(
          "usageTime"
        ).textContent = `${data.usageTime} hrs`;
        document.getElementById(
          "goodPosturePercentage"
        ).textContent = `${data.goodPosturePercentage}%`;
        document.getElementById("alerts").textContent = data.alerts;
      })
      .catch((error) => console.error("Error fetching posture data:", error));
  }
  fetchData("day");

  // Event listeners for interval buttons
  document
    .getElementById("day")
    .addEventListener("click", () => fetchData("day"));
  document
    .getElementById("week")
    .addEventListener("click", () => fetchData("week"));
  document
    .getElementById("month")
    .addEventListener("click", () => fetchData("month"));
});
