document.addEventListener("DOMContentLoaded", function () {
  var socket = io("http://127.0.0.1:5000");

  socket.on("connect", function () {
    console.log("Connected to the WebSocket server!");
  });

  socket.on(function (wrappedData) {
    const data = wrappedData.data; // 这里是关键改动
    console.log("Received data:", data);
    const sensorData = parseSensorData(message);
    updateTable(sensorData);
    updateStatus(sensorData.Posture.toLowerCase());
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

  function updateStatus(status) {
    const statusDiv = document.getElementById("status");
    const statusText = status === "normal" ? "😀 Normal" : "🙅 Error";
    if (status === "Tilted") {
      statusDiv.className = "alert alert-warning";
      statusDiv.textContent = statusText;
    } else {
      statusDiv.className = "alert alert-success";
      statusDiv.textContent = statusText;
    }
  }
});

function parseSensorData(sensorString) {
  const regex =
    /MPU1 Accel: \(([^)]+)\), Gyro: \(([^)]+)\), Temp: ([^;]+); MPU2 Accel: \(([^)]+)\), Gyro: \(([^)]+)\), Temp: ([^;]+); Posture: (\w+)/;
  const match = sensorString.match(regex);
  if (match && match.length === 8) {
    const mpu1Accel = match[1].split(", ").map(Number);
    const mpu1Gyro = match[2].split(", ").map(Number);
    const mpu1Temp = parseFloat(match[3]);
    const mpu2Accel = match[4].split(", ").map(Number);
    const mpu2Gyro = match[5].split(", ").map(Number);
    const mpu2Temp = parseFloat(match[6]);
    const posture = match[7]; // 获取姿势状态

    return {
      MPU1: { Accel: mpu1Accel, Gyro: mpu1Gyro, Temp: mpu1Temp },
      MPU2: { Accel: mpu2Accel, Gyro: mpu2Gyro, Temp: mpu2Temp },
      Posture: posture,
    };
  }
  return null;
}
