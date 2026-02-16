"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuthStore } from "@/store/auth.store";
import {Meteors} from "@/components/ui/meteors";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login({ email, password });

  } catch (error) {
    console.error("Login failed", error);
  }
};


  return (
    <div className="min-h-screen relative h-125 w-full overflow-hidden flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      
       <Meteors maxDuration={10} number={20} />
      <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-white">
            Welcome back
          </CardTitle>
          <p className="text-center text-sm text-slate-400">
            Log in to your account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              {loading ? "Logging in..." : "Log in"}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="cursor-pointer text-slate-200 hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
