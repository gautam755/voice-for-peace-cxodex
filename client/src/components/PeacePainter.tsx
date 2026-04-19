import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface DrawingStroke {
  points: Array<{ x: number; y: number }>;
  color: string;
  size: number;
}

export function PeacePainter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<DrawingStroke[]>([]);
  const [currentColor, setCurrentColor] = useState('#00D9FF');
  const [currentSize, setCurrentSize] = useState(3);

  const neonColors = ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw all strokes
    strokes.forEach((stroke) => {
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        stroke.points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      }
    });
  }, [strokes]);

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
          width={800}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full bg-gradient-to-b from-gray-900 to-black cursor-crosshair"
        />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 flex gap-4 items-center justify-center flex-wrap">
          {/* Color picker */}
          <div className="flex gap-2">
            {neonColors.map((color) => (
              <motion.button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  currentColor === color ? 'border-white scale-125' : 'border-gray-600'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          {/* Size slider */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-accent">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={currentSize}
              onChange={(e) => setCurrentSize(Number(e.target.value))}
              className="w-24 accent-cyan-400"
            />
          </div>

          {/* Clear button */}
          <motion.button
            onClick={clearCanvas}
            className="px-6 py-2 rounded-full bg-red-500/20 border border-red-400 text-red-300 font-bold hover:bg-red-500/40 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Clear
          </motion.button>
        </div>
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Draw your message of peace with neon brushes! 🎨
      </p>
    </div>
  );
}
