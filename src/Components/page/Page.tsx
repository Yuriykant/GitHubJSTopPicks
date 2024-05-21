import React from 'react';
import { Slider } from '@features/slider/comonents/Slider';
import './Page.css';

export const Page = () => {
  return (
    <div className="page container">
      <h1 className="page__title">Топ популярных javascript репозиториев</h1>
      <Slider />
    </div>
  );
};
