package com.unit;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import net.sf.json.JSONObject;
import sun.org.mozilla.javascript.internal.json.JsonParser;

 
public class postRequest {

	public static final String CONTENT = "telNo=18600267683&pwd=1&type=1&unitID=15";
    public static final String GET_URL = "http://www.cngolon.com/request.action?key=j0r56u2";
    public static final String POST_URL = "http://192.168.13.150/dayoshop/restful/AppUser/login.do";
    
    
    public static void main(String[] args) {
    	try {
    		String CONTENT = "content={\"no\":\"1709010065\",\"phone\":\"18980008724\",\"actno\":\"20170901\",\"stockcode\":\"1023698\",\"buyname\":\"张三\",\"telno\":\"13717817766\",\"address\":\"石家庄市裕华区\",\"price\":30,\"date\":\"2017-09-07\"}";
    		String POSTURL = "http://localhost/dayoshop/PreStockRestful/InsertPreStock.do";
			String token = readContentFromPost(CONTENT,POSTURL);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
  //post()请求
    public static String readContentFromPost(String CONTENT,String POSTURL)throws IOException{
       URL postUrl = new URL(POSTURL);

       HttpURLConnection connection = (HttpURLConnection)postUrl.openConnection();
       connection.setDoOutput(true);
       connection.setDoInput(true);
       connection.setRequestMethod("POST");
       connection.setUseCaches(false);
       connection.setInstanceFollowRedirects(true);
       connection.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
       connection.connect();
       DataOutputStream out = new DataOutputStream(connection.getOutputStream());
//     String content ="type=2&userID=7523&oldPwd=123&pwd=1&confirmPwd=1";
//     String content ="telNo=17710135319&unitID=15";
       String content = CONTENT;
//     String content ="orderNo=1&amount=1&buyerId=1&subject=1";
       out.writeBytes(content);
       out.flush();
       out.close();
       BufferedReader reader =new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
       String line;
       System.out.println("=============================");
       System.out.println("Contents of post request");
       System.out.println("=============================");
       String str = "";
       JSONObject jsStr = null;
       while((line =reader.readLine())!=null){
    	   jsStr = JSONObject.fromObject(line);
           System.out.println(line);
       }
       str = jsStr.getString("token");
       System.out.println("=============================");
       System.out.println("Contents of post request ends");
       System.out.println("=============================");
       reader.close();
       connection.disconnect();
       return str;
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