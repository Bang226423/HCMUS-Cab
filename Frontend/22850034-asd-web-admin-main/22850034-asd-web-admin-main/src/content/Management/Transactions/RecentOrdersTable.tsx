import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";

import Label from "@/components/Label";
import { Trip, TripStatus } from "@/models/trip";

interface RecentOrdersTableProps {
  className?: string;
  tripOrders: Trip[];
}

interface Filters {
  status?: TripStatus;
}

const getStatusLabel = (tripStatus: TripStatus): JSX.Element => {
  const map = {
    0: {
      text: "Submitted",
      color: "warning",
    },
    1: {
      text: "warning",
      color: "success",
    },
    2: {
      text: "Arrived",
      color: "warning",
    },
    3: {
      text: "Driving",
      color: "warning",
    },
    4: {
      text: "Completed",
      color: "success",
    },
    5: {
      text: "Cancelled",
      color: "error",
    },
  };

  const { text, color }: any = map[tripStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (tripOrders: Trip[], filters: Filters): Trip[] => {
  return tripOrders.filter((tripOrder) => {
    let matches = true;

    if (filters.status && tripOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  tripOrders: Trip[],
  page: number,
  limit: number
): Trip[] => {
  return tripOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ tripOrders }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "submitted",
      name: "Submitted",
    },
    {
      id: "arrived",
      name: "Arrivied",
    },
    {
      id: "driving",
      name: "Driving",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "cancelled",
      name: "Cancelled",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTripOrder = applyFilters(tripOrders, filters);
  const paginatedCryptoOrders = applyPagination(filteredTripOrder, page, limit);

  return (
    <Card>
      {
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.name} value={statusOption.name}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Trips"
        />
      }
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type & Service</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell align="right">Length</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((tripOrder) => {
              // tripOrder.id;
              return (
                <TableRow hover key={tripOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {/* {format(tripOrder.tripStartAt, "MMMM dd yyyy")} */}
                      {tripOrder.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.Customer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tripOrder.Customer.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.Driver ? (
                        tripOrder.Driver.Car.name
                      ) : (
                        <span style={{ color: "red" }}>Chưa có tài xế</span>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tripOrder.ServiceType.name}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: "200px" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.pickupLocation}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ maxWidth: "200px" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.dropoffLocation}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                    >
                      {tripOrder.distance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {numeral(tripOrder.fare).format(`${tripOrder.fare}0,0`)}{" "}
                      VND
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(tripOrder.status)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTripOrder.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  tripOrders: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  tripOrders: [],
};

export default RecentOrdersTable;
