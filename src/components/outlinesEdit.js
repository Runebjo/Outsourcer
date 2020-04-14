import React, { useState } from 'react'
import { Form, Input, Button, Select, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';

export const OutlinesEdit = () => {

    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [outline, setOutline] = useState('');
    const [requirements, setRequirements] = useState('');
    const [outro, setOutro] = useState('');

    const { Option } = Select;

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };

    const templates = [
        { id: 1, name: "Response post" },
        { id: 2, name: "vs post" },
        { id: 3, name: "Best X from Y" }
    ]

    const statuses = [
        { id: 1, name: "Unwritten" },
        { id: 2, name: "Waiting Response" },
        { id: 3, name: "In Progress" },
        { id: 4, name: "Published" }
    ]

    const writers = [
        { id: 1, name: "Subho" },
        { id: 2, name: "Lalegarde" },
        { id: 3, name: "MonetizedSite" }
    ]

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

    function onTemplateChange(key) {
        console.log("template change", key);
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
                            <Select
                                placeholder="Select a template"
                                onChange={onTemplateChange}
                                allowClear
                            >
                                {templates.map(t => {
                                    return <Option key={t.id} value={t.id}>{t.name}</Option>
                                })}
                            </Select>
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
                            {preview()}
                        </Form.Item>
                        <Form.Item
                            label="Writer"
                            name="writer"
                        >
                            <Select
                                placeholder="Select Writer"
                                allowClear
                            >
                                {writers.map(t => {
                                    return <Option key={t.id} value={t.name}>{t.name}</Option>
                                })}
                            </Select>
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
                            <Select
                                placeholder="Select Status"
                                allowClear
                            >
                                {statuses.map(t => {
                                    return <Option key={t.id} value={t.name}>{t.name}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} style={{ textAlign: 'right' }}>
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
