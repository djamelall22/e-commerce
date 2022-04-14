import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchSingleProduct,
    single_product_loading: loading,
    single_product_error: error,
    single_product,
  } = useProductsContext();

  // fetch a product
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  // redirect in case of error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  // display loading spinner
  if (loading) return <Loading />;

  // display error message
  if (error) return <Error />;

  // content
  const {
    id: sku,
    reviews,
    name,
    price,
    description,
    stock,
    stars,
    company,
    images,
  } = single_product;

  return (
    <Wrapper>
      <PageHero title={name} product />

      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>

        <div className="product-center">
          {/* left side IMAGES*/}
          <ProductImages images={images} />

          {/* right side */}
          <section>
            <h2>{name}</h2>
            {/* Stars component */}
            <Stars stars={stars} reviews={reviews} />

            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available:</span>
              {stock > 0 ? "in stock" : "out of stock"}
            </p>
            <p className="info">
              <span>sku:</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand:</span>
              {company}
            </p>
            <hr />

            {/* add to cart component */}
            {stock > 0 && <AddToCart product={single_product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
