import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Layout } from "lucide-react"

interface SectionsProps {
  portfolio?: {
    sections: {
      about: boolean
      skills: boolean
      experience: boolean
      education: boolean
      projects: boolean
      contact: boolean
      testimonials: boolean
      blog: boolean
    }
  }
}

export function PortfolioSections({ portfolio }: SectionsProps) {
  const sectionLabels = {
    about: "About Me",
    skills: "Skills & Technologies",
    experience: "Work Experience",
    education: "Education",
    projects: "Projects & Portfolio",
    contact: "Contact Information",
    testimonials: "Testimonials",
    blog: "Blog Posts",
  }

  const sectionDescriptions = {
    about: "Personal introduction and background",
    skills: "Technical skills and expertise",
    experience: "Professional work history",
    education: "Academic background and certifications",
    projects: "Showcase of your work and projects",
    contact: "Contact form and information",
    testimonials: "Client and colleague recommendations",
    blog: "Blog posts and articles",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Portfolio Sections
        </CardTitle>
        <CardDescription>Choose which sections to display on your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(portfolio?.sections ?? {}).map(([key, enabled]) => (
            <div key={key} className="flex items-start space-x-3">
              <Switch id={key} defaultChecked={enabled} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={key} className="text-sm font-medium cursor-pointer">
                  {sectionLabels[key as keyof typeof sectionLabels]}
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {sectionDescriptions[key as keyof typeof sectionDescriptions]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
