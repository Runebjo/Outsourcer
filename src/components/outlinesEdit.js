import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Space, message } from 'antd';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from './../hooks/useForm';
import { useHttp } from './../hooks/useHttp';

export const OutlinesEdit = () => {
	const baseAddress = 'http://localhost:5000';
	const route = 'outlines';

	const [formValues, onChangeForm] = useForm({
		title: '',
		intro: '',
		outline: '',
		requirements: '',
		outro: '',
	});

	const { key } = useParams();
	const [form] = Form.useForm();
	const history = useHistory();

	const { url, setUrl } = useState('');
	const { data, loading } = useHttp(url);

	useEffect(() => {
		getOutline();
	});

	const { Option } = Select;

	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 24 },
	};

	const pageTitle = key ? 'Edit Outline' : 'Create Outline';

	async function getOutline() {
		if (key) {
			try {
				const outline = (await axios.get(`${baseAddress}/${route}/${key}`)).data;
				form.setFieldsValue(outline);
			} catch (error) {
				message.error('Failed to get template');
				console.log(error);
			}
		}
	}

	const templates = [
		{ id: 1, name: 'Response post' },
		{ id: 2, name: 'vs post' },
		{ id: 3, name: 'Best X from Y' },
	];

	const statuses = [
		{ id: 1, name: 'Unwritten' },
		{ id: 2, name: 'Waiting Response' },
		{ id: 3, name: 'In Progress' },
		{ id: 4, name: 'Published' },
	];

	const writers = [
		{ id: 1, name: 'Subho' },
		{ id: 2, name: 'Lalegarde' },
		{ id: 3, name: 'MonetizedSite' },
	];

	const onFinish = async outline => {
		try {
			if (key) {
				await axios.put(`${baseAddress}/${route}/edit/${key}`, outline);
			} else {
				await axios.post(`${baseAddress}/${route}/add`, outline);
			}
			history.push('/');
			message.success('Outline Saved!');
		} catch (error) {
			message.error('Error saving outline');
			console.log(error);
		}
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	function preview() {
		return (
			<div style={{ border: '1px solid #ccc', height: 430, padding: 10, whiteSpace: 'pre-wrap' }}>
				<p>{formValues.intro}</p>
				{formValues.title && (
					<p>
						Article Title:
						<br />
						{formValues.title}
					</p>
				)}
				{formValues.outline && (
					<p>
						About the article:
						<br />
						{formValues.outline}
					</p>
				)}
				{formValues.requirements && (
					<p>
						Requirements:
						<br />
						{formValues.requirements}
					</p>
				)}
				{formValues.outro && <p>{formValues.outro}</p>}
			</div>
		);
	}

	function onTemplateChange(key) {
		console.log('template change', key);
	}

	return (
		<>
			<h1 style={{ marginLeft: 38, marginBottom: 30 }}>{pageTitle}</h1>
			<Form
				{...layout}
				name='outline_form'
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Row gutter={24}>
					<Col span={12}>
						<Form.Item label='From Template' name='template'>
							<Select placeholder='Select a template' onChange={onTemplateChange} allowClear>
								{templates.map(t => {
									return (
										<Option key={t.id} value={t.id}>
											{t.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>

						<Form.Item
							label='Article Title'
							name='title'
							rules={[{ required: true, message: 'Please input an article title!' }]}>
							{/* <Input onChange={e => setTitle(e.target.value)} /> */}
							<Input name='title' onChange={onChangeForm} />
						</Form.Item>
						<Form.Item label='Intro' name='intro'>
							<Input.TextArea rows={4} onChange={onChangeForm} name='intro' />
						</Form.Item>
						<Form.Item label='Outline' name='outline'>
							<Input.TextArea rows={8} onChange={onChangeForm} name='outline' />
						</Form.Item>
						<Form.Item label='Requirements' name='requirements'>
							<Input.TextArea rows={4} onChange={onChangeForm} name='requirements' />
						</Form.Item>
						<Form.Item label='Outro' name='outro'>
							<Input.TextArea rows={4} onChange={onChangeForm} name='outro' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='Preview' name='preview'>
							{preview()}
						</Form.Item>
						<Form.Item label='Writer' name='writer'>
							<Select placeholder='Select Writer' allowClear>
								{writers.map(t => {
									return (
										<Option key={t.id} value={t.name}>
											{t.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
						<Form.Item label='Review Writer' name='review'>
							<Input.TextArea rows={4} />
						</Form.Item>
						<Form.Item label='Status' name='status'>
							<Select placeholder='Select Status' allowClear>
								{statuses.map(t => {
									return (
										<Option key={t.id} value={t.name}>
											{t.name}
										</Option>
									);
								})}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col span={24} style={{ textAlign: 'right' }}>
						<Form.Item>
							<Space size='middle'>
								<Button type='default' htmlType='button'>
									<Link to='/'>Cancel</Link>
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
