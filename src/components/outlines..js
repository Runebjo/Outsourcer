import React from 'react';
import { Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const Outlines = () => {

    function handleMenuClick() {
        console.log("click");
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

    return (
        <div>
            <Space size="large">
                <Dropdown overlay={menu}>
                    <Button>
                        Filter Status <DownOutlined />
                    </Button>
                </Dropdown>
                <Button type="primary">Create Outline</Button>
            </Space>
        </div>
    )
}
