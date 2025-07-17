import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedAudioVisualizerProps {
  isRecording?: boolean;
  isPlaying?: boolean;
  onToggleRecording?: () => void;
  onTogglePlayback?: () => void;
  className?: string;
}

const AdvancedAudioVisualizer = ({
  isRecording = false,
  isPlaying = false,
  onToggleRecording,
  onTogglePlayback,
  className = ""
}: AdvancedAudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const [audioLevel, setAudioLevel] = useState(0);

  // Initialize audio visualization
  useEffect(() => {
    if (!isRecording && !isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    let dataArray: Uint8Array;
    
    if (isRecording) {
      // Real microphone input
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioContextRef.current = new AudioContext();
          analyserRef.current = audioContextRef.current.createAnalyser();
          const source = audioContextRef.current.createMediaStreamSource(stream);
          source.connect(analyserRef.current);
          
          analyserRef.current.fftSize = 256;
          dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          
          animate();
        })
        .catch(err => console.error('Microphone access denied:', err));
    } else if (isPlaying) {
      // Simulated audio for AI speech
      dataArray = new Uint8Array(128);
      animate();
    }

    function animate() {
      if (!ctx || !canvas) return;

      animationFrameRef.current = requestAnimationFrame(animate);

      if (analyserRef.current && isRecording) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else if (isPlaying) {
        // Simulate AI speech patterns
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.random() * 150 + 50;
        }
      }

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'hsla(217, 91%, 60%, 0.1)');
      gradient.addColorStop(1, 'hsla(315, 100%, 75%, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!dataArray) return;

      // Draw frequency bars
      const barWidth = canvas.width / dataArray.length * 2;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
        
        // Create gradient for each bar
        const barGradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        if (isRecording) {
          barGradient.addColorStop(0, 'hsl(199, 89%, 48%)');
          barGradient.addColorStop(1, 'hsl(217, 91%, 60%)');
        } else {
          barGradient.addColorStop(0, 'hsl(315, 100%, 75%)');
          barGradient.addColorStop(1, 'hsl(270, 91%, 60%)');
        }
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = isRecording ? 'hsl(199, 89%, 48%)' : 'hsl(315, 100%, 75%)';
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;

        x += barWidth;
      }

      // Calculate overall audio level
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 255);

      // Draw central waveform
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = isRecording ? 'hsl(199, 89%, 48%)' : 'hsl(315, 100%, 75%)';
      
      for (let i = 0; i < dataArray.length; i++) {
        const x = (i / dataArray.length) * canvas.width;
        const y = canvas.height / 2 + (dataArray[i] - 128) * 0.5;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecording, isPlaying]);

  return (
    <div className={`relative ${className}`}>
      {/* Visualizer Canvas */}
      <div className="glass-ultra rounded-2xl p-6 mb-4 relative overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-40 rounded-xl"
          style={{ filter: 'blur(0.5px)' }}
        />
        
        {/* Audio level indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-8 rounded-full transition-all duration-300 ${
                  audioLevel > (i + 1) * 0.2 
                    ? isRecording 
                      ? 'bg-accent shadow-[0_0_10px_hsl(var(--accent))]' 
                      : 'bg-primary shadow-[0_0_10px_hsl(var(--primary))]'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {onToggleRecording && (
            <Button
              onClick={onToggleRecording}
              className={`relative overflow-hidden transition-all duration-300 ${
                isRecording 
                  ? 'bg-destructive hover:bg-destructive/90 neon-primary' 
                  : 'glass-ultra border border-accent/20'
              }`}
              size="lg"
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
              <span className="ml-2">
                {isRecording ? 'Stop' : 'Record'}
              </span>
            </Button>
          )}

          {onTogglePlayback && (
            <Button
              onClick={onTogglePlayback}
              className={`relative overflow-hidden transition-all duration-300 ${
                isPlaying 
                  ? 'bg-primary hover:bg-primary/90 neon-primary' 
                  : 'glass-ultra border border-primary/20'
              }`}
              size="lg"
            >
              {isPlaying ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
              <span className="ml-2">
                {isPlaying ? 'Mute' : 'Speak'}
              </span>
            </Button>
          )}
        </div>

        {/* Floating particles for active states */}
        {(isRecording || isPlaying) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  isRecording ? 'bg-accent/60' : 'bg-primary/60'
                } float-physics`}
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status Display */}
      <div className="text-center text-sm text-foreground-secondary">
        {isRecording && (
          <div className="flex items-center justify-center space-x-2 text-accent">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>Recording your speech...</span>
          </div>
        )}
        {isPlaying && (
          <div className="flex items-center justify-center space-x-2 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>AI is speaking...</span>
          </div>
        )}
        {!isRecording && !isPlaying && (
          <span>Ready for audio input</span>
        )}
      </div>
    </div>
  );
};

export default AdvancedAudioVisualizer;