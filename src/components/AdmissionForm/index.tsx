import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { PersonalInfo } from "./PersonalInfo";
import { EducationInfo } from "./EducationInfo";
import { DocumentUpload } from "./DocumentUpload";
import { PaymentMethod } from "./PaymentMethod";

export const AdmissionForm = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast({
      title: "Success!",
      description: "Your application has been submitted successfully.",
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          University Admission Form
        </h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <PersonalInfo />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Education Information</h2>
            <EducationInfo />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Document Upload</h2>
            <DocumentUpload />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
            <PaymentMethod />
          </section>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </FormProvider>
  );
};