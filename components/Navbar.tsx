import { Button } from "./ui/button";
import Link from "next/link";
import { getDataFromToken } from "@/helpers/getData";
import { cookies } from "next/headers";
const Navbar = () => {
  const cookiesObj = cookies();
  const token = cookiesObj.get("token");
  if (token) {
    console.log("token", token.value);
  }
  const tokenValue = token?.value;

  return (
    <nav>
      <h1 className="mb-2">Blogs</h1>
      <div className="flex justify-between space-x-4">
        {tokenValue !== "" ? (
          <>
            <Button>
              <Link href="/createBlog">Create Blogs</Link>
            </Button>
            <Button variant="outline">
              <Link href="blogs">View your blogs</Link>
            </Button>
            <Button variant="destructive">Logout</Button>
          </>
        ) : (
          <>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
