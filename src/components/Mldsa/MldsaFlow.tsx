import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './MLDSAFlow.css';

export default function MLDSAFlow() {
  return (
    <FlowDiagram
      className="mldsa-flow-wrapper"
      nodes={(s, dark) => [
        { id: 'gen', position: { x: 0, y: 70 }, data: { label: 'GenerateKeys' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
        { id: 'sk', position: { x: 200, y: 0 }, data: { label: 'SecretKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'pk', position: { x: 200, y: 140 }, data: { label: 'PublicKey' }, style: s(dark ? '#22c55e' : '#4ade80'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'msg', position: { x: 200, y: 70 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
        { id: 'sign', position: { x: 400, y: 35 }, data: { label: 'Sign' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'sig', position: { x: 580, y: 35 }, data: { label: 'Signature' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'verify', position: { x: 760, y: 70 }, data: { label: 'Verify' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
        { id: 'valid', position: { x: 940, y: 70 }, data: { label: 'Valid' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Left },
      ]}
      edges={[
        smoothEdge('gen-sk', 'gen', 'sk'),
        smoothEdge('gen-pk', 'gen', 'pk'),
        smoothEdge('sk-sign', 'sk', 'sign'),
        smoothEdge('msg-sign', 'msg', 'sign'),
        smoothEdge('sign-sig', 'sign', 'sig'),
        smoothEdge('sig-verify', 'sig', 'verify'),
        smoothEdge('pk-verify', 'pk', 'verify'),
        smoothEdge('msg-verify', 'msg', 'verify'),
        smoothEdge('verify-valid', 'verify', 'valid'),
      ]}
    />
  );
}
