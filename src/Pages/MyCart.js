import React from "react";
import { useHistory } from "react-router";
import ProductImage from "../components/ProductImage";
import useDeleteCart from "../hooks/useDeleteCart";
import useGetCart from "../hooks/useGetCart";

export default function MyCart() {
  const history = useHistory();    
  const {data} = useGetCart();
  let total_price = data?.reduce((data,obb) => {
        return data + obb.product_total_price
  },0)
  let total_product = data?.reduce((data,obb) => {
        return data + obb.order_qty
  },0)
  const deleteCartMutation = useDeleteCart();
  async function handleCartItemDelete(id, event){
        event.preventDefault();
        let cart_id = id;
        await deleteCartMutation.mutate(cart_id)
  }
  return (
    <div className="container row" >
      
      <div className="col-md-12 main-content">
            <h4><span className="fa fa-shopping-cart mr-1"></span>My carts</h4>
            <hr />    
            <div className="row">
                  <div className="col-md-12 table-responsive">
                        <table className="table table-bordered">
                              <thead>
                                    <tr>
                                          <td>sr. </td>
                                          <td style={{ width: '50px'}}>Image </td>
                                          <td>Product Name </td>
                                          <td>Product Qty/Unit </td>
                                          <td>Order Qty </td>
                                          <td>Product Price </td>
                                          <td>Total Price </td>
                                    </tr>
                              </thead>
                              <tbody>
                              {data?.map((cart, ind) => {
                                    return(
                                          <tr key={cart.id}>
                                                <td>{ind+1}</td>
                                                <td ><img style={{ width: '50px'}} src={`${process.env.REACT_APP_LOCAL_API_URL}${cart?.product_image}`}/></td>
                                                <td>{cart?.product_name}</td>
                                                <td>{cart?.product_qty}{cart?.product_unit}</td>
                                                <td>{cart?.order_qty}</td>
                                                <td><span className="fa fa-rupee"></span> &nbsp; {Math.fround(cart?.product_price).toFixed(2)} /{cart?.product_qty}{cart?.product_unit}</td>
                                                <td><span className="fa fa-rupee"></span> &nbsp; {Math.fround(cart?.product_total_price).toFixed(2)}</td>
                                                <td>
                                                      <button className="bnt btn-sm w-100 btn-danger"
                                                      onClick={handleCartItemDelete.bind(this, cart.id)}>
                                                            <span className="fa fa-trash text-white"></span>
                                                      </button>
                                                </td>
                                          </tr>
                                    )
                              })}
                              <tr>
                                    <td colSpan="4">Total Cart Price</td>
                                    <td colSpan="2">
                                       {total_product}   
                                    </td>
                                    <td>
                                          <span className="fa fa-rupee"></span> &nbsp;
                                          {Math.fround(total_price).toFixed(2)}   
                                    </td>
                              </tr>
                              </tbody>
                        </table>
                  </div>
            </div>
      </div>
      <div className="col-md-12 main-content-second">
            <div className="d-flex d-space-between">
                  <button className="btn btn-md btn-success text-white"
                  onClick={e => history.push(`/products`)}>
                        <span className="fa fa-arrow-left"></span> &nbsp;
                        Back to Shop
                  </button>
                  <button className="btn btn-md btn-success text-white">
                        <span className="fa fa-dollar"></span> &nbsp;
                        Checkout
                  </button>
            </div>
      </div>
    </div>
  );
}
