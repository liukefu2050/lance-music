import { useEffect, useState } from 'react';

import { useRequest } from '@umijs/max';

import instance from '@/api/instance';
import { PERSONALIZED, SONG_URL } from '@/api/api';

export default () => {


    const [playList,setPlayList] = useState<any>([])
    const [musicList, setMusicList] = useState<any>([]);
    const [music, setMusic] = useState<any>({});
    const [isPlay,setIsPlay] = useState<boolean>(false)

    // 推荐歌单
    const { data: songList, run: fetchSongList, loading } = useRequest(PERSONALIZED, { manual: true });

    // // 获取音乐url
    // const { data: musicList, run: runFetchSongUrl } = useRequest((id) => fetchSongUrl(id), {
    //     manual: true,
    // });

    const runFetchSongUrl = async (id: string) => {
        try {
            const res:any = await instance.get(SONG_URL, { id });
            if (res.code == 200) {
                setIsPlay(true)
                setMusic(res?.data[0])
            } else {
                throw new Error("获取数据失败!")
            }
        } catch (error) {
            console.log(error)
        }
    }


    console.log(playList,'playList..')

    useEffect(() => {
        fetchSongList()
    }, []);


    return {
        music,
        playList,
        loading,
        isPlay,
        setMusic,
        setIsPlay,
        setPlayList,
        runFetchSongUrl,
        songList: songList || [],
    };
};
