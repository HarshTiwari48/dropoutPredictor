"use client";

import { uploadStudentsCSV } from "@/lib/api/admin.api";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShimmerBackButton from "@/components/common/ShimmerActionButton"; // add this later

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async () => {
  if (!file) return;

  setLoading(true);
  setMessage(null);

  try {
    const data = await uploadStudentsCSV(file);  /// backend call yeh h 

    setMessage(
      `Upload successful. ${data.totalStudents || "Students"} processed.`
    );
  } catch (error: any) {
    setMessage(
      error?.response?.data?.message ||
        "Failed to upload CSV. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg bg-[#0B1220] border border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            Upload Students CSV
          </CardTitle>
          <p className="text-sm text-white/60">
            Upload the latest student academic data for dropout prediction.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="bg-white/5 text-white border-white/10"
          />

          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full"
          >
            {loading ? "Processing CSV, please wait..." : "Upload CSV"}
          </Button>

          {message && (
            <p className="text-sm text-center text-white/70">{message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
