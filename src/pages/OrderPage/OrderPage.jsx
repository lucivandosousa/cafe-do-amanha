import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './OrderPage.css';

export default function OrderPage() {
  const [order, setOrder] = useState({
    name: '',
    tableNumber: '',
    items: []
  });
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [errorName, setErrorName] = useState(null);
  const [errorTableNumber, setErrorTableNumber] = useState(null);
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        const products = data.reduce((acc, category) => {
          acc[category.category] = category.items.reduce((itemsAcc, item) => {
            itemsAcc[item.name] = item.price;
            return itemsAcc;
          }, {});
          return acc;
        }, {});
        setMenuItems(products);
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos:', error);
      });
  }, []);

  const erros = {
    name: /^[a-zA-Zà-ú]+( [a-zA-Zà-ú]+)*$/,
    tableNumber: /^[0-9]+$/,
  }

  function validateName(name) {
    if (name.length === 0) {
      setErrorName('O nome é obrigatório.');
    } else if (name.length < 2) {
      setErrorName('O nome deve conter pelo menos 2 caracteres.');
    } else if (!erros.name.test(name)) {
      setErrorName('O nome deve conter apenas letras.');
    } else {
      setErrorName(null);
    }

    return erros.name.test(name);
  }

  function validateTableNumber(tableNumber) {
    if (tableNumber.length === 0) {
      setErrorTableNumber('O número da mesa é obrigatório.');
    } else if (!erros.tableNumber.test(tableNumber)) {
      setErrorTableNumber('O número da mesa deve conter apenas números.');
    } else {
      setErrorTableNumber(null);
    }

    return erros.tableNumber.test(tableNumber);
  }

  function calculateTotal(items) {
    return items.reduce((total, item) => {
      const price = menuItems[item.category]?.[item.name] || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  function handleCategoryClick(category) {
    validateName(order.name);
    validateTableNumber(order.tableNumber);

    if (!validateName(order.name) || !validateTableNumber(order.tableNumber)) {
      alert('Por favor, preencha todos os campos corretamente antes de continuar.');
      return;
    }

    setCurrentCategory(category);
    setCurrentItem('');
    setCurrentQuantity(1);
    setShowModal(true);
  };

  function handleAddItem() {
    if (!currentItem || currentQuantity <= 0) {
      alert('Por favor, selecione um item e uma quantidade válida.');
      return;
    }

    const updatedItems = [...order.items];
    const existingItemIndex = updatedItems.findIndex(item => item.category === currentCategory && item.name === currentItem);

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += currentQuantity;
    } else {
      updatedItems.push({ category: currentCategory, name: currentItem, quantity: currentQuantity });
    }

    setOrder({
      ...order,
      items: updatedItems
    });

    setShowModal(false);
  };

  function handleCancelOrder() {
    setOrder({
      name: '',
      tableNumber: '',
      items: []
    });
    setCurrentCategory('');
    setCurrentItem('');
    setCurrentQuantity(1);
    setShowModal(false);
    setErrorName(null);
    setErrorTableNumber(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    validateName(order.name);
    validateTableNumber(order.tableNumber);

    if (!validateName(order.name) || !validateTableNumber(order.tableNumber)) {
      alert('Por favor, preencha todos os campos corretamente antes de continuar.');
      return;
    }

    const totalOrder = calculateTotal(order.items);

    if (totalOrder === 0) {
      alert('Por favor, selecione pelo menos um item antes de enviar o pedido.');
      return;
    }

    try {
      fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      alert(`Pedido enviado com sucesso! Valor total: R$ ${totalOrder.toFixed(2)}`);
      setOrder({
        name: '',
        tableNumber: '',
        items: []
      });
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  };

  return (
    <div className="order-container">
      <h2>Faça seu pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={order.name}
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
            onBlur={(e) => validateName(e.target.value)}
          />
          {errorName && <p className="error">{errorName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="tableNumber">Número da Mesa:</label>
          <input
            type="text"
            id="tableNumber"
            name="tableNumber"
            value={order.tableNumber}
            onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
            onBlur={(e) => validateTableNumber(e.target.value)}
          />
          {errorTableNumber && <p className="error">{errorTableNumber}</p>}
        </div>

        <div className="menu-category-list">
          {Object.keys(menuItems).map((category) => (
            <Button key={category} onClick={() => handleCategoryClick(category)} className="category-button">
              {
                (() => {
                  switch (category) {
                    case 'cafes':
                      return 'Cafés';
                    case 'sobremesas':
                      return 'Sobremesas';
                    case 'especiais':
                      return 'Especiais';
                    case 'bebidasGeladas':
                      return 'Bebidas Geladas';
                    case 'chas':
                      return 'Chás';
                    default:
                      return category;
                  }
                })()
              }
            </Button>
          ))}
        </div>

        <h3>Total: R$ {calculateTotal(order.items).toFixed(2)}</h3>

        <div className="button-container">
          <button type="button" onClick={handleCancelOrder}>Cancelar Pedido</button>
          <button type="submit">Enviar Pedido</button>
        </div>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Selecione o item e a quantidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="itemSelect">Item:</label>
            <select
              id="itemSelect"
              name="itemSelect"
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              className="form-control"
            >
              <option value="">Selecione um item</option>
              {Object.keys(menuItems[currentCategory] || {}).map((item) => (
                <option key={item} value={item}>{item} - R$ {menuItems[currentCategory][item].toFixed(2)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
              min="1"
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Adicionar ao Pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


