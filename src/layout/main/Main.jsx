import { node } from "prop-types";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../providers/ThemeProvider";

const Main = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <Paper
      sx={{
        minHeight: "90vh",
        backgroundColor: isDark ? "#666666" : "#ffffff",
      }}>
      {children}
    </Paper>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
