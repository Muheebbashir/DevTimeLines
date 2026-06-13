export interface Project {
  _id: string;
  clerkId: string;
  title: string;
  description: string;
  status: "Planned" | "In Progress" | "Completed";
  progress: number;
  createdAt: string;
  updatedAt: string;
}