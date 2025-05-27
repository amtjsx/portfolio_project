"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import { plans } from "../pricing-plans";

const formSchema = z.object({
  plan: z.enum(["starter", "professional", "enterprise"]),
  billingInterval: z.enum(["month", "year"]),
  additionalServices: z.array(z.string()).optional(),
  budget: z.string().min(1, {
    message: "Please select your budget range.",
  }),
  timeline: z.date({
    required_error: "Please select your desired completion date.",
  }),
  requirements: z.string().min(10, {
    message: "Please provide at least 10 characters of project requirements.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const additionalServicesList = [
  {
    id: "domain",
    label: "Domain Registration",
  },
  {
    id: "hosting",
    label: "Hosting Package",
  },
  {
    id: "seo",
    label: "SEO Package",
  },
  {
    id: "maintenance",
    label: "Maintenance Plan",
  },
  {
    id: "logo",
    label: "Logo Design",
  },
  {
    id: "content",
    label: "Content Creation",
  },
];

const additionalServicesPricing = {
  domain: { price: 19.99, period: "yearly" },
  hosting: { price: 9.99, period: "monthly" },
  seo: { price: 299, period: "one-time" },
  maintenance: { price: 49.99, period: "monthly" },
  logo: { price: 199, period: "one-time" },
  content: { price: 399, period: "one-time" },
};

function calculateTotal(
  plan: string,
  billingPeriod: string,
  additionalServices: string[] = []
) {
  const selectedPlan = plans.find((p) => p.id === plan);
  const planPrice =
    billingPeriod === "annually"
      ? selectedPlan?.price.annually
      : selectedPlan?.price.monthly;

  let additionalTotal = 0;
  const breakdown = additionalServices
    .map((serviceId) => {
      const service =
        additionalServicesPricing[
          serviceId as keyof typeof additionalServicesPricing
        ];
      if (service) {
        additionalTotal += service.price;
        return {
          name:
            additionalServicesList.find((s) => s.id === serviceId)?.label ||
            serviceId,
          price: service.price,
          period: service.period,
        };
      }
      return null;
    })
    .filter(Boolean);

  return {
    planPrice,
    additionalTotal,
    total: (planPrice || 0) + additionalTotal,
    breakdown,
  };
}

export default function PricingRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") as
    | "starter"
    | "professional"
    | "enterprise"
    | undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: plan || "professional",
      billingInterval: "month",
      additionalServices: [],
      budget: "",
      requirements: "",
    },
  });

  const selectedPlan = plans.find((p) => p.id === form.watch("plan"));

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  }

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-primary" />
          <h3 className="text-2xl font-bold">Request Submitted!</h3>
          <p className="text-muted-foreground max-w-md">
            Thank you for your interest! We've received your request and will
            get back to you within 24-48 hours to discuss your portfolio
            project.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="mt-4">
            Submit Another Request
          </Button>
        </div>
      </Card>
    );
  }

  if (!selectedPlan) redirect("/pricing");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Request Services for{" "}
          <span className="font-semibold text-primary">
            {selectedPlan.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 grid grid-cols-2 mb-4">
          {selectedPlan.features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="additionalServices"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Additional Services</FormLabel>
                    <FormDescription>
                      Select any additional services you're interested in.
                    </FormDescription>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {additionalServicesList.map((service) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="additionalServices"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          service.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== service.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Desired Completion Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(
                            new Date().setDate(new Date().getDate() + 14)
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Please allow at least 2 weeks for project completion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your project requirements, specific features needed, and any design preferences."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The more details you provide, the better we can tailor our
                    solution to your needs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingInterval"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <FormItem className="space-y-0">
                        <FormLabel className="cursor-pointer">
                          <div
                            className={cn(
                              "relative flex items-center space-x-3 p-6 border-2 rounded-lg bg-blue-50/30 transition-colors",
                              field.value === "month" && "border-blue-500"
                            )}
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="month" />
                                </FormControl>
                                <span className="font-semibold text-gray-900 mb-1">
                                  Pay monthly
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900">
                                  ${selectedPlan.price.monthly}
                                </span>
                                <span className="text-sm text-gray-500">
                                  USD / month after trial
                                </span>
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                      </FormItem>

                      <FormItem className="space-y-0">
                        <FormLabel className="cursor-pointer">
                          <div
                            className={cn(
                              "relative flex items-center space-x-3 p-6 border-2 rounded-lg bg-blue-50/30 transition-colors",
                              field.value === "year" && "border-blue-500"
                            )}
                          >
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <FormControl>
                                  <RadioGroupItem value="year" />
                                </FormControl>
                                <span className="font-semibold text-gray-900 mb-1">
                                  Pay yearly
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900">
                                  ${selectedPlan.price.annually}
                                </span>
                                <span className="text-sm text-gray-500">
                                  USD / year after trial
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="absolute top-4 right-4 bg-gray-100 text-gray-700 hover:bg-gray-100"
                            >
                              Save $
                              {selectedPlan.price.monthly * 12 -
                                selectedPlan.price.annually}
                            </Badge>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("plan") && (
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const calculation = calculateTotal(
                      form.watch("plan"),
                      form.watch("billingInterval"),
                      form.watch("additionalServices")
                    );

                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>
                            {
                              plans.find((p) => p.id === form.watch("plan"))
                                ?.name
                            }
                          </span>
                          <span className="font-semibold">
                            $
                            {form.watch("billingInterval") === "year"
                              ? ((calculation.planPrice || 0) / 12).toFixed(0)
                              : calculation.planPrice}
                            /month
                          </span>
                        </div>
                        {form.watch("billingInterval") === "year" && (
                          <div className="text-sm text-muted-foreground">
                            Billed ${calculation.planPrice} annually
                          </div>
                        )}

                        {calculation.breakdown.length > 0 && (
                          <>
                            <div className="border-t pt-2">
                              <div className="text-sm font-medium mb-2">
                                Additional Services:
                              </div>
                              {calculation.breakdown.map(
                                (item: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center text-sm"
                                  >
                                    <span>{item.name}</span>
                                    <span>
                                      ${item.price}{" "}
                                      {item.period !== "one-time" &&
                                        `/${item.period.replace("ly", "")}`}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}

                        <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
                          <span>Total</span>
                          <span>${calculation.total.toFixed(2)}</span>
                        </div>

                        {form.watch("billingInterval") === "year" && (
                          <div className="text-sm text-primary">
                            You save $
                            {(
                              ((calculation.planPrice || 0) / 12) *
                              12 *
                              0.2
                            ).toFixed(2)}{" "}
                            annually!
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              className="w-full py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
