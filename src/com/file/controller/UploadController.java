//package com.file.controller;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.log4j.Logger;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import com.entity.DayoMap;
//import com.entity.JSONUtil;
//import com.entity.StringUtil;
//import com.sun.org.apache.xml.internal.security.utils.Base64;
//import com.unit.MD5_SHA1_Util;
//
//
///**
// * 控制层：上传文件
// */
//@Controller
//public class UploadController {
//	Logger logger = Logger.getLogger("controller");
//
////	@Resource(name = "userInfoService")
////	IUserInfoService userInfoService;// 全局变量
////	@Resource(name = "baseDao")
////	IBaseDao baseDao;//
//
//	public static final String FILETYPE_FILE="File";//文件
//	public static final String FILETYPE_RICHTEXT="RichText";//富文本
//	public static final String FILETYPE_IMAGE="Image";//图片
//	public static final String FILETYPE_STOCK_IMAGE="Stock_Image";//商品相册
//	public static final String FILETYPE_AD_IMAGE="AD_Image";//广告
//	public static final String FILETYPE_STOCK_TEMPLATE_IMAGE="Stock_Template_Image";//商品模版相册
//	public static final String FILETYPE_WEIXIN="Weixin";//微信
//	public static final String FILETYPE_VIDEO="Media";//音频
//	public static final String FILETYPE_CERT="Cert";//证书
//	
//	DayoMap fileServer;// 远程服务器的路径
//
//	/** 获取指定名称的路径 **/
//	public String getPath(String name) {
//		if (fileServer == null) {
////			fileServer = userInfoService.getInfosByType("f");
//		}
//		return fileServer.getString(name);
//	}
//
//	// userInfoService.getInfosByType("f");
//
//	/** 上传文件 ******************************/
//	@RequestMapping(value = "/upload_file")
//	@ResponseBody
//	public String uploadFile(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_FILE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 上传音频 和视频******************************/
//	@RequestMapping(value = "/upload_video_json")
//	public String upload_video_json(HttpServletRequest request,HttpServletResponse response) {
//		//return multipleFile(request, "", FILETYPE_RICHTEXT);
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			//王文樟 修改文件上传文件夹到file下
//			response.getWriter().write(multipleFile(request, "", FILETYPE_FILE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	
//	
//	/** 上传图片（富文本编辑） ****************/
//	@RequestMapping(value = "/upload_richtext")
//	@ResponseBody
//	public String uploadRichtext(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_RICHTEXT).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/** 上传图片（缩略图） *********************/
//	@RequestMapping(value = "/upload_image")
//	@ResponseBody
//	public String uploadImage(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/** 上传图片（商品图片） *********************/
//	@RequestMapping(value = "/upload_image_stock")
//	@ResponseBody
//	public String uploadStockImage(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_STOCK_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/** 上传图片（广告图片） *********************/
//	@RequestMapping(value = "/upload_image_ad")
//	@ResponseBody
//	public String uploadADImage(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_AD_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/** 上传(通用) 参数 type=image *********************/
//	@RequestMapping(value = "/upload")
//	@ResponseBody
//	public String upload(@RequestParam(value = "type") String type,
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, type).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	/** 手机上传文件保存至服务器(base64)  **/
//	@RequestMapping(value = "/upload_base64")
//	@ResponseBody
//	public DayoMap MOupload(String img, String fileType) {
//		String fileContent = img.replace("data:image/png;base64,","");
//
//		logger.debug("文件类型:" + img.substring(0, 30));
//		logger.debug("文件名称:" );
//		logger.debug("上传类型:" + fileType);
//
//		// 最大文件大小( 单位：字节 B)
//		long maxSize = 1024 * 1024 * 100000;
//		//单张图片的大小不能超过500KB
//		if (fileType.equals(FILETYPE_IMAGE)) {
//			maxSize = 1024 * 1024;
//		}
//
//		if (StringUtil.isEmpty(img)) {
//			return errorMsg("请选择文件。");
//		}
//
//		logger.debug("图片大小："+fileContent.length()/1024);
//		// 检查文件大小( 单位：字节 B)
//		if (fileContent.length()> maxSize) {
//			return errorMsg("上传文件大小超过限制，请上传"+maxSize/1024+"KB以内的文件。");
//		}
//
////		ext = ext.substring(ext.lastIndexOf(".")).toLowerCase();
//		String ext = ".png";
//		String md5sha1Name = "";//UUID + "." + ext;
//
//		String basePath = getPath(fileType + "ServerPath");// 定义根目录
//		String baseURL = getPath(fileType + "ServerURL");// 定义URL
//		String savePath = "";//basePath + guidName;// 文件保存的全路径
//		DayoMap file = new DayoMap();// 定义文件的JSON数据
//		if (StringUtil.isEmpty(basePath)) {
//			file.put("error", "1");
//			file.put("msg", "上传失败，文件目录不存在！");
//			file.put("message", "上传失败，文件目录不存在！");
//			logger.error("上传失败，文件目录不存在！---fileType:"+fileType);
//			return file;
//		}
//		try {
//			// 保存文件到服务器
////			String fileContent = "";
//			byte[] bytes = Base64.decode(fileContent);
//			//生成文件名 MD5+sha1+文件后缀名 可用于判断是否为同一文件
//			md5sha1Name = MD5_SHA1_Util.encodeByteBy_MD5_SHA1(bytes);
//			md5sha1Name += ext;
//			savePath = basePath + md5sha1Name;
//			
//			String url = getPath("FileUploadWebService");
//			UploadWebServiceClient uploadClient = new UploadWebServiceClient(
//					url);
//			String wsResult = uploadClient.callWebService(fileContent,
//					savePath, fileType);
//
//			if (!wsResult.equals("0")) {
//				return errorMsg("文件保存到服务器失败，请重新上传");
//			}
//
//		} catch (Exception e) {
//			return errorMsg("文件保存到服务器失败，请重新上传");
//		}
//		
//		logger.debug("basePath  :  " + basePath);
//		logger.debug("baseURL  :  " + baseURL);
//		logger.debug("savePath  :  " + savePath);
//
//		String fileURL = baseURL + md5sha1Name;
//		// 判断是否为商品图片并保存到数据库
//
//		int stockimageid=0;
//		
//		file.put("error", 0);
//		file.put("fid", stockimageid);
//		file.put("stockimageid", stockimageid);
//		file.put("url", fileURL);//图片绝对访问地址
//		file.put("guidname", md5sha1Name);//生成的文件名
//		file.put("relativeurl", savePath);//图片相对访问地址
//		file.put("ffilename", ext);//原文件名
//		logger.debug(file);
//		return file;
//	}
//
//	/******************************** 文件上传方法 ***********************************/
//
//	/** 上传文件 **/
//	public DayoMap upload(MultipartFile imgFile, String fileType) {
//		logger.debug("文件类型:" + imgFile.getContentType());
//		logger.debug("文件名称:" + imgFile.getOriginalFilename());
//		logger.debug("上传类型:" + fileType);
//		
//		DayoMap result = validateFile(imgFile, fileType);
//		if (result.getInt("error") == 1) {
//			return result;
//		}
//
//		// 获取GUID文件名
//		//String UUID = java.util.UUID.randomUUID().toString();
//		String ext = imgFile.getOriginalFilename();
//		ext = ext.substring(ext.lastIndexOf(".")).toLowerCase();
//		String md5sha1Name = "";//UUID + "." + ext;
//
//		String basePath = getPath(fileType + "ServerPath");// 定义根目录
//		String baseURL = getPath(fileType + "ServerURL");// 定义URL
//		String savePath = "";//basePath + guidName;// 文件保存的全路径
//		DayoMap file = new DayoMap();// 定义文件的JSON数据
//		if (StringUtil.isEmpty(basePath)) {
//			file.put("error", "1");
//			file.put("msg", "上传失败，文件目录不存在！");
//			file.put("message", "上传失败，文件目录不存在！");
//			logger.error("上传失败，文件目录不存在！---fileType:"+fileType);
//			return file;
//		}
//		try {
//			// 保存文件到服务器
//			String fileContent = File2StringUtil.getFileByteString(
//					imgFile.getInputStream(), imgFile.getSize());
//			//生成文件名 MD5+sha1+文件后缀名 可用于判断是否为同一文件
//			md5sha1Name = MD5_SHA1_Util.encodeByteBy_MD5_SHA1(imgFile.getBytes());
//			md5sha1Name += ext;
//			savePath = basePath + md5sha1Name;
//			
//			String url = getPath("FileUploadWebService");
//			UploadWebServiceClient uploadClient = new UploadWebServiceClient(
//					url);
//			String wsResult = uploadClient.callWebService(fileContent,
//					savePath, fileType);
//
//			if (!wsResult.equals("0")) {
//				return errorMsg("文件保存到服务器失败，请重新上传");
//			}
//
//		} catch (Exception e) {
//			return errorMsg("文件保存到服务器失败，请重新上传");
//		}
//		
//		logger.debug("basePath  :  " + basePath);
//		logger.debug("baseURL  :  " + baseURL);
//		logger.debug("savePath  :  " + savePath);
//		
//		// 上传的文件暂时不存库了
//		// file = saveFile(savePath, guidName, imgFile.getOriginalFilename());//
//		// 文件存库
//		// if (file == null) {return errorMsg("文件保存到数据库失败，请重新上传");}
//
//		String fileURL = baseURL + md5sha1Name;
//		// 判断是否为商品图片并保存到数据库
//
////		int stockimageid = saveStockImage(fileURL, fileType.toLowerCase());//修改-王凯旋
//		int stockimageid=0;
//		if (fileType=="Stock_Image") {
//			 stockimageid = saveStockImage(savePath, fileType.toLowerCase());
//			if (stockimageid == -1) {
//				return errorMsg("商品图片保存失败");
//			}
//		}
//		if (fileType=="Stock_Template_Image") {
//			 stockimageid = saveStockTemplateImage(savePath, fileType.toLowerCase());
//			if (stockimageid == -1) {
//				return errorMsg("商品图片保存失败");
//			}
//		}
//		
//
//		file.put("error", 0);
//		file.put("message", "上传图片成功！");
//		file.put("fid", stockimageid);
//		file.put("stockimageid", stockimageid);
//		file.put("url", fileURL);//图片绝对访问地址
//		file.put("guidname", md5sha1Name);//生成的文件名
//		file.put("relativeurl", savePath);//图片相对访问地址
//		file.put("ffilename", imgFile.getOriginalFilename());//原文件名
//		logger.debug(file);
//		return file;
//	}
//
//	/**
//	 * 保存商品的图片到数据库
//	 * 
//	 * @param url
//	 *            文件链接
//	 * @param fileType
//	 *            文件类型
//	 * @return value> 0表示为图片的ID <br>
//	 *         value= 0 表示非商品图片<br>
//	 *         value=-1 表示保存失败
//	 */
//	public int saveStockImage(String url, String fileType) {
//		if (!fileType.contains("stock") || !fileType.contains("image")) {
//			return 0;
//		}
//		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder
//				.getRequestAttributes();
//		String stockid = attrs.getRequest().getParameter("stockid");
//		String fgroup = attrs.getRequest().getParameter("fgroup");
//		DayoMap image = new DayoMap();
//		int FID = baseDao.getNextSeq("tblStockImgs");
//
//		if (StringUtil.isEmpty(fgroup)) {
//			fgroup = "default";
//		}
//		image.put("fid", FID);
//		image.put("fstockid", stockid);
//		image.put("furl", url);
//		image.put("fgroup", fgroup);
//		if (!baseDao.insert("tblStockImgs", image)) {
//			logger.debug(errorMsg("文件保存失败，请重新上传-(数据库)"));
//			return -1;
//		}
//		return Integer.valueOf(FID);
//	}
//
//	/** 保存文件到数据库 （暂时先不存库了-刘一男） **/
//	public DayoMap saveFile(String url, String guidName, String imgFileFileName) {
//		DayoMap file = new DayoMap();
//		long FID = baseDao.getNextSeq("tblFiles");
//		file.put("fid", FID);
//		file.put("ffilename", imgFileFileName);
//		file.put("fguidname", guidName);
//		file.put("furl", url);
//		file.put("FcreateTime", StringUtil.getSysDate());
//		file.put("frowversion", 0);
//		if (!baseDao.insert("tblFiles", file)) {
//			logger.debug(errorMsg("文件保存失败，请重新上传-(数据库)"));
//			return null;
//		}
//		return file;
//	}
//
//	/** 验证文件合法性 **/
//	public DayoMap validateFile(MultipartFile imgFile, String fileType) {
//		DayoMap result = new DayoMap();
//		result.put("error", 0);
//
//		// 定义允许上传的文件扩展名
//		HashMap<String, String> extMap = new HashMap<String, String>();
//		extMap.put("Weixin", "gif,jpg,jpeg,png,bmp");
//		extMap.put("RichText", "gif,jpg,jpeg,png,bmp");
//		extMap.put("Image", "gif,jpg,jpeg,png");
//		extMap.put("Stock_Image", "gif,jpg,jpeg,png");
//		extMap.put("Stock_Template_Image", "gif,jpg,jpeg,png");//张金明增加
//		extMap.put("AD_Image", "gif,jpg,jpeg,png");
//		extMap.put("Flash", "swf,flv");
//		extMap.put("Media", "gif,jpg,jpeg,png,swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,flv,f4v,webm,m4v,mov,3gp,3g2,rm,rmvb,avi,asf,mpeg,vob,dat,mkv,swf,lavf,cpk,dirac,ram,fli,mod,mp4");
//		extMap.put("File",
//				"doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2,pdf");// 王文樟：20140902新增pdf格式
//		extMap.put("Cert", "p12,pfx");//lihao  新增证书格式
//
//		// 最大文件大小( 单位：字节 B)
//		long maxSize = 1024 * 1024 * 100000;
//		//单张图片的大小不能超过500KB
//		if (fileType.equals(FILETYPE_IMAGE)||fileType.equals(FILETYPE_AD_IMAGE)||fileType.equals(FILETYPE_STOCK_IMAGE)) {
//			maxSize = 1024 * 1024;
//		}else if(fileType.equals(FILETYPE_RICHTEXT)){
//			maxSize = 1024 * 1024 * 3;
//		}
//
//		// File file = uploadAction.getImgFile();
//		// if (!file.exists()) {
//		if (imgFile.isEmpty()) {
//			return errorMsg("请选择文件。");
//		}
//
//		logger.debug("文件大小："+imgFile.getSize()/1024);
//		// 检查文件大小( 单位：字节 B)
//		if (imgFile.getSize() > maxSize) {
//			return errorMsg("上传文件大小超过限制，请上传"+maxSize/1024+"KB以内的文件。");
//		}
//
//		String ext = imgFile.getOriginalFilename();
//		// 文件名为空时
//		if (StringUtil.isEmpty(ext)) {
//			return errorMsg("文件名不能为空。");
//		}
//		ext = ext.substring(ext.lastIndexOf(".") + 1).toLowerCase();
//		logger.debug("文件扩展名：" + ext);
//		if (!fileType.equals("File")) {
//			// 检查扩展名
//			if (!Arrays.<String> asList(extMap.get(fileType).split(","))
//					.contains(ext)) {
//				return errorMsg("上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(fileType)
//						+ "格式。");
//			}
//		}
//		return result;
//	}
//	
//	/** 批量上传图片（富文本编辑） ****************/
//	@RequestMapping(value = "/upload_richtext_multiple")
//	public String uploadRichtextMultiple(HttpServletRequest request,String panel,Model model) {
//		model.addAllAttributes(multipleFile(request, panel, FILETYPE_RICHTEXT));
//		return "common/upload_result";
//	}
//	
//	/** 批量上传图片（商品相册） ****************/
//	@RequestMapping(value = "/upload_image_stock_multiple")
//	public String uploadStockImageMultiple(HttpServletRequest request,String panel,Model model) {
//		model.addAllAttributes(multipleFile(request, panel, FILETYPE_STOCK_IMAGE));
//		return "common/upload_result";
//	}
//	
//	/** 批量上传图片-Json（富文本编辑） ****************/
//	@RequestMapping(value = "/upload_richtext_multiple_json")
//	public String uploadRichtextMultipleJson(HttpServletRequest request,HttpServletResponse response) {
//		//return multipleFile(request, "", FILETYPE_RICHTEXT);
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(multipleFile(request, "", FILETYPE_RICHTEXT).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 批量上传图片-Json（商品相册） ****************/
//	@RequestMapping(value = "/upload_image_stock_multiple_json")
//	public String uploadStockImageMultipleJson(HttpServletRequest request,HttpServletResponse response) {
//		//return multipleFile(request, "", FILETYPE_STOCK_IMAGE);
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(multipleFile(request, "", FILETYPE_STOCK_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 批量上传图片-Json（广告） ****************/
//	@RequestMapping(value = "/upload_image_ad_multiple_json")
//	public String uploadADImageMultipleJson(HttpServletRequest request,HttpServletResponse response) {
//		//return multipleFile(request, "", FILETYPE_STOCK_IMAGE);
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(multipleFile(request, "", FILETYPE_AD_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 批量上传图片-Json（微信） ****************/
//	@RequestMapping(value = "/upload_image_wx_multiple_json")
//	public String uploadWXImageMultipleJson(HttpServletRequest request,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(multipleFile(request, "", FILETYPE_WEIXIN).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 批量上传图片-Json（移动端广告-限制大小） ****************/
//	@RequestMapping(value = "/upload_image_mo_multiple_json")
//	public String uploadMOImageMultipleJson(HttpServletRequest request,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			// 2016-10-14 10:12:41 lyn  手机端图片限制放开到200KB
//			response.getWriter().write(multipleFile(request, "", FILETYPE_AD_IMAGE,201).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	
//	/** 批量上传图片(不限制大小) *********************/
//	public DayoMap multipleFile(HttpServletRequest request,String panel,String type) {
//		return multipleFile(request, panel, type, 0);
//	}
//	
//	/**
//	 * 批量上传图片
//	 * @param request 请求
//	 * @param panel 父容器ID
//	 * @param type 图片类型
//	 * @param size 限制大小,0表示不限制大小（单位：KB）
//	 * @return 上传图片结果
//	 */
//	public DayoMap multipleFile(HttpServletRequest request,String panel,String type,int size) {
//		DayoMap result = new DayoMap();
//		result.put("panel", panel);
//		long maxSize = (size+1)*1024;//加1允许有1KB的误差
//		try {
//			MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//	        //  获得第1张图片（根据前台的name名称得到上传的文件）   
//			DayoList fileList = new DayoList();
//	        List<MultipartFile> imgFiles  =  multipartRequest.getFiles("imgFile");
//	        for (MultipartFile multipartFile : imgFiles) {
//	        	if (size!=0) {
//					if (maxSize<multipartFile.getSize()) {
//						result.put("error", 1);
//				        result.put("data", "");
//						result.put("message", "为了保证移动端的加载速度,单个文件的大小不能超过"+size+"KB,请您在制作图片时适当降低图片质量,【"+multipartFile.getOriginalFilename()+"】大小为："+(multipartFile.getSize()/1024)+"KB");
//						return result;
//					}
//				}
//	        	fileList.add(upload(multipartFile, type));
//			}
//	        result.put("error", 0);
//	        result.put("message", "上传图片成功！");
//	        result.put("data", JSONUtil.toJSon("data",fileList));
//	        result.put("filelist", fileList);
//		} catch (Exception e) {
//			result.put("error", 1);
//	        result.put("data", "");
//			result.put("message", "上传图片失败！");
//		}
//        return result;
//	}
//
//	/** 错误信息 **/
//	private DayoMap errorMsg(String message) {
//		DayoMap result = new DayoMap();
//		result.put("error", 1);
//        result.put("data", "");
//		result.put("message", message);
//		return result;
//	}
//	/********************************张金明添加模版库图片**********************************/
//	/** 批量上传图片（商品相册） ****************/
//	@RequestMapping(value = "/upload_image_stock_template_multiple")
//	public String uploadStockTemplateImageMultiple(HttpServletRequest request,String panel,Model model) {
//		//return multipleFile(request, panel, model, FILETYPE_STOCK_TEMPLATE_IMAGE);
//		model.addAllAttributes(multipleFile(request, panel, FILETYPE_STOCK_TEMPLATE_IMAGE));
//		return "common/upload_result";
//	}
//	/** 上传图片（商品图片） *********************/
//	@RequestMapping(value = "/upload_image_template_stock")
//	@ResponseBody
//	public String uploadStockTemplateImage(
//			@RequestParam(value = "imgFile") MultipartFile imgFile,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(upload(imgFile, FILETYPE_STOCK_TEMPLATE_IMAGE).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	/**
//	 * 保存商品的图片到数据库（中央商品库）
//	 * 
//	 * @param url
//	 *            文件链接
//	 * @param fileType
//	 *            文件类型
//	 * @return value> 0表示为图片的ID <br>
//	 *         value= 0 表示非商品图片<br>
//	 *         value=-1 表示保存失败
//	 */
//	public int saveStockTemplateImage(String url, String fileType) {
//		if (!fileType.contains("stock") || !fileType.contains("image")) {
//			return 0;
//		}
//		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder
//				.getRequestAttributes();
//		String stockid = attrs.getRequest().getParameter("stockid");
//		String fgroup = attrs.getRequest().getParameter("fgroup");
//		DayoMap image = new DayoMap();
//		int FID = baseDao.getNextSeq("tblStdStockImgs");
//
//		if (StringUtil.isEmpty(fgroup)) {
//			fgroup = "default";
//		}
//		image.put("fid", FID);
//		image.put("fstdstockid", stockid);
//		image.put("furl", url);
//		//image.put("fgroup", fgroup);
//		if (!baseDao.insert("tblStdStockImgs", image)) {
//			logger.debug(errorMsg("文件保存失败，请重新上传-(数据库)"));
//			return -1;
//		}
//		return Integer.valueOf(FID);
//	}
//	
//	/****************************下载文件方法测试-开始************************************************/
//	// TODO:下载文件方法测试
//	
//	/** 下载测试方法  **/
//	@RequestMapping("/spring/download")
//    public String download(HttpServletRequest request,HttpServletResponse response) {
//		// D:/TempFile/
//		String fileFolder = "D:"+File.separator+"TempFile"+File.separator;
//		//判断文件夹是否存在
//		File TempFileFolder = new File(fileFolder);
//		if (!TempFileFolder.exists()) {
//			TempFileFolder.mkdirs();
//		}
//		
//        try {
//        	/**********************/
//    		String fileName = "测试_中文——文件名.txt";//把你要生成的文件名写在这里  只要文件名就行
//    		//将数据生成到excel文件 
//    		File file = new File(fileFolder + fileName);
//    		File2StringUtil.writeFile("啥地方很快恢复快速的返回", file);
//    		//将excel文件  保存到上面的 D:/TempFile/下
//    		
//    		/**********************/
//    		
//            response.setCharacterEncoding("utf-8");
//            response.setContentType("multipart/form-data");
//            response.setHeader("Content-disposition", "attachment; filename="  
//                    + new String(fileName.getBytes("utf-8"), "ISO8859-1"));
//    		
//            InputStream inputStream = new FileInputStream(new File(fileFolder + fileName));
// 
//            OutputStream os = response.getOutputStream();
//            byte[] b = new byte[2048];
//            int length;
//            while ((length = inputStream.read(b)) > 0) {
//                os.write(b, 0, length);
//            }
//             // 这里主要关闭。
//            os.close();
// 
//            inputStream.close();
//        } catch (Exception e) {
//			e.printStackTrace();
//			return "error";//可以返回一个错误页面
//		}
//        //  返回值要注意，要不然就出现下面这句错误！
//        //  java+getOutputStream() has already been called for this response
//        return null;
//    }
//	
//	/** 导出excel测试方法  **/
//	@RequestMapping("/excelExport/test")
//    public String excelExport(HttpServletRequest request,HttpServletResponse response) {
//        try {
//        	String fileName = "导出数据_"+System.currentTimeMillis()+".xls";//把你要生成的文件名写在这里  只要文件名就行
//        	response.setCharacterEncoding("utf-8");
//            response.setContentType("multipart/form-data");
//            response.setHeader("Content-disposition", "attachment; filename=" + new String(fileName.getBytes("utf-8"), "ISO8859-1"));
//
//        	//获得输出流
//        	OutputStream os = response.getOutputStream();
//        	/****************内容*******************/
//            ExcelPOIUtil poi = new ExcelPOIUtil();
//            //DayoList header = new DayoList();
//            poi.setTitle("商品");
//            poi.addHeader("fid", "编号");
//            poi.addHeader("fname", "名称");
//            poi.addHeader("fmarkid", "品牌");
//            poi.addHeader("fstockclassid", "类别");
//            poi.addHeader("fshortcode", "简码");
//            poi.setData(baseDao.queryForDayoList("select * from tblStock"));
//            //poi.exportExcel("商品", header, data, os);
//            poi.exportExcel(os);
//            /*************************************/
//            
//            // 关闭输出流。
//            os.close();
// 
//        } catch (Exception e) {
//			e.printStackTrace();
//			return "error";//可以返回一个错误页面
//		}
//        //  返回值要注意，要不然就出现下面这句错误！
//        //  java+getOutputStream() has already been called for this response
//        return null;
//    }
//	
//	/** 导出excel测试方法 使用AOP  **/
//	@RequestMapping("/excelExport/aop")
//    public ExcelPOIUtil exportExcel_AOP_Test(HttpServletResponse response) {
//        ExcelPOIUtil poi = new ExcelPOIUtil();
//        //DayoList header = new DayoList();
//        poi.setFileName("自定义导出文件名.xls");
//        poi.setTitle("商品");
//        poi.addHeader("fid", "编号");
//        poi.addHeader("fname", "名称",30);//自定义列宽 默认是15
//        poi.addHeader("fmarkid", "品牌");
//        poi.addHeader("fstockclassid", "类别");
//        poi.addHeader("fshortcode", "简码");
//        poi.setData(baseDao.queryForDayoList("select * from tblStock"));
//        //poi.exportExcel("商品", header, data, os);
//        return poi;
//    }
//	
//	/****************************下载文件方法测试-结束************************************************/
//	
//	/**
//	 * 上传文件到本地服务器
//	 * @author LIHAO
//	 * @param imgFile 上传的文件 
//	 * @param fileType 文件类型
//	 * @return 返回上传结果或者错误信息
//	 * @throws Exception 
//	 */
//	public DayoMap upload2Location(MultipartFile imgFile, String fileType) throws Exception {
//		logger.debug("文件类型:" + imgFile.getContentType());
//		logger.debug("文件名称:" + imgFile.getOriginalFilename());
//		logger.debug("上传类型:" + fileType);
//		
//		DayoMap fileMap = new DayoMap();
//		DayoMap result = validateFile(imgFile, fileType);
//		if (result.getInt("error") == 1) {
//			return result;
//		}
//
//		String ext = imgFile.getOriginalFilename();
//		ext = ext.substring(ext.lastIndexOf(".")).toLowerCase();
//		String md5sha1Name = "";
//
//		String location = "";
//		try {
//			String tempPath = "WEB-INF/classes/dayo/shop/pay/payFile/temp";
//			location = ApplicationConfigUtil.getProjectRootPath() + tempPath;//获得服务器保存证书文件的地址
//			md5sha1Name = MD5_SHA1_Util.encodeByteBy_MD5_SHA1(imgFile.getBytes());
//			md5sha1Name += ext;
//		} catch (Exception e) {
//			logger.error("上传证书错误-文件名称生成错误！",e);
//			throw new Exception("上传证书错误-文件名称生成错误！",e);
//		}
//		String fileURL = location + md5sha1Name;
//		try {
//			File file = new File(fileURL);
//			if (!file.getParentFile().exists()) {
//				file.getParentFile().mkdirs();
//			}
//			file.createNewFile();
//			imgFile.transferTo(file);
//		} catch (Exception e) {
//			logger.error("上传证书错误-文件生成到本地错误！",e);
//			throw new Exception("上传证书错误-文件生成到本地错误！",e);
//		}		
//
//		fileMap.put("error", 0);
//		fileMap.put("url", fileURL);// 图片绝对访问地址
//		fileMap.put("guidname", md5sha1Name);// 生成的文件名
//		fileMap.put("ffilename", imgFile.getOriginalFilename());// 原文件名
//		return fileMap;
//	}
//	
//	/**
//	 * 证书上传方法最大为，限制大小
//	 * @author lihao
//	 * @param request 请求
//	 * @param type  类型
//	 * @param size  文件大小
//	 * @return  返回上传信息
//	 */
//	public DayoMap uploadCertFile(HttpServletRequest request,String type,int size) {
//		DayoMap result = new DayoMap();
//		long maxSize = (size+1)*1024;//加1允许有1KB的误差
//		try {
//			MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//			DayoList fileList = new DayoList();
//	        List<MultipartFile> imgFiles  =  multipartRequest.getFiles("imgFile");
//	        for (MultipartFile multipartFile : imgFiles) {
//	        	if (size!=0) {
//					if (maxSize<multipartFile.getSize()) {
//						result.put("error", 1);
//				        result.put("data", "");
//						result.put("message", "为了保证移动端的加载速度,单个文件的大小不能超过"+size+"KB");
//						return result;
//					}
//				}
//	        	fileList.add(upload2Location(multipartFile, type));
//			}
//	        result.put("error", 0);
//	        result.put("message", "上传证书成功！");
//	        result.put("data", JSONUtil.toJSon("data",fileList));
//	        result.put("filelist", fileList);
//		} catch (Exception e) {
//			logger.error(e);
//			result.put("error", 1);
//	        result.put("data", "");
//			result.put("message", e.getMessage());
//		}
//        return result;
//	}
//	
//	/**
//	 * 上传证书
//	 * @author lihao
//	 */
//	@RequestMapping(value = "/upload_cert_json")
//	public String uploadcertJson(HttpServletRequest request,HttpServletResponse response) {
//		response.setContentType("text/html;charset=UTF-8");
//		try {
//			response.getWriter().write(uploadCertFile(request, FILETYPE_CERT,9).toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//	/** 静态文件上传 *********************/
//	@RequestMapping(value = "/upload_static")
//	@ResponseBody
//	public DayoMap uploadStaticFile(int upgradeVersion,HttpServletRequest request) {
//		String path = request.getParameter("path");
//		//1.升级版本号
//		String FStaticVersion  = userInfoService.getStringInfoByName("FStaticVersion");
//		if(upgradeVersion == 5){
//			FStaticVersion  = userInfoService.getStringInfoByName("FGameStaticVersion");
//		}else if(upgradeVersion == 6){
//			FStaticVersion  = userInfoService.getStringInfoByName("FGameStaticIMGVersion");
//		}
//		String str[] = FStaticVersion.split("/");
//		String version = str[str.length-1];
//		String upgrade[] = version.split("\\.");
//		String newVersion = "";
//		String versionName = "FStaticVersion";
//		String staticPath = "staticPath";
//		if(upgradeVersion==1||upgradeVersion==2||upgradeVersion==4){//=1大版本,=2小版本,=4全部文件
//			if(upgradeVersion==1){//大版本
//				newVersion= Integer.parseInt(upgrade[0])+1+".1.0";
//			}else if(upgradeVersion==2){//小版本
//				newVersion= upgrade[0]+"."+(Integer.parseInt(upgrade[1])+1)+".0";
//			}else if(upgradeVersion==4){//全部文件
//				newVersion= upgrade[0]+"."+upgrade[1]+"."+(Integer.parseInt(upgrade[2])+1);
//			}
//			try {
//				MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//		        MultipartFile imgFiles  =  multipartRequest.getFile("imgFile");
//		        String newPath = imgFiles.getOriginalFilename();
//		        newPath = newPath.substring(newPath.length()-3);
//				if(newPath.equals("zip")){
//					// 保存文件到服务器
//	    			String fileContent = File2StringUtil.getFileByteString(
//	    					imgFiles.getInputStream(), imgFiles.getSize());
//	    			DayoMap result = UploadWebServiceClient.uploadFileZip(fileContent, "jstatic/"+newVersion+"/all.zip");
//	    			if (!result.isSuccess()) {
//	    				return errorMsg("文件保存到服务器失败，请重新上传！");
//	    			}
//				}else{
//					return errorMsg("文件格式不正确，只能上传后缀为zip的压缩文件！");
//				}
//	        	logger.debug("文件名："+imgFiles.getOriginalFilename());
//	        	logger.debug("路径："+"jstatic/"+newVersion+"/all.zip");
//	        	logger.debug("-----------分割线---------------");
//			} catch (Exception e) {
//				logger.debug("升级静态文件失败！"+e);
//				return errorMsg("升级静态文件失败！"+e.getMessage());
//			}
//		}else if(upgradeVersion==3){//部分文件
//			newVersion= upgrade[0]+"."+upgrade[1]+"."+(Integer.parseInt(upgrade[2])+1);
//			try {
//				MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//				String[] paths = path.split(",");
//		        List<MultipartFile> imgFiles  =  multipartRequest.getFiles("imgFile");
//		        int i = 0;
//		        for (MultipartFile multipartFile : imgFiles) {
//		        	try {
//		    			// 保存文件到服务器
//		    			String fileContent = File2StringUtil.getFileByteString(
//		    					multipartFile.getInputStream(), multipartFile.getSize());
//		    			DayoMap result = UploadWebServiceClient.uploadFile(fileContent, "jstatic/"+newVersion+"/"+paths[i]);
//		    			if (!result.isSuccess()) {
//		    				return errorMsg("文件保存到服务器失败，请重新上传！");
//		    			}
//
//		    		} catch (Exception e) {
//		    			return errorMsg("文件保存到服务器失败，请重新上传！");
//		    		}
//		        	logger.debug("文件名："+multipartFile.getOriginalFilename());
//		        	logger.debug("路径："+"jstatic/"+newVersion+"/");
//		        	logger.debug("-----------分割线---------------");
//		        	i++;
//				}
//		        UploadWebServiceClient.uploadStaticFile("jstatic/"+version,"jstatic/"+newVersion);
//			} catch (Exception e) {
//				logger.debug("升级静态文件失败！"+e);
//				return errorMsg("升级静态文件失败！"+e.getMessage());
//			}
//		}else if(upgradeVersion == 5){//营销活动静态文件(js/css)
//			int upgrade1 = (Integer.parseInt(upgrade[1])+1);
//			newVersion= (upgrade1==99?Integer.parseInt(upgrade[0])+1:upgrade[0])+"."+(upgrade1==99?0:upgrade1);
//			try {
//				MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//		        MultipartFile imgFiles  =  multipartRequest.getFile("imgFile");
//		        String newPath = imgFiles.getOriginalFilename();
//		        newPath = newPath.substring(newPath.length()-3);
//				if(newPath.equals("zip")){
//					// 保存文件到服务器
//	    			String fileContent = File2StringUtil.getFileByteString(
//	    					imgFiles.getInputStream(), imgFiles.getSize());
//	    			DayoMap result = UploadWebServiceClient.uploadFileZip(fileContent, "static_centralgames/"+newVersion+"/all.zip");
//	    			if (!result.isSuccess()) {
//	    				return errorMsg("文件保存到服务器失败，请重新上传！");
//	    			}
//				}else{
//					return errorMsg("文件格式不正确，只能上传后缀为zip的压缩文件！");
//				}
//	        	logger.debug("文件名："+imgFiles.getOriginalFilename());
//	        	logger.debug("路径："+"static_centralgames/"+newVersion+"/all.zip");
//	        	logger.debug("-----------分割线---------------");
//			} catch (Exception e) {
//				logger.debug("升级静态文件失败！"+e);
//				return errorMsg("升级静态文件失败！"+e.getMessage());
//			}
//			versionName = "FGameStaticVersion";
//			staticPath = "centralGamesPath";
//		}else if(upgradeVersion == 6){//营销活动静态文件(jpg/png)
//			try {
//				MultipartHttpServletRequest multipartRequest  =  (MultipartHttpServletRequest) request;  
//		        List<MultipartFile> imgFiles  =  multipartRequest.getFiles("imgFile");
//		        path = ((path==null || path.isEmpty())?"":path+"/");
//		        for (MultipartFile multipartFile : imgFiles) {
//		        	try {
//		    			// 保存文件到服务器
//		    			String fileContent = File2StringUtil.getFileByteString(
//		    					multipartFile.getInputStream(), multipartFile.getSize());
//		    			DayoMap result = UploadWebServiceClient.uploadFile(fileContent, "static_centralgames/img/"+path+multipartFile.getOriginalFilename());
//		    			if (!result.isSuccess()) {
//		    				return errorMsg("文件保存到服务器失败，请重新上传！");
//		    			}
//
//		    		} catch (Exception e) {
//		    			return errorMsg("文件保存到服务器失败，请重新上传！");
//		    		}
//		        	logger.debug("文件名："+multipartFile.getOriginalFilename());
//		        	logger.debug("路径："+"static_centralgames/img/");
//		        	logger.debug("-----------分割线---------------");
//				}
////		        UploadWebServiceClient.uploadStaticFile("static_centralgames/img/","static_centralgames/img/");
//			} catch (Exception e) {
//				logger.debug("升级静态文件失败！"+e);
//				return errorMsg("升级静态文件失败！"+e.getMessage());
//			}
//			versionName = "FGameStaticIMGVersion";
//			staticPath = "centralGamesIMGPath";
//		}
//		//2.修改tblUserInfo  FStaticVersion
//		String FStaticNewVersion = null;
//		if(upgradeVersion != 6){
//			FStaticNewVersion = FStaticVersion.replace(version, newVersion);
//			boolean result = userInfoService.updateInfo(versionName, FStaticNewVersion);
//			if(!result){
//				return DayoMap.failResult("升级失败！");
//			}
//			//3.更新全局变量
//			if(upgradeVersion == 5){
//				ApplicationConfigUtil.getInstance().setCentralGamesPath(FStaticNewVersion);
//			}else if(upgradeVersion < 5){
//				ApplicationConfigUtil.getInstance().setStaticPath(FStaticNewVersion);
//			}
//		}else if(upgradeVersion == 6){
//			FStaticNewVersion = FStaticVersion;
//			ApplicationConfigUtil.getInstance().setCentralGamesIMGPath(FStaticNewVersion);
//		}
//		
//		/** 通知其他应用服务器更新变量 */
//		int environment = ApplicationConfigUtil.getInstance().getEnvironment();
//		if(environment == 0){//正式环境
//			DayoMap getParam = new DayoMap();
//			getParam.put("rType", "static");
//			getParam.put("rOpreator", versionName);
//			getParam.put("rList", staticPath);
//			String result = HttpClientUtil.executeHttpGet(ConstUtil.MSG_SERVER,getParam,10);
//			logger.info("["+versionName+"]升级静态文件结果："+result);
//		}else{
//		        ApplicationConfigUtil.appContext.setAttribute(staticPath, FStaticNewVersion);
//		}
//		
//		return DayoMap.successResult("升级成功！");
//	}
//}
