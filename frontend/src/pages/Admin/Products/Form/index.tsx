import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from 'types/Product';
import { requestBackend } from 'utils/requests';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import { toast } from 'react-toastify';

import './styles.css';
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
    control,
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
    requestBackend({ url: '/categories' }).then((res) =>
      setSelectCategories(res.data.content)
    );
  }, []);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then((res) => {
      toast.info('Produto cadastrado com sucesso!');
      navigate('/admin/products');
    }).catch((err) => {
      toast.error('Erro ao cadastrar o produto!');
      console.log(err);
    });
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-card-form">
        <h1 className="product-crud-card-form-title">Dados do Produto</h1>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
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
                  data-testid="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="product-crud-input margin-bottom-30">
              <label htmlFor="categories" className="d-none">categorias</label>
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      isMulti
                      classNamePrefix="product-crud-select"
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                      inputId="categories"
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>
              <div className="product-crud-input margin-bottom-30">
                
                <Controller
                  name="price"
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                      decimalsLimit={2}
                      data-testid="price"
                    />
                  )}
                />

                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="product-crud-input margin-bottom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                  })}
                  name="imgUrl"
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Url da imagem do produto"
                  data-testid="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                {...register('description', {
                  required: 'Campo obrigatório',
                })}
                name="description"
                className={`form-control base-input ${
                  errors.price ? 'is-invalid' : ''
                }`}
                placeholder="Descrição"
                data-testid="description"
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
