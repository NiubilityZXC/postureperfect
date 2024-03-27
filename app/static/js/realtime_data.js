document.addEventListener("DOMContentLoaded", function () {
  const ws = new WebSocket("ws://localhost:8081");

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("Received data:", data);
    updateTable(data);
    assessShoulderTilt(data);
  };

  ws.onerror = function (error) {
    console.log("WebSocket Error:", error);
  };

  function updateTable(data) {
    const dataTableBody = document.getElementById("data-table-body");
    const newRow = document.createElement("tr");
    Object.values(data).forEach((sensor) => {
      sensor.Accel.concat(sensor.Gyro).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = parseFloat(value).toFixed(2);
        newRow.appendChild(cell);
      });
    });
    const timeCell = document.createElement("td");
    timeCell.textContent = new Date().toLocaleTimeString();
    newRow.prepend(timeCell);
    dataTableBody.appendChild(newRow);
    while (dataTableBody.rows.length > 10) {
      dataTableBody.deleteRow(0);
    }
  }

  function assessShoulderTilt(data) {
    // Simple logic to determine shoulder tilt
    // Assumes data structure where Accel Y is at index 1
    const mpu1AccelY = data.MPU1.Accel[1];
    const mpu2AccelY = data.MPU2.Accel[1];
    const tiltThreshold = 0.5; // Customize based on calibration and testing

    if (Math.abs(mpu1AccelY - mpu2AccelY) > tiltThreshold) {
      updateStatus("Tilted");
    } else {
      updateStatus("Normal");
    }
  }

  function updateStatus(status) {
    const statusDiv = document.getElementById("status");
    if (status === "Tilted") {
      statusDiv.className = "alert alert-warning";
      statusDiv.textContent = "Status: Shoulders Tilted";
    } else {
      statusDiv.className = "alert alert-success";
      statusDiv.textContent = "Status: Normal";
    }
  }
});
