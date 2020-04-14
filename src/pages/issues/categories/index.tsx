import { PlusOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { parseTime } from '@/utils/time';
import { getResultFromFetchResponse } from '@/utils/utils';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import EditForm from './edit-form';
import { TableListItem } from './data';
import { fetchCategoryList, addCategory, fetchCategoryById, updateCategory } from './service';

export default () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [editDataLoading, setEditDataLoading] = useState<string>('');
    const [initModalValue, setInitModalValue] = useState({});

    const actionRef = useRef<ActionType>();

    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            width: 100,
        },
        {
            title: '排序',
            dataIndex: 'displayOrder',
            key: 'displayOrder',
            width: 80,
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (text) => parseTime(text),
        },
        {
            title: '操作',
            key: 'operation',
            width: 180,
            render: (text, record) => (
                <div>
                    <Button
                        loading={editDataLoading === record.id}
                        type="primary"
                        size="small"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            setEditDataLoading(record.id);
                            fetchCategoryById(record.id).then((data) => {
                                setInitModalValue(data);
                                handleModalVisible(true);
                                setEditDataLoading('');
                            });
                        }}
                    >
                        编辑
                    </Button>
                    <Button type="primary" size="small" danger>
                        删除
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <PageHeaderWrapper content="控制台---分类列表管理">
            <ProTable<TableListItem>
                search={false}
                headerTitle="分类列表"
                actionRef={actionRef}
                rowKey={(item: any) => item.id}
                toolBarRender={() => [
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setInitModalValue({});
                            handleModalVisible(true);
                        }}
                    >
                        新建分类
                    </Button>,
                ]}
                tableAlertRender={(selectedRowKeys) => (
                    <div>
                        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                    </div>
                )}
                request={(params) => fetchCategoryList(params)}
                columns={columns}
                rowSelection={{}}
            />
            <EditForm
                initValues={initModalValue}
                onSubmit={async (values) => {
                    if (values.id) {
                        return updateCategory(values).then((res) => {
                            handleModalVisible(false);
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        });
                    }
                    addCategory(values).then((res) => {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    });
                }}
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
            />
        </PageHeaderWrapper>
    );
};
