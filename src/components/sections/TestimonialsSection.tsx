import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Network, Cpu, Database, Zap, Cloud } from 'lucide-react';

const NeuralNetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Neural network nodes
    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const numNodes = 30;
    const connectionProbability = 0.3;

    // Initialize nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      nodes.forEach((_, j) => {
        if (i !== j && Math.random() < connectionProbability) {
          node.connections.push(j);
        }
      });
    });

    // Animation variables
    let particles: { x: number; y: number; targetIndex: number; progress: number }[] = [];
    
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;

      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add new particles
      if (Math.random() < 0.1) {
        const startNode = Math.floor(Math.random() * nodes.length);
        const node = nodes[startNode];
        if (node.connections.length > 0) {
          const targetIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
          particles.push({
            x: node.x,
            y: node.y,
            targetIndex,
            progress: 0
          });
        }
      }

      // Update and draw particles
      ctx.fillStyle = 'rgba(147, 51, 234, 0.8)';
      particles = particles.filter(particle => {
        const targetNode = nodes[particle.targetIndex];
        particle.progress += 0.02;

        if (particle.progress >= 1) return false;

        const x = particle.x + (targetNode.x - particle.x) * particle.progress;
        const y = particle.y + (targetNode.y - particle.y) * particle.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

const AIFeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-colors h-full">
        <div className="relative mb-6">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative p-4 bg-white/5 rounded-xl">
            <feature.icon className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            {feature.stats.value}
          </div>
          <div className="text-sm text-gray-500">{feature.stats.label}</div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const aiFeatures = [
    {
      icon: Brain,
      title: 'Neural Networks',
      description: 'Advanced neural networks trained on millions of product data points for intelligent search and recommendations',
      stats: {
        value: '99.9%',
        label: 'Accuracy Rate'
      }
    },
    {
      icon: Network,
      title: 'Deep Learning',
      description: 'State-of-the-art deep learning models that understand context and user intent in real-time',
      stats: {
        value: '<100ms',
        label: 'Response Time'
      }
    },
    {
      icon: Database,
      title: 'Data Processing',
      description: 'Processes billions of data points daily to deliver accurate and personalized results',
      stats: {
        value: '1B+',
        label: 'Daily Operations'
      }
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <NeuralNetworkAnimation />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
          >
            <Cpu className="h-8 w-8 text-blue-400" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powered by Advanced{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              AI Networks
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our cutting-edge AI technology processes billions of data points to deliver accurate and personalized search results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <AIFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Zap, value: '45ms', label: 'Average Response' },
            { icon: Cloud, value: '99.99%', label: 'System Uptime' },
            { icon: Database, value: '1M+', label: 'Daily Searches' },
            { icon: Brain, value: '24/7', label: 'AI Processing' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;