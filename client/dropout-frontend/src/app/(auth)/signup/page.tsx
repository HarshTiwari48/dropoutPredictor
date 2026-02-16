"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Meteors } from "@/components/ui/meteors";

import { useAuthStore } from "@/store/auth.store";

export default function SignupPage() {
  const router = useRouter();
  const { register, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
      router.push("/"); 
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (

  

    <div className="min-h-screen relative h-125 w-full overflow-hidden flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      
      <Meteors maxDuration={10} number={20} />
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-white">
            Create your account
          </CardTitle>
          <p className="text-center text-sm text-slate-400">
            Start your journey with us
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="student@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="cursor-pointer text-slate-200 hover:underline"
              >
                Log in
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
      </div>
  );
}
