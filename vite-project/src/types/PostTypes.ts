export interface Post {
    id: number;
    title: string;
    content: string;
    image: string; 
    status: 'draft' | 'published' | 'archived'; 
    category: string; 
  }
  