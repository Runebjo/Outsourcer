import React, { useState, useEffect } from 'react'
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Templates = () => {

    const baseAddress = 'http://localhost:5000';
    const route = 'templates';

    const [data, setData] = useState([]);

    useEffect(() => {
        getTemplates();
    }, [])

    async function getTemplates() {
        try {
            const templates = (await axios.get(`${baseAddress}/${route}`)).data.map(t => {
                return { key: t._id, name: t.name };
            });
            setData(templates);

        } catch (error) {
            message.error('Error getting templates');
            console.log(error);
        }
    }

    async function confirmDelete(key) {
        try {
            await axios.delete(`${baseAddress}/${route}/delete/${key}`);
            await getTemplates();
        } catch (error) {
            console.log("error on delete", error);
        }
        message.success("Template Deleted");
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <span style={{ float: 'right' }}>
                    <Link to={`/templates/edit/${record.key}`}>
                        <EditOutlined style={{ fontSize: 16 }} />
                    </Link>
                    <Popconfirm
                        title={`Are you sure you want to delete the template: "${record.name}?"`}
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

    return (
        <div>
            <Button type="primary">
                <Link to="/templates/edit/">Create Template</Link>
            </Button>
            <Table columns={columns} dataSource={data} style={{ marginTop: 25 }}></Table>
        </div>
    )
}