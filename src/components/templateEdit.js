import React from 'react'
import { Form, Input, Button, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';

export const TemplateEdit = () => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };

    function onFinish(e) {
        console.log(e);
    }

    function onFinishFailed(e) {
        console.log(e);
    }

    return (
        <>
            <h1 style={{ marginLeft: 38, marginBottom: 30 }}>Create Outline</h1>
            <Form
                {...layout}
                name="advanced_search"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={24}>
                    <Col offset={4} span={12}>
                        <Form.Item
                            label="Intro"
                            name="intro"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Outline"
                            name="outline"
                        >
                            <Input.TextArea rows={8} />
                        </Form.Item>
                        <Form.Item
                            label="Requirements"
                            name="requirements"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Outro"
                            name="outro"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col offset={4} span={12} style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <Space size="middle">
                                <Button type="default" htmlType="button">
                                    <Link to="/">Cancel</Link>
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
