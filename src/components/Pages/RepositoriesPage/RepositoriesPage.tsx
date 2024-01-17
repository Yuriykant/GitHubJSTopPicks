import React from 'react';
import { RepositoryGallery } from '@features/repositories/components/RepositoryGallery/RepositoryGallery';
import './RepositoriesPage.css';
export const RepositoriesPage = () => {
  return (
    <div className="repositories-page">
      <div className="repositories-page__children-container">
        <h1 className="repositories-page__title">Топ популярных javascript репозиториев</h1>
        <RepositoryGallery />
      </div>
    </div>
  );
};
