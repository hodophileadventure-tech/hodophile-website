import type { MetadataRoute } from "next";

import { absoluteUrl, allTourRoutes, blogPosts, destinationGalleryRoutes } from "@/lib/site";
import { indexableFeaturedTourRoutePaths } from "@/lib/data/featured-tour-cards";
import { umrahPackages } from "@/lib/data/umrah-packages";
import { exclusiveOffers, premiumDestinations, readyToBookDestinations } from "@/lib/data/premiumDestinations";
import { tourPackages } from "@/lib/data/tour-packages";
import { getPackagePath } from "@/lib/data/package-routes";
import { additionalHoneymoonPackages } from "@/lib/data/additional-honeymoon-packages";
import { getNorthernAirTourPath, northernAirTours } from "@/lib/data/northern-air-tours";

const packageRoutes = [...premiumDestinations, ...readyToBookDestinations, ...exclusiveOffers, ...tourPackages]
  .map((item) => getPackagePath(item.id));

const routes = [...new Set([
  "/",
  "/about-us",
  "/our-team",
  "/blogs",
  ...blogPosts.map((post) => `/blogs/${post.slug}`),
  "/contact-us",
  "/destinations",
  "/explore-pakistan",
  "/beyond-pakistan",
  "/gallery",
  "/hotels",
  "/honeymoon-packages",
  ...Object.keys(additionalHoneymoonPackages).map((slug) => `/honeymoon-packages/${slug}`),
  "/inquiry",
  "/make-my-trip",
  "/terms-and-conditions",
  "/trip-suggestions",
  "/tours",
  "/tours/adventure",
  "/umrah-packages",
  "/umrah-packages/book",
  ...umrahPackages.map((pkg) => `/umrah-packages/${pkg.id}`),
  ...packageRoutes,
  ...allTourRoutes,
  ...northernAirTours.map((tour) => getNorthernAirTourPath(tour.id)),
  ...indexableFeaturedTourRoutePaths,
  ...destinationGalleryRoutes,
])];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
