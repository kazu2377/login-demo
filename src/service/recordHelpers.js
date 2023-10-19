// recordHelpers.js

import { supabase } from "../../supabaseClient";

export async function deleteRecord(
  recordId,
  attendanceRecords,
  fetchAttendanceRecordsForStudent,
  updateAttendanceCounts
) {
  let result = {
    success: false,
    failed: false,
    processedCount: 0,
  };

  try {
    const response = await supabase
      .from("attendance_records")
      .update({ generation_num: 1 })
      .eq("record_id", recordId);

    if (response.error) {
      throw response.error;
    }

    const updatedRecords = attendanceRecords.filter(
      (record) => record.record_id !== recordId
    );

    result.processedCount = updatedRecords.length;

    fetchAttendanceRecordsForStudent();
    updateAttendanceCounts(updatedRecords);

    result.success = true;
  } catch (error) {
    console.error("Error deleting record:", error);
    result.failed = true;
  }

  return result;
}
