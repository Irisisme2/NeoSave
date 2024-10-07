import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdSavings,
  MdSwapHoriz,
  MdReceipt,
  MdEmojiEvents,
  MdAccountBalanceWallet,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import SavingsGoals from "views/admin/SavingsGoals";
import Transactions from "views/admin/Transactions";
import Bills from "views/admin/Bills";
import Challenges from "views/admin/Challenges";
import Wallet from "views/admin/Wallet";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Savings Goals",
    layout: "/admin",
    icon: <Icon as={MdSavings} width='20px' height='20px' color='inherit' />,
    path: "/SavingsGoals",
    component: SavingsGoals,
  },
  {
    name: "Transactions",
    layout: "/admin",
    path: "/Transactions",
    icon: <Icon as={MdSwapHoriz} width='20px' height='20px' color='inherit' />,
    component: Transactions,
  },
  {
    name: "Bills",
    layout: "/admin",
    icon: <Icon as={MdReceipt} width='20px' height='20px' color='inherit' />,
    path: "/Bills",
    component: Bills,
  },
  {
    name: "Challenges",
    layout: "/admin",
    icon: <Icon as={MdEmojiEvents} width='20px' height='20px' color='inherit' />,
    path: "/Challenges",
    component: Challenges,
  },
  {
    name: "Wallet",
    layout: "/admin",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    path: "/Wallet",
    component: Wallet,
  },
];

export default routes;
