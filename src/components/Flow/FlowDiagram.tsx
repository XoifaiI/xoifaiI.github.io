import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow, type Node, type Edge, type ReactFlowInstance } from 'reactflow';
import { useColorMode } from '@docusaurus/theme-common';
import 'reactflow/dist/style.css';

type NodeStyle = (bg: string) => React.CSSProperties;

type FlowDiagramProps = {
  nodes: (nodeStyle: NodeStyle, isDark: boolean) => Node[];
  edges: Edge[];
  verticalNodes?: (nodeStyle: NodeStyle, isDark: boolean) => Node[];
  verticalEdges?: Edge[];
  className?: string;
};

export function smoothEdge(id: string, source: string, target: string): Edge {
  return { id, source, target, type: 'smoothstep', animated: true };
}

const nodeStyle: NodeStyle = (bg) => ({
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontSize: 14,
  padding: '10px 20px',
});

const fitViewOpts = { padding: 0.2, minZoom: 0.1, maxZoom: 1 };

function FlowInner({ nodes, edges, verticalNodes, verticalEdges }: Omit<FlowDiagramProps, 'className'>) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const { fitView } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setIsNarrow(width < 468);
      requestAnimationFrame(() => {
        fitView(fitViewOpts);
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [fitView]);

  const useVertical = isNarrow && verticalNodes && verticalEdges;
  const activeNodes = useVertical ? verticalNodes : nodes;
  const activeEdges = useVertical ? verticalEdges : edges;

  useEffect(() => {
    requestAnimationFrame(() => {
      fitView(fitViewOpts);
    });
  }, [activeNodes, isDark, fitView]);

  const resolvedNodes = useMemo(() => activeNodes(nodeStyle, isDark), [activeNodes, isDark]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={resolvedNodes}
        edges={activeEdges}
        fitView
        fitViewOptions={fitViewOpts}
        minZoom={0.1}
        preventScrolling={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

export default function FlowDiagram({ nodes, edges, verticalNodes, verticalEdges, className }: FlowDiagramProps) {
  return (
    <div className={className}>
      <ReactFlowProvider>
        <FlowInner nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />
      </ReactFlowProvider>
    </div>
  );
}
