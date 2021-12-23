import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/order/orders";
import OrderLoadingComponent from "./components/order/orderLoading";
import axiosInstance from "./axios";

function App() {
  const OrderLoading = OrderLoadingComponent(Posts);
  const isLoggedIn = localStorage.getItem("access_token");
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allPosts = res.data;
      console.log(res.data);
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);

  if (isLoggedIn) {
    return (
      <div className="App">
        <h2>Service Order</h2>
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
export default App;
