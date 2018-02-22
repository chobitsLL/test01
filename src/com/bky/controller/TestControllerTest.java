package com.bky.controller;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bky.model.User;

public class TestControllerTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void testSetUpBeforeClass() {
		fail("Not yet implemented");
	}

	@Test
	public void testTearDownAfterClass() {
		fail("Not yet implemented");
	}

	@Test
	public void testTest() {
		Double d = new Double("12.9");
		System.out.println(d);

		BeanFactory factory = new ClassPathXmlApplicationContext(
				"com/bky/controller/set.xml");
		// User user = (User) factory.getBean("user");
		// User user = (User) factory.getBean("user",User.class);
		// User user = (User) factory.getBean(User.class); //只有唯一的bean的时候才使用这种方式
		// System.out.println(user);
		System.out.println(factory.getType("user")); // 获取user实例的类型
		User user = (User) factory.getBean("user");
		System.out.println(user.getId());
		User user2 = (User) factory.getBean("user");
		System.out.println(user == user2);// true -- 单例 --这是可以控制的在配置文件中 bean
											// scope="prototype"-->会变成原型模式
											// 这时结果会是false
		System.out.println(factory.isPrototype("user"));// 是否为原型 false
		System.out.println(factory.isSingleton("user"));// 是否为单例 true

		System.out.println(factory.isTypeMatch("user", User.class));// 判断
																	// user实例是否为这种类型
																	// true

		String[] str = factory.getAliases("user"); // 获取别名
		for (int i = 0; i < str.length; i++) {
			System.out.println(str[i]);// user2
		}
	}

}
