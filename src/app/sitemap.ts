import type { MetadataRoute } from "next";

import { absoluteUrl, allTourRoutes, blogPosts, destinationGalleryRoutes } from "@/lib/site";
import { featuredTourRoutePaths } from "@/lib/data/featured-tour-cards";
import { umrahPackages } from "@/lib/data/umrah-packages";
import { exclusiveOffers, premiumDestinations, readyToBookDestinations } from "@/lib/data/premiumDestinations.js";
import { seasonalTourPackages } from "@/lib/data/seasonal-tour-packages";
import { additionalHoneymoonPackages } from "@/lib/data/additional-honeymoon-packages";

const packageRoutes = [...premiumDestinations, ...readyToBookDestinations, ...exclusiveOffers].map((item) => `/packages/${item.id}`);
const seasonalPackageRoutes = seasonalTourPackages.map((item) => `/packages/${item.id}`);

const routes = [
  "/",
  "/about-us",
  "/our-team",
  "/blogs",
  ...blogPosts.map((post) => `/blogs/${post.slug}`),
  "/contact-us",
  "/destinations",
  "/gallery",
  "/hotels",
  "/honeymoon-packages",
  ...Object.keys(additionalHoneymoonPackages).map((slug) => `/honeymoon-packages/${slug}`),
  "/inquiry",
  "/make-my-trip",
  "/terms-and-conditions",
  "/tours",
  "/umrah-packages",
  "/umrah-packages/book",
  ...umrahPackages.map((pkg) => `/umrah-packages/${pkg.id}`),
  ...packageRoutes,
  ...seasonalPackageRoutes,
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
