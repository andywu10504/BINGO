const BingoFireworks = {
  canvas: null,
  context: null,
  particles: [],
  animationId: null,
  intervalId: null,

  init(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.resizeCanvas();
  },

  resizeCanvas() {
    if (!this.canvas) {
      return;
    }

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  start() {
    this.resizeCanvas();
    this.stop();

    this.particles = [];
    this.createRandomFireworks();

    this.intervalId = setInterval(() => {
      this.createRandomFireworks();
    }, 700);

    this.animate();
  },

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.particles = [];

    if (this.context && this.canvas) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },

  createRandomFireworks() {
    for (let i = 0; i < 3; i++) {
      const x = window.innerWidth * (0.15 + Math.random() * 0.7);
      const y = window.innerHeight * (0.15 + Math.random() * 0.55);

      this.createFireworkBurst(x, y);
    }
  },

  createFireworkBurst(x, y) {
    const colors = ["#ff4757", "#ffa502", "#2ed573", "#1e90ff", "#a55eea", "#ffffff"];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.04
      });
    }
  },

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.alpha -= 0.012;

      this.context.save();
      this.context.globalAlpha = Math.max(particle.alpha, 0);
      this.context.beginPath();
      this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.context.fillStyle = particle.color;
      this.context.fill();
      this.context.restore();
    });

    this.particles = this.particles.filter(function (particle) {
      return particle.alpha > 0;
    });

    this.animationId = requestAnimationFrame(() => {
      this.animate();
    });
  }
};
