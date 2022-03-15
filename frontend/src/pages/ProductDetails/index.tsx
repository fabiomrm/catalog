import './styles.css';
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-left.svg';
import { ProductPrice } from 'components/ProductPrice';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/Product';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { ProductInfoLoader } from './ProductInfoLoader';
import { ProductDetailsLoader } from './ProductDetailsLoader';

type UrlParams = {
  productId: string;
};

export const ProductDetails = () => {
  const { productId } = useParams<UrlParams>();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(() => true);

    axios
      .get(`${BASE_URL}/products/${productId}`)
      .then((response) => setProduct(response.data))
      .finally(() => setIsLoading(() => false));
  }, [productId]);

  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowLeft />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            {isLoading ? (
              <ProductInfoLoader />
            ) : (
              <>
                <div className="img-container">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="name-price-container">
                  <h1>{product?.name}</h1>
                  {product && <ProductPrice price={product?.price} />}
                </div>
              </>
            )}
          </div>
          <div className="col-xl-6">
            {isLoading ? (
              <ProductDetailsLoader />
            ) : (
              <div className="description-container">
                <h2>Descrição do Produto</h2>
                <p>{product?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
