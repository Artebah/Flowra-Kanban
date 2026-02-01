import { useCallback } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import classNames from "classnames";
import { UploadIcon } from "lucide-react";

interface DropzoneProps extends Omit<DropzoneOptions, "onDrop"> {
  onDrop: (acceptedFiles: File[]) => void;
  label?: string;
  helperText?: string;
  error?: string;
  preview?: string | null;
}

const Dropzone = ({
  onDrop,
  label,
  helperText,
  error,
  preview,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  maxSize = 5242880, // 5MB
  multiple = false,
  ...props
}: DropzoneProps) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxSize,
    multiple,
    ...props,
  });

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block text-gray-300 font-medium">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={classNames(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
          "transition-all duration-300 ease-in-out",
          "hover:border-blue-400 hover:bg-white/5",
          {
            "border-gray-600 bg-transparent": !isDragActive && !error,
            "border-blue-500 bg-blue-500/10 scale-[1.02]":
              isDragActive && isDragAccept,
            "border-red-500 bg-red-500/10": isDragReject || error,
            "border-green-500 bg-green-500/10": preview && !isDragActive,
          }
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="space-y-4">
            <div className="relative mx-auto w-full max-w-md rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <p className="text-white text-sm font-medium">
                  Click or drop to change image
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <UploadIcon className="size-10" />
            </div>

            <div className="space-y-2">
              <p className="text-gray-300 font-medium">
                {isDragActive
                  ? isDragAccept
                    ? "Drop the file here"
                    : "File type not accepted"
                  : "Drag & drop an image here"}
              </p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </div>

            {helperText && !error && (
              <p className="text-gray-500 text-xs">{helperText}</p>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Dropzone;
