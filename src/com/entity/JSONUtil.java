package com.entity;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser.Feature;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;
import org.codehaus.jackson.type.TypeReference;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;



public class JSONUtil {
	public static Logger logger = Logger.getLogger("util");
	public static ObjectMapper objectMapper = new ObjectMapper();

	static {
		// JSON 的标准是双引号
		// 但是可是配置允许单引号和没有引号的情况
		objectMapper.configure(Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
		objectMapper.configure(Feature.ALLOW_SINGLE_QUOTES, true);
		//允许特使字符 如 \n \b  \u000E 音乐符号 制表符等
		objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
	}

	/**
	 * 使用泛型方法，把json字符串转换为相应的JavaBean对象。
	 * (1)转换为普通JavaBean：readValue(json,Student.class)
	 * (2)转换为List,如List<Student>,将第二个参数传递为Student
	 * [].class.然后使用Arrays.asList();方法把得到的数组转换为特定类型的List
	 * 
	 * @param jsonStr
	 * @param valueType
	 * @return
	 */
	public static <T> T readValue(String jsonStr, Class<T> valueType) {
		try {
			return objectMapper.readValue(jsonStr, valueType);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * json数组转List
	 * 
	 * @param jsonStr
	 * @param valueTypeRef
	 * @return
	 */
	public static <T> T readValue(String jsonStr, TypeReference<T> valueTypeRef) {
		try {
			return objectMapper.readValue(jsonStr, valueTypeRef);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 使用泛型方法，把json字符串转换为相应的JavaBean对象。
	 * 
	 * @param jsonStr
	 * @param valueType
	 * @return
	 */
	public static <T> T readValueNode(String jsonStr, String key,
			TypeReference<T> valueTypeRef) {
		try {
			JsonNode node = objectMapper.readTree(jsonStr);
			String array = node.findValue(key).toString();
			logger.debug(key + ":" + array);
			return objectMapper.readValue(array, valueTypeRef);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/** 在对象中获取DayoList **/
	public static DayoList getDayoList(Object o, String key) {
		ObjectMapper omap = new ObjectMapper();
		JsonNode node = omap.valueToTree(o);
		String array = node.get(key).toString();
		try {
			return omap.readValue(array, DayoList.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new DayoList();
	}

	/**
	 * 把JavaBean转换为json字符串
	 * 
	 * @param object
	 * @return
	 */
	public static String toJSon(Object object) {
		try {
			return objectMapper.writeValueAsString(object);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 把JavaBean转换为json字符串(解决页面上引号的问题)
	 * @param key 在页面上的键
	 * @param object 数据
	 * @return json字符串
	 */
	public static String toJSon(String key, Object object) {
		String json = toJSon(object);
		// json = json.replace("\\\"", "\"");
		json = json.replace("\\\",\\\"", "\",\"");// __","
		json = json.replace("\\\":\\\"", "\":\"");// __":"
		json = json.replace("{\\\"", "\"");// __{"
		json = json.replace(",\\\"", "\"");// __,"
		json = json.replace(":\\\"", "\"");// __:"
		json = json.replace("\\\"}", "\"");// __"}
		json = json.replace("\\\",", "\"");// __",
		json = json.replace("\\\":", "\"");// __":
		//转换双引号  加其他标点是为了防止将数据中的引号也转换了-刘一男
		json = "\"," + key + ":" + json + ",temp2:\"";
		return json;
	}
	
	/**
	 * 把JavaBean转换为json字符串 将指定列的特殊字符进行转码处理(解决页面上引号的问题)
	 * @param key 在页面上的键
	 * @param list 数据
	 * @param columns 要转换的列  格式:"fname,fcode,fcontent"
	 * @return json字符串
	 * @author 刘一男
	 */
	public static String toJSon(String key, DayoList list,String columns) {
		String[] arrColumns = columns.split(",");
		for (DayoMap map : list) {
			for (String col : arrColumns) {
				String value = map.getString(col);
				//判断是否包含引号
				value = value.replaceAll("\\\"", "&quot;");
				//logger.debug("toUnicode:字符串【"+map.getString(col)+"】 转换结果 【"+value+"】");
				map.put(col, value);
			}
		}
		String json = toJSon(list);
		//转换双引号
		json = json.replace("\\\"", "\"");
		json = "\"," + key + ":" + json + ",temp2:\"";
		return json;
	}

	/** 创建一个JsonNode **/
	public static JsonNode CreateNode() {
		try {
			return objectMapper.readTree("");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/** 创建一个ObjectNode **/
	public static ObjectNode CreateObjectNode() {
		return objectMapper.createObjectNode();
	}

	/** 创建一个JsonNode **/
	public static ArrayNode CreateArrayNode() {
		return objectMapper.createArrayNode();
	}

	/** 结果集转JSON字符串 **/
	public static String RSToJsonStr(SqlRowSet rs) {
		return RSToJsonStr(rs, 0, -1);
	}

	/** 结果集转JSON字符串（分页） **/
	public static String RSToJsonStr(SqlRowSet rs, int start, int number) {
		return ListToJsonStr(RsToList(rs, start, number, true));
	}

	/** List转JSON字符串 **/
	public static String ListToJsonStr(DayoList list) {
		return toJSon(list);
	}

	/** 结果集转List **/
	public static DayoList RsToList(SqlRowSet rs) {
		return RsToList(rs, 0, -1, true);
	}

	/** 结果集转List **/
	public static DayoList RsToList(SqlRowSet rs, boolean toLowerCase) {
		return RsToList(rs, 0, -1, toLowerCase);
	}

	/**
	 * 结果集转List（分页） 
	 * @param rs 结果集
	 * @param page 页数
	 * @param rows 行数
	 * @param toLowerCase 是否转小写
	 * @return
	 */
	public static DayoList RsToListPage(SqlRowSet rs,  int page, int rows,
			boolean toLowerCase) {
		// 当前页
		int intPage = page == 0 ? 1 : page;
		// 每页显示条数
		int number = rows == 0 ? 10 : rows;
		// 每页的开始记录 第一页为1 第二页为number +1
		int start = (intPage - 1) * number;
		return RsToList(rs, start, number, toLowerCase);
	}
	/**
	 * 王文樟 20170413新增原生JDBC访问数据库
	 * 结果集转List（分页） 
	 * @param rs 结果集
	 * @param page 页数
	 * @param rows 行数
	 * @param toLowerCase 是否转小写
	 * @return
	 */
	public static DayoList RsToListPage(ResultSet rs,  int page, int rows,
			boolean toLowerCase) {
		// 当前页
		int intPage = page == 0 ? 1 : page;
		// 每页显示条数
		int number = rows == 0 ? 10 : rows;
		// 每页的开始记录 第一页为1 第二页为number +1
		int start = (intPage - 1) * number;
		return RsToList(rs, start, number, toLowerCase);
	}
	
	/** 
	 * 结果集转List（分页） 
	 * @param rs 结果集
	 * @param start 开始行
	 * @param number 行数
	 * @param toLowerCase 是否转小写
	 * @return
	 */
	public static DayoList RsToList(SqlRowSet rs, int start, int number,
			boolean toLowerCase) {
		SqlRowSetMetaData rsm = rs.getMetaData(); // 获得列集
		int col = rsm.getColumnCount(); // 获得列的个数
		String colName[] = new String[col];
		// 取结果集中的表头名称, 放在colName数组中
		for (int i = 0; i < col; i++) {
			colName[i] = rsm.getColumnName(i + 1);
		}
		DayoList array = new DayoList();
		// 重置结果集的光标位置
		rs.beforeFirst();
		int row = 0;
		//rs.absolute(start);//跳转到start所在行
		while (rs.next()) {
			if (row < start) {
				row++;
				continue;
			} else {
				DayoMap rowMap = new DayoMap();
				String fname = "";
				for (int i = 1; i <= rsm.getColumnCount(); i++) {
					fname = rsm.getColumnName(i);
					if (!fname.equals("_parentId") && toLowerCase) {
						fname = fname.toLowerCase();// 转换为小写
					}
					if (rs.getObject(fname) != null) {
						// TODO: 暂未完善 - 可根据需要添加数据类型
						switch (rsm.getColumnType(i)) {
						case Types.DATE:// 91
						case Types.TIME:// 92
							rowMap.put(fname, rs.getDate(fname).toString());
							break;
						case Types.TIMESTAMP:// 93
							Timestamp datetime = rs.getTimestamp(fname);
							DateFormat format = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss");
							String reTime = format.format(datetime);
							rowMap.put(fname, reTime);
							break;
						default:
							rowMap.put(fname, rs.getObject(fname));
							break;
						}
					} else {
						rowMap.put(fname, "");
					}
				}
				array.add(rowMap);
				if ((number >= 0) && (array.size() >= number)) {
					break;
				}
			}
		}
		return array;
	}
	/** 
	 * 王文樟 20170413 新增原生JDBC查询结果集处理
	 * 结果集转List（分页） 
	 * @param rs 结果集
	 * @param start 开始行
	 * @param number 行数
	 * @param toLowerCase 是否转小写
	 * @return
	 */
	public static DayoList RsToList(ResultSet rs, int start, int number,
			boolean toLowerCase) {
		DayoList list = new DayoList();
		ResultSetMetaData md = null;
		int columnCount = 0;
		try {
			md = rs.getMetaData();
			columnCount = md.getColumnCount();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			while (rs.next()) { //rowData = new HashMap(columnCount);
				DayoMap rowData = new DayoMap();
				for (int i = 1; i <= columnCount; i++) {
					String columnNameString = md.getColumnName(i);
					rowData.put(toLowerCase?columnNameString.toLowerCase():columnNameString, rs.getObject(i));
				}
				list.add(rowData);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return list;
	}

	/** 将数据集转换为EasyUI需要的JSON数据格式（不分页） **/
	public static DayoMap RSToEasyUIJson(SqlRowSet rs) {
		return RSToEasyUIJson(rs, 0, -1);
	}

	/** 将数据集转换为EasyUI需要的JSON数据格式（分页） **/
	public static DayoMap RSToEasyUIJson(SqlRowSet rs, int page, int rows) {
		DayoList array = JSONUtil.RsToListPage(rs, page, rows, true);
		rs.last();
		// 总条数
		int total = rs.getRow();
		DayoMap job = new DayoMap();
		job.put("total", total);
		job.put("rows", array);
		return job;
	}
	/** 将数据集转换为EasyUI需要的JSON数据格式（不分页） **/
	public static DayoMap RSToEasyUIJson(ResultSet rs) {
		return RSToEasyUIJson(rs, 0, -1);
	}
	
	/** 将数据集转换为EasyUI需要的JSON数据格式（分页） **/
	public static DayoMap RSToEasyUIJson(ResultSet rs, int page, int rows) {
		DayoList array = JSONUtil.RsToListPage(rs, page, rows, true);
		// 总条数
		int total = array.size();
		DayoMap job = new DayoMap();
		job.put("total", total);
		job.put("rows", array);
		return job;
	}
	
	/** 
     * 转换一个xml格式的字符串到json格式 
     * @param xml  xml格式的字符串 
     * @return 成功返回json 格式的字符串;失败反回null 
     */  
    public static DayoMap convertXML2JSON(String xml) {  
        try {  
            InputStream is = new ByteArrayInputStream(xml.getBytes("utf-8"));  
            SAXBuilder sb = new SAXBuilder();  
            org.jdom.Document doc = sb.build(is);  
            Element root = doc.getRootElement();
            String json = JSONUtil.toJSon(iterateElement(root));
            json = json.replace("[\"","\"").replace("\"]","\"");
            return readValue(json, DayoMap.class);
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    } 
    
    /** 
     * 迭代解析XML
     * @param element : org.jdom.Element 
     * @return java.util.Map 实例 
     */  
    @SuppressWarnings("unchecked")  
    private static Map  iterateElement(Element element) {  
        List jiedian = element.getChildren();  
        Element et = null;  
        Map obj = new HashMap();  
        List list = null;  
        for (int i = 0; i < jiedian.size(); i++) {  
            list = new LinkedList();  
            et = (Element) jiedian.get(i);  
            if (et.getTextTrim().equals("")) {  
                if (et.getChildren().size() == 0)  
                    continue;  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(iterateElement(et));  
                obj.put(et.getName(), list);  
            } else {  
                if (obj.containsKey(et.getName())) {  
                    list = (List) obj.get(et.getName());  
                }  
                list.add(et.getTextTrim());  
                obj.put(et.getName(), list);  
            }  
        }  
        return obj;  
    }

	public static void main(String[] args) {
		String json = "{hsf:'dfs',dhue:'sdfs',sds:1,udfd:2,shfud:343}";
		Map<String, Object> result = readValue(json,
				new TypeReference<Map<String, Object>>() {
				});
		System.out.println(result);
	}
}
