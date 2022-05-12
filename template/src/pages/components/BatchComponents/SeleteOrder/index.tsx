/**
 * @file 根据选中key 展示对应数据
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { batchRunUrl } from '../../../config/host';
import request from '../../../../utils/request';
import { Tag, Tooltip } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
let initlist = [
  {
    label: '批量指令运行',
    value: 'start',
  },
];

let errList = [
  {
    label: '未获取到命令,请排查',
    value: 'error',
  },
];
export default function index(props: any) {
  const { seleteKey } = props;
  const [list, setList] = useState<any>([]);
  useEffect(() => {
    if (seleteKey) {
      getDetail();
    }
  }, [seleteKey]);
  // 获取详情
  function getDetail() {
    setList(initlist);
  }

  function openOrder(key: string) {
    console.log(key, seleteKey);

    request(batchRunUrl, {
      id: seleteKey,
      // orderName: key,
    }).then(() => {});
  }
  return (
    <div
      className={classNames(
        styles.selete_div,
        seleteKey && styles.selete_show_div,
      )}
    >
      {Array.isArray(list) &&
        list.length > 0 &&
        list.map((item: any, index: number) => {
          return (
            <Tooltip key={index} title={item.desc || item.value}>
              <Tag
                icon={<YoutubeOutlined />}
                color={item.color ? item.color : '#55acee'}
                className={styles.tag_span}
                onClick={() => {
                  openOrder(item.value);
                }}
              >
                {item.label}
              </Tag>
            </Tooltip>
          );
        })}
    </div>
  );
}
