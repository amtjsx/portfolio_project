"use client";
import { usePortfolio } from "@/contexts/portfolio-provider";
import { Suspense } from "react";
import { AboutSection } from "./about-section";
import { PortfolioContact } from "./portfolio-contact";
import { PortfolioExperience } from "./portfolio-experience";
import { PortfolioHero } from "./portfolio-hero";
import { PortfolioLoading } from "./portfolio-loading";
import { PortfolioProjects } from "./portfolio-projects";
import { PortfolioSkills } from "./portfolio-skills";
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
  // In a real app, you'd fetch portfolio data based on the slug
  // const portfolio = await getPortfolioBySlug(slug)
  const { portfolio } = usePortfolio();

  return (
    <>
      <PortfolioHero />
      <AboutSection />
      <PortfolioProjects />
      <PortfolioSkills />
      <PortfolioExperience />
      <SocialLinksSection />
      <PortfolioContact />
    </>
  );
}
