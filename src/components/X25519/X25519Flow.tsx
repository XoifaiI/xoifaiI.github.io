import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './X25519Flow.css';

const x25519Nodes = (s, dark) => [
  { id: 'a1', position: { x: 0, y: 0 }, data: { label: 'Generate Secret' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'a2', position: { x: 200, y: 0 }, data: { label: 'Mask Key' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'a3', position: { x: 380, y: 0 }, data: { label: 'Get Public' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'b1', position: { x: 0, y: 140 }, data: { label: 'Generate Secret' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'b2', position: { x: 200, y: 140 }, data: { label: 'Mask Key' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'b3', position: { x: 380, y: 140 }, data: { label: 'Get Public' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'a4', position: { x: 580, y: 0 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'b4', position: { x: 580, y: 140 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 's', position: { x: 780, y: 70 }, data: { label: 'Same Shared Secret' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
];

const x25519Edges = [
  smoothEdge('a1-a2', 'a1', 'a2'),
  smoothEdge('a2-a3', 'a2', 'a3'),
  smoothEdge('b1-b2', 'b1', 'b2'),
  smoothEdge('b2-b3', 'b2', 'b3'),
  smoothEdge('a3-b4', 'a3', 'b4'),
  smoothEdge('b3-a4', 'b3', 'a4'),
  smoothEdge('a4-s', 'a4', 's'),
  smoothEdge('b4-s', 'b4', 's'),
];

const x25519VerticalNodes = (s, dark) => [
  { id: 'a1', position: { x: 0, y: 0 }, data: { label: 'Generate Secret' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'a2', position: { x: 0, y: 80 }, data: { label: 'Mask Key' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'a3', position: { x: 0, y: 160 }, data: { label: 'Get Public' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'b1', position: { x: 160, y: 0 }, data: { label: 'Generate Secret' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'b2', position: { x: 160, y: 80 }, data: { label: 'Mask Key' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'b3', position: { x: 160, y: 160 }, data: { label: 'Get Public' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'a4', position: { x: 0, y: 240 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'b4', position: { x: 160, y: 240 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 's', position: { x: 50, y: 320 }, data: { label: 'Same Shared Secret' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top },
];

const x25519VerticalEdges = [
  smoothEdge('a1-a2', 'a1', 'a2'),
  smoothEdge('a2-a3', 'a2', 'a3'),
  smoothEdge('b1-b2', 'b1', 'b2'),
  smoothEdge('b2-b3', 'b2', 'b3'),
  smoothEdge('a3-b4', 'a3', 'b4'),
  smoothEdge('b3-a4', 'b3', 'a4'),
  smoothEdge('a4-s', 'a4', 's'),
  smoothEdge('b4-s', 'b4', 's'),
];

const sessionNodes = (s, dark) => [
  { id: 'mask', position: { x: 200, y: 0 }, data: { label: 'Mask' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'public', position: { x: 380, y: 0 }, data: { label: 'Get Public Key' }, style: s(dark ? '#6366f1' : '#818cf8'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'peer', position: { x: 380, y: 100 }, data: { label: 'PeerPublic' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'exchange', position: { x: 580, y: 50 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'shared', position: { x: 760, y: 0 }, data: { label: 'SharedSecret' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'context', position: { x: 760, y: 100 }, data: { label: 'Context' }, style: s(dark ? '#f59e0b' : '#fbbf24'), sourcePosition: Position.Right },
  { id: 'blake3', position: { x: 940, y: 50 }, data: { label: 'Blake3.DeriveKey' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'key', position: { x: 1140, y: 50 }, data: { label: 'SessionKey' }, style: s(dark ? '#a3a322' : '#d4d462'), targetPosition: Position.Left },
];

const sessionEdges = [
  smoothEdge('gen-mask', 'gen', 'mask'),
  smoothEdge('mask-public', 'mask', 'public'),
  smoothEdge('public-exchange', 'public', 'exchange'),
  smoothEdge('peer-exchange', 'peer', 'exchange'),
  smoothEdge('exchange-shared', 'exchange', 'shared'),
  smoothEdge('shared-blake3', 'shared', 'blake3'),
  smoothEdge('context-blake3', 'context', 'blake3'),
  smoothEdge('blake3-key', 'blake3', 'key'),
];

const sessionVerticalNodes = (s, dark) => [
  { id: 'mask', position: { x: 0, y: 0 }, data: { label: 'Mask' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'public', position: { x: 160, y: 0 }, data: { label: 'Get Public Key' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'peer', position: { x: 160, y: 100 }, data: { label: 'PeerPublic' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'exchange', position: { x: 80, y: 200 }, data: { label: 'Exchange' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'shared', position: { x: 0, y: 300 }, data: { label: 'SharedSecret' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'context', position: { x: 160, y: 300 }, data: { label: 'Context' }, style: s(dark ? '#f59e0b' : '#fbbf24'), sourcePosition: Position.Bottom },
  { id: 'blake3', position: { x: 60, y: 400 }, data: { label: 'Blake3.DeriveKey' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'key', position: { x: 70, y: 500 }, data: { label: 'SessionKey' }, style: s(dark ? '#a3a322' : '#d4d462'), targetPosition: Position.Top },
];

const sessionVerticalEdges = [
  smoothEdge('gen-mask', 'gen', 'mask'),
  smoothEdge('mask-public', 'mask', 'public'),
  smoothEdge('public-exchange', 'public', 'exchange'),
  smoothEdge('peer-exchange', 'peer', 'exchange'),
  smoothEdge('exchange-shared', 'exchange', 'shared'),
  smoothEdge('shared-blake3', 'shared', 'blake3'),
  smoothEdge('context-blake3', 'context', 'blake3'),
  smoothEdge('blake3-key', 'blake3', 'key'),
];

export function X25519Flow() {
  return <FlowDiagram className="x25519-flow-wrapper" nodes={x25519Nodes} edges={x25519Edges} verticalNodes={x25519VerticalNodes} verticalEdges={x25519VerticalEdges} />;
}

export function SessionKeyFlow() {
  return <FlowDiagram className="x25519-flow-wrapper" nodes={sessionNodes} edges={sessionEdges} verticalNodes={sessionVerticalNodes} verticalEdges={sessionVerticalEdges} />;
}
