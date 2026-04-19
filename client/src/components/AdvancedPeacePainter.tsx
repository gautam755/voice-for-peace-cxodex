import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trash2, Download, Share2 } from 'lucide-react';

interface DrawingStroke {
  points: Array<{ x: number; y: number }>;
  color: string;
  size: number;
  opacity: number;
}

export function AdvancedPeacePainter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<DrawingStroke[]>([]);
  const [currentColor, setCurrentColor] = useState('#00D9FF');
  const [currentSize, setCurrentSize] = useState(5);
  const [currentOpacity, setCurrentOpacity] = useState(1);
  const [brushMode, setBrushMode] = useState<'normal' | 'glow' | 'sparkle'>('glow');

  const neonColors = [
    { name: 'Cyan', value: '#00D9FF' },
    { name: 'Purple', value: '#9D4EDD' },
    { name: 'Orange', value: '#FF6B35' },
    { name: 'Lime', value: '#39FF14' },
    { name: 'Pink', value: '#FF006E' },
    { name: 'White', value: '#FFFFFF' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw all strokes
    strokes.forEach((stroke) => {
      ctx.strokeStyle = stroke.color;
      ctx.globalAlpha = stroke.opacity;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (brushMode === 'glow') {
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = stroke.size * 2;
      } else if (brushMode === 'sparkle') {
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = stroke.size * 3;
      }

      if (stroke.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        stroke.points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, [strokes, brushMode]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStrokes([
      ...strokes,
      {
        points: [{ x, y }],
        color: currentColor,
        size: currentSize,
        opacity: currentOpacity,
      },
    ]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStrokes((prevStrokes) => {
      const newStrokes = [...prevStrokes];
      if (newStrokes.length > 0) {
        newStrokes[newStrokes.length - 1].points.push({ x, y });
      }
      return newStrokes;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setStrokes([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'peace-art.png';
      link.click();
    }
  };

  const shareDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');
    const shareText = 'Check out my peace art created with the Voice for Peace platform! 🎨✌️';

    // Try Web Share API first
    if (navigator.share) {
      try {
        const blob = await (await fetch(imageData)).blob();
        const file = new File([blob], 'peace-art.png', { type: 'image/png' });
        await navigator.share({
          title: 'Peace Art',
          text: shareText,
          files: [file],
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        const blob = await (await fetch(imageData)).blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        alert('Art copied to clipboard! Paste it anywhere to share.');
      } catch (err) {
        alert('Share not supported on this device. Use Download instead.');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full bg-gradient-to-b from-gray-900 to-black cursor-crosshair"
        />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6 space-y-4">
          {/* Brush mode */}
          <div className="flex gap-2 justify-center">
            {(['normal', 'glow', 'sparkle'] as const).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setBrushMode(mode)}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  brushMode === mode
                    ? 'bg-cyan-400 text-gray-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Color picker */}
          <div className="flex gap-2 justify-center flex-wrap">
            {neonColors.map((color) => (
              <motion.button
                key={color.value}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  currentColor === color.value ? 'border-white scale-125' : 'border-gray-600'
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setCurrentColor(color.value)}
                whileHover={{ scale: 1.2 }}
                title={color.name}
              />
            ))}
          </div>

          {/* Size and opacity controls */}
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-accent">Size:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={currentSize}
                onChange={(e) => setCurrentSize(Number(e.target.value))}
                className="w-24 accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold text-sm">{currentSize}px</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-accent">Opacity:</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={currentOpacity}
                onChange={(e) => setCurrentOpacity(Number(e.target.value))}
                className="w-24 accent-purple-400"
              />
              <span className="text-purple-400 font-bold text-sm">{Math.round(currentOpacity * 100)}%</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              onClick={downloadDrawing}
              className="px-6 py-2 rounded-full bg-green-500/20 border border-green-400 text-green-300 font-bold hover:bg-green-500/40 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>

            <motion.button
              onClick={shareDrawing}
              className="px-6 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 font-bold hover:bg-blue-500/40 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>

            <motion.button
              onClick={clearCanvas}
              className="px-6 py-2 rounded-full bg-red-500/20 border border-red-400 text-red-300 font-bold hover:bg-red-500/40 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </motion.button>
          </div>
        </div>
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Create your masterpiece with neon brushes! Choose brush mode, colors, size, and opacity. 🎨✨
      </p>
    </div>
  );
}
