import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Job, Status } from "./types/job";

interface JobStore {
  jobs: Job[];
  addJob: (company: string, title: string) => void;
  moveJob: (id: string, newStatus: Status) => void;
  deleteJob: (id: string) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  // 1. Initial State (Dummy Data)
  jobs: [
    {
      id: uuidv4(),
      company: "Spotify",
      title: "Frontend Developer",
      status: "APPLIED",
      date: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      company: "Klarna",
      title: "React Engineer",
      status: "INTERVIEW",
      date: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      company: "Google",
      title: "Tech Lead",
      status: "REJECTED",
      date: new Date().toISOString(),
    },
  ],

  // 2. Actions (The logic)
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
}));
