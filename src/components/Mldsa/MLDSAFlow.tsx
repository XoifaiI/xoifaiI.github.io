import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './MLDSAFlow.css';

const nodes = (s, dark) => [
  { id: 'gen', position: { x: 0, y: 70 }, data: { label: 'GenerateKeys' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'sk', position: { x: 200, y: 0 }, data: { label: 'SecretKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'pk', position: { x: 200, y: 140 }, data: { label: 'PublicKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'msg', position: { x: 200, y: 70 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'sign', position: { x: 400, y: 35 }, data: { label: 'Sign' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'sig', position: { x: 580, y: 35 }, data: { label: 'Signature' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'verify', position: { x: 760, y: 70 }, data: { label: 'Verify' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'valid', position: { x: 940, y: 70 }, data: { label: 'Valid' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Left },
];

const edges = [
  smoothEdge('gen-sk', 'gen', 'sk'),
  smoothEdge('gen-pk', 'gen', 'pk'),
  smoothEdge('sk-sign', 'sk', 'sign'),
  smoothEdge('msg-sign', 'msg', 'sign'),
  smoothEdge('sign-sig', 'sign', 'sig'),
  smoothEdge('sig-verify', 'sig', 'verify'),
  smoothEdge('pk-verify', 'pk', 'verify'),
  smoothEdge('msg-verify', 'msg', 'verify'),
  smoothEdge('verify-valid', 'verify', 'valid'),
];

const verticalNodes = (s, dark) => [
  { id: 'gen', position: { x: 60, y: 0 }, data: { label: 'GenerateKeys' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'sk', position: { x: 0, y: 80 }, data: { label: 'SecretKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'pk', position: { x: 140, y: 80 }, data: { label: 'PublicKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'msg', position: { x: 60, y: 160 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'sign', position: { x: 60, y: 240 }, data: { label: 'Sign' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'sig', position: { x: 60, y: 320 }, data: { label: 'Signature' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'verify', position: { x: 60, y: 400 }, data: { label: 'Verify' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'valid', position: { x: 60, y: 480 }, data: { label: 'Valid' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Top },
];

const verticalEdges = [
  smoothEdge('gen-sk', 'gen', 'sk'),
  smoothEdge('gen-pk', 'gen', 'pk'),
  smoothEdge('sk-sign', 'sk', 'sign'),
  smoothEdge('msg-sign', 'msg', 'sign'),
  smoothEdge('sign-sig', 'sign', 'sig'),
  smoothEdge('sig-verify', 'sig', 'verify'),
  smoothEdge('pk-verify', 'pk', 'verify'),
  smoothEdge('msg-verify', 'msg', 'verify'),
  smoothEdge('verify-valid', 'verify', 'valid'),
];

export default function MLDSAFlow() {
  return <FlowDiagram className="mldsa-flow-wrapper" nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />;
}
