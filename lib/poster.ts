export const poster = (route: string, body: any) =>
  fetch('/api' + route, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
