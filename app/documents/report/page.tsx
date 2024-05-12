"use client"
import React, { useState } from "react";
import { UploadDropzone, Uploader } from "@/components/ui/uploadthing";
import { FileText, Pencil } from "lucide-react";

interface FormData {
  pdfUrl?: string;
}

const PdfUploadSection = () => {
  const [pdfUrl, setPdfUrl] = useState<string | undefined>("");

  const handlePdfUploadComplete = (res: any) => {
    setPdfUrl(res[0].fileUrl);
    // Do something with the response
    console.log("Files: ", res);
    alert("PDF Upload Completed");
  };

  const handlePdfUploadError = (error: any) => {
    // Do something with the error.
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="col-span-full">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="course-image" className="block text-sm font-medium leading-6 text-gray-900">
          Upload PDF
        </label>
        {pdfUrl && (
          <button
            onClick={() => setPdfUrl(undefined)}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change PDF</span>
          </button>
        )}
      </div>
      {pdfUrl ? (
        <a className="flex space-x-3 items-center text-purple-600" target="_blank" href={pdfUrl}>
          <FileText />
          <span>View PDF</span>
        </a>
      ) : (
        <UploadDropzone
          endpoint="pdfUploader"
          onClientUploadComplete={handlePdfUploadComplete}
          onUploadError={handlePdfUploadError}
        />
      )}
    </div>
  );
};

export default PdfUploadSection;
