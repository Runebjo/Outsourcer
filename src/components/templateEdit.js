import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Space, message } from 'antd';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export const TemplateEdit = () => {
	const baseAddress = 'http://localhost:5000';
	const route = 'templates';

	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 24 },
	};

	const { key } = useParams();
	const [form] = Form.useForm();
	const history = useHistory();

	useEffect(() => {
		getTemplate();
	});

	const pageTitle = key ? 'Edit Template' : 'Create Template';

	async function getTemplate() {
		if (key) {
			try {
				const template = (await axios.get(`${baseAddress}/${route}/${key}`)).data;
				form.setFieldsValue(template);
			} catch (error) {
				message.error('Failed to get template');
				console.log(error);
			}
		}
	}

	async function onFinish(template) {
		if (key) {
			await axios.put(`${baseAddress}/${route}/edit/${key}`, template);
		} else {
			await axios.post(`${baseAddress}/${route}/add`, template);
		}
		history.push('/templates');
		message.success('Templated Saved!');
	}

	function onFinishFailed(e) {
		console.log(e);
		message.error('Error saving template');
	}

	return (
		<>
			<Row gutter={24}>
				<Col offset={6} span={12}>
					<h1 style={{ marginBottom: 30 }}>{pageTitle}</h1>
				</Col>
			</Row>
			<Form
				{...layout}
				form={form}
				name='template_form'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Row gutter={24}>
					<Col offset={4} span={12}>
						<Form.Item
							label='Name'
							name='name'
							rules={[{ required: true, message: 'Please input template name!' }]}>
							<Input />
						</Form.Item>
						<Form.Item label='Intro' name='intro'>
							<Input.TextArea rows={4} />
						</Form.Item>
						<Form.Item label='Outline' name='outline'>
							<Input.TextArea rows={8} />
						</Form.Item>
						<Form.Item label='Requirements' name='requirements'>
							<Input.TextArea rows={4} />
						</Form.Item>
						<Form.Item label='Outro' name='outro'>
							<Input.TextArea rows={4} />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col offset={4} span={12} style={{ textAlign: 'right' }}>
						<Form.Item>
							<Space size='middle'>
								<Button type='default' htmlType='button'>
									<Link to='/templates'>Cancel</Link>
								</Button>
								<Button type='primary' htmlType='submit'>
									Save
								</Button>
							</Space>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
};
