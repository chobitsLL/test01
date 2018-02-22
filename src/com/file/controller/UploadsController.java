package com.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.entity.DayoList;
import com.entity.DayoMap;
import com.entity.JSONUtil;
import com.entity.StringUtil;
import com.unit.ReadProperties;

@Controller
@RequestMapping("/upload")
public class UploadsController {
	Logger logger = Logger.getLogger("controller");
	
	public static String getUUID() {
		return UUID.randomUUID().toString();
	}
    private static final HashMap<String, String> TypeMap = new HashMap<String, String>();
    //设置文件允许上传的类型
    static {
        TypeMap.put("image", "gif,jpg,jpeg,png,bmp");
        TypeMap.put("flash", "swf,flv");
        TypeMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
        TypeMap.put("file", "doc,docx,xls,xlsx,ppt,pptx,htm,html,txt,dwg,pdf");
    }
	
	// 设置文件上传大小
    public static long fileSize = 3 * 1024 * 1024;
    /**
     * 文件上传
     *
     * @param file
     * @param request
     * @return message: -1 没有文件上传 0 上传成功 1 上传失败 2 文件超过上传大小 3 文件格式错误 4 上传文件路径非法 5 上传目录没有写权限
     *      
     *
     */
    @RequestMapping(value = "/imageUpload", method = RequestMethod.POST)
    public void imageUpload(
            @RequestParam("file") CommonsMultipartFile file,
            @RequestParam(required = false) String filePre, HttpServletRequest request, HttpServletResponse response) {
        if (!file.isEmpty()) {
         
            //当文件超过设置的大小时，则不运行上传
            if (file.getSize() > fileSize) {
                backInfo(response, false, 2, "");
                return;
            }
            //获取文件名后缀
            String OriginalFilename = file.getOriginalFilename();
            String fileSuffix = OriginalFilename.substring(
                    OriginalFilename.lastIndexOf(".") + 1).toLowerCase();
             
            //String fileSuffix="jpeg";
             
            //判断该类型的文件是否在允许上传的文件类型内
            if (!Arrays.asList(TypeMap.get("file").split(",")).contains(
                    fileSuffix)) {
                backInfo(response, false, 3, "");
                return;
            }
            if (!ServletFileUpload.isMultipartContent(request)) {
                backInfo(response, false, -1, "");
                return;
            }
            // 检查上传文件的目录
//          File uploadDir = new File(SysProperty.BASE_PATH);
            File uploadDir = new File("d:\\simperfect\\files\\");
            if (!uploadDir.isDirectory()) {
                if (!uploadDir.mkdir()) {
                    backInfo(response, false, 4, "");
                    return;
                }
            }
            // 是否有上传的权限
            if (!uploadDir.canWrite()) {
                backInfo(response, false, 5, "");
                return;
            }
             
            //新文件名
            String newname = "";
            if(null != filePre){
                newname += filePre;//对应模块上传的文件名前缀
            }
             newname += getUUID() + "." + fileSuffix;
 
            try {
 
                 //创建文件
//            	File saveFile = new File(SysProperty.BASE_PATH, newname);
            	File saveFile = new File("d:\\simperfect\\files\\", newname);
                //保存文件
                file.transferTo(saveFile);
                //FileTranser.saveFielByFileName(file, uploadPath, newname);
                backInfo(response, true, 0, newname);
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
                backInfo(response, false, 1, "");
                return;
            }
        } else {
            backInfo(response, false, -1, "");
            return;
        }
 
    }
    /**
     * 返回json信息
     * @param response
     * @param flag
     * @param message
     * @param fileName
     */
    private void backInfo(HttpServletResponse response, boolean flag, int message,
            String fileName) {
        String json  = "";
        //json=fileName;
        if (flag) {
            json = "{ \"status\": \"success";
        } else {
            json = "{ \"status\": \"error";
        }
        json += "\",\"fileName\": \"" + fileName + "\",\"message\": \"" + message + "\"}";
        try {
            //response.setContentType("text/javascript");
            response.setContentType("text/html; charset=utf-8");
            response.getWriter().print(json);
            logger.info(json.toString());
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
    }
    
    
	@RequestMapping(value="/payMoney",method=RequestMethod.POST)
	@ResponseBody
	public DayoMap payMoney(){
		DayoMap result = new DayoMap();
		System.out.println("1sdfdsf ");
		return result;
	}

    /**
     * @描述：logo上传
     * @param httpSession
     * @param file 文件
     * @param hotelId 酒店id
     * @return
     */
	@ResponseBody
	@RequestMapping(value = "/upLoadFile", produces="text/html;charset=utf-8")
	public String upLoadFile(HttpSession httpSession, @RequestParam MultipartFile[] fileImage)  {
		try {
			//文件储存路径
			String savePath = ReadProperties.getPropertesValue("uploadFilePath", "config.properties");
			//虚拟路径
			String virtualFilePath = ReadProperties.getPropertesValue("virtualFilePath", "config.properties");
			//文件上传最大值
			String uploadFileSize = ReadProperties.getPropertesValue("uploadFileSize", "config.properties");
			File f = new File(savePath);
			if (!f.exists()) {
	            f.mkdirs();
	        }
			
			for (MultipartFile mf : fileImage) {  
	            if(!mf.isEmpty()){
	            	if(mf.getSize() > Long.valueOf(uploadFileSize).longValue() * 1000){
	    				return "size_limit";
	    			}
	    			// 获得上传的文件名
	    			String fileName = mf.getOriginalFilename();
	    			
	    			String time = StringUtil.getRealTime("yyyyMMddHHmmssSSS");
	    			
	    			
	    			mf.transferTo(new File(savePath + time + fileName));
//	    			FileOutputStream outputStream = new FileOutputStream(savePath + time + fileName);
//	    			FileInputStream inputStream = (FileInputStream) mf.getInputStream();
//	    			byte[] buf = new byte[1024];  
//	    			int length = 0;  
//	    			while ((length = inputStream.read(buf)) != -1) {  
//	    				outputStream.write(buf, 0, length);  
//	    			}  
//	    			inputStream.close();  
//	    			outputStream.flush();
//	    			outputStream.close();
	    			
	            }
			}
			String hotelLogo = "4654654564";
//			String hotelLogo = virtualFilePath + time + fileName;
			//存数据库
			Boolean b = true;
//			Boolean b = hotelService.updateHotelByHotelId(hotelId, hotelLogo);
			if(b){
				return hotelLogo; 
			}else{
//				logger.error("修改logo路径出错========>>>>hotelId=" + hotelId);
				return "false" ;
			}
		} catch (Exception e) {
			logger.error("上传出错", e);
			return "false" ; 
		}
	}
	
	/**
	 * 批量上传图片
	 * @param request 请求
	 * @param panel 父容器ID
	 * @param type 图片类型
	 * @param size 限制大小,0表示不限制大小（单位：KB）
	 * @return 上传图片结果
	 */
	@ResponseBody
	@RequestMapping(value = "/multipleFile", produces="text/html;charset=utf-8")
	public DayoMap multipleFile(HttpServletRequest request,
			@RequestParam(value="panel", required=false, defaultValue="1") String panel,
			@RequestParam(value="type", required=false, defaultValue="1") String type,
			@RequestParam(value="size", required=false, defaultValue="10000") int size) {
		DayoMap result = new DayoMap();
		result.put("panel", panel);
		long maxSize = (size+1)*1024;//加1允许有1KB的误差
		try {
			MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
	        //获得第1张图片（根据前台的name名称得到上传的文件）   
			DayoList fileList = new DayoList();
	        List<MultipartFile> imgFiles  =  multipartRequest.getFiles("fileImage");
	        for (MultipartFile multipartFile : imgFiles) {
	        	if (size!=0) {
					if (maxSize<multipartFile.getSize()) {
						result.put("error", 1);
				        result.put("data", "");
						result.put("message", "为了保证移动端的加载速度,单个文件的大小不能超过"+size+"KB,请您在制作图片时适当降低图片质量,【"+multipartFile.getOriginalFilename()+"】大小为："+(multipartFile.getSize()/1024)+"KB");
						return result;
					}
				}
	        	fileList.add(upload(multipartFile));
			}
	        result.put("error", 0);
	        result.put("message", "上传图片成功！");
	        result.put("data", JSONUtil.toJSon("data",fileList));
	        result.put("filelist", fileList);
		} catch (Exception e) {
			result.put("error", 1);
	        result.put("data", "");
			result.put("message", "上传图片失败！");
		}
        return result;
	}
	
	
	public DayoMap upload(MultipartFile fileImage)  {
		try {
			DayoMap result = new DayoMap();
			//文件储存路径
			String savePath = ReadProperties.getPropertesValue("uploadFilePath", "config.properties");
			//虚拟路径
			String virtualFilePath = ReadProperties.getPropertesValue("virtualFilePath", "config.properties");
			//文件上传最大值
			String uploadFileSize = ReadProperties.getPropertesValue("uploadFileSize", "config.properties");
			File f = new File(savePath);
			if (!f.exists()) {
	            f.mkdirs();
	        }
			
        	if(fileImage.getSize() > Long.valueOf(uploadFileSize).longValue() * 1000){
        		result.put("mag", "size_limit");
				return result;
			}
			// 获得上传的文件名
			String fileName = fileImage.getOriginalFilename();
			
			String time = StringUtil.getRealTime("yyyyMMddHHmmssSSS");
			
			String imgPath = savePath + time + fileName;
			fileImage.transferTo(new File(imgPath));
//	    			FileOutputStream outputStream = new FileOutputStream(savePath + time + fileName);
//	    			FileInputStream inputStream = (FileInputStream) mf.getInputStream();
//	    			byte[] buf = new byte[1024];  
//	    			int length = 0;  
//	    			while ((length = inputStream.read(buf)) != -1) {  
//	    				outputStream.write(buf, 0, length);  
//	    			}  
//	    			inputStream.close();  
//	    			outputStream.flush();
//	    			outputStream.close();
			String hotelLogo = imgPath;
//			String hotelLogo = virtualFilePath + time + fileName;
			//存数据库
			Boolean b = true;
//			Boolean b = hotelService.updateHotelByHotelId(hotelId, hotelLogo);
			if(b){
				result.put("mag", hotelLogo);
				return result;
			}else{
				result.put("result", false);
				return result;
			}
		} catch (Exception e) {
			logger.error("上传出错", e);
			return null; 
		}
	}
}
