import { useState } from 'react';
import { flowDiagramNodes, flowDiagramEdges } from '@/data/playwrightData';

interface FlowDiagramProps {
  onNodeClick: (componentId: string | null) => void;
  selectedComponentId: string | null;
}

export default function FlowDiagram({ onNodeClick, selectedComponentId }: FlowDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeColor = (nodeId: string, componentId: string | null) => {
    if (componentId && selectedComponentId === componentId) {
      return 'fill-primary stroke-primary';
    }
    if (hoveredNode === nodeId) {
      return 'fill-primary/10 stroke-primary';
    }
    return 'fill-card stroke-border';
  };

  const getTextColor = (nodeId: string, componentId: string | null) => {
    if (componentId && selectedComponentId === componentId) {
      return 'fill-primary-foreground';
    }
    return 'fill-foreground';
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 100 120"
        className="w-full h-auto max-w-4xl mx-auto"
        style={{ minHeight: '600px' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              className="fill-border"
            />
          </marker>
        </defs>

        {/* Draw edges first (behind nodes) */}
        {flowDiagramEdges.map((edge, index) => {
          const fromNode = flowDiagramNodes.find(n => n.id === edge.from);
          const toNode = flowDiagramNodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y + 3}
              x2={toNode.x}
              y2={toNode.y - 3}
              className="stroke-border"
              strokeWidth="0.2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}

        {/* Draw nodes */}
        {flowDiagramNodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => node.componentId && onNodeClick(node.componentId)}
            className={node.componentId ? 'cursor-pointer' : 'cursor-default'}
          >
            <rect
              x={node.x - 15}
              y={node.y - 2.5}
              width="30"
              height="5"
              rx="0.5"
              className={`${getNodeColor(node.id, node.componentId)} transition-all duration-200`}
              strokeWidth="0.15"
            />
            <text
              x={node.x}
              y={node.y + 0.8}
              textAnchor="middle"
              className={`${getTextColor(node.id, node.componentId)} text-[1.8px] font-medium transition-all duration-200`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
