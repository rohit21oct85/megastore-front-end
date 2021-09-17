import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import AuthProvider from "./context/AuthContext.js";
import { ToastProvider } from "react-toast-notifications";
import { QueryClient, QueryClientProvider } from "react-query";
// Pages
import Header from "./components/Header";

import Home from "./Pages/Home";
import Product from "./Pages/Products";

import Categories from "./Pages/Categories";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddProducts from "./Pages/AddProducts";
import PrivateRoute from "./helper/PrivateRoute";
import MyCart from "./Pages/MyCart";
import AddCategory from "./Pages/AddCategory";
import ProductDetails from "./Pages/ProductDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <AuthProvider>
          <ToastProvider>
            <Switch>
              <QueryClientProvider client={queryClient}>
                <Header />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/products">
                  <Product />
                </Route>

                <Route exact path={`/categories/:slug?`}>
                  <Categories />
                </Route>

                <Route exact path={`/register`}>
                  <Register />
                </Route>

                <Route exact path={`/login`}>
                  <Login />
                </Route>
                <PrivateRoute exact path={`/add-products/:pageType?/:field?/:refId?`}>
                  <AddProducts />
                </PrivateRoute>
                
                <PrivateRoute exact path={`/product-details/:slug?`}>
                  <ProductDetails />
                </PrivateRoute>

                <PrivateRoute exact path={`/add-category/:pageType?`}>
                  <AddCategory />
                </PrivateRoute>
                
                <PrivateRoute exact path={`/my-cart`}>
                  <MyCart />
                </PrivateRoute>

              </QueryClientProvider>
            </Switch>
          </ToastProvider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
