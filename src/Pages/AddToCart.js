import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import useAddToCart from "../hooks/useAddToCart";
import useGetCart from "../hooks/useGetCart";

export default function AddToCart({ product }) {
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState(product?.units[0].name);
  const {data:carts} = useGetCart();

  const addToCartMutation = useAddToCart();
  
  async function handleAddToCart() {
    if(state.isLoggedIn){
        let users_permissions_user = state.user_id;
        let product_id = product.id;
        let product_name = product.name;
        let product_price = product.price;
        let order_qty = qty;
        let product_qty = product?.qty;
        let product_image = product?.image?.url;
        let product_unit = (unit === undefined ? product?.units[0].name : unit);
        let product_total_price = +product_price * +order_qty;
        let data = {
          users_permissions_user,
          product_id,
          product_name,
          product_price,
          product_qty,
          order_qty,
          product_total_price,
          product_unit,
          product_image
        };
        console.log(data);
        await addToCartMutation.mutate(data);
    }else{
      localStorage.setItem('callbackurl', location.pathname)
      history.push(`/login`);
    }
  }
  function handleIncQty() {
    setQty(qty + 1);
  }

  function handleUnitChange(event) {
    setUnit(event.target.value);
  }

  function handleDecQty() {
    if (qty === 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  }
  let disabled = carts?.some(cart => cart.product_id === product?.id);
  
  return (
    <div className="mt-2" >
      <div className="col-md-6 pl-0 pr-0">
        <button
          className="btn btn-md btn-success col-md-2 text-white"
          onClick={handleDecQty}
          disabled={disabled}>
          <span className="fa fa-minus-square"></span>
        </button>
        <button className="btn btn-md btn-success col-md-2 text-white"
        disabled={disabled}>
          {qty}
        </button>
        <button
          className="btn btn-md btn-success col-md-2 text-white"
          onClick={handleIncQty}
          disabled={disabled}
        >
          <span className="fa fa-plus-square"></span>
        </button>
        <select
          className="btn btn-md btn-warning col-md-6 ml-2 text-white"
          value={unit}
          onChange={handleUnitChange}
          disabled={disabled}
        >
          {product?.units?.map(u => {
                return(
                  <option value={u.name}>{product?.qty} - {u.name}</option>
                )
          })}  
        </select>
        <button
          className={`btn btn-md col-md-12 p-2 text-white ${disabled ? 'btn-danger disabled': 'btn-warning'}`}
          onClick={handleAddToCart}
          disabled={disabled}
        >
          {disabled ? (<>
                  <span className="fa fa-cart-plus"></span>
                        Added to cart
                  </>
            ) : (
                <>
                      <span className="fa fa-cart-plus"></span> &nbsp;
                        Add to cart
                </>
          )}    
          
        </button>
      </div>
    </div>
  );
}
