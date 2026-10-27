// ── PARTICLE BACKGROUND ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

class Particle {
    constructor() { this.reset(); }
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

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function toggleMenu() {
    document.getElementById('overlayMenu').classList.toggle('active');
}

// ── REPAIR LOGIC ──
// Formulas used:
//   Value Screen  = (Part Cost × 2.5) + $25
//   Premium Screen = (Part Cost × 2.2) + $25
//   Charge Port   = Part Cost + $125
//   Battery       = Part Cost + $80
//   Camera        = Part Cost + $80
//   Speaker       = Part Cost + $70
//   Diagnostic    = $25 flat

const devices = [
    // ========== APPLE iPHONE ==========
    { name: "iPhone 17 Pro Max", mfg: "Apple", series: "iPhone 17", screenPremium: [510, 560], screenValue: [205, 235], battery: [100, 120], chargeport: [150, 170], camera: [150, 175], speaker: [85, 105], diagnostic: [25,25] },
    { name: "iPhone 17 Pro", mfg: "Apple", series: "iPhone 17", screenPremium: [495, 545], screenValue: [200, 230], battery: [100, 120], chargeport: [150, 170], camera: [145, 170], speaker: [85, 105], diagnostic: [25,25] },
    { name: "iPhone 17 Air", mfg: "Apple", series: "iPhone 17", screenPremium: [440, 485], screenValue: [180, 210], battery: [95, 115], chargeport: [145, 165], camera: [130, 155], speaker: [80, 100], diagnostic: [25,25] },
    { name: "iPhone 17", mfg: "Apple", series: "iPhone 17", screenPremium: [420, 465], screenValue: [170, 200], battery: [95, 115], chargeport: [145, 165], camera: [125, 150], speaker: [80, 100], diagnostic: [25,25] },
    { name: "iPhone 16 Pro Max", mfg: "Apple", series: "iPhone 16", screenPremium: [495, 545], screenValue: [200, 230], battery: [95, 115], chargeport: [150, 170], camera: [145, 170], speaker: [85, 105], diagnostic: [25,25] },
    { name: "iPhone 16 Pro", mfg: "Apple", series: "iPhone 16", screenPremium: [480, 530], screenValue: [195, 225], battery: [95, 115], chargeport: [150, 170], camera: [140, 165], speaker: [85, 105], diagnostic: [25,25] },
    { name: "iPhone 16 Plus", mfg: "Apple", series: "iPhone 16", screenPremium: [380, 420], screenValue: [155, 180], battery: [90, 110], chargeport: [140, 160], camera: [115, 140], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 16", mfg: "Apple", series: "iPhone 16", screenPremium: [350, 390], screenValue: [145, 170], battery: [90, 110], chargeport: [140, 160], camera: [110, 135], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 15 Pro Max", mfg: "Apple", series: "iPhone 15", screenPremium: [440, 485], screenValue: [180, 210], battery: [90, 110], chargeport: [140, 160], camera: [125, 150], speaker: [85, 100], diagnostic: [25,25] },
    { name: "iPhone 15 Pro", mfg: "Apple", series: "iPhone 15", screenPremium: [420, 465], screenValue: [170, 200], battery: [90, 110], chargeport: [140, 160], camera: [120, 145], speaker: [85, 100], diagnostic: [25,25] },
    { name: "iPhone 15 Plus", mfg: "Apple", series: "iPhone 15", screenPremium: [330, 365], screenValue: [140, 165], battery: [90, 110], chargeport: [135, 155], camera: [105, 130], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 15", mfg: "Apple", series: "iPhone 15", screenPremium: [320, 355], screenValue: [135, 160], battery: [90, 110], chargeport: [135, 155], camera: [100, 125], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 14 Pro Max", mfg: "Apple", series: "iPhone 14", screenPremium: [380, 420], screenValue: [155, 185], battery: [85, 105], chargeport: [135, 155], camera: [115, 140], speaker: [85, 100], diagnostic: [25,25] },
    { name: "iPhone 14 Pro", mfg: "Apple", series: "iPhone 14", screenPremium: [360, 395], screenValue: [145, 175], battery: [85, 105], chargeport: [135, 155], camera: [110, 135], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 14 Plus", mfg: "Apple", series: "iPhone 14", screenPremium: [310, 345], screenValue: [130, 155], battery: [85, 105], chargeport: [130, 150], camera: [100, 125], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 14", mfg: "Apple", series: "iPhone 14", screenPremium: [300, 335], screenValue: [125, 150], battery: [85, 105], chargeport: [130, 150], camera: [95, 120], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 13 Pro Max", mfg: "Apple", series: "iPhone 13", screenPremium: [330, 365], screenValue: [140, 170], battery: [85, 105], chargeport: [130, 150], camera: [110, 135], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 13 Pro", mfg: "Apple", series: "iPhone 13", screenPremium: [310, 345], screenValue: [130, 160], battery: [85, 105], chargeport: [130, 150], camera: [105, 130], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 13", mfg: "Apple", series: "iPhone 13", screenPremium: [245, 275], screenValue: [95, 120], battery: [85, 105], chargeport: [130, 150], camera: [95, 120], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 13 mini", mfg: "Apple", series: "iPhone 13", screenPremium: [235, 265], screenValue: [90, 115], battery: [80, 100], chargeport: [125, 145], camera: [90, 115], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 12 Pro Max", mfg: "Apple", series: "iPhone 12", screenPremium: [300, 335], screenValue: [125, 150], battery: [80, 100], chargeport: [130, 150], camera: [100, 125], speaker: [80, 95], diagnostic: [25,25] },
    { name: "iPhone 12 Pro", mfg: "Apple", series: "iPhone 12", screenPremium: [280, 315], screenValue: [115, 140], battery: [80, 100], chargeport: [130, 150], camera: [95, 120], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 12", mfg: "Apple", series: "iPhone 12", screenPremium: [235, 265], screenValue: [90, 115], battery: [80, 100], chargeport: [125, 145], camera: [85, 110], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 12 mini", mfg: "Apple", series: "iPhone 12", screenPremium: [225, 255], screenValue: [85, 110], battery: [75, 95], chargeport: [120, 140], camera: [80, 105], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 11 Pro Max", mfg: "Apple", series: "iPhone 11", screenPremium: [265, 300], screenValue: [110, 135], battery: [75, 95], chargeport: [130, 150], camera: [90, 115], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 11 Pro", mfg: "Apple", series: "iPhone 11", screenPremium: [255, 290], screenValue: [105, 130], battery: [75, 95], chargeport: [130, 150], camera: [85, 110], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone 11", mfg: "Apple", series: "iPhone 11", screenPremium: [200, 230], screenValue: [75, 95], battery: [75, 95], chargeport: [135, 155], camera: [85, 110], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone XS Max", mfg: "Apple", series: "iPhone X", screenPremium: [190, 220], screenValue: [70, 90], battery: [75, 95], chargeport: [125, 145], camera: [80, 105], speaker: [70, 85], diagnostic: [25,25] },
    { name: "iPhone XS", mfg: "Apple", series: "iPhone X", screenPremium: [190, 220], screenValue: [70, 90], battery: [75, 95], chargeport: [125, 145], camera: [80, 105], speaker: [70, 85], diagnostic: [25,25] },
    { name: "iPhone XR", mfg: "Apple", series: "iPhone X", screenPremium: [180, 210], screenValue: [65, 85], battery: [75, 95], chargeport: [135, 155], camera: [85, 110], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone X", mfg: "Apple", series: "iPhone X", screenPremium: [180, 210], screenValue: [65, 85], battery: [75, 95], chargeport: [125, 145], camera: [80, 105], speaker: [70, 85], diagnostic: [25,25] },
    { name: "iPhone SE (4th Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [160, 190], screenValue: [60, 80], battery: [75, 95], chargeport: [120, 140], camera: [80, 105], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone SE (3rd Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [150, 180], screenValue: [55, 75], battery: [75, 95], chargeport: [120, 140], camera: [75, 100], speaker: [75, 90], diagnostic: [25,25] },
    { name: "iPhone SE (2nd Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [140, 170], screenValue: [50, 70], battery: [70, 90], chargeport: [120, 140], camera: [70, 95], speaker: [70, 85], diagnostic: [25,25] },
    { name: "iPhone SE (1st Gen)", mfg: "Apple", series: "iPhone SE", screenPremium: [95, 120], screenValue: [35, 50], battery: [60, 80], chargeport: [100, 120], camera: [55, 75], speaker: [65, 80], diagnostic: [25,25] },
    { name: "iPhone 8 Plus", mfg: "Apple", series: "Legacy", screenPremium: [125, 155], screenValue: [45, 65], battery: [70, 90], chargeport: [115, 135], camera: [65, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "iPhone 8", mfg: "Apple", series: "Legacy", screenPremium: [115, 140], screenValue: [40, 55], battery: [65, 85], chargeport: [110, 130], camera: [60, 80], speaker: [65, 80], diagnostic: [25,25] },
    { name: "iPhone 7 Plus", mfg: "Apple", series: "Legacy", screenPremium: [115, 140], screenValue: [40, 55], battery: [60, 80], chargeport: [105, 125], camera: [55, 75], speaker: [60, 75], diagnostic: [25,25] },
    { name: "iPhone 7", mfg: "Apple", series: "Legacy", screenPremium: [105, 130], screenValue: [35, 50], battery: [55, 75], chargeport: [100, 120], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "iPhone 6s Plus", mfg: "Apple", series: "Legacy", screenPremium: [95, 120], screenValue: [30, 45], battery: [55, 75], chargeport: [100, 120], camera: [50, 70], speaker: [55, 70], diagnostic: [25,25] },
    { name: "iPhone 6s", mfg: "Apple", series: "Legacy", screenPremium: [95, 120], screenValue: [30, 45], battery: [50, 70], chargeport: [95, 115], camera: [50, 70], speaker: [55, 70], diagnostic: [25,25] },
    { name: "iPhone 6 Plus", mfg: "Apple", series: "Legacy", screenPremium: [95, 120], screenValue: [30, 45], battery: [50, 70], chargeport: [95, 115], camera: [50, 70], speaker: [55, 70], diagnostic: [25,25] },
    { name: "iPhone 6", mfg: "Apple", series: "Legacy", screenPremium: [85, 110], screenValue: [25, 40], battery: [45, 65], chargeport: [90, 110], camera: [45, 65], speaker: [55, 70], diagnostic: [25,25] },
    { name: "iPhone 5s", mfg: "Apple", series: "Legacy", screenPremium: [65, 85], screenValue: [20, 30], battery: [40, 55], chargeport: [80, 100], camera: [40, 55], speaker: [50, 65], diagnostic: [25,25] },
    { name: "iPhone 5c", mfg: "Apple", series: "Legacy", screenPremium: [65, 85], screenValue: [20, 30], battery: [40, 55], chargeport: [80, 100], camera: [40, 55], speaker: [50, 65], diagnostic: [25,25] },
    { name: "iPhone 5", mfg: "Apple", series: "Legacy", screenPremium: [60, 80], screenValue: [18, 28], battery: [38, 52], chargeport: [75, 95], camera: [38, 52], speaker: [50, 65], diagnostic: [25,25] },
    { name: "iPhone 4s", mfg: "Apple", series: "Legacy", screenPremium: [55, 75], screenValue: [18, 28], battery: [35, 48], chargeport: [70, 90], camera: [35, 48], speaker: [45, 60], diagnostic: [25,25] },
    { name: "iPhone 4", mfg: "Apple", series: "Legacy", screenPremium: [55, 75], screenValue: [18, 28], battery: [35, 48], chargeport: [70, 90], camera: [35, 48], speaker: [45, 60], diagnostic: [25,25] },
    { name: "Original iPhone", mfg: "Apple", series: "Legacy", screenPremium: [70, 90], screenValue: [25, 40], battery: [35, 48], chargeport: [70, 90], camera: [35, 48], speaker: [45, 60], diagnostic: [25,25] },

    // ========== SAMSUNG ==========
    { name: "Galaxy S26 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [490, 550], screenValue: [200, 240], battery: [110, 130], chargeport: [155, 180], camera: [165, 195], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy S26+", mfg: "Samsung", series: "Galaxy S", screenPremium: [450, 505], screenValue: [185, 220], battery: [110, 130], chargeport: [150, 175], camera: [155, 185], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy S26", mfg: "Samsung", series: "Galaxy S", screenPremium: [400, 450], screenValue: [165, 200], battery: [105, 125], chargeport: [145, 170], camera: [145, 175], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S25 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [490, 550], screenValue: [200, 240], battery: [110, 130], chargeport: [155, 180], camera: [160, 190], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy S25+", mfg: "Samsung", series: "Galaxy S", screenPremium: [430, 485], screenValue: [175, 210], battery: [110, 130], chargeport: [150, 175], camera: [150, 180], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy S25", mfg: "Samsung", series: "Galaxy S", screenPremium: [375, 420], screenValue: [155, 185], battery: [105, 125], chargeport: [145, 170], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S24 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [475, 535], screenValue: [190, 230], battery: [105, 125], chargeport: [150, 175], camera: [155, 185], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy S24+", mfg: "Samsung", series: "Galaxy S", screenPremium: [420, 470], screenValue: [170, 205], battery: [105, 125], chargeport: [145, 170], camera: [145, 175], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S24", mfg: "Samsung", series: "Galaxy S", screenPremium: [375, 420], screenValue: [155, 185], battery: [105, 125], chargeport: [145, 170], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S24 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [310, 350], screenValue: [130, 155], battery: [100, 120], chargeport: [135, 160], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S23 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [440, 495], screenValue: [175, 210], battery: [105, 125], chargeport: [140, 165], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S23+", mfg: "Samsung", series: "Galaxy S", screenPremium: [390, 440], screenValue: [160, 190], battery: [105, 125], chargeport: [140, 165], camera: [135, 165], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S23", mfg: "Samsung", series: "Galaxy S", screenPremium: [345, 390], screenValue: [140, 170], battery: [105, 125], chargeport: [135, 160], camera: [125, 155], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S23 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [310, 350], screenValue: [130, 155], battery: [100, 120], chargeport: [135, 160], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S22 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [390, 440], screenValue: [160, 190], battery: [105, 125], chargeport: [135, 160], camera: [125, 155], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S22+", mfg: "Samsung", series: "Galaxy S", screenPremium: [360, 405], screenValue: [145, 175], battery: [105, 125], chargeport: [135, 160], camera: [120, 150], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy S22", mfg: "Samsung", series: "Galaxy S", screenPremium: [325, 365], screenValue: [135, 160], battery: [105, 125], chargeport: [135, 160], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S21 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [365, 410], screenValue: [150, 180], battery: [105, 125], chargeport: [135, 160], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S21+", mfg: "Samsung", series: "Galaxy S", screenPremium: [340, 385], screenValue: [140, 165], battery: [105, 125], chargeport: [135, 160], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S21", mfg: "Samsung", series: "Galaxy S", screenPremium: [310, 350], screenValue: [130, 155], battery: [105, 125], chargeport: [135, 160], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S21 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [265, 300], screenValue: [110, 135], battery: [100, 120], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy S20 Ultra", mfg: "Samsung", series: "Galaxy S", screenPremium: [320, 360], screenValue: [130, 160], battery: [105, 125], chargeport: [125, 150], camera: [110, 140], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S20+", mfg: "Samsung", series: "Galaxy S", screenPremium: [295, 335], screenValue: [120, 150], battery: [105, 125], chargeport: [120, 145], camera: [105, 135], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S20", mfg: "Samsung", series: "Galaxy S", screenPremium: [280, 320], screenValue: [115, 140], battery: [105, 125], chargeport: [120, 145], camera: [105, 135], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy S20 FE", mfg: "Samsung", series: "Galaxy S", screenPremium: [245, 280], screenValue: [100, 125], battery: [100, 120], chargeport: [115, 140], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy S10", mfg: "Samsung", series: "Galaxy S", screenPremium: [225, 260], screenValue: [90, 110], battery: [95, 115], chargeport: [110, 135], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy S9", mfg: "Samsung", series: "Galaxy S", screenPremium: [190, 225], screenValue: [75, 95], battery: [90, 110], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy S8", mfg: "Samsung", series: "Galaxy S", screenPremium: [180, 215], screenValue: [70, 90], battery: [85, 105], chargeport: [100, 125], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy S7", mfg: "Samsung", series: "Galaxy S", screenPremium: [145, 175], screenValue: [55, 75], battery: [75, 95], chargeport: [90, 110], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy S6", mfg: "Samsung", series: "Galaxy S", screenPremium: [130, 160], screenValue: [50, 70], battery: [70, 90], chargeport: [85, 105], camera: [60, 85], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy S5", mfg: "Samsung", series: "Galaxy S", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [80, 100], camera: [55, 80], speaker: [55, 70], diagnostic: [25,25] },
    { name: "Galaxy S4", mfg: "Samsung", series: "Galaxy S", screenPremium: [105, 135], screenValue: [40, 55], battery: [60, 80], chargeport: [75, 95], camera: [50, 70], speaker: [55, 70], diagnostic: [25,25] },
    { name: "Galaxy S3", mfg: "Samsung", series: "Galaxy S", screenPremium: [95, 120], screenValue: [35, 50], battery: [55, 75], chargeport: [70, 90], camera: [45, 65], speaker: [55, 70], diagnostic: [25,25] },
    { name: "Galaxy S2", mfg: "Samsung", series: "Galaxy S", screenPremium: [85, 110], screenValue: [30, 45], battery: [50, 70], chargeport: [65, 85], camera: [40, 60], speaker: [50, 65], diagnostic: [25,25] },
    { name: "Galaxy S", mfg: "Samsung", series: "Galaxy S", screenPremium: [85, 110], screenValue: [30, 45], battery: [50, 70], chargeport: [65, 85], camera: [40, 60], speaker: [50, 65], diagnostic: [25,25] },

    // Galaxy Z series (foldables)
    { name: "Galaxy Z Fold 7", mfg: "Samsung", series: "Galaxy Z", screenPremium: [680, 760], screenValue: [280, 325], battery: [120, 140], chargeport: [165, 190], camera: [180, 215], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 6", mfg: "Samsung", series: "Galaxy Z", screenPremium: [650, 730], screenValue: [270, 315], battery: [115, 140], chargeport: [160, 185], camera: [175, 205], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 5", mfg: "Samsung", series: "Galaxy Z", screenPremium: [640, 715], screenValue: [265, 305], battery: [115, 140], chargeport: [160, 185], camera: [170, 200], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 4", mfg: "Samsung", series: "Galaxy Z", screenPremium: [600, 675], screenValue: [250, 290], battery: [110, 135], chargeport: [150, 175], camera: [160, 190], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 3", mfg: "Samsung", series: "Galaxy Z", screenPremium: [565, 635], screenValue: [235, 275], battery: [105, 130], chargeport: [140, 165], camera: [150, 180], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy Z Fold 2", mfg: "Samsung", series: "Galaxy Z", screenPremium: [530, 600], screenValue: [220, 260], battery: [105, 130], chargeport: [140, 165], camera: [140, 170], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Galaxy Z Fold", mfg: "Samsung", series: "Galaxy Z", screenPremium: [500, 570], screenValue: [210, 250], battery: [100, 125], chargeport: [135, 160], camera: [130, 160], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 7", mfg: "Samsung", series: "Galaxy Z", screenPremium: [555, 625], screenValue: [230, 270], battery: [110, 135], chargeport: [155, 180], camera: [155, 185], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 6", mfg: "Samsung", series: "Galaxy Z", screenPremium: [530, 600], screenValue: [220, 260], battery: [105, 130], chargeport: [150, 175], camera: [150, 180], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 5", mfg: "Samsung", series: "Galaxy Z", screenPremium: [500, 570], screenValue: [210, 250], battery: [105, 130], chargeport: [150, 175], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 4", mfg: "Samsung", series: "Galaxy Z", screenPremium: [475, 540], screenValue: [200, 240], battery: [100, 125], chargeport: [140, 165], camera: [130, 160], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 3", mfg: "Samsung", series: "Galaxy Z", screenPremium: [450, 515], screenValue: [190, 230], battery: [100, 125], chargeport: [135, 160], camera: [125, 155], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy Z Flip 2", mfg: "Samsung", series: "Galaxy Z", screenPremium: [435, 500], screenValue: [185, 220], battery: [95, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy Z Flip", mfg: "Samsung", series: "Galaxy Z", screenPremium: [415, 475], screenValue: [175, 210], battery: [95, 120], chargeport: [130, 155], camera: [110, 140], speaker: [75, 95], diagnostic: [25,25] },

    // Galaxy Note series
    { name: "Galaxy Note20 Ultra", mfg: "Samsung", series: "Galaxy Note", screenPremium: [485, 550], screenValue: [200, 240], battery: [110, 130], chargeport: [135, 160], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Note20", mfg: "Samsung", series: "Galaxy Note", screenPremium: [435, 500], screenValue: [180, 215], battery: [105, 125], chargeport: [130, 155], camera: [130, 160], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Galaxy Note10+", mfg: "Samsung", series: "Galaxy Note", screenPremium: [400, 460], screenValue: [165, 200], battery: [105, 125], chargeport: [130, 155], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy Note10", mfg: "Samsung", series: "Galaxy Note", screenPremium: [375, 435], screenValue: [155, 185], battery: [105, 125], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Galaxy Note10 Lite", mfg: "Samsung", series: "Galaxy Note", screenPremium: [340, 395], screenValue: [140, 170], battery: [100, 120], chargeport: [125, 150], camera: [105, 135], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Galaxy Note9", mfg: "Samsung", series: "Galaxy Note", screenPremium: [355, 410], screenValue: [145, 175], battery: [100, 120], chargeport: [125, 150], camera: [110, 140], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Galaxy Note8", mfg: "Samsung", series: "Galaxy Note", screenPremium: [320, 370], screenValue: [130, 160], battery: [95, 115], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy Note5", mfg: "Samsung", series: "Galaxy Note", screenPremium: [235, 275], screenValue: [95, 120], battery: [85, 105], chargeport: [105, 130], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Galaxy Note4", mfg: "Samsung", series: "Galaxy Note", screenPremium: [200, 235], screenValue: [80, 105], battery: [75, 95], chargeport: [95, 120], camera: [70, 95], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Galaxy Note3", mfg: "Samsung", series: "Galaxy Note", screenPremium: [180, 215], screenValue: [70, 95], battery: [70, 90], chargeport: [90, 110], camera: [60, 85], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy Note2", mfg: "Samsung", series: "Galaxy Note", screenPremium: [140, 175], screenValue: [55, 75], battery: [60, 80], chargeport: [85, 105], camera: [50, 75], speaker: [55, 70], diagnostic: [25,25] },
    { name: "Galaxy Note", mfg: "Samsung", series: "Galaxy Note", screenPremium: [130, 165], screenValue: [50, 70], battery: [55, 75], chargeport: [80, 100], camera: [45, 65], speaker: [55, 70], diagnostic: [25,25] },

    // Galaxy A series (common mid-range)
    { name: "Galaxy A56", mfg: "Samsung", series: "Galaxy A", screenPremium: [285, 325], screenValue: [120, 145], battery: [100, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Galaxy A36", mfg: "Samsung", series: "Galaxy A", screenPremium: [250, 290], screenValue: [105, 130], battery: [100, 120], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy A26", mfg: "Samsung", series: "Galaxy A", screenPremium: [215, 250], screenValue: [90, 110], battery: [95, 115], chargeport: [120, 145], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A16", mfg: "Samsung", series: "Galaxy A", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 115], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A06", mfg: "Samsung", series: "Galaxy A", screenPremium: [140, 175], screenValue: [55, 75], battery: [75, 95], chargeport: [100, 125], camera: [70, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A25", mfg: "Samsung", series: "Galaxy A", screenPremium: [215, 250], screenValue: [90, 110], battery: [95, 115], chargeport: [120, 145], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A24", mfg: "Samsung", series: "Galaxy A", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A15", mfg: "Samsung", series: "Galaxy A", screenPremium: [180, 215], screenValue: [75, 95], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A14", mfg: "Samsung", series: "Galaxy A", screenPremium: [180, 215], screenValue: [75, 95], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A13", mfg: "Samsung", series: "Galaxy A", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A12", mfg: "Samsung", series: "Galaxy A", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A11", mfg: "Samsung", series: "Galaxy A", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A10", mfg: "Samsung", series: "Galaxy A", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy A54", mfg: "Samsung", series: "Galaxy A", screenPremium: [285, 325], screenValue: [120, 145], battery: [100, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Galaxy A53", mfg: "Samsung", series: "Galaxy A", screenPremium: [265, 300], screenValue: [110, 135], battery: [95, 115], chargeport: [125, 150], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy A52", mfg: "Samsung", series: "Galaxy A", screenPremium: [245, 280], screenValue: [100, 125], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy A51", mfg: "Samsung", series: "Galaxy A", screenPremium: [225, 260], screenValue: [90, 110], battery: [90, 110], chargeport: [120, 145], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A50", mfg: "Samsung", series: "Galaxy A", screenPremium: [210, 245], screenValue: [85, 105], battery: [90, 110], chargeport: [120, 145], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Galaxy A35", mfg: "Samsung", series: "Galaxy A", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A34", mfg: "Samsung", series: "Galaxy A", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A33", mfg: "Samsung", series: "Galaxy A", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A32", mfg: "Samsung", series: "Galaxy A", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A31", mfg: "Samsung", series: "Galaxy A", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [70, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A30", mfg: "Samsung", series: "Galaxy A", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy A05", mfg: "Samsung", series: "Galaxy A", screenPremium: [135, 165], screenValue: [55, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy A04", mfg: "Samsung", series: "Galaxy A", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy A03", mfg: "Samsung", series: "Galaxy A", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy A02", mfg: "Samsung", series: "Galaxy A", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy A01", mfg: "Samsung", series: "Galaxy A", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // Galaxy M series
    { name: "Galaxy M55", mfg: "Samsung", series: "Galaxy M", screenPremium: [245, 280], screenValue: [100, 125], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy M35", mfg: "Samsung", series: "Galaxy M", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M15", mfg: "Samsung", series: "Galaxy M", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M54", mfg: "Samsung", series: "Galaxy M", screenPremium: [245, 280], screenValue: [100, 125], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy M53", mfg: "Samsung", series: "Galaxy M", screenPremium: [225, 260], screenValue: [90, 110], battery: [95, 115], chargeport: [125, 150], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy M52", mfg: "Samsung", series: "Galaxy M", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M51", mfg: "Samsung", series: "Galaxy M", screenPremium: [170, 200], screenValue: [70, 90], battery: [90, 110], chargeport: [115, 140], camera: [80, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M34", mfg: "Samsung", series: "Galaxy M", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M33", mfg: "Samsung", series: "Galaxy M", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [70, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy M32", mfg: "Samsung", series: "Galaxy M", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy M31", mfg: "Samsung", series: "Galaxy M", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },

    // Galaxy F series
    { name: "Galaxy F55", mfg: "Samsung", series: "Galaxy F", screenPremium: [245, 280], screenValue: [100, 125], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy F54", mfg: "Samsung", series: "Galaxy F", screenPremium: [225, 260], screenValue: [90, 110], battery: [95, 115], chargeport: [125, 150], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy F23", mfg: "Samsung", series: "Galaxy F", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy F22", mfg: "Samsung", series: "Galaxy F", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [70, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy F12", mfg: "Samsung", series: "Galaxy F", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy F41", mfg: "Samsung", series: "Galaxy F", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },

    // Galaxy XCover series
    { name: "Galaxy XCover 7", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [225, 260], screenValue: [90, 110], battery: [95, 115], chargeport: [125, 150], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Galaxy XCover 6 Pro", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [190, 225], screenValue: [80, 100], battery: [90, 110], chargeport: [115, 140], camera: [85, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy XCover 5", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [105, 130], camera: [75, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Galaxy XCover 4 Pro", mfg: "Samsung", series: "Galaxy XCover", screenPremium: [150, 180], screenValue: [60, 80], battery: [85, 105], chargeport: [105, 130], camera: [70, 95], speaker: [65, 80], diagnostic: [25,25] },

    // Galaxy J series (legacy budget)
    { name: "Galaxy J7", mfg: "Samsung", series: "Galaxy J", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J6", mfg: "Samsung", series: "Galaxy J", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J5", mfg: "Samsung", series: "Galaxy J", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J4", mfg: "Samsung", series: "Galaxy J", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J3", mfg: "Samsung", series: "Galaxy J", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J2", mfg: "Samsung", series: "Galaxy J", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Galaxy J1", mfg: "Samsung", series: "Galaxy J", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // ========== GOOGLE PIXEL ==========
    { name: "Pixel 10 Pro Fold", mfg: "Google", series: "Pixel Main", screenPremium: [650, 730], screenValue: [270, 315], battery: [115, 140], chargeport: [160, 185], camera: [175, 205], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Pixel 10 Pro XL", mfg: "Google", series: "Pixel Main", screenPremium: [500, 565], screenValue: [205, 240], battery: [105, 125], chargeport: [150, 175], camera: [155, 185], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 10 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [475, 540], screenValue: [195, 230], battery: [100, 120], chargeport: [145, 170], camera: [150, 180], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 10", mfg: "Google", series: "Pixel Main", screenPremium: [420, 475], screenValue: [170, 200], battery: [95, 115], chargeport: [140, 165], camera: [135, 165], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 9 Pro Fold", mfg: "Google", series: "Pixel Main", screenPremium: [625, 700], screenValue: [260, 300], battery: [115, 140], chargeport: [155, 180], camera: [170, 200], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Pixel 9 Pro XL", mfg: "Google", series: "Pixel Main", screenPremium: [475, 540], screenValue: [195, 230], battery: [105, 125], chargeport: [150, 175], camera: [150, 180], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 9 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [450, 510], screenValue: [185, 220], battery: [100, 120], chargeport: [145, 170], camera: [145, 175], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 9", mfg: "Google", series: "Pixel Main", screenPremium: [400, 450], screenValue: [165, 200], battery: [95, 115], chargeport: [140, 165], camera: [135, 165], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 8 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [375, 420], screenValue: [155, 185], battery: [95, 115], chargeport: [135, 160], camera: [130, 160], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Pixel 8", mfg: "Google", series: "Pixel Main", screenPremium: [320, 360], screenValue: [130, 160], battery: [90, 110], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Pixel 7 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [130, 155], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Pixel 7", mfg: "Google", series: "Pixel Main", screenPremium: [285, 325], screenValue: [115, 140], battery: [85, 105], chargeport: [125, 150], camera: [105, 135], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Pixel 6 Pro", mfg: "Google", series: "Pixel Main", screenPremium: [320, 360], screenValue: [130, 160], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Pixel 6", mfg: "Google", series: "Pixel Main", screenPremium: [285, 325], screenValue: [115, 140], battery: [85, 105], chargeport: [125, 150], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Pixel 5", mfg: "Google", series: "Pixel Main", screenPremium: [265, 300], screenValue: [105, 130], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Pixel 4 XL", mfg: "Google", series: "Pixel Main", screenPremium: [245, 280], screenValue: [100, 125], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Pixel 4", mfg: "Google", series: "Pixel Main", screenPremium: [225, 260], screenValue: [90, 110], battery: [80, 100], chargeport: [115, 140], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Pixel 3 XL", mfg: "Google", series: "Pixel Main", screenPremium: [210, 245], screenValue: [85, 105], battery: [80, 100], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Pixel 3", mfg: "Google", series: "Pixel Main", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Pixel 2 XL", mfg: "Google", series: "Pixel Main", screenPremium: [180, 210], screenValue: [70, 90], battery: [75, 95], chargeport: [110, 135], camera: [80, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Pixel 2", mfg: "Google", series: "Pixel Main", screenPremium: [170, 200], screenValue: [65, 85], battery: [75, 95], chargeport: [110, 135], camera: [80, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Pixel XL", mfg: "Google", series: "Pixel Main", screenPremium: [155, 185], screenValue: [60, 75], battery: [70, 90], chargeport: [105, 130], camera: [70, 95], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Pixel", mfg: "Google", series: "Pixel Main", screenPremium: [155, 185], screenValue: [60, 75], battery: [70, 90], chargeport: [105, 130], camera: [70, 95], speaker: [60, 80], diagnostic: [25,25] },

    // Pixel A series
    { name: "Pixel 10a", mfg: "Google", series: "Pixel A", screenPremium: [320, 360], screenValue: [130, 160], battery: [90, 110], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Pixel 9a", mfg: "Google", series: "Pixel A", screenPremium: [285, 325], screenValue: [115, 140], battery: [90, 110], chargeport: [130, 155], camera: [105, 135], speaker: [75, 90], diagnostic: [25,25] },
    { name: "Pixel 8a", mfg: "Google", series: "Pixel A", screenPremium: [260, 295], screenValue: [105, 130], battery: [85, 105], chargeport: [125, 150], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Pixel 7a", mfg: "Google", series: "Pixel A", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [120, 145], camera: [90, 120], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Pixel 6a", mfg: "Google", series: "Pixel A", screenPremium: [210, 245], screenValue: [85, 105], battery: [85, 105], chargeport: [120, 145], camera: [85, 115], speaker: [70, 85], diagnostic: [25,25] },
    { name: "Pixel 5a", mfg: "Google", series: "Pixel A", screenPremium: [195, 225], screenValue: [80, 100], battery: [80, 100], chargeport: [115, 140], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Pixel 4a 5G", mfg: "Google", series: "Pixel A", screenPremium: [180, 210], screenValue: [70, 90], battery: [80, 100], chargeport: [115, 140], camera: [75, 105], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Pixel 4a", mfg: "Google", series: "Pixel A", screenPremium: [165, 195], screenValue: [65, 80], battery: [75, 95], chargeport: [110, 135], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Pixel 3a XL", mfg: "Google", series: "Pixel A", screenPremium: [165, 195], screenValue: [65, 80], battery: [75, 95], chargeport: [110, 135], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Pixel 3a", mfg: "Google", series: "Pixel A", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [110, 135], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },

    // ========== MOTOROLA ==========
    { name: "Edge 70 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [400, 450], screenValue: [165, 200], battery: [100, 120], chargeport: [135, 160], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Edge 70 Pro", mfg: "Motorola", series: "Edge", screenPremium: [375, 420], screenValue: [155, 185], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 70 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [125, 150], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 60 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [390, 435], screenValue: [160, 190], battery: [95, 115], chargeport: [130, 155], camera: [135, 165], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Edge 60 Pro", mfg: "Motorola", series: "Edge", screenPremium: [355, 400], screenValue: [145, 175], battery: [90, 110], chargeport: [125, 150], camera: [125, 155], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 50 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [125, 150], camera: [120, 150], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 50 Pro", mfg: "Motorola", series: "Edge", screenPremium: [310, 350], screenValue: [130, 155], battery: [85, 105], chargeport: [120, 145], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 50 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [285, 325], screenValue: [115, 140], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 40 Pro", mfg: "Motorola", series: "Edge", screenPremium: [340, 385], screenValue: [140, 170], battery: [85, 105], chargeport: [120, 145], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 40", mfg: "Motorola", series: "Edge", screenPremium: [310, 350], screenValue: [130, 155], battery: [85, 105], chargeport: [120, 145], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 40 Neo", mfg: "Motorola", series: "Edge", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [115, 140], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 30 Ultra", mfg: "Motorola", series: "Edge", screenPremium: [320, 360], screenValue: [130, 160], battery: [85, 105], chargeport: [120, 145], camera: [110, 140], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge 30 Fusion", mfg: "Motorola", series: "Edge", screenPremium: [285, 325], screenValue: [115, 140], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 30 Neo", mfg: "Motorola", series: "Edge", screenPremium: [235, 270], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Edge 30", mfg: "Motorola", series: "Edge", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [110, 135], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Edge 20 Pro", mfg: "Motorola", series: "Edge", screenPremium: [285, 325], screenValue: [115, 140], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Edge 20", mfg: "Motorola", series: "Edge", screenPremium: [235, 270], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Edge 20 Lite", mfg: "Motorola", series: "Edge", screenPremium: [200, 230], screenValue: [85, 105], battery: [75, 95], chargeport: [105, 130], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Edge Plus 2023", mfg: "Motorola", series: "Edge", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Edge Plus 2022", mfg: "Motorola", series: "Edge", screenPremium: [310, 350], screenValue: [130, 155], battery: [85, 105], chargeport: [120, 145], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },

    // Razr series
    { name: "Razr 70 / Ultra (2026)", mfg: "Motorola", series: "Razr", screenPremium: [555, 625], screenValue: [230, 270], battery: [110, 135], chargeport: [155, 180], camera: [155, 185], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Razr 60 / Ultra (2025)", mfg: "Motorola", series: "Razr", screenPremium: [500, 565], screenValue: [210, 245], battery: [105, 130], chargeport: [150, 175], camera: [145, 175], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Razr 50 / Razr+ 2024", mfg: "Motorola", series: "Razr", screenPremium: [475, 540], screenValue: [200, 235], battery: [100, 125], chargeport: [145, 170], camera: [135, 165], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Razr 2023", mfg: "Motorola", series: "Razr", screenPremium: [435, 495], screenValue: [185, 215], battery: [95, 120], chargeport: [140, 165], camera: [125, 155], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Razr 2022", mfg: "Motorola", series: "Razr", screenPremium: [400, 460], screenValue: [170, 200], battery: [90, 115], chargeport: [130, 155], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },

    // Moto G series
    { name: "Moto G86", mfg: "Motorola", series: "Moto G", screenPremium: [245, 280], screenValue: [100, 125], battery: [90, 110], chargeport: [115, 140], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Moto G76", mfg: "Motorola", series: "Moto G", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G56", mfg: "Motorola", series: "Moto G", screenPremium: [190, 225], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G26", mfg: "Motorola", series: "Moto G", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G85", mfg: "Motorola", series: "Moto G", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G84", mfg: "Motorola", series: "Moto G", screenPremium: [190, 225], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G75", mfg: "Motorola", series: "Moto G", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G73", mfg: "Motorola", series: "Moto G", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G71", mfg: "Motorola", series: "Moto G", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G70", mfg: "Motorola", series: "Moto G", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G64", mfg: "Motorola", series: "Moto G", screenPremium: [190, 225], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G63", mfg: "Motorola", series: "Moto G", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G62", mfg: "Motorola", series: "Moto G", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G60", mfg: "Motorola", series: "Moto G", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G54", mfg: "Motorola", series: "Moto G", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G53", mfg: "Motorola", series: "Moto G", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G52", mfg: "Motorola", series: "Moto G", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G51", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G50", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G34", mfg: "Motorola", series: "Moto G", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G33", mfg: "Motorola", series: "Moto G", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G32", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G31", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G30", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto G24", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G23", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G22", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto G21", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto G20", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto G14", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G13", mfg: "Motorola", series: "Moto G", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G12", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto G10", mfg: "Motorola", series: "Moto G", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },

    // Moto G Stylus (yearly)
    { name: "Moto G Stylus (2026)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [285, 325], screenValue: [115, 140], battery: [90, 110], chargeport: [115, 140], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Moto G Stylus (2025)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [110, 135], camera: [100, 130], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G Stylus (2024)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [245, 280], screenValue: [100, 125], battery: [85, 105], chargeport: [110, 135], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G Stylus (2023)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Stylus (2022)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [200, 230], screenValue: [85, 105], battery: [80, 100], chargeport: [105, 130], camera: [85, 115], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Stylus (2021)", mfg: "Motorola", series: "Moto G Stylus", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },

    // Moto G Power (yearly)
    { name: "Moto G Power (2026)", mfg: "Motorola", series: "Moto G Power", screenPremium: [245, 280], screenValue: [100, 125], battery: [90, 110], chargeport: [115, 140], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Moto G Power (2025)", mfg: "Motorola", series: "Moto G Power", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G Power (2024)", mfg: "Motorola", series: "Moto G Power", screenPremium: [190, 225], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G Power (2023)", mfg: "Motorola", series: "Moto G Power", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Power (2022)", mfg: "Motorola", series: "Moto G Power", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Power (2021)", mfg: "Motorola", series: "Moto G Power", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },

    // Moto G Play (yearly)
    { name: "Moto G Play (2026)", mfg: "Motorola", series: "Moto G Play", screenPremium: [200, 230], screenValue: [85, 105], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto G Play (2025)", mfg: "Motorola", series: "Moto G Play", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Play (2024)", mfg: "Motorola", series: "Moto G Play", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Play (2023)", mfg: "Motorola", series: "Moto G Play", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Play (2022)", mfg: "Motorola", series: "Moto G Play", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto G Play (2021)", mfg: "Motorola", series: "Moto G Play", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },

    // Moto E series
    { name: "Moto E24", mfg: "Motorola", series: "Moto E", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto E22", mfg: "Motorola", series: "Moto E", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto E20", mfg: "Motorola", series: "Moto E", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E14", mfg: "Motorola", series: "Moto E", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E13", mfg: "Motorola", series: "Moto E", screenPremium: [105, 135], screenValue: [40, 55], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E12", mfg: "Motorola", series: "Moto E", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E7", mfg: "Motorola", series: "Moto E", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E6", mfg: "Motorola", series: "Moto E", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E5", mfg: "Motorola", series: "Moto E", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Moto E4", mfg: "Motorola", series: "Moto E", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // Moto Z series
    { name: "Moto Z4", mfg: "Motorola", series: "Moto Z", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto Z3", mfg: "Motorola", series: "Moto Z", screenPremium: [180, 210], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Moto Z2 Force", mfg: "Motorola", series: "Moto Z", screenPremium: [210, 245], screenValue: [85, 105], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto Z2 Play", mfg: "Motorola", series: "Moto Z", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Moto Z", mfg: "Motorola", series: "Moto Z", screenPremium: [180, 210], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },

    // One series
    { name: "One 5G", mfg: "Motorola", series: "One", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "One Vision", mfg: "Motorola", series: "One", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "One Fusion", mfg: "Motorola", series: "One", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "One Macro", mfg: "Motorola", series: "One", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },

    // ========== ONEPLUS ==========
    { name: "OnePlus 13", mfg: "OnePlus", series: "Number", screenPremium: [440, 495], screenValue: [175, 210], battery: [105, 125], chargeport: [135, 160], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "OnePlus 13R", mfg: "OnePlus", series: "Number", screenPremium: [365, 410], screenValue: [145, 175], battery: [100, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus 12", mfg: "OnePlus", series: "Number", screenPremium: [420, 470], screenValue: [170, 200], battery: [100, 120], chargeport: [130, 155], camera: [130, 160], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus 12R", mfg: "OnePlus", series: "Number", screenPremium: [345, 390], screenValue: [140, 170], battery: [100, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus 11", mfg: "OnePlus", series: "Number", screenPremium: [390, 440], screenValue: [160, 190], battery: [100, 120], chargeport: [130, 155], camera: [125, 155], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus 10 Pro", mfg: "OnePlus", series: "Number", screenPremium: [365, 410], screenValue: [150, 180], battery: [100, 120], chargeport: [130, 155], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus 10T", mfg: "OnePlus", series: "Number", screenPremium: [340, 385], screenValue: [140, 170], battery: [95, 115], chargeport: [125, 150], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 10R", mfg: "OnePlus", series: "Number", screenPremium: [300, 340], screenValue: [120, 145], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 9 Pro", mfg: "OnePlus", series: "Number", screenPremium: [340, 385], screenValue: [140, 170], battery: [95, 115], chargeport: [125, 150], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 9", mfg: "OnePlus", series: "Number", screenPremium: [300, 340], screenValue: [120, 145], battery: [95, 115], chargeport: [125, 150], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 9RT", mfg: "OnePlus", series: "Number", screenPremium: [325, 365], screenValue: [130, 160], battery: [95, 115], chargeport: [125, 150], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 9R", mfg: "OnePlus", series: "Number", screenPremium: [285, 325], screenValue: [115, 140], battery: [90, 110], chargeport: [120, 145], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus 8 Pro", mfg: "OnePlus", series: "Number", screenPremium: [320, 360], screenValue: [130, 160], battery: [95, 115], chargeport: [125, 150], camera: [105, 135], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus 8", mfg: "OnePlus", series: "Number", screenPremium: [285, 325], screenValue: [115, 140], battery: [90, 110], chargeport: [120, 145], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus 8T", mfg: "OnePlus", series: "Number", screenPremium: [300, 340], screenValue: [120, 145], battery: [90, 110], chargeport: [120, 145], camera: [100, 130], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus 7 Pro", mfg: "OnePlus", series: "Number", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus 7T", mfg: "OnePlus", series: "Number", screenPremium: [245, 280], screenValue: [100, 125], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 7T Pro", mfg: "OnePlus", series: "Number", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus 7", mfg: "OnePlus", series: "Number", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 6T", mfg: "OnePlus", series: "Number", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 6", mfg: "OnePlus", series: "Number", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 5T", mfg: "OnePlus", series: "Number", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 5", mfg: "OnePlus", series: "Number", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 3T", mfg: "OnePlus", series: "Number", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 3", mfg: "OnePlus", series: "Number", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus 2", mfg: "OnePlus", series: "Number", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus One", mfg: "OnePlus", series: "Number", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },

    // Nord series
    { name: "OnePlus Nord 5", mfg: "OnePlus", series: "Nord", screenPremium: [340, 385], screenValue: [140, 170], battery: [95, 115], chargeport: [125, 150], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "OnePlus Nord 4", mfg: "OnePlus", series: "Nord", screenPremium: [300, 340], screenValue: [120, 145], battery: [90, 110], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus Nord 3", mfg: "OnePlus", series: "Nord", screenPremium: [265, 300], screenValue: [110, 135], battery: [90, 110], chargeport: [120, 145], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus Nord 2", mfg: "OnePlus", series: "Nord", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus Nord 1", mfg: "OnePlus", series: "Nord", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 4", mfg: "OnePlus", series: "Nord", screenPremium: [250, 290], screenValue: [105, 130], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 3", mfg: "OnePlus", series: "Nord", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [70, 90], diagnostic: [25,25] },
    { name: "OnePlus Nord CE 2", mfg: "OnePlus", series: "Nord", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus Nord CE", mfg: "OnePlus", series: "Nord", screenPremium: [185, 215], screenValue: [75, 95], battery: [85, 105], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus Nord N30", mfg: "OnePlus", series: "Nord", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus Nord N20", mfg: "OnePlus", series: "Nord", screenPremium: [170, 200], screenValue: [70, 90], battery: [85, 105], chargeport: [110, 135], camera: [75, 105], speaker: [65, 85], diagnostic: [25,25] },
    { name: "OnePlus Nord N10", mfg: "OnePlus", series: "Nord", screenPremium: [155, 185], screenValue: [60, 75], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus Nord N100", mfg: "OnePlus", series: "Nord", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus Nord N200", mfg: "OnePlus", series: "Nord", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "OnePlus Nord N300", mfg: "OnePlus", series: "Nord", screenPremium: [150, 180], screenValue: [60, 80], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },

    // Open series
    { name: "OnePlus Open 2", mfg: "OnePlus", series: "Open", screenPremium: [650, 730], screenValue: [270, 315], battery: [115, 140], chargeport: [160, 185], camera: [175, 205], speaker: [90, 110], diagnostic: [25,25] },
    { name: "OnePlus Open", mfg: "OnePlus", series: "Open", screenPremium: [590, 660], screenValue: [245, 280], battery: [110, 135], chargeport: [150, 175], camera: [160, 190], speaker: [85, 105], diagnostic: [25,25] },

    // ========== XIAOMI ==========
    { name: "Xiaomi 17 Ultra", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [440, 495], screenValue: [175, 210], battery: [105, 125], chargeport: [135, 160], camera: [140, 170], speaker: [80, 100], diagnostic: [25,25] },
    { name: "Xiaomi 17 Pro", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [410, 460], screenValue: [165, 195], battery: [100, 120], chargeport: [130, 155], camera: [130, 160], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Xiaomi 17", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [375, 420], screenValue: [155, 185], battery: [100, 120], chargeport: [130, 155], camera: [125, 155], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Xiaomi 15", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [340, 385], screenValue: [140, 170], battery: [95, 115], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xiaomi 14 Ultra", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [320, 360], screenValue: [130, 160], battery: [95, 115], chargeport: [125, 150], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xiaomi 14", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [285, 325], screenValue: [115, 140], battery: [90, 110], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xiaomi 13", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [265, 300], screenValue: [110, 135], battery: [90, 110], chargeport: [120, 145], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xiaomi 12", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xiaomi 11", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xiaomi 10", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xiaomi 9", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [185, 215], screenValue: [75, 95], battery: [80, 100], chargeport: [110, 135], camera: [75, 105], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xiaomi 8", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 7", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [105, 130], camera: [65, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 6", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [150, 180], screenValue: [60, 80], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 5", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [60, 85], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 4", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [115, 145], screenValue: [45, 60], battery: [75, 95], chargeport: [100, 125], camera: [55, 80], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 3", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [105, 135], screenValue: [40, 55], battery: [75, 95], chargeport: [100, 125], camera: [55, 80], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Xiaomi 2", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Xiaomi 1", mfg: "Xiaomi", series: "Xiaomi", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // Redmi Note series
    { name: "Redmi Note 15 Pro+", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [310, 350], screenValue: [130, 155], battery: [85, 105], chargeport: [115, 140], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Redmi Note 15 Pro", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Redmi Note 14", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [225, 260], screenValue: [90, 110], battery: [85, 105], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Redmi Note 13", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Redmi Note 12", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [190, 225], screenValue: [75, 95], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Redmi Note 11", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [105, 130], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Redmi Note 10", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Redmi Note 9", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [140, 170], screenValue: [55, 75], battery: [75, 95], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Redmi Note 8", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Redmi Note 7", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [100, 125], camera: [60, 85], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi Note 6", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [100, 125], camera: [60, 85], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi Note 5", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi Note 4", mfg: "Xiaomi", series: "Redmi Note", screenPremium: [85, 110], screenValue: [30, 45], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // Redmi C & K series
    { name: "Redmi 14C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [140, 170], screenValue: [55, 75], battery: [75, 95], chargeport: [105, 130], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Redmi 13C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi 12C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi 11C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi 10C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi 9C", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Redmi K80", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [340, 385], screenValue: [140, 170], battery: [95, 115], chargeport: [125, 150], camera: [115, 145], speaker: [75, 95], diagnostic: [25,25] },
    { name: "Redmi K70", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [300, 340], screenValue: [120, 145], battery: [90, 110], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Redmi K60", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [265, 300], screenValue: [110, 135], battery: [90, 110], chargeport: [120, 145], camera: [95, 125], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Redmi K50", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Redmi K40", mfg: "Xiaomi", series: "Redmi C/K", screenPremium: [200, 230], screenValue: [80, 100], battery: [85, 105], chargeport: [115, 140], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },

    // POCO series
    { name: "POCO F8 Pro", mfg: "Xiaomi", series: "POCO", screenPremium: [310, 350], screenValue: [130, 155], battery: [90, 110], chargeport: [120, 145], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "POCO F8", mfg: "Xiaomi", series: "POCO", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "POCO F6", mfg: "Xiaomi", series: "POCO", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "POCO F5", mfg: "Xiaomi", series: "POCO", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "POCO F4", mfg: "Xiaomi", series: "POCO", screenPremium: [185, 215], screenValue: [75, 95], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO F3", mfg: "Xiaomi", series: "POCO", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [110, 135], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO F2", mfg: "Xiaomi", series: "POCO", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO F1", mfg: "Xiaomi", series: "POCO", screenPremium: [140, 170], screenValue: [55, 75], battery: [75, 95], chargeport: [105, 130], camera: [65, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO X7", mfg: "Xiaomi", series: "POCO", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [115, 140], camera: [85, 115], speaker: [65, 85], diagnostic: [25,25] },
    { name: "POCO X6", mfg: "Xiaomi", series: "POCO", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 85], diagnostic: [25,25] },
    { name: "POCO X5", mfg: "Xiaomi", series: "POCO", screenPremium: [185, 215], screenValue: [75, 95], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO X4", mfg: "Xiaomi", series: "POCO", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [110, 135], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO X3", mfg: "Xiaomi", series: "POCO", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO X2", mfg: "Xiaomi", series: "POCO", screenPremium: [140, 170], screenValue: [55, 75], battery: [75, 95], chargeport: [105, 130], camera: [65, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO M6", mfg: "Xiaomi", series: "POCO", screenPremium: [170, 200], screenValue: [70, 90], battery: [80, 100], chargeport: [110, 135], camera: [75, 105], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO M5", mfg: "Xiaomi", series: "POCO", screenPremium: [155, 185], screenValue: [60, 75], battery: [75, 95], chargeport: [105, 130], camera: [70, 100], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO M4", mfg: "Xiaomi", series: "POCO", screenPremium: [140, 170], screenValue: [55, 75], battery: [75, 95], chargeport: [105, 130], camera: [65, 95], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO M3", mfg: "Xiaomi", series: "POCO", screenPremium: [130, 165], screenValue: [50, 70], battery: [75, 95], chargeport: [100, 125], camera: [65, 90], speaker: [65, 80], diagnostic: [25,25] },
    { name: "POCO M2", mfg: "Xiaomi", series: "POCO", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "POCO M1", mfg: "Xiaomi", series: "POCO", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "POCO C75", mfg: "Xiaomi", series: "POCO", screenPremium: [115, 145], screenValue: [45, 60], battery: [70, 90], chargeport: [95, 120], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "POCO C65", mfg: "Xiaomi", series: "POCO", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },
    { name: "POCO C55", mfg: "Xiaomi", series: "POCO", screenPremium: [95, 120], screenValue: [35, 50], battery: [65, 85], chargeport: [90, 110], camera: [50, 70], speaker: [60, 75], diagnostic: [25,25] },

    // Mi Mix series
    { name: "Mi Mix Fold 5", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [650, 730], screenValue: [270, 315], battery: [115, 140], chargeport: [160, 185], camera: [175, 205], speaker: [90, 110], diagnostic: [25,25] },
    { name: "Mi Mix Fold 4", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [600, 675], screenValue: [250, 290], battery: [110, 135], chargeport: [150, 175], camera: [160, 190], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Mi Mix Fold 3", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [565, 635], screenValue: [235, 275], battery: [105, 130], chargeport: [140, 165], camera: [150, 180], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Mi Mix Fold 2", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [530, 600], screenValue: [220, 260], battery: [105, 130], chargeport: [140, 165], camera: [140, 170], speaker: [85, 105], diagnostic: [25,25] },
    { name: "Mi Mix 4", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Mi Mix 3", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [100, 130], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Mi Mix 2", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [110, 135], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Mi Mix 1", mfg: "Xiaomi", series: "Mi Mix", screenPremium: [235, 270], screenValue: [95, 120], battery: [85, 105], chargeport: [110, 135], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },

    // ========== OTHER BRANDS ==========
    // Nokia
    { name: "Nokia G60", mfg: "Nokia", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Nokia G50", mfg: "Nokia", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Nokia G42", mfg: "Nokia", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "Nokia G22", mfg: "Nokia", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia G21", mfg: "Nokia", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia G11", mfg: "Nokia", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [100, 125], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Nokia G10", mfg: "Nokia", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Nokia G100", mfg: "Nokia", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia G300", mfg: "Nokia", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia X30", mfg: "Nokia", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia X20", mfg: "Nokia", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia X10", mfg: "Nokia", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Nokia C32", mfg: "Nokia", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Nokia C22", mfg: "Nokia", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Nokia C12", mfg: "Nokia", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "Nokia C02", mfg: "Nokia", series: "Other", screenPremium: [95, 120], screenValue: [35, 50], battery: [60, 80], chargeport: [85, 105], camera: [45, 60], speaker: [60, 75], diagnostic: [25,25] },

    // TCL
    { name: "TCL 50 XL", mfg: "TCL", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "TCL 50 LE", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 50 XE", mfg: "TCL", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "TCL 40 XL", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 40 XE", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 40 NXTpaper", mfg: "TCL", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "TCL 30 XL", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 30 XE", mfg: "TCL", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "TCL 30 V", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 30 LE", mfg: "TCL", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "TCL 30 T", mfg: "TCL", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "TCL 20 Pro 5G", mfg: "TCL", series: "Other", screenPremium: [255, 290], screenValue: [105, 130], battery: [80, 100], chargeport: [110, 135], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "TCL 20S", mfg: "TCL", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [65, 80], diagnostic: [25,25] },
    { name: "TCL 20 SE", mfg: "TCL", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "TCL 20 R", mfg: "TCL", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "TCL Flip", mfg: "TCL", series: "Other", screenPremium: [95, 120], screenValue: [35, 50], battery: [60, 80], chargeport: [85, 105], camera: [45, 60], speaker: [60, 75], diagnostic: [25,25] },

    // ASUS Zenfone
    { name: "Zenfone 12 Ultra", mfg: "ASUS", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Zenfone 11 Ultra", mfg: "ASUS", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [125, 150], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Zenfone 10", mfg: "ASUS", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [125, 150], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Zenfone 9", mfg: "ASUS", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Zenfone 8", mfg: "ASUS", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [120, 145], camera: [105, 135], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Zenfone 7", mfg: "ASUS", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Zenfone 6", mfg: "ASUS", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Zenfone 5", mfg: "ASUS", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Zenfone 4", mfg: "ASUS", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Zenfone 3", mfg: "ASUS", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Zenfone 2", mfg: "ASUS", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },

    // ASUS ROG Phone
    { name: "ROG Phone 9", mfg: "ASUS", series: "Other", screenPremium: [510, 575], screenValue: [210, 245], battery: [105, 125], chargeport: [140, 165], camera: [150, 180], speaker: [75, 95], diagnostic: [25,25] },
    { name: "ROG Phone 8", mfg: "ASUS", series: "Other", screenPremium: [475, 540], screenValue: [195, 230], battery: [105, 125], chargeport: [140, 165], camera: [140, 170], speaker: [75, 95], diagnostic: [25,25] },
    { name: "ROG Phone 7", mfg: "ASUS", series: "Other", screenPremium: [475, 540], screenValue: [195, 230], battery: [105, 125], chargeport: [140, 165], camera: [140, 170], speaker: [75, 95], diagnostic: [25,25] },
    { name: "ROG Phone 6", mfg: "ASUS", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [105, 125], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "ROG Phone 5", mfg: "ASUS", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [125, 150], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "ROG Phone 3", mfg: "ASUS", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [125, 150], camera: [120, 150], speaker: [70, 90], diagnostic: [25,25] },
    { name: "ROG Phone 2", mfg: "ASUS", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },

    // LG
    { name: "LG V60", mfg: "LG", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "LG V50", mfg: "LG", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "LG V40", mfg: "LG", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [85, 105], chargeport: [120, 145], camera: [105, 135], speaker: [65, 85], diagnostic: [25,25] },
    { name: "LG V35", mfg: "LG", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "LG V30", mfg: "LG", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [115, 140], camera: [90, 120], speaker: [65, 85], diagnostic: [25,25] },
    { name: "LG V20", mfg: "LG", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG V10", mfg: "LG", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [75, 95], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG G8", mfg: "LG", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [85, 105], chargeport: [105, 130], camera: [95, 125], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG G7", mfg: "LG", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG G6", mfg: "LG", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [75, 105], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG G5", mfg: "LG", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [65, 95], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG G4", mfg: "LG", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [65, 95], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG G3", mfg: "LG", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG G2", mfg: "LG", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG G1", mfg: "LG", series: "Other", screenPremium: [95, 120], screenValue: [35, 50], battery: [60, 80], chargeport: [85, 105], camera: [45, 60], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG Stylo 6", mfg: "LG", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG Stylo 5", mfg: "LG", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG Stylo 4", mfg: "LG", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG Stylo 3", mfg: "LG", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG K92", mfg: "LG", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG K51", mfg: "LG", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "LG K42", mfg: "LG", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG K31", mfg: "LG", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },
    { name: "LG K22", mfg: "LG", series: "Other", screenPremium: [115, 145], screenValue: [45, 60], battery: [65, 85], chargeport: [90, 110], camera: [55, 80], speaker: [60, 75], diagnostic: [25,25] },

    // Sony Xperia
    { name: "Xperia 1 VIII", mfg: "Sony", series: "Other", screenPremium: [475, 540], screenValue: [195, 230], battery: [105, 125], chargeport: [140, 165], camera: [140, 170], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 VII", mfg: "Sony", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 VI", mfg: "Sony", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 V", mfg: "Sony", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 IV", mfg: "Sony", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 III", mfg: "Sony", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [125, 150], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 1 II", mfg: "Sony", series: "Other", screenPremium: [390, 435], screenValue: [160, 190], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 1", mfg: "Sony", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 5 VII", mfg: "Sony", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 5 VI", mfg: "Sony", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 5 V", mfg: "Sony", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 5 IV", mfg: "Sony", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia 5 III", mfg: "Sony", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 5 II", mfg: "Sony", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [85, 105], chargeport: [120, 145], camera: [105, 135], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 5", mfg: "Sony", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 VIII", mfg: "Sony", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [120, 145], camera: [105, 135], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 VII", mfg: "Sony", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 VI", mfg: "Sony", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 V", mfg: "Sony", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [80, 100], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 IV", mfg: "Sony", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [115, 140], camera: [95, 125], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Xperia 10 III", mfg: "Sony", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Xperia 10 II", mfg: "Sony", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [105, 130], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Xperia 10", mfg: "Sony", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Xperia Pro-I", mfg: "Sony", series: "Other", screenPremium: [475, 540], screenValue: [195, 230], battery: [105, 125], chargeport: [140, 165], camera: [140, 170], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Xperia Pro", mfg: "Sony", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },

    // Huawei
    { name: "Huawei P60 Pro", mfg: "Huawei", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 165], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei P60", mfg: "Huawei", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [130, 155], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei P50 Pro", mfg: "Huawei", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [130, 155], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei P50", mfg: "Huawei", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei P40 Pro", mfg: "Huawei", series: "Other", screenPremium: [380, 425], screenValue: [150, 180], battery: [95, 115], chargeport: [125, 150], camera: [115, 145], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei P40", mfg: "Huawei", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei P30 Pro", mfg: "Huawei", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei P30", mfg: "Huawei", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [100, 130], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei P20 Pro", mfg: "Huawei", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei P20", mfg: "Huawei", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [110, 135], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei P10", mfg: "Huawei", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Mate 60 Pro", mfg: "Huawei", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [100, 120], chargeport: [135, 160], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei Mate 50 Pro", mfg: "Huawei", series: "Other", screenPremium: [440, 495], screenValue: [175, 210], battery: [95, 115], chargeport: [130, 155], camera: [130, 160], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei Mate 40 Pro", mfg: "Huawei", series: "Other", screenPremium: [410, 460], screenValue: [165, 195], battery: [95, 115], chargeport: [130, 155], camera: [125, 155], speaker: [70, 90], diagnostic: [25,25] },
    { name: "Huawei Mate 30 Pro", mfg: "Huawei", series: "Other", screenPremium: [365, 410], screenValue: [145, 175], battery: [90, 110], chargeport: [125, 150], camera: [115, 145], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei Mate 20 Pro", mfg: "Huawei", series: "Other", screenPremium: [340, 385], screenValue: [140, 170], battery: [90, 110], chargeport: [120, 145], camera: [110, 140], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei Mate 10 Pro", mfg: "Huawei", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [115, 140], camera: [100, 130], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei Nova 11", mfg: "Huawei", series: "Other", screenPremium: [300, 340], screenValue: [120, 145], battery: [85, 105], chargeport: [120, 145], camera: [100, 130], speaker: [65, 85], diagnostic: [25,25] },
    { name: "Huawei Nova 10", mfg: "Huawei", series: "Other", screenPremium: [265, 300], screenValue: [110, 135], battery: [85, 105], chargeport: [115, 140], camera: [95, 125], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 9", mfg: "Huawei", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [115, 140], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 8", mfg: "Huawei", series: "Other", screenPremium: [230, 265], screenValue: [95, 120], battery: [80, 100], chargeport: [115, 140], camera: [85, 115], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 7", mfg: "Huawei", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 6", mfg: "Huawei", series: "Other", screenPremium: [200, 230], screenValue: [80, 100], battery: [80, 100], chargeport: [110, 135], camera: [80, 110], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 5", mfg: "Huawei", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 4", mfg: "Huawei", series: "Other", screenPremium: [170, 200], screenValue: [70, 90], battery: [75, 95], chargeport: [100, 125], camera: [70, 100], speaker: [60, 80], diagnostic: [25,25] },
    { name: "Huawei Nova 3", mfg: "Huawei", series: "Other", screenPremium: [140, 170], screenValue: [55, 75], battery: [70, 90], chargeport: [95, 120], camera: [60, 90], speaker: [60, 75], diagnostic: [25,25] }
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

function hideGifColumn() { return; }

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

// ── EMAIL DEVICE DETECTION ──
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!isMobile) {
    const notListedBtn = document.getElementById('notListedEmailBtn');
    if (notListedBtn) {
        notListedBtn.href = '';
        notListedBtn.onclick = function() {
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=owensrapidtechrepair@gmail.com&su=Custom%20Repair%20Quote%20Request&body=Hi%20Owen!%20I%20need%20a%20repair%20for%20my%20phone.', '_blank');
            return false;
        };
    }

    const contactBtn = document.getElementById('contactEmailBtn');
    if (contactBtn) {
        contactBtn.href = '';
        contactBtn.onclick = function() {
            window.open('https://mail.google.com/mail/?view=cm&fs=1&to=owensrapidtechrepair@gmail.com&su=Repair%20Quote%20Request&body=Hi%20Owen!%20I%20need%20a%20repair%20quote.', '_blank');
            return false;
        };
    }
}

// Upgrade repair card email buttons for desktop after they render
const _origShowRepairOptions = showRepairOptions;
showRepairOptions = function(deviceName) {
    _origShowRepairOptions(deviceName);
    if (!isMobile) {
        setTimeout(function() {
            document.querySelectorAll('.btn-email').forEach(function(btn) {
                const original = btn.getAttribute('href');
                if (original && original.includes('mail.google.com')) return;
                btn.setAttribute('data-mailto', btn.href);
                btn.href = '';
                btn.onclick = function() {
                    const mailto = this.getAttribute('data-mailto');
                    window.open(mailto, '_blank');
                    return false;
                };
            });
        }, 100);
    } else {
        setTimeout(function() {
            document.querySelectorAll('.btn-email').forEach(function(btn) {
                const href = btn.getAttribute('href');
                if (href && href.includes('mail.google.com')) {
                    const url = new URL(href);
                    const su = url.searchParams.get('su') || '';
                    const body = url.searchParams.get('body') || '';
                    btn.href = `mailto:owensrapidtechrepair@gmail.com?subject=${su}&body=${body}`;
                    btn.removeAttribute('target');
                    btn.onclick = null;
                }
            });
        }, 100);
    }
};
