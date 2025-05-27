import type { Metadata } from "next";
import PricingPlans from "./pricing-plans";

export const metadata: Metadata = {
  title: "Pricing - Portfolio Admin",
  description:
    "Request portfolio website design, domain registration, and additional services",
};

export default function PricingPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 z-50">
      <PricingPlans />
    </div>
  );
}
