import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <h1 className="mb-2">Blogs</h1>
      <div className="flex justify-between space-x-4">
        <Button>Create Blogs</Button>
        <Button variant="outline">View your blogs</Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
