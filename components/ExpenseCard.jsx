"use client";

import { useState } from "react";

const ExpenseCard = ({
  expense,
  fetchExpenses,
}) => {

  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] =
    useState(expense.title);

  const [amount, setAmount] =
    useState(expense.amount);

  const [category, setCategory] =
    useState(expense.category);




  const deleteExpense = async (
    id
  ) => {

    await fetch(
      `/api/expenses?id=${id}`,
      {
        method: "DELETE",
      }
    );

    fetchExpenses();
  };




  const updateExpense =
    async () => {

      await fetch("/api/expenses", {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          id: expense._id,
          title,
          amount,
          category,
        }),
      });

      setIsEditing(false);

      fetchExpenses();
    };




  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/20 shadow-xl rounded-3xl p-6 text-white hover:scale-[1.02] transition-all">

      {
        isEditing ? (

          <div className="flex flex-col gap-3">

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="p-3 rounded-xl text-black"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="p-3 rounded-xl text-black"
            />

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="p-3 rounded-xl text-black"
            />

            <button
              onClick={updateExpense}
              className="bg-green-500 p-3 rounded-xl"
            >
              Save
            </button>

          </div>

        ) : (

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                {expense.title}
              </h2>

              <p className="mt-2 text-lg">
                {expense.category}
              </p>

            </div>

            <div className="text-right">

              <h3 className="text-3xl font-bold">
                ₹ {expense.amount}
              </h3>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={() =>
                    setIsEditing(
                      true
                    )
                  }
                  className="bg-blue-500 px-5 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteExpense(
                      expense._id
                    )
                  }
                  className="bg-red-500 px-5 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
};

export default ExpenseCard;