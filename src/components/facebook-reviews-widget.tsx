"use client";

export function FacebookReviewsWidget() {
  const facebookReviewUrl =
    "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHodophileadventure&tabs=reviews&width=1000&height=650&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true";

  return (
    <div className="mt-8 overflow-hidden rounded-[16px] border border-[#d8d2c7] bg-white/40 p-3 sm:p-4">
      <div className="w-full overflow-hidden rounded-[12px] bg-white">
        <iframe
          src={facebookReviewUrl}
          width="100%"
          height="650"
          style={{ border: "none", display: "block" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          title="Hodophile Facebook reviews"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
