interface UploadImageRequest {
  file: File;
  category: string;
  title?: string;
  altText?: string;
  caption?: string;
  description?: string;
  focalPointX?: number;
  focalPointY?: number;
  tags?: string[];
  isPublic?: boolean;
  generateVariants?: boolean;
}

interface UploadImageResponse {
  id: string;
  url: string;
  thumbnailUrl?: string;
  variants?: Array<{
    size: string;
    url: string;
  }>;
  metadata: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

export async function uploadProfileImage(
  data: UploadImageRequest
): Promise<UploadImageResponse> {
  const formData = new FormData();

  // Add the file
  formData.append("file", data.file);

  // Add other fields
  formData.append("category", data.category);

  if (data.title) formData.append("title", data.title);
  if (data.altText) formData.append("altText", data.altText);
  if (data.caption) formData.append("caption", data.caption);
  if (data.description) formData.append("description", data.description);
  if (data.focalPointX !== undefined)
    formData.append("focalPointX", data.focalPointX.toString());
  if (data.focalPointY !== undefined)
    formData.append("focalPointY", data.focalPointY.toString());
  if (data.isPublic !== undefined)
    formData.append("isPublic", data.isPublic.toString());
  if (data.generateVariants !== undefined)
    formData.append("generateVariants", data.generateVariants.toString());

  // Add tags as comma-separated string
  if (data.tags && data.tags.length > 0) {
    formData.append("tags", data.tags.join(","));
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

// Helper function to get auth token (implement based on your auth system)
function getAuthToken(): string {
  // Return your auth token here
  // This could be from localStorage, cookies, or your auth context
  return localStorage.getItem("authToken") || "";
}

// Alternative upload function for different environments
export async function uploadImageToAPI(
  data: UploadImageRequest,
  apiBaseUrl = ""
): Promise<UploadImageResponse> {
  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("category", data.category);

  // Add optional fields
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "file" && key !== "category" && value !== undefined) {
      if (key === "tags" && Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  const response = await fetch(`${apiBaseUrl}/api/images`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return response.json();
}
