import { useJobStore } from "./store";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState,useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
import { AddJobForm } from "./components/AddJobForm";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { Column } from "./components/Column";
// import { Draggable } from "@/Draggable";
// import { Droppable } from "@/Droppable";
import type { ColumnType, Status } from "./types/job";
import DashboardStats from "./components/DashboardStats";
import { JobDetailSheet } from "./components/JobDetailSheet";
import type { Job } from "./types/job";
export default function App() {
  const { jobs, moveJob } = useJobStore();
  const [searchTerm, setSearchTerm] = useState("");
  const query = searchTerm.toLowerCase();
  const filteredJobs = jobs.filter(
    (job) => job.company.toLowerCase().includes(query) || job.title.toLowerCase().includes(query),
  );
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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  useEffect(()=>{
    console.log(selectedJob);
  
  },[selectedJob])
  const COLUMNS: ColumnType[] = [
    { id: "APPLIED", title: "Applied" },
    { id: "INTERVIEW", title: "Interview" },
    { id: "OFFER", title: "Offer" },
    { id: "REJECTED", title: "Rejected" },
  ];
  // const [parent, setParent] = useState(null);
  function setAJob()  {
    setSelectedJob(jobs[1]);
    console.log(jobs);
   };
  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <JobDetailSheet isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} job={selectedJob} />
      <button
        onClick={setAJob}
      >
        test
      </button>

      <h1 className="text-3xl font-bold mb-8">Job Application Tracker</h1>

      <AddJobForm />
      <DashboardStats />
      <div className="relative flex-1 md:w-64">
        {" "}
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by company or role..."
          className="pl-9 bg-white"
        ></Input>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-150px)]">
          {COLUMNS.map((column) => {
            const columnJobs = filteredJobs.filter((job) => job.status === column.id);

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
