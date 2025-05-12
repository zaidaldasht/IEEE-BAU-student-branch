const canvas = document.getElementById('ieeeCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle setup
const particles = [];
const count = 100;

for (let i = 0; i < count; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() - 0.3,
        vy: Math.random() - 0.3,
        radius: Math.random() * 4 + 1
    });
}

let mouseX = 0;
let mouseY = 0;

// Add mousemove event to track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between particles
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle ='rgb(0, 98, 155, 0.5)';
                ctx.lineWidth = 2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // Draw particles and update position
    for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00629B';
        ctx.fill();

        // Calculate distance from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const minDistance = 100; // Minimum distance the particles should maintain from the mouse

        // If the particle is too close to the mouse, move it away to the minimum distance
        if (distance < minDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (minDistance - distance) / minDistance; // Force to push the particle away
            p.vx -= (Math.cos(angle) * force) / 1;
            p.vy -= (Math.sin(angle) * force) / 1;

        }


        // Update particle position
        p.x += p.vx;
        p.y += p.vy;
        console.log(p.x);



        // Bounce particles off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -0.9;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -0.9;
    }

    requestAnimationFrame(draw);
}

draw();