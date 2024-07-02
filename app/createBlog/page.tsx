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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
  title: string;
  description: string;
  image: File | null;
}
export default function CreateBlog() {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog>({
    title: "",
    description: "",
    image: null,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setBlog((prev) => ({ ...prev, [name]: value }));
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBlog((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  useEffect(() => {
    if (
      blog.title.length > 0 &&
      blog.description.length > 0 &&
      blog.image != null
    ) {
      setButtonDisabled(false);
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    if (blog.image) {
      formData.append("image", blog.image);
    }

    try {
      console.log(formData);
      const response = await axios.post("/api/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        // Redirect or update the UI after successful creation
        router.push("/blogs");
      } else {
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("An error occurred while creating the blog:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>
              <div>
                <h2>{loading ? "Creating" : "Create Blog"}</h2>
              </div>
            </CardTitle>

            <CardDescription>Enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Title</Label>
                  <Input
                    placeholder="Title"
                    value={blog.title}
                    onChange={(e) =>
                      setBlog({ ...blog, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    value={blog.description}
                    onChange={(e) =>
                      setBlog({ ...blog, description: e.target.value })
                    }
                    required
                  ></Textarea>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Image</Label>
                  <Input type="file" onChange={handleFileChange} required />
                </div>
                <div className="flex flex-col space-y-1.5"></div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit}>
              {buttonDisabled ? "Please fill the form" : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
