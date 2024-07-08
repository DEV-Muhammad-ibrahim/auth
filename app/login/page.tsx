"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { NextResponse } from "next/server";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      window.location.reload();
      router.replace("/");
    } catch (error: any) {
      const response = NextResponse.json(
        {
          error: error.message,
          message: "Login field",
        },
        { status: 400 }
      );
      return response;
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 5) {
      setButtonDisabled(false);
    }
  }, [user]);
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[450px] ">
          <CardHeader>
            <CardTitle>
              <div>
                <h2>Login</h2>
              </div>
            </CardTitle>
            <CardDescription>Enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="name"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={onLogin}>
              {buttonDisabled ? "Please fill the form" : "Login "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
