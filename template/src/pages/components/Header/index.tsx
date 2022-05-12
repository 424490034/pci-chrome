/**
 * @file 顶部状态栏
 */
import React from 'react';
import { Row, Col, Button } from 'antd';
import styles from './index.less';
import { SyncOutlined } from '@ant-design/icons';
export default function index(props: any) {
  const { isLink, getList, tabKey, btnChange } = props;
  let noLinkJSX = (
    <div className={styles.no_link}>
      <span className={styles.no_text}>
        连接已断开(
        <span onClick={getList} style={{ color: '#5ccf65', cursor: 'pointer' }}>
          重连
        </span>
        )
      </span>
    </div>
  );
  let yesLinkJSX = (
    <div className={styles.yes_link}>
      <span className={styles.yes_text}>
        已连接 (
        <span onClick={getList} style={{ color: '#f96057', cursor: 'pointer' }}>
          刷新
        </span>
        )
      </span>
    </div>
  );
  return (
    <Row className={styles.heade_div}>
      <Col span={16}>
        前端可视化平台 (
        <span
          className={styles.check_text}
          onClick={() => {
            btnChange(tabKey == '1' ? '2' : '1');
          }}
        >
          <SyncOutlined style={{ marginRight: 5 }} spin />
          {tabKey == '1' ? '切换为批量指令' : '切换为项目指令'}
        </span>
        )
      </Col>
      <Col span={8}>{!isLink ? noLinkJSX : yesLinkJSX}</Col>
    </Row>
  );
}
