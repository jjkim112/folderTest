import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
}
