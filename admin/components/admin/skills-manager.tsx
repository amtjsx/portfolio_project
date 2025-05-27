"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, MoveUp, MoveDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Skill = {
  id: string
  name: string
  level: "Expert" | "Advanced" | "Intermediate" | "Beginner"
  category: "frontend" | "backend" | "tools"
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "JavaScript", level: "Expert", category: "frontend" },
    { id: "2", name: "TypeScript", level: "Expert", category: "frontend" },
    { id: "3", name: "React", level: "Expert", category: "frontend" },
    { id: "4", name: "Node.js", level: "Expert", category: "backend" },
    { id: "5", name: "Express", level: "Expert", category: "backend" },
    { id: "6", name: "MongoDB", level: "Advanced", category: "backend" },
    { id: "7", name: "Git", level: "Expert", category: "tools" },
    { id: "8", name: "Docker", level: "Advanced", category: "tools" },
  ])

  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: "Intermediate",
    category: "frontend",
  })

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddSkill = () => {
    if (newSkill.name.trim() === "") return

    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill,
    }

    setSkills([...skills, skill])
    setNewSkill({
      name: "",
      level: "Intermediate",
      category: "frontend",
    })
  }

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleEditSkill = () => {
    if (!editingSkill) return

    setSkills(skills.map((skill) => (skill.id === editingSkill.id ? editingSkill : skill)))

    setEditingSkill(null)
    setIsDialogOpen(false)
  }

  const handleMoveSkill = (id: string, direction: "up" | "down") => {
    const index = skills.findIndex((skill) => skill.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === skills.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newSkills = [...skills]
    const skill = newSkills[index]
    newSkills.splice(index, 1)
    newSkills.splice(newIndex, 0, skill)
    setSkills(newSkills)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-primary/10 text-primary"
      case "Advanced":
        return "bg-green-500/10 text-green-500"
      case "Intermediate":
        return "bg-orange-500/10 text-orange-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredSkills = (category: string) => {
    return skills.filter((skill) => skill.category === category)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Add a new skill to your portfolio with a name, proficiency level, and category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g. React, Node.js, Docker"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillLevel">Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value as any })}
              >
                <SelectTrigger id="skillLevel">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Expert">Expert</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillCategory">Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill({ ...newSkill, category: value as any })}
              >
                <SelectTrigger id="skillCategory">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddSkill}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>Edit, reorder, or remove skills from your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frontend">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            {["frontend", "backend", "tools"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filteredSkills(category).length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-sm text-muted-foreground">No skills in this category yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredSkills(category).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.name}</span>
                          <Badge className={`${getLevelColor(skill.level)}`}>{skill.level}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleMoveSkill(skill.id, "up")}>
                            <MoveUp className="h-4 w-4" />
                            <span className="sr-only">Move up</span>
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleMoveSkill(skill.id, "down")}>
                            <MoveDown className="h-4 w-4" />
                            <span className="sr-only">Move down</span>
                          </Button>
                          <Dialog open={isDialogOpen && editingSkill?.id === skill.id} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setEditingSkill(skill)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Skill</DialogTitle>
                                <DialogDescription>Update the details for this skill.</DialogDescription>
                              </DialogHeader>
                              {editingSkill && (
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">Skill Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingSkill.name}
                                      onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-level">Proficiency Level</Label>
                                    <Select
                                      value={editingSkill.level}
                                      onValueChange={(value) =>
                                        setEditingSkill({ ...editingSkill, level: value as any })
                                      }
                                    >
                                      <SelectTrigger id="edit-level">
                                        <SelectValue placeholder="Select level" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select
                                      value={editingSkill.category}
                                      onValueChange={(value) =>
                                        setEditingSkill({ ...editingSkill, category: value as any })
                                      }
                                    >
                                      <SelectTrigger id="edit-category">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="frontend">Frontend</SelectItem>
                                        <SelectItem value="backend">Backend</SelectItem>
                                        <SelectItem value="tools">Tools</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditSkill}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
