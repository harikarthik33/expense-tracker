import { NextResponse } from "next/server";

import connectMongo from "@/utils/connectMongo";
import Expense from "@/models/Expense";



// GET ALL EXPENSES
export async function GET() {

  try {

    await connectMongo();

    const expenses =
      await Expense.find().sort({
        createdAt: -1,
      });

    return NextResponse.json(expenses);

  } catch (error) {

    return NextResponse.json({
      message: error.message,
    });
  }
}



// ADD EXPENSE
export async function POST(request) {

  try {

    await connectMongo();

    const body = await request.json();

    const expense =
      await Expense.create(body);

    return NextResponse.json(expense);

  } catch (error) {

    return NextResponse.json({
      message: error.message,
    });
  }
}



// DELETE EXPENSE
export async function DELETE(request) {

  try {

    await connectMongo();

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    await Expense.findByIdAndDelete(id);

    return NextResponse.json({
      message:
        "Expense Deleted Successfully",
    });

  } catch (error) {

    return NextResponse.json({
      message: error.message,
    });
  }
}



// UPDATE EXPENSE
export async function PUT(request) {

  try {

    await connectMongo();

    const body = await request.json();

    const updatedExpense =
      await Expense.findByIdAndUpdate(
        body.id,
        {
          title: body.title,
          amount: body.amount,
          category: body.category,
        },
        {
          new: true,
        }
      );

    return NextResponse.json(
      updatedExpense
    );

  } catch (error) {

    return NextResponse.json({
      message: error.message,
    });
  }
}