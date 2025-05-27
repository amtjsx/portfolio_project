import { SocialLinksSection } from "./social-links-section";
import { ProjectsSection } from "./projects-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, User, Mail, MapPin, Globe } from "lucide-react";

export default function PortfolioAdmin() {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Portfolio Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Portfolio Details
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your portfolio information and content
          </p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          Published
        </Badge>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Your basic portfolio information
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">
                  Full Stack Developer & UI/UX Designer
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>www.johndoe.dev</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links Section */}
      <SocialLinksSection />

      {/* Projects Section */}
      <ProjectsSection />
    </main>
  );
}
