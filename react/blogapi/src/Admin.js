import React, { useEffect, useState } from "react";
import "./App.css";
import Orders from "./components/order/orders";
import OrderLoadingComponent from "./components/order/orderLoading";
import axiosInstance from "./axios";

function Admin() {
  const OrderLoading = OrderLoadingComponent(Orders);
  const isLoggedIn = localStorage.getItem("access_token");

  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get("listorders/").then((res) => {
      //get all orders
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);

  if (isLoggedIn) {
    return (
      <div className="App">        
        <OrderLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Login to access</h1>
      </div>
    );
  }
}
export default Admin;
