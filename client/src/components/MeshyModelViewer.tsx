import { useEffect, useRef, createElement } from 'react';
import { motion } from 'framer-motion';

export function MeshyModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.type = 'module';
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center z-10">
        <motion.div
          className="w-full h-full max-w-4xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {createElement('model-viewer', {
            src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
            alt: 'Global Peace Network 3D Model',
            loading: 'eager',
            reveal: 'interaction',
            autoRotate: true,
            cameraControls: true,
            style: {
              width: '100%',
              height: '100%',
              borderRadius: '1rem',
            },
            ar: true,
            arModes: 'webxr scene-viewer quick-look',
            environmentImage: 'neutral',
            exposure: '1',
            shadowIntensity: '1',
          })}
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
          Global Peace Network
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-accent">
          A 3D visualization of interconnected peace movements
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 right-8 flex gap-4 z-20 flex-wrap justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
          <p className="text-sm text-gray-300">Rotate • Zoom • Pan</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
          <p className="text-sm text-gray-300">970K+ Faces • 616K+ Vertices</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
          <p className="text-sm text-gray-300">CC0 License • Meshy AI</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MeshyModelViewer;
