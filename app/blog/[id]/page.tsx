"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("id", id);
        const response = await axios.post("/api/blogs/one", id);
        console.log("data", response);
      } catch (error: any) {
        console.log("error", error);
      }
    };
    fetchData();
  });

  return (
    <>
      <div>
        <div>hello world</div>
      </div>
    </>
  );
}
