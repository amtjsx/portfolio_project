import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";

interface ThemingProps {
  portfolio?: {
    theme: "modern" | "classic" | "minimal" | "creative";
    primaryColor: string;
    secondaryColor: string;
  };
}

export function PortfolioTheming({ portfolio }: ThemingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme & Colors
        </CardTitle>
        <CardDescription>
          Customize the visual appearance of your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theme">Portfolio Theme</Label>
          <Select defaultValue={portfolio?.theme}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                defaultValue={portfolio?.primaryColor}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                defaultValue={portfolio?.primaryColor}
                placeholder="#3B82F6"
                className="flex-1 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                type="color"
                defaultValue={portfolio?.secondaryColor}
                className="w-16 h-10 p-1 border rounded"
              />
              <Input
                defaultValue={portfolio?.secondaryColor}
                placeholder="#1E40AF"
                className="flex-1 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Preview</h4>
          <div className="flex gap-2">
            <div
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: portfolio?.primaryColor }}
            />
            <div
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: portfolio?.secondaryColor }}
            />
            <span className="text-sm text-gray-600 self-center ml-2">
              {portfolio?.theme &&
                portfolio?.theme?.charAt(0).toUpperCase() +
                  portfolio?.theme?.slice(1)}{" "}
              Theme
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
