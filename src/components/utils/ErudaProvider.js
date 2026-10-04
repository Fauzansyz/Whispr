"use client";

import { useEffect } from "react";

export default function ErudaProvider(status) {
  useEffect(() => {
    let erudaInstance = null;
    if (typeof window !== "undefined" && status.status == "development") {
      import("eruda")
        .then((eruda) => {
          erudaInstance = eruda.default;
          erudaInstance.init();
        })
        .catch(() => { });
    } else if (status.status == "production") {
      erudaInstance = null;
    }

    return () => {
      if (erudaInstance && typeof erudaInstance.destroy === "function") {
        try {
          erudaInstance.destroy();
        } catch {
          // Ignore error if already destroyed
        }
      }
    };
  }, []);

  return null;
}

