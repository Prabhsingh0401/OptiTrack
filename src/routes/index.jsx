import { Link } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import './index.scss'
import Inventory from "../components/Inventory";

export default function IndexPage() {
  const { user } = useUser(); // Access user data

  return (
    <div className="index-page">
      <h1>Greetings, {user ? user.firstName : "Guest"}</h1>
      <h2>Dashboard</h2>
      <Inventory></Inventory>
      <h2>Analytics</h2>
    </div>
  );
}