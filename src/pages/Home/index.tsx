
import { PageContainer } from '@ant-design/pro-components';
// import { Tabs, Carousel } from 'antd';
import { Outlet, history } from '@umijs/max';
import { useEffect } from 'react';



export default () => {


  useEffect(() => {
    history.push('/home/recommend')
  }, [])


  return (
    <PageContainer ghost className='innerbox' style={{ height: 'calc(100vh - 60px)' }} >
      <Outlet />
    </PageContainer>
  );
};
