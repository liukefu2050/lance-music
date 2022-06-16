
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Carousel } from 'antd';
import _ from 'lodash'

const { TabPane } = Tabs;

import './index.less'

import LatestMv from './LatestMv';
import LatestSong from './LatestSong';
import RankingList from './RankingList';

export default () => {


    // 轮播图的图片地址与跳转链接
    let links: any = [
        { image: require('@/assets/recommend/1.jpg'), target: '#1' },
        { image: require('@/assets/recommend/2.jpg'), target: '#2' },
        { image: require('@/assets/recommend/3.jpg'), target: '#3' },
        { image: require('@/assets/recommend/4.jpg'), target: '#4' },
        { image: require('@/assets/recommend/5.jpg'), target: '#5' },
        { image: require('@/assets/recommend/6.jpg'), target: '#6' },
    ];


    return (
        <div className="innerbox" >
            <Tabs size="large" defaultActiveKey="2">
                <TabPane tab="个性推荐" key="1">
                    <div className="swipe" id="swipe">
                        <Carousel autoplay>
                            {
                                _.map(links, (item: any, index: number) => (
                                    <img src={item.image} key={item.image} alt='' />
                                ))
                            }
                        </Carousel>
                    </div>
                    {/* 推荐mv */}
                    <LatestMv />
                    <LatestSong />
                    {/* <div className="pagination">
                {catList.length > 0 && (
                  <Pagination
                    defaultCurrent={1}
                    current={pageParams.current}
                    total={total}
                    onChange={handleNextPage}
                    showSizeChanger={false}
                  />
                )}
              </div> */}
                </TabPane>
                <TabPane tab="排行榜" key="2">
                    <RankingList />
                </TabPane>
                <TabPane tab="歌单" key="3">
                    test
                </TabPane>
                <TabPane tab="歌手" key="4">
                    test
                </TabPane>
                <TabPane tab="电台" key="5">
                    test
                </TabPane>
            </Tabs>
        </div>
    )
}