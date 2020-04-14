import React, { useEffect } from 'react';
import { Input, Modal, Checkbox, Form } from 'antd';

const FormItem = Form.Item;

export default (props: any) => {
    const { modalVisible, onSubmit, onCancel, initValues = {} } = props;
    const [form] = Form.useForm();
    const okHandle = (values: any) => {
        form.resetFields();
        onSubmit(values);
    };
    useEffect(() => {
        if (modalVisible) {
            if (initValues.id) {
                form.setFieldsValue(initValues);
            } else {
                form.resetFields();
            }
        }
    });
    return (
        <Modal
            destroyOnClose
            title="新建分类"
            visible={modalVisible}
            onOk={() => form.submit()}
            onCancel={() => onCancel()}
        >
            <Form form={form} onFinish={okHandle}>
                <FormItem name="id" style={{ display: 'none' }}>
                    <Input hidden />
                </FormItem>
                <FormItem
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 15 }}
                    label="分类名称"
                    name="name"
                    rules={[{ required: true, message: '分类名称不能为空！', min: 1 }]}
                >
                    <Input placeholder="请输入分类名称" />
                </FormItem>
                <FormItem
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 15 }}
                    label="状态"
                    name="isShowIcon"
                    valuePropName="checked"
                >
                    <Checkbox>是否显示Icon</Checkbox>
                </FormItem>
            </Form>
        </Modal>
    );
};
