import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

//Icons Import
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface TripTypeProps {
  selectedTripType: string;
  setSelectedTripType: React.Dispatch<React.SetStateAction<string>>;
}

const TripTypeSelector: React.FC<TripTypeProps> = ({
  selectedTripType,
  setSelectedTripType,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (tripType: any) => {
    setSelectedTripType(tripType);

    handleClose();
  };

  const getIcon = (tripType: any) => {
    switch (tripType) {
      case "One Way":
        return <ArrowRightAltOutlinedIcon />;
      case "Round Trip":
      default:
        return <SyncAltIcon />;
    }
  };

  return (
    <div>
      <Tooltip title="Select Trip Type">
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
          {getIcon(selectedTripType)}
          <Typography
            variant="body2"
            sx={{ ml: 1, display: "inline", fontSize: "0.875rem" }}
          >
            {selectedTripType}
          </Typography>
          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {["Round Trip", "One Way"].map((tripType) => (
          <MenuItem
            key={tripType}
            onClick={() => handleSelect(tripType)}
            sx={{ fontSize: "0.875rem" }}
          >
            {selectedTripType === tripType && (
              <CheckIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            )}
            <ListItemText
              primary={tripType}
              primaryTypographyProps={{ fontSize: "0.875rem" }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TripTypeSelector;
