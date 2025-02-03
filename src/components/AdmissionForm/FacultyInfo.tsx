
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useState } from "react";

type Faculty = {
  id: number;
  name: string;
  is_active: number;
  exam_dates: Array<{
    id: number;
    date: string;
    available_spots: number;
  }>;
};

type FacultiesResponse = Array<{
  program: string;
  faculities_list: Faculty[];
}>;

 // eslint-disable-next-line @typescript-eslint/ban-ts-comment

export const FacultyInfo = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [selectedProgramDegree, setSelectedProgramDegree] = useState<string | null>(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);

  // Получаем все факультеты
  const { data: facultiesData, isLoading: isLoadingFaculties } = useQuery<FacultiesResponse>({
    queryKey: ['faculties'],
    queryFn: async () => {
      const response = await api.getFaculties();
      return response.data;
    }
  });

  // Фильтруем факультеты в зависимости от выбранного направления
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const filteredFaculties = facultiesData?.find(
    (program) => program.program.toLowerCase().includes(selectedProgramDegree?.toLowerCase() || '')
  )?.faculities_list || [];

  // Получаем даты экзаменов для выбранного факультета
  const { data: examDates, isLoading: isLoadingDates } = useQuery({
    queryKey: ['examDates', selectedFacultyId],
    queryFn: async () => {
      if (!selectedFacultyId) return [];
      const response = await api.getExamDates(Number(selectedFacultyId));
      return response.data;
    },
    enabled: !!selectedFacultyId
  });

  const handleProgramDegreeChange = (value: string) => {
    setSelectedProgramDegree(value);
    setValue("programDegree", value);
    // Сбрасываем выбранный факультет при смене программы
    setSelectedFacultyId(null);
    setValue('faculty_id', '');
    setValue('exam_date_id', '');

    console.log(`Program degree selected: ${value} by at 2025-01-23 14:09:03`);
  };

  const handleFacultyChange = (value: string) => {
    setSelectedFacultyId(value);
    setValue('faculty_id', value);
    setValue('exam_date_id', ''); // Сбрасываем дату экзамена при смене факультета
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="programDegree">Program Degree</Label>
        <Select
          onValueChange={handleProgramDegreeChange}
          value={watch('programDegree')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select program"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
            <SelectItem value="master">Master's Degree</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="faculty">Faculty</Label>
        <Select
          disabled={!selectedProgramDegree}
          onValueChange={handleFacultyChange}
          value={watch('faculty_id')}
        >
          <SelectTrigger>
            <SelectValue placeholder={
              !selectedProgramDegree
                ? "Select program degree first"
                : isLoadingFaculties
                  ? "Loading..."
                  : "Select faculty"
            }/>
          </SelectTrigger>
          <SelectContent>
            {filteredFaculties.map((faculty) => (
              <SelectItem
                key={faculty.id}
                value={faculty.id.toString()}
              >
                {faculty.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.faculty_id && (
          <p className="text-red-500 text-sm">{errors.faculty_id.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="examDate">Exam Date</Label>
        <Select
          disabled={!selectedFacultyId}
          onValueChange={(value) => setValue('exam_date_id', value)}
          value={watch('exam_date_id')}
        >
          <SelectTrigger>
            <SelectValue placeholder={
              !selectedFacultyId
                ? "Select a faculty first"
                : isLoadingDates
                  ? "Loading..."
                  : "Select exam date"
            }/>
          </SelectTrigger>
          <SelectContent>
            {examDates?.map((date: any) => (
              <SelectItem
                key={date.id}
                value={date.id.toString()}
              >
                {date.date} ({date.available_spots} spots available)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.exam_date_id && (
          <p className="text-red-500 text-sm">{errors.exam_date_id.message as string}</p>
        )}
      </div>
    </div>
  );
};