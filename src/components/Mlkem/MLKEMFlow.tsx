import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './MLKEMFlow.css';

const nodes = (s, dark) => [
  { id: 'gen', position: { x: 0, y: 70 }, data: { label: 'GenerateKeys' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'pk', position: { x: 200, y: 0 }, data: { label: 'PublicKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'sk', position: { x: 200, y: 140 }, data: { label: 'SecretKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'enc', position: { x: 400, y: 0 }, data: { label: 'Encapsulate' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'ss1', position: { x: 600, y: 0 }, data: { label: 'SharedSecret' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'ct', position: { x: 600, y: 70 }, data: { label: 'Ciphertext' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'encrypt', position: { x: 800, y: 0 }, data: { label: 'Encrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left },
  { id: 'dec', position: { x: 400, y: 140 }, data: { label: 'Decapsulate' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'ss2', position: { x: 600, y: 140 }, data: { label: 'SharedSecret' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'decrypt', position: { x: 800, y: 140 }, data: { label: 'Decrypt' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Left },
];

const edges = [
  smoothEdge('gen-pk', 'gen', 'pk'),
  smoothEdge('gen-sk', 'gen', 'sk'),
  smoothEdge('pk-enc', 'pk', 'enc'),
  smoothEdge('enc-ss1', 'enc', 'ss1'),
  smoothEdge('enc-ct', 'enc', 'ct'),
  smoothEdge('ss1-encrypt', 'ss1', 'encrypt'),
  smoothEdge('ct-dec', 'ct', 'dec'),
  smoothEdge('sk-dec', 'sk', 'dec'),
  smoothEdge('dec-ss2', 'dec', 'ss2'),
  smoothEdge('ss2-decrypt', 'ss2', 'decrypt'),
];

const verticalNodes = (s, dark) => [
  { id: 'gen', position: { x: 60, y: 0 }, data: { label: 'GenerateKeys' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'pk', position: { x: 0, y: 80 }, data: { label: 'PublicKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'sk', position: { x: 140, y: 80 }, data: { label: 'SecretKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'enc', position: { x: 0, y: 160 }, data: { label: 'Encapsulate' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'ss1', position: { x: 0, y: 240 }, data: { label: 'SharedSecret' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'ct', position: { x: 140, y: 240 }, data: { label: 'Ciphertext' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'encrypt', position: { x: 0, y: 320 }, data: { label: 'Encrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top },
  { id: 'dec', position: { x: 140, y: 160 }, data: { label: 'Decapsulate' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'ss2', position: { x: 140, y: 320 }, data: { label: 'SharedSecret' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'decrypt', position: { x: 140, y: 400 }, data: { label: 'Decrypt' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Top },
];

const verticalEdges = [
  smoothEdge('gen-pk', 'gen', 'pk'),
  smoothEdge('gen-sk', 'gen', 'sk'),
  smoothEdge('pk-enc', 'pk', 'enc'),
  smoothEdge('enc-ss1', 'enc', 'ss1'),
  smoothEdge('enc-ct', 'enc', 'ct'),
  smoothEdge('ss1-encrypt', 'ss1', 'encrypt'),
  smoothEdge('ct-dec', 'ct', 'dec'),
  smoothEdge('sk-dec', 'sk', 'dec'),
  smoothEdge('dec-ss2', 'dec', 'ss2'),
  smoothEdge('ss2-decrypt', 'ss2', 'decrypt'),
];

export default function MLKEMFlow() {
  return <FlowDiagram className="mlkem-flow-wrapper" nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />;
}
