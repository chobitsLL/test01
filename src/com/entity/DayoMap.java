package com.entity;

import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedHashMap;

import org.apache.commons.lang.exception.NestableRuntimeException;


/**
 * <p>自定义Map类 添加了一些自定义方法</p> 
 * <p>继承自 LinkedHashMap &ltString, Object&gt </p> 
 */
public class DayoMap extends LinkedHashMap<String, Object> implements Comparator<DayoMap>{
	private static final long serialVersionUID = 1L;
	
	public DayoMap() {
		
	}
	
	public DayoMap(DayoMap json, String key) {
		if (json.containsKey(key)) {
			setName(json.getString(key));
			setTitle(json.getString(key));
		}
	}
	
	public DayoMap(DayoMap json, String key1, String key2) {
		if (json.containsKey(key1)) {
			setName(json.getString(key1));
		}
		if (json.containsKey(key2)) {
			setTitle(json.getString(key2));
		}
	}
	
	public Iterator<?> keys() {
		return this.entrySet().iterator();
	}
	
	/**
	 * 获取对应Key的Integer值，如果数值太大，则会被剪切
	 * 
	 * @param key 键值
	 * @return Integer 数值
	 * @throws Exception 如果键值未找到或者值无法转换为整数时
	 */
	public int getInt(String key) {
		Object o = get(key);
		if (o == null) {
			return 0;
		}else if("".equals(o)){
			return 0;
		}else{
			return o instanceof Number ? ((Number) o).intValue(): (int) getDouble(key);
		}
	}

	/**
	 * 获取对应Key的Double值，如果数值太大，则会被剪切
	 * 
	 * @param key 键值
	 * @return Double 浮点数
	 * @throws Exception 如果键值未找到或者值无法转换为浮点数时
	 */
	public double getDouble(String key){
		Object o = get(key);
		if (o != null&& !o.toString().equals("")) {
			try {
				return o instanceof Number ? ((Number) o).doubleValue(): Double.parseDouble((String) o);
			} catch (Exception e) {
				throw new NestableRuntimeException("DayoMap[" + key + "] is not a number. value = ["+o+"]");
			}
		}else{
			return 0.0;
		}
	}
	
    /**
	 * 获取对应Key的Stirng值
	 * 
	 * @param key 键值
     */
	public String getString(String key) {
		Object obj = get(key);
		return obj == null ? "" : obj.toString();
	}
	
	public boolean getBoolean(String key){
		Object obj = get(key);
		return obj == null ? false : Boolean.valueOf(obj.toString());
	}

	public static DayoMap fromObject(String jsonStr) {
		if(StringUtil.isEmpty(jsonStr)){
			return new DayoMap();
		}else{
			return JSONUtil.readValue(jsonStr, DayoMap.class);
		}
	}

	public static DayoMap fromXML(String xmlStr) {
		if(StringUtil.isEmpty(xmlStr)){
			return new DayoMap();
		}else{
			return JSONUtil.convertXML2JSON(xmlStr);
		}
	}

    /**
     * 获取 DayoMap
     * @param key
     * @return
     */
	public DayoMap getDayoMap(String key) {
		Object o = get(key);
		if(o == null){
			return new DayoMap();
		}
		String type = o.getClass().getName();
		if (this.getClass().getName().equals(type)) {
			return (DayoMap)o;
		}else if(new String().getClass().getName().equals(type)){
			return fromObject(o.toString());
		}else {
			return fromObject(JSONUtil.toJSon(o));
		}
	}
	/**
     * 获取 DayoList
     * @param key
     * @return
     */
	public DayoList getDayoList(String key) {
		try {
			return (DayoList)get(key);
		} catch (Exception e) {
			return JSONUtil.getDayoList(this, key);
		}
	}
	
	/** 失败提示信息 **/
	public static DayoMap failResult(String msg) {
		return setResult(false, msg);
	}

	/** 成功提示信息 **/
	public static DayoMap successResult(String msg) {
		return setResult(true, msg);
	}

	/** 成功或失败 **/
	private static DayoMap setResult(boolean result, String msg) {
		DayoMap resultMap = new DayoMap();
		resultMap.put("result", result);
		resultMap.put("msg", msg);

		// getData数据返回false时需要两个属性
		resultMap.put("total", 0);
		resultMap.put("rows", "[]");
		//logger.debug(msg);
		return resultMap;
	}
	
	@Override
	public String toString() {
		return JSONUtil.toJSon(this);
	}
	
	/** 直接获取FID 即 getInt("fid")**/
	public int getFID() {
		int FID = getInt("fid");
		return FID>0?FID:getInt("FID");
	}
	
	/** 判断返回结果 即 getBoolean("result")**/
	public boolean isSuccess() {
		return getBoolean("result");
	}
	
	/* ********************* */
	//三行常用的数据
	
	public int getId() {
		return getInt("id");
	}

	public void setId(int id) {
		put("id", id);
	}

	public String getName() {
		return getString("name");
	}

	public void setName(String name) {
		put("name", name);
	}

	public String getTitle() {
		return getString("title");
	}

	public void setTitle(String title) {
		put("title", title);
	}

	public int compare(DayoMap o1, DayoMap o2) {
		return new Integer(o1.getName()).compareTo(new Integer(
				o2.getName()));
	}
	
	@Override
	public DayoMap clone() {
		return (DayoMap)super.clone();
		//return DayoMap.fromObject(this.toString());
	}

}
