package com.entity;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import java.util.regex.Pattern;
import java.util.regex.Matcher;



import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;


/**
 * 
 * <p>
 * �ַ����:
 * </p>
 * <p>
 * ����һЩ�ַ�����ĺ����:
 * </p>
 * <p>
 * Copyright: Copyright (c) 2006
 * </p>
 * <p>
 * Company:
 * </p>
 * 
 * @author tony
 * @version 1.0
 */

public class StringUtil {
	public static Logger logger = Logger.getLogger("util");
	
	public StringUtil() {
	}

	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	/**
	 * @param str1
	 * @param str2
	 * @param joinstr
	 * @return str1 + joinstr + str2
	 */
	public static String join(String str1, String str2, String joinstr) {
		if (str1 == null && str2 == null) {
			return null;
		}

		if (str1 == null || "".equals(str1)) {
			return str2;
		}

		if (str2 == null || "".equals(str2)) {
			return str1;
		}

		if (joinstr == null) {
			joinstr = "";
		}

		return str1 + joinstr + str2;
	}

	public static String commaJoin(String str1, String str2) {
		return join(str1, str2, ",");
	}

	public static void StringAdd(StringBuilder sb, String appendStr, String split) {
		if (!isEmpty(appendStr)) {
			if (sb.length() == 0) {
				sb.append(appendStr);
			} else {
				if (!isEmpty(split)) {
					sb.append(split);
				}
				sb.append(appendStr);
			}
		}
	}

	public static void StringAdd(StringBuffer sb, String appendStr, String split) {
		if (!isEmpty(appendStr)) {
			if (sb.length() == 0) {
				sb.append(appendStr);
			} else {
				if (!isEmpty(split)) {
					sb.append(split);
				}
				sb.append(appendStr);
			}
		}
	}

	public static String StringAdd(String s, String appendStr, String split) {
		if (!isEmpty(appendStr)) {
			if ("".equals(s)) {
				s = appendStr;
			} else {
				if (!isEmpty(split)) {
					s = s + split;
				}
				s = s + appendStr;
			}
		}
		return s;
	}

	public static String StringAdd(String s, String appendStr) {
		return StringAdd(s, appendStr, ",");
	}

	public static void addString(StringBuffer sb, String appendStr, String split) {
		/*
		 * if (!isEmpty(appendStr)){ if (!isEmpty(split)) { sb.append(split); }
		 * sb.append(appendStr); }
		 */
		if (sb.length() == 0 || sb == null) {
			sb.append(appendStr);
		} else {
			sb.append(split);
			sb.append(appendStr);
		}
	}

	public static String formatString(String s, Object[] params) {
		int k = 0;
		int ind = s.indexOf("%s");

		while (ind > -1) {
			s = s.replaceFirst("%s", params[k].toString());
			ind = s.indexOf("%s");
			k = k + 1;
		}

		return s;
	}

	/**
	 * �ַ��滻����
	 * 
	 * @rep��ʽ: param1=value1,param2=value2
	 */
	public static String FormatStr(String s, String params) {
		String[] list = params.split(",");
		String param, value;
		String[] p;
		HashMap<String, String> map = new HashMap<String, String>();
		for (int i = 0; i < list.length; i++) {
			if (list[i].charAt('=') >= 0) {
				p = list[i].split("=");
				param = p[0].trim();
				value = p[1].trim();
				map.put(param, value);
			}
		}
		return FormatStr(s, map);
	}

