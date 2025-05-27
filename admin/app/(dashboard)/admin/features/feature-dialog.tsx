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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Feature = {
  id: string
  name: string
  description: string
  key: string
  category: "core" | "branding" | "analytics" | "support" | "storage" | "advanced"
  type: "boolean" | "numeric" | "text"
  icon: string
  sortOrder: number
  isActive: boolean
  isPremium: boolean
  metadata: any
}

interface FeatureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature: Feature | null
  onSave: (feature: Partial<Feature>) => void
}

export function FeatureDialog({ open, onOpenChange, feature, onSave }: FeatureDialogProps) {
  const [formData, setFormData] = useState<Partial<Feature>>({
    name: "",
    description: "",
    key: "",
    category: "core",
    type: "boolean",
    icon: "",
    sortOrder: 0,
    isActive: true,
    isPremium: false,
    metadata: null,
  })

  useEffect(() => {
    if (feature) {
      setFormData(feature)
    } else {
      setFormData({
        name: "",
        description: "",
        key: "",
        category: "core",
        type: "boolean",
        icon: "",
        sortOrder: 0,
        isActive: true,
        isPremium: false,
        metadata: null,
      })
    }
  }, [feature])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const generateKey = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      key: formData.key || generateKey(name),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{feature ? "Edit Feature" : "Create Feature"}</DialogTitle>
          <DialogDescription>
            {feature ? "Update the feature details" : "Create a new feature for your pricing plans"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Feature Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Custom Domain"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Feature Key</Label>
                  <Input
                    id="key"
                    value={formData.key || ""}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g., custom_domain"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for programmatic access. Auto-generated from name if empty.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the feature"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">⚡ Core</SelectItem>
                      <SelectItem value="branding">🎨 Branding</SelectItem>
                      <SelectItem value="analytics">📊 Analytics</SelectItem>
                      <SelectItem value="support">🎧 Support</SelectItem>
                      <SelectItem value="storage">💾 Storage</SelectItem>
                      <SelectItem value="advanced">🚀 Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boolean">Boolean (Yes/No)</SelectItem>
                      <SelectItem value="numeric">Numeric (Limits)</SelectItem>
                      <SelectItem value="text">Text (Configuration)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder || 0}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon || ""}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., globe, bar-chart, headphones"
                />
                <p className="text-xs text-muted-foreground">Icon name (Lucide icons) or emoji</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    id="isPremium"
                    checked={formData.isPremium}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
                  />
                  <Label htmlFor="isPremium">Premium Feature</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
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
                  placeholder='{"tooltip": "Additional information", "unit": "MB"}'
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">Additional configuration data for this feature</p>
              </div>

              {formData.type === "numeric" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Numeric Feature Configuration</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    For numeric features, you can set constraints in metadata:
                  </p>
                  <pre className="text-xs bg-blue-100 p-2 rounded">
                    {`{
  "unit": "MB",
  "min": 10,
  "max": 10000,
  "step": 10
}`}
                  </pre>
                </div>
              )}

              {formData.type === "text" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Text Feature Configuration</h4>
                  <p className="text-sm text-green-700 mb-3">
                    For text features, you can set validation rules in metadata:
                  </p>
                  <pre className="text-xs bg-green-100 p-2 rounded">
                    {`{
  "placeholder": "Enter API key",
  "pattern": "^[a-zA-Z0-9]+$",
  "maxLength": 100
}`}
                  </pre>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{feature ? "Update Feature" : "Create Feature"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
