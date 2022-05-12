/**
 * @file 批量指令组件
 */
import React, { useMemo } from 'react';
import ListCard from './ListCard';
import SeleteOrder from './SeleteOrder';
export default function index(props: any) {
  const { setBatchOrder, batchList, seleteKey } = props;
  const headerProps = useMemo(() => {
    return {
      setBatchOrder,
      batchList,
      seleteKey,
    };
  }, [batchList, seleteKey]);
  const bodyProps = useMemo(() => {
    return {
      seleteKey,
    };
  }, [seleteKey]);
  return (
    <div>
      <ListCard {...headerProps} />
      <SeleteOrder {...bodyProps} />
    </div>
  );
}
