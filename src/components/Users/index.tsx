import React, { useState, useEffect } from 'react';

import styles from './Users.module.scss';

import API from '../../providers/jsonplaceholder.providers';

function Users(props: any) {
  const { eventChange } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    setLoading(true);

    API.getUsers()
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(function (data) {
              setUsers(data);
            });
          } else {
            setError(`Formato inválido na resposta da requisição :(`);
          }
        } else {
          setError(`Bad request :(`); // Erro na requisição.
        }

        setLoading(false);
      })
      .catch(function (error) {
        setError(`Erro ao tentar processar a requisição :(`); // Erro na requisição.

        setLoading(false);
      });
  }

  return (
    <div className={styles.users}>
      <select
        className="custom-select custom-select-lg mb-3"
        onChange={(e) => eventChange(e.target.value)}
      >
        <option value="">
          {loading && 'Carregando...'}
          {!loading && users && 'Todos os usuários'}
          {!loading && !users && !error && 'Sem registros'}
          {error && '' + error}
        </option>

        {!loading &&
          users &&
          users.length &&
          users.map((item: any, index: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Users;
