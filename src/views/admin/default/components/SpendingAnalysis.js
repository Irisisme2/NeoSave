import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  Button,
  useColorModeValue,
  Select,
  HStack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import Card from "components/card/Card.js"; // Import your custom Card component

// Sample data for expense categories
const expenseData = [
  { name: "Groceries", value: 400 },
  { name: "Entertainment", value: 300 },
  { name: "Utilities", value: 200 },
  { name: "Transport", value: 150 },
  { name: "Dining Out", value: 250 },
  { name: "Healthcare", value: 200 },
  { name: "Shopping", value: 100 },
  { name: "Rent", value: 900 },
  { name: "Insurance", value: 300 },
];

// Sample data for monthly budget comparison
const budgetData = [
  { name: "Budget", value: 1500 },
  { name: "Actual Spending", value: 1450 },
];

// Sample data for spending trends
const spendingTrendsData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1300 },
  { month: "Mar", amount: 1400 },
  { month: "Apr", amount: 1500 },
  { month: "May", amount: 1250 },
  { month: "Jun", amount: 1600 },
];

// Sample transaction data for detailed view
const transactionsData = [
  { date: "2024-06-01", category: "Groceries", amount: 150 },
  { date: "2024-06-02", category: "Entertainment", amount: 100 },
  { date: "2024-06-03", category: "Utilities", amount: 50 },
  { date: "2024-06-04", category: "Dining Out", amount: 70 },
  { date: "2024-06-05", category: "Transport", amount: 30 },
  { date: "2024-06-06", category: "Healthcare", amount: 80 },
];

// Define colors for pie chart
const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF5722", "#8BC34A", "#FFC107"];

const SpendingAnalysis = () => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [budgetLimit, setBudgetLimit] = useState(1500);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filteredExpenseData, setFilteredExpenseData] = useState(expenseData);
  const [filteredSpendingTrendsData, setFilteredSpendingTrendsData] = useState(spendingTrendsData);

  // Filter transactions based on selected month and category
  useEffect(() => {
    let updatedTransactions = transactionsData;

    // Apply category filter
    if (selectedCategory !== "All") {
      updatedTransactions = updatedTransactions.filter(
        (transaction) => transaction.category === selectedCategory
      );
    }

    setFilteredTransactions(updatedTransactions);

    // Update the pie chart data based on selected category
    const updatedExpenseData = expenseData.map((category) => {
      const total = updatedTransactions
        .filter((transaction) => transaction.category === category.name)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      return { name: category.name, value: total };
    });

    setFilteredExpenseData(updatedExpenseData);
    
    // Update the spending trends chart (dummy data for simplicity)
    setFilteredSpendingTrendsData(spendingTrendsData.map(trend => ({
      month: trend.month,
      amount: selectedMonth === "All" ? trend.amount : trend.amount * 0.9 // Example adjustment
    })));

  }, [selectedCategory, selectedMonth]);

  const handleBudgetChange = (e) => {
    setBudgetLimit(e.target.value);
  };

  const handleExpenseChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const addExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const updatedTransactions = [
        ...filteredTransactions,
        { date: new Date().toISOString().split("T")[0], ...newExpense },
      ];
      setFilteredTransactions(updatedTransactions); // Update transactions
      setNewExpense({ category: "", amount: "" }); // Reset fields
    }
  };

  const actualSpending = budgetData[1].value; // Get actual spending value

  return (
    <Card p={4} boxShadow="md" bg={useColorModeValue("white", "gray.700")} width="800px">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Spending Analysis 📊
      </Text>

      <HStack spacing={4} mb={4}>
        <Select placeholder="Select Month" onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="All">All</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
        </Select>
        <Input 
          type="number" 
          value={budgetLimit} 
          onChange={handleBudgetChange} 
          placeholder="Set Budget Limit"
          width="150px"
        />
        <Button colorScheme="teal">Apply</Button>
      </HStack>

      <HStack spacing={4} mb={4}>
        <Select placeholder="Select Category" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          {expenseData.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </Select>
        <Button onClick={() => setFilteredTransactions(transactionsData)}>Reset Filters</Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {/* Pie Chart for Expense Categories */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Expense Categories Breakdown
          </Text>
          <PieChart width={400} height={400}>
            <Pie
              data={filteredExpenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {filteredExpenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip
              formatter={(value, name) => [`$${value}`, name]}
              labelFormatter={(name) => `${name} spending`}
            />
            <Legend />
          </PieChart>
        </Box>

        {/* Bar Chart for Monthly Budget Comparison */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Monthly Budget vs. Actual Spending
          </Text>
          <BarChart width={400} height={300} data={budgetData}>
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip
              formatter={(value) => [`$${value}`, "Amount"]}
            />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
          {/* Visual indicator for exceeding budget */}
          <Text mt={2} fontWeight="bold">
            {actualSpending > budgetLimit ? "⚠️ Exceeded Budget!" : "✅ Within Budget"}
          </Text>
        </Box>
      </SimpleGrid>

      {/* Line Chart for Spending Trends */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Spending Trends Over Last 6 Months
        </Text>
        <LineChart width={600} height={300} data={filteredSpendingTrendsData}>
          <XAxis dataKey="month" />
          <YAxis />
          <RechartsTooltip
            formatter={(value) => [`$${value}`, "Spent"]}
          />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </Box>

      {/* Detailed Transaction Table */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Recent Transactions
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Category</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTransactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.category}</Td>
                <Td>${transaction.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add New Expense */}
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          Add New Expense
        </Text>
        <HStack spacing={4}>
          <Select name="category" placeholder="Select Category" onChange={handleExpenseChange}>
            {expenseData.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </Select>
          <Input 
            name="amount" 
            type="number" 
            placeholder="Amount" 
            value={newExpense.amount} 
            onChange={handleExpenseChange} 
          />
          <Button onClick={addExpense} colorScheme="teal">
            Add Expense
          </Button>
        </HStack>
      </Box>
    </Card>
  );
};

export default SpendingAnalysis;
