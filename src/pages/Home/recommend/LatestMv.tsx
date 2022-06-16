import { useEffect, useState } from 'react';
import { Row, Col, Card, Spin, Typography } from 'antd';
import _ from 'lodash';
import { useModel } from '@umijs/max';
import classnames from 'classnames';

import { PlayCircleOutlined, LoadingOutlined } from '@ant-design/icons';


const { Title } = Typography;

const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export default () => {



    const [selectSong, setSelectSong] = useState({ id: '', index: -1 });

    const {
        catList,
        loading,
        runFetchMvInfo
    } = useModel('mv');


    const handlePlay = (id: string, index: number) => {
        setSelectSong({ id, index });
        runFetchMvInfo(id)
    };

   

    return (
        <div style={{ marginTop: '20px' }}>
            <Spin
                size="large"
                tip="Loading..."
                indicator={antIcon}
                spinning={loading}
            >
                <Title level={4}>推荐MV</Title>

                <Row gutter={[16, 16]}>
                    {catList.map((item: any, index: number) => (
                        <Col key={item.id}>
                            <Card
                                hoverable
                                className="card"
                                cover={
                                    <img
                                        alt="example"
                                        src={item.cover}
                                        style={{ height: 200 }}
                                    />
                                }
                                onClick={() => handlePlay(item.id, index)}
                            >
                                <Meta title={`${item.artistName}--${item.name}`} />
                                <PlayCircleOutlined
                                    className={classnames('play', {
                                        // ['isShowPlay']: selectSong.id == item.id && index == selectSong.index
                                    })}
                                    onClick={() => handlePlay(item.id, index)}
                                />
                                {/* {
                    selectSong.id == item.id && index == selectSong.index
                    && <PauseCircleOutlined className='play'
                      onClick={() => setSelectSong({ id: '', index: -1 })} />
                  } */}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    )
}