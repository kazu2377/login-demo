// deleteRecord.test.js
import { deleteRecord } from "./serves/recordHelpers";
import { supabase } from "../supabaseClient";

jest.mock("./supabaseClient");

describe("deleteRecord", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the record successfully", async () => {
    const mockAttendanceRecords = [
      {
        record_id: "record123",
        // ... other fields
      },
    ];

    const mockFetchAttendanceRecordsForStudent = jest.fn();
    const mockUpdateAttendanceCounts = jest.fn();

    supabase.from.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    });

    const result = await deleteRecord(
      "record123",
      mockAttendanceRecords,
      mockFetchAttendanceRecordsForStudent,
      mockUpdateAttendanceCounts
    );

    expect(result).toEqual({
      success: true,
      failed: false,
      processedCount: 0, // Since the record with "record123" is removed
    });

    expect(supabase.from).toHaveBeenCalledWith("attendance_records");
    expect(mockFetchAttendanceRecordsForStudent).toHaveBeenCalled();
    expect(mockUpdateAttendanceCounts).toHaveBeenCalledWith([]);
  });

  it("should handle error when deleting record", async () => {
    const mockError = new Error("Delete error");

    const mockAttendanceRecords = [
      {
        record_id: "record123",
        // ... other fields
      },
    ];

    const mockFetchAttendanceRecordsForStudent = jest.fn();
    const mockUpdateAttendanceCounts = jest.fn();

    supabase.from.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockRejectedValue(mockError),
    });

    const result = await deleteRecord(
      "record123",
      mockAttendanceRecords,
      mockFetchAttendanceRecordsForStudent,
      mockUpdateAttendanceCounts
    );

    expect(result).toEqual({
      success: false,
      failed: true,
      processedCount: 1, // The record with "record123" still exists
    });

    expect(supabase.from).toHaveBeenCalledWith("attendance_records");
    expect(mockFetchAttendanceRecordsForStudent).not.toHaveBeenCalled();
    expect(mockUpdateAttendanceCounts).not.toHaveBeenCalled();
  });
});
