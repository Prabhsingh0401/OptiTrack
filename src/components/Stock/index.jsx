import { Link } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import './index.scss'
import Inventory from "../Inventory";
import Dashboard from '../../assets/Dashboard icon.png';
import Analytics from '../../assets/Analytics icon.png'



export default function Inventorypage() {
  const { user } = useUser(); // Access user data

  return (
    <div className="index-page">
      <h1>Greetings, {user ? user.firstName : "Guest"}</h1>
      <h2>Dashboard <img src={Dashboard}></img></h2>
      <Inventory></Inventory>
      <h2>Analytics<img src={Analytics}></img></h2>
    </div>
  );
}