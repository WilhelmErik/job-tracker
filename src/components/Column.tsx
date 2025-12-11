import { useDroppable } from "@dnd-kit/core";
import type { Status } from "@/types/job";

interface ColumnProps {
  id: Status;
  title: string;
  count: number;
  children: React.ReactNode; // The list of JobCards
}

export function Column({ id, title, count, children }: ColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-1 min-w-[300px] bg-slate-100/50 rounded-lg p-4 border border-slate-200 h-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-slate-700">{title}</h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-200 px-2 py-1 rounded-full">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
