import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteBtn(id: any) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios.post("/api/blogs/delete", id);
    if (response) {
      window.location.reload();
    }
  };
  return (
    <>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}
