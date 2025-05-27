import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SEOProps {
  portfolio?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]
  }
}

export function PortfolioSEO({ portfolio }: SEOProps) {
  const keywords = portfolio?.metaKeywords || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          SEO Settings
        </CardTitle>
        <CardDescription>Optimize your portfolio for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="meta-title">Meta Title</Label>
          <Input
            id="meta-title"
            defaultValue={portfolio?.metaTitle}
            placeholder="e.g., John Doe - Full Stack Developer Portfolio"
            maxLength={60}
          />
          <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-description">Meta Description</Label>
          <Textarea
            id="meta-description"
            defaultValue={portfolio?.metaDescription}
            placeholder="A brief description of your portfolio for search engines..."
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Keywords</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Input placeholder="Add a keyword and press Enter" />
          <p className="text-xs text-gray-500">Add relevant keywords to help people find your portfolio</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">SEO Preview</h4>
          <div className="space-y-1">
            <div className="text-blue-600 text-lg font-medium line-clamp-1">
              {portfolio?.metaTitle || "Your Portfolio Title"}
            </div>
            <div className="text-green-700 text-sm">johndoe.dev</div>
            <div className="text-gray-600 text-sm line-clamp-2">
              {portfolio?.metaDescription || "Your portfolio description will appear here..."}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
