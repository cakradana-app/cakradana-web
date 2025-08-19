'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { ZoomIn, ZoomOut, RotateCcw, Filter, Download, Info, BarChart3, X } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'party' | 'candidate';
  amount?: number;
  risk?: 'low' | 'medium' | 'high';
}

interface NetworkEdge {
  source: string | NetworkNode;
  target: string | NetworkNode;
  amount: number;
  date: string;
}

const NetworkViewPage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [showNodeDetail, setShowNodeDetail] = useState(false);
  const [patternTheme, setPatternTheme] = useState<'default' | 'dark' | 'subtle'>('default');
  const [patternSize, setPatternSize] = useState(20);

  // Sample data for MVP
  const sampleNodes: NetworkNode[] = useMemo(() => [
    { id: '1', name: 'Citra Wijaya', type: 'individual', amount: 196541744, risk: 'low' },
    { id: '2', name: 'Eko Prasetyo', type: 'individual', amount: 96535744, risk: 'high' },
    { id: '3', name: 'PT Maju Jaya', type: 'company', amount: 396405204, risk: 'low' },
    { id: '4', name: 'Partai Kemajuan Rakyat', type: 'party', amount: 26400000, risk: 'medium' },
    { id: '5', name: 'Partai Persatuan Indonesia', type: 'party', amount: 111111111, risk: 'high' },
    { id: '6', name: 'Ganjar Pranowo', type: 'candidate', amount: 0, risk: 'low' },
    { id: '7', name: 'Prabowo Subianto', type: 'candidate', amount: 0, risk: 'low' },
    { id: '8', name: 'Anies Baswedan', type: 'candidate', amount: 0, risk: 'low' },
  ], []);

  const sampleEdges: NetworkEdge[] = useMemo(() => [
    { source: '1', target: '6', amount: 196541744, date: '2024-01-15' },
    { source: '2', target: '6', amount: 96535744, date: '2024-01-20' },
    { source: '3', target: '7', amount: 396405204, date: '2024-01-25' },
    { source: '4', target: '7', amount: 26400000, date: '2024-02-01' },
    { source: '5', target: '8', amount: 111111111, date: '2024-02-05' },
  ], []);

  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    // Clear previous content
    g.selectAll('*').remove();

    // Set up dimensions for infinity canvas
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('width', '100vw')
      .style('height', '100vh');

    // Lightweight dotted background using CSS only
    // This approach is more performant than SVG patterns because:
    // 1. CSS radial-gradient is hardware accelerated by the browser
    // 2. No additional DOM elements needed (unlike SVG patterns)
    // 3. Scales smoothly with zoom without performance impact
    // 4. Minimal memory footprint compared to SVG patterns
    // 5. Responsive design with media queries for different screen sizes
    // 6. High DPI display support with optimized pattern sizing

    // Create zoom behavior for infinity canvas
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 20])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Color scale for node types
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['individual', 'company', 'party', 'candidate'])
      .range(['#10b981', '#f59e0b', '#8b5cf6', '#ef4444']);

    // Risk color scale
    const riskColorScale = d3.scaleOrdinal<string>()
      .domain(['low', 'medium', 'high'])
      .range(['#10b981', '#f59e0b', '#ef4444']);

    // Create optimized force simulation for better node distribution
    const simulation = d3.forceSimulation<NetworkNode>(sampleNodes)
      .force('link', d3.forceLink<NetworkNode, NetworkEdge>(sampleEdges)
        .id(d => d.id)
        .distance(d => {
          // Dynamic distance based on node types and amounts
          const sourceNode = sampleNodes.find(n => n.id === (d.source as NetworkNode).id || n.id === d.source);
          const targetNode = sampleNodes.find(n => n.id === (d.target as NetworkNode).id || n.id === d.target);
          if (sourceNode?.type === 'candidate' || targetNode?.type === 'candidate') {
            return 180; // More space around candidates
          }
          return 140 + Math.log(d.amount / 1000000) * 8; // Increased base distance and scaling
        })
        .strength(0.8) // Strong link force for stable positioning
      )
      .force('charge', d3.forceManyBody()
        .strength(d => {
          // Stronger repulsion for candidates and important nodes
          const node = d as NetworkNode;
          if (node.type === 'candidate') return -1000;
          if (node.type === 'party') return -700;
          return -600;
        })
        .distanceMax(400) // Increased repulsion distance
      )
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05)) // Weaker center force
      .force('collision', d3.forceCollide()
        .radius(d => {
          // Collision radius based on node size with more spacing
          const node = d as NetworkNode;
          if (node.type === 'candidate') return 45;
          return Math.min(Math.max(Math.sqrt((node.amount || 0) / 1000000) + 25, 30), 50);
        })
        .strength(0.9) // Strong collision avoidance
      )
      .force('x', d3.forceX(width / 2).strength(0.02)) // Gentle X positioning
      .force('y', d3.forceY(height / 2).strength(0.02)) // Gentle Y positioning
      .alpha(1) // High initial energy
      .alphaDecay(0.01) // Slower decay for better stabilization
      .velocityDecay(0.3); // Friction to prevent oscillation

    // Create directed edges with arrows for financial flows
    const links = g.append('g')
      .attr('class', 'links')
      .selectAll('g')
      .data(sampleEdges)
      .enter()
      .append('g');

    // Add edge lines
    links.append('line')
      .attr('stroke', d => {
        // Color based on amount magnitude
        const amount = d.amount;
        if (amount > 200000000) return '#ef4444'; // High amount - red
        if (amount > 100000000) return '#f59e0b'; // Medium amount - yellow
        return '#10b981'; // Low amount - green
      })
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', d => Math.sqrt(d.amount / 10000000) + 2)
      .attr('marker-end', 'url(#arrowhead)')
      .attr('marker-end', 'url(#arrowhead)');

    // Add edge labels for amounts
    links.append('text')
      .attr('class', 'edge-label')
      .attr('font-size', 10)
      .attr('font-family', 'Arial, sans-serif')
      .attr('fill', '#374151')
      .attr('text-anchor', 'middle')
      .text(d => `Rp ${(d.amount / 1000000).toFixed(0)}M`)
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Define arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -3 6 6')
      .attr('refX', 6)
      .attr('refY', 0)
      .attr('markerWidth', 4)
      .attr('markerHeight', 4)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-3L6,0L0,3')
      .attr('fill', '#374151')
      .attr('stroke', '#374151')
      .attr('stroke-width', 0.5);

    // Create distinct node types with different shapes
    const nodeGroups = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(sampleNodes)
      .enter()
      .append('g')
      .style('cursor', 'pointer');

         // Add different shapes based on node type
     nodeGroups.each(function(d) {
       const node = d3.select(this);
       const size = d.type === 'candidate' ? 25 : Math.min(Math.max(Math.sqrt((d.amount || 0) / 1000000) + 5, 8), 30);
       
       // Add hover effects with better stability
       node.on('mouseenter', function() {
         d3.select(this).style('opacity', 0.8);
         // Use a more stable hover effect that doesn't affect positioning
         d3.select(this).style('filter', 'drop-shadow(0 0 8px rgba(0,0,0,0.3))');
       }).on('mouseleave', function() {
         d3.select(this).style('opacity', 1);
         d3.select(this).style('filter', 'none');
       });
      
      switch(d.type) {
        case 'candidate':
          // Circle with thicker border for candidates
          node.append('circle')
            .attr('r', size)
            .attr('fill', colorScale(d.type))
            .attr('stroke', riskColorScale(d.risk || 'low'))
            .attr('stroke-width', 4);
          break;
          
        case 'individual':
          // Diamond shape for individuals
          const diamondPoints = [
            [0, -size], [size, 0], [0, size], [-size, 0]
          ].join(' ');
          node.append('polygon')
            .attr('points', diamondPoints)
            .attr('fill', colorScale(d.type))
            .attr('stroke', riskColorScale(d.risk || 'low'))
            .attr('stroke-width', 2);
          break;
          
        case 'company':
          // Square shape for companies
          node.append('rect')
            .attr('width', size * 2)
            .attr('height', size * 2)
            .attr('x', -size)
            .attr('y', -size)
            .attr('fill', colorScale(d.type))
            .attr('stroke', riskColorScale(d.risk || 'low'))
            .attr('stroke-width', 2)
            .attr('rx', 3); // Rounded corners
          break;
          
        case 'party':
          // Hexagon shape for parties
          const hexagonPoints = [];
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = size * Math.cos(angle);
            const y = size * Math.sin(angle);
            hexagonPoints.push([x, y]);
          }
          node.append('polygon')
            .attr('points', hexagonPoints.join(' '))
            .attr('fill', colorScale(d.type))
            .attr('stroke', riskColorScale(d.risk || 'low'))
            .attr('stroke-width', 2);
          break;
      }
    });

    // Add node labels
    const labels = g.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(sampleNodes)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('font-size', 12)
      .attr('font-family', 'Arial, sans-serif')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Add drag behavior to node groups
    const drag = d3.drag<SVGGElement, NetworkNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeGroups.call(drag);

         // Add click events for nodes with enhanced visual feedback
     nodeGroups.on('click', (event, d) => {
       console.log('Node clicked:', d);
       
       // Add click animation
       const clickedNode = d3.select(event.currentTarget);
       clickedNode
         .transition()
         .duration(150)
         .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) scale(1.1)`)
         .transition()
         .duration(150)
         .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) scale(1)`);
       
       setSelectedNode(d);
       setShowNodeDetail(true);
       
       // Enhanced highlighting with pulse effect
       const connectedNodeIds = sampleEdges
         .filter(edge => 
           (edge.source as any).id === d.id || 
           (edge.target as any).id === d.id ||
           edge.source === d.id || 
           edge.target === d.id
         )
         .map(edge => {
           const isSource = (edge.source as any).id === d.id || edge.source === d.id;
           return isSource ? (edge.target as any).id || edge.target : (edge.source as any).id || edge.source;
         });
       
       // Dim other nodes with smooth transition
       nodeGroups
         .transition()
         .duration(300)
         .style('opacity', node => 
           node.id === d.id || connectedNodeIds.includes(node.id) ? 1 : 0.2
         );
       
       // Highlight connected edges
       const connectedEdges = sampleEdges.filter(edge => 
         (edge.source as any).id === d.id || 
         (edge.target as any).id === d.id ||
         edge.source === d.id || 
         edge.target === d.id
       );
       
       // Reset all edges first
       g.selectAll('.links g')
         .transition()
         .duration(300)
         .style('opacity', 0.3);
       
       // Highlight connected edges
       connectedEdges.forEach(edge => {
         const edgeElement = g.selectAll('.links g')
         .filter((d: any) => 
           (d.source === edge.source && d.target === edge.target) ||
           (d.source === edge.target && d.target === edge.source)
         );
         
         edgeElement
           .transition()
           .duration(300)
           .style('opacity', 1)
           .style('stroke-width', (d: any) => Math.sqrt(d.amount / 10000000) + 4);
       });
     });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      links.each(function(d) {
        const link = d3.select(this);
        const source = d.source as NetworkNode;
        const target = d.target as NetworkNode;
        
        // Calculate target node size for proper arrow positioning
        const targetNode = sampleNodes.find(n => n.id === (target.id || target));
        const targetSize = targetNode?.type === 'candidate' ? 25 : 
          Math.min(Math.max(Math.sqrt((targetNode?.amount || 0) / 1000000) + 5, 8), 30);
        
        // Calculate direction vector
        const dx = target.x! - source.x!;
        const dy = target.y! - source.y!;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize and apply offset to avoid arrow being covered by target node
        const offset = targetSize + 1; // Reduced extra space for closer positioning
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;
        
        // Calculate end point with offset
        const endX = target.x! - normalizedDx * offset;
        const endY = target.y! - normalizedDy * offset;
        
        // Update edge line with offset
        link.select('line')
          .attr('x1', source.x!)
          .attr('y1', source.y!)
          .attr('x2', endX)
          .attr('y2', endY);
        
        // Update edge label position
        link.select('text')
          .attr('x', (source.x! + endX) / 2)
          .attr('y', (source.y! + endY) / 2);
      });

      nodeGroups
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

      labels
        .attr('x', d => d.x!)
        .attr('y', d => d.y! + 35);
    });

    // Add zoom controls
    const handleZoomIn = () => {
      svg.transition().call(
        zoom.scaleBy, 1.5
      );
    };

    const handleZoomOut = () => {
      svg.transition().call(
        zoom.scaleBy, 1 / 1.5
      );
    };

    const handleReset = () => {
      svg.transition().call(
        zoom.transform,
        d3.zoomIdentity
      );
    };

    // Expose zoom functions to the component
    (window as unknown as { networkZoomIn: typeof handleZoomIn }).networkZoomIn = handleZoomIn;
    (window as unknown as { networkZoomOut: typeof handleZoomOut }).networkZoomOut = handleZoomOut;
    (window as unknown as { networkReset: typeof handleReset }).networkReset = handleReset;

    return () => {
      simulation.stop();
    };
  }, [sampleNodes, sampleEdges]);

  const handleZoomIn = () => {
    (window as unknown as { networkZoomIn?: () => void }).networkZoomIn?.();
  };

  const handleZoomOut = () => {
    (window as unknown as { networkZoomOut?: () => void }).networkZoomOut?.();
  };

     const handleReset = () => {
     (window as unknown as { networkReset?: () => void }).networkReset?.();
   };

   // Handle keyboard events for popup with enhanced navigation
   useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
       if (!showNodeDetail) return;
       
       switch (event.key) {
         case 'Escape':
           setShowNodeDetail(false);
           setSelectedNode(null);
           break;
         case 'ArrowLeft':
           // Navigate to previous connected node
           if (selectedNode) {
             const connectedNodes = sampleEdges
               .filter(edge => 
                 (edge.source as any).id === selectedNode.id || 
                 (edge.target as any).id === selectedNode.id ||
                 edge.source === selectedNode.id || 
                 edge.target === selectedNode.id
               )
               .map(edge => {
                 const isSource = (edge.source as any).id === selectedNode.id || edge.source === selectedNode.id;
                 return sampleNodes.find(n => 
                   n.id === (isSource ? (edge.target as any).id || edge.target : (edge.source as any).id || edge.source)
                 );
               })
               .filter(Boolean);
             
             if (connectedNodes.length > 0) {
               const currentIndex = connectedNodes.findIndex(node => node?.id === selectedNode.id);
               const prevIndex = currentIndex > 0 ? currentIndex - 1 : connectedNodes.length - 1;
               setSelectedNode(connectedNodes[prevIndex]!);
             }
           }
           break;
         case 'ArrowRight':
           // Navigate to next connected node
           if (selectedNode) {
             const connectedNodes = sampleEdges
               .filter(edge => 
                 (edge.source as any).id === selectedNode.id || 
                 (edge.target as any).id === selectedNode.id ||
                 edge.source === selectedNode.id || 
                 edge.target === selectedNode.id
               )
               .map(edge => {
                 const isSource = (edge.source as any).id === selectedNode.id || edge.source === selectedNode.id;
                 return sampleNodes.find(n => 
                   n.id === (isSource ? (edge.target as any).id || edge.target : (edge.source as any).id || edge.source)
                 );
               })
               .filter(Boolean);
             
             if (connectedNodes.length > 0) {
               const currentIndex = connectedNodes.findIndex(node => node?.id === selectedNode.id);
               const nextIndex = currentIndex < connectedNodes.length - 1 ? currentIndex + 1 : 0;
               setSelectedNode(connectedNodes[nextIndex]!);
             }
           }
           break;
         case 'h':
         case 'H':
           // View history (placeholder for future implementation)
           console.log('View history for:', selectedNode?.name);
           break;
       }
     };

     document.addEventListener('keydown', handleKeyDown);
     return () => {
       document.removeEventListener('keydown', handleKeyDown);
     };
   }, [showNodeDetail, selectedNode, sampleEdges, sampleNodes]);

   // Reset node opacity when popup is closed
   useEffect(() => {
     if (!showNodeDetail && svgRef.current) {
       const svg = d3.select(svgRef.current);
       const nodeGroups = svg.selectAll('.nodes g');
       nodeGroups.style('opacity', 1);
     }
   }, [showNodeDetail]);

   // Responsive pattern sizing
   useEffect(() => {
     const updatePatternSize = () => {
       if (window.innerWidth <= 768) {
         setPatternSize(15); // Mobile
       } else if (window.devicePixelRatio >= 2) {
         setPatternSize(10); // High DPI
       } else {
         setPatternSize(20); // Standard
       }
     };

     updatePatternSize();
     window.addEventListener('resize', updatePatternSize);
     return () => window.removeEventListener('resize', updatePatternSize);
   }, []);

  return (
    <DashboardLayout>
      <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
        {/* Infinity Canvas SVG */}
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{
            background: patternTheme === 'dark' 
              ? 'radial-gradient(circle, #374151 1px, transparent 1px)'
              : patternTheme === 'subtle'
              ? 'radial-gradient(circle, #f3f4f6 1px, transparent 1px)'
              : 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: `${patternSize}px ${patternSize}px`,
            backgroundPosition: '0 0',
            willChange: 'transform',
            transformOrigin: '0 0'
          }}
        >
          <g ref={gRef}></g>
        </svg>

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-200"
            title="Controls"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          
          {showControls && (
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-2">
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full flex items-center justify-center"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <hr className="border-gray-200" />
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg w-full">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg w-full">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <hr className="border-gray-200" />
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">Pattern Theme</p>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setPatternTheme('default')}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      patternTheme === 'default' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => setPatternTheme('dark')}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      patternTheme === 'dark' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setPatternTheme('subtle')}
                    className={`flex-1 px-2 py-1 text-xs rounded ${
                      patternTheme === 'subtle' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Subtle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Legend Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-200"
            title="Legend"
          >
            <Info className="w-5 h-5 text-gray-700" />
          </button>
          
          {showLegend && (
            <div className="absolute right-0 top-12 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 min-w-48">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Legend</h3>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="-6 -6 12 12" className="flex-shrink-0">
                    <polygon points="0,-6 6,0 0,6 -6,0" fill="#10b981" stroke="#059669" strokeWidth="1"/>
                  </svg>
                  <span className="text-xs text-gray-600">Individuals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="-6 -6 12 12" className="flex-shrink-0">
                    <rect x="-6" y="-6" width="12" height="12" fill="#f59e0b" stroke="#d97706" strokeWidth="1" rx="1"/>
                  </svg>
                  <span className="text-xs text-gray-600">Companies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="-6 -6 12 12" className="flex-shrink-0">
                    <polygon points="-6,0 -3,-5.2 3,-5.2 6,0 3,5.2 -3,5.2" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1"/>
                  </svg>
                  <span className="text-xs text-gray-600">Parties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="-6 -6 12 12" className="flex-shrink-0">
                    <circle cx="0" cy="0" r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs text-gray-600">Candidates</span>
                </div>
              </div>
            </div>
          )}
        </div>

                 {/* Floating Stats Button */}
         <div className="absolute bottom-4 right-4">
           <button
             onClick={() => setShowStats(!showStats)}
             className="p-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-all duration-200"
             title="Statistics"
           >
             <BarChart3 className="w-5 h-5 text-gray-700" />
           </button>
           
           {showStats && (
             <div className="absolute right-0 bottom-12 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 min-w-48">
               <div className="flex items-center justify-between mb-3">
                 <h3 className="text-sm font-semibold text-gray-900">Statistics</h3>
                 <button
                   onClick={() => setShowStats(false)}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="w-4 h-4" />
                 </button>
               </div>
               <div className="space-y-3">
                 <div>
                   <p className="text-xs text-gray-500">Total Nodes</p>
                   <p className="text-lg font-bold text-blue-600">{sampleNodes.length}</p>
                 </div>
                 <div>
                   <div>
                     <p className="text-xs text-gray-500">Total Connections</p>
                     <p className="text-lg font-bold text-green-600">{sampleEdges.length}</p>
                   </div>
                 </div>
                 <div>
                   <p className="text-xs text-gray-500">Total Amount</p>
                   <p className="text-lg font-bold text-purple-600">
                     Rp {sampleEdges.reduce((sum, edge) => sum + edge.amount, 0).toLocaleString()}
                   </p>
                 </div>
               </div>
             </div>
           )}
         </div>

         {/* Node Detail Popup */}
         {showNodeDetail && selectedNode && (
           <div 
             className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-start justify-center z-50 pt-16"
             onClick={(e) => {
               if (e.target === e.currentTarget) {
                 setShowNodeDetail(false);
                 setSelectedNode(null);
               }
             }}
           >
             <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 transform transition-all duration-200 scale-100 max-h-[80vh] overflow-y-auto">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-900">Node Details</h3>
                 <button
                   onClick={() => {
                     setShowNodeDetail(false);
                     setSelectedNode(null);
                   }}
                   className="text-gray-400 hover:text-gray-600"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="space-y-4">
                 {/* Node Type Icon */}
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 flex items-center justify-center">
                     {selectedNode.type === 'candidate' && (
                       <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-red-600"></div>
                     )}
                     {selectedNode.type === 'individual' && (
                       <svg width="24" height="24" viewBox="-12 -12 24 24" className="flex-shrink-0">
                         <polygon points="0,-12 12,0 0,12 -12,0" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                       </svg>
                     )}
                     {selectedNode.type === 'company' && (
                       <svg width="24" height="24" viewBox="-12 -12 24 24" className="flex-shrink-0">
                         <rect x="-12" y="-12" width="24" height="24" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="2"/>
                       </svg>
                     )}
                     {selectedNode.type === 'party' && (
                       <svg width="24" height="24" viewBox="-12 -12 24 24" className="flex-shrink-0">
                         <polygon points="-12,0 -6,-10.4 6,-10.4 12,0 6,10.4 -6,10.4" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                       </svg>
                     )}
                   </div>
                   <div>
                     <h4 className="text-lg font-semibold text-gray-900">{selectedNode.name}</h4>
                     <p className="text-sm text-gray-600 capitalize">{selectedNode.type}</p>
                   </div>
                 </div>

                 {/* Risk Level */}
                 <div className="flex items-center space-x-2">
                   <span className="text-sm font-medium text-gray-700">Risk Level:</span>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     selectedNode.risk === 'low' ? 'bg-green-100 text-green-800' :
                     selectedNode.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-red-100 text-red-800'
                   }`}>
                     {selectedNode.risk?.toUpperCase() || 'LOW'}
                   </span>
                 </div>

                                   {/* Amount Information */}
                 {selectedNode.amount && selectedNode.amount > 0 && (
                   <div>
                     <p className="text-sm font-medium text-gray-700">Total Amount:</p>
                     <p className="text-lg font-bold text-purple-600">
                       Rp {selectedNode.amount.toLocaleString()}
                     </p>
                   </div>
                 )}

                 {/* Transaction Summary */}
                 {(() => {
                   const connectedEdges = sampleEdges.filter(edge => 
                     (edge.source as any).id === selectedNode.id || 
                     (edge.target as any).id === selectedNode.id ||
                     edge.source === selectedNode.id || 
                     edge.target === selectedNode.id
                   );
                   const totalIncoming = connectedEdges
                     .filter(edge => (edge.target as any).id === selectedNode.id || edge.target === selectedNode.id)
                     .reduce((sum, edge) => sum + edge.amount, 0);
                   const totalOutgoing = connectedEdges
                     .filter(edge => (edge.source as any).id === selectedNode.id || edge.source === selectedNode.id)
                     .reduce((sum, edge) => sum + edge.amount, 0);
                   
                   if (connectedEdges.length === 0) {
                     return (
                       <div className="text-center p-4 bg-gray-50 rounded-lg">
                         <p className="text-sm text-gray-600">No transactions</p>
                         <p className="text-xs text-gray-500">This node has no connected transactions</p>
                       </div>
                     );
                   }
                   
                   return (
                     <div className="grid grid-cols-3 gap-4">
                       <div className="text-center p-3 bg-green-50 rounded-lg">
                         <p className="text-xs text-gray-600">Incoming</p>
                         <p className="text-sm font-bold text-green-600">
                           Rp {(totalIncoming / 1000000).toFixed(1)}M
                         </p>
                       </div>
                       <div className="text-center p-3 bg-red-50 rounded-lg">
                         <p className="text-xs text-gray-600">Outgoing</p>
                         <p className="text-sm font-bold text-red-600">
                           Rp {(totalOutgoing / 1000000).toFixed(1)}M
                         </p>
                       </div>
                       <div className="text-center p-3 bg-blue-50 rounded-lg">
                         <p className="text-xs text-gray-600">Total</p>
                         <p className="text-sm font-bold text-blue-600">
                           {connectedEdges.length}
                         </p>
                       </div>
                     </div>
                   );
                 })()}

                                   {/* Transaction Timeline */}
                 <div>
                   <p className="text-sm font-medium text-gray-700 mb-3">Transaction Timeline</p>
                   <div className="space-y-3 max-h-40 overflow-y-auto">
                     {sampleEdges
                       .filter(edge => 
                         (edge.source as any).id === selectedNode.id || 
                         (edge.target as any).id === selectedNode.id ||
                         edge.source === selectedNode.id || 
                         edge.target === selectedNode.id
                       )
                       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                       .map((edge, index) => {
                         const isSource = (edge.source as any).id === selectedNode.id || edge.source === selectedNode.id;
                         const connectedNode = sampleNodes.find(n => 
                           n.id === (isSource ? (edge.target as any).id || edge.target : (edge.source as any).id || edge.source)
                         );
                         const date = new Date(edge.date);
                         
                         return (
                           <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                             <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between">
                                 <div>
                                   <p className="text-sm font-medium text-gray-900">
                                     {isSource ? '→' : '←'} {connectedNode?.name || 'Unknown'}
                                   </p>
                                   <p className="text-xs text-gray-500 capitalize">
                                     {connectedNode?.type || 'unknown'}
                                   </p>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-sm font-semibold text-green-600">
                                     Rp {(edge.amount / 1000000).toFixed(1)}M
                                   </p>
                                   <p className="text-xs text-gray-500">
                                     {date.toLocaleDateString('id-ID', {
                                       year: 'numeric',
                                       month: 'short',
                                       day: 'numeric'
                                     })}
                                   </p>
                                 </div>
                               </div>
                             </div>
                           </div>
                         );
                       })}
                   </div>
                 </div>

                 {/* Connected Edges */}
                  <div>
                                         <p className="text-sm font-medium text-gray-700 mb-2">
                       Connected Transactions ({sampleEdges.filter(edge => 
                         (edge.source as any).id === selectedNode.id || 
                         (edge.target as any).id === selectedNode.id ||
                         edge.source === selectedNode.id || 
                         edge.target === selectedNode.id
                       ).length}):
                     </p>

                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                       {sampleEdges
                         .filter(edge => 
                           (edge.source as any).id === selectedNode.id || 
                           (edge.target as any).id === selectedNode.id ||
                           edge.source === selectedNode.id || 
                           edge.target === selectedNode.id
                         )
                         .length > 0 ? (
                         sampleEdges
                           .filter(edge => 
                             (edge.source as any).id === selectedNode.id || 
                             (edge.target as any).id === selectedNode.id ||
                             edge.source === selectedNode.id || 
                             edge.target === selectedNode.id
                           )
                           .map((edge, index) => {
                         const isSource = (edge.source as any).id === selectedNode.id || edge.source === selectedNode.id;
                         const connectedNode = sampleNodes.find(n => 
                           n.id === (isSource ? (edge.target as any).id || edge.target : (edge.source as any).id || edge.source)
                         );
                         return (
                           <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                             <div className="flex items-center space-x-2">
                               <span className="text-xs text-gray-500">
                                 {isSource ? '→' : '←'}
                               </span>
                               <div>
                                 <span className="text-sm font-medium text-gray-900 block">
                                   {connectedNode?.name || 'Unknown'}
                                 </span>
                                 <span className="text-xs text-gray-500 capitalize">
                                   {connectedNode?.type || 'unknown'}
                                   {connectedNode?.risk && (
                                     <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                                       connectedNode.risk === 'low' ? 'bg-green-100 text-green-700' :
                                       connectedNode.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                       'bg-red-100 text-red-700'
                                     }`}>
                                       {connectedNode.risk}
                                   </span>
                                   )}
                                 </span>
                               </div>
                             </div>
                             <div className="text-right">
                               <span className="text-sm font-semibold text-green-600 block">
                                 Rp {(edge.amount / 1000000).toFixed(0)}M
                               </span>
                               <span className="text-xs text-gray-500">
                                 {new Date(edge.date).toLocaleDateString()}
                               </span>
                                                          </div>
                           </div>
                         );
                       })
                       ) : (
                         <div className="text-center py-4 text-gray-500">
                           <p className="text-sm">No transactions found</p>
                           <p className="text-xs">This node has no connected transactions</p>
                         </div>
                       )}
                     </div>
                 </div>

                                   {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      View History
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                      Export Data
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      Report Issue
                    </button>
                    <button 
                      onClick={() => {
                        setShowNodeDetail(false);
                        setSelectedNode(null);
                      }}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Close (Esc)
                    </button>
                  </div>
                  
                  {/* Keyboard Shortcuts Info */}
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    <p className="font-medium mb-1">Keyboard Shortcuts:</p>
                    <div className="grid grid-cols-2 gap-1">
                      <span>• <kbd className="px-1 bg-white rounded">Esc</kbd> Close modal</span>
                      <span>• <kbd className="px-1 bg-white rounded">←</kbd> Previous node</span>
                      <span>• <kbd className="px-1 bg-white rounded">→</kbd> Next node</span>
                      <span>• <kbd className="px-1 bg-white rounded">H</kbd> View history</span>
                    </div>
                  </div>
               </div>
             </div>
           </div>
         )}


      </div>
    </DashboardLayout>
  );
};

export default NetworkViewPage;