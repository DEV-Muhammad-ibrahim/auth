import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Blogs() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        <Card className="flex flex-col justify-between">
          {}
          <CardHeader className="flex-row gap-4 items-center">
            <div>
              <CardTitle>Aloo</CardTitle>
              <CardDescription>20 mins to cook</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ullam
              minus ipsa aspernatur dicta beatae temporibus quidem vel quibusdam
              voluptatem soluta maxime itaque ipsam a omnis necessitatibus
              optio, et nobis?
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>View Recipe</Button>

            {/* {recipe.vegan && <Badge variant="secondary">Vegan!!</Badge>} */}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
