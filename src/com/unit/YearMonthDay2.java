package com.unit;

import java.awt.Dimension;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JComboBox;
import java.awt.*;
import javax.swing.JLabel;

import com.entity.DayoList;
import com.entity.DayoMap;

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.Calendar;

public class YearMonthDay2{

	public int STARTYEAR = 1900;// 年份的开始值
	public int ENDYEAR = Calendar.getInstance().get(Calendar.YEAR);// 年份的结束值

	public static void main(String[] args) {
		DayoMap result = new YearMonthDay2().queryDate(3, 2000, 4);
		System.out.println(result);
	}
	public DayoMap queryDate(int level, int year, int month) {
		int startyear = 1900;
		int endyear = Calendar.getInstance().get(Calendar.YEAR);
		DayoMap result = new DayoMap();
		DayoMap dateMap = new DayoMap();
		DayoList dateList = new DayoList();
		if(level == 1){
			// 年下拉选择框
			for (int i = startyear; i <= endyear; i++) {
				dateMap.put("fid", i);
				dateList.add(dateMap + "");
			}
		}else if(level == 2){
			// 月下拉选择框
			for (int i = 0; i < 12; i++) {
				dateMap.put("fid", i + 1);
				dateList.add(dateMap + "");
			}
		}else if(level == 3){
			if(year != 0 && month != 0){
				// 日下拉选择框
				for (int j = 0; j < 31; j++) {
					queryDays(dateList, year, month);
				}
			}
		}
		result.put("data", dateList);
		return result;
	}

	public void queryDays(DayoList dateList, int year, int month) {
		DayoMap dateMap = new DayoMap();
		int days = 31;
		if (month == 4 || month == 6 || month == 9 || month == 11) {
			days = 30;
		} else if (month == 2) {
			// 取得选中年份
			if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
				// 是闰年
				days = 29;
			} else {
				// 不是闰年
				days = 28;
			}
		}// if
		for (int j = 0; j < days; j++) {
			dateMap.put("fid", j + 1);
			dateList.add(dateMap + "");
		}// for
	}// if

}
