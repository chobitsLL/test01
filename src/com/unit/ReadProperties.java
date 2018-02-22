package com.unit;


import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

/**
 * @描述：读取配置文件
 * @作者：王金城
 * @日期：2016-6-15 $
 */
public class ReadProperties {
	
	/**
	 * @描述：读取配置文件
	 * @作者：郭磊磊
	 * @日期：2016-6-15 $
	 * @param parma
	 * 		要的读取的参数
	 * @param filename
	 * 		配置文件名
	 * @return
	 */
	public static String getPropertesValue(String parma, String filename) {
		// 新建获取properties文件内容的对象
		Properties pro = new Properties();
		// 获取配置文件的实例
//		ResourceLoader resourceLoader = new DefaultResourceLoader();
		// 读取文件流的内容
//		InputStream IS;
//		// 加载配置文件
//		Resource resource = resourceLoader.getResource(filename);
		// 读取内容
		try {
//			IS = resource.getInputStream();
			// 加载内容
			pro.load(new InputStreamReader(ReadProperties.class.getClassLoader().getResourceAsStream(filename), "UTF-8")); 
//			pro.load(IS);
			// 获取配置文件内的数据
			return pro.getProperty(parma).trim();
		} catch (IOException e) {
			return "";
		}
	}
	
	public static String getDbValue(String parma) {
		// 新建获取properties文件内容的对象
		Properties pro = new Properties();
		// 获取配置文件的实例
		ResourceLoader resourceLoader = new DefaultResourceLoader();
		// 读取文件流的内容
		InputStream IS;
		// 加载配置文件
		Resource resource = resourceLoader.getResource("config.properties");
		// 读取内容
		try {
			IS = resource.getInputStream();
			// 加载内容
			pro.load(IS);
			// 获取配置文件内的数据
			return pro.getProperty(parma).trim();
		} catch (IOException e) {
			return "";
		}
	}
}
