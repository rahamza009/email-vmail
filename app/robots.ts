import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/login",
          "/api/",
          // Block legacy WordPress & cPanel paths from being crawled
          "/cgi-sys/",
          "/cgi-bin/",
          "/wp-admin/",
          "/wp-login.php",
          "/wp-content/",
          "/wp-includes/",
          "/wp-json/",
          "/xmlrpc.php",
          "/feed",
          "/feed/",
          "/comments/feed",
          // Block query-param ghost URLs
          "/*?page_id=",
          "/*?feed=",
          "/*?p=",
          "/*?cat=",
        ],
      },
    ],
    sitemap: "https://emailvmail.com/sitemap.xml",
  };
}
