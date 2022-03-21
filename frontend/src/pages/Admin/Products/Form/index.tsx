import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from 'types/Product';
import { requestBackend } from 'utils/requests';
import Select from 'react-select';

import './styles.css';
import { SelectContainer } from 'react-select/dist/declarations/src/components/containers';
import { Category } from 'types/Category';

type UrlParams = {
  productId: string;
};

export const Form = () => {
  const navigate = useNavigate();
  const { productId } = useParams<UrlParams>();
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const isEditing = productId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((res) => {
        const product = res.data as Product;
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  useEffect(() => {
    requestBackend({ baseURL: '/categories', withCredentials: true}).then((res) =>
      setSelectCategories(res.data.content)
    );
  }, []);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing ? formData.imgUrl : '',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      navigate('/admin/products');
    });
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-card-form">
        <h1 className="product-crud-card-form-title">Dados do Produto</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="product-crud-input margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  name="name"
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="product-crud-input margin-bottom-30">
                <Select
                  options={selectCategories}
                  isMulti
                  classNamePrefix="product-crud-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              </div>
              <div className="product-crud-input margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  name="price"
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                rows={10}
                {...register('description', {
                  required: 'Campo obrigatório',
                })}
                name="description"
                className={`form-control base-input ${
                  errors.price ? 'is-invalid' : ''
                }`}
                placeholder="Descrição"
              />
              <div className="invalid-feedback d-block">
                {errors.description?.message}
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="btn btn-primary product-crud-button text-white"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
