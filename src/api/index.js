import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
}

export function login(query){
    return request({
        url: '/admin/login',
        method: 'post',
        params: query
    });
}

export function userList(query){
    return request({
        url: '/user/userList',
        method: 'get',
        params: query
    });
}

export function deleteUser(query){
    return request({
        url: '/user/deleteUser',
        method: 'post',
        params: query
    });
}

export function orderList(query){
    return request({
        url: '/admin/order/orderList',
        method: 'get',
        params: query
    });
}