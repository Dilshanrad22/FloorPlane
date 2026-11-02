// Floor data comes from new_floor_planenew.pptx (room names and legends are as in the slides).
const floors = [
  {
    name: "1st Floor",
    subtitle: "Department of Information Technology",
    image: "assets/floor1.png",
    zones: [
      { name: "Level 2 & 4 Projects", color: "#5b9bd5", count: 2 },
      { name: "Historical Instrument", color: "#70ad47", count: 1 },
    ],
  },
  {
    name: "2nd Floor",
    subtitle: "Department of Computational Mathematics",
    image: "assets/floor2.png",
    zones: [
      { name: "Level 2 & 4 Projects", color: "#ffc000", count: 2 },
      { name: "Level 2 & 4 Projects (AI)", color: "#ff0000", count: 1 },
    ],
  },
  {
    name: "3rd Floor",
    subtitle: "Department of Interdisciplinary Studies",
    image: "assets/floor3.png",
    zones: [
      { name: "Game Zone", color: "#002060", count: 3 },
    ],
  },
  {
    name: "4th Floor",
    subtitle: "Auditorium & Labs Floor",
    image: "assets/floor4.png",
    zones: [
      { name: "Level 1 Project", color: "#bdd7ee", count: 2 },
      { name: "Company Stall", color: "#7030a0", count: 2 },
    ],
  },
];

const tabsEl = document.getElementById("tabs");
const nameEl = document.getElementById("floor-name");
const subEl = document.getElementById("floor-sub");
const imgEl = document.getElementById("plan-img");
const sideTitleEl = document.getElementById("side-title");
const sideCaptionEl = document.getElementById("side-caption");
const listEl = document.getElementById("zone-list");

const total = (floor) => floor.zones.reduce((sum, z) => sum + z.count, 0);

function render(index) {
  const floor = floors[index];

  tabsEl.querySelectorAll(".tab").forEach((tab, i) => {
    const active = i === index;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active);
  });

  nameEl.textContent = floor.name;
  subEl.textContent = floor.subtitle;
  imgEl.src = floor.image;
  imgEl.alt = `Floor plan - ${floor.name}`;

  sideTitleEl.textContent = `Zones on ${floor.name}`;
  sideCaptionEl.textContent = `${floor.zones.length} zones · ${total(floor)} stalls`;

  listEl.innerHTML = "";
  floor.zones.forEach((z) => {
    const li = document.createElement("li");
    li.innerHTML =
      `<span class="dot" style="background:${z.color}"></span>` +
      `<span class="zone-name"></span>` +
      `<span class="zone-count">${z.count}</span>`;
    li.querySelector(".zone-name").textContent = z.name;
    listEl.appendChild(li);
  });
}

floors.forEach((floor, i) => {
  const btn = document.createElement("button");
  btn.className = "tab";
  btn.setAttribute("role", "tab");
  btn.textContent = floor.name;
  btn.addEventListener("click", () => render(i));
  tabsEl.appendChild(btn);
});

document.getElementById("to-top").addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

render(0);

// Splash screen: shown once per browser session, click to skip.
const splash = document.getElementById("splash");
let seen = false;
try { seen = sessionStorage.getItem("splashSeen") === "1"; } catch (e) {}

function closeSplash() {
  splash.classList.add("hide");
  document.body.classList.remove("splashing");
  try { sessionStorage.setItem("splashSeen", "1"); } catch (e) {}
}

if (seen) {
  splash.remove();
  document.body.classList.remove("splashing");
} else {
  splash.addEventListener("click", closeSplash);
  setTimeout(closeSplash, 2800);
}
