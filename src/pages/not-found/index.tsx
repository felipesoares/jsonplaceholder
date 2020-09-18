import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';

export function NotFound(props: any) {
  return (
    <div className="starter-template">
      {/* <Helmet>
        <title>Página não encontrada</title>
      </Helmet> */}
      <div className="text-center">
        <h1>Error 404</h1>
        <p className="lead">Página não encontrada</p>
      </div>
    </div>
  );
}

export default NotFound;
