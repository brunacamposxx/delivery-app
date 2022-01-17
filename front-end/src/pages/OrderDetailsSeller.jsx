import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import { getOrderById } from '../services/customer';

function OrderDetails(props) {
  const [sale, setSale] = useState({});
  const [loading, setLoading] = useState(true);
  const { match: { params: { id } } } = props;

  if (sale.sellerId === 2) sale.sellerId = 'Fulana Pereira';
  const handleClick = (status) => {
    setSale({ ...sale, status });
  };

  useEffect(() => {
    setLoading(true);
    const getOrder = async () => {
      const order = await getOrderById(id);
      const dez = 10;
      order.data.saleDate = order.data.saleDate
        .slice(0, dez).split('-').reverse().join('/');
      setSale(order.data);
      setLoading(false);
    };
    getOrder();
  }, [sale.status]);

  const { products } = sale;
  const dataTestids = 'seller_order_details__element-order-';

  return loading ? 'Carregando' : (
    <div>
      <NavBar />
      <h3>Detalhes do Pedido</h3>
      <div className="details-info">
        <p data-testid={ `${dataTestids}details-label-order-id` }>
          {`PEDIDO: ${sale.id}`}
        </p>
        <p data-testid={ `${dataTestids}details-label-seller-name` }>
          { sale.sellerId }
        </p>
        <p data-testid={ `${dataTestids}details-label-order-date` }>
          { sale.saleDate }
        </p>
        <p
          data-testid={ `${dataTestids}details-label-delivery-status` }
        >
          { sale.status }
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ sale.status !== 'Pendente' }
          onClick={ () => handleClick('Preparando') }
        >
          Preparar pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ sale.status !== 'Preparando' }
          onClick={ () => handleClick('Em Trânsito') }
        >
          Saiu para Entrega
        </button>
      </div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        { products.map(({ name, SaleProduct: { quantity }, price }, index) => {
          const priceTotal = Number(price) * Number(quantity);
          return (
            <tr key={ index }>
              <td
                data-testid={ `${dataTestids}table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `${dataTestids}table-name-${index}` }
              >
                {name}
              </td>
              <td
                data-testid={ `${dataTestids}table-quantity-${index}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `${dataTestids}table-sub-total-${index}` }
              >
                {`R$ ${price.replace(/\./, ',')}`}
              </td>
              <td
                data-testid={ `${dataTestids}total-price-${index}` }
              >
                {`R$ ${priceTotal.toFixed(2)}`}
              </td>
            </tr>
          );
        })}
      </table>
      <h2 data-testid={ `${dataTestids}total-price` }>
        { sale.totalPrice.replace(/\./, ',') }
      </h2>
    </div>
  );
}

OrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default OrderDetails;
