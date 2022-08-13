import React, { useState, useEffect } from 'react';
import s from './CardsField.module.scss';
import ModalWindow from '../ModalWindow';
import { Button } from 'react-bootstrap';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, cardDelete } from '../../redux/actions/productsActions';

const CardsField = () => {
  const [buttonTrecker, setButtonTrecker] = useState(true);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [issuer, setIssuer] = useState("visa");

  const [form, setForm] = useState({});



  useEffect(() => {
    setForm({
      "number": number,
      "name": name,
      "expiry": expiry,
      "cvc": cvc,
      "amount": amount,
      "currency": currency,
      "issuer": issuer
    });
    console.log(issuer)
  }, [number, name, expiry, cvc, amount, currency, issuer])


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


  const handleCallback = ({ issuer }) => {

    setIssuer(issuer);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setCards(form));
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    setAmount("");
    setCurrency("");
    setIssuer("");
    setButtonTrecker(!buttonTrecker);
  }

  const deleteCard = (el) => {
    dispatch(cardDelete(el));
  }

  return (
    <div className={s.groupForm}>
      {buttonTrecker ?
        <div>
          <div className={s.cardButtonPosition}>
            <Button onClick={() => setButtonTrecker(!buttonTrecker)} className="mx-3" size="lg" variant="warning">Додати картку</Button>
            <ModalWindow name="Додати готівку" size={"lg"}/>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }} className={s.cardButtonPosition}>
            {restaurantSort.map(el => {

              return (
                <div key={el.number} style={{ marginBottom: '1em', display: 'flex', alignItems: 'center' }}>
                  <div className={s.card}>
                    <Cards
                      number={el.number}
                      name={el.name}
                      expiry={el.expiry}
                      cvc={el.cvc}
                      focused={el.focus}
                    />
                  </div>
                  <div>
                    <Button className={s.cardButton} onClick={() => deleteCard(el)} variant="danger">Видалити</Button>
                    <div>
                      <h5 style={{marginLeft:'2.3em', marginTop:'0.5em'}} className={s.cardButton}>На рахунку :
                        <br />
                        {el.amount} {el.currency.value}
                      </h5>
                    </div>
                  </div>
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
              callback={handleCallback}
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
              <input type="tel" placeholder="amount" required maxlength="5" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <div className={s.formCenterProvider} style={{ width: '7em', marginLeft: '58vh', marginTop: "0.7em" }} >
                <Select
                  defaultValue={currency}
                  onChange={setCurrency}
                  options={data}
                />
              </div>
            </div>

            <input type="hidden" name="issuer" value={issuer} />
            <div className={s.formCenterProvider}>
              <Button type="submit" variant="warning">Додати картку</Button>
              <Button onClick={() => setButtonTrecker(!buttonTrecker)} className='mx-3 my-1' variant="danger">Скасувати</Button>
            </div>

          </form>

        </div>
      }
    </div>
  );
};

export default CardsField;