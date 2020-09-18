import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

import API from '../../providers/jsonplaceholder.providers';
import { Link } from 'react-router-dom';

export function PostsDetail(props: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [album, setAlbum] = useState();
  const [photos, setPhotos] = useState();

  useEffect(() => {
    let albumId = props.match.params.id;

    if (albumId) {
      getAlbums(albumId);
      getPhotosAlbum(albumId);
    }
  }, []);

  function getAlbums(albumId: number) {
    setLoading(true);

    API.getAlbums(albumId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            response.json().then(function (data) {
              setAlbum(data);
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

  function getPhotosAlbum(albumId: number) {
    API.getPhotosAlbum(albumId)
      .then(function (response) {
        if (response.ok) {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(function (data) {
              setPhotos(data);
            });
          } else {
            setError(`Formato inválido na resalbuma da requisição :(`);
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
            <Link to={`/albums`}>
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

      {!loading && album && (
        <div>
          <div className="mb-4">
            <h1>{album.title}</h1>
          </div>

          {photos && photos.length && (
            <div className="row">
              {photos.map((item: any, index: any) => (
                <div key={item.id} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    {/* bd-placeholder-img card-img-top */}

                    <img src={item.thumbnailUrl} alt={item.title} />

                    <div className="card-body">
                      <p className="card-text">{item.title}</p>
                    </div>
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
