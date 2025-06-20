"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/contexts/portfolio-provider";
import { uploadProfileImage } from "@/services/image-service";
import { Loader2, RotateCw, Upload, ZoomOut } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditProfilePhotoDialogProps {
  children: React.ReactNode;
  currentPhoto: string;
  onSave: (photoUrl: any) => void;
}

export function EditProfilePhotoDialog({
  children,
  currentPhoto,
  onSave,
}: EditProfilePhotoDialogProps) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(currentPhoto);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Image metadata
  const [imageTitle, setImageTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [generateVariants, setGenerateVariants] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { portfolio } = usePortfolio();

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        // Reset crop settings for new image
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);

        // Set default metadata
        setImageTitle(`Profile photo - ${file.name}`);
        setAltText("Profile photo");
        setCaption("");
        setDescription("User profile photo");
      };
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getRadianAngle = (degreeValue: number) => {
    return (degreeValue * Math.PI) / 180;
  };

  const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);
    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
      return null;
    }

    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise<Blob | null>((resolve) => {
      croppedCanvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleSave = async () => {
    if (!croppedAreaPixels || !originalFile) return;

    setIsProcessing(true);
    setIsUploading(true);

    try {
      // Get the cropped image as a blob
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      if (!croppedImageBlob) {
        throw new Error("Failed to process image");
      }

      // Create a new File from the blob
      const croppedFile = new File(
        [croppedImageBlob],
        `profile-photo-${Date.now()}.jpg`,
        { type: "image/jpeg" }
      );

      // Upload to your API
      const uploadedImage = await uploadProfileImage({
        file: croppedFile,
        category: "portfolio", // Assuming you have a PROFILE category
        title: imageTitle || "Profile Photo",
        altText: altText || "Profile photo",
        caption: caption,
        description: description || "User profile photo",
        focalPointX: 0.5, // Center focal point
        focalPointY: 0.5, // Center focal point
        tags: ["profile", "avatar"],
        generateVariants: generateVariants,
      });

      console.log("uploadedImage", uploadedImage);

      // Call the onSave callback with the uploaded image URL
      onSave(uploadedImage);
      setOpen(false);

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      // You might want to show a toast notification here
      alert("Failed to upload profile photo. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setImageSrc(currentPhoto);
    setOriginalFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setImageTitle("");
    setAltText("");
    setCaption("");
    setDescription("");
    setGenerateVariants(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setImageSrc(currentPhoto);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    } else {
      resetForm();
    }
    setOpen(newOpen);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Photo</DialogTitle>
          <DialogDescription>
            Upload a new photo or adjust your current profile picture.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload New</TabsTrigger>
            <TabsTrigger value="crop">Crop & Adjust</TabsTrigger>
            <TabsTrigger value="metadata">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload a new photo</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a high-quality image for best results
                </p>
              </div>
              <Button
                onClick={triggerFileInput}
                className="mt-4"
                disabled={isUploading}
              >
                Choose File
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Recommended: Square images (1:1 ratio)</p>
              <p>• Minimum size: 400x400 pixels</p>
              <p>• Supported formats: JPG, PNG, WebP</p>
              <p>• Maximum file size: 10MB</p>
            </div>
          </TabsContent>

          <TabsContent value="crop" className="space-y-4">
            <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                cropShape="round"
                showGrid={false}
              />
            </div>

            <div className="space-y-4">
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <ZoomOut className="h-4 w-4" />
                    Zoom
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <Slider
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                  min={1}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Rotation Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4" />
                    Rotation
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {rotation}°
                  </span>
                </div>
                <Slider
                  value={[rotation]}
                  onValueChange={(value) => setRotation(value[0])}
                  min={-180}
                  max={180}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(rotation - 90)}
                >
                  Rotate Left
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation(rotation + 90)}
                >
                  Rotate Right
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setCrop({ x: 0, y: 0 });
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="Profile Photo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Profile photo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the image"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Generate Variants</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically create different sizes
                </p>
              </div>
              <Switch
                checked={generateVariants}
                onCheckedChange={setGenerateVariants}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isProcessing || isUploading || !originalFile}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Save Photo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
