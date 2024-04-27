"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { useState, useEffect, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveData } from "@/lib/actions";
import Link from "next/link";

const formSchema = z.object({
  name: z
    .string({ required_error: "Data harus diisi" })
    .max(30, "Maksimal 30 karakter"),
  gender: z.enum(["male", "famale"], {
    required_error: "Jenis kelamin harus diisi",
  }),
  identityNumber: z
    .string({ required_error: "Data harus diisi" })
    .length(16, "Isian salah!. Data harus 16 digit."),
  roomType: z.string({
    required_error: "Tipe kamar harus dipilih",
  }),
  price: z.number(),
  bookingDate: z.date({
    required_error: "Tanggal harus dipilih",
  }),
  stayDuration: z.coerce.number({ required_error: "Data harus diisi" }),
  breakfast: z.boolean().default(false).optional(),
  paymentAmount: z.number(),
});

const BookingForm = () => {
  const [changedPrice, setPrice] = useState(0);
  const [changedRoomType, setRoomType] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Ketika nilai tipe kamar berubah, perbarui harga sesuai dengan pilihan
    if (changedRoomType === "Standard") {
      setPrice(1000000);
    } else if (changedRoomType === "Deluxe") {
      setPrice(2000000);
    } else if (changedRoomType === "Family") {
      setPrice(3000000);
    }
  }, [changedRoomType]);

  const handleRoomTypeChange = (value: any) => {
    setRoomType(value);
  };

  const handleTotalChange = () => {
    const { roomType, stayDuration, breakfast } = form.getValues();

    let totalBayar = 0;
    if (roomType === "Standard") {
      totalBayar = 1000000 * stayDuration;
    } else if (roomType === "Deluxe") {
      totalBayar = 2000000 * stayDuration;
    } else if (roomType === "Family") {
      totalBayar = 3000000 * stayDuration;
    }
    if (stayDuration >= 3) {
      totalBayar *= 0.9;
    }
    if (breakfast) {
      const totalBreakfast = 80000 * stayDuration;
      totalBayar = totalBayar + totalBreakfast;
    }

    setTotalAmount(totalBayar);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      identityNumber: "",
      roomType: "",
      price: 0,
      stayDuration: 1,
      breakfast: false,
      paymentAmount: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(() => {
      const valuesWithTotal = {
        ...values,
        totalAmount: totalAmount, // Gunakan nilai total dari state
      };
      saveData(valuesWithTotal);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Laki-laki</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="famale" />
                    </FormControl>
                    <FormLabel className="font-normal">Perempuan</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identityNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Identitas</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Kamar</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleRoomTypeChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe kamar " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input {...field} disabled value={changedPrice} />
              </FormControl>
              <FormDescription>
                Pilih type kamar untuk menampikan harga
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Menginap</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stayDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durasi Menginap (Hari)</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="breakfast"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Termasuk breakfast</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Bayar</FormLabel>
              <FormControl>
                <Input {...field} readOnly value={totalAmount} />
              </FormControl>
              <FormDescription>
                Isi semua data untuk menampilkan harga
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-6">
          <Button
            type="button"
            onClick={handleTotalChange}
            className="w-1/3"
            disabled={isPending}
            variant={"outline"}
          >
            Hitung Tagihan
          </Button>
          <Button type="submit" className="w-1/3" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </div>
            ) : (
              "Simpan"
            )}
          </Button>
          <Button asChild variant={"destructive"} className="w-1/3" disabled={isPending}>
          <Link href="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
