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

export default function CardWithForm() {
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
            <LoginForm />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
