import { Bell, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search..." className="pl-10 w-64" />
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>

        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
