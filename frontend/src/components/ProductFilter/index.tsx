import { ReactComponent as SearchIcon } from 'assets/images/magnifying.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Category } from 'types/Category';
import { requestBackend } from 'utils/requests';
import './styles.css';

export type ProductFilterData = {
  name: string;
  category: Category | null;
};

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};

export const ProductFilter = ({ onSubmitFilter }: Props) => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const { register, handleSubmit, control, setValue, getValues } =
    useForm<ProductFilterData>();

  const handleFormClear = () => {
    setValue('name', '');
    setValue('category', null);
  };

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((res) =>
      setSelectCategories(res.data.content)
    );
  }, []);

  const handleChangeCategory = (value: Category) => {
    setValue('category', value);

    const obj: ProductFilterData = {
      name: getValues('name'),
      category: getValues('category'),
    };

    onSubmitFilter(obj);
  };

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData)
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
          <button className="product-filter-button-search-icon">
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
                  placeholder="Categoria"
                  options={selectCategories}
                  isClearable
                  classNamePrefix="product-filter-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                  onChange={(value) => handleChangeCategory(value as Category)}
                />
              )}
            />
          </div>
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-product-filter-clear"
          >
            LIMPAR <span className="btn-product-filter-word">FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};
