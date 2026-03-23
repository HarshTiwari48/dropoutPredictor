"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestAdminAccess } from "@/lib/api/auth.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RequestAdminPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await requestAdminAccess({ name, email, reason });

      alert("Request sent successfully!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-white">
            Request Admin Access
          </CardTitle>
          <p className="text-center text-sm text-slate-400">
            Fill the form and we’ll review your request
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-300">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-slate-300">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label className="text-slate-300">Why do you need admin access?</Label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-md bg-slate-800 p-2 text-white border border-slate-700"
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Submit Request"}
            </Button>

            <p
              onClick={() => router.push("/login")}
              className="text-center text-sm text-slate-400 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}