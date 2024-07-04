"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { NextResponse } from "next/server";
import axios from "axios";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
export default function LogoutBtn() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      window.location.reload();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </>
  );
}
