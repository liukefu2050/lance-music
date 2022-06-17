import { Row, Col } from 'antd';
import { useEffect,  useRef} from 'react';
import { useModel } from '@umijs/max'
import _ from 'lodash'

import  './index.less'

import { useEventListener } from '@/hooks/useEventListener';

export default () => {

  const {
    music,
    playList,
    setMusic,
    runFetchSongUrl
  } = useModel('song');

  console.log(music,'music')
  console.log(playList,'playList')

  //   const { playObj } = useModel('song');


  // console.log(music,'music...')
  // const [url, setUrl] = useState<string>("")

  const audioRef:any = useRef()
  
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
      runFetchSongUrl(playList[index + 1].id)
    }
  }
  // 监听audio播放结束事件自动播放下一首
  useEventListener("ended",reloadPlay,audioRef)

  return (
    <Row className='container'>
      <Col span={8}></Col>
      <Col span={8}>
        <audio controls autoPlay ref={audioRef} onEnded={reloadPlay}>
          {/* <source src={url} type="audio/mpeg" /> */}
        </audio>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};
