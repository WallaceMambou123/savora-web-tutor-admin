export type User = {
  id: string;
  email?: string;
  role: 'admin' | 'tuteur' | 'user';
};

export type Cours = {
  id: string;
  title: string;
  description?: string;
  authorId: string;
};
