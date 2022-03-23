import { ReactComponent as SearchIcon } from 'assets/images/magnifying.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Category } from 'types/Category';
import { requestBackend } from 'utils/requests';
import './styles.css';

type ProductFilterData = {
  name: string;
  category: Category;
};

export const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control } = useForm<ProductFilterData>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((res) =>
      setSelectCategories(res.data.content)
    );
  }, []);

  const onSubmit = (formData: ProductFilterData) => {
    console.log('ENVIOU', formData);
  };

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            name="name"
            type="text"
            className="form-control"
            placeholder="Nome do produto"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  classNamePrefix="product-crud-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary">LIMPAR</button>
        </div>
      </form>
    </div>
  );
};
