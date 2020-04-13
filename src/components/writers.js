import React, { useState } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Writers = () => {

    function createWriter() {
        console.log("Create Writer");
    }

    function editWriter(key) {
        console.log("Edit Writer", key);
    }

    function confirmDelete(key) {
        const newData = data.filter(d => d.key !== key);
        setData(newData);
        message.success("Outline Deleted");
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
                    <Button type="link" onClick={() => editWriter(record.key)} icon={<EditOutlined />} />
                    <Popconfirm
                        title={`Are you sure you want to delete the writer: "${record.name}?"`}
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
            name: 'Subho'
        },
        {
            key: 2,
            name: 'Lalagarde'
        }
    ]);

    return (
        <div>
            <Button type="primary" onClick={createWriter}>Create Writer</Button>
            <Table columns={columns} dataSource={data} style={{ marginTop: 25 }}></Table>
        </div>
    )
}