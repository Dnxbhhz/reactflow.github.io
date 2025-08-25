import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from '@xyflow/react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';
import { useCallback, useState } from 'react';
import nodeTypes from './components/nodeTypes';
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from './components/PortalToFollowElemContent';
import type { JzFlowProps } from './types';

const JzFlow = ({ nodes, edges }: JzFlowProps) => {
  const [open, setOpen] = useState(false);
  const [pt, setPt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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
  const [flowNodes, setFlowNodes] = useState<Node[]>(nodes || initialNodes);
  const [flowEdges, setFlowEdges] = useState<Edge[]>(edges || initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setFlowNodes((nodesSnapshot: Node[]) =>
        applyNodeChanges(changes, nodesSnapshot)
      ),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setFlowEdges((edgesSnapshot: Edge[]) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    []
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setFlowEdges((edgesSnapshot: Edge[]) => addEdge(params, edgesSnapshot)),
    []
  );
  return (
    <div
      className='w-full h-full'
      onContextMenu={e => {
        e.preventDefault();
        setPt({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}
      onClick={() => setOpen(false)} // 左键关闭（可选
    >
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>

      <PortalToFollowElem
        open={open}
        onOpenChange={setOpen}
        placement='bottom-start'
        offset={6}
      >
        {/* 用零尺寸“参考元素”承载坐标 */}
        <PortalToFollowElemTrigger asChild>
          <div
            style={{
              position: 'fixed',
              left: pt.x,
              top: pt.y,
              width: 0,
              height: 0,
            }}
          />
        </PortalToFollowElemTrigger>

        <PortalToFollowElemContent className='rounded border bg-white shadow p-2'>
          <ul onClick={() => setOpen(false)}>
            <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>开始</li>
            <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>结束</li>
          </ul>
        </PortalToFollowElemContent>
      </PortalToFollowElem>
    </div>
  );
};

export default JzFlow;
