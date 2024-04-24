import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  classNameWrapper?: string;
  className?: string;
  dropMessage: string;
  acceptedTypes?: string;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  function Dropzone(
    {
      className,
      classNameWrapper,
      dropMessage,

      handleOnDrop,
      ...props
    },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [fileAdded, setFileAdded] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current && files.length > 0) {
        inputRef.current.files = files;
        setLoading(true);
        handleOnDrop(files);
        setFileName(files[0].name);
        setLoading(false);
        setFileAdded(true);
      }
    };

    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 
          h-full
          border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="h-full flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            {!fileAdded && <span className="font-medium">{dropMessage}</span>}

            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            )}

            {fileAdded && (
              <div className="flex items-center space-x-2">
                <UploadCloud />
                <span>{fileName}</span>
              </div>
            )}

            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              className={cn("hidden  h-full", className)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setLoading(true);
                  handleOnDrop(e.target.files);
                  setFileName(e.target.files[0].name);
                  setLoading(false);
                  setFileAdded(true);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default Dropzone;
