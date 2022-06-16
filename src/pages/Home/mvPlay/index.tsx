import { Row, Col, Button } from 'antd';
import { useEffect, useState } from 'react';

import { history , useModel } from '@umijs/max';

import { RollbackOutlined } from '@ant-design/icons';

export default () => {
  
  const { mvObj } = useModel('mv');

  const handleRollback = () => {
    history.push('/home/recommend');
  };

  return (
    <div style={{height:'100vh'}}>
      <div>
        {' '}
        <Button
          type="primary"
          style={{ margin: '10px' }}
          icon={<RollbackOutlined />}
          onClick={handleRollback}
        >
          {' '}
          返回我的mv
        </Button>
      </div>
      <Row  align="middle" justify="center">
        <Col span={4}> </Col>
        <Col span={16}>
          <video
            width="100%"
            height="calc(100% - 40px)"
            controls
            src={mvObj?.url}
            autoPlay
            loop
          />
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};