	/**
	 * �ַ��滻����һ��ʹ���ڱȽϸ��ӵ�sql�����滻 ������ǣ�[/������/] map �е������û��
	 * [//]��Ƿ�ŵġ�
	 */
	public static String FormatStr(String s, Map<String, String> map) {
		int i = 0;
		StringBuffer sb = new StringBuffer("");
		char chLeft = '[';
		char chRight = ']';
		char chDiag = '/';
		String tkLeft = "[/";
		String tkRight = "/]";

		boolean isToken = false;
		String tokenName = "";
		String varValue = null;
		while (i < s.length()) {
			if ((s.charAt(i) == chLeft) && ((i + 1) < s.length())
					&& (s.charAt(i + 1) == chDiag)) {
				isToken = true;
				i = i + 2;
			} else if ((s.charAt(i) == chDiag) && ((i + 1) < s.length())
					&& (s.charAt(i + 1) == chRight)) {
				if ("".equals(tokenName)) {
					// û���滻�ı����ָ�ԭ��
					sb.append(tkLeft).append(tokenName).append(tkRight);
				} else {
					varValue = (String) map.get(tokenName);
					if (varValue != null) {
						sb.append(varValue);
					} else {
						// û���滻�ı����ָ�ԭ��
						sb.append(tkLeft).append(tokenName).append(tkRight);
					}
				}
				isToken = false;
				i = i + 2;
				tokenName = "";
			} else if (isToken) {
				tokenName = tokenName + s.charAt(i);
				i = i + 1;
			} else {
				sb.append(s.charAt(i));
				i = i + 1;
			}
		}
		// ֻ�п�ʼ��� ��[/����û�н����ǣ���/]�����������ϣ�
		if (!"".equals(tokenName)) {
			sb.append(tkLeft).append(tokenName);
		}

		return sb.toString();
	}

	/**
	 * �Ѹ���ַ�ʹ���������������
	 * 
	 * @param s
	 *            �� s == null or s == "" return '';
	 * @return
	 */
	public static String qs(String s) {
		String r = "";
		if (s == null || "".equals(s)) {
			r = "''";
		} else {
			r = r.concat("'").concat(s).concat("'");
		}
		return r;
	}

	/**
	 * ������ת��Ϊ�ַ�����ʹ�������������ʹ����sql����С�
	 * 
	 * @param date
	 * @return
	 */
	public static String qsDate(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return qs(df.format(date));
	}
	
	public static String qsDateTime(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		df.setTimeZone(TimeZone.getTimeZone("GMT"));  
		return qs(df.format(date));
	}

	public static String getSysDate() {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(date);
	}

	public static String getSysDate(String format) {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(date);
	}
	/**
	 * @return 返回小时数在1~24的日期时间，如2015-09-10 24:39:16
	 * zzc 2016-12-07暂时将该方法转为同getSysDateTimeHH相同的时间格式
	 */
	public static String getSysDateTime() {
		Date date = new Date();
		//SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(date);
	}
	
	/**
	 * @return 返回小时数在0~23的日期时间，如2015-09-10 00:39:16
	 */
	public static String getSysDateTimeHH() {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(date);
	}
	
	/*
	 * format:"yyyyMMddHHmmssZ"\"yyyy-MM-dd HH:mm:ss"等
	 */
	public static String getFormatSysDate(String format){
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat(format);
		return df.format(date);
	}
	
	/*
	 * 去掉日期字符串中的时间
	 */
	public static String getDate(String dateStr){
		String result = "";
		
		if (dateStr.isEmpty()){
			return result;
		}
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date date;
		try
		{
			date = df.parse(dateStr);
			result = df.format(date);
		} 
		catch (ParseException e)
		{
			// TODO 自动生成 catch 块
			e.printStackTrace();
			result = dateStr;
		}
		
		return result;
		
	} 
	
