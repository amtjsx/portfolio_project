"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreate } from "@/hooks/use-create";
import { useDelete } from "@/hooks/use-delete";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EditProfilePhotoDialog } from "../../profile/edit/edit-profile-photo-dialog";

// Enums matching your model
enum EducationType {
  BACHELORS = "bachelors",
  MASTERS = "masters",
  DOCTORATE = "doctorate",
  ASSOCIATE = "associate",
  CERTIFICATE = "certificate",
  DIPLOMA = "diploma",
  HIGH_SCHOOL = "high_school",
  VOCATIONAL = "vocational",
  ONLINE_COURSE = "online_course",
  SELF_STUDY = "self_study",
  OTHER = "other",
}

// Form validation schema
const educationFormSchema = z.object({
  institutionName: z
    .string()
    .min(1, "Institution name is required")
    .max(255, "Institution name must be less than 255 characters"),
  institutionLogo: z.string().optional().nullable(),
  institutionUrl: z.string().url("Must be a valid URL").optional(),
  degree: z
    .string()
    .min(1, "Degree is required")
    .max(255, "Degree must be less than 255 characters"),
  fieldOfStudy: z
    .string()
    .min(1, "Field of study is required")
    .max(255, "Field of study must be less than 255 characters"),
  educationType: z.nativeEnum(EducationType).optional(),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date().optional(),
  isCurrent: z.boolean().default(false),
  location: z
    .string()
    .max(255, "Location must be less than 255 characters")
    .optional(),
  isRemote: z.boolean().default(false),
  gpa: z.string().max(10, "GPA must be less than 10 characters").optional(),
  description: z.string().optional(),
  courses: z.array(z.string()).default([]),
  honors: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  isHighlighted: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  certificateUrl: z.string().url("Must be a valid URL").optional(),
  isVerified: z.boolean().default(false),
  verificationDate: z.date().optional(),
  verificationMethod: z
    .string()
    .max(255, "Verification method must be less than 255 characters")
    .optional(),
  additionalInfo: z.string().optional(), // JSON string that will be parsed
});

type EducationFormValues = z.infer<typeof educationFormSchema>;

