import React from 'react'
import { Row, Col, List, Avatar, Button, Space, Table, Tooltip, Spin } from 'antd'
import {
    PlayCircleOutlined,
    ShareAltOutlined,
    MessageOutlined,
    FolderAddFilled,
    DownloadOutlined,
    LoadingOutlined,
    PlusOutlined,
    PauseCircleOutlined
} from '@ant-design/icons';
import { useModel, request, } from '@umijs/max'
import type { ColumnsType } from 'antd/lib/table';
import { TOP_LIST, PLAYLIST_DETAIL } from '@/api/api';
import { useEffect, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash'

import styles from './styles/RankingList.less'

interface DataType {
    key: string;
    name: string;
    picUrl: number;
    dt: number;
    tags: string[];
}

const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;



export default () => {


    const [topList, setTopList] = useState([])
    const [topId, setTopId] = useState<string>("");
    const [topSongInfo, setTopSongInfo] = useState<any>({});
    const [topSongDescribe, setTopSongDescribe] = useState<any>([])
    const [songList, setSongList] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const {
        music,
        runFetchSongUrl,
        setPlayList
    } = useModel('song');

    const columns: ColumnsType<DataType> = [
        {
            title: "",
            dataIndex: "id",
            key: 'id',
            render: (item, _, index: number) => <span>{index + 1}</span>,
            width: 70
        },
        {
            title: "标题",
            dataIndex: "name",
            key: 'name',
            render: (value, record, index) => <Space>
                <PlayCircleOutlined
                    onClick={() => runFetchSongUrl(record.key)}
                    style={{ fontSize: 25, color: 'rgb(113,113,113)' }}
                    className={classnames({
                        [styles.isShowPlay]: music && music.id == record.key
                    })}
                />
                {
                    music && music.id == record.key && <PauseCircleOutlined style={{ fontSize: 25, color: 'rgb(113,113,113)' }} />
                }
                <span>{record.name}</span>
            </Space>
        },
        {
            title: "时长",
            dataIndex: "dt",
            key: 'dt',
        },
        {
            title: "操作",
            key: 'action',
            render: (_, record) => <Space>
                <Tooltip placement="bottomLeft" title="添加到播放列表">
                    <PlusOutlined style={{ fontSize: 25, color: 'rgb(113,113,113)' }} />
                </Tooltip>
                <Tooltip placement="bottomLeft" title="收藏">
                    <FolderAddFilled style={{ fontSize: 25, color: 'rgb(113,113,113)' }} />
                </Tooltip>
                <Tooltip placement="bottomLeft" title="分享">
                    <ShareAltOutlined style={{ fontSize: 25, color: 'rgb(113,113,113)' }} />
                </Tooltip>
                <Tooltip placement="bottomLeft" title="下载">
                    <DownloadOutlined style={{ fontSize: 25, color: 'rgb(113,113,113)' }} />
                </Tooltip>
            </Space>
        }
    ]

    useEffect(() => {
        request(TOP_LIST).then((res: any) => {
            setTopList(res?.list || [])
            setTopId(res?.list[0].id || "")
        })
    }, [])

    useEffect(() => {
        if (topId !== "") {
            setLoading(true)
            request(PLAYLIST_DETAIL, { params: { id: topId } }).then((res: any) => {
                console.log(res, 'res...')
                setTopSongInfo(res?.playlist || {})
                setTopSongDescribe([
                    {
                        coverImgUrl: res?.playlist?.coverImgUrl || "",
                        description: res?.playlist?.description || "",
                        name: res?.playlist?.name || "",
                        shareCount: res?.playlist?.shareCount || "",
                        commentCount: res?.playlist?.commentCount || "",
                    }
                ]);
                const tempSongList = _.map(res?.playlist?.tracks,
                    (item: any) =>
                        ({ key: item.id, name: item.name, picUrl: item?.al?.picUrl, dt: item.dt, tags: item?.al?.tns }));
                setSongList(tempSongList || [])
            }).catch(e => {
                console.log(e)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [topId])


    const handlePlayMusic = () => {
        if (topSongInfo) {
            setPlayList(topSongInfo.tracks)
            runFetchSongUrl(topSongInfo.tracks[0].id)
        }
    }

    return (
        <Spin
            size="large"
            tip="Loading..."
            indicator={antIcon}
            spinning={loading}
        >
            <Row>
                <Col span={4}>
                    <List
                        itemLayout="horizontal"
                        dataSource={topList}
                        renderItem={(item: any) => (
                            <List.Item
                                className={classnames({
                                    [styles.listBgColor]: topId === item.id
                                })}
                                onClick={() => setTopId(item.id)}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size={64} src={item.coverImgUrl} />}
                                    title={item.name}
                                    description={item.updateFrequency}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={20} style={{ padding: '0 20px' }}>
                    <div>
                        <List
                            // itemLayout="vertical"
                            size="large"
                            dataSource={topSongDescribe}
                            renderItem={(item: any) => (
                                <List.Item
                                    key={item.name}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={128}
                                                shape="square"
                                                src={item.coverImgUrl}
                                            />}
                                        title={item.name}
                                        description={item.description}
                                    />
                                    <div className={styles.listAction}>
                                        <Space>
                                            <Button type='primary' onClick={handlePlayMusic} icon={<PlayCircleOutlined />}>播放</Button>
                                            <Button type='primary' icon={<ShareAltOutlined />}>{item.shareCount}</Button>
                                            <Button type='primary' icon={<MessageOutlined />}>{item.commentCount}</Button>
                                        </Space>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className={styles.listTitle}>
                        <div>
                            <span>歌曲列表：</span>
                            <span>{topSongInfo?.trackCount || 0}</span>
                        </div>
                        <div>
                            <span>播放：</span>
                            <span>{topSongInfo?.playCount || 0}次</span>
                        </div>
                    </div>
                    <div>
                        <Table columns={columns} dataSource={songList} pagination={false} />
                    </div>
                </Col>
            </Row>
        </Spin>
    )
}