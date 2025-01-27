import { Handle, Position } from "@xyflow/react";
import { useStoreFlow } from "../../store";
import { cn } from "@/lib/utils";

function CustomNode({
  isConnectable = false,
  data,
  id,
}: {
  data: {
    name: string;
    description: string;
    icon: string;
    id: string;
  };
  id: string;
  isConnectable: boolean;
}) {
  const { nodeSelected, setNodeSelected } = useStoreFlow();
  return (
    <div
      className={cn(
        "relative min-w-[10rem] max-w-full px-2  border border-foreground/10 rounded-md shadow-md py-2 flex items-center bg-white dark:bg-muted ",
        {
          "border-primary/80": nodeSelected?.id === id,
        }
      )}
      style={{
        transition: "box-shadow 0.3s",
      }}
      onClick={() => {
        setNodeSelected({
          data,
          id,
        });
      }}
    >
      <Handle
        type="source"
        id="s1"
        isConnectable={isConnectable}
        position={Position.Left}
        style={{
          width: "4px",
          height: "20px",
          background: "hsl(360 69% 49%)",
          border: "1px solid #ffffff",
        }}
      />
      <Handle
        type="target"
        id="t1"
        position={Position.Right}
        style={{
          width: "4px",
          height: "20px",
          background: "hsl(360 69% 49%)",
          border: "1px solid #ffffff",
        }}
      />
      <div className="flex h-full w-full items-center gap-2">
        <div className="bg-black/30 rounded-md overflow-hidden">
          <img src={data.icon} alt={data.name} className="w-6 h-6" />
        </div>
        <div className="flex">
          <div className="text-xs text-foreground/60">{data.description}</div>
        </div>
      </div>
    </div>
  );
}

export default CustomNode;
