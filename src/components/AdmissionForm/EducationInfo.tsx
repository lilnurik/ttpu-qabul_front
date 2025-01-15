import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const EducationInfo = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const hasEnglishCert = watch("hasEnglishCert");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="school">School/Lyceum/College</Label>
        <Input
          id="school"
          {...register("school", { required: "School information is required" })}
          className={errors.school ? "border-red-500" : ""}
        />
        {errors.school && (
          <p className="text-red-500 text-sm">{errors.school.message as string}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label>Do you have an English Language Certificate?</Label>
        <RadioGroup defaultValue="no" {...register("hasEnglishCert")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="certYes" />
            <Label htmlFor="certYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="certNo" />
            <Label htmlFor="certNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hasEnglishCert === "yes" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="englishCert">English Language Certificate Type</Label>
            <Select {...register("englishCertType")}>
              <SelectTrigger>
                <SelectValue placeholder="Select certificate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ielts">IELTS</SelectItem>
                <SelectItem value="toefl">TOEFL</SelectItem>
                <SelectItem value="cefr">CEFR</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certScore">English Certificate Score</Label>
            <Input
              id="certScore"
              type="number"
              step="0.5"
              {...register("certScore")}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="satScore">SAT Score (if available)</Label>
        <Input
          id="satScore"
          type="number"
          {...register("satScore")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="programDegree">Program Degree</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
            <SelectItem value="master">Master's Degree</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
