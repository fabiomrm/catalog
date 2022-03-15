import { ProductCard } from 'components/ProductCard';
import { Product } from 'types/Product';
import { Link } from 'react-router-dom';

import './styles.css';
import { Pagination } from 'components/Pagination';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { AxiosParams } from 'types/vendor/axios';
import { BASE_URL } from 'utils/requests';
import axios from 'axios';
import { CardLoader } from './CardLoader';

export const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/products`,
      params: {
        page: 0,
        size: 12,
      },
    };

    setIsLoading(() => true);
    axios(params)
      .then(({ data }) => {
        setPage(data);
      })
      .finally(() => setIsLoading(() => false));
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de Produtos</h1>
      </div>
      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content &&
          page.content.map((product, _) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};
