import request from '@/utils/request';
import { coverResultToProTableData } from '@/utils/utils';
import { gql } from 'apollo-boost';
import apolloClient from '@/apollo/apollo.client';
import { TableListParams } from './data';

export async function fetchTopicList(params?: TableListParams) {
    return apolloClient
        .query({
            variables: {
                page: params?.currentPage || 1,
                limit: params?.pageSize || 10,
            },
            query: gql`
                query($page: Int, $limit: Int) {
                    pagedTopics(page: $page, limit: $limit) {
                        results {
                            id
                            title
                            top
                            good
                            locked
                            visitCount
                            replyCount
                            collectCount
                            type
                            createdAt
                            tag {
                                id
                                name
                            }
                            user {
                                id
                                account
                                username
                            }
                        }
                        paging {
                            currentPage
                            itemsPerPage
                            totalItems
                        }
                    }
                }
            `,
        })
        .then((res) => {
            return coverResultToProTableData(res.data.pagedTopics);
        });
}

export async function removeRule(params: { key: number[] }) {
    return request('/api/rule', {
        method: 'POST',
        data: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params: TableListParams) {
    return request('/api/rule', {
        method: 'POST',
        data: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateRule(params: TableListParams) {
    return request('/api/rule', {
        method: 'POST',
        data: {
            ...params,
            method: 'update',
        },
    });
}
