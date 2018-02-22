package com.entity;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;


/**
 * <p>自定义List类 添加了一些自定义方法</p> 
 * <p>继承自 ArrayList &ltDayoMap&gt </p> 
 */
public class DayoList extends ArrayList<DayoMap> {
	private static final long serialVersionUID = 1L;

	public static DayoList fromObject(String jsonStr) {
		return JSONUtil.readValue(jsonStr, DayoList.class);
	}
	
	//public DayoMap getDayoMap(int index){
	//	Object o = this.get(index);
	//	return (DayoMap)o;
	//}
	
	/** 获取指定Key值相等的Map **/
	public DayoMap getMap(String key, Object value) {
		for (DayoMap map : this) {
			if (map.get(key).equals(value)) {
				return map;
			}
		}
		return null;
	}
	
	/** 重载,对比两个键值对 **/
	public DayoMap getMap(String key1, Object value1, String key2, Object value2) {
		for (DayoMap map : this) {
			if (map.get(key1).equals(value1) && map.get(key2).equals(value2)) {
				return map;
			}
		}
		return null;
	}
	
	public void add(String str) {
		this.add(DayoMap.fromObject(str));
	}
	
	public String toString() {
		return JSONUtil.toJSon(this);
	}
	
	/** 
	 * 把list<T>转换为DayoList 
	 * @param list=sql查询到的list对象
	 * **/
	public static <T> DayoList listToDayoList(List<T> list){
		DayoList dayolist = new DayoList();
		DayoMap map;
		String str = "str";
		for(Object o : list){
			map = new DayoMap();
			map.put(str, o);
			dayolist.add(JSONObject.fromObject(map).getString(str));
		}
		return dayolist;
	}
}
