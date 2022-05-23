/**
 * @file 根据选中key 展示对应数据
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { detailUrl, openUrl } from '../../config/host';
import request from '../../../utils/request';
import { Tag, Tooltip } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
let initlist = [
  {
    label: '指令运行',
    value: 'start',
  },
];
let initTwo = [
  {
    label: '编辑器打开',
    value: 'orderOpenVSCode',
    color: '#f40',
  },
  {
    label: '打开所在路径',
    value: 'orderOpenExplorer',
    color: '#f40',
  },
  {
    label: '打开对应cmd窗口',
    value: 'orderOpenCmd',
    color: '#f40',
  },
  {
    label: '打开对应powerShell窗口',
    value: 'orderOpenPowerShell',
    color: '#f40',
  },
  {
    label: '打开对应smartGit',
    value: 'orderOpenSmartGit',
    color: '#f40',
  },
];
let errList = [
  {
    label: '未获取到命令,请排查',
    value: 'error',
  },
];
export default function index(props: any) {
  const { seleteKey, seleteData } = props;
  const [list, setList] = useState<any>([]);
  const [openKey, setOpenKey] = useState('');
  useEffect(() => {
    if (seleteKey) {
      getDetail();
    }
  }, [seleteKey]);
  // 获取详情
  function getDetail() {
    if (seleteData.type !== '4' || seleteData.type !== '5') {
      request(detailUrl, { id: seleteKey })
        .then((dataStr: any) => {
          try {
            console.log(dataStr);
            if (dataStr.type === '5') {
              setList(initlist);
              return;
            }
            let data = parseStr(dataStr);
            let list = Object.keys(data).map((item: string) => {
              return {
                label: item,
                value: item,
              };
            });
            setList([...initTwo, ...list]);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(() => {
          setList(errList);
        });
    } else {
      setList(initlist);
    }
    setOpenKey('');
  }
  function parseStr(str: string) {
    return eval(`window.____customPackageScript = ${str}`);
  }
  function openOrder(key: string) {
    request(openUrl, {
      id: seleteKey,
      orderName: key,
    })
      .then(() => {
        setOpenKey(key);
      })
      .catch(() => {
        setOpenKey('');
      });
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
