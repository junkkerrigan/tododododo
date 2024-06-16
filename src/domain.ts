export type Todo = {
  id: string;
  title: string;
  description: string | null;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const storageNamespaceId = "tododododo";
