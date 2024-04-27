"use server"

import prisma from "@/lib/db"
import { redirect } from "next/navigation";
import { z } from "zod";
import moment from "moment"

export const saveData = async (values: any) => {
    let discount
    if (values.stayDuration >= 3) {
        discount = "10%"
    }
    const data = await prisma.customer.create({
        data: {
            name: values.name,
            identityNumber: values.identityNumber,
            gender: values.gender,
            roomType: values.roomType,
            stayDuration: `${values.stayDuration} Hari`,
            discount,
            paymentAmount: values.totalAmount,
        }
    })
    return redirect('/')
}

export const getCustomersPerMonth = async () => {
    const months: { name: string; total: number }[] = [];

    for (let i = 0; i < 12; i++) {
        const startDate = moment().subtract(i, 'months').startOf('month').toISOString();
        const endDate = moment().subtract(i, 'months').endOf('month').toISOString();

        // Ambil semua pelanggan yang dibuat dalam rentang waktu tertentu
        const customers = await prisma.customer.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        // Hitung total pelanggan yang dibuat dalam rentang waktu tersebut
        const totalCustomers = customers.length;

        months.push({
            name: moment().subtract(i, 'months').format('MMM'),
            total: totalCustomers,
        });
    }

    return months;
}