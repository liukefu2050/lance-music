import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Spin, Typography } from 'antd';
import _ from 'lodash';
import { useModel } from '@umijs/max';
import classnames from 'classnames';

import { PlayCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './styles/LatestMv.less'

const { Title, Text } = Typography;

const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

export default () => {



    const [selectSong, setSelectSong] = useState({ id: '', index: -1 });
    const [moveId, setMoveId] = useState("")

    const {
        catList,
        loading,
        runFetchMvInfo
    } = useModel('mv');


    const handlePlay = (id: string, index: number) => {
        setSelectSong({ id, index });
        runFetchMvInfo(id)
    };

    const handleEnter = (e: any, id: string) => {
        e.stopPropagation()
        setMoveId(id)
    }

    const handleLeave = () => {
        setMoveId("")
    }


    return (
        <div style={{ marginTop: '20px' }}>
            <Spin
                size="large"
                tip="Loading..."
                indicator={antIcon}
                spinning={loading}
            >
                <Title level={4}>推荐MV</Title>
                <div className={styles.list_card}>
                    {catList.map((item: any, index: number) => (
                        <div key={item.id} className={styles.music_card}>
                            <img
                                alt="example"
                                src={item.cover}
                                onMouseEnter={(e) => handleEnter(e, item.id)}
                                onMouseLeave={handleLeave}
                            />
                            <Text ellipsis style={{ padding: '5px 0', textIndent: '2px' }}>{`${item.artistName}--${item.name}`}</Text>
                            {
                                moveId && moveId === item.id && <PlayCircleOutlined
                                    className={styles.play_icon}
                                    onMouseEnter={(e) => handleEnter(e, item.id)}
                                // onClick={() => handlePlay(item.id, index)}
                                />
                            }

                            {/* <Card
                            hoverable
                            className="card"
                            cover={
                                <img
                                    alt="example"
                                    src={item.cover}
                                    style={{ height: 140 ,width:"100%"}}
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
                        </Card> */}
                        </div>
                    ))}
                </div>
            </Spin>
        </div>
    )
}