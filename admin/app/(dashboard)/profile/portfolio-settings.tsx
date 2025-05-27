import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SettingsProps {
  portfolio?: {
    settings: {
      showContactForm: boolean
      allowDownloadResume: boolean
      enableAnalytics: boolean
      enableComments: boolean
      maintenanceMode: boolean
    }
  }
}

export function PortfolioSettings({ portfolio }: SettingsProps) {
  const settingLabels = {
    showContactForm: "Show Contact Form",
    allowDownloadResume: "Allow Resume Download",
    enableAnalytics: "Enable Analytics",
    enableComments: "Enable Comments",
    maintenanceMode: "Maintenance Mode",
  }

  const settingDescriptions = {
    showContactForm: "Display a contact form for visitors to reach out",
    allowDownloadResume: "Allow visitors to download your resume/CV",
    enableAnalytics: "Track portfolio visits and user interactions",
    enableComments: "Allow comments on blog posts and projects",
    maintenanceMode: "Hide portfolio from public view for maintenance",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Portfolio Settings
        </CardTitle>
        <CardDescription>Configure portfolio functionality and features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {portfolio?.settings?.maintenanceMode && (
          <Alert>
            <AlertDescription>
              Your portfolio is currently in maintenance mode and not visible to the public.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {Object.entries(portfolio?.settings ?? {}).map(([key, enabled]) => (
            <div key={key} className="flex items-start justify-between">
              <div className="flex-1">
                <Label htmlFor={key} className="text-sm font-medium cursor-pointer">
                  {settingLabels[key as keyof typeof settingLabels]}
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {settingDescriptions[key as keyof typeof settingDescriptions]}
                </p>
              </div>
              <Switch id={key} defaultChecked={enabled} className="ml-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
