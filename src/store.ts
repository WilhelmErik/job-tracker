import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Job, Status } from "./types/job";

interface JobStore {
  jobs: Job[];
  addJob: (company: string, title: string) => void;
  moveJob: (id: string, newStatus: Status) => void;
  deleteJob: (id: string) => void;
}

// Note the extra () parentheses! This is "Currying".
// We wrap the whole store function inside persist().
export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      // 1. Initial State
      // We start empty because the persist middleware will
      // automatically load any saved data from localStorage.
      jobs: [],

      // 2. Actions
      addJob: (company, title) =>
        set((state) => ({
          jobs: [
            ...state.jobs,
            {
              id: uuidv4(),
              company,
              title,
              status: "APPLIED",
              date: new Date().toISOString(),
            },
          ],
        })),

      moveJob: (id, newStatus) =>
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)),
        })),

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),
    }),
    {
      // 3. Configuration
      name: "job-tracker-storage", // The unique name in your browser's memory
      storage: createJSONStorage(() => localStorage),
    }
  )
);
