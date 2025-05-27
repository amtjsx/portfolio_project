"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X } from "lucide-react"

type PricingPlan = {
  id: string
  name: string
  description: string
  price: number
  currency: string
  billingInterval: "month" | "year" | "one-time"
  trialPeriodDays: number
  features: string[]
  limits: {
    portfolios: number
    projects: number
    storage: number
    customDomain: boolean
    analytics: boolean
    removeWatermark: boolean
    prioritySupport: boolean
    [key: string]: any
  }
  tier: "free" | "basic" | "pro" | "enterprise" | "custom"
  sortOrder: number
  isActive: boolean
  isFeatured: boolean
  isCustom: boolean
  discountPercentage: number
  originalPrice: number | null
  discountValidUntil: Date | null
  externalPlanId: string | null
  paymentProvider: string | null
  metadata: any
}

interface PricingPlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: PricingPlan | null
  onSave: (plan: Partial<PricingPlan>) => void
}

export function PricingPlanDialog({ open, onOpenChange, plan, onSave }: PricingPlanDialogProps) {
  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: "",
    description: "",
    price: 0,
    currency: "USD",
    billingInterval: "month",
    trialPeriodDays: 0,
    features: [],
    limits: {
      portfolios: 1,
      projects: 10,
      storage: 100,
      customDomain: false,
      analytics: false,
      removeWatermark: false,
      prioritySupport: false,
    },
    tier: "basic",
    sortOrder: 0,
    isActive: true,
    isFeatured: false,
    isCustom: false,
    discountPercentage: 0,
    originalPrice: null,
    discountValidUntil: null,
    externalPlanId: null,
    paymentProvider: null,
    metadata: null,
  })

  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    if (plan) {
      setFormData(plan)
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        currency: "USD",
        billingInterval: "month",
        trialPeriodDays: 0,
        features: [],
        limits: {
          portfolios: 1,
          projects: 10,
          storage: 100,
          customDomain: false,
          analytics: false,
          removeWatermark: false,
          prioritySupport: false,
        },
        tier: "basic",
        sortOrder: 0,
        isActive: true,
        isFeatured: false,
        isCustom: false,
        discountPercentage: 0,
        originalPrice: null,
        discountValidUntil: null,
        externalPlanId: null,
        paymentProvider: null,
        metadata: null,
      })
    }
  }, [plan])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    })
  }

  const updateLimits = (key: string, value: any) => {
    setFormData({
      ...formData,
      limits: {
        ...formData.limits,
        [key]: value,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Pricing Plan" : "Create Pricing Plan"}</DialogTitle>
          <DialogDescription>
            {plan ? "Update the pricing plan details" : "Create a new pricing plan for your service"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="features">Features & Limits</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Basic, Pro, Enterprise"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Select
                    value={formData.tier}
                    onValueChange={(value) => setFormData({ ...formData, tier: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the plan"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder || 0}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (in cents)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                    placeholder="1999 for $19.99"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingInterval">Billing Interval</Label>
                  <Select
                    value={formData.billingInterval}
                    onValueChange={(value) => setFormData({ ...formData, billingInterval: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trialPeriodDays">Trial Period (days)</Label>
                  <Input
                    id="trialPeriodDays"
                    type="number"
                    value={formData.trialPeriodDays || 0}
                    onChange={(e) => setFormData({ ...formData, trialPeriodDays: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPercentage">Discount %</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={formData.discountPercentage || 0}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number.parseInt(e.target.value) })}
                    max="100"
                    min="0"
                  />
                </div>
              </div>

              {formData.discountPercentage && formData.discountPercentage > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (cents)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: Number.parseInt(e.target.value) || null })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountValidUntil">Discount Valid Until</Label>
                    <Input
                      id="discountValidUntil"
                      type="date"
                      value={
                        formData.discountValidUntil
                          ? new Date(formData.discountValidUntil).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountValidUntil: e.target.value ? new Date(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="externalPlanId">External Plan ID</Label>
                  <Input
                    id="externalPlanId"
                    value={formData.externalPlanId || ""}
                    onChange={(e) => setFormData({ ...formData, externalPlanId: e.target.value || null })}
                    placeholder="Stripe price ID, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentProvider">Payment Provider</Label>
                  <Select
                    value={formData.paymentProvider || ""}
                    onValueChange={(value) => setFormData({ ...formData, paymentProvider: value || null })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="paddle">Paddle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                  <CardDescription>Add features included in this plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter a feature"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features?.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Limits & Quotas</CardTitle>
                  <CardDescription>Set usage limits for this plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Portfolios</Label>
                      <Input
                        type="number"
                        value={formData.limits?.portfolios || 0}
                        onChange={(e) => updateLimits("portfolios", Number.parseInt(e.target.value))}
                        placeholder="-1 for unlimited"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Projects</Label>
                      <Input
                        type="number"
                        value={formData.limits?.projects || 0}
                        onChange={(e) => updateLimits("projects", Number.parseInt(e.target.value))}
                        placeholder="-1 for unlimited"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Storage (MB)</Label>
                      <Input
                        type="number"
                        value={formData.limits?.storage || 0}
                        onChange={(e) => updateLimits("storage", Number.parseInt(e.target.value))}
                        placeholder="-1 for unlimited"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.limits?.customDomain || false}
                        onCheckedChange={(checked) => updateLimits("customDomain", checked)}
                      />
                      <Label>Custom Domain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.limits?.analytics || false}
                        onCheckedChange={(checked) => updateLimits("analytics", checked)}
                      />
                      <Label>Analytics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.limits?.removeWatermark || false}
                        onCheckedChange={(checked) => updateLimits("removeWatermark", checked)}
                      />
                      <Label>Remove Watermark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.limits?.prioritySupport || false}
                        onCheckedChange={(checked) => updateLimits("prioritySupport", checked)}
                      />
                      <Label>Priority Support</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isCustom}
                  onCheckedChange={(checked) => setFormData({ ...formData, isCustom: checked })}
                />
                <Label>Custom Plan</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata">Metadata (JSON)</Label>
                <Textarea
                  id="metadata"
                  value={formData.metadata ? JSON.stringify(formData.metadata, null, 2) : ""}
                  onChange={(e) => {
                    try {
                      const parsed = e.target.value ? JSON.parse(e.target.value) : null
                      setFormData({ ...formData, metadata: parsed })
                    } catch {
                      // Invalid JSON, keep the string for now
                    }
                  }}
                  placeholder='{"key": "value"}'
                  rows={6}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{plan ? "Update Plan" : "Create Plan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
