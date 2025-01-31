"use client";
import { CldImage } from "next-cloudinary";

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <CldImage
            src="kreatify-logo" // Use this sample image or upload your own via the Media Explorer
            width="500" // Transform the image: auto-crop to square aspect_ratio
            alt="Sample image"
            height="500"
            crop={{
                type: "auto",
                source: true,
            }}
        />
    );
}
