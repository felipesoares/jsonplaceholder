import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

import API from '../../providers/jsonplaceholder.providers';
import { Link } from 'react-router-dom';
import Users from '../../components/Users';

export function Posts(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [posts, setPosts] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts(userId?: number) {
    setLoading(true);

    API.getPosts(null, userId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(function (data) {
              setPosts(data);
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

  function filterPostsByUser(userId: number) {
    getPosts(userId);
  }

  return (
    <div className="starter-template">
      <div className="text-center">
        <h1>Posts</h1>
        <p className="lead">Listagem de Posts</p>
      </div>

      <Users eventChange={filterPostsByUser} />

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      )}

      {!loading && posts && (
        <div>
          <ul className="list-group list-group-flush">
            {posts.length ? (
              posts.map((item: any, index: any) => (
                <li key={item.id} className="list-group-item">
                  <Link to={`/posts/${item.id}`} className="nav-link">
                    {item.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="list-group-item">Sem registros</li>
            )}
          </ul>
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
export default Posts;
