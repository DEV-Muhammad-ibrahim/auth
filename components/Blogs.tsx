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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
interface blog {
  _id: string;
  title: string;
  description: string;
  image: string;
}
export default function Blogs() {
  const [blogs, setBlog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/blogs/read");
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {blogs.map((item: blog) => (
          <Card className="flex flex-col justify-between" key={item._id}>
            {}
            <CardHeader className="flex-row gap-4 items-center">
              <div>
                <Avatar>
                  <AvatarImage src={item.image} />
                </Avatar>
              </div>
              <div>
                <CardTitle>{item.title}</CardTitle>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Button>
                <Link href={`/blog/${item._id}`}>View Blog</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