	public static long getDaySub(String beginDateStr,String endDateStr)
	{
		long day = 0;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDate;
		Date endDate;
		try
		{
			beginDate = format.parse(beginDateStr);
			endDate = format.parse(endDateStr);
			day = (endDate.getTime() - beginDate.getTime())/(24*60*60*1000);
		//System.out.println("相隔的天数="+day);
		} 
		catch (ParseException e)
		{
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		return day;
	} 
	
	/**
	 * 获取月份第一天
	 * @param withTime 是否需要时分秒
	 * @param isLastMonth 是否是上个月
	 * @return
	 */
	public static String getFirstDay(boolean withTime, boolean isLastMonth){
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        Date theDate = calendar.getTime();
        
        GregorianCalendar gcLast = (GregorianCalendar) Calendar.getInstance();
        gcLast.setTime(theDate);
        if (isLastMonth) {
        	gcLast.add(Calendar.MONTH, -1);
        }
        gcLast.set(Calendar.DAY_OF_MONTH, 1);
        String firstDay = df.format(gcLast.getTime());
        StringBuffer str = new StringBuffer(firstDay);
        if (withTime){
        	str.append(" 00:00:00");
        }
        return str.toString();
	}	

	
	/*
	 * 获取日期所在周第一天
	 */
	public static String getWeekFirstDate(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try { 
			Date date = sdf.parse(dateStr);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			
			calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONDAY), calendar.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		
			String newDate = sdf.format(calendar.getTime());
	
			return newDate;
		
		} catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    	return dateStr;
	    }  
	}
	
	/*
	 * 获取日期所在月的天数
	 */
	public static int getDayOfMonth(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try { 
			Date date = sdf.parse(dateStr);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			
			return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);		
		} catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    	return 0;
	    }  
	}
	
	/*
	 * 日期增加天数
	 */
	public static String addDateDay(String dateStr, int day){
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {  
			Date date = sdf.parse(dateStr); 
		    Calendar calendar = Calendar.getInstance();
		    calendar.setTime(date);
	        calendar.add(Calendar.DAY_OF_YEAR,day);
	        
	        date = calendar.getTime();
	        return sdf.format(date);
	        
	    } catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    	return dateStr;
	    }   
	}	
	
	/*
	 * 时间增加、减少分钟
	 */
	public static String addDateMin(String dateStr, int min){
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {  
			Date date = sdf.parse(dateStr); 
		    Calendar calendar = Calendar.getInstance();
		    calendar.setTime(date);
	        calendar.add(Calendar.MINUTE,min);
	        
	        date = calendar.getTime();
	        return sdf.format(date);
	        
	    } catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    	return dateStr;
	    }   
	}	
	
	/*
	 * 时间增加、减少小时
	 */
	public static String addDateHour(String dateStr, int hour){
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {  
			Date date = sdf.parse(dateStr); 
		    Calendar calendar = Calendar.getInstance();
		    calendar.setTime(date);
	        calendar.add(Calendar.HOUR,hour);
	        
	        date = calendar.getTime();
	        return sdf.format(date);
	        
	    } catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    	return dateStr;
	    }   
	}	
	
	/**
	 * 获取本月份第一天
	 * @param withTime 是否需要时分秒
	 * @return
	 */
	public static String getFirstDay(boolean withTime){
		return getFirstDay(withTime, false);		
	}	
	
	public static boolean isValidInt(String value) {  
        try {  
            Integer.parseInt(value);  
        } catch (NumberFormatException e) {  
            return false;  
        }  
        return true;  
    } 
	
    public static boolean isNumber(String number){  
        number=number.trim();  
        String pointPrefix="(\\-|\\+){0,1}\\d*\\.\\d+";//浮点数的正则表达式-小数点在中间与前面  
        String pointSuffix="(\\-|\\+){0,1}\\d+\\.";//浮点数的正则表达式-小数点在后面  
        if(number.matches(pointPrefix)||number.matches(pointSuffix) || isValidInt(number))  
            return true;  
        else  
            return false;  
    } 
	
	
