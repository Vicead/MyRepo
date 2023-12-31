import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { CardHeader } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";
import { btnStyle, flex } from "../../styles/globalStyle";

const BrandCard = ({ brand, handleOpen, setInfo }) => {
  const { deleteStockData } = useStockCall();

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}>
      <CardHeader title={brand?.name} />

      <CardMedia
        image={brand?.image}
        sx={{ p: 1, objectFit: "contain", height: "250px" }}
        component="img"
        alt={brand?.name}
        title={brand?.name}
      />

      <CardActions sx={flex}>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            setInfo(brand);
            handleOpen();
          }}
        />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStockData("brands", brand._id)}
        />
      </CardActions>
    </Card>
  );
};

export default BrandCard;
