import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { Application, Faculty, ExamDate } from '../types';

interface EditApplicationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    application: Application | null;
    faculties: Faculty[];
    examDates: ExamDate[];
    onUpdate: (applicationId: number, data: {
        faculty_id?: number;
        exam_date_id?: number;
    }) => Promise<void>;
    onExamDatesFetch: (facultyId: number) => Promise<void>;
    onDocumentDownload: (filePath: string, fileName: string) => Promise<void>;
}

export const EditApplicationDialog: React.FC<EditApplicationDialogProps> = ({
    open,
    onOpenChange,
    application,
    faculties,
    examDates,
    onUpdate,
    onExamDatesFetch,
    onDocumentDownload
}) => {
    const [editingApplication, setEditingApplication] = useState<Application | null>(null);

    useEffect(() => {
        setEditingApplication(application);
    }, [application]);

    useEffect(() => {
        if (editingApplication?.faculty_id) {
            onExamDatesFetch(editingApplication.faculty_id);
        }
    }, [editingApplication?.faculty_id, onExamDatesFetch]);

    if (!editingApplication) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Edit Application</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Faculty</Label>
                            <Select
                                value={String(editingApplication.faculty_id)}
                                onValueChange={(value) => {
                                    const facultyId = Number(value);
                                    setEditingApplication({
                                        ...editingApplication,
                                        faculty_id: facultyId
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select faculty"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {faculties
                                        .filter(f => f.program === editingApplication.program_degree)
                                        .map(faculty => (
                                            <SelectItem key={faculty.id} value={String(faculty.id)}>
                                                {faculty.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>

                            <Label>Exam Date</Label>
                            <Select
                                value={String(editingApplication.exam_date_id)}
                                onValueChange={(value) => {
                                    setEditingApplication({
                                        ...editingApplication,
                                        exam_date_id: Number(value)
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select exam date"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {examDates.map(examDate => (
                                        <SelectItem key={examDate.id} value={String(examDate.id)}>
                                            {new Date(examDate.date).toLocaleDateString()}
                                            {examDate.available_spots > 0 &&
                                                ` (${examDate.available_spots} spots)`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <Label>Documents</Label>
                            <div className="space-y-4">
                                {Object.entries(editingApplication.documents).map(([type, fileName]) => (
                                    <div key={type} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium capitalize">{type}</h4>
                                            <p className="text-sm text-gray-500">{fileName}</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onDocumentDownload(fileName, fileName)}
                                        >
                                            <Download className="h-4 w-4 mr-1"/>
                                            Download
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="text-sm text-gray-500 mb-4">
                            <p>Last updated: {new Date(editingApplication.updated_at).toLocaleString()}</p>
                            <p>Updated by: lilnurik</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => onUpdate(editingApplication.id, {
                                faculty_id: editingApplication.faculty_id,
                                exam_date_id: editingApplication.exam_date_id
                            })}
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditApplicationDialog;