import React from "react";
import {
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { setOrderDetails } from "../../redux/Orders/orders.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];

const styles = {
  fontSize: "16px",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `$${columnValue}`;
    case "productThumbnail":
      return <img src={columnValue} width={250} alt="" />;
    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              return (
                <TableCell style={styles} key={index}>
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((column, index) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];

                    return (
                      <TableCell style={styles} key={index}>
                        {formatText(columnName, columnValue)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;
