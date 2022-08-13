import React from 'react';
import s from './BalanceField.module.scss';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../ModalWindow';

const BalanceField = () => {


  const dispatch = useDispatch();
  const cashAll = useSelector((state) => state.allProducts.cash);
  const cardsArr = useSelector((state) => state.allProducts.products);

  const wholeAmount = cashAll.concat(cardsArr);
  const filteredByUAH = wholeAmount.filter((el) => el.currency.value === "UAH").reduce((total, acc) => total + Number(acc.amount), 0);
  const filteredByEUR = wholeAmount.filter((el) => el.currency.value === "EUR").reduce((total, acc) => total + Number(acc.amount), 0);
  const filteredByUSD = wholeAmount.filter((el) => el.currency.value === "USD").reduce((total, acc) => total + Number(acc.amount), 0);

  const cashObj = [
    { amount: filteredByUAH, currency: { value: 'UAH' } },
    { amount: filteredByEUR, currency: { value: 'EUR' } },
    { amount: filteredByUSD, currency: { value: 'USD' } }];

  return (<div className={s.groupForm}>

    <div className={s.textBody}>

      <div >
        <div>
          <h2>Баланс</h2>
          {cashObj[0] || cashObj[1] || cashObj[2] ? cashObj.map((el) => {
            return (
              <p id={el.amount}>- {el.amount} {el.currency.value}</p>
            )
          }) : <div>
            <p>- 0 UAH</p>
          </div>
          }
        </div>
      </div>

      <div style={{ marginTop: '2em' }} className={s.blockButton}>
        <div >
          <h2>Готівка</h2>
          {cashAll[0] || cashAll[1] || cashAll[2] ? cashAll.map((el) => {
            return (
              <p id={el.amount}>- {el.amount} {el.currency.value}</p>
            )
          }) : <div>
            <p>- 0 UAH</p>
            <p>- 0 EUR</p>
            <p>- 0 USD</p>
          </div>
          }
        </div>
        <div className={s.buttonModifier}>
          <ModalWindow name="Редагувати" size={"md"} />
        </div>
      </div>

      <div style={{ marginTop: '2em' }} >
        {cardsArr[0] && <h2>Мої картки</h2>}
        {cardsArr && cardsArr.map((el) => {
          return (
            <div className={s.blockButton} style={{ marginBottom: "1em" }}>
              <div>- {el.issuer} {el.amount} {el.currency.value}</div>
              <div className={s.buttonModifier}>
                <ModalWindow name="Редагувати" size={"md"} />
              </div>
            </div>
          )
        })}
      </div>

    </div>

  </div>
  );
};

export default BalanceField;