interface EducationFormProps {
  education?: any; // Existing education for editing
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EducationForm({
  education,
  open,
  onOpenChange,
}: EducationFormProps) {
  const [newCourse, setNewCourse] = useState("");
  const [newHonor, setNewHonor] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institutionName: education?.institutionName,
      institutionLogo: education?.institutionLogo,
      institutionUrl: education?.institutionUrl,
      degree: education?.degree,
      fieldOfStudy: education?.fieldOfStudy,
      educationType: education?.educationType,
      startDate: education?.startDate
        ? new Date(education.startDate)
        : undefined,
      endDate: education?.endDate ? new Date(education.endDate) : undefined,
      isCurrent: education?.isCurrent,
      location: education?.location,
      isRemote: education?.isRemote,
      gpa: education?.gpa,
      description: education?.description,
      courses: education?.courses || [],
      honors: education?.honors || [],
      activities: education?.activities || [],
      projects: education?.projects || [],
      achievements: education?.achievements || [],
      skills: education?.skills || [],
      isHighlighted: education?.isHighlighted,
      displayOrder: education?.displayOrder,
      certificateUrl: education?.certificateUrl,
      isVerified: education?.isVerified,
      verificationDate: education?.verificationDate
        ? new Date(education.verificationDate)
        : undefined,
      verificationMethod: education?.verificationMethod,
      additionalInfo: education?.additionalInfo
        ? JSON.stringify(education.additionalInfo, null, 2)
        : "",
    },
  });

  const { create, creating } = useCreate({
    title: "education",
    url: "/education",
  });

  const handleSubmit = async (data: EducationFormValues) => {
    // Parse additionalInfo JSON if provided
    const processedData = {
      ...data,
      additionalInfo: data.additionalInfo
        ? JSON.parse(data.additionalInfo)
        : null,
    };
    await create({ data: processedData });
    form.reset();
    onOpenChange(false);
  };

  const educationTypes = [
    { value: EducationType.BACHELORS, label: "Bachelor's Degree" },
    { value: EducationType.MASTERS, label: "Master's Degree" },
    { value: EducationType.DOCTORATE, label: "Doctorate" },
    { value: EducationType.ASSOCIATE, label: "Associate Degree" },
    { value: EducationType.CERTIFICATE, label: "Certificate" },
    { value: EducationType.DIPLOMA, label: "Diploma" },
    { value: EducationType.HIGH_SCHOOL, label: "High School" },
    { value: EducationType.VOCATIONAL, label: "Vocational" },
    { value: EducationType.ONLINE_COURSE, label: "Online Course" },
    { value: EducationType.SELF_STUDY, label: "Self Study" },
    { value: EducationType.OTHER, label: "Other" },
  ];

  const verificationMethods = [
    "Digital Certificate",
    "Official Transcript",
    "Digital Badge",
    "Blockchain Verification",
    "Institution Portal",
    "Third-party Verification",
    "Manual Verification",
  ];

  // Helper functions for array fields
  const addArrayItem = (
    fieldName: keyof EducationFormValues,
    value: string,
    setter: (value: string) => void
  ) => {
    if (value.trim()) {
      const currentValues = form.getValues(fieldName) as string[];
      if (!currentValues.includes(value.trim())) {
        form.setValue(fieldName, [...currentValues, value.trim()] as any);
        setter("");
      }
    }
  };

  const removeArrayItem = (
    fieldName: keyof EducationFormValues,
    itemToRemove: string
  ) => {
    const currentValues = form.getValues(fieldName) as string[];
    form.setValue(
      fieldName,
      currentValues.filter((item) => item !== itemToRemove) as any
    );
  };

  // Watch isCurrent to handle endDate logic
  const isCurrent = form.watch("isCurrent");
  const isVerified = form.watch("isVerified");

  const { remove, deleting } = useDelete({
    title: "education",
    url: "/education",
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="institutionLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Logo URL</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="https://university.edu/logo.png"
                      {...field}
                    />
                    <EditProfilePhotoDialog
                      currentPhoto={
                        field.value
                          ? `${process.env.NEXT_PUBLIC_API_URL}/images/file/${field.value}`
                          : ""
                      }
                      onSave={(image) => {
                        field.onChange(image.id);
                      }}
                    >
                      <Button type="button" size={"icon"} variant={"outline"}>
                        <Upload className="h-4 w-4" />
                      </Button>
                    </EditProfilePhotoDialog>
                  </div>
                </FormControl>
                <FormDescription>
                  URL to the institution's logo image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Basic Information */}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="institutionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Stanford University, Coursera, MIT"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree/Certificate *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Bachelor of Science, Professional Certificate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Computer Science, Data Science"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="educationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your educational experience, specializations, or key learnings..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about your educational experience and what
                    you learned.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Dates and Location */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Timeline & Location</h3>
              <p className="text-sm text-muted-foreground">
                When and where you completed this education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isCurrent}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Leave empty if currently enrolled
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Currently Enrolled
                    </FormLabel>
                    <FormDescription>
                      I am currently pursuing this education
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          form.setValue("endDate", undefined);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stanford, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Remote/Online</FormLabel>
                      <FormDescription>
                        This was completed remotely
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA/Grade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 3.8/4.0, First Class Honours, 95%"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your grade point average or final grade
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Institution Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Institution Details</h3>
              <p className="text-sm text-muted-foreground">
                Additional information about the institution.
              </p>
            </div>

            <FormField
              control={form.control}
              name="institutionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://university.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Academic Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Academic Details</h3>
              <p className="text-sm text-muted-foreground">
                Courses, projects, and achievements.
              </p>
            </div>

            {/* Courses */}
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relevant Courses</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add course..."
                        value={newCourse}
                        onChange={(e) => setNewCourse(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("courses", newCourse, setNewCourse);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem("courses", newCourse, setNewCourse)
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((course) => (
                        <Badge
                          key={course}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {course}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("courses", course)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honors */}
            <FormField
              control={form.control}
              name="honors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Honors & Awards</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add honor or award..."
                        value={newHonor}
                        onChange={(e) => setNewHonor(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("honors", newHonor, setNewHonor);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem("honors", newHonor, setNewHonor)
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((honor) => (
                        <Badge
                          key={honor}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {honor}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("honors", honor)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Activities */}
            <FormField
              control={form.control}
              name="activities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activities & Organizations</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add activity or organization..."
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem(
                              "activities",
                              newActivity,
                              setNewActivity
                            );
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem(
                            "activities",
                            newActivity,
                            setNewActivity
                          )
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((activity) => (
                        <Badge
                          key={activity}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {activity}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              removeArrayItem("activities", activity)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Projects */}
            <FormField
              control={form.control}
              name="projects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Projects</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add project..."
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("projects", newProject, setNewProject);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem("projects", newProject, setNewProject)
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((project) => (
                        <Badge
                          key={project}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {project}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("projects", project)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Achievements */}
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Achievements</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add achievement..."
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem(
                              "achievements",
                              newAchievement,
                              setNewAchievement
                            );
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem(
                            "achievements",
                            newAchievement,
                            setNewAchievement
                          )
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((achievement) => (
                        <Badge
                          key={achievement}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {achievement}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              removeArrayItem("achievements", achievement)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Gained</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addArrayItem("skills", newSkill, setNewSkill);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          addArrayItem("skills", newSkill, setNewSkill)
                        }
                        variant="outline"
                        size="icon"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeArrayItem("skills", skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormDescription>
                    Skills and technologies you learned during this education
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Verification & Certificates */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">
                Verification & Certificates
              </h3>
              <p className="text-sm text-muted-foreground">
                Certificate and verification information.
              </p>
            </div>

            <FormField
              control={form.control}
              name="certificateUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://university.edu/certificate/123"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Link to your digital certificate or diploma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVerified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Verified Credential
                    </FormLabel>
                    <FormDescription>
                      This education has been verified
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isVerified && (
              <>
                <FormField
                  control={form.control}
                  name="verificationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Verification Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select verification method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {verificationMethods.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <Separator />

          {/* Organization */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Organization</h3>
              <p className="text-sm text-muted-foreground">
                Portfolio assignment and display settings.
              </p>
            </div>

            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>Lower numbers appear first</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isHighlighted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Highlighted Education
                    </FormLabel>
                    <FormDescription>
                      Feature this education prominently in your profile
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Additional Information */}
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (JSON)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='{"thesis": "AI in Healthcare", "advisor": "Dr. Smith"}'
                    className="min-h-[80px] font-mono text-sm resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional JSON data for additional education information
                  (thesis, advisor, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            {education && (
              <Button
                variant={"destructive"}
                type="button"
                onClick={async () => {
                  await remove(education.id);
                  onOpenChange(false);
                }}
              >
                Delete
              </Button>
            )}
            {/* Form Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={creating}
                className="w-full sm:w-auto"
              >
                {creating
                  ? "Saving..."
                  : education
                  ? "Update Education"
                  : "Add Education"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
