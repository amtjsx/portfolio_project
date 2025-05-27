"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PricingPeriod = "monthly" | "annually";

export const plans = [
  {
    id: "starter",
    name: "Starter Portfolio",
    description: "Perfect for freelancers and beginners",
    price: {
      monthly: 299,
      annually: 2990,
    },
    features: [
      "Single page portfolio",
      "Responsive design",
      "Contact form",
      "3 project showcases",
      "Basic SEO optimization",
      "1 revision round",
      "30-day support",
    ],
    badge: "",
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for established professionals",
    price: {
      monthly: 599,
      annually: 5990,
    },
    features: [
      "Multi-page portfolio",
      "Advanced animations",
      "Blog section",
      "Unlimited project showcases",
      "Advanced SEO optimization",
      "3 revision rounds",
      "90-day support",
      "Custom domain setup",
      "Analytics integration",
    ],
    badge: "Most Popular",
    cta: "Get Professional",
    popular: true,
  },
];

const additionalServices = [
  {
    id: "domain",
    name: "Domain Registration",
    price: 19.99,
    description: "Annual domain registration (.com, .net, .org)",
    tooltip: "Includes DNS management and email forwarding",
  },
  {
    id: "hosting",
    name: "Hosting Package",
    price: 9.99,
    description: "Monthly hosting with SSL certificate",
    tooltip: "Includes 10GB storage, unlimited bandwidth, and 99.9% uptime",
  },
  {
    id: "seo",
    name: "SEO Package",
    price: 299,
    description: "One-time SEO optimization service",
    tooltip:
      "Includes keyword research, meta tags, and performance optimization",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    price: 49.99,
    description: "Monthly website maintenance",
    tooltip:
      "Includes updates, backups, security checks, and minor content changes",
  },
];

export default function PricingPlans() {
  const [period, setPeriod] = useState<PricingPeriod>("monthly");

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full px-4",
              period === "monthly" && "bg-background shadow-sm"
            )}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full px-4",
              period === "annually" && "bg-background shadow-sm"
            )}
            onClick={() => setPeriod("annually")}
          >
            Annually
            <Badge
              variant="outline"
              className="ml-2 bg-primary/20 text-primary"
            >
              Save 20%
            </Badge>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col",
              plan.popular && "border-primary shadow-md"
            )}
          >
            <CardHeader>
              {plan.badge && (
                <Badge className="w-fit mb-2" variant="default">
                  {plan.badge}
                </Badge>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  $
                  {period === "monthly"
                    ? plan.price.monthly
                    : (plan.price.annually / 12).toFixed(0)}
                </span>
                <span className="text-muted-foreground ml-1">/month</span>
                {period === "annually" && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Billed ${plan.price.annually} annually
                  </div>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                href={`/pricing/request?plan=${plan.id}`}
                className="w-full"
              >
                <Button
                  className={cn("w-full", plan.popular ? "bg-primary" : "")}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Additional Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TooltipProvider>
            {additionalServices.map((service) => (
              <Card key={service.name} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{service.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">${service.price}</span>
                    {service.name === "Hosting Package" ||
                    service.name === "Maintenance" ? (
                      <span className="text-muted-foreground ml-1">/month</span>
                    ) : service.name === "Domain Registration" ? (
                      <span className="text-muted-foreground ml-1">/year</span>
                    ) : (
                      <span className="text-muted-foreground ml-1">
                        one-time
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/pricing/request?service=${service.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Add to Request
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
