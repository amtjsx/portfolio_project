import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface BasicInfoProps {
  portfolio?: {
    id: string;
    title: string;
    subtitle: string;
    summary: string;
    visibility: "public" | "private" | "unlisted";
    customDomain?: string;
    isPublished: boolean;
    isFeatured: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function PortfolioBasicInfo({ portfolio }: BasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Core portfolio details and visibility settings
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={portfolio?.isPublished ? "default" : "secondary"}>
              {portfolio?.isPublished ? "Published" : "Draft"}
            </Badge>
            {portfolio?.isFeatured && <Badge variant="outline">Featured</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select defaultValue={portfolio?.visibility}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Portfolio Title</Label>
          <Input
            id="title"
            defaultValue={portfolio?.title}
            placeholder="e.g., John Doe - Full Stack Developer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            defaultValue={portfolio?.subtitle}
            placeholder="e.g., Passionate about creating amazing web experiences"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            defaultValue={portfolio?.summary}
            placeholder="Write a brief professional summary..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-domain">Custom Domain (Optional)</Label>
          <Input
            id="custom-domain"
            defaultValue={portfolio?.customDomain}
            placeholder="e.g., johndoe.dev"
            type="url"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {portfolio?.createdAt &&
              new Date(portfolio.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{" "}
            {portfolio?.updatedAt &&
              new Date(portfolio.updatedAt).toLocaleDateString()}
          </div>
          {portfolio?.publishedAt && (
            <div>
              <span className="font-medium">Published:</span>{" "}
              {new Date(portfolio.publishedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
