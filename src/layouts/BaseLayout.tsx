import React from "react";
import { usePolicySubscription } from "~/lib/queries/policies";
import { useReportSubscription } from "~/lib/queries/reports";

// @ts-ignore
export default function BaseLayout({ children }) {
  usePolicySubscription()
  useReportSubscription()

  return (
    <>
      {children}
    </>
  );
}
