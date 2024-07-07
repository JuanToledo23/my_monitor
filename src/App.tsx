import { Box, ThemeProvider, createTheme } from "@mui/material";
import MonitorCard from "./components/Card/Card";
import ToolBar from "./components/ToolBar/ToolBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToolBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <MonitorCard />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
