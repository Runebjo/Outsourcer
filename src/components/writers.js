import React, { useState } from 'react';
import { Button, Table, Popconfirm, message, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Writers = () => {

    function createWriter() {
        setModalHeader('Create New Writer');
        setModalIsVisible(true);
    }

    function editWriter(key) {
        setModalHeader('Edit Writer');
        const currentWriter = data.find(d => d.key === key);
        setCurrentWriterKey(key);
        if (currentWriter) setName(currentWriter.name);
        setModalIsVisible(true);
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

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [modalHeader, setModalHeader] = useState('Create New Writer');
    const [name, setName] = useState('');
    const [currentWriterKey, setCurrentWriterKey] = useState(null);

    function handleOk() {
        setModalIsVisible(false);

        if (currentWriterKey) {
            let currentWriter = data.find(d => d.key === currentWriterKey);
            currentWriter.name = name;
            setData(data);
        }

        setName('');
    }

    function handleCancel() {
        setModalIsVisible(false);
        setName('');
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <div>
            <Button type="primary" onClick={createWriter}>Create Writer</Button>
            <Table columns={columns} dataSource={data} style={{ marginTop: 25 }}></Table>
            <Modal
                title={modalHeader}
                visible={modalIsVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="Name" onChange={handleChange} value={name} />
            </Modal>
        </div>
    )
}