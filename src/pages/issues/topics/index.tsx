import { PlusOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Row, Tag, Checkbox, Col, Input, Button, Select } from 'antd';
import React, { useRef } from 'react';
import Switch from '@/components/Switch';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Link, history } from 'umi';
import { TableListItem } from './data';
import { fetchTopicList } from './service';
import { parseTime } from '../../../utils/time';
import styles from './index.module.scss';

export default () => {
    const actionRef = useRef<ActionType>();
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            render: (title: string, record: any) => (
                <Link to={`/topics/${record.id}`}>{title}</Link>
            ),
        },
        {
            title: '分类',
            dataIndex: 'tag',
            key: 'tag',
            width: 100,
            render: (_: string, record: any) => <Tag color="geekblue">{record.tag.name}</Tag>,
        },
        {
            title: '作者',
            dataIndex: 'user',
            key: 'user',
            width: 100,
            render: (_: string, record: any) => <span>{record.user.username}</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (text: string) => <span>{parseTime(text)}</span>,
        },
        {
            title: '精华',
            dataIndex: 'good',
            key: 'good',
            render: (good: boolean) => (
                <Switch
                    size="small"
                    checked={good}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                />
            ),
        },
        {
            title: '置顶',
            dataIndex: 'top',
            key: 'top',
            render: (top: boolean) => (
                <Switch
                    color="green"
                    size="small"
                    checked={top}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                />
            ),
        },
        {
            title: '锁定主题',
            dataIndex: 'locked',
            key: 'locked',
            render: (locked: boolean) => (
                <Switch
                    color="volcano"
                    size="small"
                    checked={locked}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    style={{ backgroundColor: 'volcano' }}
                />
            ),
        },
        { title: '浏览', dataIndex: 'visitCount', key: 'visitCount' },
        { title: '评论', dataIndex: 'replyCount', key: 'replyCount' },
        {
            title: '操作',
            key: 'operation',
            width: 50,
            render: (text: any, record: any) => (
                <div>
                    <Button
                        type="primary"
                        size="small"
                        style={{ marginBottom: 10 }}
                        onClick={() => history.push(`/content/topics/edit/${record.id}`)}
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
        <PageHeaderWrapper content="控制台---话题列表管理">
            <div className={styles.search}>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="标题"
                                name="title"
                                wrapperCol={{ span: 19 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入关键词" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="分类"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Select.Option value="jack">求助</Select.Option>
                                    <Select.Option value="lucy">分享</Select.Option>
                                    <Select.Option value="Yiminghe">灌水专区</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} style={{ width: 70, maxWidth: 'initial', flex: '0 1 auto' }}>
                            <Form.Item
                                name="good"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Checkbox>精华</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{ width: 70, maxWidth: 'initial', flex: '0 1 auto' }}>
                            <Form.Item
                                name="good"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Checkbox>置顶</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={3} style={{ width: 100, maxWidth: 'initial', flex: '0 1 auto' }}>
                            <Form.Item
                                name="good"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Checkbox>锁定主题</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Button type="primary" style={{ marginRight: 20 }}>
                            查询
                        </Button>
                        <Button>重置</Button>
                    </Row>
                </Form>
            </div>
            <ProTable<TableListItem>
                search={false}
                headerTitle="话题列表"
                actionRef={actionRef}
                rowKey="key"
                toolBarRender={() => [
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => history.push('/content/topics/edit')}
                    >
                        新建话题
                    </Button>,
                ]}
                tableAlertRender={(selectedRowKeys) => (
                    <div>
                        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                    </div>
                )}
                request={(params) => fetchTopicList(params)}
                columns={columns}
                rowSelection={{}}
            />
        </PageHeaderWrapper>
    );
};
