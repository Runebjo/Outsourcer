import React, { useState, useEffect } from 'react';
import { Button, Table, Popconfirm, message, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

export const Writers = () => {

    const [data, setData] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [modalHeader, setModalHeader] = useState('Create New Writer');
    const [name, setName] = useState('');
    const [currentWriterKey, setCurrentWriterKey] = useState(null);

    const baseAddress = 'http://localhost:5000';

    useEffect(() => {
        getWriters();
    }, [])

    async function getWriters() {
        try {
            const writers = (await axios.get(`${baseAddress}/writers`)).data.map(w => {
                return { key: w._id, name: w.name };
            });
            console.log("writers", writers);
            setData(writers);
        } catch (error) {
            console.log(`error getting writers: ${error}`);
        }

    }

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

    async function confirmDelete(key) {
        try {
            await axios.delete(`${baseAddress}/writers/delete/${key}`);
            await getWriters();
        } catch (error) {
            console.log("error on delete", error);
        }
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

    async function handleOk() {
        setModalIsVisible(false);

        if (currentWriterKey) {
            let currentWriter = data.find(d => d.key === currentWriterKey);
            currentWriter.name = name;
            try {
                await axios.put(`${baseAddress}/writers/edit/${currentWriter.key}`, { name: currentWriter.name });
                await getWriters();
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("is new writer");
            try {
                await axios.post(`${baseAddress}/writers/add`, { name });
                await getWriters();
            } catch (error) {
                console.log(error)
            }
        }

        setName('');
        setCurrentWriterKey('');
    }

    function handleCancel() {
        setModalIsVisible(false);
        setName('');
        setCurrentWriterKey('');
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