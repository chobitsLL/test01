package com.unit;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.log4j.Logger;

import com.entity.StringUtil;

public class MD5_SHA1_Util {
	public static Logger logger = Logger.getLogger("util");
	private static final String TYPE_MD5 = "MD5";
	private static final String TYPE_SHA1 = "SHA1";

	private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	/**
	 * 加密字符串
	 * 
	 * @param 加密方式
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encode(String algorithm, String str) {
		if (str == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
			messageDigest.update(str.getBytes());
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	/**
	 * 加密（MD5加密）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeByMD5(String str) {
		if (str == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(TYPE_MD5);
			messageDigest.update(str.getBytes("utf-8"));
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 加密（MD5加密-大写）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串(大写)
	 */
	public static String encodeByMD5_Upper(String str) {
		return encodeByMD5(str).toUpperCase();
	}
	
	/**
	 * 加密（SHA1加密）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeBySHA1(String str) {
		if (str == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(TYPE_SHA1);
			messageDigest.update(str.getBytes());
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 加密（MD5加密值+SHA1加密值）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeBy_MD5_SHA1(String str) {
		String encodeStr = encodeByMD5(str);
		encodeStr += encodeBySHA1(str);
		return encodeStr;
	}

	/**
	 * Takes the raw bytes from the digest and formats them correct.
	 * 
	 * @param bytes
	 *            the raw bytes from the digest.
	 * @return the formatted bytes.
	 */
	private static String getFormattedText(byte[] bytes) {
		int len = bytes.length;
		StringBuilder buf = new StringBuilder(len * 2);
		// 把密文转换成十六进制的字符串形式
		for (int j = 0; j < len; j++) {
			buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
			buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
		}
		return buf.toString();
	}
	
	/********************************************************************/
	
	/**
	 * 加密（MD5加密）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeByteByMD5(byte[] bytes) {
		if (bytes == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(TYPE_MD5);
			messageDigest.update(bytes);
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 加密（SHA1加密）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeByteBySHA1(byte[] bytes) {
		if (bytes == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance(TYPE_SHA1);
			messageDigest.update(bytes);
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 加密（MD5加密值+SHA1加密值）
	 * @param str 要加密的字符串
	 * @return String 加密后的字符串
	 */
	public static String encodeByteBy_MD5_SHA1(byte[] bytes) {
		String encodeStr = encodeByteByMD5(bytes);
		encodeStr += encodeByteBySHA1(bytes);
		return encodeStr;
	}

	public static void main(String[] args) {
		System.out.println("111111 MD5  :"
				+ MD5_SHA1_Util.encodeByMD5("111111"));
		System.out.println("111111 MD5  :"
				+ MD5_SHA1_Util.encode("MD5", "111111"));
		System.out.println("111111 SHA1 :"
				+ MD5_SHA1_Util.encode("SHA1", "111111"));
		System.out.println("111111 MD5+SHA1 :"
				+ MD5_SHA1_Util.encodeBy_MD5_SHA1("111111"));
		System.out.println("------------------------------");
		byte[] testBytes = new byte[]{49,49,49,49,49,49};
		System.out.println("111111 Byte MD5  :"
				+ MD5_SHA1_Util.encodeByteByMD5(testBytes));
		System.out.println("111111 Byte SHA1 :"
				+ MD5_SHA1_Util.encodeByteBySHA1(testBytes));
		System.out.println("111111 Byte MD5+SHA1 :"
				+ MD5_SHA1_Util.encodeByteBy_MD5_SHA1(testBytes));
		testSign();
	}
	/**
	 * 王文樟新增16或32位MD5加密
	 * @param input
	 * @param bit
	 * @return
	 * @throws Exception
	 */
	public static String MD5Code(String input, int bit) throws Exception {
		try {
			MessageDigest md = MessageDigest.getInstance(System.getProperty(
					"MD5.algorithm", "MD5"));
			if (bit == 16)
				return getFormattedText(md.digest(input.getBytes("utf-8")))
						.substring(8, 24);
			return getFormattedText(md.digest(input.getBytes("utf-8")));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			throw new Exception("Could not found MD5 algorithm.", e);
		}
	}
	
	/**
	 * 生成接口参数的签名 
	 * @param param 请传入 TreeMap 
	 * @param app_value 秘钥
	 * @return 带签名的参数 
	 */
	public static Map<String, String> createSign(Map<String, String> param,String app_value) {
		String data = "";
		Set<Map.Entry<String, String>> set = param.entrySet();
		logger.debug("------------------------------");
		for (Entry<String, String> entry : set) {
			logger.debug(entry.getKey() + ":" + entry.getValue());
			data += (entry.getKey() + entry.getValue());
		}
		logger.debug("------------------------------");
		//String sign=map.get("sign");
        data = app_value+data+app_value;
        String sign = MD5_SHA1_Util.encodeByMD5(data);
        param.put("sign", sign);
		return param;
	}
	
	/**
	 * 生成接口参数的URL
	 * @param param 请传入 TreeMap
	 * @param app_value 秘钥
	 * @return 带签名的URL
	 */
	public static String createSingUrl(Map<String, String> param,String app_value) {
		param = createSign(param, app_value);
		String url = "";
		Set<Map.Entry<String, String>> set = param.entrySet();
		logger.debug("------------------------------");
		for (Entry<String, String> entry : set) {
			String item = entry.getKey()+"="+entry.getValue();
			url = StringUtil.StringAdd(url, item, "&");
		}
		logger.debug("------------------------------");
		return "?"+url;
	}
	
	public static void testSign() {
		String app_value = "caishenERP";
		Map<String, String> param = new TreeMap<String, String>();
		param.put("app_key", "139901");
		param.put("timestamp", StringUtil.getSysDateTime());
		param.put("mark", "海尔");
		param.put("model", "BCD-UNFHW39");
		String url = createSingUrl(param, app_value);
		String base = "http://127.0.0.1:8080/PriceCompare/restful/compareprice/comparePriceByMarkModel.do";
		logger.debug(base+url);
	}
}
