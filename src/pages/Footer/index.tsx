import { Row, Col } from 'antd';
import { useEffect, useState , useRef} from 'react';
import axios from '@/api/instance';
import { SONG_URL } from '@/api/api';

import styles from './index.less'
import { useModel } from '@umijs/max'

export default () => {

  const {
    music
  } = useModel('song');

  //   const { playObj } = useModel('song');


  // console.log(music,'music...')
  // const [url, setUrl] = useState<string>("")

  const audioRef = useRef<any>()
  
  useEffect(() => {
    if (music && audioRef.current) {
      let url = music?.url;
      if (music.code == 404) {
         url = `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`;
      }
      audioRef.current.src = url;
      audioRef.current.play()
    }
  },[music])

  return (
    <Row className={styles.container}>
      <Col span={8}></Col>
      <Col span={8}>
        <audio controls autoPlay ref={audioRef}>
          {/* <source src={url} type="audio/mpeg" /> */}
        </audio>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};
