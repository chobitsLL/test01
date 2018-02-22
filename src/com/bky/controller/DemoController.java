package com.bky.controller;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.DayoMap;

@Controller
@Scope("request")
@RequestMapping("/demo")
public class DemoController {
	Logger logger = Logger.getLogger("Controller");
	@ResponseBody
	@RequestMapping("/test1")
	public DayoMap aop_test1(){
		DayoMap map = new DayoMap();
		logger.debug("111111111111111111");
		System.out.println("进入aop_test1---------------------------");
		return map;
	}
		
}
