export default class API {
  static getUsers(): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/users`;

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }

  static getPosts(id?: any, userId?: number): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/posts`;

    if (id) {
      url += `/${id}`;
    }
    if (userId) {
      url += `?userId=${userId}`;
    }

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }

  static getCommentsPost(postId: number): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }

  static getAlbums(id?: any, userId?: number): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/albums`;

    if (id) {
      url += `/${id}`;
    }
    if (userId) {
      url += `?userId=${userId}`;
    }

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }

  static getPhotosAlbum(albumId: number): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }

  static getTodos(userId?: number): Promise<Response> {
    let url = `https://jsonplaceholder.typicode.com/todos`;

    if (userId) {
      url += `?userId=${userId}`;
    }

    return fetch(url, {
      method: 'GET',
      headers: {},
      cache: 'default',
    });
  }
}
