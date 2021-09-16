import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useAddProductImage from "../hooks/useAddProductImage";
import useAddProducts from "../hooks/useAddProducts";
import useCategories from "../hooks/useCategories";
import { AuthContext } from "../context/AuthContext";
import useMyProducts from "../hooks/useMyProducts";
import ProductImage from "../components/ProductImage";
import useUnits from "../hooks/useUnits";
import useGetProductByRefId from "../hooks/useGetProductByRefId";
import useUpdateProduct from "../hooks/useUpdateProduct";
import { NavLink } from "react-router-dom";

export default function AddProducts() {
  const params = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categories, setCategories] = useState("");
  let pages = ["create","update"];
  const { data } = useCategories();
  const {data: myProducts} = useMyProducts();
  const {data: units} = useUnits();
  const {data: product, isLoading} = useGetProductByRefId();
  const [singleProduct, setSingleProduct] = useState({});
  useEffect(() => {
    setSingleProduct(product)
  },[product, params?.field,params?.refId])
  const { state } = useContext(AuthContext);
  
  const addProductMutation = useAddProducts();
  const updateProductMutation = useUpdateProduct();

  const users_permissions_user = state.user_id;
  let slug;
  if(params?.refId){
    slug = !isLoading && singleProduct?.name?.toLowerCase().replace(/ /g, '-');
  }else{
    slug = name.toLowerCase().replace(/ /g, '-');
  }

  async function handleAddProducts(e) {
    e.preventDefault();
    if(params?.refId){
       singleProduct.slug = slug
       console.log(singleProduct)
       await updateProductMutation.mutate(singleProduct);
    }else{
      await addProductMutation.mutate({
        name,
        slug,
        price,
        categories,
        units: unit,
        product_description: productDescription,
        qty: qty,
        users_permissions_user,
      });
    }

  }
  const [file, setFile] = useState("");
  const addProductImageMutation = useAddProductImage();
  async function handleAddProductImages(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("files", file);
    data.append("ref", "product");
    data.append("field", "image");
    data.append("refId", params?.refId);
    await addProductImageMutation.mutate(data);
  }
  
  return (
    <div className="container row">
      <div className="col-md-9 offset-md-3" style={{ marginTop: '80px'}}>
        <h4 className="heading">
          {params?.pageType} products - {params?.field}
          <button
            className="btn btn-sm btn-dark heading pull-right"
            onClick={(e) =>
              history.push(
                `${
                  params?.pageType === "view"
                    ? "/add-products/create"
                    : "/add-products/view"
                }`
              )
            }
          >
            <small>
              {params?.pageType === "view" ? "Add New" : "View All"} Products
            </small>
          </button>
        </h4>
        <hr />
        {(pages.includes(params?.pageType) ) && (
          <>

          <form className="col-md-12 row" onSubmit={handleAddProducts}>
            {params?.refId && !isLoading && (
            <div className="col-md-3 pl-0 pr-0">
              <img style={{ width: '50%'}} src={`${process.env.REACT_APP_LOCAL_API_URL}${!isLoading && singleProduct?.image?.url}`}/>
            </div>
            )}
            <div className="col-md-9 row pr-0">

            
            <div className="form-group col-md-3">
              <select
                className="form-control"
                value={params?.refId ? !isLoading && singleProduct?.categories?.length > 0 && singleProduct?.categories[0]?.id: categories}
                onChange={(e) => {
                  if(params?.refId){
                    setSingleProduct({...singleProduct, ['categories']: e.target.value})
                  }else{
                    setCategories(e.target.value)
                  }
                }}
              >
                <option>Categories</option>
                {data?.map((d) => (
                  <option value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-9">
              <input
                type="text"
                placeholder="product name"
                className="form-control"
                value={params?.refId ? singleProduct?.name : name}
                onChange={(e) => {
                  if(params?.refId){
                    setSingleProduct({...singleProduct, ['name']: e.target.value})
                  }else{
                    setName(e.target.value)
                  }
                }}
              />
            </div>
            <div className="form-group col-md-3">
              <input
                type="text"
                placeholder="price"
                className="form-control"
                value={params?.refId ? singleProduct?.price: price}
                onChange={(e) => {
                  if(params?.refId){
                    setSingleProduct({...singleProduct, ['price']: e.target.value})
                  }else{
                    setPrice(e.target.value)
                  }
                }}
              />
            </div>
            <div className="form-group col-md-2">
              <input
                type="text"
                placeholder="qty"
                className="form-control"
                value={params?.refId ? singleProduct?.qty: qty}
                onChange={(e) => {
                  if(params?.refId){
                    setSingleProduct({...singleProduct, 'qty': e.target.value})
                  }else{
                    setQty(e.target.value)
                  }
                }}
              />
            </div>
            <div className="form-group col-md-2">
              <select className="form-control"
              value={params?.refId ? !isLoading && singleProduct?.units?.length > 0 && singleProduct?.units[0].id: unit}
              onChange={e => {
                if(params?.refId){
                  setSingleProduct({...singleProduct, ['units']: e.target.value})
                }else{
                  setUnit(e.target.value)
                }
              }}>
                  <option>Units</option>
                  {units?.map(unit => {
                    return(
                      <option value={unit.id}>{unit.name}</option>
                    )
                  })}
              </select>
            </div>
            
            <div className="form-group col-md-12 ">
              <textarea
                type="text"
                style={{ height: '150px'}}
                placeholder="product description"
                className="form-control"
                value={params?.refId ? singleProduct?.product_description :productDescription}
                onChange={(e) => {
                  if(params?.refId){
                    setSingleProduct({...singleProduct, ['product_description']: e.target.value})  
                  }else{
                    setProductDescription(e.target.value)
                  }
                }}
              />
            </div>
            
            </div>

            <div className="form-group col-md-12 mt-3">
              <hr />
              <button className="btn btn-md btn-success text-white">
                <span className="fa fa-shopping-bag mr-2"></span>
                {params?.pageType} product
              </button>
              {pages?.includes(params?.pageType) && (
                <button className="btn btn-md btn-danger text-white pull-right"
                onClick={e => history.push(`/add-products/view`)}>
                  <span className="fa fa-times mr-2"></span>
                  Cancel {params?.pageType} Product
                </button>

              )}

            </div>
          </form>
          </>
        )}
        {params?.refId && params?.pageType === "upload" && (
          <form className="row" onSubmit={handleAddProductImages}>
            <div className="form-group col-md-9">
              <input
                type="file"
                placeholder="images"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="form-group col-md-3 pl-0">
              <button className="btn btn-md btn-success text-white w-100">
                <span className="fa fa-image mr-1"></span>
                Add Product Image
              </button>
            </div>
          </form>
        )}
        {params?.pageType === "view" && (
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Image</td>
                      <td>Product Name</td>
                      <td>Categories</td>
                      <td>Qty</td>
                      <td>Unit</td>
                      <td>Price</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                  {myProducts?.map(product => {
                    return(
                      <tr>
                        <td><ProductImage d={product} width="36"/></td>
                        <td>
                          <NavLink to={`/product-details/${product.slug}`}>
                            <a>{product?.name}</a>
                          </NavLink>
                        </td>
                        <td>{product?.categories?.map(cate => <span>{cate.name}</span>)}</td>
                        <td>{product?.qty}</td>
                        <td>{product?.units?.map(u=> { return (<span>{u.name}</span>)})}</td>
                        <td>{product?.price}</td>
                        <td>
                          <button className="btn btn-sm btn-success"
                          onClick={e => history.push(`/add-products/update/${product?.name?.toLowerCase()?.replace(/ /g, '-')}/${product?.id}`)}>
                            <span className="fa fa-pencil-square"></span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
