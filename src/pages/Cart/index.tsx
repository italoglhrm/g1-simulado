import { Fragment, useState } from 'react'
import {
  Trash,
} from '@phosphor-icons/react'

import { QuantityInput } from '../../components/Form/QuantityInput'
import {
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
} from './styles'
import { Tags } from '../../components/CoffeeCard/styles'
import { PaymentSelector } from '../../components/PaymentSelector';


export interface Item {
  id: string
  quantity: number
}
export interface Order {
  id: number
  items: CoffeeInCart[]
}

interface CoffeeInCart {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
  paymentMethod: "credito" | "debito" | "dinheiro" | "pix";
} 

const DELIVERY_PRICE = 3.75;

export function Cart() {
  const [coffeesInCart, setCoffeesInCart] = useState<CoffeeInCart[]>([
    {
      id: "0",
      title: "Expresso Tradicional",
      description: "O tradicional café feito com água quente e grãos moídos",
      tags: ["tradicional", "gelado"],
      price: 6.90,
      image: "/images/coffees/expresso.png",
      quantity: 1,
      subTotal: 6.90,
      paymentMethod: "credito"
    },
    {
      id: "1",
      title: "Expresso Americano",
      description: "Expresso diluído, menos intenso que o tradicional",
      tags: ["tradicional", "com leite"],
      price: 9.95,
      image: "/images/coffees/americano.png",
      quantity: 2,
      subTotal: 19.90,
      paymentMethod: "credito"
    },
    {
      id: "2",
      title: "Expresso Cremoso",
      description: "Café expresso tradicional com espuma cremosa",
      tags: ["especial"],
      price: 16.50,
      image: "/images/coffees/expresso-cremoso.png",
      quantity: 3,
      subTotal: 49.50,
      paymentMethod: "pix"
    }
  ]);
  
  const [paymentMethod, setPaymentMethod] = useState<"credito" | "debito" | "dinheiro" | "pix">("credito");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const amountTags: string[] = [];
  
  /** Adicionando os tags dos cafés no array amountTags
   * Se o tag já existir, não adiciona*/ 
  coffeesInCart.map(coffee => coffee.tags.map((tag) => {
    if (!amountTags.includes(tag)) {
      amountTags.push(tag);
    }
  }));
  
  // valor total dos cafés no carrinho
  const totalItemsPrice = coffeesInCart.reduce((currencyValue, coffee) => {
    return currencyValue + coffee.price * coffee.quantity
  }, 0)

  // função para calcular o total + ajuste de acordo com metodo de pagamento
  function getTotalWithPaymentAdjustment(
    baseTotal: number,
    method: "credito" | "debito" | "dinheiro" | "pix"
  ): number {
    switch (method) {
      case "credito":
        return baseTotal * 1.03; // +3%
      case "pix":
        return baseTotal * 0.95; // -5%
      default:
        return baseTotal; // débito ou dinheiro = sem alteração
      }
    }

    function handleConfirmOrder() {
      setOrderConfirmed(true);
    }    
  
  
  // variáveis para processo de pagamento
  const totalItemsPriceWithPaymentAdjustment = getTotalWithPaymentAdjustment(totalItemsPrice, paymentMethod);
  const deliveryTotal = DELIVERY_PRICE * amountTags.length;
  const finalTotal = totalItemsPriceWithPaymentAdjustment + deliveryTotal;


  
  function handleItemIncrement(itemId: string) {
    setCoffeesInCart((prevCoffeesInCart) =>
    prevCoffeesInCart.map((coffee) => {
      const isTarget = coffee.id === itemId;
      const canAdd = coffee.quantity < 5;
      const updatedQuantity = coffee.quantity + 1;
      const updatedSubtotal = coffee.price * (coffee.quantity + 1);

      if (isTarget && canAdd) {
        return { ...coffee, quantity: updatedQuantity, subTotal: updatedSubtotal}
      }
      return coffee;
    }))
  }

  function handleItemDecrement(itemId: string) {
    setCoffeesInCart((prevCoffeesInCart) =>
    prevCoffeesInCart.map((coffee) => {
      const isTarget = coffee.id === itemId;
      const canRemove = coffee.quantity > 1
      const updatedQuantity = coffee.quantity - 1;
      const updatedSubtotal = coffee.price * (coffee.quantity - 1);

      if (isTarget && canRemove) {
        return  { ...coffee, quantity: updatedQuantity, subTotal: updatedSubtotal };
      }
      return coffee;
    }))
  }

  function handleItemRemove(itemId: string) {
    setCoffeesInCart((prevCoffeesInCart) =>
      prevCoffeesInCart.filter((coffee) => 
        coffee.id != itemId))
  }
  
  return (
    <Container>

      <InfoContainer>
        <h2>Cafés selecionados</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>
                      <Tags>
                        {coffee.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </Tags>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Remover</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>R$ {coffee.subTotal?.toFixed(2)}</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total de itens</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(totalItemsPriceWithPaymentAdjustment)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(deliveryTotal)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(finalTotal)}
              </span>
            </div>
          </CartTotalInfo>

          {paymentMethod === "credito" && (
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              * Acréscimo de 3% por pagamento no crédito
            </p>
          )}
          {paymentMethod === "pix" && (
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              * Desconto de 5% aplicado por pagamento via Pix
            </p>
          )}


          <PaymentSelector selected={paymentMethod} onChange={setPaymentMethod} />
          <CheckoutButton
            type="button"
            onClick={handleConfirmOrder}
            disabled={orderConfirmed}
            style={{
              backgroundColor: orderConfirmed ? '#007BFF' : undefined,
              cursor: orderConfirmed ? 'not-allowed' : 'pointer'
            }}
          >
            {orderConfirmed ? 'Pedido confirmado!' : 'Confirmar pedido'}
          </CheckoutButton>

        </CartTotal>
      </InfoContainer>
    </Container>
  )
}
