//package com.unit;
//
//import java.sql.Timestamp;
//import java.sql.Types;
//import java.text.DateFormat;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//import org.apache.log4j.Logger;
//
//import com.entity.DayoMap;
//
//public class StringUtil {
//
//	public static Logger logger = Logger.getLogger("util");
//	
//	public StringUtil() {
//	}
//	
//	public static void main(String[] args) {
//		System.out.println();
//	}
//	
//	/**
//	 * 验证空
//	 * @return	true=空	false=非空
//	 */
//	public static boolean isEmpty(String str) {
//		return str == null || str.length() == 0;
//	}
//	
//	/**
//	 * 获取时间差：时 分 秒Map
//	 * @param endDate 截止时间
//	 * @return 
//	 */
//	public DayoMap getTimeData(String endDate) {
//		DayoMap timeData = new DayoMap();
//		SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
//		String fromDate = simpleFormat.format(new Date());
//		long from = 0;
//		long to = 0;
//		try {
//			from = simpleFormat.parse(fromDate).getTime();
//			to = simpleFormat.parse(endDate).getTime();
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//		int seconds = (int) ((to - from) / 1000);
//		int temp = 0;
//		temp = seconds / 3600;
//		int hour = temp < 0 ? 0 : temp;
//		temp = seconds % 3600 / 60;
//		int minute = temp < 0 ? 0 : temp;
//		temp = seconds % 3600 % 60;
//		int second = temp < 0 ? 0 : temp;
//		timeData.put("hour", hour);
//		timeData.put("minute", minute);
//		timeData.put("second", second);
//		timeData.put("seconds", seconds < 0 ? 0 : seconds);
//		return timeData;
//	}
//		
//	/**
//	 * 验证时间格式(yyyy-MM-dd)
//	 * @param date 时间字符串
//	 * @param type 校验类型	1=(yyyy-MM-dd) 2=yyyy-MM-dd HH:mm:ss
//	 * @return 1=校验正确，2=校验失败
//	 */
//	public int isDate(int type,String date){
//		int state = 0;
//		if(isEmpty(date)){
//			return state;
//		}
//		switch (type) {
//		//
//		case 1://yyyy-MM-dd
//			String rexp = "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";
//			Pattern pat = Pattern.compile(rexp);
//			Matcher mat = pat.matcher(date);
//			boolean dateType = mat.matches();
//			if(dateType){
//				state = 1; 
//			}else{
//				state = 0;
//			}
//			break;
//		case 2://yyyy-MM-dd HH:mm:ss
//			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			try {
//				Date ndate = format.parse(date);
//				String str = format.format(ndate);
//				// success
//				if (str.equals(date))
//					state = 1;
//				else
//					state = 0;
//			} catch (Exception e) {
//				e.printStackTrace();
//				state = -1;
//			}
//			break;
//		default:
//			state = 0;
//		}
//		return state;
//	}
//	
//	/**
//	 * @param timeFormat
//	 * 		时间日期格式
//	 * @return
//	 */
//	public static String getRealTime(String timeFormat){
//		Date date = new Date();
//		DateFormat format = new SimpleDateFormat(timeFormat);
//		String time = format.format(date);
//		return time;
//	}
//		
//}
