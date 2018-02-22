package com.aop;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.aop.webservice.IOrderWebService;
import com.entity.DayoMap;


@Component
@Aspect
public class AppUserAOP {

	@Resource(name="orderService")  
	private IOrderWebService orderService;
	Logger logger = Logger.getLogger("controller");
	
	
	public AppUserAOP(){
		System.out.println("------------AppUserAOP------------");
	}

	// 指定切入点匹配表达式，注意它是以方法的形式进行声明的。
	// 即切点集合是：aop.annotation包下所有类所有方法
	// 第一个* 代表返回值类型
	// 如果要设置多个切点可以使用 || 拼接
	@Pointcut("execution(* com.bky.controller.*.aop_*(..))")
	public void anyMethod() {
	}

	// 环绕通知（##环绕通知的方法中一定要有ProceedingJoinPoint 参数,与
	// Filter中的 doFilter方法类似）
	@Around("anyMethod()")
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		// 调用目标方法之前执行的动作
		logger.debug("AppUserAOP：调用方法开始！");
		// 调用的方法名
		String method = pjp.getSignature().getName();
		logger.debug("AppUserAOP-1-当前调用方法：" + method);

		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		//String url = request.get
		String token=request.getParameter("token");
		DayoMap resultUser = new DayoMap();
//		TBUser user = (TBUser)request.getSession().getAttribute("user");
//		if(user == null){
//			user = AppUserRestful.getUser(token.replace(" ","+"));
//			if(user == null){
//				DayoMap map = orderService.queryAPPUser(token);
//				if(map.getBoolean("result")){
//					user = (TBUser)map.get("user");
//				}else{
//					resultUser.put("result", false);
//					resultUser.put("msg", "当前客户端未登录！");
//					return resultUser;
//				}
//			}
//		}
//		logger.debug("完整路径：" + StringUtil.fullPath(request));

		// 执行完方法的返回值：调用proceed()方法，就会触发切入点方法执行
		Object result = pjp.proceed();// result的值就是被拦截方法的返回值
		logger.debug("AppUserAOP：调用方法结束！");
		return result;
	}

}
