import { Row, Col, Space, Button , message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useModel } from '@umijs/max'
import _ from 'lodash'
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';
import styles from './index.less'

import { useEventListener } from '@/hooks/useEventListener';

export default () => {

  const {
    music,
    isPlay,
    playList,
    setIsPlay,
    runFetchSongUrl
  } = useModel('song');


  const audioRef: any = useRef();
  // const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (music && audioRef.current) {
      let url = music?.url;
      if (music.code == 404) {
        url = `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`;
      }
      audioRef.current.src = url;
      audioRef.current.play()
    }
  }, [music])

  const reloadPlay = () => {
    const index = _.findIndex(playList, (item: any) => item.id == music?.id);
    if (index <= playList.length - 1) {
      // setMusic()
      runFetchSongUrl(playList[index + 1].id);
    }
  }

  // 获取总播放时长
  // const getAudioTime = () => {
  //   if (audioRef) {
  //     const dt = parseInt(audioRef.current.duration);
  //     // setDuration(dt)
  //     // console.log(audioRef.current.duration, '时长')
  //   }
  // }

  // 获取当前播放时长
  // const handleTimeUpdate = () => {
  //   if (audioRef) {
  //     let num: number = (Number(audioRef.current.currentTime) / duration) / 100;
  //     const pt = parseInt(num.toString());
  //     setPercent(pt)
  //     // console.log(audioRef.current.currentTime, '时长')
  //   }
  // }

  // 播放音乐
  const handlePlay = () => {
    if (isPlay && music && audioRef.current) {
      audioRef.current.pause()
      setIsPlay(false)
    } else {
      audioRef.current.play()
      setIsPlay(true)
    }
  }

  // 上一首
  const handlePrevious = () => {
    const index = _.findIndex(playList, (item: any) => item.id == music?.id);
    if(index === 0 ) return message.warn("已经是第一首了")
    if (index !== -1) {
      runFetchSongUrl(playList[index - 1].id);
    }
  }

  // 下一首
  const handleNext = () => {
    const index = _.findIndex(playList, (item: any) => item.id == music?.id);
    if(index === playList.length - 1) return message.warn("已经是最后一首了")
    if (index !== -1 ) {
      runFetchSongUrl(playList[index + 1].id);
    }
  }


  // 监听audio播放结束事件自动播放下一首
  useEventListener("ended", reloadPlay, audioRef)
  // useEventListener("canplay", getAudioTime, audioRef)
  // useEventListener("timeupdate", handleTimeUpdate, audioRef)


  return (
    <Row className={styles.container} style={{ padding: '0 40px' }}>
      <Col span={8}>
        <Space>
          <Button type='link' shape="circle" icon={<StepBackwardOutlined />} onClick={handlePrevious} />
          <Button type='link' shape="circle" onClick={handlePlay}
            icon={
              isPlay && <PauseCircleOutlined style={{ fontSize: 30 }} /> || <PlayCircleOutlined style={{ fontSize: 30 }} />} />
          <Button type='link' shape="circle" onClick={handleNext} icon={<StepForwardOutlined />} />
        </Space>
      </Col>
      <Col span={8} >
        <div className={styles.audio}>
          <span ></span>
          <audio
            controls
            autoPlay
            ref={audioRef}
            onEnded={reloadPlay}
            // onCanPlay={getAudioTime}
            style={{ width: '100%' }}
          />
        </div>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};
