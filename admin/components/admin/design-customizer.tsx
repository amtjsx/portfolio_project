"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Paintbrush, Palette, Layout, Type } from "lucide-react"

export function DesignCustomizer() {
  const [colors, setColors] = useState({
    primary: "#7c3aed",
    secondary: "#f3f4f6",
    accent: "#f3f4f6",
    background: "#ffffff",
    text: "#1f2937",
  })

  const [typography, setTypography] = useState({
    headingFont: "Inter",
    bodyFont: "Inter",
    baseSize: 16,
    lineHeight: 1.5,
    fontWeight: "normal",
  })

  const [layout, setLayout] = useState({
    maxWidth: 1400,
    gapSize: 32,
    borderRadius: 12,
    useShadows: true,
    useGlassmorphism: true,
    useAnimations: true,
  })

  const [effects, setEffects] = useState({
    useGradients: true,
    useParallax: true,
    animationSpeed: 0.5,
    useBackdropBlur: true,
    blurIntensity: 5,
  })

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors({ ...colors, [key]: value })
  }

  const handleTypographyChange = (key: keyof typeof typography, value: any) => {
    setTypography({ ...typography, [key]: value })
  }

  const handleLayoutChange = (key: keyof typeof layout, value: any) => {
    setLayout({ ...layout, [key]: value })
  }

  const handleEffectsChange = (key: keyof typeof effects, value: any) => {
    setEffects({ ...effects, [key]: value })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Typography</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Layout</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            <span>Effects</span>
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the colors used throughout your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: colors.primary }} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={colors.primary}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      value={colors.primary}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: colors.secondary }} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      value={colors.secondary}
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: colors.accent }} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={colors.accent}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      value={colors.accent}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: colors.background }} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={colors.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      value={colors.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: colors.text }} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="textColor"
                      type="color"
                      value={colors.text}
                      onChange={(e) => handleColorChange("text", e.target.value)}
                      className="h-10 w-10 p-1"
                    />
                    <Input
                      value={colors.text}
                      onChange={(e) => handleColorChange("text", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Preview</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div
                    className="flex h-24 items-center justify-center rounded-lg"
                    style={{ backgroundColor: colors.primary, color: "#ffffff" }}
                  >
                    Primary
                  </div>
                  <div
                    className="flex h-24 items-center justify-center rounded-lg"
                    style={{ backgroundColor: colors.secondary, color: colors.text }}
                  >
                    Secondary
                  </div>
                  <div
                    className="flex h-24 items-center justify-center rounded-lg"
                    style={{ backgroundColor: colors.background, color: colors.text }}
                  >
                    Background
                  </div>
                  <div
                    className="flex h-24 items-center justify-center rounded-lg"
                    style={{ backgroundColor: colors.accent, color: colors.text }}
                  >
                    Accent
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Customize the fonts and text styles used in your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="headingFont">Heading Font</Label>
                  <Select
                    value={typography.headingFont}
                    onValueChange={(value) => handleTypographyChange("headingFont", value)}
                  >
                    <SelectTrigger id="headingFont">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Body Font</Label>
                  <Select
                    value={typography.bodyFont}
                    onValueChange={(value) => handleTypographyChange("bodyFont", value)}
                  >
                    <SelectTrigger id="bodyFont">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseSize">Base Font Size: {typography.baseSize}px</Label>
                  <Slider
                    id="baseSize"
                    min={12}
                    max={20}
                    step={1}
                    value={[typography.baseSize]}
                    onValueChange={(value) => handleTypographyChange("baseSize", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Line Height: {typography.lineHeight}</Label>
                  <Slider
                    id="lineHeight"
                    min={1}
                    max={2}
                    step={0.1}
                    value={[typography.lineHeight]}
                    onValueChange={(value) => handleTypographyChange("lineHeight", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontWeight">Font Weight</Label>
                  <Select
                    value={typography.fontWeight}
                    onValueChange={(value) => handleTypographyChange("fontWeight", value)}
                  >
                    <SelectTrigger id="fontWeight">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="semibold">Semibold</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Typography Preview</h3>
                <div className="space-y-4">
                  <div>
                    <h1
                      style={{
                        fontFamily: typography.headingFont,
                        fontSize: `${typography.baseSize * 2.5}px`,
                        lineHeight: typography.lineHeight,
                        fontWeight: typography.fontWeight === "normal" ? 400 : 700,
                      }}
                    >
                      Heading 1
                    </h1>
                    <h2
                      style={{
                        fontFamily: typography.headingFont,
                        fontSize: `${typography.baseSize * 2}px`,
                        lineHeight: typography.lineHeight,
                        fontWeight: typography.fontWeight === "normal" ? 400 : 700,
                      }}
                    >
                      Heading 2
                    </h2>
                    <h3
                      style={{
                        fontFamily: typography.headingFont,
                        fontSize: `${typography.baseSize * 1.5}px`,
                        lineHeight: typography.lineHeight,
                        fontWeight: typography.fontWeight === "normal" ? 400 : 700,
                      }}
                    >
                      Heading 3
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: typography.bodyFont,
                      fontSize: `${typography.baseSize}px`,
                      lineHeight: typography.lineHeight,
                      fontWeight:
                        typography.fontWeight === "normal" ? 400 : typography.fontWeight === "light" ? 300 : 500,
                    }}
                  >
                    This is a paragraph of text that demonstrates how body text will appear on your portfolio website.
                    The font family, size, line height, and weight can all be customized to match your preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout & Spacing</CardTitle>
              <CardDescription>Customize the layout, spacing, and overall structure of your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxWidth">Max Content Width: {layout.maxWidth}px</Label>
                  <Slider
                    id="maxWidth"
                    min={800}
                    max={1600}
                    step={50}
                    value={[layout.maxWidth]}
                    onValueChange={(value) => handleLayoutChange("maxWidth", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gapSize">Gap Size: {layout.gapSize}px</Label>
                  <Slider
                    id="gapSize"
                    min={8}
                    max={64}
                    step={4}
                    value={[layout.gapSize]}
                    onValueChange={(value) => handleLayoutChange("gapSize", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Border Radius: {layout.borderRadius}px</Label>
                  <Slider
                    id="borderRadius"
                    min={0}
                    max={24}
                    step={2}
                    value={[layout.borderRadius]}
                    onValueChange={(value) => handleLayoutChange("borderRadius", value[0])}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useShadows">Use Shadows</Label>
                    <Switch
                      id="useShadows"
                      checked={layout.useShadows}
                      onCheckedChange={(checked) => handleLayoutChange("useShadows", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="useGlassmorphism">Use Glassmorphism</Label>
                    <Switch
                      id="useGlassmorphism"
                      checked={layout.useGlassmorphism}
                      onCheckedChange={(checked) => handleLayoutChange("useGlassmorphism", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="useAnimations">Use Animations</Label>
                    <Switch
                      id="useAnimations"
                      checked={layout.useAnimations}
                      onCheckedChange={(checked) => handleLayoutChange("useAnimations", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Layout Preview</h3>
                <div className="mx-auto border border-dashed p-4" style={{ maxWidth: `${layout.maxWidth / 4}px` }}>
                  <div className="flex flex-col gap-2">
                    <div
                      className="h-8 w-full bg-primary/20"
                      style={{
                        borderRadius: `${layout.borderRadius / 2}px`,
                        boxShadow: layout.useShadows ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                        backdropFilter: layout.useGlassmorphism ? "blur(8px)" : "none",
                      }}
                    ></div>
                    <div className="grid grid-cols-2" style={{ gap: `${layout.gapSize / 4}px` }}>
                      <div
                        className="h-16 bg-secondary/40"
                        style={{
                          borderRadius: `${layout.borderRadius / 2}px`,
                          boxShadow: layout.useShadows ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                          backdropFilter: layout.useGlassmorphism ? "blur(8px)" : "none",
                        }}
                      ></div>
                      <div
                        className="h-16 bg-secondary/40"
                        style={{
                          borderRadius: `${layout.borderRadius / 2}px`,
                          boxShadow: layout.useShadows ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                          backdropFilter: layout.useGlassmorphism ? "blur(8px)" : "none",
                        }}
                      ></div>
                    </div>
                    <div
                      className="h-24 w-full bg-accent/20"
                      style={{
                        borderRadius: `${layout.borderRadius / 2}px`,
                        boxShadow: layout.useShadows ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
                        backdropFilter: layout.useGlassmorphism ? "blur(8px)" : "none",
                      }}
                    ></div>
                  </div>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  This is a simplified representation of your layout settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects">
          <Card>
            <CardHeader>
              <CardTitle>Visual Effects</CardTitle>
              <CardDescription>
                Customize the visual effects and animations used throughout your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useGradients">Use Gradient Backgrounds</Label>
                    <Switch
                      id="useGradients"
                      checked={effects.useGradients}
                      onCheckedChange={(checked) => handleEffectsChange("useGradients", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="useParallax">Use Parallax Effects</Label>
                    <Switch
                      id="useParallax"
                      checked={effects.useParallax}
                      onCheckedChange={(checked) => handleEffectsChange("useParallax", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="useBackdropBlur">Use Backdrop Blur</Label>
                    <Switch
                      id="useBackdropBlur"
                      checked={effects.useBackdropBlur}
                      onCheckedChange={(checked) => handleEffectsChange("useBackdropBlur", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="animationSpeed">Animation Speed: {effects.animationSpeed}x</Label>
                  <Slider
                    id="animationSpeed"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={[effects.animationSpeed]}
                    onValueChange={(value) => handleEffectsChange("animationSpeed", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blurIntensity">Blur Intensity: {effects.blurIntensity}px</Label>
                  <Slider
                    id="blurIntensity"
                    min={1}
                    max={20}
                    step={1}
                    value={[effects.blurIntensity]}
                    onValueChange={(value) => handleEffectsChange("blurIntensity", value[0])}
                    disabled={!effects.useBackdropBlur}
                  />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Effects Preview</h3>
                <div className="relative h-48 overflow-hidden rounded-lg">
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: effects.useGradients
                        ? "linear-gradient(to right bottom, #7c3aed, #3b82f6)"
                        : "#7c3aed",
                      opacity: 0.2,
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative flex h-full flex-col items-center justify-center gap-4 p-4">
                    <div
                      className="h-16 w-64 rounded-lg bg-white/80 p-4"
                      style={{
                        backdropFilter: effects.useBackdropBlur ? `blur(${effects.blurIntensity}px)` : "none",
                        transform: effects.useParallax ? "translateY(-8px)" : "none",
                        transition: `all ${0.3 / effects.animationSpeed}s ease-out`,
                      }}
                    >
                      <div className="h-2 w-32 rounded-full bg-primary/30"></div>
                      <div className="mt-2 h-2 w-48 rounded-full bg-primary/20"></div>
                    </div>

                    <div
                      className="h-16 w-64 rounded-lg bg-white/80 p-4"
                      style={{
                        backdropFilter: effects.useBackdropBlur ? `blur(${effects.blurIntensity}px)` : "none",
                        transform: effects.useParallax ? "translateY(8px)" : "none",
                        transition: `all ${0.3 / effects.animationSpeed}s ease-out`,
                      }}
                    >
                      <div className="h-2 w-48 rounded-full bg-primary/30"></div>
                      <div className="mt-2 h-2 w-32 rounded-full bg-primary/20"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Hover over the elements to see animation effects.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>Apply Changes</Button>
      </div>
    </div>
  )
}
