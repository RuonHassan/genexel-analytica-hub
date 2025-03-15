
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Upload, X, File } from "lucide-react";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  type: "article" | "report";
}

const UploadModal = ({ open, onClose, type }: UploadModalProps) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<string>(type === "report" ? "299" : "0");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, you would send this data to your backend
      console.log({
        title,
        summary,
        category,
        file,
        image,
        price: type === "report" ? Number(price) : 0,
      });

      toast({
        title: `${type === "article" ? "Article" : "Report"} uploaded successfully`,
        description: "Your content has been submitted and is pending review.",
      });

      // Reset form and close modal
      resetForm();
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setCategory("");
    setFile(null);
    setImage(null);
    setPrice(type === "report" ? "299" : "0");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearImage = () => {
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload New {type === "article" ? "Article" : "Report"}</DialogTitle>
          <DialogDescription>
            Fill in the details below to upload your {type === "article" ? "article" : "report"} to the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${type === "article" ? "article" : "report"} title`}
                required
              />
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief description of the content"
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="analysis">Data Analysis</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="learning">Learning Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {type === "report" && (
                <div>
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="content">Upload {type === "article" ? "Article" : "Report"} (PDF)</Label>
              <div className="mt-1 flex items-center">
                {file ? (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200 w-full">
                    <File className="h-5 w-5 text-genexel-600" />
                    <span className="text-sm truncate flex-1">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearFile}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span>Upload PDF</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="image">Cover Image</Label>
              <div className="mt-1 flex items-center">
                {image ? (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200 w-full">
                    <div className="h-10 w-10 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm truncate flex-1">{image.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearImage}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      <span>Upload Image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-genexel-600 hover:bg-genexel-700 text-white"
            >
              {isSubmitting ? "Uploading..." : `Upload ${type === "article" ? "Article" : "Report"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
