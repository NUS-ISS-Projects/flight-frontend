import React, { ReactNode, Ref } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

interface SubCardProps {
  children: ReactNode | string | null;
  content?: boolean;
  className?: string;
  contentClass?: string;
  secondary?: ReactNode | string;
  sx?: {};
  contentSX?: {};
  title?: ReactNode | string;
}

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = React.forwardRef(
  (
    {
      children,
      className,
      content,
      contentClass,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    }: SubCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[200],
          ":hover": {
            boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
          },
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: theme.palette.grey[200],
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{ p: 2.5, ...contentSX }}
            className={contentClass || ""}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

SubCard.displayName = "SubCard";

SubCard.defaultProps = {
  content: true,
};

export default SubCard;
