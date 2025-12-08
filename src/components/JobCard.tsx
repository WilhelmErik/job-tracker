import type { Job } from "@/types/job";
// Import the UI components (Card, CardContent, CardHeader, CardTitle) from shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import Badge and Button
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import the Trash2 icon from lucide-react
import { Trash2Icon } from "lucide-react";

// Import the useJobStore hook
import { useJobStore } from "@/store";

// Define the Props interface (we need a 'job' object)
interface JobCardProps {
  job: Job;
}
// Create the component function
export function JobCard({ job }: JobCardProps) {
  // Hook: Get the 'deleteJob' action from our store
  const deleteJob = useJobStore((state) => state.deleteJob);
  return (
    // Root: Card component.
    // Styling: Needs 'group' for hover effects, 'relative', and cursor classes for dragging.
    <Card className="group relative hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing bg-white">
      {/* Header Section */}
      <CardHeader className="...">
        <div className="flex justify-between items-start">
          {/* Company Name (CardTitle) */}
          <CardTitle className="text-sm font-medium">{job.company}</CardTitle>
          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              deleteJob(job.id);
            }}
          >
            <Trash2Icon className="h-3 w-3" />
          </Button>
          {/* Styling: Ghost variant, small icon size. */}
          {/* Trick: opacity-0 by default, group-hover:opacity-100 to show on hover. */}
          {/* Icon: Trash2 */}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4 pt-0">
        {/* Job Title (small gray text) */}
        <p className=" text-xs text-gray-500 mb-2">{job.title}</p>
        {/* Footer area inside content */}
        <div className="flex justify-between items-center mt-2">
          {/* Date Badge (secondary variant) */}
          {/* Use new Date(job.date).toLocaleDateString() to format it */}
          <Badge variant="secondary" className="text-[10px] px-1 py-0 h5 font-normal">
            {new Date(job.date).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