//	public static boolean isValidDate(String str) {
//		 //指定日期格式为四位年/两位月份/两位日期，注意yyyy/MM/dd区分大小写
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        try {
//       	 //设置lenient为false. 否则SimpleDateFormat会比较宽松地验证日期，比如2007/02/29会被接受，并转换成2007/03/01
//           format.setLenient(false);
//           format.parse(str);
//        } catch (ParseException e) {
//           // e.printStackTrace();
//          // 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
//           return false;
//       } 
//       return true;
//	 }
	
	
	/**
	 * 验证时间格式(yyyy-MM-dd)
	 * @param date 时间字符串
	 * @param type 校验类型	1=(yyyy-MM-dd) 2=yyyy-MM-dd HH:mm:ss
	 * @return 1=校验正确，2=校验失败
	 */
	public int isDate(int type,String date){
		int state = 0;
		if(isEmpty(date)){
			return state;
		}
		switch (type) {
		//
		case 1://yyyy-MM-dd
			String rexp = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";
			Pattern pat = Pattern.compile(rexp);
			Matcher mat = pat.matcher(date);
			boolean dateType = mat.matches();
			if(dateType){
				state = 1; 
			}else{
				state = 0;
			}
			break;
		case 2://yyyy-MM-dd HH:mm:ss
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				Date ndate = format.parse(date);
				String str = format.format(ndate);
				// success
				if (str.equals(date))
					state = 1;
				else
					state = 0;
			} catch (Exception e) {
				e.printStackTrace();
				state = -1;
			}
			break;
		default:
			state = 0;
		}
		return state;
	}
	

	
	/**
	 * 字符串转时间
	 * @param dateString 字符串
	 * @return 
	 */
	public static Date stringToDate(String dateString){
		/*
		try{  
		    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
		    return sdf.parse(dateString);  
		}catch (Exception e){
			logger.warn("日期转换失败！");
			return new Date();
		}  
		*/
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
	    Date time = null;  
	    try {  
	        time = format.parse(dateString);  
	    } catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    }  
	    //logger.debug("转换后的日期为："+time.toString());
	    return time;  
	}
	
	/**
	 * 字符串转时间，精确到秒
	 * @param dateString 字符串
	 * @return 
	 */
	public static Date stringToDateTime(String dateString){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	    Date time = null;  
	    try {  
	        time = format.parse(dateString);
	    } catch (Exception e) {  
	    	logger.warn("日期转换失败！");
	    }  
	    //logger.debug("转换后的日期为："+time.toString());
	    return time;  
	}
	
	/**
	 * 字符串转日历
	 * @param dateString 字符串
	 * @return 
	 */
	public static Calendar stringToCalendar(String dateString){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(stringToDate(dateString));
		return calendar;
	}
	
	/**
	 * 修改字符串类型的日期并返回
	 * @param dateString 字符型日期
	 * @param type Calendar中的常量（年月日）
	 * @param num 要修改的值
	 * @return 字符串类型的日期
	 */
	public static String changeStringDate(String dateString,int type,int num){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(stringToDate(dateString));
		calendar.add(type, num);
		return qsDate(calendar.getTime());
	}
	
	/**
	 * 获取年和月   （如 ：2014年12月）
	 * @param date 时间
	 * @return xx年xx月
	 */
	public static String getLocalMonth(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy年mm月");
		return df.format(date);
	}
	
	/**
	 * 获取月和日   （如 ：12月12日）
	 * @param date 时间
	 * @return xx月xx日
	 */
	public static String getLocalDay(Date date) {
		SimpleDateFormat df = new SimpleDateFormat("MM月dd日");
		return df.format(date);
	}

	/**
	 * ���ַ�����ת������������
	 * 
	 * @param strArray
	 *            : �ַ�����
	 * @return ��������
	 */
	public static int[] strArrayToIntArray(String[] strArray) {
		if (strArray.length == 0) {
			return null;
		}

		int[] intArray = new int[strArray.length];
		for (int i = 0; i < strArray.length; i++) {
			try {
				int temp = Integer.parseInt(strArray[i]);
				intArray[i] = temp;
			} catch (Exception e) {
				System.out.print(e);
			}
		}

		return intArray;
	}

	public static String stringOfChar(String s, int count) {
		String result = "";
		for (int i = 0; i < count; i++) {
			result = result.concat(s);
		}
		return result;
	}

	// type:get,set
	private static String asserMethodName(String type, String attributeName) {
		StringBuffer sb = new StringBuffer(16);
		char[] ch = attributeName.toCharArray();
		ch[0] = Character.toUpperCase(ch[0]);
		sb.append(type);
		sb.append(new String(ch));
		return sb.toString();
	}

	// get class get Method name by attribute
	public static String asserGetMethodName(String attributeName) {
		return asserMethodName("get", attributeName);
	}

	// get class set Method name by attribute
	public static String asserSetMethodName(String attributeName) {
		return asserMethodName("set", attributeName);
	}

	/** 获取类中的属性 ***/
	public static String getAttributes(Class<?> clazz) {
		List<Field> fields = getFields(clazz);
		String r = "";
		for (Field f : fields) {
			r = StringAdd(r, f.getName());
			// int mod=f.getModifiers();
			// System.out.println(f.getName()+"--属性修饰符＝"+Modifier.toString(mod));
		}
		return r;
	}

	/*** 递归获取父类中的属性 **/
	public static List<Field> getFields(Class<?> clazz) {
		List<Field> fields = new ArrayList<Field>();
		if (!clazz.getSuperclass().equals(Object.class)) {
			fields.addAll(getFields(clazz.getSuperclass()));
		}
		fields.addAll(Arrays.asList(clazz.getDeclaredFields()));
		return fields;
	}

	/*
	 * 
	 * public static void main(String[] arg){ String s = formatString("select %s
	 * from %s where %s", new String[]{"*", "tblDepart", "32"});
	 * System.out.print(s); }
	 */
	public static void main1(String[] arg) {
		String dateStr = getFormatSysDate("yyyyMMddHHmmssZ");
		

		System.out.println(dateStr);
		
		dateStr = getFormatSysDate("yyyyMMddHHmmss");
		System.out.println(dateStr);
	}

	/**
	 * 获取访问的全路径
	 */
	public static String fullPath(HttpServletRequest request) {
		return request.getRequestURI()+"?"+request.getQueryString();
	}
	
	public static String getIPAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;

	}

	/**
	 * <p>
	 * 根据GUID的前两个字母或数字添加两级子目录(子目录都是小写) <br>
	 * 例：<br>
	 * 文件路径 F:/testfile/tempfile/<br>
	 * GUID文件名 2e7f1a7a-04ee-45d0-98c3-ce6e6570a20e.xls<br>
	 * 文件全路径 F:/testfile/tempfile/2/e/2e7f1a7a-04ee-45d0-98c3-ce6e6570a20e.xls
	 * </p>
	 * 
	 * @param filePath
	 *            文件路径
	 * @param guidFileName
	 *            GUID文件名
	 * @return 组合后的文件全路径
	 */
	public static String getGUIDPath(String filePath, String guidFileName) {
		if (isEmpty(guidFileName) || isEmpty(filePath)) {
			return "";
		}
		String firstFolder = guidFileName.substring(0, 1).toLowerCase() + "/";
		String secondFolder = guidFileName.substring(1, 2).toLowerCase() + "/";
		String guidPath = filePath + firstFolder + secondFolder + guidFileName;
		return guidPath;
	}
	
	/**
	 * <p>
	 * 根据GUID的前两个字母或数字添加两级子目录(只返回文件夹路径) <br>
	 * 例：<br>
	 * 文件路径 F:/testfile/tempfile/<br>
	 * GUID文件名 2e7f1a7a-04ee-45d0-98c3-ce6e6570a20e.xls<br>
	 * 文件夹路径 F:/testfile/tempfile/2/e/
	 * </p>
	 * 
	 * @param filePath
	 *            文件路径
	 * @param guidFileName
	 *            GUID文件名
	 * @return 文件夹路径
	 */
	public static String getGUIDFolder(String filePath, String guidFileName) {
		if (isEmpty(guidFileName) || isEmpty(filePath)) {
			return "";
		}
		String firstFolder = guidFileName.substring(0, 1).toLowerCase() + "/";
		String secondFolder = guidFileName.substring(1, 2).toLowerCase() + "/";
		String guidPath = filePath + firstFolder + secondFolder;
		return guidPath;
	}
	
	/**
	 * 管理品牌类别使用：
	 * 例子： 2:2,2,3,3|3:1,2,3,4|4:3,4,4,4,5,6
     * 【类别ID】:【品牌ID】,【品牌ID】....|【类别ID】:【品牌ID】,【品牌ID】....
     * 去掉品牌ID中重复的值
	 * @param preventRepeat
	 * @return repeat
	 */
	public static String preventRepeat(String repeat) {
		String[] division = repeat.split(",");
		int[] shu = new int[division.length];
		Map<Integer, Object> map = new HashMap<Integer, Object>();
		for (int i = 0; i < division.length; i++) {
			shu[i] = Integer.parseInt(division[i]);
			map.put(shu[i], null);
		}
		repeat = "";
		for (int i : map.keySet()) {
			repeat += i + ",";
		}
		if (repeat.length() >= 2) {
			repeat = repeat.substring(0, repeat.length() - 1);
		}
		return repeat;
	}
	/**
	 * 管理品牌类别使用：取大类ID
	 * 例子： 2:2,2,3,3|3:1,2,3,4|4:3,4,4,4,5,6
	 * 【类别ID】:【品牌ID】,【品牌ID】....|【类别ID】:【品牌ID】,【品牌ID】....
	 * 得到所有大类的ID 2,3,4,.....
	 * @param str
	 * @return
	 */
	public static String interceptCharacter(String intercept){
		String colonB = "";
		String replaceCategory = intercept.replace("|", ",");
		String[] division = replaceCategory.split(",");
		for (int i = 0; i < division.length; i++) {
			if (division[i].indexOf(":") != -1) {
				String[] colonBA = division[i].split(":");
				if (colonBA.length >= 2) {
					colonB += colonBA[0] + ",";
				}
			}
		}
		if (colonB.length() >= 2) {
			colonB = colonB.substring(0, colonB.length() - 1);
		}
		return colonB;
	}
	/**
	 * 管理品牌类别使用：取品牌ID
	 * 例子： 2:2,2,3,3|3:1,2,3,4|4:3,4,4,4,5,6
	 * 【类别ID】:【品牌ID】,【品牌ID】....|【类别ID】:【品牌ID】,【品牌ID】....
	 * 得到所有品牌的ID 2,2,3,3,1,2,3,4,3,4,4,4,5,6.....
	 * @param str
	 * @return
	 */
	public static String section(String intercept){
		String repeat = "";
		String replaceBrand = intercept.replace("|", ",");
		String[] division = replaceBrand.split(",");
		for (int i = 0; i < division.length; i++) {
			if (division[i].indexOf(":") != -1) {
				String[] colonBA = division[i].split(":");
				if (colonBA.length >= 2) {
					repeat += colonBA[1] + ",";
				}
				continue;
			}
			repeat += division[i] + ",";
		}
		return repeat;
	}
	/**
	 * 管理品牌类别使用：组合大类和品牌的ID
	 * 例子： 2:2,3|3:1,2,3,4|4:3,4,5,6
	 * 【类别ID】:【品牌ID】,【品牌ID】....|【类别ID】:【品牌ID】,【品牌ID】....
	 * 得到所有大类和品牌的ID组合 [{classID:2,markID:2},{classID:2,markID:3},{classID:3,markID:1}]....
	 * @param str
	 * @return
	 */
	public static DayoList combinationClassAndMark(String str){
//		String repeat = "";
		String[] classAndMarkIDs= str.split("[|]");
		DayoList lstClassAndMarkID = new DayoList();
		for (int i = 0; i < classAndMarkIDs.length; i++) {
			String[] classAndMark = classAndMarkIDs[i].split(":");
			if (classAndMark.length==2) {
//				String classID = classAndMark[0];
//				String[] markIDs = classAndMark[1].split(",");
//				for (String markID : markIDs) {
//					DayoMap item = new DayoMap();
//					item.put("classid", classID);						
//					item.put("markid", markID);
//					lstClassAndMarkID.add(item);
//				}
				String classID = classAndMark[0];
				String markIDs = classAndMark[1];
				DayoMap item = new DayoMap();
				item.put("classid", classID);
				item.put("markid", markIDs);
				lstClassAndMarkID.add(item);
			} 
		}
		return lstClassAndMarkID;
	}
	/**
	 * 将数字转换为指定长度的字符(不够的位数以0代替)
	 * @param num 将要转换的数字
	 * @param length 转换后的字符串的长度
	 * @return
	 */
	public static String fillWithZero(int num,int length){
		String prefix = String.valueOf(num);//int类型转换成字符类型
		 while(prefix.length()<length){//判断长度
			 prefix= "0"+prefix;
		 }
		return prefix;
	}
	
	/** 获取本机的MAC地址(无间隔符 40167E6EB96F) **/
	public static String getMACStringNoSplit() {
		return getMACString("");
	}
	
	/** 获取本机的MAC地址(有间隔符 40-16-7E-6E-B9-6F) **/
	public static String getMACString() {
		return getMACString("-");
	}
	
	/** 获取本机的MAC地址 
	 * @param split 间隔符
	 */
	private static String getMACString(String split) {
		//获取网卡，获取地址
		try {
			InetAddress ia = InetAddress.getLocalHost();
			byte[] mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
			StringBuffer sb = new StringBuffer("");
			for(int i=0; i<mac.length; i++) {
				if(i!=0) {
					sb.append(split);
				}
				//字节转换为整数
				int temp = mac[i]&0xff;
				String str = Integer.toHexString(temp);
				if(str.length()==1) {
					sb.append("0"+str);
				}else {
					sb.append(str);
				}
			}
			//logger.debug("本机MAC地址:"+sb.toString().toUpperCase());
			return sb.toString().toUpperCase();
		} catch (Exception e) {
			logger.warn("未获取到MAC地址",e);
			return "";
		}
	}

	//获取指定长度的整数随机
	public static String getFixLenthString(int strLength) {  
	    Random rm = new Random();  
	      
	    // 获得随机数  
	    long pross = (long)((1 + rm.nextDouble()) * Math.pow(10, strLength));
	    // 将获得的获得随机数转化为字符串  
	    String fixLenthString = String.valueOf(pross);  
	  
	    // 返回固定的长度的随机数  
	    return fixLenthString.substring(1, strLength + 1);  
	} 
	
	public static DayoMap getLocalHost(){
		DayoMap resultMap = new DayoMap();
		
		try {
			InetAddress ia = InetAddress.getLocalHost();
			String localname = ia.getHostName();
			String localip = ia.getHostAddress();
			
			resultMap.put("ip", localip);
			resultMap.put("name", localname);
			return resultMap;
		} catch (Exception e) {
			e.printStackTrace();
			return resultMap;
		}
			
	}
	
	/**
	 * 获取时间差：时 分 秒Map
	 * @param endDate 截止时间
	 * @return 
	 */
	public DayoMap getTimeData(String endDate) {
		DayoMap timeData = new DayoMap();
		SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
		String fromDate = simpleFormat.format(new Date());
		long from = 0;
		long to = 0;
		try {
			from = simpleFormat.parse(fromDate).getTime();
			to = simpleFormat.parse(endDate).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int seconds = (int) ((to - from) / 1000);
		int temp = 0;
		temp = seconds / 3600;
		int hour = temp < 0 ? 0 : temp;
		temp = seconds % 3600 / 60;
		int minute = temp < 0 ? 0 : temp;
		temp = seconds % 3600 % 60;
		int second = temp < 0 ? 0 : temp;
		timeData.put("hour", hour);
		timeData.put("minute", minute);
		timeData.put("second", second);
		timeData.put("seconds", seconds < 0 ? 0 : seconds);
		return timeData;
	}

	//类似"20160530181211"的字符串拼接成标准时间字符串
	public static String getStdDateStr(String dateStr) {  
	
	String year = dateStr.substring(0,4);
	String month = dateStr.substring(4,6);
	String day = dateStr.substring(6,8);
	String hh = dateStr.substring(8,10);
	String mm = dateStr.substring(10,12);
	String ss = dateStr.substring(12,14);
	String date = year +"-" + month + "-" + day + " " + hh + ":" + mm + ":"+ ss;
	
	return date;
	}
	
    /*时间比大小*/  
    public static int timeCompare(String beginTime,String endTime){  
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        Calendar cBegin=Calendar.getInstance();  
        Calendar cEnd=Calendar.getInstance();  
        try {  
        	cBegin.setTime(formatter.parse(beginTime));  
        	cEnd.setTime(formatter.parse(endTime));  
        } catch (ParseException e) {  
            e.printStackTrace();  
        }  
        int result = cBegin.compareTo(cEnd);  
        return result;  
    }
	
    /** 
     * 处理的最大数字达千万亿位 精确到分 
     * @return 
     */  
    public static String digitUppercase(Object num){
    	/**
         * 汉语中数字大写
         */
        String[] CN_UPPER_NUMBER = { "零", "壹", "贰", "叁", "肆",
                "伍", "陆", "柒", "捌", "玖" };
        /**
         * 汉语中货币单位大写，这样的设计类似于占位符
         */
        String[] CN_UPPER_MONETRAY_UNIT = { "分", "角", "元",
                "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿", "拾", "佰", "仟", "兆", "拾",
                "佰", "仟" };
        /**
         * 特殊字符：整
         */
        String CN_FULL = "整";
        /**
         * 特殊字符：负
         */
        String CN_NEGATIVE = "负";
        /**
         * 金额的精度，默认值为2
         */
        int MONEY_PRECISION = 2;
        /**
         * 特殊字符：零元整
         */
        String CN_ZEOR_FULL = "零元" + CN_FULL;
    	if (num==null) {
    		logger.warn("金额转大写时传入的参数为空！");
    		return CN_ZEOR_FULL;
		}
    	BigDecimal numberOfMoney = new BigDecimal(Double.parseDouble(num.toString()));
    	StringBuffer sb = new StringBuffer();
        // -1, 0, or 1 as the value of this BigDecimal is negative, zero, or
        // positive.
        int signum = numberOfMoney.signum();
        // 零元整的情况
        if (signum == 0) {
            return CN_ZEOR_FULL;
        }
        //这里会进行金额的四舍五入
        long number = numberOfMoney.movePointRight(MONEY_PRECISION)
                .setScale(0, 4).abs().longValue();
        // 得到小数点后两位值
        long scale = number % 100;
        int numUnit = 0;
        int numIndex = 0;
        boolean getZero = false;
        // 判断最后两位数，一共有四中情况：00 = 0, 01 = 1, 10, 11
        if (!(scale > 0)) {
            numIndex = 2;
            number = number / 100;
            getZero = true;
        }
        if ((scale > 0) && (!(scale % 10 > 0))) {
            numIndex = 1;
            number = number / 10;
            getZero = true;
        }
        int zeroSize = 0;
        while (true) {
            if (number <= 0) {
                break;
            }
            // 每次获取到最后一个数
            numUnit = (int) (number % 10);
            if (numUnit > 0) {
                if ((numIndex == 9) && (zeroSize >= 3)) {
                    sb.insert(0, CN_UPPER_MONETRAY_UNIT[6]);
                }
                if ((numIndex == 13) && (zeroSize >= 3)) {
                    sb.insert(0, CN_UPPER_MONETRAY_UNIT[10]);
                }
                sb.insert(0, CN_UPPER_MONETRAY_UNIT[numIndex]);
                sb.insert(0, CN_UPPER_NUMBER[numUnit]);
                getZero = false;
                zeroSize = 0;
            } else {
                ++zeroSize;
                if (!(getZero)) {
                    sb.insert(0, CN_UPPER_NUMBER[numUnit]);
                }
                if (numIndex == 2) {
                    if (number > 0) {
                        sb.insert(0, CN_UPPER_MONETRAY_UNIT[numIndex]);
                    }
                } else if (((numIndex - 2) % 4 == 0) && (number % 1000 > 0)) {
                    sb.insert(0, CN_UPPER_MONETRAY_UNIT[numIndex]);
                }
                getZero = true;
            }
            // 让number每次都去掉最后一个数
            number = number / 10;
            ++numIndex;
        }
        // 如果signum == -1，则说明输入的数字为负数，就在最前面追加特殊字符：负
        if (signum == -1) {
            sb.insert(0, CN_NEGATIVE);
        }
        // 输入的数字小数点后两位为"00"的情况，则要在最后追加特殊字符：整
//        if (!(scale > 0)) {
//            sb.append(CN_FULL);
//        }
        return sb.toString()+CN_FULL;
    }
    
    /*
     * 不同类型数据库连接符
     */
    public static String dbStrPlus(boolean isOracle){
    	String plusStr = "+";
    	if (isOracle){
    		plusStr = "||";
    	}
    	return plusStr;
    }
    /**
     * @author 王文樟
     * @param request
     * 请求URI
     * @return
     */
    public static String getBasePath(HttpServletRequest request){
    	String path = request.getContextPath();
		String basePath = request.getScheme() + "://"
				+ request.getServerName() + ":" + request.getServerPort()
				+ path + "/";
		return basePath;
    }
    /**
     * 王文樟 20170531
     * 获取本机IP
     */
    public static String getLocationIP(){
	   	 Enumeration allNetInterfaces = null;
		try {
			allNetInterfaces = NetworkInterface.getNetworkInterfaces();
		} catch (SocketException e) {
			logger.error("-------------------------------获取本地IP异常-------------------------------");
			e.printStackTrace();
		}
	   	 InetAddress ip = null;
	   	 while (allNetInterfaces.hasMoreElements()){
	   	 NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
	   	 System.out.println(netInterface.getName());
	   	 Enumeration addresses = netInterface.getInetAddresses();
	   	 while (addresses.hasMoreElements()){
	   		 ip = (InetAddress) addresses.nextElement();
	   			 if (ip != null && ip instanceof Inet4Address){
	   				 return ip.getHostAddress();
	   			 } 
	   		 }
	   	 }
	   	 return null;
    }
    
    /**
	 * @描述：获取系统实时时间
	 * @param timeFormat
	 * 		时间日期格式
	 * @return
	 */
	public static String getRealTime(String timeFormat){
		Date date = new Date();
		DateFormat format = new SimpleDateFormat(timeFormat);
		String time = format.format(date);
		return time;
	}
}
