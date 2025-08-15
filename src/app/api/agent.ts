import axios, {type AxiosError, type AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {router} from '../router/Routes';
import {PaginatedResponse} from "../models/pagination.ts";
import {store} from "../store/configureStore.ts";

// import from 'react-toastify/'
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list: (params: URLSearchParams) => requests.get('product', params),
    details: (id: number) => requests.get(`product/${id}`),
    fetchFilters: () => requests.get(`product/filters`),
};

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity: number) =>
        requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    details: (id: number) => requests.get(`basket/${id}`),
    removeItem: (productId: number, quantity: number) =>
        requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

const Checkout = {
    list: () => requests.get('checkout'),
};

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
                      return response;
        }
        return response;
    },
    (error: AxiosError) => {
        const {data, status, statusText} = error.response as AxiosResponse;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title || statusText);
                break;
            case 404:
                router.navigate('/not-found', {state: {error: data}});
                break;
            case 500:
                router.navigate('/server-error', {state: {error: data}});
                break;
            default:
                break;
        }

        return Promise.reject(error.response);
    },
);

const TestError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
    Catalog,
    Basket,
    Checkout,
    TestError,
    Account,
};

export default agent;
