package com.llg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

public class testMain {

	public static void test1(){
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		List<String> list = new ArrayList<String>();
		list.add("1");
		list.add("2");
		list.add("3");
		map.put("map", list);
		JSONObject jsonObject = JSONObject.fromObject(map);  
		System.out.println(jsonObject);
		
	}
	
	public static void main(String[] args) {
		test1();
	}
}
