import React from "react";
import { useHistory } from "react-router";
import useCategories from "../hooks/useCategories";

export default function Home() {
  const { data: categories } = useCategories();
  const history = useHistory();
  return (
    <div className="container pl-0 pr-0">
      <div className="row" style={{ paddingTop: "80px" }}>
        <h2>Poular Categories</h2>
        <hr />
        {categories?.map((category) => {
          if (category.products?.length > 0)
            return (
              <div
                className="col-md-3 mb-2"
                key={category.id}
                style={{ cursor: 'pointer'}}
                onClick={(e) => history.push(`/categories/${category.slug}`)}
              >
                <div className="card p-2">
                  {category.name} - {category.products?.length}
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}
