import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Maximize2 } from "lucide-react"

interface ProjectGalleryProps {
  project: {
    id: string
    title: string
    imageUrl?: string
  }
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  // Mock gallery data - in a real app, this would come from your API
  const galleryItems = [
    {
      id: "1",
      title: "Homepage Design",
      description: "Main landing page with hero section and navigation",
      imageUrl: "/placeholder.svg?height=300&width=500&query=homepage design",
      type: "screenshot",
    },
    {
      id: "2",
      title: "Dashboard Interface",
      description: "User dashboard with analytics and quick actions",
      imageUrl: "/placeholder.svg?height=300&width=500&query=dashboard interface",
      type: "screenshot",
    },
    {
      id: "3",
      title: "Mobile Responsive",
      description: "Mobile-optimized interface design",
      imageUrl: "/placeholder.svg?height=400&width=250&query=mobile app interface",
      type: "mobile",
    },
    {
      id: "4",
      title: "Architecture Diagram",
      description: "System architecture and data flow",
      imageUrl: "/placeholder.svg?height=300&width=500&query=system architecture diagram",
      type: "diagram",
    },
    {
      id: "5",
      title: "User Flow",
      description: "User journey and interaction flow",
      imageUrl: "/placeholder.svg?height=300&width=500&query=user flow diagram",
      type: "diagram",
    },
    {
      id: "6",
      title: "API Documentation",
      description: "REST API endpoints and documentation",
      imageUrl: "/placeholder.svg?height=300&width=500&query=API documentation",
      type: "documentation",
    },
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      screenshot: "bg-blue-100 text-blue-800",
      mobile: "bg-green-100 text-green-800",
      diagram: "bg-purple-100 text-purple-800",
      documentation: "bg-orange-100 text-orange-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Maximize2 className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download All Images
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Gallery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
