import React, { useState } from "react";

import {
  SimpleGrid,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import NEO from "assets/img/icons/neo.png";
import USDT from "assets/img/icons/usdt.png";
import BTC from "assets/img/icons/btc.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import RecentTransactions from "views/admin/default/components/RecentTransactions";
import SavingsGoalsTracker from "views/admin/default/components/SavingsGoalsTracker";
import SpendingAnalysis from "views/admin/default/components/SpendingAnalysis";
import IconBox from "components/icons/IconBox";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // State to manage the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState("NEO");

  // Define balance data for each currency
  const currencyData = {
    NEO: {
      totalSavings: "$12,450",
      currentBalance: "$4,000",
      icon: NEO,
    },
    USDT: {
      totalSavings: "$15,300",
      currentBalance: "$2,500",
      icon: USDT,
    },
    BTC: {
      totalSavings: "$8,750",
      currentBalance: "$1,000",
      icon: BTC,
    },
  };


  // Handle currency change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const { totalSavings, currentBalance, icon } = currencyData[selectedCurrency];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
   <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
      gap="20px"
      mb="20px"
    >
      <div>
      
      <Tabs onChange={(index) => setSelectedCurrency(Object.keys(currencyData)[index])} variant="enclosed">
        <TabList>
          <Tab>NEO</Tab>
          <Tab>USDT</Tab>
          <Tab>BTC</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid  columns={{ base: 1, md: 2 }} gap="20px" mb="20px" width="400px">
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={icon} alt="NEO icon" style={{ width: "32px", height: "32px" }} />}
                  />
                }
                name="Total Savings"
                value={totalSavings}
                description="Saved across multiple goals."
              />
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={icon} alt="NEO icon" style={{ width: "32px", height: "32px" }} />}
                  />
                }
                name="Current Balance"
                value={currentBalance}
                description="In Wallet."
              />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
          <SimpleGrid  columns={{ base: 1, md: 2 }} gap="20px" mb="20px" width="400px">
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={currencyData.USDT.icon} alt="USDT icon" style={{ width: "32px", height: "32px" }} />}
                  />
                }
                name="Total Savings"
                value={currencyData.USDT.totalSavings}
                description="Saved across multiple goals."
              />
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={currencyData.USDT.icon} alt="USDT icon" style={{ width: "32px", height: "32px" }} />}
                  />
                }
                name="Current Balance"
                value={currencyData.USDT.currentBalance}
                description="In Wallet."
              />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
          <SimpleGrid  columns={{ base: 1, md: 2 }} gap="20px" mb="20px" width="400px">
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={currencyData.BTC.icon} alt="BTC icon" style={{ width: "52px", height: "32px" }} />}
                  />
                }
                name="Total Savings"
                value={currencyData.BTC.totalSavings}
                description="Saved across multiple goals."
              />
              <MiniStatistics
                startContent={
                  <IconBox
                    w="56px"
                    h="56px"
                    bg="gray.100"
                    icon={<img src={currencyData.BTC.icon} alt="BTC icon" style={{ width: "52px", height: "32px" }} />}
                  />
                }
                name="Current Balance"
                value={currencyData.BTC.currentBalance}
                description="In Wallet."
              />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </div>
          </SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <SavingsGoalsTracker />
        <SpendingAnalysis />
      </SimpleGrid>
      <SimpleGrid  gap="20px" mb="20px">
        <RecentTransactions />
      </SimpleGrid>
    </Box>
  );
}
