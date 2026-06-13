export interface Timeline {
  _id: string;
  userId: string;
  projectId?: string | null;

  title: string;
  description: string;
  imageUrl: string;

  category: string;
  impactScore: number;

  createdAt: string;
  updatedAt: string;
}