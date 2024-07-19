import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { Star } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";

const LikelihoodCards = ({ response, likelihood, country }) => {
  const theme = useTheme(themeSettings("light")); // or "dark" for dark mode

  let data = [];

  if (Array.isArray(response)) {
    data = response;
  } else if (response && response.data) {
    data = response.data;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Typography variant="h2" component="div">
          {data.length > 0
            ? `Number of items: ${data.length}`
            : "No items found"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map((item, index, array) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              margin: 2,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                {item.country || country}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="text.primary"
                sx={{
                  mb: 2,
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                Sector: {item.sector}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                Likelihood:
                {[...Array(item.likelihood)].map((_, i) => (
                  <Star
                    key={i}
                    sx={{ fontSize: 18, color: theme.palette.secondary.main }}
                  />
                ))}
              </Typography>
              <IconButton
                component={Link}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginLeft: "auto", color: theme.palette.primary.main }}
              >
                <OpenInNew />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default LikelihoodCards;
