import axios from 'axios';

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config) => {
    config.headers = config.headers || {};

    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === "get") {
        delete config.headers["Content-Type"];
    }

    return config;
};

$authHost.interceptors.request.use(authInterceptor);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

$authHost.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return $authHost(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refresh_token");

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    new URLSearchParams({ refresh_token: refreshToken }),
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                );

                const { access_token, refresh_token } = response.data;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("refresh_token", refresh_token);

                processQueue(null, access_token);
                isRefreshing = false;

                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return $authHost(originalRequest);
            } catch (err) {
                processQueue(err, null);
                isRefreshing = false;
                localStorage.clear();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export { $host, $authHost };