import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  Checkbox,
} from "@mui/material";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BaseLayout from "@/layouts/BaseLayout";
import { useState } from "react";
import { useRouter } from "next/router";

const API_GATEWAY_HOSTHOST: string = process.env.NEXT_PUBLIC_API_GATEWAY_HOST!;

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const response = await fetch(`${API_GATEWAY_HOSTHOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: username, password: password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      router.push("/");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card sx={{ width: "100%" }}>
              {/* Add this line to make the Card full width */}
              <CardHeader title="HCMUS Cab Admin Portal Login" />
              <Divider />
              <CardContent sx={{ textAlign: "center" }}>
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
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Checkbox defaultChecked />
                    Remember me
                  </div>
                  <div>
                    <Button
                      sx={{ margin: 2 }}
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

Login.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Login;
