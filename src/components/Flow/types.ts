import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from '@xyflow/react';

export interface JzFlowProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodesChange?: (_changes: NodeChange[]) => void;
  onEdgesChange?: (_changes: EdgeChange[]) => void;
  onConnect?: (_connection: Connection) => void;
}

export interface JzFlowState {
  flowNodes: Node[];
  flowEdges: Edge[];
}
