"use client";
import { Suspense } from "react";
import { AboutSection } from "./about-section";
import { PortfolioContact } from "./portfolio-contact";
import { PortfolioHero } from "./portfolio-hero";
import { PortfolioLoading } from "./portfolio-loading";
import { SocialLinksSection } from "./social-links-section";

interface PortfolioPageProps {
  params: {
    slug: string;
  };
}

export default function PortfolioPage({ params }: PortfolioPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<PortfolioLoading />}>
        <PortfolioContent slug={params.slug} />
      </Suspense>
    </div>
  );
}

function PortfolioContent({ slug }: { slug: string }) {
  return (
    <>
      <PortfolioHero />
      <AboutSection />
      <SocialLinksSection />
      <PortfolioContact />
    </>
  );
}
