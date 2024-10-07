import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Badge,
  Select,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell } from 'recharts';
import { MdAttachMoney, MdAccountBalance, MdEventNote } from 'react-icons/md';
import { CSVLink } from 'react-csv'; // To enable CSV export
import Card from 'components/card/Card.js'; // Import your Card component

// Sample data for transactions
const data = [
  { name: 'Deposits', value: 8000 },
  { name: 'Withdrawals', value: 3000 },
  { name: 'Bill Payments', value: 1500 },
];

// Sample detailed transaction history
const initialTransactionHistory = [
  { id: 1, type: 'Deposit', amount: 1500, date: '2024-10-01', description: 'Paycheck from Company A', status: 'Completed' },
  { id: 2, type: 'Withdrawal', amount: 500, date: '2024-10-02', description: 'ATM Withdrawal', status: 'Completed' },
  { id: 3, type: 'Bill Payment', amount: 200, date: '2024-10-03', description: 'Electricity Bill', status: 'Completed' },
  { id: 4, type: 'Deposit', amount: 2500, date: '2024-10-04', description: 'Freelance Project Payment', status: 'Completed' },
  { id: 5, type: 'Withdrawal', amount: 1000, date: '2024-10-05', description: 'Groceries', status: 'Pending' },
  { id: 6, type: 'Bill Payment', amount: 300, date: '2024-10-06', description: 'Internet Bill', status: 'Completed' },
  { id: 7, type: 'Deposit', amount: 2000, date: '2024-10-07', description: 'Bonus Payment', status: 'Completed' },
];

// Colors for the pie chart
const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const RecentTransactions = () => {
  // Chakra Color Mode
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  // State for transaction history and filter
  const [transactionHistory, setTransactionHistory] = useState(initialTransactionHistory);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filtered transaction history based on type and search term
  const filteredTransactions = transactionHistory.filter(transaction => {
    const matchesType = filterType === 'All' || transaction.type === filterType;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Function to handle filtering
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // Function to handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to open detailed transaction modal
  const openTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  // Prepare CSV data for export
  const csvData = transactionHistory.map(transaction => ({
    ID: transaction.id,
    Type: transaction.type,
    Amount: transaction.amount,
    Date: transaction.date,
    Description: transaction.description,
    Status: transaction.status,
  }));

  return (
    <Card bg={cardBg} borderRadius="lg" boxShadow="md">
      <Box p={4}>
        <VStack spacing={4} align="start">
          <Heading size="lg">Recent Transactions 📜</Heading>
          <Text color="gray.600">Summary of your recent transactions.</Text>
          <HStack spacing={8} align="flex-start">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <VStack spacing={2} align="start">
              {data.map((transaction, index) => (
                <HStack key={transaction.name} spacing={2}>
                  <Icon
                    as={transaction.name === 'Deposits' ? MdAttachMoney : transaction.name === 'Withdrawals' ? MdAccountBalance : MdEventNote}
                    color={COLORS[index % COLORS.length]}
                  />
                  <Text fontWeight="bold">{transaction.name}:</Text>
                  <Text>${transaction.value}</Text>
                </HStack>
              ))}
            </VStack>
          </HStack>
        </VStack>
        <Divider my={6} />

        <HStack justifyContent="space-between" mb={4}>
          <Heading size="md">Transaction History</Heading>
          <HStack spacing={4}>
            <Select placeholder="Filter Type" onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Deposit">Deposits</option>
              <option value="Withdrawal">Withdrawals</option>
              <option value="Bill Payment">Bill Payments</option>
            </Select>
            <Input
              placeholder="Search by description..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <CSVLink data={csvData} filename={"transaction_history.csv"}>
              <Button colorScheme="blue">Export CSV</Button>
            </CSVLink>
          </HStack>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <Box
                key={transaction.id}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                bg={cardBg}
                _hover={{ shadow: 'lg', bg: 'gray.100' }}
                onClick={() => openTransactionDetail(transaction)}
                cursor="pointer"
              >
                <Text fontWeight="bold" color={textColor}>{transaction.type}</Text>
                <Text color="gray.600">${transaction.amount}</Text>
                <Text color="gray.400">{transaction.date}</Text>
                <Text color={transaction.type === 'Deposit' ? 'green.500' : transaction.type === 'Withdrawal' ? 'red.500' : 'blue.500'}>
                  <Badge colorScheme={transaction.type === 'Deposit' ? 'green' : transaction.type === 'Withdrawal' ? 'red' : 'blue'}>
                    {transaction.description}
                  </Badge>
                </Text>
                <Text fontSize="sm" color="gray.500">Status: {transaction.status}</Text>
              </Box>
            ))
          ) : (
            <Text>No transactions found.</Text>
          )}
        </SimpleGrid>
      </Box>

      {/* Modal for Transaction Details */}
      {selectedTransaction && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Transaction ID</FormLabel>
                <Text>{selectedTransaction.id}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <Text>{selectedTransaction.type}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Text>${selectedTransaction.amount}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Date</FormLabel>
                <Text>{selectedTransaction.date}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Text>{selectedTransaction.description}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Status</FormLabel>
                <Text>{selectedTransaction.status}</Text>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default RecentTransactions;
