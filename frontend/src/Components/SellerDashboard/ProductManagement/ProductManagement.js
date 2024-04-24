import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product";
import exampleData from './SampleProductData'; // Assuming SampleProductData.js is the file containing your example data

const ProductManagement = () => {
  return (
    <div>
      <Grid container spacing={2}>
        {exampleData.map((product) => (
          <Grid item key={product.id}>
            <Product
              id={product.id}
              title={product.name}
              price={product.price}
              imageSrc= "https://images.unsplash.com/photo-1708921047448-389333bac8f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDMwOTQ2Mw&ixlib=rb-4.0.3&q=80&w=1080"
              description={product.description}
            />

          </Grid>
          


        ))}
      </Grid>
    </div>
  );
};

export default ProductManagement;
