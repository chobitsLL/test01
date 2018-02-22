package com.bky.controller;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bky.model.Add;
import com.bky.service.BaseService;

@Controller
public class BaseController {
	
	
	@Resource(name="baseService")
	private BaseService baseService;
	
	
	@SuppressWarnings("finally")
	@RequestMapping("addInfo")
	public String aop_add(Add add,HttpServletRequest request){
		try {			
			add.setId(UUID.randomUUID().toString());
			System.out.println(add.getId() + ":::::" + add.getTname() + ":::::" + add.getTpwd());
			String str = baseService.addInfo(add);
			System.out.println(str);
			request.setAttribute("InfoMessage", str);
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "添加信息失败！具体异常信息：" + e.getMessage());
		} finally {			
			return "result";
		}
	}
	
	@RequestMapping("getAll")
	public String getAddInfoAll(HttpServletRequest request){
		try {			
			List<Add> list = baseService.getAll();
			System.out.println(list);
			request.setAttribute("addLists", list);
			return "listAll";
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "信息载入失败！具体异常信息：" + e.getMessage());
			return "result";
		}
	}	
	
	@ResponseBody
	@RequestMapping("getAlls")
	public List<Add> aop_getAlls(){
		try {			
			List<Add> list = baseService.getAll();
			System.out.println(list);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@SuppressWarnings("finally")
	@RequestMapping("del")
	public String del(String tid,HttpServletRequest request){
		try {			
			String str = baseService.delete(tid);
			request.setAttribute("InfoMessage", str);
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "删除信息失败！具体异常信息：" + e.getMessage());
		} finally {			
			return "result";
		}
	}
	@RequestMapping("modify")
	public String modify(String tid,HttpServletRequest request){
		try {			
			Add add = baseService.findById(tid);
			request.setAttribute("add", add);
			return "modify";
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "信息载入失败！具体异常信息：" + e.getMessage());
			return "result";
		}
	}
	@SuppressWarnings("finally")
	@RequestMapping("update")
	public String update(Add add,HttpServletRequest request){
		try {			
			String str = baseService.update(add);
			request.setAttribute("InfoMessage", str);
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("InfoMessage", "更新信息失败！具体异常信息：" + e.getMessage());
		} finally {			
			return "result";
		}
	}

}
