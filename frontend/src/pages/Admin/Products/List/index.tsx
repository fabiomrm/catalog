import { AxiosRequestConfig } from 'axios';
import { Pagination } from 'components/Pagination';
import { ProductFilter } from 'components/ProductFilter';
import { ProductCrudCard } from 'pages/Admin/Products/ProductCrudCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/Product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'utils/requests';
import './styles.css';

type ControlComponentsData = {
  activePage: number;
};

export const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
    });

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
      },
    };
    requestBackend(config).then(({ data }) => {
      setPage(data);
    });
  }, [controlComponentsData])

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber });
  };

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <ProductFilter />
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={getProducts} />
          </div>
        ))}
      </div>
      <Pagination
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};
