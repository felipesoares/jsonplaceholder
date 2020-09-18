import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

import API from '../../providers/jsonplaceholder.providers';
import { Link } from 'react-router-dom';
import { Users } from '../../components';

export function Todos(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [todos, setTodos] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos(userId?: number) {
    setLoading(true);

    API.getTodos(userId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(function (data) {
              setTodos(data);
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

  function filterTodosByUser(userId: number) {
    getTodos(userId);
  }

  return (
    <div className="starter-template">
      <div className="text-center">
        <h1>Todos</h1>
        <p className="lead">Listagem de Todos</p>
      </div>

      <Users eventChange={filterTodosByUser} />

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      )}

      {!loading && todos && (
        <div>
          <ol className={`${styles.listaOrdenada} list-group list-group-flush`}>
            {todos.length ? (
              todos.map((item: any, index: any) => (
                <li key={item.id} className="list-group-item">
                  {item.completed ? <s>{item.title}</s> : item.title}
                </li>
              ))
            ) : (
              <li className="list-group-item">Sem registros</li>
            )}
          </ol>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
export default Todos;
