import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Button,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

//Icons Import
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TravellerSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pax, setPax] = useState({ adults: 1, children: 0 });
  const [totalPax, setTotalPax] = useState(1);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePaxChange = (type: "adults" | "children", delta: number) => {
    setPax((prev) => ({
      ...prev,
      [type]: Math.max(1, prev[type] + delta),
    }));
  };

  const handleDone = () => {
    setTotalPax(pax.adults + pax.children);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Select Passengers">
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
          <PersonOutlineOutlinedIcon />
          {totalPax > 0 && (
            <Typography
              variant="body2"
              sx={{ ml: 1, display: "inline", fontSize: "0.875rem" }}
            >
              {totalPax}
            </Typography>
          )}
          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} keepMounted>
        <MenuItem>
          <ListItemText primary="Adults" />
          <IconButton
            onClick={() => handlePaxChange("adults", -1)}
            color="secondary"
            size="small"
            sx={{ fontSize: "0.875rem" }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{pax.adults}</Typography>
          <IconButton
            onClick={() => handlePaxChange("adults", 1)}
            color="secondary"
            size="small"
            sx={{ fontSize: "0.875rem" }}
          >
            <AddIcon />
          </IconButton>
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Children" />
          <IconButton
            onClick={() => handlePaxChange("children", -1)}
            color="secondary"
            size="small"
            sx={{ fontSize: "0.875rem" }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{pax.children}</Typography>
          <IconButton
            onClick={() => handlePaxChange("children", 1)}
            color="secondary"
            size="small"
            sx={{ fontSize: "0.875rem" }}
          >
            <AddIcon />
          </IconButton>
        </MenuItem>
        <Box display="flex" justifyContent="space-between" p={1.5}>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            sx={{ fontSize: "0.75rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDone}
            color="primary"
            size="small"
            sx={{ fontSize: "0.75rem" }}
          >
            Done
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default TravellerSelector;
