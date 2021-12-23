import React from "react";

function OrderLoading(Component) {
  return function OrderLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <p style={{ fontSize: "25px" }}>Loading page</p>;
  };
}
export default OrderLoading;
