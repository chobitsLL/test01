package com.file.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/download")
public class DownloadController {

	Logger logger = Logger.getLogger("controller");
	
	
	//http://www.iteye.com/topic/1125784   问题案例
	@RequestMapping("/ResponseEntity")  //上传了之后再下载
    public ResponseEntity<byte[]> download()throws IOException{
    	
        String path="D://";  //获取文件所在路径
//        String filename=new String(filename.getBytes("ISO-8859-1"),"UTF-8");     //不知何故，result.jsp的请求参数是ISO-8859-1编码的，但明明设置了charset=utf-8
        String filename="O2O客户端_APP接口说明文档.docx";     //不知何故，result.jsp的请求参数是ISO-8859-1编码的，但明明设置了charset=utf-8
        File file=new File(path+File.separator+filename);
        HttpHeaders headers=new HttpHeaders();
        String downloadFileName=new String(filename.getBytes("UTF-8"),"ISO-8859-1");  //少了这句，可能导致下载中文文件名的文档，只有后缀名的情况
        headers.setContentDispositionFormData("attachment", downloadFileName);//告知浏览器以下载方式打开
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);//设置MIME类型
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),headers,HttpStatus.CREATED);//
        //用FileUpload组件的FileUtils读取文件，并构建成ResponseEntity<byte[]>返回给浏览器
        //HttpStatus.CREATED是HTTP的状态码201
    }
}
