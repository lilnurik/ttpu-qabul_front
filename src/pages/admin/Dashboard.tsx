import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface Application {
  id: string;
  firstName: string;
  surname: string;
  school: string;
  phone: string;
  paymentStatus: "pending" | "processing" | "paid" | "failed";
  submissionDate: string;
  englishCertType?: string;
  certScore?: number;
  passport?: string;
  englishCert?: string;
  photo?: string;
  programDegree?: string;
  hasEnglishCert?: string;
  gender?: string;
}

export const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This is a mock API call - replace with actual backend integration
    const fetchApplications = async () => {
      try {
        console.log("Fetching applications...");
        // Simulate API response with more detailed mock data
        const mockData: Application[] = [
          {
            id: "1",
            firstName: "John",
            surname: "Doe",
            school: "International School",
            phone: "+1234567890",
            paymentStatus: "paid",
            submissionDate: "2024-02-20",
            englishCertType: "IELTS",
            certScore: 7.5,
            passport: "/mock-passport.jpg",
            englishCert: "/mock-certificate.jpg",
            photo: "/mock-photo.jpg",
            programDegree: "Bachelor's Degree",
            hasEnglishCert: "yes",
            gender: "male"
          },
          {
            id: "2",
            firstName: "Jane",
            surname: "Smith",
            school: "City College",
            phone: "+0987654321",
            paymentStatus: "pending",
            submissionDate: "2024-02-19",
            programDegree: "Master's Degree",
            hasEnglishCert: "no",
            gender: "female"
          },
        ];
        setApplications(mockData);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast({
          title: "Error",
          description: "Failed to fetch applications. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: Application["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <Check className="h-5 w-5 text-green-500" />;
      case "failed":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-yellow-500" />;
    }
  };

  const handleViewDetails = (id: string) => {
    console.log("Viewing details for application:", id);
    const application = applications.find(app => app.id === id);
    setSelectedApplication(application || null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Applications Dashboard</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableCaption>List of all submitted applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>English Certificate</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                  {app.firstName} {app.surname}
                </TableCell>
                <TableCell>{app.school}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>
                  {app.englishCertType ? `${app.englishCertType} (${app.certScore})` : "N/A"}
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  {getStatusIcon(app.paymentStatus)}
                  <span className="capitalize">{app.paymentStatus}</span>
                </TableCell>
                <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(app.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-500">Full Name</dt>
                        <dd>{selectedApplication.firstName} {selectedApplication.surname}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Gender</dt>
                        <dd className="capitalize">{selectedApplication.gender}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Phone</dt>
                        <dd>{selectedApplication.phone}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Educational Information</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-gray-500">School</dt>
                        <dd>{selectedApplication.school}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">Program Degree</dt>
                        <dd>{selectedApplication.programDegree}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-gray-500">English Certificate</dt>
                        <dd>
                          {selectedApplication.hasEnglishCert === "yes" 
                            ? `${selectedApplication.englishCertType} (Score: ${selectedApplication.certScore})`
                            : "No certificate"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Uploaded Documents</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedApplication.passport && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Passport</p>
                        <img 
                          src={selectedApplication.passport} 
                          alt="Passport"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {selectedApplication.englishCert && selectedApplication.hasEnglishCert === "yes" && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">English Certificate</p>
                        <img 
                          src={selectedApplication.englishCert} 
                          alt="English Certificate"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    {selectedApplication.photo && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Applicant Photo</p>
                        <img 
                          src={selectedApplication.photo} 
                          alt="Applicant Photo"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};