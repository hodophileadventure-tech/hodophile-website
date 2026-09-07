import type { MetadataRoute } from "next";

import { absoluteUrl, allTourRoutes, blogPosts, destinationGalleryRoutes } from "@/lib/site";
import { featuredTourRoutePaths } from "@/lib/data/featured-tour-cards";
import { umrahPackages } from "@/lib/data/umrah-packages";
import { exclusiveOffers, premiumDestinations, readyToBookDestinations } from "@/lib/data/premiumDestinations.js";

const packageRoutes = [...premiumDestinations, ...readyToBookDestinations, ...exclusiveOffers].map((item) => `/packages/${item.id}`);

const routes = [
  "/",
  "/about",
  "/about-us",
  "/our-team",
  "/blog",
  "/blogs",
  ...blogPosts.map((post) => `/blogs/${post.slug}`),
  "/contact",
  "/contact-us",
  "/destinations",
  "/gallery",
  "/hotels",
  "/honeymoon-packages",
  "/inquiry",
  "/make-my-trip",
  "/terms-and-conditions",
  "/tours",
  "/umrah-packages",
  "/umrah-packages/book",
  ...umrahPackages.map((pkg) => `/umrah-packages/${pkg.id}`),
  ...packageRoutes,
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
