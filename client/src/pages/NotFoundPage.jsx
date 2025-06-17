import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../shared/hooks/usePageTitle";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  const navigate = useNavigate();
  usePageTitle("notFound");
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Shad</title>
        <meta
          name="description"
          content="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              fontWeight: "bold",
              color: "primary.main",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 2,
              color: "text.primary",
              fontWeight: "medium",
            }}
          >
            Oops! Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "text.secondary",
              maxWidth: "600px",
            }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable. Please check the URL or try
            navigating back to the homepage.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{ px: 4 }}
            >
              Go to Homepage
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
              sx={{ px: 4 }}
            >
              Go Back
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 6,
              color: "text.secondary",
            }}
          >
            Need help? Contact our support team at{" "}
            <Typography
              component="span"
              sx={{ color: "primary.main", fontWeight: "medium" }}
            >
              info@ecosus.com.sa
            </Typography>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;
