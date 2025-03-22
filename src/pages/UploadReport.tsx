
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleAuth } from "@/components/GoogleAuth";
import { GoogleClientInstructions } from "@/components/GoogleClientInstructions";
import { parseExcelFile, SearchConsoleData } from "@/utils/excelParser";
import { useSearchData } from "@/contexts/SearchDataContext";
import { useNavigate } from "react-router-dom";

export default function UploadReport() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { setSearchData } = useSearchData();
  const navigate = useNavigate();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if it's an Excel or CSV file
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    
    if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
      setFile(file);
      toast.success("File selected successfully");
    } else {
      toast.error("Please select a valid Excel or CSV file");
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadComplete(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate initial upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval);
            return 80;
          }
          return prev + 10;
        });
      }, 200);

      // Parse the Excel file
      const parsedData: SearchConsoleData[] = await parseExcelFile(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        if (parsedData.length > 0) {
          // Update context with parsed data
          setSearchData(parsedData);
          setUploadComplete(true);
          setUploading(false);
          
          toast.success(`Successfully processed ${parsedData.length} rows of data`);
          
          // Navigate to dashboard after successful upload
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setUploading(false);
          toast.error('No valid data found in the file');
        }
      }, 500);
    } catch (error) {
      console.error('Error processing file:', error);
      setUploading(false);
      toast.error('Failed to process the file');
    }
  };

  const handleReportFetched = (data: any) => {
    console.log("Search Console data received:", data);
    if (Array.isArray(data) && data.length > 0) {
      setSearchData(data);
      toast.success(`Received ${data.length} rows of data from Search Console`);
      // Navigate to dashboard after successful fetch
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error('No valid data received from Google Search Console');
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload">Manual Upload</TabsTrigger>
          <TabsTrigger value="connect">Connect to Google</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card className="border-2 border-dashed">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Upload Search Console Report</CardTitle>
              <CardDescription>
                Drag and drop your Google Search Console export file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-all ${
                  dragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/20"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleFileDrop}
              >
                {!file && (
                  <>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                      <FileSpreadsheet className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium">
                      Drag & drop your file here
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Support for Excel or CSV files from Google Search Console
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".csv,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </>
                )}

                {file && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        disabled={uploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {uploading && (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} />
                        <p className="text-sm text-center text-muted-foreground">
                          {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Processing data...'}
                        </p>
                      </div>
                    )}

                    {uploadComplete && (
                      <div className="flex items-center justify-center rounded-lg border bg-green-50 p-4 text-green-600">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        <span>Upload complete! Redirecting to dashboard...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="mt-1 h-5 w-5 text-blue-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">How to export report from Google Search Console:</p>
                      <ol className="list-decimal ml-4 text-sm text-muted-foreground space-y-1">
                        <li>Go to Google Search Console and select your property</li>
                        <li>Click on "Performance" in the left navigation</li>
                        <li>Set your desired date range and filters</li>
                        <li>Click the "Export" button at the top right</li>
                        <li>Choose "CSV" or "Excel" format</li>
                        <li>Upload the downloaded file here</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <Button
                onClick={handleUpload}
                disabled={!file || uploading || uploadComplete}
                className="px-8"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Processing..." : "Upload Report"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="connect">
          <div className="space-y-6">
            <GoogleAuth onReportFetched={handleReportFetched} />
            <GoogleClientInstructions />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
