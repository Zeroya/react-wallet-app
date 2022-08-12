import React from 'react';
import s from './BalanceField.module.scss';
import { Button } from 'react-bootstrap';

const BalanceField = () => {
  return (<div className={s.groupForm}>
    
    <div >
      <div>
        <h2>Баланс</h2>
        <p>- 0 UAH</p>
      </div>
    </div>

    <div style={{ marginTop: '2em' }} className={s.blockButton}>
      <div >
        <h2>Готівка</h2>
        <p>- 0 UAH</p>
      </div>
      <div className={s.buttonModifier}>
        <Button variant="warning">Редагувати</Button>
      </div>
    </div>

  </div>
  );
};

export default BalanceField;