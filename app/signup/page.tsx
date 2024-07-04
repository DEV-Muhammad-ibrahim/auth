"use client";
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

import { useState, useEffect } from "react";
import { NextResponse } from "next/server";
import axios from "axios";

import { useRouter } from "next/navigation";
interface IUser {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      router.push("/login");
    } catch (error: any) {
      const response = NextResponse.json(
        {
          error: error.message,
          message: "Signup field",
        },
        { status: 400 }
      );
      return response;
    }
  };
  useEffect(() => {
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 5
    ) {
      setButtonDisabled(false);
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>
              <div>
                <h2>{loading ? "Processing" : "Signup"}</h2>
              </div>
            </CardTitle>

            <CardDescription>Enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
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
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={onSignup}>
              {buttonDisabled ? "Please fill the form" : "Sign Up "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
