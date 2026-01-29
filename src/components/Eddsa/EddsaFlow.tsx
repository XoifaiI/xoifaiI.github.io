import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './EddsaFlow.css';

export default function SignEncryptFlow() {
  return (
    <FlowDiagram
      className="sign-encrypt-flow-wrapper"
      nodes={(s, dark) => [
        { id: 'message', position: { x: 0, y: 0 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'sign', position: { x: 0, y: 70 }, data: { label: 'Sign' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'encrypt', position: { x: 200, y: 35 }, data: { label: 'Encrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'decrypt', position: { x: 380, y: 35 }, data: { label: 'Decrypt' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'verify', position: { x: 560, y: 35 }, data: { label: 'Verify' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'valid', position: { x: 720, y: 35 }, data: { label: 'Valid' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
      ]}
      edges={[
        smoothEdge('e1', 'message', 'encrypt'),
        smoothEdge('e2', 'sign', 'encrypt'),
        smoothEdge('e3', 'encrypt', 'decrypt'),
        smoothEdge('e4', 'decrypt', 'verify'),
        smoothEdge('e5', 'verify', 'valid'),
      ]}
    />
  );
}
