document.addEventListener("DOMContentLoaded", function () {
  let scheduleData = JSON.parse(localStorage.getItem("scheduleData")) || [
    {
      id: 1,
      name: "Йога",
      time: "10:00 - 11:00",
      maxParticipants: 15,
      currentParticipants: 8,
    },
    {
      id: 2,
      name: "Пилатес",
      time: "11:30 - 12:30",
      maxParticipants: 10,
      currentParticipants: 5,
    },
    {
      id: 3,
      name: "Кроссфит",
      time: "13:00 - 14:00",
      maxParticipants: 20,
      currentParticipants: 15,
    },
    {
      id: 4,
      name: "Танцы",
      time: "14:30 - 15:30",
      maxParticipants: 12,
      currentParticipants: 10,
    },
    {
      id: 5,
      name: "Бокс",
      time: "16:00 - 17:00",
      maxParticipants: 8,
      currentParticipants: 6,
    },
  ];

  const scheduleTable = document.getElementById("schedule");

  function renderSchedule() {
    scheduleTable.innerHTML = "";
    scheduleTable.innerHTML = `
        <td>Занятие</td>
        <td>Время</td>
        <td>Кол-во мест</td>
        <td>Кол-во записавшихся</td>`;
    scheduleData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>${item.maxParticipants}</td>
                <td>${item.currentParticipants}</td>
                <td>
                    <button data-id="${item.id}" class="join-btn">Записаться</button>
                    <button data-id="${item.id}" class="cancel-btn">Отменить запись</button>
                </td>
            `;

      const joinBtn = row.querySelector(".join-btn");
      const cancelBtn = row.querySelector(".cancel-btn");

      if (
        item.currentParticipants >= item.maxParticipants ||
        isUserJoined(item.id)
      ) {
        joinBtn.disabled = true;
      } else {
        cancelBtn.disabled = true;
      }

      scheduleTable.appendChild(row);
    });
  }

  function isUserJoined(id) {
    const userSchedule = JSON.parse(localStorage.getItem("userSchedule")) || [];
    return userSchedule.includes(id);
  }

  scheduleTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("join-btn")) {
      const id = parseInt(event.target.getAttribute("data-id"));
      const selectedItem = scheduleData.find((item) => item.id === id);
      if (selectedItem.currentParticipants < selectedItem.maxParticipants) {
        selectedItem.currentParticipants++;
        const userSchedule =
          JSON.parse(localStorage.getItem("userSchedule")) || [];
        userSchedule.push(id);
        localStorage.setItem("userSchedule", JSON.stringify(userSchedule));
        localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
        renderSchedule();
      }
    }
  });

  scheduleTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel-btn")) {
      const id = parseInt(event.target.getAttribute("data-id"));
      const selectedItem = scheduleData.find((item) => item.id === id);
      if (isUserJoined(id)) {
        selectedItem.currentParticipants--;
        const userSchedule =
          JSON.parse(localStorage.getItem("userSchedule")) || [];
        const index = userSchedule.indexOf(id);
        if (index !== -1) {
          userSchedule.splice(index, 1);
        }
        localStorage.setItem("userSchedule", JSON.stringify(userSchedule));
        localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
        renderSchedule();
      }
    }
  });

  renderSchedule();
});
