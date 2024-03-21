import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface CabinClassProps {
  selectedCabinClass: string;
  setSelectedCabinClass: React.Dispatch<React.SetStateAction<string>>;
}

const CabinClassSelector: React.FC<CabinClassProps> = ({
  selectedCabinClass,
  setSelectedCabinClass,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (cabinClass: any) => {
    setSelectedCabinClass(cabinClass);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Select Cabin Class">
        <IconButton
          onClick={handleClick}
          color="inherit"
          size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              borderRadius: "0.3rem",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{ ml: 1, display: "inline", fontSize: "0.875rem" }}
          >
            {selectedCabinClass}
          </Typography>

          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {["Economy", "Business", "First Class"].map((cabinClass) => (
          <MenuItem
            key={cabinClass}
            onClick={() => handleSelect(cabinClass)}
            sx={{ fontSize: "0.875rem" }}
            selected={cabinClass === selectedCabinClass}
          >
            {selectedCabinClass === cabinClass && (
              <CheckIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            )}
            <ListItemText
              primary={cabinClass}
              primaryTypographyProps={{ fontSize: "0.875rem" }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CabinClassSelector;
