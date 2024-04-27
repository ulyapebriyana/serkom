import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import BookingForm from "@/components/booking-form";
import { auth } from "@/lib/auth";

export default async function BookingPage() {
  const session = await auth()
  if(!session){
    return redirect("/sign-in")
  }
  return (
    <section className="w-full flex items-center justify-center my-10">
      <Card className="w-full max-w-screen-md">
        <CardHeader>
          <CardTitle>Form Booking Kamar</CardTitle>
          <CardDescription>
            Silahkan lengkapi data anda untuk dapat melakukan booking kamar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookingForm />
        </CardContent>
      </Card>
    </section>
  );
}
