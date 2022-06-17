import { useEffect, useState } from 'react';

import { useRequest } from '@umijs/max';

import instance from '@/api/instance';
import { PERSONALIZED, SONG_URL } from '@/api/api';

export default () => {


    const [musicList, setMusicList] = useState<any>([]);
    const [music, setMusic] = useState<any>({});
    //所有歌曲的id
    const [trackIds, setTrackIds] = useState<any>([]);

    console.log(trackIds, 'trackIds...')



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
                console.log(res?.data,'urlList...')
                setMusicList(res?.data || [])
                setMusic(res?.data[0])
            } else {
                throw new Error("获取数据失败!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(musicList, 'musicList...')


    useEffect(() => {
        fetchSongList()
    }, []);

    // useEffect(() => {
    //     if (musicList && musicList.length > 0) {
    //         setMusic(musicList[0])
    //     }
    // }, [musicList])

    return {
        setTrackIds,
        music,
        loading,
        runFetchSongUrl,
        songList: songList || [],
    };
};
