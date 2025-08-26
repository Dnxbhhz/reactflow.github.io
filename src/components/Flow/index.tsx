import type { Connection, Edge, Node } from '@xyflow/react';
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import CanvasContextMenu from './components/CanvasContextMenu';
import nodeTypes from './components/nodeTypes';
import type { JzFlowProps } from './types';

const PREVIEW_ID = '__preview__';

const Flow = ({ nodes, edges }: JzFlowProps) => {
  const [open, setOpen] = useState(false);
  const [pt, setPt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const rf = useReactFlow();
  const [placingType, setPlacingType] = useState<string | null>(null);

  const initialNodes: Node[] = [
    {
      id: 'n1',
      position: { x: 0, y: 0 },
      data: { label: 'Node 1' },
      type: 'Begin',
    },
    { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  ];

  const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
  const [flowEdges, setFlowEdges] = useState<Edge[]>(edges || initialEdges);

  const startPlacing = useCallback(
    (type: string, at: { x: number; y: number }) => {
      setPlacingType(type);
      const pos = rf.screenToFlowPosition(at);
      rf.setNodes(nodes => {
        const exists = nodes.some(n => n.id === PREVIEW_ID);
        const preview: Node = {
          id: PREVIEW_ID,
          type,
          position: pos,
          data: { label: type, preview: true },
          draggable: false,
          selectable: false,
        };
        return exists
          ? nodes.map(n => (n.id === PREVIEW_ID ? { ...preview } : n))
          : [...nodes, preview];
      });
    },
    [rf]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setFlowEdges((edgesSnapshot: Edge[]) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div
      className='w-full h-full'
      onMouseMove={e => {
        if (!placingType) return;
        const pos = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY });
        rf.setNodes(ns =>
          ns.map(n => (n.id === PREVIEW_ID ? { ...n, position: pos } : n))
        );
      }}
      onClick={e => {
        setOpen(false);
        if (!placingType) return;
        const pos = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY });
        rf.setNodes(ns =>
          ns
            .filter(n => n.id !== PREVIEW_ID)
            .concat([
              {
                id: nanoid(),
                type: placingType,
                position: pos,
                data: { label: placingType },
              },
            ])
        );
        setPlacingType(null);
      }}
    >
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        onPaneContextMenu={e => {
          e.preventDefault();
          setPt({ x: e.clientX, y: e.clientY });
          setOpen(true);
        }}
        onNodeContextMenu={e => {
          e.preventDefault();
          setPt({ x: e.clientX, y: e.clientY });
          setOpen(true);
        }}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onClick={() => setOpen(false)}
      >
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>

      <CanvasContextMenu
        handleAddNode={startPlacing}
        open={open}
        onOpenChange={setOpen}
        anchor={pt}
      />
    </div>
  );
};

export default function JzFlow(props: JzFlowProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
