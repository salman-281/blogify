import { getAllBlogData } from "@/app/(home)/_actions/action";

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    image: string;
  };
  link: string;
  favorite: boolean;
  popular: boolean;
  likes: number;
  shares: number;
  commentsCount: number;
  tags: string[];
  readTime: string;
  isFeatured: boolean;
  markdownContent: string;
}

// Helper to filter by category
async function filterByCategory(category: string): Promise<BlogPost[]> {
  const data = await getAllBlogData();
  return data.filter((item: BlogPost) => item.category === category);
}

// ✅ Export each category as a Promise
export const NatureData = filterByCategory("Nature");
export const BusinessData = filterByCategory("Business");
export const LifestyleData = filterByCategory("Lifestyle");
export const HealthData = filterByCategory("Health");
export const GamesData = filterByCategory("Games");
export const MusicData = filterByCategory("Music");
export const PhotographyData = filterByCategory("Photography");
export const TechnologyData = filterByCategory("Technology");

