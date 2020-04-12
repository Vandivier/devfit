
// TODO: switch prefixing using if (process.env.NODE_ENV !== 'production') {
    // local is http://localhost:8080/api/tags
    // prod is https://devfit.now.sh/api/login
export const poster = (route: string, body: any) =>
  fetch('/api' + route, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });


  export const getter = (route: string) =>
  fetch('/api' + route, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
