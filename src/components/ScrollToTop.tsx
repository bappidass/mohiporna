import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export default function ScrollToTop() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
