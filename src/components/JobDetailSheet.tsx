import { useState } from "react"  
import type { Job } from "@/types/job"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"  
import { Input } from "@/components/ui/input"    

interface JobDetailSheetProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
}

export function JobDetailSheet({ isOpen, onClose, job }: JobDetailSheetProps) {
  // 4. The State Switch
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        {job && (
          <>
            <SheetHeader className="flex flex-row justify-between items-center space-y-0">
              {/* 5. Conditional Title: Input vs Text */}
              <div className="space-y-1">
                {isEditing ? (
                    <Input defaultValue={job.company} className="font-bold text-xl h-9" />
                ) : (
                    <SheetTitle className="text-xl font-bold">{job.company}</SheetTitle>
                )}
                
                <SheetDescription className="text-base">
                  {job.title}
                </SheetDescription>
              </div>

              {/* 6. The "Ugly" Toggle Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </SheetHeader>

            <div className="mt-8 space-y-4">
              <div className="p-4 bg-secondary rounded-lg border">
                <h3 className="text-sm font-medium text-primary mb-1">Status</h3>
                <p className="font-semibold capitalize">{job.status}</p>
              </div>

              <div className="p-4 bg-secondary rounded-lg border">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Source
                </h3>
                <p className="font-semibold">{job.source || "Not specified"}</p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}