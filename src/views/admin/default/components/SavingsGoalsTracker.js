import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Progress,
  SimpleGrid,
  Image,
  Select,
  Flex,
  VStack,
  Tooltip,
  Button,
  Icon,
  Input,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Card from "components/card/Card.js"; 
import NEO from "assets/img/icons/neo.png";
import USDT from "assets/img/icons/usdt.png";
import BTC from "assets/img/icons/btc.png";
import Chart from "react-apexcharts"; // Chart library

// Import goal-specific graphics
import VacationFundIcon from "assets/img/vaults/VacationFund.png";
import PC from "assets/img/vaults/PC.png";
import EmergencyFundIcon from "assets/img/vaults/EmergencyFund.png";
import HouseDownPaymentIcon from "assets/img/vaults/HouseDownPayment.png"; 
import HolidayGiftsFundIcon from "assets/img/vaults/HolidayGiftsFund.png"; 
import CarSavingsIcon from "assets/img/vaults/CarSavings.png";
import KidsCollegeFundIcon from "assets/img/vaults/KidsCollegeFund.png"; 
// Example data for savings goals
const initialSavingsGoalsData = [
  {
    title: "New Laptop",
    description: "Saving for a high-performance laptop for work and gaming.",
    targetAmount: { NEO: 1200, USDT: 1200, BTC: 0.1 },
    currentAmount: { NEO: 600, USDT: 600, BTC: 0.05 },
    deadline: "2024-12-31",
    icon: PC,
    completed: false,
    history: [],
  },
  {
    title: "Vacation Fund",
    description: "Planning a vacation to the Maldives next summer!",
    targetAmount: { NEO: 2500, USDT: 2500, BTC: 0.15 },
    currentAmount: { NEO: 1500, USDT: 1500, BTC: 0.1 },
    deadline: "2025-06-30",
    icon: VacationFundIcon,
    completed: false,
    history: [],
  },
  {
    title: "Emergency Fund",
    description: "Building a safety net for unforeseen circumstances.",
    targetAmount: { NEO: 5000, USDT: 5000, BTC: 0.3 },
    currentAmount: { NEO: 3000, USDT: 3000, BTC: 0.2 },
    deadline: "2025-01-15",
    icon: EmergencyFundIcon,
    completed: false,
    history: [],
  },
  {
    title: "House Down Payment",
    description: "Saving for a down payment on a new house.",
    targetAmount: { NEO: 30000, USDT: 30000, BTC: 1.5 },
    currentAmount: { NEO: 10000, USDT: 10000, BTC: 0.5 },
    deadline: "2026-01-01",
    icon: HouseDownPaymentIcon,
    completed: false,
    history: [],
  },
  {
    title: "Holiday Gifts Fund",
    description: "Saving for holiday gifts for friends and family.",
    targetAmount: { NEO: 1500, USDT: 1500, BTC: 0.05 },
    currentAmount: { NEO: 800, USDT: 800, BTC: 0.02 },
    deadline: "2024-12-15",
    icon: HolidayGiftsFundIcon,
    completed: false,
    history: [],
  },
  {
    title: "Car Savings",
    description: "Saving up for a new car.",
    targetAmount: { NEO: 20000, USDT: 20000, BTC: 1 },
    currentAmount: { NEO: 7000, USDT: 7000, BTC: 0.3 },
    deadline: "2025-07-30",
    icon: CarSavingsIcon,
    completed: false,
    history: [],
  },
  {
    title: "Kids College Fund",
    description: "Building a fund for my kids' college education.",
    targetAmount: { NEO: 50000, USDT: 50000, BTC: 2.5 },
    currentAmount: { NEO: 20000, USDT: 20000, BTC: 1 },
    deadline: "2030-08-31",
    icon: KidsCollegeFundIcon,
    completed: false,
    history: [],
  },
];

const currencyIcons = {
  NEO: NEO,
  USDT: USDT,
  BTC: BTC,
};

