import { useEffect, useState } from 'react';

import { useRequest } from '@umijs/max';

import instance from '@/api/instance';
import { PERSONALIZED, SONG_URL } from '@/api/api';

export default () => {


    const [playList, setPlayList] = useState<any>([]);
    const [music, setMusic] = useState<any>({});


    // 推荐歌单
    const { data: songList, run: fetchSongList, loading } = useRequest(PERSONALIZED, { manual: true });

    // 获取音乐url
    const { data: musicList, run: runFetchSongUrl } = useRequest((id) => fetchSongUrl(id), { manual: true });

    const fetchSongUrl = (id: string) => {
        return instance.get(SONG_URL, { id })
    }


    useEffect(() => {
        fetchSongList()
    }, []);

    useEffect(() => {
        if (musicList && musicList.length > 0) {
            let tempList: any[] = [...playList, ...musicList] || [];
            setPlayList(tempList)
            setMusic(musicList[0])
        }
    }, [musicList])

    return {
        music,
        playList: playList || [],
        loading,
        runFetchSongUrl,
        songList: songList || [],
    };
};
