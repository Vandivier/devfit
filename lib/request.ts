const ALLOWED_TIMEOUT = 1000;
const domain = process.env.NODE_ENV === 'production' ? 'https://devfit.now.sh/api' : 'http://localhost:8080/api';
const accessControlAllowOrigin = process.env.NODE_ENV === 'production' ? 'https://devfit.now.sh' : 'http://localhost:8080';

export const poster = (route: string, body: any) =>
    // timeout(
        fetch(domain + route, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: accessControlAllowOrigin,
            },
            body: JSON.stringify(body),
        })
    // );

export const getter = (route: string) =>
    // timeout(
        fetch(domain + route, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Origin: accessControlAllowOrigin,
            },
        })
    // );

// TODO: fix typing and use
// function timeout<T>(promise: T) <T|Error> {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             reject(new Error('timeout'));
//         }, ALLOWED_TIMEOUT);
//         promise.then(resolve, reject);
//     });
// }
