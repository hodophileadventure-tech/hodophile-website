import type { MetadataRoute } from "next";

import { absoluteUrl, allTourRoutes, blogPosts, destinationGalleryRoutes } from "@/lib/site";
import { featuredTourRoutePaths } from "@/lib/data/featured-tour-cards";

const routes = [
  "/",
  "/about",
  "/about-us",
  "/blog",
  "/blogs",
  ...blogPosts.map((post) => `/blogs/${post.slug}`),
  "/contact",
  "/contact-us",
  "/destinations",
  "/gallery",
  "/honeymoon-packages",
  "/inquiry",
  "/make-my-trip",
  "/terms-and-conditions",
  "/tours",
  "/umrah-packages",
  ...allTourRoutes,
  ...featuredTourRoutePaths,
  ...destinationGalleryRoutes,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
