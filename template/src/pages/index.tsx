import styles from './index.less';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import request from '../utils/request';
import { listUrl, batchUrl } from './config/host';
import OrderList from './components/listCard';
import SeleteOrder from './components/seleteOrder';
import BatchComponents from './components/BatchComponents';

export default function IndexPage() {
  const [isLink, setIsLink] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [seleteKey, setSeleteKey] = useState('');
  const [seleteData, setSeleteData] = useState({});
  const [tabKey, setTabKey] = useState('1');
  // 批量指令相关参数
  const [batchKey, setBatchKey] = useState('');
  useEffect(() => {
    getList();
  }, []);
  // 获取列表信息
  function getList() {
    if (tabKey === '2') {
      getBatchList();
      return;
    }
    request(listUrl, {})
      .then((data: any) => {
        setIsLink(true);
        setOrderList(data);
      })
      .catch(() => {
        setIsLink(false);
        setOrderList([]);
      });
  }
  function getBatchList() {
    request(batchUrl, {})
      .then((data: any) => {
        setIsLink(true);
        setBatchList(data);
      })
      .catch(() => {
        setIsLink(false);
        setBatchList([]);
      });
  }
  function setSeleteOrder(id: string, item: any) {
    setSeleteKey(id);
    setSeleteData(item);
  }
  function setBatchOrder(id: string) {
    setBatchKey(id);
  }
  function btnChange(value: any) {
    setTabKey(value);
    switch (value) {
      case '1':
        getList();
        break;
      case '2':
        getBatchList();
        setSeleteKey('');
        setSeleteData({});
        break;
      default:
        break;
    }
  }
  return (
    <div className={styles.body_div}>
      <Header
        isLink={isLink}
        getList={getList}
        tabKey={tabKey}
        btnChange={btnChange}
      />
      {tabKey === '1' && (
        <>
          <OrderList
            seleteKey={seleteKey}
            orderList={orderList}
            setSeleteOrder={setSeleteOrder}
          />
          <SeleteOrder seleteKey={seleteKey} seleteData={seleteData} />
        </>
      )}
      {tabKey === '2' && (
        <BatchComponents
          batchList={batchList}
          seleteKey={batchKey}
          setBatchOrder={setBatchOrder}
        />
      )}
    </div>
  );
}
