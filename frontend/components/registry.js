import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import Table from "./Table";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Chart from "./Chart";
// (Add Modal later)

export const componentRegistry = {
  Button,
  Card,
  Input,
  Table,
  Sidebar,
  Navbar,
  Chart
};

export const allowedComponentNames = Object.keys(componentRegistry);
