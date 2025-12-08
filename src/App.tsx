import { useJobStore } from "./store";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/JobCard";
export default function App() {
  const { jobs, addJob, deleteJob } = useJobStore();

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Job Application Tracker</h1>

      <Button onClick={() => addJob("New Company", "New Role")} className="mb-8">
        Add Test Job
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}></JobCard>

      
        ))}
      </div>
    </div>
  );
}
