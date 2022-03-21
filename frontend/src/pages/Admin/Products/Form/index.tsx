import './styles.css';

export const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-card-form">
        <h1 className="product-crud-card-form-title">Dados do Produto</h1>
        <form action="">
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="product-crud-input margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div className="product-crud-input margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div className="product-crud-input">
                <input type="text" className="form-control base-input" />
              </div>
            </div>
            <div className="col-lg-6">
              <textarea
                name=""
                rows={10}
                className="form-control base-input h-auto"
              />
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button className="btn btn-outline-danger product-crud-button">CANCELAR</button>
            <button className="btn btn-primary product-crud-button text-white">SALVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};
