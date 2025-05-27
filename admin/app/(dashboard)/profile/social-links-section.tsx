import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function SocialLinksSection() {
  const socialLinks = [
    {
      id: 1,
      platform: "GitHub",
      url: "https://github.com/johndoe",
      status: "Active",
      clicks: 1234,
    },
    {
      id: 2,
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      status: "Active",
      clicks: 856,
    },
    {
      id: 3,
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
      status: "Active",
      clicks: 642,
    },
    {
      id: 4,
      platform: "Dribbble",
      url: "https://dribbble.com/johndoe",
      status: "Inactive",
      clicks: 234,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Manage your social media profiles and external links
            </CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialLinks.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.platform}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 truncate max-w-xs">
                      {link.url}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={link.status === "Active" ? "default" : "secondary"}
                  >
                    {link.status}
                  </Badge>
                </TableCell>
                <TableCell>{link.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
