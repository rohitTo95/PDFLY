
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept: Record<string, string[]>;
  maxFiles?: number;
  maxSizeMB?: number;
  value?: File[];
  showPreview?: boolean;
  className?: string;
}

const FileUploader = ({
  onFilesSelected,
  accept,
  maxFiles = 10,
  maxSizeMB = 50,
  value = [],
  showPreview = true,
  className
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(value);
  const { toast } = useToast();
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        if (errors[0]?.code === 'file-too-large') {
          toast({ 
            title: 'File too large', 
            description: `"${file.name}" exceeds the ${maxSizeMB}MB size limit.`,
            variant: 'destructive' 
          });
        } else if (errors[0]?.code === 'file-invalid-type') {
          toast({ 
            title: 'Invalid file type', 
            description: `"${file.name}" is not a supported file type.`,
            variant: 'destructive' 
          });
        } else {
          toast({ 
            title: 'File error', 
            description: `"${file.name}" could not be uploaded.`,
            variant: 'destructive' 
          });
        }
      });
    }
    
    // If too many files were added, only take the maximum allowed
    if (files.length + acceptedFiles.length > maxFiles) {
      const availableSlots = Math.max(0, maxFiles - files.length);
      acceptedFiles = acceptedFiles.slice(0, availableSlots);
      
      toast({ 
        title: 'Too many files', 
        description: `Only ${maxFiles} files can be uploaded.`,
        variant: 'destructive' 
      });
    }
    
    if (acceptedFiles.length > 0) {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      toast({ 
        title: 'Files added', 
        description: `${acceptedFiles.length} file(s) added successfully.`
      });
    }
  }, [files, maxFiles, maxSizeMB, onFilesSelected, toast]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeBytes,
  });
  
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
    
    toast({ 
      title: 'File removed', 
      description: 'The file has been removed successfully.'
    });
  };
  
  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div 
        {...getRootProps()} 
        className={cn(
          "drop-zone cursor-pointer",
          isDragActive ? "drop-zone-active animate-pulse-glow" : "",
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Upload className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive ? "Drop the files here..." : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground">
              or <span className="text-primary font-medium">browse files</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size: {maxSizeMB}MB (up to {maxFiles} files)
            </p>
          </div>
        </div>
      </div>
      
      {showPreview && files.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Uploaded Files ({files.length})</h3>
            <button 
              onClick={() => {
                setFiles([]);
                onFilesSelected([]);
                toast({ 
                  title: 'All files removed', 
                  description: 'All files have been removed successfully.'
                });
              }}
              className="flex items-center text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span>Remove All</span>
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-none pr-1">
            {files.map((file, index) => (
              <div 
                key={`${file.name}-${index}`} 
                className="flex items-center justify-between p-3 bg-card/50 border border-border rounded-lg hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <File className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }} 
                  className="p-1 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
