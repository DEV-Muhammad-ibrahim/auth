"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const handleSubmit = async () => {};

const LoginForm = () => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password" type="password" />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
