import React, { useState } from 'react'
import { Form, Input, Button, Dropdown, Row, Col, Space } from 'antd';

export const OutlinesEdit = () => {

    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [outline, setOutline] = useState('');
    const [requirements, setRequirements] = useState('');
    const [outro, setOutro] = useState('');

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    function preview() {
        console.log("preview");
        return (
            <div style={{ border: '1px solid #ccc', height: 430, padding: 10, whiteSpace: 'pre-wrap' }}>
                <p>{intro}</p>
                {title && <p>Article Title:<br />{title}</p>}
                {outline && <p>About the article:<br />{outline}</p>}
                {requirements && <p>Requirements:<br />{requirements}</p>}
                {outro && <p>{outro}</p>}
            </div>
        )
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
                    <Col span={12}>
                        <Form.Item
                            label="From Template"
                            name="template"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Article Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input an article title!' }]}
                        >
                            <Input onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Intro"
                            name="intro"
                        >
                            <Input.TextArea rows={4} onChange={(e) => setIntro(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Outline"
                            name="outline"
                        >
                            <Input.TextArea rows={8} onChange={(e) => setOutline(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Requirements"
                            name="requirements"
                        >
                            <Input.TextArea rows={4} onChange={(e) => setRequirements(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Outro"
                            name="outro"
                        >
                            <Input.TextArea rows={4} onChange={(e) => setOutro(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Preview"
                            name="preview"
                        >
                            {/* <Input.TextArea rows={13} disabled value={title} /> */}
                            {preview()}
                        </Form.Item>
                        <Form.Item
                            label="Writer"
                            name="writer"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Review Writer"
                            name="review"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <Space size="middle">
                                <Button type="default" htmlType="button">
                                    Cancel
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
