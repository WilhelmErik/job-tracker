import { useJobStore } from "./store";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import { AddJobForm } from "./components/AddJobForm";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { Column } from "./components/Column";
// import { Draggable } from "@/Draggable";
// import { Droppable } from "@/Droppable";
import type { ColumnType,Status } from "./types/job";
import DashboardStats from "./components/DashboardStats";
export default function App() {
  const { jobs, moveJob } = useJobStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // If dropped outside a column, do nothing
    if (!over) return;

    // Get the IDs
    const jobId = active.id as string;
    const newStatus = over.id as Status;

    // Only update if we moved to a DIFFERENT column
    // (We find the current job to check its status)
    const currentJob = jobs.find((j) => j.id === jobId);
    if (currentJob && currentJob.status !== newStatus) {
      moveJob(jobId, newStatus);
    }
  }
  
  const COLUMNS: ColumnType[] = [
    { id: "APPLIED", title: "Applied" },
    { id: "INTERVIEW", title: "Interview" },
    { id: "OFFER", title: "Offer" },
    { id: "REJECTED", title: "Rejected" },
  ];
  // const [parent, setParent] = useState(null);

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Job Application Tracker</h1>

      <AddJobForm />
      <DashboardStats />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-150px)]">
          {COLUMNS.map((column) => {
            const columnJobs = jobs.filter((job) => job.status === column.id);

            return (
              <Column key={column.id} id={column.id} title={column.title} count={columnJobs.length}>
                {columnJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </Column>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
  
}
