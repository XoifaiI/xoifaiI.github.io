import React, { useEffect, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow, type Node, type Edge } from 'reactflow';
import { useColorMode } from '@docusaurus/theme-common';
import 'reactflow/dist/style.css';

type NodeStyle = (bg: string) => React.CSSProperties;

type FlowDiagramProps = {
  nodes: (nodeStyle: NodeStyle, isDark: boolean) => Node[];
  edges: Edge[];
  className?: string;
};

export function smoothEdge(id: string, source: string, target: string): Edge {
  return { id, source, target, type: 'smoothstep', animated: true };
}

function FlowInner({ nodes, edges }: Omit<FlowDiagramProps, 'className'>) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const reactFlowInstance = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reactFlowInstance]);

  const nodeStyle: NodeStyle = (bg) => ({
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    padding: '10px 20px',
  });

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes(nodeStyle, isDark)}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        preventScrolling={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}

export default function FlowDiagram({ nodes, edges, className }: FlowDiagramProps) {
  return (
    <div className={className}>
      <ReactFlowProvider>
        <FlowInner nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
