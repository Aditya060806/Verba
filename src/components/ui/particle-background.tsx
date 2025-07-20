import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground = ({ particleCount = 50, className = "" }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = ['hsl(217, 91%, 60%)', 'hsl(199, 89%, 48%)', 'hsl(270, 91%, 60%)', 'hsl(315, 100%, 75%)'];

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const updateParticles = () => {
      const time = Date.now() * 0.0002;
      particlesRef.current.forEach((particle, i) => {
        // Parallax drift
        particle.x += particle.vx + Math.sin(time + i) * 0.05;
        particle.y += particle.vy + Math.cos(time + i) * 0.05;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Gentle floating effect and color pulse
        particle.opacity = 0.1 + Math.abs(Math.sin(Date.now() * 0.001 + particle.x * 0.01 + i)) * 0.3;
        if (Math.random() < 0.001) {
          // Occasional color pulse
          particle.color = colors[Math.floor(Math.random() * colors.length)];
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('hsl', 'hsla');
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(217, 91%, 60%, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 ${className}`}
        style={{ opacity: 0.7 }}
      />
      {/* Animated gradient overlay for cinematic effect */}
      <div
        ref={gradientRef}
        className="fixed inset-0 pointer-events-none z-0 animate-gradient-move bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 opacity-60 mix-blend-lighten"
      />
    </>
  );
};

export default ParticleBackground;