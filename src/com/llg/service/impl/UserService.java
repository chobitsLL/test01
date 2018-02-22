package com.llg.service.impl;

import java.util.Collection;
import java.util.List;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.DayoList;
import com.entity.DayoMap;
import com.llg.dao.UserMapper;
import com.llg.model.TBLUser;
import com.llg.service.IUserService;
@Service("userService")
public class UserService implements IUserService {
	
	private UserMapper userDao;
	public UserMapper getUserDao() {
		return userDao;
	}
	@Autowired
	public void setUserDao(UserMapper userDao) {
		this.userDao = userDao;
	}

	@Override
	public DayoList getAll() {
		List<TBLUser> l = userDao.getAll();
		return DayoList.listToDayoList(l);
	}
	
	public static void main(String[] args) {
		String s = "{\"user\":{\"fid\":25,\"fname\":\"朱双\"}}";
		JSONObject jsStr = JSONObject.fromObject(s);
		String ss= jsStr.getString("user");
		DayoMap map = DayoMap.fromObject(ss);
		System.out.println(map);
	}

}
