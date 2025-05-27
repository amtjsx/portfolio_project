import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ImageIcon, Download, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilesProps {
  portfolio?: {
    resume_id?: string
    coverImageId?: string
    profileImageId?: string
  }
}

export function PortfolioFiles({ portfolio }: FilesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          File Management
        </CardTitle>
        <CardDescription>Manage your portfolio images and resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resume Section */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Resume/CV
          </h4>
          {portfolio?.resume_id ? (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium">resume.pdf</p>
                  <p className="text-sm text-gray-500">Uploaded resume file</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">No resume uploaded</p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          )}
        </div>

        {/* Profile Image Section */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Profile Image
          </h4>
          {portfolio?.profileImageId ? (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">profile-image.jpg</p>
                  <p className="text-sm text-gray-500">Profile picture</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Replace
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">No profile image uploaded</p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          )}
        </div>

        {/* Cover Image Section */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Cover Image
          </h4>
          {portfolio?.coverImageId ? (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">cover-image.jpg</p>
                  <p className="text-sm text-gray-500">Portfolio cover image</p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Replace
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">No cover image uploaded</p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Cover
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
