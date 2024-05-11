import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import RecentOrdersTable from "./RecentOrdersTable";

function RecentOrders() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "testing this one",
        };

        const response = await fetch("http://localhost:4000/api/trips", {
          method: "GET",
          headers: headers,
          // You can include additional options here, such as credentials, mode, etc.
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <RecentOrdersTable tripOrders={trips} />
    </Card>
  );
}

export default RecentOrders;
