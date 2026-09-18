// chroma-viz — Visualize type confusion vulnerabilities in Chrome compositing.
// Zero-dependency Worker that serves ONE self-contained HTML micro-product. The entire app
// (markup, styles, and logic) is authored by the agent and inlined below as a single document —
// no framework, no build step, no external requests.

const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chroma-Viz: Type Confusion in Chrome Compositing</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: var(--background);
            color: var(--text);
            transition: background 0.3s, color 0.3s;
        }
        canvas {
            border: 2px solid var(--border);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --background: #121212;
                --text: #e0e0e0;
                --border: #424242;
            }
        }
        @media (prefers-color-scheme: light) {
            :root {
                --background: #ffffff;
                --text: #000000;
                --border: #cccccc;
            }
        }
    </style>
</head>
<body>
    <canvas id="viz"></canvas>
    <script>
        const canvas = document.getElementById('viz');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;

        let particles = [];
        const numParticles = 1000;

        function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
        }

        Particle.prototype.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
        };

        Particle.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        function init() {
            for (let i = 0; i < numParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        init();
        animate();

        // Simulate type confusion by manipulating particle properties dynamically
        setInterval(() => {
            particles.forEach(particle => {
                // Randomly change properties to simulate type confusion
                if (Math.random() < 0.01) {
                    particle.speedX = Math.random() * 5 - 2.5;
                    particle.speedY = Math.random() * 5 - 2.5;
                    particle.color = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
                }
            });
        }, 100);
    </script>
</body>
</html>`;

export default {
  async fetch(): Promise<Response> {
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
