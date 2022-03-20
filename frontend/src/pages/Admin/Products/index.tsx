import { Routes, Route } from 'react-router-dom';
import { Form } from './Form';
import { List } from './List';

export const Products = () => {
  return(
    <Routes>
      <Route path="/" element={<List />}/>
      <Route path="/:productId" element={<Form />}/>
    </Routes>
  )
};
