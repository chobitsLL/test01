package com.llg.model;


public class TBLUser{
	private int FID;

	public int getFID() {
		return FID;
	}

	public void setFID(int fID) {
		this.FID = fID;
	}

	private String FName;// 名称

	public String getFName() {
		return FName;
	}

	public void setFName(String fName) {
		this.FName = fName == null ? null : fName.trim();
	}
	

}