const SavingsGoalsTracker = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("NEO");
  const [savingsGoalsData, setSavingsGoalsData] = useState(initialSavingsGoalsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [newGoal, setNewGoal] = useState({ title: "", description: "", targetAmount: { NEO: 0, USDT: 0, BTC: 0 }, deadline: "", icon: NEO });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [goalIndexToEdit, setGoalIndexToEdit] = useState(null);
  const toast = useToast(); // For notifications

  // Load goals from local storage on mount
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("savingsGoals")) || initialSavingsGoalsData;
    setSavingsGoalsData(savedGoals);
  }, []);

  // Save goals to local storage
  useEffect(() => {
    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoalsData));
  }, [savingsGoalsData]);

  const handleEdit = (goalIndex, type) => {
    const newAmount = prompt(`Enter new ${type} amount for ${savingsGoalsData[goalIndex].title}:`);
    if (newAmount) {
      const amount = parseFloat(newAmount);
      if (!isNaN(amount)) {
        const updatedGoals = [...savingsGoalsData];
        if (type === "current") {
          updatedGoals[goalIndex].currentAmount[selectedCurrency] = amount;
          updatedGoals[goalIndex].history.push(`Current amount changed to ${amount} ${selectedCurrency}`);
        } else {
          updatedGoals[goalIndex].targetAmount[selectedCurrency] = amount;
          updatedGoals[goalIndex].history.push(`Target amount changed to ${amount} ${selectedCurrency}`);
        }
        setSavingsGoalsData(updatedGoals);
        toast({ title: "Goal updated!", status: "success", duration: 3000 });
      } else {
        toast({ title: "Invalid amount!", status: "error", duration: 3000 });
      }
    }
  };

  const handleRemove = (goalIndex) => {
    const updatedGoals = savingsGoalsData.filter((_, index) => index !== goalIndex);
    setSavingsGoalsData(updatedGoals);
    toast({ title: "Goal removed!", status: "success", duration: 3000 });
  };

  const handleToggleComplete = (goalIndex) => {
    const updatedGoals = [...savingsGoalsData];
    updatedGoals[goalIndex].completed = !updatedGoals[goalIndex].completed;
    setSavingsGoalsData(updatedGoals);
    toast({ title: updatedGoals[goalIndex].completed ? "Goal marked as completed!" : "Goal marked as not completed.", status: "info", duration: 3000 });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount[selectedCurrency] > 0) {
      const newGoalData = {
        ...newGoal,
        currentAmount: { NEO: 0, USDT: 0, BTC: 0 },
        completed: false,
        history: [],
      };
      setSavingsGoalsData([...savingsGoalsData, newGoalData]);
      toast({ title: "Goal added!", status: "success", duration: 3000 });
      setNewGoal({ title: "", description: "", targetAmount: { NEO: 0, USDT: 0, BTC: 0 }, deadline: "", icon: NEO });
      onClose();
    } else {
      toast({ title: "Please fill in all fields correctly.", status: "warning", duration: 3000 });
    }
  };

  // Chart data preparation
  const chartData = {
    series: savingsGoalsData.map(goal => ({
      name: goal.title,
      data: [goal.currentAmount[selectedCurrency], goal.targetAmount[selectedCurrency]]
    })),
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: ['Current', 'Target'],
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      }
    }
  };

  return (
    <Card p={4} boxShadow="md"  bg="white">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Savings Goals Tracker 🎯
      </Text>

      {/* Alert Message */}
      {alertMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}

      {/* Search Bar */}
      <Input
        placeholder="Search goals..."
        mb={4}
        onChange={handleSearch}
      />

      {/* Currency Selection */}
      <Select
        placeholder="Select Currency"
        mb={4}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      >
        <option value="NEO">NEO</option>
        <option value="USDT">USDT</option>
        <option value="BTC">BTC</option>
      </Select>

      {/* Add New Goal Button */}
      <Button colorScheme="teal" onClick={onOpen} mb={4}>
        Add New Goal
      </Button>

      {/* Chart for visualizing goal progress */}
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
        {savingsGoalsData
          .filter(goal => goal.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((goal, index) => {
            const progressPercentage = (goal.currentAmount[selectedCurrency] / goal.targetAmount[selectedCurrency]) * 100;

            return (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" boxShadow="sm" position="relative">
                <Flex align="center" mb={4}>
                  <Image
                    src={goal.icon}
                    alt={`${goal.title} icon`}
                    boxSize="160px"
                    mr={4}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="lg" fontWeight="semibold">
                      {goal.title}
                      {goal.completed && <Icon as={CheckIcon} color="green.500" ml={2} />}
                    </Text>
                    <Text fontSize="sm">{goal.description}</Text>
                    <Text fontSize="sm">
                      Target Amount:
                      <Flex align="center" justify="space-between">
                        <Text ml={1} display="inline">
                          {goal.targetAmount[selectedCurrency]}
                        </Text>
                        <Image
                          src={currencyIcons[selectedCurrency]}
                          alt={`${selectedCurrency} icon`}
                          boxSize="20px"
                          ml={1}
                        />
                      </Flex>
                    </Text>
                    <Text fontSize="sm">
                      Current Amount:
                      <Flex align="center" justify="space-between">
                        <Text ml={1} display="inline">
                          {goal.currentAmount[selectedCurrency]}
                        </Text>
                        <Image
                          src={currencyIcons[selectedCurrency]}
                          alt={`${selectedCurrency} icon`}
                          boxSize="20px"
                          ml={1}
                        />
                      </Flex>
                    </Text>
                    <Text fontSize="sm">Deadline: {goal.deadline}</Text>
                  </VStack>
                </Flex>
                <Progress
                  value={progressPercentage}
                  colorScheme={goal.completed ? "green" : "blue"}
                  mb={2}
                />
                <Flex justify="space-between">
                  <Tooltip label={goal.completed ? "Mark as Incomplete" : "Mark as Complete"}>
                    <Button
                      size="sm"
                      onClick={() => handleToggleComplete(index)}
                      colorScheme={goal.completed ? "red" : "green"}
                    >
                      {goal.completed ? "Undo" : "Complete"}
                    </Button>
                  </Tooltip>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(index, "current")}
                    colorScheme="blue"
                  >
                    Edit Current
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(index, "target")}
                    colorScheme="yellow"
                  >
                    Edit Target
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleRemove(index)}
                    colorScheme="red"
                  >
                    <CloseIcon />
                  </Button>
                </Flex>
              </Box>
            );
          })}
      </SimpleGrid>

      {/* Modal for Adding New Goal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Savings Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Target Amount ({selectedCurrency})</FormLabel>
              <Input
                type="number"
                value={newGoal.targetAmount[selectedCurrency]}
                onChange={(e) => setNewGoal({
                  ...newGoal,
                  targetAmount: { ...newGoal.targetAmount, [selectedCurrency]: parseFloat(e.target.value) },
                })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddGoal}>Add Goal</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default SavingsGoalsTracker;
