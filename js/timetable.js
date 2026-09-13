const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const keys = ["fajr", "shuruq", "dhuhr", "asr", "maghrib", "isha"];
const labels = ["Day", "Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const phoenixDate = () => Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: "America/Phoenix", month: "long", day: "numeric" }).formatToParts(new Date()).map(({ type, value }) => [type, value]));

function render(schedule, month) {
  const table = document.getElementById("monthly-times");
  table.replaceChildren();
  const header = document.createElement("div");
  header.className = "monthly-row monthly-header";
  labels.forEach((label) => { const cell = document.createElement("span"); cell.textContent = label; header.append(cell); });
  table.append(header);
  const today = phoenixDate();
  (schedule[month] || []).forEach((day) => {
    const row = document.createElement("div");
    row.className = "monthly-row";
    if (month === today.month && Number(day.day) === Number(today.day)) row.classList.add("is-today");
    [day.day, ...keys.map((key) => day[key])].forEach((value) => { const cell = document.createElement("span"); cell.textContent = value; row.append(cell); });
    table.append(row);
  });
}

fetch("files/adhan-schedule.json").then((response) => response.json()).then((schedule) => {
  const select = document.getElementById("month-select");
  months.forEach((month) => { const option = document.createElement("option"); option.value = month; option.textContent = month; select.append(option); });
  select.value = phoenixDate().month;
  render(schedule, select.value);
  select.addEventListener("change", () => render(schedule, select.value));
}).catch(() => { document.getElementById("monthly-times").textContent = "The timetable is temporarily unavailable."; });
