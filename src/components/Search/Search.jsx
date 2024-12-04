import { TextField } from "@mui/material";
import { useSpaceContext } from "../../context/SpaceContext";

export const Search = () => {
  const { filterSpaceship } = useSpaceContext();
  return (
    <TextField
      onChange={(e) => filterSpaceship(e.target.value)}
      size="small"
      placeholder="Search..."
      fullWidth
    />
  );
};
