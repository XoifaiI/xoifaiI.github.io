import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './BlakeFlow.css';

export default function BlakeFlow() {
  return (
    <FlowDiagram
      className="blake-flow-wrapper"
      nodes={(s, dark) => [
        { id: 'ms', position: { x: 0, y: 100 }, data: { label: 'Master Secret' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
        { id: 'c1', position: { x: 180, y: 0 }, data: { label: 'Context: encryption' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'c2', position: { x: 180, y: 100 }, data: { label: 'Context: mac' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'c3', position: { x: 180, y: 200 }, data: { label: 'Context: auth' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'd1', position: { x: 400, y: 0 }, data: { label: 'DeriveKey' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'd2', position: { x: 400, y: 100 }, data: { label: 'DeriveKey' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'd3', position: { x: 400, y: 200 }, data: { label: 'DeriveKey' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'ek', position: { x: 580, y: 0 }, data: { label: 'Encryption Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
        { id: 'mk', position: { x: 580, y: 100 }, data: { label: 'MAC Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
        { id: 'ak', position: { x: 580, y: 200 }, data: { label: 'Auth Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
      ]}
      edges={[
        smoothEdge('ms-d1', 'ms', 'd1'),
        smoothEdge('ms-d2', 'ms', 'd2'),
        smoothEdge('ms-d3', 'ms', 'd3'),
        smoothEdge('c1-d1', 'c1', 'd1'),
        smoothEdge('c2-d2', 'c2', 'd2'),
        smoothEdge('c3-d3', 'c3', 'd3'),
        smoothEdge('d1-ek', 'd1', 'ek'),
        smoothEdge('d2-mk', 'd2', 'mk'),
        smoothEdge('d3-ak', 'd3', 'ak'),
      ]}
    />
  );
}
