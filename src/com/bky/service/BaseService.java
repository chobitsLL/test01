package com.bky.service;

import java.util.List;

import com.bky.model.Add;

public interface BaseService {
	
	public String addInfo(Add addInfo);
	
	public List<Add> getAll();
	
	public String delete(String id);
	
	public Add findById(String id);
	
	public String update(Add addInfo);

}
