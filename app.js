// CONFIGURATION
const PASSWORD = "15042025"; // The password format DDMMYYYY
const START_DATE = new Date("2025-04-15"); // Format YYYY-MM-DD

// CONTENT DATA (IMAGES ONLY - Videos removed per request)
const momentsData = [
    { type: "image", src: "assets/images/img1.jpg", text: "This is my beautiful Woman." },
    { type: "image", src: "assets/images/img2.jpg", text: "Someday you will wear my ring." },
    // Replaced video placeholders with images. ensure you have img3, img4, img5 or reuse existing ones
    { type: "image", src: "assets/images/img3.jpg", text: "Your smile is my favorite gift." },
    { type: "image", src: "assets/images/img4.jpg", text: "my love for you is'nt fake" },
    { type: "image", src: "assets/images/img.jpg", text: "Captured moments of pure joy." },
    { type: "video", src: "assets/video/vid3.mp4", text: "Your love , smiles and happiness is all I ever want." }
];

let visits = Number(localStorage.getItem("visits") || 0) + 1;
localStorage.setItem("visits", visits);

const welcomeText = "Hi my love.\nThis space exists because of you.";

// Typing Effect Function
function typeText(el, text, i = 0) {
    if (i < text.length) {
        if (text.charAt(i) === "\n") {
            el.innerHTML += "<br>";
        } else {
            el.textContent += text.charAt(i);
        }
        setTimeout(() => typeText(el, text, i + 1), 50);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeText(document.getElementById("typingText"), welcomeText);
});

// Start Experience
function startExperience() {
    const music = document.getElementById("bgMusic");
    music.volume = 0.4;
    music.play().catch(e => console.log("Audio play failed:", e));

    switchScreen("welcome", "lock");
}

// Unlock Logic
function unlock() {
    const input = document.getElementById("passInput").value;

    if (input === PASSWORD) {
        switchScreen("lock", "vault");
        loadMoments();
        timeAwareMessage();
        checkSealedLetter();
    } else {
        const err = document.getElementById("error");
        err.textContent = "One more try my love. Try again.";
        err.style.animation = "shake 0.3s";
        setTimeout(() => err.style.animation = "", 300);
    }
}

// Screen Switcher
function switchScreen(from, to) {
    document.getElementById(from).classList.remove("active");
    window.scrollTo(0, 0);
    document.getElementById(to).classList.add("active");
}

// Load Images Only/ vids
function loadMoments() {
    const container = document.getElementById("moments");
    container.innerHTML = ""; // Clear previous content

    momentsData.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "moment";
        // Stagger the animation so they pop up one by one
        div.style.animationDelay = `${i * 0.3}s`;

        // 🟢 IF IT IS AN IMAGE:
        if (m.type === "image") {
            div.innerHTML = `
                <img src="${m.src}" alt="Memory" loading="lazy">
                <p class="caption">${m.text}</p>
            `;
        }
        // 🔴 IF IT IS A VIDEO:
        else if (m.type === "video") {
            // 'autoplay muted loop playsinline' ensures it plays automatically
            div.innerHTML = `
                <video autoplay muted loop playsinline controls>
                    <source src="${m.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p class="caption">${m.text}</p>
            `;
        }

        container.appendChild(div);
    });
}

function timeAwareMessage() {
    const h = new Date().getHours();
    let msg = "You crossed my mind tonight.";
    if (h >= 5 && h < 12) msg = "Good morning, my love.";
    else if (h >= 12 && h < 18) msg = "I hope today is gentle with you.";
    document.getElementById("timeMessage").textContent = msg;
}

function checkSealedLetter() {
    const diff = Date.now() - START_DATE;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days >= 365 || visits >= 20) {
        document.getElementById("sealedLetter").style.display = "block";
        document.getElementById("sealedText").textContent =
            "If you're reading this, time has passed — and I'm still here. Still choosing you.";
    }
}

/* --- FUTURISTIC OPENING LOGIC --- */
function openSecret() {
    const secretOverlay = document.getElementById("secret");
    const terminal = document.querySelector(".terminal-window");
    const sfx = document.getElementById("openSfx");

    // Play sound effect (optional)
    if (sfx) sfx.play().catch(() => { });

    // 1. Show the overlay background
    secretOverlay.style.display = "flex";

    // 2. Trigger the CSS animation
    // Small delay ensures the display:flex is rendered before animation starts
    setTimeout(() => {
        terminal.classList.add("open");
    }, 50);
}

function closeSecret() {
    const secretOverlay = document.getElementById("secret");
    const terminal = document.querySelector(".terminal-window");

    terminal.classList.remove("open");

    // Wait for animation to reverse or just hide it
    setTimeout(() => {
        secretOverlay.style.display = "none";
    }, 300);
}