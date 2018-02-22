package com.unit;

import java.awt.Dimension;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JComboBox;
import java.awt.*;
import javax.swing.JLabel;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

public class YearMonthDay extends JFrame {

	private final int STARTYEAR = 2000;// 年份的开始值
	private final int ENDYEAR = 2020;// 年份的结束值

	JPanel contentPane;
	// 年月日的选择框
	JComboBox cboYear = new JComboBox();
	JComboBox cboMonth = new JComboBox();
	JComboBox cboDay = new JComboBox();
	// 年月日标签
	JLabel jLabel1 = new JLabel();
	JLabel jLabel2 = new JLabel();
	JLabel jLabel3 = new JLabel();

	public YearMonthDay() {

		setDefaultCloseOperation(EXIT_ON_CLOSE);
		jbInit();

	}

	private void jbInit() {

		contentPane = (JPanel) getContentPane();
		contentPane.setLayout(null);
		setSize(new Dimension(400, 300));
		setTitle("年月日下拉列表级联");

		// 年的下拉选择框
		cboYear.setFont(new java.awt.Font("Dialog", Font.BOLD, 13));
		cboYear.setBounds(new Rectangle(0, 0, 55, 18));

		// 月的下拉选择框
		cboMonth.setFont(new java.awt.Font("Dialog", Font.BOLD, 13));
		cboMonth.setBounds(new Rectangle(80, 0, 45, 18));
		cboMonth.addItemListener(new DateItemAdapter(this));

		// 日的下拉选择框
		cboDay.setFont(new java.awt.Font("Dialog", Font.BOLD, 13));
		cboDay.setBounds(new Rectangle(150, 0, 45, 18));
		// cboDay.setEditable(true);

		// 年的label
		jLabel3.setFont(new java.awt.Font("Dialog", Font.BOLD, 15));
		jLabel3.setText("年");
		jLabel3.setBounds(new Rectangle(60, 0, 20, 20));

		// 月的label
		jLabel2.setFont(new java.awt.Font("Dialog", Font.BOLD, 15));
		jLabel2.setText("月");
		jLabel2.setBounds(new Rectangle(130, 0, 20, 20));

		// 日的label
		jLabel1.setFont(new java.awt.Font("Dialog", Font.BOLD, 15));
		jLabel1.setText("日");
		jLabel1.setBounds(new Rectangle(200, 0, 20, 20));

		contentPane.add(cboYear);
		contentPane.add(cboMonth);
		contentPane.add(cboDay);
		contentPane.add(jLabel3);
		contentPane.add(jLabel2);
		contentPane.add(jLabel1);

		// 添加初始值
		AddInfo();
	}

	private void AddInfo() {

		// 年下拉选择框
		for (int i = STARTYEAR; i < ENDYEAR; i++) {
			cboYear.addItem("" + i);
		}

		// 月下拉选择框
		for (int i = 0; i < 12; i++) {
			cboMonth.addItem("" + (i + 1));
		}

		// 日下拉选择框
		for (int j = 0; j < 31; j++) {
			cboDay.addItem("" + (j + 1));

		}

	}

	public void cboMonth_itemStateChanged(ItemEvent e) {

		Object obj = cboMonth.getSelectedItem();// 取得选中月份

		if (obj != null) {
			cboDay.removeAllItems();// 清空日的下拉列表框

			int month = Integer.valueOf(obj.toString());
			int days = 31;
			if (month == 4 || month == 6 || month == 9 || month == 11) {
				days = 30;
			} else if (month == 2) {
				// 取得选中年份
				int year = Integer.parseInt(cboYear.getSelectedItem()
						.toString());

				if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
					// 是闰年
					days = 29;
				} else {
					// 不是闰年
					days = 28;
				}

			}// if

			for (int j = 0; j < days; j++) {
				cboDay.addItem("" + (j + 1));
			}// for

		}// if
	}// if

}// end class
// 事件监听器

class DateItemAdapter implements ItemListener {

	private YearMonthDay adaptee;

	DateItemAdapter(YearMonthDay adaptee) {
		this.adaptee = adaptee;
	}

	public void itemStateChanged(ItemEvent e) {
		adaptee.cboMonth_itemStateChanged(e);
	}
}
