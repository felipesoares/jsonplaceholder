import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

import API from '../../providers/jsonplaceholder.providers';
import { Link } from 'react-router-dom';

export function PostsDetail(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    let postId = props.match.params.id;

    if (postId) {
      getPosts(postId);
      getCommentsPost(postId);
    }
  }, []);

  function getPosts(postId: number) {
    setLoading(true);

    API.getPosts(postId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(function (data) {
              setPost(data);
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

  function getCommentsPost(postId: number) {
    API.getCommentsPost(postId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(function (data) {
              setComments(data);
            });
          } else {
            setError(`Formato inválido na resposta da requisição :(`);
          }
        } else {
          setError(`Bad request :(`); // Erro na requisição.
        }
      })
      .catch(function (error) {
        setError(`Erro ao tentar processar a requisição :(`); // Erro na requisição.
      });
  }

  return (
    <div className="starter-template">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/posts`}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>{' '}
              Voltar
            </Link>
          </li>
        </ol>
      </nav>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      )}

      {!loading && post && (
        <div>
          <div>
            <h1>{post.title}</h1>
            <p className="lead">{post.body}</p>
          </div>

          {comments && comments.length && (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">
                Comentários
              </h6>

              {comments.map((item: any, index: any) => (
                <div key={item.id} className="media text-muted pt-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 16 16"
                    className="bi bi-person-circle mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                    <path
                      fill-rule="evenodd"
                      d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                    />
                  </svg>

                  <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <strong className="text-gray-dark">
                        {item.name} ({item.email})
                      </strong>
                    </div>
                    <span className="d-block">{item.body}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
export default PostsDetail;
