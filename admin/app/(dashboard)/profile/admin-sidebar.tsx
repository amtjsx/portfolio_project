import { BarChart3, FileText, Home, ImageIcon, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: User, label: "Portfolio", active: true },
    { icon: FileText, label: "Projects", active: false },
    { icon: ImageIcon, label: "Media", active: false },
    { icon: Users, label: "Contacts", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <aside className="w-64 bg-gray-50 border-r min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-gray-900">Portfolio CMS</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${
                item.active ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
