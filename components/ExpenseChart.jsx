"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
];

const ExpenseChart = ({
  expenses,
}) => {

  const categoryData = [];



  expenses.forEach((expense) => {

    const existing =
      categoryData.find(
        (item) =>
          item.name ===
          expense.category
      );



    if (existing) {

      existing.value += Number(
        expense.amount
      );

    } else {

      categoryData.push({
        name: expense.category,
        value: Number(
          expense.amount
        ),
      });
    }
  });




  return (
    <div className="bg-white p-5 rounded-xl shadow mb-5">

      <h2 className="text-2xl font-bold mb-5">
        Expense Analytics
      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >

              {
                categoryData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ExpenseChart;