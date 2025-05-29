import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProjectTechnologiesProps {
  technologies: string[]
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  // Mock data for technology details - in a real app, this would come from your API
  const technologyDetails = {
    React: { category: "Frontend", proficiency: 95, description: "Component-based UI library" },
    "Next.js": { category: "Framework", proficiency: 90, description: "React production framework" },
    TypeScript: { category: "Language", proficiency: 88, description: "Typed JavaScript" },
    "Node.js": { category: "Backend", proficiency: 85, description: "JavaScript runtime" },
    PostgreSQL: { category: "Database", proficiency: 80, description: "Relational database" },
    "Tailwind CSS": { category: "Styling", proficiency: 92, description: "Utility-first CSS framework" },
    "Express.js": { category: "Backend", proficiency: 85, description: "Web application framework" },
    Prisma: { category: "ORM", proficiency: 78, description: "Database toolkit" },
    WebSockets: { category: "Real-time", proficiency: 75, description: "Real-time communication" },
    Stripe: { category: "Payment", proficiency: 70, description: "Payment processing" },
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Frontend: "bg-blue-100 text-blue-800",
      Backend: "bg-green-100 text-green-800",
      Database: "bg-purple-100 text-purple-800",
      Framework: "bg-orange-100 text-orange-800",
      Language: "bg-red-100 text-red-800",
      Styling: "bg-pink-100 text-pink-800",
      ORM: "bg-indigo-100 text-indigo-800",
      "Real-time": "bg-yellow-100 text-yellow-800",
      Payment: "bg-emerald-100 text-emerald-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech) => {
              const details = technologyDetails[tech as keyof typeof technologyDetails] || {
                category: "Other",
                proficiency: 70,
                description: "Technology used in this project",
              }

              return (
                <Card key={tech} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{tech}</h4>
                      <Badge className={getCategoryColor(details.category)}>{details.category}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{details.description}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Proficiency</span>
                        <span>{details.proficiency}%</span>
                      </div>
                      <Progress value={details.proficiency} className="h-1.5" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Technology Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Technologies by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              technologies.reduce(
                (acc, tech) => {
                  const category = technologyDetails[tech as keyof typeof technologyDetails]?.category || "Other"
                  if (!acc[category]) acc[category] = []
                  acc[category].push(tech)
                  return acc
                },
                {} as Record<string, string[]>,
              ),
            ).map(([category, techs]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-sm">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
