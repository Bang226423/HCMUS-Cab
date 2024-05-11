import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitle from "@/components/PageTitle";
import MenuItem from "@mui/material/MenuItem";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleMapsAutocomplete from "@/components/GoogleMapsAutocomplete";

import { useRouter } from "next/router";
import { fetchDirection } from "pages/api/GoogleMapsApi";

import {
  createCustomer,
  createTrip,
  fetchCalculateFare,
  fetchCustomerInfo,
} from "pages/api/BackendApi";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Snackbar,
} from "@mui/material";

import { useEffect, useState } from "react";

const carTypes = [
  {
    value: "1",
    label: "4-Seat",
  },
  {
    value: "2",
    label: "7-Seat",
  },
];

const serviceTypes = [
  {
    value: "1",
    label: "Regular",
  },
  {
    value: "2",
    label: "VIP",
  },
];

function CreateTrip() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [tripFare, setTripFare] = useState(null);
  const [tripDistance, setTripDistance] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [tripId, setTripId] = useState(null);
  const router = useRouter();

  const handleLocationSelect = (location, isDestination) => {
    console.log("handleLocationSelect called");
    if (isDestination) {
      setDestinationLocation(location);
    } else {
      setPickupLocation(location);
    }

    console.log("Pickup Location:", pickupLocation);
    console.log("Dropoff Location:", destinationLocation);
  };

  const handlePhoneNumberChange = async (event) => {
    const phoneNumber = event.target.value;
    setCustomerPhoneNumber(phoneNumber);

    try {
      const customerInfo = await fetchCustomerInfo(phoneNumber);

      if (!customerInfo) {
        setCustomerName("");
        setCustomerId(null);
      }

      setCustomerName(customerInfo["name"]);
      setCustomerId(customerInfo["id"]);
      console.log("Customer Info:", customerInfo);
      console.log("Customer Name:", customerName);
      console.log("Customer ID:", customerId);
    } catch (error) {
      console.log("Error fetching customer information:", error);
    }
  };

  useEffect(() => {
    console.log("Pickup Location:", pickupLocation);
  }, [pickupLocation]);

  useEffect(() => {
    console.log("Dropoff Location:", destinationLocation);
  }, [destinationLocation]);

  const [tripType, setTripType] = useState();
  const handleChange = (event) => {
    setTripType(event.target.value);
  };

  const [tripServiceType, setValue] = useState();
  const handleChangeServiceType = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      fetchDirection(pickupLocation, destinationLocation)
        .then((distance) => {
          setTripDistance(distance);
        })
        .catch((error) => {
          console.error("Error fetching directions:", error);
        });
    }
  }, [pickupLocation, destinationLocation]);

  useEffect(() => {
    if (pickupLocation && destinationLocation && tripType && tripServiceType) {
      fetchCalculateFare(tripDistance, tripType, tripServiceType)
        .then((fare) => {
          setTripFare(fare);
        })
        .catch((error) => {
          console.error("Error calculating trip fare:", error);
        });
    }
  });

  const handleCreateTrip = async () => {
    try {
      if (!customerId) {
        const customer = await createCustomer(
          customerPhoneNumber,
          customerName
        );
        setCustomerId(customer["id"]);
        console.log("Creating a new customer ID");
      }

      // Make API call to create a trip
      const trip = await createTrip(
        pickupLocation,
        destinationLocation,
        customerId,
        tripServiceType,
        tripDistance,
        tripFare
      );

      console.log("Trip created successfully:", trip);

      setTripId(trip.id);
      setPopupVisible(true);

      setTimeout(() => {
        router.push("/management/transactions");
      }, 3000);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Head>
        <title>CreateTrip - Components</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Tạo chuyến đi mới"
          subHeading="Creating a new trip for whose does not have the HCMUSCab app"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Customer Information" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Customer Phone Number"
                      name="customerPhoneNumber"
                      defaultValue=""
                      type="search"
                      onChange={handlePhoneNumberChange}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Full Name"
                      defaultValue=""
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Trip Information" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "102ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <GoogleMapsAutocomplete
                      label="Chọn điểm đón"
                      onPlaceSelect={(location) =>
                        handleLocationSelect(location, false)
                      }
                    />
                  </div>
                  <div>
                    <GoogleMapsAutocomplete
                      label="Chọn điểm tới"
                      onPlaceSelect={(location) =>
                        handleLocationSelect(location, true)
                      }
                    />
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Car Type & Payment Type" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Car Type"
                      value={tripType}
                      onChange={handleChange}
                    >
                      {carTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Service Type"
                      value={tripServiceType}
                      onChange={handleChangeServiceType}
                    >
                      {serviceTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  {tripServiceType === "2" && ( // Only display for VIP serviceType
                    <div>
                      <TextField
                        id="scheduledTime"
                        label="Pickup Time"
                        type="search"
                      />
                    </div>
                  )}
                  {tripDistance && tripFare && (
                    <div>
                      <p>
                        Khoảng cách: {(tripDistance / 1000).toFixed(2)} KM, Giá
                        tiền: {tripFare.toLocaleString()} VND
                      </p>
                    </div>
                  )}
                  <div>
                    <Button
                      sx={{ margin: 1 }}
                      variant="contained"
                      color="primary"
                      onClick={handleCreateTrip}
                    >
                      Create
                    </Button>
                  </div>
                  {popupVisible && (
                    <Snackbar
                      open={popupVisible}
                      autoHideDuration={6000}
                      onClose={closePopup}
                      message="Tạo chuyến đi thành công!"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CreateTrip.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreateTrip;
