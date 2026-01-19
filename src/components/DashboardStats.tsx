import { useJobStore } from "@/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle2 } from "lucide-react";

export function DashboardStats() {
  const jobs = useJobStore((state) => state.jobs);

  //Logic
  const totalJobs = jobs.length;
  const jobInterviews = jobs.filter((job) => job.status === "INTERVIEW" || job.status === "OFFER").length;
  const jobOffers = jobs.filter((job) => job.status === "OFFER").length;

  const interviewRate = jobInterviews > 0 ? Math.round((jobInterviews / totalJobs) * 100) : 0;

  // console.log(jobInterviews, ":interviews", interviewRate, ":rate");
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applied</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalJobs}</div>
          <p className="text-xs text-muted-foreground">Applications sent</p>
        </CardContent>
      </Card>

      {/* Card 2: Interviews */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{jobInterviews}</div>
          <p className="text-xs text-muted-foreground">{interviewRate}% success rate</p>
        </CardContent>
      </Card>

      {/* Card 3: Offers (The Goal!) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offers</CardTitle>
          <div className="text-emerald-500 font-bold">$$$</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{jobOffers}</div>
          <p className="text-xs text-muted-foreground">Job offers received</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardStats;
