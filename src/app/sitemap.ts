import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/util";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cirex.dev/home/about",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.cirex.dev/home/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.cirex.dev/home/history",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.5,
    },
    ...getAllPosts().map((postData) => ({
      url: `https://www.cirex.dev/blog/${postData.id}`,
      lastModified: postData.date ? new Date(postData.date) : new Date(),
      changeFrequency: "never" as const,
      priority: 0.5,
    })),
  ];
}
