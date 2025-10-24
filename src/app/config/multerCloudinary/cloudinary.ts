import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import stream from "stream";
import AppError from "../../utils/AppError";
import { envVars } from "../env";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET,
});

// **********************************************************************************************************

/**
 * Uploads a file buffer (image/video/pdf/etc.) to Cloudinary.
 * Automatically handles folder, extension, and resource type.
 */
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  folder: string,
  fileName: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      // Create unique identifier
      const publicId = `${folder}/${fileName}-${Date.now()}`;

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: "auto", // auto-detect (image, video, raw)
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new AppError(400, `Cloudinary upload failed: ${error?.message}`)
            );
          }
          resolve(result);
        }
      );

      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);
      bufferStream.pipe(uploadStream);
    } catch (error: any) {
      reject(new AppError(500, `Unexpected upload error: ${error.message}`));
    }
  });
};
// 🧩 Key Features :
//     ✅ Follows the same dynamic folder and auto resource detection pattern as your multer setup.
//     ✅ Uses AppError for consistent backend error handling.
//     ✅ Returns a Promise<UploadApiResponse> — fully typed.
//     ✅ Allows any folder name dynamically (you can pass "pdf", "images", "videos", etc.).
// 💡 Example Usage :
// const result = await uploadBufferToCloudinary(pdfBuffer, "pdfs", "user-report");
// console.log("Uploaded URL:", result.secure_url);

// **************************************************************************************************************

/**
 * Extracts the Cloudinary public_id from a full URL.
 * Supports any file type (image/video) and nested folder structure.
 */
function extractPublicIdFromUrl(url: string): string {
  // Match any valid Cloudinary file URL with optional version and any extension
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/);

  if (!match || !match[1]) {
    throw new AppError(400, "Unable to extract publicId from Cloudinary URL.");
  }

  return match[1];
}

/**
 * Deletes a Cloudinary resource (image/video) by its full URL.
 */
export async function deleteFromCloudinary(url: string): Promise<void> {
  try {
    const publicId = extractPublicIdFromUrl(url);

    // Attempt deletion from Cloudinary (auto-detects image/video type)
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto", // ensures both images & videos are handled
    });

    // Optionally verify Cloudinary's response
    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError(500, `Cloudinary deletion failed: ${result.result}`);
    }
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, "Error deleting file from Cloudinary.");
  }
}

export const cloudinaryConfig = cloudinary;
