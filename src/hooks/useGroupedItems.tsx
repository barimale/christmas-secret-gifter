import { useContext, useState, useEffect } from 'react';
import { ItemDetails } from '../components/common/BuyItems';
import { EventContext } from '../contexts/CartContext';

function GroupBy<T, K extends keyof T>(array: T[], key: K) {
    let map = new Map<T[K], T[]>();
    
	array.forEach(item => {
		let itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(itemKey, array.filter(i => i[key] === item[key]));
		}
    });
    
	return map;
}

export type CountedItemDetails ={
    details: ItemDetails;
    count: number;
}

export const useGroupedItems = () => {
  const { items } = useContext(EventContext);
  const [ groupedItems, setGroupedItems ] = useState<Array<CountedItemDetails>>(
      new Array<CountedItemDetails>());

  useEffect(()=>{
      const grouped = GroupBy(items, "id");
      const flatGrouped = new Array<CountedItemDetails>();

      grouped.forEach((value: Array<ItemDetails>, key: string) => {
          flatGrouped.push({details: value[0], count: value.length});
      });

      setGroupedItems(flatGrouped);
  }, [items]);

  const total = (): number =>{
      var sum: number = 0;
      groupedItems.forEach(p=> {
        sum += p.count * p.details.price;
      });

      return sum;
  }

  return { groupedItems, total };
};