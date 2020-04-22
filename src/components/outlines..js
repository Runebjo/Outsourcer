import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu, Space, Table, Popconfirm, message } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Outlines = () => {
	const baseAddress = 'http://localhost:5000';
	const route = 'outlines';

	const [dropdownText, setDropdownText] = useState('Filter Status');
	const [data, setData] = useState([]);

	useEffect(() => {
		getOutlines();
	}, []);

	async function getOutlines(status) {
		try {
			const url = status ? `${baseAddress}/${route}/?status=${status}` : `${baseAddress}/${route}`;
			const outlines = (await axios.get(url)).data.map(t => {
				return { key: t._id, title: t.title, writer: t.writer, status: t.status };
			});
			console.log(outlines);
			setData(outlines);
		} catch (error) {
			message.error('Error getting templates');
			console.log(error);
		}
	}

	function handleMenuClick(e) {
		switch (e.key) {
			case '1':
				setDropdownText('Unwritten');
				getOutlines('Unwritten');
				break;
			case '2':
				setDropdownText('Waiting Response');
				getOutlines('Waiting Response');
				break;
			case '3':
				setDropdownText('In Progress');
				getOutlines('In Progress');
				break;
			case '4':
				setDropdownText('Published');
				getOutlines('Published');
				break;
			case '5':
				setDropdownText('All');
				getOutlines();
				break;
			default:
				setDropdownText('Filter Status');
				break;
		}
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key='1'>Unwritten</Menu.Item>
			<Menu.Item key='2'>Waiting Response</Menu.Item>
			<Menu.Item key='3'>In Progress</Menu.Item>
			<Menu.Item key='4'>Published</Menu.Item>
			<Menu.Item key='5'>All</Menu.Item>
		</Menu>
	);

	async function confirmDelete(key) {
		try {
			await axios.delete(`${baseAddress}/${route}/delete/${key}`);
			await getOutlines();
			message.success('Outline Deleted');
		} catch (error) {
			console.log('error on delete', error);
			message.success('Error deleting outline');
		}
	}

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Published Date',
			dataIndex: 'publishedDate',
			key: 'publishedDate',
		},
		{
			title: 'Writer',
			dataIndex: 'writer',
			key: 'writer',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<span>
					<Link to={`/outlines/edit/${record.key}`}>
						<EditOutlined style={{ fontSize: 16 }} />
					</Link>
					<Popconfirm
						title={`Are you sure you want to delete the outline: "${record.title}?"`}
						onConfirm={() => confirmDelete(record.key)}
						okText='Yes'
						cancelText='No'>
						<Button type='link' icon={<DeleteOutlined />} />
					</Popconfirm>
				</span>
			),
		},
	];

	return (
		<div>
			<Space size='large'>
				<Dropdown overlay={menu}>
					<Button>
						{dropdownText} <DownOutlined />
					</Button>
				</Dropdown>
				<Button type='primary'>
					<Link to='/outlines/edit/'>Create Outline</Link>
				</Button>
			</Space>
			<Table columns={columns} dataSource={data} style={{ marginTop: 25 }}></Table>
		</div>
	);
};
