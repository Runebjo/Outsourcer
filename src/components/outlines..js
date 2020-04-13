import React, { useState } from 'react';
import { Dropdown, Button, Menu, Space, Table, Popconfirm, message } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Outlines = () => {

    const [dropdownText, setDropdownText] = useState('Filter Status');

    function handleMenuClick(e) {
        switch (e.key) {
            case "1":
                setDropdownText('Unwritten');
                break;
            case "2":
                setDropdownText('Waiting Response');
                break;
            case "3":
                setDropdownText('In Progress');
                break;
            case "4":
                setDropdownText('Published');
                break;
            default:
                setDropdownText('Filter Status');
                break;
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                Unwritten
          </Menu.Item>
            <Menu.Item key="2">
                Waiting Response
          </Menu.Item>
            <Menu.Item key="3">
                In Progress
          </Menu.Item>
            <Menu.Item key="4">
                Published
          </Menu.Item>
        </Menu>
    );

    function createOutline() {
        console.log("TODO: Create outline");
    }

    function editOutline(key) {
        console.log("Edit outline", key);
    }

    function confirmDelete(key) {
        const newData = data.filter(d => d.key !== key);
        setData(newData);
        message.success("Outline Deleted");
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
                    <Button type="link" onClick={() => editOutline(record.key)} icon={<EditOutlined />} />
                    <Popconfirm
                        title={`Are you sure you want to delete the outline: "${record.title}?"`}
                        onConfirm={() => confirmDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </span >
            )
        }
    ];

    const [data, setData] = useState([
        {
            key: 1,
            title: 'Should you use Headphones for Video Interviews?',
            publishedDate: '21/3-2020',
            writer: 'Subho',
            status: 'In Progress'
        },
        {
            key: 2,
            title: 'sony wh-1000xm3 vs sony wh-xb900n (Which to buy?)',
            publishedDate: '28/3-2020',
            writer: 'Lalegarde',
            status: 'Published'
        }
    ]);


    return (
        <div>
            <Space size="large">
                <Dropdown overlay={menu}>
                    <Button>
                        {dropdownText} <DownOutlined />
                    </Button>
                </Dropdown>
                <Button type="primary" onClick={createOutline}>Create Outline</Button>
            </Space>
            <Table columns={columns} dataSource={data} style={{ marginTop: 25 }}></Table>
        </div>
    )
}
