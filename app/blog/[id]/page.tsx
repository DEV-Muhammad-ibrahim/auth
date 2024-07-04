"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
interface Blog {
  title: string;
  description: string;
  image: string;
}
export default function Blog() {
  const params = useParams();
  const { id } = params;
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("id", id);
        const response = await axios.post("/api/blogs/blog", {
          id: id,
        });
        // console.log("data", response.data[0]);
        setBlog(response.data[0]);
      } catch (error: any) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  console.log("blog", blog?.image);
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[550px] ">
          <CardHeader>
            <CardTitle>
              <div>
                <h2>{blog?.title}</h2>
              </div>
            </CardTitle>
            <div>
              <Image
                src={blog?.image || ""}
                width={300}
                height={200}
                alt="Picture of the author"
              ></Image>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{blog?.description}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
