import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './Menu.css';

import coffee1 from '../../assets/images/graos.jpg';
import coffee2 from '../../assets/images/petit.jpg';
import coffee3 from '../../assets/images/croissant.jpeg';
import coffee4 from '../../assets/images/milk.jpeg';
import coffee5 from '../../assets/images/cha.jpeg';

export default function Menu() {
  const [currentImage, setCurrentImage] = useState(coffee1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Café do Amanhã</h1>
      </div>

      <div className="menu-content">
        <div className="menu-image">
          <img src={currentImage} alt="Menu" />
        </div>

        <div className="menu-tabs">
          <Tabs
            defaultActiveKey="cafes"
            id="styled-menu-tabs"
            className="mb-3"
            onSelect={(key) => {
              switch (key) {
                case 'cafes':
                  setCurrentImage(coffee1);
                  break;
                case 'sobremesas':
                  setCurrentImage(coffee2);
                  break;
                case 'especiais':
                  setCurrentImage(coffee3);
                  break;
                case 'bebidas-geladas':
                  setCurrentImage(coffee4);
                  break;
                case 'chas':
                  setCurrentImage(coffee5);
                  break;
                default:
                  setCurrentImage(coffee1);
              }
            }}
          >
            {products && products.map((product) => (
              <Tab
                key={product.id}
                eventKey={product.category}
                title={(
                  () => {
                    switch (product.category) {
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
                    }
                  }
                )()}
              >
                <ul className="menu-list">
                  {product.items.map((item, index) => (
                    <li key={index}>
                      {item.name} <span>R$ {item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
