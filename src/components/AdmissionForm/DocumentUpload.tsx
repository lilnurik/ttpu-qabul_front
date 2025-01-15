import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const DocumentUpload = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Passport</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="passport"
            {...register("passport", { required: "Passport is required" })}
          />
          <Label
            htmlFor="passport"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Click to upload passport (PDF/JPG/PNG, max 5MB)
            </span>
          </Label>
        </div>
        {errors.passport && (
          <p className="text-red-500 text-sm">{errors.passport.message as string}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label>English Language Certificate (optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="englishCert"
            {...register("englishCert")}
          />
          <Label
            htmlFor="englishCert"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Click to upload certificate (PDF/JPG/PNG, max 5MB)
            </span>
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Applicant's Photo</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            id="photo"
            {...register("photo", { required: "Photo is required" })}
          />
          <Label
            htmlFor="photo"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Click to upload photo (JPG/PNG, max 5MB)
            </span>
          </Label>
        </div>
        {errors.photo && (
          <p className="text-red-500 text-sm">{errors.photo.message as string}</p>
        )}
      </div>
    </div>
  );
};