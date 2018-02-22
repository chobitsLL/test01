package com.unit;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

 
public class DayoNewsRequest {

	public static String CONTENT = "";
	public static int USERID = 0;
	public static String ACCOUNT = "";
	
    public static final String GET_URL = "";

    public static String POST_URL = "http://114.55.88.173:9988/sms.aspx";
	/**
	 * 发送接口
	 */
    public static void sendNews(int type) throws Exception{
    	String content = "";
		if(type == 1){
			content = "亲爱的顾客，您好，长虹-彩电-40U3您购买的商品已在配送途中，请保持联系方式畅通收货后签字确认！【大有时代】";
		}else{
			content = "您的验证码为 4005（请妥善保存切勿告知他人），请在页面中输入以完成验证，祝您购物愉快。退订回T【大有时代】";
		}
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=send&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888&mobile="
				+ "17710135319&content=" + content + "&sendTime=&extno=";
		readContentFromPost(CONTENT,POST_URL);
    }
    
	/**
	 * 余额及已发送量查询接口
	 */
	public static void overageNews(int type) throws Exception{
//		POST_URL = "http://114.55.88.173:9988/sms.aspx";
		String content = "";
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=overage&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888";
		readContentFromPost(CONTENT,POST_URL);
   }
	
	/**
	 * 非法关键词查询接口
	 */
	public static void checkkeywordNews(int type) throws Exception{
		String content = "";
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=checkkeyword&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888"
				+ "&content="+content;
		readContentFromPost(CONTENT,POST_URL);
	}
	
	/**
	 * 状态报告接口
	 */
	public static void queryNews(int type) throws Exception{
		POST_URL = "http://114.55.88.173:9988/statusApi.aspx";
		String content = "";
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=query&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888"
				+ "&statusNum=100";
		readContentFromPost(CONTENT,POST_URL);
	}
	
	/**
	 * 上行接口
	 */
	public static void callQueryNews(int type) throws Exception{
		POST_URL = "http://114.55.88.173:9988/callApi.aspx";
		String content = "";
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=query&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888"
				+ "";
		readContentFromPost(CONTENT,POST_URL);
	}
    
	/**
	 * 密码修改接口
	 */
	public static void changespwdNews(int type) throws Exception{
		String content = "";
		content=URLEncoder.encode(content, "UTF-8");
		CONTENT = "action=changespwd&userid="+USERID+"&account="+ACCOUNT+"&password=caishen888"
				+ "&newpwd=caishen888&renewpwd=caishen888";
		readContentFromPost(CONTENT,POST_URL);
	}
	
    
    public static void main(String[] args) throws Exception {
    	//1=行业管理,2=营销管理
    	int type = 1;
    	if(type == 1){
			USERID=409;
			ACCOUNT = "caishenhy";
		}else{
			USERID=408;
			ACCOUNT = "caishenyx";
		}
    	
    	//发送接口
//    	sendNews(type);
    	//额及已发送量查询接口
//    	overageNews(type);
    	//非法关键词查询
//    	checkkeywordNews(type);
    	//状态报告接口
//    	queryNews(type);
    	//上行接口
//    	callQueryNews(type);
    	//密码修改接口
//    	changespwdNews(type);
	}
    
    
  //post()请求
    public static void readContentFromPost(String CONTENT , String POST_URL)throws IOException{
       URL postUrl = new URL(POST_URL);

       HttpURLConnection connection = (HttpURLConnection)postUrl.openConnection();
       connection.setDoOutput(true);
       connection.setDoInput(true);
       connection.setRequestMethod("POST");
       connection.setUseCaches(false);
       connection.setInstanceFollowRedirects(true);
       connection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
       connection.connect();
       DataOutputStream out = new DataOutputStream(connection.getOutputStream());
       String content = CONTENT;
       out.writeBytes(content);
       out.flush();
       out.close();
       BufferedReader reader =new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
       String line="";
       System.out.println("=============================");
       System.out.println("Contents of post request");
       System.out.println("=============================");
       while((line =reader.readLine())!=null){
           System.out.println(line);
       }
       System.out.println("=============================");
       System.out.println("Contents of post request ends");
       System.out.println("=============================");
       reader.close();
       connection.disconnect();
   }

//get()请求
    public static void readContentFromGet()throws IOException{
        // 拼凑get请求的URL字串，使用URLEncoder.encode对特殊和不可见字符进行编码
        String getURL = GET_URL +"&activatecode="+URLEncoder.encode("中国聚龙", "utf-8");
        URL getUrl =new URL(getURL);
        HttpURLConnection connection = (HttpURLConnection)getUrl.openConnection();
        connection.connect();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
        //设置编码,否则中文乱码
        System.out.println("=============================");
        System.out.println("Contents of get request");
        System.out.println("=============================");
        String lines;
        while((lines =reader.readLine())!=null){
            System.out.println(lines);
        }
        reader.close();
        connection.disconnect();
        System.out.println("=============================");
        System.out.println("Contents of get request ends");
        System.out.println("=============================");

    }

}