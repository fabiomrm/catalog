import { Navbar } from "components/Navbar";
import { Admin } from "pages/Admin";
import { Catalog } from "pages/Catalog";
import { Home } from "pages/Home";
import { ProductDetails } from "pages/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<Catalog />}/>
                <Route path="/products/:productId" element={<ProductDetails />}/>
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
    );
}