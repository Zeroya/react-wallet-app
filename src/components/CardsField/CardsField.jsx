import React, { useState, useEffect } from 'react';
import s from './CardsField.module.scss';
import { Button } from 'react-bootstrap';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setCards } from '../../redux/actions/productsActions';

const CardsField = () => {
  const [buttonTrecker, setButtonTrecker] = useState(true);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      "number": number,
      "name": name,
      "expiry": expiry,
      "cvc": cvc,
      "amount": amount,
      "currency": currency
    });
  }, [number, name, expiry, cvc, amount, currency])


  const dispatch = useDispatch();
  const restaurantSort = useSelector((state) => state.allProducts.products);

  const data = [
    {
      value: "UAH",
      label: "UAH"
    },
    {
      value: "EUR",
      label: "EUR"
    },
    {
      value: "USD",
      label: "USD"
    }
  ];

  const tryAll = () => {


    console.log(restaurantSort);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setCards(form));
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    setAmount("");
    setCurrency("");
    setButtonTrecker(!buttonTrecker);
  }

  return (
    <div className={s.groupForm}>
      {buttonTrecker ?
        <div>
          <div className={s.cardButtonPosition}>
            <Button onClick={() => setButtonTrecker(!buttonTrecker)} className="mx-3" size="lg" variant="warning">Додати картку</Button>
            <Button size="lg" variant="warning">Додати Готівку</Button>

          </div>
          <div style={{display:'flex', flexDirection:'column', marginBottom:'1em'}} className={s.cardButtonPosition}>
            {restaurantSort.map(el => {

              return (
                <div  style={{ marginBottom:'1em'}}>
                  <Cards
                    number={el.number}
                    name={el.name}
                    expiry={el.expiry}
                    cvc={el.cvc}
                    focused={el.focus}
                  />
                </div>
              )
            })}
          </div>
        </div>
        :
        <div>
          <h2 className={s.formCenterProvider}>Додавання картки</h2>

          <div  >
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
          </div>

          <form onSubmit={handleSubmit}>

            <div style={{ marginTop: '1em' }} className={s.formCenterProvider}>
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                value={number}
                maxlength="16"
                required
                pattern="[0-9]+"
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <div className={s.formCenterProvider}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                maxlength="10"
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <div className={s.formCenterProvider}>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={expiry}
                maxlength="4"
                required
                pattern="\d*"
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <div className={s.formCenterProvider}>
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                maxlength="3"
                required
                pattern="\d{3,4}"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </div>

            <div className={s.formCenterProvider}>
              <input type="tel" placeholder="amount" maxlength="5" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <div className={s.formCenterProvider} style={{ width: '7em', marginLeft: '58vh', marginTop: "0.7em" }} >
                <Select
                  defaultValue={currency}
                  onChange={setCurrency}
                  options={data}
                />
              </div>
            </div>


            <div className={s.formCenterProvider}>
              <Button type="submit" variant="warning">Додати картку</Button>
              <Button onClick={() => setButtonTrecker(!buttonTrecker)} className='mx-3 my-1' variant="danger">Скасувати</Button>
              <Button onClick={() => tryAll()} className='mx-3 my-1' variant="danger">Скe22e2e2eсувати</Button>
            </div>

          </form>

        </div>
      }
    </div>
  );
};

export default CardsField;