document.addEventListener("DOMContentLoaded", function () {
  var socket = io("http://127.0.0.1:5000");

  socket.on("connect", function () {
    console.log("Connected to the WebSocket server!");
  });

  socket.on("posture_data", function (wrappedData) {
    const data = JSON.parse(wrappedData.data); // 这里是关键改动
    console.log("Received data:", data);
    updateTable(data);
    assessShoulderTilt(data);
  });

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
    const mpu1AccelY = data.MPU1.Accel[1];
    const mpu2AccelY = data.MPU2.Accel[1];
    const tiltThreshold = 0.5;

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
