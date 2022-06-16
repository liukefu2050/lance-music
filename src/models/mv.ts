import { useEffect, useState } from 'react';

import { history, useRequest } from '@umijs/max';

import instance from '@/api/instance';

import { MV_DETAIL, CAT_LIST, MV_DETAIL_INFO } from '@/api/api';

export default () => {

  // 请求推荐mv
  const { data, run, loading } = useRequest(CAT_LIST, { manual: true });

  const { data: mvObj, run: runFetchMvInfo, error: mvObjError } = useRequest((id: string) => fetchMvDetail(id), {
    manual: true, onSuccess: (result) => {
      history.push('/home/mvPlay');
  }});


  // 查询mv的地址
  const fetchMvDetail = async (id: string) => {
    return instance.get(MV_DETAIL, { id });
  };


  // 获取 mv 点赞转发评论数数据
  const fetchMvDetailInfo = async (mvid: string) => {
    // try {
    //   const res = await instance.get(MV_DETAIL_INFO, { mvid });
    //   console.log(res, '获取 mv 点赞转发评论数数据');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    run()
  }, []);

  return {
    loading,
    mvObj: mvObj || {},
    catList: data || [],
    fetchMvDetail,
    runFetchMvInfo
  };
};
