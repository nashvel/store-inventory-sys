import { useState, useEffect } from "react";
import SideMenu from "../../layouts/sidemenu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Type definitions
type SalesData = { month: string; sales: number };
type CategoryData = { name: string; value: number };
type LineGraphData = { day: string; amount: number };

// Static data
const salesData: SalesData[] = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4780 },
  { month: "May", sales: 6000 },
];

const categoryData: CategoryData[] = [
  { name: "Electronics", value: 450 },
  { name: "Furnitures", value: 300 },
  { name: "Clothing", value: 250 },
  { name: "Toy", value: 180 },
  { name: "Health & Beauty", value: 320 },
];

const COLORS = ["#1D4ED8", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

function Dashboard() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  const [lineGraphData, setLineGraphData] = useState<LineGraphData[]>([]);

  useEffect(() => {
    const simulatedData = {
      week: [
        { day: "Mon", amount: 1200 },
        { day: "Tue", amount: 2100 },
        { day: "Wed", amount: 1800 },
        { day: "Thu", amount: 2500 },
        { day: "Fri", amount: 3000 },
        { day: "Sat", amount: 2200 },
        { day: "Sun", amount: 2700 },
      ],
      month: [
        { day: "May 1", amount: 800 },
        { day: "May 2", amount: 1500 },
        { day: "May 3", amount: 1200 },
        { day: "May 4", amount: 1800 },
        { day: "May 5", amount: 2100 },
      ],
      year: [
        { day: "Jan", amount: 15000 },
        { day: "Feb", amount: 17000 },
        { day: "Mar", amount: 14000 },
        { day: "Apr", amount: 19000 },
        { day: "May", amount: 22000 },
      ],
    };

    setLineGraphData(simulatedData[timeframe]);
  }, [timeframe]);

  return (
    <div className="flex bg-[#f4f6f8] min-h-screen">
      <div className="w-[250px] bg-white border-r border-gray-200">
        <SideMenu />
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-500">₱120,540</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm font-medium mb-1">Orders This Month</h2>
            <p className="text-3xl font-bold text-blue-500">124</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-gray-500 text-sm font-medium mb-1">Products Low in Stock</h2>
            <p className="text-3xl font-bold text-red-500">6</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Graph with Timeframe Selector */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Revenue Trend</h3>
            <select
              className="border px-3 py-1 rounded text-sm"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as "week" | "month" | "year")}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Selling Products</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Smartphone – 320 sales</li>
              <li>• Office Chair – 280 sales</li>
              <li>• T-shirt – 190 sales</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Order #10023 – ₱540.00</li>
              <li>• Order #10022 – ₱1,240.00</li>
              <li>• Order #10021 – ₱320.00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
