import { useState } from "react";
import { useJobStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import type { JobSource } from "@/types/job";

export function AddJobForm() {
  const addJob = useJobStore((state) => state.addJob);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [source, setSource] = useState<JobSource>("LINKEDIN");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !title) return;

    addJob(company, title, source);

    setCompany("");
    setTitle("");
    setIsOpen(false);
  };

  const jobSources: { name: string; value: JobSource }[] = [
    { name: "LinkedIn", value: "LINKEDIN" },
    { name: "Indeed", value: "INDEED" },
    { name: "Company Site", value: "COMPANY_SITE" },
    { name: "Glassdoor", value: "GLASSDOOR" },
    { name: "Other", value: "OTHER" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="col-span-3"
              placeholder="e.g. Spotify"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Role
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g. Frontend Developer"
            />
          </div>
       
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Source</Label>
            <Select value={source} onValueChange={(val) => setSource(val as JobSource)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Source" />
              </SelectTrigger>
              <SelectContent>
                {jobSources.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
