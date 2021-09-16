import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import useAddCategory from "../hooks/useAddCategory";
import useCategories from "../hooks/useCategories";

export default function AddCategory() {
  const params = useParams();
  const history = useHistory();
  const [name, setName]     = useState("");
  const [slug, setSlug]     = useState("");
  const {data: category} = useCategories();
  const addCategoryMutation = useAddCategory();
  async function handleAddProducts(e) {
    e.preventDefault();
    await addCategoryMutation.mutate({name, slug})
    setName("")
  }
  function handleNameChange(e){
      e.preventDefault();
      let name = e.target.value
      setSlug(name.toLowerCase().replace(/ /g,'-'))
      setName(name)

  }
  return (
    <div className="container row">
      
      <div className="col-md-9 offset-3" style={{ marginTop: '80px'}}>
            <h4 className="heading">{params?.pageType} Category
            <button 
                  className="btn btn-sm btn-dark heading pull-right"
                  onClick={e => history.push(`${params?.pageType === 'view' ? '/add-category/create': '/add-category/view'}`)}><small>{params?.pageType  === 'view'? 'Add New': 'View All'} Category</small></button>
            </h4>
            
            <hr />    
        <div className="main-content-form">
        {!params?.refId && params?.pageType === 'create' && (
        <form className="row" onSubmit={handleAddProducts}>
            <div className="form-group col-md-9">
                  <input
                  type="text"
                  placeholder="category name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                  />
            </div>
          
          
            <div className="form-group col-md-3 pl-0">
      
                  <button className="btn btn-md btn-success text-white w-100">
                        <span className="fa fa-bars mr-2"></span>
                        Add Category
                  </button>
            </div>
      
        </form>
        )}    
        {params?.pageType === 'view' && (
          <div className="row">
                <div className="col-md-12">
                      <div className="table-responsive">
                            <table className="table table-bordered">
                                    <thead>
                                          <tr>
                                               <td>Category Name</td> 
                                               <td>Category Slug</td> 
                                               <td>Total Products</td> 
                                          </tr>
                                    </thead>
                                    <tbody>
                                    {category?.map(cate => {
                                          return (
                                                <tr>
                                                      <td>{cate?.name}</td>
                                                      <td>
                                                            <NavLink to={`/categories/${cate?.slug}`}>
                                                            {cate?.slug}
                                                            </NavLink>
                                                            </td>
                                                      <td>{cate?.products?.length}</td>
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
    </div>
  );
}
