import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './AEADFlow.css';

const nodes = (s, dark) => [
  { id: 'plaintext', position: { x: 0, y: 0 }, data: { label: 'Plaintext' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'key', position: { x: 0, y: 70 }, data: { label: 'Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'nonce', position: { x: 0, y: 140 }, data: { label: 'Nonce' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'encrypt', position: { x: 220, y: 70 }, data: { label: 'AEAD.Encrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'output', position: { x: 440, y: 70 }, data: { label: 'Ciphertext + Tag' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
];

const edges = [
  smoothEdge('e1', 'plaintext', 'encrypt'),
  smoothEdge('e2', 'key', 'encrypt'),
  smoothEdge('e3', 'nonce', 'encrypt'),
  smoothEdge('e4', 'encrypt', 'output'),
];

const verticalNodes = (s, dark) => [
  { id: 'plaintext', position: { x: 0, y: 0 }, data: { label: 'Plaintext' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'key', position: { x: 0, y: 70 }, data: { label: 'Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'nonce', position: { x: 0, y: 140 }, data: { label: 'Nonce' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'encrypt', position: { x: 0, y: 230 }, data: { label: 'AEAD.Encrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'output', position: { x: 0, y: 320 }, data: { label: 'Ciphertext + Tag' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top },
];

const verticalEdges = [
  smoothEdge('e1', 'plaintext', 'encrypt'),
  smoothEdge('e2', 'key', 'encrypt'),
  smoothEdge('e3', 'nonce', 'encrypt'),
  smoothEdge('e4', 'encrypt', 'output'),
];

export default function AEADFlow() {
  return <FlowDiagram className="aead-flow-wrapper" nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />;
}
