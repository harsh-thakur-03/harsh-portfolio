const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const scene = document.querySelector("#scene");
const sceneWrap = document.querySelector(".scene-wrap");

let dragging = false;
let lastX = 0;
let lastY = 0;
let rotX = -20;
let rotY = -32;

function paintScene() {
  scene.style.animation = "none";
  scene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

sceneWrap.addEventListener("pointerdown", (event) => {
  dragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
  sceneWrap.setPointerCapture(event.pointerId);
});

sceneWrap.addEventListener("pointermove", (event) => {
  if (dragging) {
    rotY += (event.clientX - lastX) * 0.55;
    rotX -= (event.clientY - lastY) * 0.45;
    rotX = Math.max(-65, Math.min(65, rotX));
    lastX = event.clientX;
    lastY = event.clientY;
    paintScene();
  } else if (matchMedia("(hover: hover)").matches) {
    const rect = sceneWrap.getBoundingClientRect();
    rotY = -32 + (event.clientX - rect.left - rect.width / 2) / rect.width * 36;
    rotX = -20 - (event.clientY - rect.top - rect.height / 2) / rect.height * 28;
    paintScene();
  }
});

sceneWrap.addEventListener("pointerup", () => {
  dragging = false;
});

sceneWrap.addEventListener("pointerleave", () => {
  if (!dragging) {
    scene.style.animation = "";
    scene.style.transform = "";
  }
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!matchMedia("(hover: hover)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(850px) rotateX(${-y * 5}deg) ` +
      `rotateY(${x * 6}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});