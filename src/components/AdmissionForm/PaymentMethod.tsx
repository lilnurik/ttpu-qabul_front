import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const PaymentMethod = () => {
  const { register } = useFormContext();
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "paid" | "failed">("pending");
  const { toast } = useToast();

  const checkPaymentStatus = async () => {
    try {
      // This is a mock API call - replace with actual backend integration
      console.log("Checking payment status...");
      // Simulate API response
      const status = "paid";
      setPaymentStatus(status as "pending" | "processing" | "paid" | "failed");
      
      if (status === "paid") {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setPaymentStatus("failed");
      toast({
        title: "Payment Check Failed",
        description: "Could not verify payment status. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Select Payment Method</Label>
        <RadioGroup defaultValue="click" className="space-y-4">
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="click" id="click" />
            <Label htmlFor="click" className="flex items-center">
              <img src="/click-logo.png" alt="Click" className="h-8 w-auto mr-2" />
              Pay with Click
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="payme" id="payme" />
            <Label htmlFor="payme" className="flex items-center">
              <img src="/payme-logo.png" alt="Payme" className="h-8 w-auto mr-2" />
              Pay with Payme
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-2">Payment Status</h3>
        <div className={`text-sm ${
          paymentStatus === "paid" ? "text-green-600" :
          paymentStatus === "failed" ? "text-red-600" :
          "text-yellow-600"
        }`}>
          {paymentStatus === "paid" && "✓ Payment successful"}
          {paymentStatus === "failed" && "✗ Payment failed"}
          {paymentStatus === "processing" && "⟳ Processing payment..."}
          {paymentStatus === "pending" && "⌛ Waiting for payment..."}
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" {...register("terms", { required: true })} />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </Label>
          <p className="text-sm text-muted-foreground">
            By checking this box, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};