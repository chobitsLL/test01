package com.llg.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.context.annotation.Scope;

import com.entity.DayoList;
import com.entity.DayoMap;
import com.llg.service.IUserService;
import com.unit.YearMonthDay;

@Controller
@Scope("request")
@RequestMapping("/user")
public class UserController {
	
	
	@Resource(name="userService")
	private IUserService userService;
	
	@RequestMapping("getAll")
	public DayoMap getAddInfoAll(HttpServletRequest request){
		DayoMap result = new DayoMap();
		try {			
			DayoList list = userService.getAll();
//			DayoList dylist = list;
			System.out.println(list);
//			request.setAttribute("addLists", list);
			result.put("addLists", list);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "信息载入失败！具体异常信息：" + e.getMessage());
			return result;
		}
	}	
	
	@RequestMapping("testYearMonthDay")
	public DayoMap testYearMonthDay(){
		DayoMap result = new DayoMap();
		YearMonthDay testDate = new YearMonthDay();
        testDate.setVisible(true);
        testDate.setBounds(200, 200, 250, 100);
		return result;
	}

}
