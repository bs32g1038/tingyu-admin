import request from '@/utils/request';
import { coverResultToProTableData } from '@/utils/utils';
import { gql } from 'apollo-boost';
import apolloClient from '@/apollo/apollo.client';
import { TableListParams } from './data';

export async function fetchCategoryList() {
    return apolloClient
        .query({
            query: gql`
                {
                    tags {
                        id
                        name
                        icon
                        topicCount
                        description
                        displayOrder
                        isShowIcon
                    }
                }
            `,
        })
        .then((res) => {
            return coverResultToProTableData(res.data.tags);
        });
}

export async function fetchCategoryById(id: string) {
    return apolloClient
        .query({
            variables: {
                id,
            },
            query: gql`
                query($id: String!) {
                    tag(id: $id) {
                        id
                        name
                        icon
                        topicCount
                        description
                        displayOrder
                    }
                }
            `,
        })
        .then((res) => {
            return res.data.tag;
        });
}

export async function addCategory(params: TableListParams) {
    return request('/api/admin/categories', {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateCategory(params: TableListParams) {
    return request('/api/admin/categories', {
        method: 'PUT',
        data: {
            ...params,
            method: 'update',
        },
    });
}
