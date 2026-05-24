"use client";

import { useState } from "react";

const ExpenseForm = ({
  fetchExpenses,
}) => {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");




  const addExpense = async (
    e
  ) => {

    e.preventDefault();

    await fetch("/api/expenses", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        title,
        amount,
        category,
      }),
    });

    setTitle("");
    setAmount("");
    setCategory("");

    fetchExpenses();
  };




  return (
    <form
      onSubmit={addExpense}
      className="backdrop-blur-lg bg-white/20 border border-white/20 shadow-xl rounded-3xl p-6 flex flex-col gap-4"
    >

      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="p-4 rounded-2xl outline-none"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="p-4 rounded-2xl outline-none"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="p-4 rounded-2xl outline-none"
      />

      <button
        type="submit"
        className="bg-black hover:bg-gray-800 transition-all text-white p-4 rounded-2xl text-lg font-semibold"
      >
        Add Expense
      </button>

    </form>
  );
};

export default ExpenseForm;