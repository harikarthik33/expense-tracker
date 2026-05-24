"use client";

import { useEffect, useState } from "react";

import ExpenseForm from "@/components/ExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseChart from "@/components/ExpenseChart";
import Navbar from "@/components/Navbar";

export default function Home() {

  const [expenses, setExpenses] =
    useState([]);

  const [search, setSearch] =
    useState("");




  const fetchExpenses = async () => {

    try {

      const response = await fetch(
        "/api/expenses",
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      setExpenses(data);

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {

    fetchExpenses();

  }, []);




  const totalExpense =
    expenses.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );




  const filteredExpenses =
    expenses.filter((expense) =>
      expense.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );




  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">

      <Navbar />



      <div className="max-w-5xl mx-auto p-5">

        {/* TOP CARDS */}

        <div className="grid md:grid-cols-2 gap-5 mb-5">

          <div className="backdrop-blur-lg bg-white/20 border border-white/20 shadow-xl rounded-3xl p-6 text-white">

            <h2 className="text-2xl font-bold">
              Total Expense
            </h2>

            <p className="text-5xl font-bold mt-4">
              ₹ {totalExpense}
            </p>

          </div>



          <div className="backdrop-blur-lg bg-white/20 border border-white/20 shadow-xl rounded-3xl p-6 text-white">

            <h2 className="text-2xl font-bold">
              Total Transactions
            </h2>

            <p className="text-5xl font-bold mt-4">
              {expenses.length}
            </p>

          </div>

        </div>



        {/* CHART */}

        <ExpenseChart expenses={expenses} />



        {/* FORM */}

        <div className="mt-5">

          <ExpenseForm
            fetchExpenses={fetchExpenses}
          />

        </div>



        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Expense..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full mt-5 p-4 rounded-2xl border-none outline-none shadow-xl"
        />



        {/* EXPENSE LIST */}

        <div className="mt-6 grid gap-5">

          {
            filteredExpenses.length ===
            0 ? (

              <div className="bg-white rounded-3xl p-10 text-center shadow-xl">

                <h2 className="text-3xl font-bold text-gray-700">
                  No Expenses Found
                </h2>

              </div>

            ) : (

              filteredExpenses.map(
                (expense) => (

                  <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    fetchExpenses={
                      fetchExpenses
                    }
                  />

                )
              )

            )
          }

        </div>

      </div>

    </div>
  );
}