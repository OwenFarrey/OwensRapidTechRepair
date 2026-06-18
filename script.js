// ── SPLASH SCREEN (Robust version) ──
window.addEventListener('load', function() {
    // Fallback: remove splash after 5 seconds no matter what
    setTimeout(function() {
        var splash = document.getElementById('splash');
        if (splash) {
            splash.classList.add('fade-out');
            // Optional: remove from DOM after animation
            splash.addEventListener('transitionend', function() {
                splash.style.display = 'none';
            });
        }
    }, 1300);
});

// ── PARTICLE BACKGROUND ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ── OVERLAY MENU ──
function toggleMenu() {
    document.getElementById('overlayMenu').classList.toggle('active');
}

// ── REPAIR LOGIC ──
const devices = [
    // ========== APPLE iPHONE ==========
    { name: "iPhone 17 Pro Max", mfg: "Apple", series: "iPhone 17", screenPremium: [329,399], screenValue: [179,239], battery: [75,85], chargeport: [99,119], camera: [159,229], speaker: [45,55], diagnostic: [25,25] },
    { name: "iPhone 17 Pro", mfg: "Apple", series: "iPhone 17", screenPremium: [309,379], screenValue: [169,229], battery: [75,85], chargeport: [99,119], camera: [149,219], speaker: [45,55], diagnostic: [25,25] },
    { name: "iPhone 17 Air", mfg: "Apple", series: "iPhone 17", screenPremium: [289,349], screenValue: [149,199], battery: [69,79], chargeport: [89,109], camera: [139,199], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 17", mfg: "Apple", series: "iPhone 17", screenPremium: [269,329], screenValue: [139,189], battery: [69,79], chargeport: [89,109], camera: [129,189], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 16 Pro Max", mfg: "Apple", series: "iPhone 16", screenPremium: [329,399], screenValue: [179,239], battery: [75,85], chargeport: [99,119], camera: [159,229], speaker: [45,55], diagnostic: [25,25] },
    { name: "iPhone 16 Pro", mfg: "Apple", series: "iPhone 16", screenPremium: [309,379], screenValue: [169,229], battery: [75,85], chargeport: [99,119], camera: [149,219], speaker: [45,55], diagnostic: [25,25] },
    { name: "iPhone 16 Plus", mfg: "Apple", series: "iPhone 16", screenPremium: [249,309], screenValue: [129,179], battery: [69,79], chargeport: [89,109], camera: [129,189], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 16", mfg: "Apple", series: "iPhone 16", screenPremium: [229,289], screenValue: [119,169], battery: [69,79], chargeport: [89,109], camera: [129,189], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 15 Pro Max", mfg: "Apple", series: "iPhone 15", screenPremium: [249,289], screenValue: [159,189], battery: [69,85], chargeport: [69,89], camera: [109,139], speaker: [55,69], diagnostic: [25,25] },
    { name: "iPhone 15 Pro", mfg: "Apple", series: "iPhone 15", screenPremium: [229,269], screenValue: [139,169], battery: [65,75], chargeport: [65,79], camera: [99,129], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 15 Plus", mfg: "Apple", series: "iPhone 15", screenPremium: [179,219], screenValue: [119,149], battery: [65,75], chargeport: [65,79], camera: [89,119], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 15", mfg: "Apple", series: "iPhone 15", screenPremium: [169,199], screenValue: [109,139], battery: [65,75], chargeport: [65,79], camera: [89,119], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 14 Pro Max", mfg: "Apple", series: "iPhone 14", screenPremium: [179,209], screenValue: [129,159], battery: [65,75], chargeport: [69,85], camera: [99,129], speaker: [55,69], diagnostic: [25,25] },
    { name: "iPhone 14 Pro", mfg: "Apple", series: "iPhone 14", screenPremium: [159,189], screenValue: [109,139], battery: [59,69], chargeport: [59,79], camera: [89,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 14 Plus", mfg: "Apple", series: "iPhone 14", screenPremium: [139,169], screenValue: [99,129], battery: [59,75], chargeport: [59,79], camera: [85,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 14", mfg: "Apple", series: "iPhone 14", screenPremium: [139,169], screenValue: [99,129], battery: [59,75], chargeport: [59,79], camera: [85,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 13 Pro Max", mfg: "Apple", series: "iPhone 13", screenPremium: [199,229], battery: [69,85], chargeport: [55,69], camera: [99,119], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 13 Pro", mfg: "Apple", series: "iPhone 13", screenPremium: [179,209], screenValue: [109,139], battery: [65,75], chargeport: [55,69], camera: [89,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 13", mfg: "Apple", series: "iPhone 13", screenPremium: [139,159], screenValue: [89,109], battery: [65,75], chargeport: [55,69], camera: [79,99], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 13 mini", mfg: "Apple", series: "iPhone 13", screenPremium: [139,159], screenValue: [89,109], battery: [55,65], chargeport: [49,65], camera: [69,89], speaker: [39,55], diagnostic: [25,25] },
    { name: "iPhone 12 Pro Max", mfg: "Apple", series: "iPhone 12", screenPremium: [219,249], screenValue: [109,129], battery: [65,75], chargeport: [59,75], camera: [79,99], speaker: [55,69], diagnostic: [25,25] },
    { name: "iPhone 12 Pro", mfg: "Apple", series: "iPhone 12", screenPremium: [159,189], screenValue: [99,119], battery: [59,69], chargeport: [55,69], camera: [69,89], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 12", mfg: "Apple", series: "iPhone 12", screenPremium: [119,139], screenValue: [89,109], battery: [59,75], chargeport: [49,65], camera: [75,95], speaker: [55,69], diagnostic: [25,25] },
    { name: "iPhone 12 mini", mfg: "Apple", series: "iPhone 12", screenPremium: [119,139], screenValue: [79,99], battery: [49,65], chargeport: [45,59], camera: [65,85], speaker: [45,59], diagnostic: [25,25] },
    { name: "iPhone 11 Pro Max", mfg: "Apple", series: "iPhone 11", screenPremium: [159,179], battery: [65,75], chargeport: [75,89], camera: [89,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone 11 Pro", mfg: "Apple", series: "iPhone 11", screenPremium: [139,159], battery: [55,69], chargeport: [69,85], camera: [79,99], speaker: [45,59], diagnostic: [25,25] },
    { name: "iPhone 11", mfg: "Apple", series: "iPhone 11", screenPremium: [89,109], battery: [49,59], chargeport: [69,89], camera: [79,99], speaker: [49,65], diagnostic: [25,25] },
    { name: "iPhone XS Max", mfg: "Apple", series: "iPhone X", screenPremium: [119,139], battery: [45,59], chargeport: [55,69], camera: [69,89], speaker: [39,55], diagnostic: [25,25] },
    { name: "iPhone XS", mfg: "Apple", series: "iPhone X", screenPremium: [109,129], battery: [45,59], chargeport: [55,69], camera: [65,85], speaker: [39,55], diagnostic: [25,25] },
    { name: "iPhone XR", mfg: "Apple", series: "iPhone X", screenPremium: [89,109], battery: [49,59], chargeport: [69,89], camera: [79,99], speaker: [49,59], diagnostic: [25,25] },
    { name: "iPhone X", mfg: "Apple", series: "iPhone X", screenPremium: [89,109], battery: [45,59], chargeport: [55,69], camera: [65,85], speaker: [39,55], diagnostic: [25,25] },
    { name: "iPhone SE (4th Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [89,109], battery: [49,59], chargeport: [55,69], camera: [69,89], speaker: [49,59], diagnostic: [25,25] },
    { name: "iPhone SE (3rd Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [89,109], battery: [49,59], chargeport: [55,69], camera: [69,89], speaker: [49,59], diagnostic: [25,25] },
    { name: "iPhone SE (2nd Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [79,99], battery: [49,59], chargeport: [55,69], camera: [65,79], speaker: [49,59], diagnostic: [25,25] },
    { name: "iPhone SE (1st Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [69,89], battery: [39,49], chargeport: [45,59], camera: [55,69], speaker: [39,49], diagnostic: [25,25] },
    { name: "iPhone 8 Plus", mfg: "Apple", series: "Legacy", screenPremium: [79,99], battery: [45,55], chargeport: [49,65], camera: [55,75], speaker: [39,55], diagnostic: [25,25] },
    { name: "iPhone 8", mfg: "Apple", series: "Legacy", screenPremium: [69,89], battery: [39,49], chargeport: [45,59], camera: [49,69], speaker: [39,49], diagnostic: [25,25] },
    { name: "iPhone 7 Plus", mfg: "Apple", series: "Legacy", screenPremium: [69,89], battery: [39,49], chargeport: [45,59], camera: [45,65], speaker: [35,49], diagnostic: [25,25] },
    { name: "iPhone 7", mfg: "Apple", series: "Legacy", screenPremium: [59,79], battery: [35,49], chargeport: [39,55], camera: [39,59], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 6s Plus", mfg: "Apple", series: "Legacy", screenPremium: [59,79], battery: [35,49], chargeport: [39,55], camera: [39,59], speaker: [35,45], diagnostic: [25,25] },
    { name: "iPhone 6s", mfg: "Apple", series: "Legacy", screenPremium: [49,69], battery: [35,45], chargeport: [35,49], camera: [35,49], speaker: [29,39], diagnostic: [25,25] },
    { name: "iPhone 6 Plus", mfg: "Apple", series: "Legacy", screenPremium: [49,69], battery: [35,45], chargeport: [35,49], camera: [35,49], speaker: [29,39], diagnostic: [25,25] },
    { name: "iPhone 6", mfg: "Apple", series: "Legacy", screenPremium: [49,69], battery: [29,39], chargeport: [35,49], camera: [35,49], speaker: [29,39], diagnostic: [25,25] },
    { name: "iPhone 5s", mfg: "Apple", series: "Legacy", screenPremium: [39,59], battery: [25,35], chargeport: [29,39], camera: [29,39], speaker: [25,35], diagnostic: [25,25] },
    { name: "iPhone 5c", mfg: "Apple", series: "Legacy", screenPremium: [39,59], battery: [25,35], chargeport: [29,39], camera: [29,39], speaker: [25,35], diagnostic: [25,25] },
    { name: "iPhone 5", mfg: "Apple", series: "Legacy", screenPremium: [39,49], battery: [25,35], chargeport: [25,39], camera: [25,35], speaker: [25,35], diagnostic: [25,25] },
    { name: "iPhone 4s", mfg: "Apple", series: "Legacy", screenPremium: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,35], speaker: [25,35], diagnostic: [25,25] },
    { name: "iPhone 4", mfg: "Apple", series: "Legacy", screenPremium: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,35], speaker: [25,35], diagnostic: [25,25] },
    { name: "Original iPhone", mfg: "Apple", series: "Legacy", screenPremium: [45,69], battery: [25,35], chargeport: [25,39], camera: [25,35], speaker: [25,35], diagnostic: [25,25] },

    // ========== SAMSUNG ==========
    { name: "Galaxy S26 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [339,399], screenValue: [209,249], battery: [65,79], chargeport: [85,105], camera: [179,219], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S26+", mfg: "Samsung", series: "Galaxy S", screenPremium: [299,359], screenValue: [179,219], battery: [59,75], chargeport: [75,95], camera: [159,199], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S26", mfg: "Samsung", series: "Galaxy S", screenPremium: [269,329], screenValue: [159,199], battery: [55,69], chargeport: [69,89], camera: [139,179], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S25 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [319,379], screenValue: [199,239], battery: [65,79], chargeport: [85,105], camera: [169,209], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S25+", mfg: "Samsung", series: "Galaxy S", screenPremium: [279,339], screenValue: [169,209], battery: [59,75], chargeport: [75,95], camera: [149,189], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S25", mfg: "Samsung", series: "Galaxy S", screenPremium: [249,309], screenValue: [149,189], battery: [55,69], chargeport: [69,89], camera: [129,169], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S24 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [299,359], screenValue: [179,219], battery: [59,75], chargeport: [79,99], camera: [159,199], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S24+", mfg: "Samsung", series: "Galaxy S", screenPremium: [259,319], screenValue: [159,199], battery: [55,69], chargeport: [69,89], camera: [139,179], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S24", mfg: "Samsung", series: "Galaxy S", screenPremium: [239,299], screenValue: [139,179], battery: [55,69], chargeport: [69,89], camera: [129,169], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S24 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [189,229], screenValue: [119,149], battery: [49,65], chargeport: [59,79], camera: [109,149], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy S23 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [269,309], screenValue: [179,219], battery: [55,69], chargeport: [59,75], camera: [89,119], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy S23+", mfg: "Samsung", series: "Galaxy S", screenPremium: [229,279], screenValue: [149,189], battery: [55,69], chargeport: [59,75], camera: [89,119], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy S23", mfg: "Samsung", series: "Galaxy S", screenPremium: [199,239], screenValue: [149,179], battery: [55,69], chargeport: [55,69], camera: [85,109], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy S23 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [179,219], screenValue: [119,149], battery: [49,65], chargeport: [55,69], camera: [79,109], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S22 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [249,289], screenValue: [169,199], battery: [49,65], chargeport: [55,69], camera: [85,109], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy S22+", mfg: "Samsung", series: "Galaxy S", screenPremium: [209,249], screenValue: [139,169], battery: [49,65], chargeport: [55,69], camera: [79,109], speaker: [49,65], diagnostic: [25,25] },
    { name: "Galaxy S22", mfg: "Samsung", series: "Galaxy S", screenPremium: [189,219], screenValue: [139,169], battery: [55,69], chargeport: [55,69], camera: [79,99], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy S21 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [239,269], screenValue: [159,179], battery: [55,69], chargeport: [55,69], camera: [79,99], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy S21+", mfg: "Samsung", series: "Galaxy S", screenPremium: [199,229], screenValue: [139,159], battery: [49,65], chargeport: [55,69], camera: [75,95], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy S21", mfg: "Samsung", series: "Galaxy S", screenPremium: [179,199], screenValue: [139,159], battery: [49,65], chargeport: [55,69], camera: [75,95], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy S21 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [159,189], screenValue: [109,139], battery: [45,59], chargeport: [49,65], camera: [65,89], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S20 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [209,249], screenValue: [149,179], battery: [49,65], chargeport: [49,65], camera: [69,99], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy S20+", mfg: "Samsung", series: "Galaxy S", screenPremium: [179,219], screenValue: [129,159], battery: [45,59], chargeport: [45,65], camera: [59,89], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S20", mfg: "Samsung", series: "Galaxy S", screenPremium: [159,199], screenValue: [119,149], battery: [45,59], chargeport: [45,65], camera: [59,89], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy S20 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [139,169], screenValue: [99,129], battery: [39,55], chargeport: [39,55], camera: [49,75], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy S10", mfg: "Samsung", series: "Galaxy S", screenPremium: [139,169], screenValue: [99,129], battery: [39,55], chargeport: [39,55], camera: [49,75], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy S9", mfg: "Samsung", series: "Galaxy S", screenPremium: [119,149], battery: [35,49], chargeport: [35,49], camera: [39,59], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy S8", mfg: "Samsung", series: "Galaxy S", screenPremium: [99,129], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy S7", mfg: "Samsung", series: "Galaxy S", screenPremium: [79,109], battery: [25,39], chargeport: [25,39], camera: [29,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S6", mfg: "Samsung", series: "Galaxy S", screenPremium: [69,99], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S5", mfg: "Samsung", series: "Galaxy S", screenPremium: [59,89], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S4", mfg: "Samsung", series: "Galaxy S", screenPremium: [49,79], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S3", mfg: "Samsung", series: "Galaxy S", screenPremium: [39,69], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S2", mfg: "Samsung", series: "Galaxy S", screenPremium: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy S", mfg: "Samsung", series: "Galaxy S", screenPremium: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy Z series (foldables)
    { name: "Galaxy Z Fold 7", mfg: "Samsung", series: "Galaxy Z", screenPremium: [349,449], screenValue: [229,299], battery: [79,95], chargeport: [109,129], camera: [189,249], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 6", mfg: "Samsung", series: "Galaxy Z", screenPremium: [329,429], screenValue: [209,279], battery: [75,89], chargeport: [99,119], camera: [179,239], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 5", mfg: "Samsung", series: "Galaxy Z", screenPremium: [319,419], screenValue: [199,269], battery: [75,89], chargeport: [99,119], camera: [169,229], speaker: [55,69], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 4", mfg: "Samsung", series: "Galaxy Z", screenPremium: [299,399], screenValue: [189,259], battery: [69,85], chargeport: [89,109], camera: [159,219], speaker: [49,65], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 3", mfg: "Samsung", series: "Galaxy Z", screenPremium: [279,379], screenValue: [179,239], battery: [65,79], chargeport: [79,99], camera: [149,199], speaker: [49,65], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 2", mfg: "Samsung", series: "Galaxy Z", screenPremium: [259,359], screenValue: [169,229], battery: [65,79], chargeport: [79,99], camera: [139,189], speaker: [49,65], diagnostic: [25,25] },
    { name: "Galaxy Z Fold", mfg: "Samsung", series: "Galaxy Z", screenPremium: [249,349], screenValue: [159,219], battery: [59,75], chargeport: [75,95], camera: [129,179], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 7", mfg: "Samsung", series: "Galaxy Z", screenPremium: [279,359], screenValue: [179,239], battery: [69,85], chargeport: [89,109], camera: [159,219], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 6", mfg: "Samsung", series: "Galaxy Z", screenPremium: [269,349], screenValue: [169,229], battery: [65,79], chargeport: [85,105], camera: [149,209], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 5", mfg: "Samsung", series: "Galaxy Z", screenPremium: [259,339], screenValue: [159,219], battery: [65,79], chargeport: [85,105], camera: [139,199], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 4", mfg: "Samsung", series: "Galaxy Z", screenPremium: [249,329], screenValue: [149,209], battery: [59,75], chargeport: [75,95], camera: [129,189], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 3", mfg: "Samsung", series: "Galaxy Z", screenPremium: [239,319], screenValue: [139,199], battery: [55,69], chargeport: [69,89], camera: [119,169], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 2", mfg: "Samsung", series: "Galaxy Z", screenPremium: [229,309], screenValue: [129,189], battery: [55,69], chargeport: [69,89], camera: [109,159], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy Z Flip", mfg: "Samsung", series: "Galaxy Z", screenPremium: [219,299], screenValue: [119,179], battery: [49,65], chargeport: [65,85], camera: [99,149], speaker: [35,49], diagnostic: [25,25] },

    // Galaxy Note series
    { name: "Galaxy Note20 Ultra", mfg: "Samsung", series: "Galaxy Note", screenPremium: [269,329], screenValue: [179,219], battery: [65,75], chargeport: [65,85], camera: [99,139], speaker: [49,65], diagnostic: [25,25] },
    { name: "Galaxy Note20", mfg: "Samsung", series: "Galaxy Note", screenPremium: [239,299], screenValue: [149,199], battery: [59,69], chargeport: [59,79], camera: [89,129], speaker: [45,59], diagnostic: [25,25] },
    { name: "Galaxy Note10+", mfg: "Samsung", series: "Galaxy Note", screenPremium: [219,279], screenValue: [139,189], battery: [55,65], chargeport: [55,75], camera: [79,119], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy Note10", mfg: "Samsung", series: "Galaxy Note", screenPremium: [199,259], screenValue: [119,169], battery: [55,65], chargeport: [55,75], camera: [79,119], speaker: [39,55], diagnostic: [25,25] },
    { name: "Galaxy Note10 Lite", mfg: "Samsung", series: "Galaxy Note", screenPremium: [179,229], screenValue: [109,149], battery: [49,59], chargeport: [49,65], camera: [69,99], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy Note9", mfg: "Samsung", series: "Galaxy Note", screenPremium: [189,239], battery: [55,65], chargeport: [55,75], camera: [79,109], speaker: [49,59], diagnostic: [25,25] },
    { name: "Galaxy Note8", mfg: "Samsung", series: "Galaxy Note", screenPremium: [169,219], battery: [49,59], chargeport: [49,65], camera: [69,99], speaker: [45,55], diagnostic: [25,25] },
    { name: "Galaxy Note5", mfg: "Samsung", series: "Galaxy Note", screenPremium: [129,169], battery: [39,49], chargeport: [39,55], camera: [55,79], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy Note4", mfg: "Samsung", series: "Galaxy Note", screenPremium: [109,149], battery: [35,45], chargeport: [35,49], camera: [45,69], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy Note3", mfg: "Samsung", series: "Galaxy Note", screenPremium: [99,139], battery: [29,39], chargeport: [29,45], camera: [39,59], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy Note2", mfg: "Samsung", series: "Galaxy Note", screenPremium: [79,119], battery: [25,35], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy Note", mfg: "Samsung", series: "Galaxy Note", screenPremium: [69,109], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy A series (common mid-range)
    { name: "Galaxy A56", mfg: "Samsung", series: "Galaxy A", screenPremium: [139,169], screenValue: [89,119], battery: [45,59], chargeport: [49,65], camera: [65,89], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy A36", mfg: "Samsung", series: "Galaxy A", screenPremium: [119,149], screenValue: [79,109], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy A26", mfg: "Samsung", series: "Galaxy A", screenPremium: [99,129], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy A16", mfg: "Samsung", series: "Galaxy A", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A06", mfg: "Samsung", series: "Galaxy A", screenPremium: [59,89], screenValue: [49,69], battery: [29,39], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A25", mfg: "Samsung", series: "Galaxy A", screenPremium: [99,129], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy A24", mfg: "Samsung", series: "Galaxy A", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A15", mfg: "Samsung", series: "Galaxy A", screenPremium: [79,109], screenValue: [59,79], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A14", mfg: "Samsung", series: "Galaxy A", screenPremium: [79,109], screenValue: [59,79], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A13", mfg: "Samsung", series: "Galaxy A", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A12", mfg: "Samsung", series: "Galaxy A", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A11", mfg: "Samsung", series: "Galaxy A", screenPremium: [59,89], screenValue: [39,59], battery: [29,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A10", mfg: "Samsung", series: "Galaxy A", screenPremium: [49,79], screenValue: [39,59], battery: [29,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A54", mfg: "Samsung", series: "Galaxy A", screenPremium: [139,169], screenValue: [89,119], battery: [45,59], chargeport: [49,65], camera: [65,89], speaker: [35,49], diagnostic: [25,25] },
    { name: "Galaxy A53", mfg: "Samsung", series: "Galaxy A", screenPremium: [129,159], screenValue: [79,109], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy A52", mfg: "Samsung", series: "Galaxy A", screenPremium: [119,149], screenValue: [79,109], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy A51", mfg: "Samsung", series: "Galaxy A", screenPremium: [109,139], screenValue: [69,99], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy A50", mfg: "Samsung", series: "Galaxy A", screenPremium: [99,129], screenValue: [69,99], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Galaxy A35", mfg: "Samsung", series: "Galaxy A", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A34", mfg: "Samsung", series: "Galaxy A", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A33", mfg: "Samsung", series: "Galaxy A", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A32", mfg: "Samsung", series: "Galaxy A", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A31", mfg: "Samsung", series: "Galaxy A", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A30", mfg: "Samsung", series: "Galaxy A", screenPremium: [59,89], screenValue: [39,59], battery: [29,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A05", mfg: "Samsung", series: "Galaxy A", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A04", mfg: "Samsung", series: "Galaxy A", screenPremium: [49,79], screenValue: [39,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A03", mfg: "Samsung", series: "Galaxy A", screenPremium: [49,79], screenValue: [39,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A02", mfg: "Samsung", series: "Galaxy A", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy A01", mfg: "Samsung", series: "Galaxy A", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy M series
    { name: "Galaxy M55", mfg: "Samsung", series: "Galaxy M", screenPremium: [109,139], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy M35", mfg: "Samsung", series: "Galaxy M", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M15", mfg: "Samsung", series: "Galaxy M", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M54", mfg: "Samsung", series: "Galaxy M", screenPremium: [109,139], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy M53", mfg: "Samsung", series: "Galaxy M", screenPremium: [99,129], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy M52", mfg: "Samsung", series: "Galaxy M", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M51", mfg: "Samsung", series: "Galaxy M", screenPremium: [79,109], screenValue: [49,79], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M34", mfg: "Samsung", series: "Galaxy M", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M33", mfg: "Samsung", series: "Galaxy M", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M32", mfg: "Samsung", series: "Galaxy M", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy M31", mfg: "Samsung", series: "Galaxy M", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy F series
    { name: "Galaxy F55", mfg: "Samsung", series: "Galaxy F", screenPremium: [109,139], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy F54", mfg: "Samsung", series: "Galaxy F", screenPremium: [99,129], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy F23", mfg: "Samsung", series: "Galaxy F", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy F22", mfg: "Samsung", series: "Galaxy F", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy F12", mfg: "Samsung", series: "Galaxy F", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy F41", mfg: "Samsung", series: "Galaxy F", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy XCover series
    { name: "Galaxy XCover 7", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [99,129], screenValue: [69,99], battery: [39,55], chargeport: [39,55], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Galaxy XCover 6 Pro", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy XCover 5", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy XCover 4 Pro", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [69,99], screenValue: [49,69], battery: [29,45], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },

    // Galaxy J series (legacy budget)
    { name: "Galaxy J7", mfg: "Samsung", series: "Galaxy J", screenPremium: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J6", mfg: "Samsung", series: "Galaxy J", screenPremium: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J5", mfg: "Samsung", series: "Galaxy J", screenPremium: [39,69], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J4", mfg: "Samsung", series: "Galaxy J", screenPremium: [39,69], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J3", mfg: "Samsung", series: "Galaxy J", screenPremium: [39,69], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J2", mfg: "Samsung", series: "Galaxy J", screenPremium: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Galaxy J1", mfg: "Samsung", series: "Galaxy J", screenPremium: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // ========== GOOGLE PIXEL ==========
    { name: "Pixel 10 Pro Fold", mfg: "Google", series: "Pixel Main", screenPremium: [349,449], screenValue: [229,299], battery: [79,95], chargeport: [99,119], camera: [179,239], speaker: [55,69], diagnostic: [25,25] },
    { name: "Pixel 10 Pro XL", mfg: "Google", series: "Pixel Main", screenPremium: [299,379], screenValue: [189,259], battery: [69,85], chargeport: [79,99], camera: [149,209], speaker: [49,65], diagnostic: [25,25] },
    { name: "Pixel 10 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [279,359], screenValue: [169,239], battery: [65,79], chargeport: [75,95], camera: [139,199], speaker: [45,59], diagnostic: [25,25] },
    { name: "Pixel 10", mfg: "Google", series: "Pixel Main", screenPremium: [249,329], screenValue: [149,209], battery: [59,75], chargeport: [69,89], camera: [129,179], speaker: [39,55], diagnostic: [25,25] },
    { name: "Pixel 9 Pro Fold", mfg: "Google", series: "Pixel Main", screenPremium: [329,429], screenValue: [219,289], battery: [75,89], chargeport: [95,115], camera: [169,229], speaker: [55,69], diagnostic: [25,25] },
    { name: "Pixel 9 Pro XL", mfg: "Google", series: "Pixel Main", screenPremium: [279,359], screenValue: [179,249], battery: [69,85], chargeport: [79,99], camera: [149,209], speaker: [49,65], diagnostic: [25,25] },
    { name: "Pixel 9 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [259,339], screenValue: [169,229], battery: [65,79], chargeport: [75,95], camera: [139,199], speaker: [45,59], diagnostic: [25,25] },
    { name: "Pixel 9", mfg: "Google", series: "Pixel Main", screenPremium: [239,319], screenValue: [149,209], battery: [59,75], chargeport: [69,89], camera: [129,179], speaker: [39,55], diagnostic: [25,25] },
    { name: "Pixel 8 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [219,279], screenValue: [139,189], battery: [55,69], chargeport: [65,85], camera: [119,169], speaker: [45,59], diagnostic: [25,25] },
    { name: "Pixel 8", mfg: "Google", series: "Pixel Main", screenPremium: [179,239], screenValue: [119,159], battery: [49,65], chargeport: [55,75], camera: [99,149], speaker: [39,55], diagnostic: [25,25] },
    { name: "Pixel 7 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [199,249], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [99,139], speaker: [39,55], diagnostic: [25,25] },
    { name: "Pixel 7", mfg: "Google", series: "Pixel Main", screenPremium: [159,199], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [35,49], diagnostic: [25,25] },
    { name: "Pixel 6 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [179,229], screenValue: [109,149], battery: [49,59], chargeport: [49,69], camera: [79,109], speaker: [35,49], diagnostic: [25,25] },
    { name: "Pixel 6", mfg: "Google", series: "Pixel Main", screenPremium: [149,199], screenValue: [89,129], battery: [45,55], chargeport: [45,65], camera: [69,99], speaker: [29,45], diagnostic: [25,25] },
    { name: "Pixel 5", mfg: "Google", series: "Pixel Main", screenPremium: [139,179], screenValue: [79,119], battery: [39,55], chargeport: [39,59], camera: [59,89], speaker: [29,45], diagnostic: [25,25] },
    { name: "Pixel 4 XL", mfg: "Google", series: "Pixel Main", screenPremium: [129,169], screenValue: [79,119], battery: [39,55], chargeport: [39,59], camera: [55,85], speaker: [29,45], diagnostic: [25,25] },
    { name: "Pixel 4", mfg: "Google", series: "Pixel Main", screenPremium: [119,159], screenValue: [69,109], battery: [35,49], chargeport: [35,55], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Pixel 3 XL", mfg: "Google", series: "Pixel Main", screenPremium: [109,149], screenValue: [69,99], battery: [35,49], chargeport: [35,55], camera: [45,75], speaker: [25,39], diagnostic: [25,25] },
    { name: "Pixel 3", mfg: "Google", series: "Pixel Main", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [35,55], camera: [45,75], speaker: [25,39], diagnostic: [25,25] },
    { name: "Pixel 2 XL", mfg: "Google", series: "Pixel Main", screenPremium: [89,129], screenValue: [59,89], battery: [29,45], chargeport: [29,45], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Pixel 2", mfg: "Google", series: "Pixel Main", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Pixel XL", mfg: "Google", series: "Pixel Main", screenPremium: [69,109], screenValue: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Pixel", mfg: "Google", series: "Pixel Main", screenPremium: [69,109], screenValue: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,55], speaker: [25,35], diagnostic: [25,25] },

    // Pixel A series
    { name: "Pixel 10a", mfg: "Google", series: "Pixel A", screenPremium: [189,239], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [99,139], speaker: [39,55], diagnostic: [25,25] },
    { name: "Pixel 9a", mfg: "Google", series: "Pixel A", screenPremium: [169,219], screenValue: [109,149], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "Pixel 8a", mfg: "Google", series: "Pixel A", screenPremium: [149,199], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [35,49], diagnostic: [25,25] },
    { name: "Pixel 7a", mfg: "Google", series: "Pixel A", screenPremium: [139,179], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Pixel 6a", mfg: "Google", series: "Pixel A", screenPremium: [119,159], screenValue: [79,119], battery: [39,55], chargeport: [39,59], camera: [59,89], speaker: [29,45], diagnostic: [25,25] },
    { name: "Pixel 5a", mfg: "Google", series: "Pixel A", screenPremium: [109,149], screenValue: [69,109], battery: [35,49], chargeport: [35,55], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Pixel 4a 5G", mfg: "Google", series: "Pixel A", screenPremium: [99,139], screenValue: [69,99], battery: [35,49], chargeport: [35,55], camera: [45,75], speaker: [25,39], diagnostic: [25,25] },
    { name: "Pixel 4a", mfg: "Google", series: "Pixel A", screenPremium: [89,129], screenValue: [59,89], battery: [29,45], chargeport: [29,45], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "Pixel 3a XL", mfg: "Google", series: "Pixel A", screenPremium: [89,129], screenValue: [59,89], battery: [29,45], chargeport: [29,45], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Pixel 3a", mfg: "Google", series: "Pixel A", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [29,45], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },

    // ========== MOTOROLA ==========
    { name: "Edge 70 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [249,299], screenValue: [149,189], battery: [59,75], chargeport: [65,85], camera: [119,159], speaker: [39,55], diagnostic: [25,25] },
    { name: "Edge 70 Pro", mfg: "Motorola", series: "Edge", screenPremium: [229,279], screenValue: [139,179], battery: [55,69], chargeport: [59,79], camera: [109,149], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 70 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [199,249], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [99,139], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 60 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [239,289], screenValue: [139,179], battery: [55,69], chargeport: [59,79], camera: [109,149], speaker: [39,55], diagnostic: [25,25] },
    { name: "Edge 60 Pro", mfg: "Motorola", series: "Edge", screenPremium: [219,269], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [99,139], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 50 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [209,259], screenValue: [119,159], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 50 Pro", mfg: "Motorola", series: "Edge", screenPremium: [189,239], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 50 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [169,219], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 40 Pro", mfg: "Motorola", series: "Edge", screenPremium: [199,249], screenValue: [119,159], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 40", mfg: "Motorola", series: "Edge", screenPremium: [179,229], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 40 Neo", mfg: "Motorola", series: "Edge", screenPremium: [149,199], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 30 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [189,239], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge 30 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [169,219], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 30 Neo", mfg: "Motorola", series: "Edge", screenPremium: [139,179], screenValue: [79,119], battery: [39,55], chargeport: [39,59], camera: [59,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "Edge 30", mfg: "Motorola", series: "Edge", screenPremium: [149,199], screenValue: [89,129], battery: [39,55], chargeport: [39,59], camera: [59,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "Edge 20 Pro", mfg: "Motorola", series: "Edge", screenPremium: [159,209], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Edge 20", mfg: "Motorola", series: "Edge", screenPremium: [139,179], screenValue: [79,119], battery: [39,55], chargeport: [39,59], camera: [59,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "Edge 20 Lite", mfg: "Motorola", series: "Edge", screenPremium: [119,159], screenValue: [69,109], battery: [35,49], chargeport: [35,55], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Edge Plus 2023", mfg: "Motorola", series: "Edge", screenPremium: [199,249], screenValue: [119,159], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "Edge Plus 2022", mfg: "Motorola", series: "Edge", screenPremium: [179,229], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },

    // Razr series
    { name: "Razr 70 / Ultra (2026)", mfg: "Motorola", series: "Razr", screenPremium: [299,359], screenValue: [199,249], battery: [69,85], chargeport: [79,99], camera: [139,189], speaker: [49,59], diagnostic: [25,25] },
    { name: "Razr 60 / Ultra (2025)", mfg: "Motorola", series: "Razr", screenPremium: [279,339], screenValue: [179,229], battery: [65,79], chargeport: [75,95], camera: [129,179], speaker: [45,55], diagnostic: [25,25] },
    { name: "Razr 50 / Razr+ 2024", mfg: "Motorola", series: "Razr", screenPremium: [259,319], screenValue: [169,219], battery: [59,75], chargeport: [69,89], camera: [119,169], speaker: [39,55], diagnostic: [25,25] },
    { name: "Razr 2023", mfg: "Motorola", series: "Razr", screenPremium: [239,299], screenValue: [149,199], battery: [55,69], chargeport: [65,85], camera: [109,159], speaker: [39,55], diagnostic: [25,25] },
    { name: "Razr 2022", mfg: "Motorola", series: "Razr", screenPremium: [219,279], screenValue: [139,189], battery: [49,65], chargeport: [59,79], camera: [99,149], speaker: [35,49], diagnostic: [25,25] },

    // Moto G series
    { name: "Moto G86", mfg: "Motorola", series: "Moto G", screenPremium: [109,139], screenValue: [69,99], battery: [39,55], chargeport: [39,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto G76", mfg: "Motorola", series: "Moto G", screenPremium: [99,129], screenValue: [59,89], battery: [35,49], chargeport: [35,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G56", mfg: "Motorola", series: "Moto G", screenPremium: [89,119], screenValue: [49,79], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G26", mfg: "Motorola", series: "Moto G", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G85", mfg: "Motorola", series: "Moto G", screenPremium: [99,129], screenValue: [59,89], battery: [35,49], chargeport: [35,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G84", mfg: "Motorola", series: "Moto G", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G75", mfg: "Motorola", series: "Moto G", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G73", mfg: "Motorola", series: "Moto G", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G71", mfg: "Motorola", series: "Moto G", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G70", mfg: "Motorola", series: "Moto G", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G64", mfg: "Motorola", series: "Moto G", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [35,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G63", mfg: "Motorola", series: "Moto G", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [29,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G62", mfg: "Motorola", series: "Moto G", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G60", mfg: "Motorola", series: "Moto G", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G54", mfg: "Motorola", series: "Moto G", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G53", mfg: "Motorola", series: "Moto G", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G52", mfg: "Motorola", series: "Moto G", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G51", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G50", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G34", mfg: "Motorola", series: "Moto G", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G33", mfg: "Motorola", series: "Moto G", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G32", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G31", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G30", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G24", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G23", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G22", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G21", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G20", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G14", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G13", mfg: "Motorola", series: "Moto G", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G12", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G10", mfg: "Motorola", series: "Moto G", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Moto G Stylus (yearly)
    { name: "Moto G Stylus (2026)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [129,159], screenValue: [79,109], battery: [39,55], chargeport: [45,59], camera: [65,89], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto G Stylus (2025)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [119,149], screenValue: [69,99], battery: [35,49], chargeport: [39,55], camera: [55,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Stylus (2024)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [109,139], screenValue: [69,99], battery: [35,49], chargeport: [39,55], camera: [55,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Stylus (2023)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [99,129], screenValue: [59,89], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Stylus (2022)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [89,119], screenValue: [59,89], battery: [29,45], chargeport: [35,49], camera: [45,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Stylus (2021)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [35,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },

    // Moto G Power (yearly)
    { name: "Moto G Power (2026)", mfg: "Motorola", series: "Moto G Power", screenPremium: [109,139], screenValue: [69,99], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto G Power (2025)", mfg: "Motorola", series: "Moto G Power", screenPremium: [99,129], screenValue: [59,89], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Power (2024)", mfg: "Motorola", series: "Moto G Power", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Power (2023)", mfg: "Motorola", series: "Moto G Power", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [35,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Power (2022)", mfg: "Motorola", series: "Moto G Power", screenPremium: [69,99], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Power (2021)", mfg: "Motorola", series: "Moto G Power", screenPremium: [59,89], screenValue: [39,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },

    // Moto G Play (yearly)
    { name: "Moto G Play (2026)", mfg: "Motorola", series: "Moto G Play", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto G Play (2025)", mfg: "Motorola", series: "Moto G Play", screenPremium: [79,109], screenValue: [49,79], battery: [29,45], chargeport: [35,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Play (2024)", mfg: "Motorola", series: "Moto G Play", screenPremium: [69,99], screenValue: [49,79], battery: [29,45], chargeport: [35,49], camera: [39,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Play (2023)", mfg: "Motorola", series: "Moto G Play", screenPremium: [59,89], screenValue: [39,69], battery: [25,39], chargeport: [29,45], camera: [35,55], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Play (2022)", mfg: "Motorola", series: "Moto G Play", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto G Play (2021)", mfg: "Motorola", series: "Moto G Play", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },

    // Moto E series
    { name: "Moto E24", mfg: "Motorola", series: "Moto E", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E22", mfg: "Motorola", series: "Moto E", screenPremium: [49,79], screenValue: [29,59], battery: [25,39], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E20", mfg: "Motorola", series: "Moto E", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E14", mfg: "Motorola", series: "Moto E", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E13", mfg: "Motorola", series: "Moto E", screenPremium: [39,69], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E12", mfg: "Motorola", series: "Moto E", screenPremium: [29,59], screenValue: [25,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E7", mfg: "Motorola", series: "Moto E", screenPremium: [29,59], screenValue: [25,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E6", mfg: "Motorola", series: "Moto E", screenPremium: [29,59], screenValue: [25,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E5", mfg: "Motorola", series: "Moto E", screenPremium: [29,49], screenValue: [25,39], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Moto E4", mfg: "Motorola", series: "Moto E", screenPremium: [29,49], screenValue: [25,39], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Moto Z series
    { name: "Moto Z4", mfg: "Motorola", series: "Moto Z", screenPremium: [89,119], battery: [39,55], chargeport: [45,59], camera: [49,69], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto Z3", mfg: "Motorola", series: "Moto Z", screenPremium: [79,109], battery: [35,49], chargeport: [39,55], camera: [45,65], speaker: [25,39], diagnostic: [25,25] },
    { name: "Moto Z2 Force", mfg: "Motorola", series: "Moto Z", screenPremium: [99,129], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto Z2 Play", mfg: "Motorola", series: "Moto Z", screenPremium: [89,119], battery: [39,55], chargeport: [45,59], camera: [49,69], speaker: [29,45], diagnostic: [25,25] },
    { name: "Moto Z", mfg: "Motorola", series: "Moto Z", screenPremium: [79,109], battery: [35,49], chargeport: [39,55], camera: [45,65], speaker: [25,39], diagnostic: [25,25] },

    // One series
    { name: "One 5G", mfg: "Motorola", series: "One", screenPremium: [99,129], screenValue: [59,89], battery: [39,55], chargeport: [45,59], camera: [55,79], speaker: [29,45], diagnostic: [25,25] },
    { name: "One Vision", mfg: "Motorola", series: "One", screenPremium: [89,119], screenValue: [59,89], battery: [35,49], chargeport: [39,55], camera: [49,69], speaker: [25,39], diagnostic: [25,25] },
    { name: "One Fusion", mfg: "Motorola", series: "One", screenPremium: [79,109], screenValue: [49,79], battery: [35,49], chargeport: [39,55], camera: [45,65], speaker: [25,39], diagnostic: [25,25] },
    { name: "One Macro", mfg: "Motorola", series: "One", screenPremium: [79,109], screenValue: [49,79], battery: [35,49], chargeport: [39,55], camera: [45,65], speaker: [25,39], diagnostic: [25,25] },

    // ========== ONEPLUS ==========
    { name: "OnePlus 13", mfg: "OnePlus", series: "Number", screenPremium: [279,349], screenValue: [169,229], battery: [59,75], chargeport: [65,85], camera: [129,179], speaker: [45,55], diagnostic: [25,25] },
    { name: "OnePlus 13R", mfg: "OnePlus", series: "Number", screenPremium: [229,289], screenValue: [139,189], battery: [55,69], chargeport: [55,75], camera: [99,149], speaker: [39,49], diagnostic: [25,25] },
    { name: "OnePlus 12", mfg: "OnePlus", series: "Number", screenPremium: [259,329], screenValue: [159,219], battery: [55,69], chargeport: [59,79], camera: [119,169], speaker: [39,55], diagnostic: [25,25] },
    { name: "OnePlus 12R", mfg: "OnePlus", series: "Number", screenPremium: [219,279], screenValue: [129,179], battery: [49,65], chargeport: [55,75], camera: [99,149], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 11", mfg: "OnePlus", series: "Number", screenPremium: [239,299], screenValue: [149,199], battery: [49,65], chargeport: [55,75], camera: [109,159], speaker: [39,55], diagnostic: [25,25] },
    { name: "OnePlus 10 Pro", mfg: "OnePlus", series: "Number", screenPremium: [219,279], screenValue: [139,189], battery: [49,65], chargeport: [55,75], camera: [99,149], speaker: [39,55], diagnostic: [25,25] },
    { name: "OnePlus 10T", mfg: "OnePlus", series: "Number", screenPremium: [199,259], screenValue: [129,179], battery: [45,59], chargeport: [49,69], camera: [89,139], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 10R", mfg: "OnePlus", series: "Number", screenPremium: [179,239], screenValue: [109,159], battery: [45,59], chargeport: [49,69], camera: [79,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 9 Pro", mfg: "OnePlus", series: "Number", screenPremium: [199,249], screenValue: [119,169], battery: [45,59], chargeport: [49,69], camera: [89,139], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 9", mfg: "OnePlus", series: "Number", screenPremium: [179,229], screenValue: [109,159], battery: [45,59], chargeport: [49,69], camera: [79,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 9RT", mfg: "OnePlus", series: "Number", screenPremium: [189,239], screenValue: [109,159], battery: [45,59], chargeport: [49,69], camera: [79,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 9R", mfg: "OnePlus", series: "Number", screenPremium: [169,219], screenValue: [99,149], battery: [39,55], chargeport: [45,65], camera: [69,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus 8 Pro", mfg: "OnePlus", series: "Number", screenPremium: [179,229], screenValue: [109,159], battery: [45,59], chargeport: [49,69], camera: [79,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus 8", mfg: "OnePlus", series: "Number", screenPremium: [159,209], screenValue: [89,139], battery: [39,55], chargeport: [45,65], camera: [69,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus 8T", mfg: "OnePlus", series: "Number", screenPremium: [169,219], screenValue: [99,149], battery: [39,55], chargeport: [45,65], camera: [69,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus 7 Pro", mfg: "OnePlus", series: "Number", screenPremium: [149,199], screenValue: [89,139], battery: [39,55], chargeport: [39,59], camera: [59,99], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus 7T", mfg: "OnePlus", series: "Number", screenPremium: [139,189], screenValue: [79,129], battery: [35,49], chargeport: [39,59], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus 7T Pro", mfg: "OnePlus", series: "Number", screenPremium: [149,199], screenValue: [89,139], battery: [39,55], chargeport: [39,59], camera: [59,99], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus 7", mfg: "OnePlus", series: "Number", screenPremium: [129,179], screenValue: [79,129], battery: [35,49], chargeport: [39,59], camera: [55,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus 6T", mfg: "OnePlus", series: "Number", screenPremium: [109,149], screenValue: [69,109], battery: [29,45], chargeport: [35,55], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus 6", mfg: "OnePlus", series: "Number", screenPremium: [109,149], screenValue: [69,109], battery: [29,45], chargeport: [35,55], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus 5T", mfg: "OnePlus", series: "Number", screenPremium: [89,129], screenValue: [59,89], battery: [29,45], chargeport: [29,49], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus 5", mfg: "OnePlus", series: "Number", screenPremium: [89,129], screenValue: [59,89], battery: [29,45], chargeport: [29,49], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus 3T", mfg: "OnePlus", series: "Number", screenPremium: [79,119], screenValue: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus 3", mfg: "OnePlus", series: "Number", screenPremium: [79,119], screenValue: [49,79], battery: [25,39], chargeport: [25,39], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus 2", mfg: "OnePlus", series: "Number", screenPremium: [69,109], screenValue: [39,69], battery: [25,39], chargeport: [25,39], camera: [25,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus One", mfg: "OnePlus", series: "Number", screenPremium: [69,109], screenValue: [39,69], battery: [25,39], chargeport: [25,39], camera: [25,49], speaker: [25,35], diagnostic: [25,25] },

    // Nord series
    { name: "OnePlus Nord 5", mfg: "OnePlus", series: "Nord", screenPremium: [199,249], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "OnePlus Nord 4", mfg: "OnePlus", series: "Nord", screenPremium: [179,229], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus Nord 3", mfg: "OnePlus", series: "Nord", screenPremium: [159,209], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus Nord 2", mfg: "OnePlus", series: "Nord", screenPremium: [139,179], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus Nord 1", mfg: "OnePlus", series: "Nord", screenPremium: [129,169], screenValue: [79,119], battery: [35,49], chargeport: [39,59], camera: [55,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 4", mfg: "OnePlus", series: "Nord", screenPremium: [149,199], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 3", mfg: "OnePlus", series: "Nord", screenPremium: [139,179], screenValue: [79,119], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [29,45], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 2", mfg: "OnePlus", series: "Nord", screenPremium: [119,159], screenValue: [69,109], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus Nord CE", mfg: "OnePlus", series: "Nord", screenPremium: [109,149], screenValue: [59,99], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus Nord N30", mfg: "OnePlus", series: "Nord", screenPremium: [119,159], screenValue: [69,109], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus Nord N20", mfg: "OnePlus", series: "Nord", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [39,59], camera: [45,75], speaker: [25,39], diagnostic: [25,25] },
    { name: "OnePlus Nord N10", mfg: "OnePlus", series: "Nord", screenPremium: [89,129], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus Nord N100", mfg: "OnePlus", series: "Nord", screenPremium: [69,109], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus Nord N200", mfg: "OnePlus", series: "Nord", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "OnePlus Nord N300", mfg: "OnePlus", series: "Nord", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },

    // Open series
    { name: "OnePlus Open 2", mfg: "OnePlus", series: "Open", screenPremium: [329,399], screenValue: [219,279], battery: [69,85], chargeport: [85,105], camera: [159,219], speaker: [49,59], diagnostic: [25,25] },
    { name: "OnePlus Open", mfg: "OnePlus", series: "Open", screenPremium: [299,369], screenValue: [199,259], battery: [65,79], chargeport: [79,99], camera: [149,209], speaker: [45,55], diagnostic: [25,25] },

    // ========== XIAOMI ==========
    { name: "Xiaomi 17 Ultra", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [299,369], screenValue: [189,249], battery: [59,75], chargeport: [69,89], camera: [149,209], speaker: [45,55], diagnostic: [25,25] },
    { name: "Xiaomi 17 Pro", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [279,349], screenValue: [169,229], battery: [55,69], chargeport: [65,85], camera: [139,199], speaker: [39,55], diagnostic: [25,25] },
    { name: "Xiaomi 17", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [259,329], screenValue: [149,209], battery: [55,69], chargeport: [65,85], camera: [129,189], speaker: [39,55], diagnostic: [25,25] },
    { name: "Xiaomi 15", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [239,299], screenValue: [139,189], battery: [49,65], chargeport: [55,75], camera: [119,169], speaker: [35,49], diagnostic: [25,25] },
    { name: "Xiaomi 14 Ultra", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [219,279], screenValue: [129,179], battery: [49,65], chargeport: [55,75], camera: [109,159], speaker: [35,49], diagnostic: [25,25] },
    { name: "Xiaomi 14", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [199,259], screenValue: [119,169], battery: [45,59], chargeport: [49,69], camera: [99,149], speaker: [29,45], diagnostic: [25,25] },
    { name: "Xiaomi 13", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [179,239], screenValue: [109,159], battery: [45,59], chargeport: [49,69], camera: [89,139], speaker: [29,45], diagnostic: [25,25] },
    { name: "Xiaomi 12", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [159,219], screenValue: [99,149], battery: [39,55], chargeport: [45,65], camera: [79,129], speaker: [29,45], diagnostic: [25,25] },
    { name: "Xiaomi 11", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [149,199], screenValue: [89,139], battery: [39,55], chargeport: [45,65], camera: [69,119], speaker: [25,39], diagnostic: [25,25] },
    { name: "Xiaomi 10", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [139,189], screenValue: [79,129], battery: [35,49], chargeport: [39,59], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "Xiaomi 9", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [119,169], screenValue: [69,119], battery: [35,49], chargeport: [39,59], camera: [49,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "Xiaomi 8", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [109,159], screenValue: [59,109], battery: [29,45], chargeport: [35,55], camera: [45,79], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 7", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [99,149], screenValue: [59,99], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 6", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [89,139], screenValue: [49,89], battery: [29,45], chargeport: [29,49], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 5", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [79,129], screenValue: [49,79], battery: [25,39], chargeport: [29,49], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 4", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [69,119], screenValue: [39,69], battery: [25,39], chargeport: [25,39], camera: [25,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 3", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [59,109], screenValue: [39,69], battery: [25,39], chargeport: [25,39], camera: [25,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 2", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [49,99], screenValue: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xiaomi 1", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [49,89], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Redmi Note series
    { name: "Redmi Note 15 Pro+", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [179,229], screenValue: [119,159], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "Redmi Note 15 Pro", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [149,199], screenValue: [99,139], battery: [39,55], chargeport: [45,65], camera: [69,109], speaker: [25,39], diagnostic: [25,25] },
    { name: "Redmi Note 14", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [129,179], screenValue: [79,119], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "Redmi Note 13", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [119,159], screenValue: [69,109], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Redmi Note 12", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [109,149], screenValue: [59,99], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "Redmi Note 11", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [39,59], camera: [45,75], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 10", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [89,129], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 9", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 8", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [69,109], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 7", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 6", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 5", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [49,89], screenValue: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi Note 4", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [39,79], screenValue: [25,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Redmi C & K series
    { name: "Redmi 14C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi 13C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [69,109], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [35,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi 12C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi 11C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi 10C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [49,89], screenValue: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi 9C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [49,79], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "Redmi K80", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [199,249], screenValue: [129,169], battery: [49,65], chargeport: [55,75], camera: [89,129], speaker: [35,49], diagnostic: [25,25] },
    { name: "Redmi K70", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [179,229], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "Redmi K60", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [159,209], screenValue: [99,139], battery: [45,59], chargeport: [49,69], camera: [69,109], speaker: [29,45], diagnostic: [25,25] },
    { name: "Redmi K50", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [139,189], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "Redmi K40", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [119,169], screenValue: [79,119], battery: [39,55], chargeport: [45,65], camera: [49,89], speaker: [25,39], diagnostic: [25,25] },

    // POCO series
    { name: "POCO F8 Pro", mfg: "Xiaomi", series: "POCO", screenPremium: [179,229], screenValue: [109,149], battery: [45,59], chargeport: [49,69], camera: [79,119], speaker: [29,45], diagnostic: [25,25] },
    { name: "POCO F8", mfg: "Xiaomi", series: "POCO", screenPremium: [149,199], screenValue: [89,139], battery: [39,55], chargeport: [45,65], camera: [69,109], speaker: [25,39], diagnostic: [25,25] },
    { name: "POCO F6", mfg: "Xiaomi", series: "POCO", screenPremium: [139,189], screenValue: [79,129], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "POCO F5", mfg: "Xiaomi", series: "POCO", screenPremium: [119,169], screenValue: [69,119], battery: [35,49], chargeport: [39,59], camera: [49,89], speaker: [25,39], diagnostic: [25,25] },
    { name: "POCO F4", mfg: "Xiaomi", series: "POCO", screenPremium: [109,149], screenValue: [59,99], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO F3", mfg: "Xiaomi", series: "POCO", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [39,59], camera: [45,75], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO F2", mfg: "Xiaomi", series: "POCO", screenPremium: [89,129], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO F1", mfg: "Xiaomi", series: "POCO", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO X7", mfg: "Xiaomi", series: "POCO", screenPremium: [139,179], screenValue: [89,129], battery: [39,55], chargeport: [45,65], camera: [59,99], speaker: [25,39], diagnostic: [25,25] },
    { name: "POCO X6", mfg: "Xiaomi", series: "POCO", screenPremium: [119,159], screenValue: [79,119], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,39], diagnostic: [25,25] },
    { name: "POCO X5", mfg: "Xiaomi", series: "POCO", screenPremium: [109,149], screenValue: [69,99], battery: [35,49], chargeport: [39,59], camera: [49,79], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO X4", mfg: "Xiaomi", series: "POCO", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [39,59], camera: [45,75], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO X3", mfg: "Xiaomi", series: "POCO", screenPremium: [89,129], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO X2", mfg: "Xiaomi", series: "POCO", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M6", mfg: "Xiaomi", series: "POCO", screenPremium: [99,139], screenValue: [59,89], battery: [35,49], chargeport: [39,59], camera: [45,75], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M5", mfg: "Xiaomi", series: "POCO", screenPremium: [89,129], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [39,69], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M4", mfg: "Xiaomi", series: "POCO", screenPremium: [79,119], screenValue: [49,79], battery: [29,45], chargeport: [35,55], camera: [35,65], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M3", mfg: "Xiaomi", series: "POCO", screenPremium: [69,109], screenValue: [39,69], battery: [29,45], chargeport: [29,49], camera: [29,59], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M2", mfg: "Xiaomi", series: "POCO", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO M1", mfg: "Xiaomi", series: "POCO", screenPremium: [49,89], screenValue: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO C75", mfg: "Xiaomi", series: "POCO", screenPremium: [59,99], screenValue: [39,69], battery: [25,39], chargeport: [29,49], camera: [29,49], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO C65", mfg: "Xiaomi", series: "POCO", screenPremium: [49,89], screenValue: [29,59], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },
    { name: "POCO C55", mfg: "Xiaomi", series: "POCO", screenPremium: [49,79], screenValue: [29,49], battery: [25,35], chargeport: [25,39], camera: [25,45], speaker: [25,35], diagnostic: [25,25] },

    // Mi Mix series
    { name: "Mi Mix Fold 5", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [329,399], screenValue: [219,279], battery: [69,85], chargeport: [85,105], camera: [159,219], speaker: [49,59], diagnostic: [25,25] },
    { name: "Mi Mix Fold 4", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [309,379], screenValue: [199,259], battery: [65,79], chargeport: [79,99], camera: [149,209], speaker: [45,55], diagnostic: [25,25] },
    { name: "Mi Mix Fold 3", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [289,359], screenValue: [189,249], battery: [59,75], chargeport: [75,95], camera: [139,199], speaker: [45,55], diagnostic: [25,25] },
	{ name: "Mi Mix Fold 2", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [269,339], screenValue: [169,229], battery: [55,69], chargeport: [69,89], camera: [129,179], speaker: [39,55], diagnostic: [25,25] },
    // Remaining Mi Mix (non‑fold)
    { name: "Mi Mix 4", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [179,279], screenValue: [119,199], battery: [49,59], chargeport: [55,75], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Mi Mix 3", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [169,259], screenValue: [109,179], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Mi Mix 2", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [159,239], screenValue: [99,159], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Mi Mix 1", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [149,219], screenValue: [89,139], battery: [45,55], chargeport: [35,55], camera: [69,109], speaker: [18,25], diagnostic: [25,25] },

    // ========== OTHER BRANDS ==========
    // Nokia
    { name: "Nokia G60", mfg: "Nokia", series: "Other", screenPremium: [119,199], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,79], speaker: [10,18], diagnostic: [25,25] },
    { name: "Nokia G50", mfg: "Nokia", series: "Other", screenPremium: [119,199], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Nokia G42", mfg: "Nokia", series: "Other", screenPremium: [119,199], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Nokia G22", mfg: "Nokia", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Nokia G21", mfg: "Nokia", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Nokia G11", mfg: "Nokia", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [20,35], camera: [35,59], speaker: [8,12], diagnostic: [25,25] },
    { name: "Nokia G10", mfg: "Nokia", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [15,25], camera: [25,45], speaker: [8,12], diagnostic: [25,25] },
    { name: "Nokia G100", mfg: "Nokia", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Nokia G300", mfg: "Nokia", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Nokia X30", mfg: "Nokia", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [39,49], chargeport: [30,50], camera: [55,89], speaker: [12,18], diagnostic: [25,25] },
    { name: "Nokia X20", mfg: "Nokia", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Nokia X10", mfg: "Nokia", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Nokia C32", mfg: "Nokia", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "Nokia C22", mfg: "Nokia", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "Nokia C12", mfg: "Nokia", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [12,20], camera: [25,45], speaker: [8,12], diagnostic: [25,25] },
    { name: "Nokia C02", mfg: "Nokia", series: "Other", screenPremium: [59,119], screenValue: [39,79], battery: [18,28], chargeport: [12,18], camera: [15,25], speaker: [8,12], diagnostic: [25,25] },

    // TCL
    { name: "TCL 50 XL", mfg: "TCL", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "TCL 50 LE", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 50 XE", mfg: "TCL", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "TCL 40 XL", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 40 XE", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 40 NXTpaper", mfg: "TCL", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "TCL 30 XL", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 30 XE", mfg: "TCL", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "TCL 30 V", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 30 LE", mfg: "TCL", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "TCL 30 T", mfg: "TCL", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "TCL 20 Pro 5G", mfg: "TCL", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [39,49], chargeport: [35,55], camera: [65,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "TCL 20S", mfg: "TCL", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "TCL 20 SE", mfg: "TCL", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [30,40], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "TCL 20 R", mfg: "TCL", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "TCL Flip", mfg: "TCL", series: "Other", screenPremium: [59,119], screenValue: [39,79], battery: [20,30], chargeport: [15,25], camera: [20,35], speaker: [8,12], diagnostic: [25,25] },

    // ASUS Zenfone
    { name: "Zenfone 12 Ultra", mfg: "ASUS", series: "Other", screenPremium: [224,419], screenValue: [149,279], battery: [49,59], chargeport: [55,75], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Zenfone 11 Ultra", mfg: "ASUS", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Zenfone 10", mfg: "ASUS", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Zenfone 9", mfg: "ASUS", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Zenfone 8", mfg: "ASUS", series: "Other", screenPremium: [179,329], screenValue: [119,219], battery: [45,55], chargeport: [35,55], camera: [69,109], speaker: [18,25], diagnostic: [25,25] },
    { name: "Zenfone 7", mfg: "ASUS", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [30,50], camera: [59,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "Zenfone 6", mfg: "ASUS", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [39,49], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "Zenfone 5", mfg: "ASUS", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "Zenfone 4", mfg: "ASUS", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "Zenfone 3", mfg: "ASUS", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Zenfone 2", mfg: "ASUS", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [18,30], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },

    // ASUS ROG Phone
    { name: "ROG Phone 9", mfg: "ASUS", series: "Other", screenPremium: [269,509], screenValue: [179,339], battery: [55,65], chargeport: [65,85], camera: [129,189], speaker: [30,40], diagnostic: [25,25] },
    { name: "ROG Phone 8", mfg: "ASUS", series: "Other", screenPremium: [254,479], screenValue: [169,319], battery: [55,65], chargeport: [65,85], camera: [119,179], speaker: [30,40], diagnostic: [25,25] },
    { name: "ROG Phone 7", mfg: "ASUS", series: "Other", screenPremium: [254,479], screenValue: [169,319], battery: [55,65], chargeport: [65,85], camera: [119,179], speaker: [30,40], diagnostic: [25,25] },
    { name: "ROG Phone 6", mfg: "ASUS", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [55,65], chargeport: [55,75], camera: [109,159], speaker: [25,35], diagnostic: [25,25] },
    { name: "ROG Phone 5", mfg: "ASUS", series: "Other", screenPremium: [224,419], screenValue: [149,279], battery: [49,59], chargeport: [45,65], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "ROG Phone 3", mfg: "ASUS", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "ROG Phone 2", mfg: "ASUS", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },

    // LG
    { name: "LG V60", mfg: "LG", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "LG V50", mfg: "LG", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "LG V40", mfg: "LG", series: "Other", screenPremium: [179,329], screenValue: [119,219], battery: [39,49], chargeport: [35,55], camera: [69,109], speaker: [18,25], diagnostic: [25,25] },
    { name: "LG V35", mfg: "LG", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [30,50], camera: [59,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "LG V30", mfg: "LG", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "LG V20", mfg: "LG", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "LG V10", mfg: "LG", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [30,40], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "LG G8", mfg: "LG", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [39,49], chargeport: [29,45], camera: [59,99], speaker: [12,18], diagnostic: [25,25] },
    { name: "LG G7", mfg: "LG", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [49,79], speaker: [12,18], diagnostic: [25,25] },
    { name: "LG G6", mfg: "LG", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [39,69], speaker: [10,15], diagnostic: [25,25] },
    { name: "LG G5", mfg: "LG", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [18,30], camera: [35,59], speaker: [8,15], diagnostic: [25,25] },
    { name: "LG G4", mfg: "LG", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [18,30], camera: [35,59], speaker: [8,15], diagnostic: [25,25] },
    { name: "LG G3", mfg: "LG", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG G2", mfg: "LG", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG G1", mfg: "LG", series: "Other", screenPremium: [59,119], screenValue: [39,79], battery: [18,28], chargeport: [12,20], camera: [20,35], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG Stylo 6", mfg: "LG", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [12,18], diagnostic: [25,25] },
    { name: "LG Stylo 5", mfg: "LG", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "LG Stylo 4", mfg: "LG", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "LG Stylo 3", mfg: "LG", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG K92", mfg: "LG", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "LG K51", mfg: "LG", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "LG K42", mfg: "LG", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG K31", mfg: "LG", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [15,25], camera: [25,45], speaker: [8,12], diagnostic: [25,25] },
    { name: "LG K22", mfg: "LG", series: "Other", screenPremium: [74,149], screenValue: [49,99], battery: [20,30], chargeport: [15,25], camera: [25,45], speaker: [8,12], diagnostic: [25,25] },

    // Sony Xperia
    { name: "Xperia 1 VIII", mfg: "Sony", series: "Other", screenPremium: [254,479], screenValue: [169,319], battery: [55,65], chargeport: [65,85], camera: [119,179], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xperia 1 VII", mfg: "Sony", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [49,59], chargeport: [55,75], camera: [109,159], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 1 VI", mfg: "Sony", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [49,59], chargeport: [55,75], camera: [109,159], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 1 V", mfg: "Sony", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [49,59], chargeport: [55,75], camera: [109,159], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 1 IV", mfg: "Sony", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [49,59], chargeport: [55,75], camera: [109,159], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 1 III", mfg: "Sony", series: "Other", screenPremium: [224,419], screenValue: [149,279], battery: [49,59], chargeport: [45,65], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 1 II", mfg: "Sony", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [18,25], diagnostic: [25,25] },
    { name: "Xperia 1", mfg: "Sony", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Xperia 5 VII", mfg: "Sony", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 5 VI", mfg: "Sony", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 5 V", mfg: "Sony", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 5 IV", mfg: "Sony", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [20,30], diagnostic: [25,25] },
    { name: "Xperia 5 III", mfg: "Sony", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Xperia 5 II", mfg: "Sony", series: "Other", screenPremium: [179,329], screenValue: [119,219], battery: [39,49], chargeport: [35,55], camera: [69,109], speaker: [18,25], diagnostic: [25,25] },
    { name: "Xperia 5", mfg: "Sony", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [30,50], camera: [59,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 VIII", mfg: "Sony", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [35,55], camera: [65,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 VII", mfg: "Sony", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 VI", mfg: "Sony", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 V", mfg: "Sony", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 IV", mfg: "Sony", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [15,25], diagnostic: [25,25] },
    { name: "Xperia 10 III", mfg: "Sony", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "Xperia 10 II", mfg: "Sony", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [12,18], diagnostic: [25,25] },
    { name: "Xperia 10", mfg: "Sony", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Xperia Pro-I", mfg: "Sony", series: "Other", screenPremium: [254,479], screenValue: [169,319], battery: [55,65], chargeport: [65,85], camera: [129,189], speaker: [25,35], diagnostic: [25,25] },
    { name: "Xperia Pro", mfg: "Sony", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [49,59], chargeport: [55,75], camera: [119,169], speaker: [20,30], diagnostic: [25,25] },

    // Huawei
    { name: "Huawei P60 Pro", mfg: "Huawei", series: "Other", screenPremium: [224,419], screenValue: [149,279], battery: [49,59], chargeport: [55,75], camera: [109,169], speaker: [20,30], diagnostic: [25,25] },
    { name: "Huawei P60", mfg: "Huawei", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [55,75], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Huawei P50 Pro", mfg: "Huawei", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [55,75], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Huawei P50", mfg: "Huawei", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [18,25], diagnostic: [25,25] },
    { name: "Huawei P40 Pro", mfg: "Huawei", series: "Other", screenPremium: [194,374], screenValue: [129,249], battery: [49,59], chargeport: [45,65], camera: [89,139], speaker: [18,25], diagnostic: [25,25] },
    { name: "Huawei P40", mfg: "Huawei", series: "Other", screenPremium: [179,344], screenValue: [119,229], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Huawei P30 Pro", mfg: "Huawei", series: "Other", screenPremium: [179,344], screenValue: [119,229], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [15,25], diagnostic: [25,25] },
    { name: "Huawei P30", mfg: "Huawei", series: "Other", screenPremium: [164,314], screenValue: [109,209], battery: [39,49], chargeport: [30,50], camera: [69,109], speaker: [15,25], diagnostic: [25,25] },
    { name: "Huawei P20 Pro", mfg: "Huawei", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [39,49], chargeport: [30,50], camera: [59,99], speaker: [12,20], diagnostic: [25,25] },
    { name: "Huawei P20", mfg: "Huawei", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [25,45], camera: [55,89], speaker: [12,20], diagnostic: [25,25] },
    { name: "Huawei P10", mfg: "Huawei", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Huawei Mate 60 Pro", mfg: "Huawei", series: "Other", screenPremium: [239,449], screenValue: [159,299], battery: [55,65], chargeport: [65,85], camera: [119,179], speaker: [25,35], diagnostic: [25,25] },
    { name: "Huawei Mate 50 Pro", mfg: "Huawei", series: "Other", screenPremium: [224,419], screenValue: [149,279], battery: [49,59], chargeport: [55,75], camera: [109,159], speaker: [20,30], diagnostic: [25,25] },
    { name: "Huawei Mate 40 Pro", mfg: "Huawei", series: "Other", screenPremium: [209,389], screenValue: [139,259], battery: [49,59], chargeport: [55,75], camera: [99,149], speaker: [20,30], diagnostic: [25,25] },
    { name: "Huawei Mate 30 Pro", mfg: "Huawei", series: "Other", screenPremium: [194,359], screenValue: [129,239], battery: [45,55], chargeport: [45,65], camera: [89,139], speaker: [18,25], diagnostic: [25,25] },
    { name: "Huawei Mate 20 Pro", mfg: "Huawei", series: "Other", screenPremium: [179,329], screenValue: [119,219], battery: [45,55], chargeport: [35,55], camera: [79,119], speaker: [18,25], diagnostic: [25,25] },
    { name: "Huawei Mate 10 Pro", mfg: "Huawei", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [30,50], camera: [69,109], speaker: [15,25], diagnostic: [25,25] },
    { name: "Huawei Nova 11", mfg: "Huawei", series: "Other", screenPremium: [164,299], screenValue: [109,199], battery: [39,49], chargeport: [35,55], camera: [65,99], speaker: [15,25], diagnostic: [25,25] },
    { name: "Huawei Nova 10", mfg: "Huawei", series: "Other", screenPremium: [149,284], screenValue: [99,189], battery: [39,49], chargeport: [30,50], camera: [59,99], speaker: [12,20], diagnostic: [25,25] },
    { name: "Huawei Nova 9", mfg: "Huawei", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [12,20], diagnostic: [25,25] },
    { name: "Huawei Nova 8", mfg: "Huawei", series: "Other", screenPremium: [134,254], screenValue: [89,169], battery: [35,45], chargeport: [30,50], camera: [55,89], speaker: [12,20], diagnostic: [25,25] },
    { name: "Huawei Nova 7", mfg: "Huawei", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Huawei Nova 6", mfg: "Huawei", series: "Other", screenPremium: [119,224], screenValue: [79,149], battery: [35,45], chargeport: [25,45], camera: [45,75], speaker: [10,18], diagnostic: [25,25] },
    { name: "Huawei Nova 5", mfg: "Huawei", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Huawei Nova 4", mfg: "Huawei", series: "Other", screenPremium: [104,194], screenValue: [69,129], battery: [29,39], chargeport: [20,35], camera: [35,65], speaker: [8,15], diagnostic: [25,25] },
    { name: "Huawei Nova 3", mfg: "Huawei", series: "Other", screenPremium: [89,179], screenValue: [59,119], battery: [25,35], chargeport: [15,25], camera: [30,55], speaker: [8,12], diagnostic: [25,25] }
];

const repairTypes = {
    'screenPremium': { label: 'Premium Screen Replacement', icon: 'bi-phone', description: 'Refurbished OEM / high‑quality aftermarket' },
    'screenValue': { label: 'Value Screen Replacement', icon: 'bi-phone', description: 'Budget‑friendly aftermarket screen' },
    'battery': { label: 'Battery Replacement', icon: 'bi-battery-charging' },
    'chargeport': { label: 'Charge Port Repair', icon: 'bi-plug' },
    'camera': { label: 'Rear Camera Repair', icon: 'bi-camera' },
    'speaker': { label: 'Speaker Repair', icon: 'bi-volume-up' },
    'diagnostic': { label: 'Diagnostic Service', icon: 'bi-search' }
};

const brandSeries = {
    'Apple': ['iPhone 17','iPhone 16','iPhone 15','iPhone 14','iPhone 13','iPhone 12','iPhone 11','iPhone X','iPhone SE','Legacy'],
    'Samsung': ['Galaxy S','Galaxy Z','Galaxy Note','Galaxy A','Galaxy M','Galaxy F','Galaxy XCover','Galaxy J'],
    'Google': ['Pixel Main','Pixel A'],
    'Motorola': ['Edge','Razr','Moto G','Moto G Stylus','Moto G Power','Moto G Play','Moto E','Moto Z','One'],
    'OnePlus': ['Number','Nord','Open'],
    'Xiaomi': ['Xiaomi','Redmi Note','Redmi C/K','POCO','Mi Mix']
};

let currentBrand = null;
let currentSeries = null;

function hideAllPanels() {
    document.getElementById('brandContainer').style.display = 'none';
    document.getElementById('otherBrandsContainer').style.display = 'none';
    document.getElementById('notListedContainer').style.display = 'none';
    document.getElementById('seriesContainer').style.display = 'none';
    document.getElementById('deviceListContainer').classList.remove('active');
    document.getElementById('repairOptionsContainer').style.display = 'none';
}

function showBrand(brand) {
    currentBrand = brand;
    hideAllPanels();
    hideGifColumn();
    if (brandSeries[brand]) {
        document.getElementById('seriesContainer').style.display = 'block';
        document.getElementById('seriesTitle').textContent = brand + ' - Select Series';
        const buttonsDiv = document.getElementById('seriesButtons');
        buttonsDiv.innerHTML = '';
        brandSeries[brand].forEach(series => {
            const btn = document.createElement('button');
            btn.className = 'series-btn';
            btn.textContent = series;
            btn.onclick = () => selectSeries(brand, series);
            buttonsDiv.appendChild(btn);
        });
        document.getElementById('seriesContainer').scrollIntoView({ behavior: 'smooth' });
    } else {
        showDeviceList(brand, null);
    }
}

function hideGifColumn() {
    return;
}

function showGifColumn() {
    const gifCol = document.querySelector('.repair-right-col');
    if (gifCol) gifCol.classList.remove('hidden');
}

function selectSeries(brand, series) {
    currentSeries = series;
    showDeviceList(brand, series);
}

function showDeviceList(brand, series) {
    hideAllPanels();
    document.getElementById('deviceListContainer').classList.add('active');
    document.getElementById('selectedBrandTitle').textContent = brand + (series ? ' - ' + series : '');
    const list = document.getElementById('deviceList');
    list.innerHTML = '';
    const filtered = devices.filter(d => d.mfg === brand && (!series || d.series === series));
    filtered.forEach(d => {
        const div = document.createElement('div');
        div.className = 'device-list-item';
        div.innerHTML = `<span>${d.name}</span>`;
        div.onclick = () => showRepairOptions(d.name);
        list.appendChild(div);
    });
    document.getElementById('deviceListContainer').scrollIntoView({ behavior: 'smooth' });
}

function showRepairOptions(deviceName) {
    const device = devices.find(d => d.name === deviceName && d.mfg === currentBrand);
    if (!device) return;
    document.getElementById('deviceListContainer').classList.remove('active');
    document.getElementById('repairOptionsContainer').style.display = 'block';
    document.getElementById('selectedDeviceTitle').textContent = device.name;
    const container = document.getElementById('repairOptionsList');
    container.innerHTML = '';

    Object.keys(repairTypes).forEach(key => {
        const range = device[key];
        if (!range) return;
        const repair = repairTypes[key];
        const div = document.createElement('div');
        div.className = 'repair-option-card';

        const descriptionHtml = repair.description
            ? `<small class="text-muted">${repair.description} · Parts & labor included</small>`
            : `<small class="text-muted">Parts & labor included</small>`;

        let priceHtml = '';
        if (key === 'diagnostic') {
            priceHtml = `$${range[0]}`;
        } else {
            priceHtml = `$${range[0]} – $${range[1]}`;
        }

        const deviceNameEncoded = encodeURIComponent(device.name);
        const repairLabelEncoded = encodeURIComponent(repair.label);
        const emailSubject = encodeURIComponent(`Repair Quote Request: ${device.name} - ${repair.label}`);
        const emailBody = encodeURIComponent(`Hi Owen,\n\nI need a ${repair.label} for my ${device.name}. Can you give me an exact quote?\n\nThanks!`);

        div.innerHTML = `
            <div class="repair-left">
                <div class="repair-name"><i class="bi ${repair.icon} me-2"></i>${repair.label}</div>
                ${descriptionHtml}
                <div class="repair-price" style="margin-top: 0.3rem; font-weight: 700; color: var(--success);">${priceHtml}</div>
            </div>
            <div class="repair-actions">
                <a class="btn-sm-cta" href="sms:+16165503211?body=Hi%20Owen!%20I%20need%20a%20${repairLabelEncoded}%20for%20my%20${deviceNameEncoded}.%20Can%20you%20give%20me%20an%20exact%20quote%3F">
                    <i class="bi bi-chat-dots"></i> Text
                </a>
                <a class="btn-sm-cta btn-email" href="https://mail.google.com/mail/?view=cm&fs=1&to=owensrapidtechrepair@gmail.com&su=${emailSubject}&body=${emailBody}" target="_blank" rel="noopener">
					<i class="bi bi-envelope"></i> Email
				</a>
                <a class="btn-sm-cta btn-book" href="" onclick="Calendly.initPopupWidget({url:'https://calendly.com/owensrapidtechrepair/phone-repair-1-hour-appointment?month=2026-06'});return false;">
                    <i class="bi bi-calendar-check"></i> Book
                </a>
            </div>
        `;
        container.appendChild(div);
    });

    // Custom Quote card
    const customDiv = document.createElement('div');
    customDiv.className = 'repair-option-card';
    customDiv.style.borderColor = 'var(--gold-accent)';

    const customSubject = encodeURIComponent('Custom Repair Quote Request');
    const customBody = encodeURIComponent(`Hi Owen,\n\nI need a repair for my device. Here's what's wrong:\n\n[Please describe the issue]\n\nThanks!`);

    customDiv.innerHTML = `
		<div class="repair-left">
			<div class="repair-name"><i class="bi bi-patch-question me-2"></i>Custom Quote</div>
			<small class="text-muted">Need something else? Tell me what's wrong and I'll give you a price.</small>
			<div class="repair-price" style="color: var(--gold-accent); font-weight: 700; font-size: 1.4rem; margin-top: 0.3rem;">Ask Me</div>
		</div>
		<div class="repair-actions">
			<a class="btn-sm-cta" style="background: var(--gold-accent); color: var(--deep-navy);" href="sms:+16165503211?body=Hi%20Owen!%20I%20need%20a%20repair%20for%20my%20phone.%20Here's%20what's%20wrong:">
				<i class="bi bi-chat-dots"></i> Text
			</a>
			<a class="btn-sm-cta btn-email" style="background: var(--gold-accent); color: var(--deep-navy);" href="https://mail.google.com/mail/?view=cm&fs=1&to=owensrapidtechrepair@gmail.com&su=${customSubject}&body=${customBody}" target="_blank" rel="noopener">
				<i class="bi bi-envelope"></i> Email
			</a>
			<a class="btn-sm-cta btn-book" style="background: var(--gold-accent); color: var(--deep-navy);" href="" onclick="Calendly.initPopupWidget({url:'https://calendly.com/owensrapidtechrepair/phone-repair-1-hour-appointment?month=2026-06'});return false;">
				<i class="bi bi-calendar-check"></i> Book
			</a>
		</div>
	`;
    container.appendChild(customDiv);

    document.getElementById('repairOptionsContainer').scrollIntoView({ behavior: 'smooth' });
}


function backToBrands() {
    hideAllPanels();
    document.getElementById('brandContainer').style.display = 'block';
    showGifColumn(); 
    document.getElementById('brandContainer').scrollIntoView({ behavior: 'smooth' });
}

function backToSeries() {
    if (currentBrand && brandSeries[currentBrand]) {
        hideAllPanels();
        document.getElementById('seriesContainer').style.display = 'block';
        document.getElementById('seriesContainer').scrollIntoView({ behavior: 'smooth' });
    } else {
        backToBrands();
    }
}

function backToDevices() {
    document.getElementById('repairOptionsContainer').style.display = 'none';
    document.getElementById('deviceListContainer').classList.add('active');
    document.getElementById('deviceListContainer').scrollIntoView({ behavior: 'smooth' });
}

function showOtherBrands() {
    hideAllPanels();
    document.getElementById('otherBrandsContainer').style.display = 'block';
    document.getElementById('otherBrandsContainer').scrollIntoView({ behavior: 'smooth' });
}

function hideOtherBrands() {
    hideAllPanels();
    document.getElementById('brandContainer').style.display = 'block';
    document.getElementById('brandContainer').scrollIntoView({ behavior: 'smooth' });
}

function showNotListed() {
    hideAllPanels();
    document.getElementById('notListedContainer').style.display = 'block';
    document.getElementById('notListedContainer').scrollIntoView({ behavior: 'smooth' });
}

function hideNotListed() {
    hideAllPanels();
    document.getElementById('brandContainer').style.display = 'block';
    document.getElementById('brandContainer').scrollIntoView({ behavior: 'smooth' });
}

// Initialize
document.getElementById('brandContainer').style.display = 'block';

// Brand cards: glow, ripple, staggered entrance
document.querySelectorAll('.brand-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '50%');
    });
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        card.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

// GIF slideshow
(function() {
    const slideshow = document.querySelector('.gif-slideshow');
    if (!slideshow) return;
    const gifs = slideshow.querySelectorAll('.assembly-gif');
    let currentIndex = 0;
    const totalGifs = gifs.length;
    const cycleTime = 8000;
    function nextGif() {
        gifs[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalGifs;
        const activeGif = gifs[currentIndex];
        const src = activeGif.src;
        activeGif.src = '';
        activeGif.src = src;
        activeGif.classList.add('active');
    }
    gifs[0].classList.add('active');
    setInterval(nextGif, cycleTime);
})();

function toggleMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const panel = document.getElementById('mobileNavPanel');
    btn.classList.toggle('open');
    panel.classList.toggle('open');
}
