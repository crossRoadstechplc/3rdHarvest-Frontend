import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, let the page handle it (for homepage sections)
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // If element not found, scroll to top
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      // No hash, scroll to top immediately
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};
