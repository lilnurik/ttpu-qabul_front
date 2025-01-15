import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const PersonalInfo = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const registeredBefore = watch("registeredBefore");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneLookup = async () => {
    if (!phoneNumber) return;
    
    setIsLoading(true);
    try {
      // This is a mock API call - replace with actual backend integration
      console.log("Looking up data for phone:", phoneNumber);
      const mockData = {
        firstName: "John",
        surname: "Doe",
        gender: "male",
      };
      
      // Set form values with retrieved data
      Object.entries(mockData).forEach(([key, value]) => {
        setValue(key, value);
      });
      
      toast({
        title: "Data Retrieved",
        description: "Your information has been loaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not find your information. Please fill in the form manually.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Have you registered before?</Label>
        <RadioGroup 
          defaultValue="no" 
          className="flex space-x-4"
          {...register("registeredBefore")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {registeredBefore === "yes" && (
        <div className="space-y-4">
          <Label htmlFor="lookupPhone">Enter your registered phone number</Label>
          <div className="flex space-x-2">
            <Input
              id="lookupPhone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
            />
            <button
              onClick={handlePhoneLookup}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Look up"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            {...register("surname", { required: "Surname is required" })}
            className={errors.surname ? "border-red-500" : ""}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm">{errors.surname.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: "Please enter a valid phone number",
            },
          })}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
        )}
      </div>
    </div>
  );
};
