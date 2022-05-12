/**
 * @file 指令集合展示
 */
import React from 'react';
import styles from './index.less';
import { Tag, Tooltip } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import classNames from 'classnames';
export default function index(props: any) {
  const { batchList, setBatchOrder, seleteKey } = props;
  return (
    <div
      className={classNames(
        styles.order_list_div,
        seleteKey && styles.order_selete_div,
      )}
    >
      {Array.isArray(batchList) &&
        batchList.length > 0 &&
        batchList.map((item: any, index: number) => {
          return (
            <Tooltip key={index} title={'批量快捷指令'}>
              <Tag
                icon={<TwitterOutlined />}
                color="#55acee"
                className={styles.tag_span}
                onClick={() => {
                  setBatchOrder(item.id, item);
                }}
              >
                {item.name || (item.projectData && item.projectData.name)}
              </Tag>
            </Tooltip>
          );
        })}
    </div>
  );
}
